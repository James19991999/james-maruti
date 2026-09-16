"use server";

import { headers } from "next/headers";
import { FieldValue } from "firebase-admin/firestore";
import { getAdminDb } from "@/lib/firebase-admin";
import { checkRateLimit, getClientIp } from "@/lib/rate-limit";
import { sendNewsletterConfirmation } from "@/lib/notifications";
import { withTimeout } from "@/lib/with-timeout";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export interface NewsletterActionResult {
  ok: boolean;
  error?: string;
}

async function handleNewsletterSubmit(formData: FormData): Promise<NewsletterActionResult> {
  const email = formData.get("email");
  const website = formData.get("website"); // honeypot

  if (typeof website === "string" && website.trim().length > 0) {
    return { ok: true };
  }

  if (typeof email !== "string" || !EMAIL_RE.test(email)) {
    return { ok: false, error: "Please provide a valid email address." };
  }

  try {
    const requestHeaders = await headers();
    const ip = getClientIp(requestHeaders);
    const { allowed } = await withTimeout(
      checkRateLimit(ip, "newsletter"),
      5000,
      "Rate limit check"
    );
    if (!allowed) {
      return { ok: false, error: "Too many attempts. Please try again in a few minutes." };
    }
  } catch (error) {
    console.error("Rate limit check failed, proceeding without it:", error);
  }

  const db = getAdminDb();
  const normalizedEmail = email.trim().toLowerCase();

  await withTimeout(
    db
      .collection("newsletter_subscribers")
      .doc(normalizedEmail)
      .set(
        { email: normalizedEmail, subscribedAt: FieldValue.serverTimestamp() },
        { merge: true }
      ),
    8000,
    "Firestore write"
  );

  try {
    await withTimeout(sendNewsletterConfirmation(normalizedEmail), 5000, "Confirmation email");
  } catch (error) {
    console.error("Failed to send newsletter confirmation email:", error);
  }

  return { ok: true };
}

/** Outer safety net — see app/actions/contact.ts for why this exists. */
export async function submitNewsletter(formData: FormData): Promise<NewsletterActionResult> {
  try {
    return await handleNewsletterSubmit(formData);
  } catch (error) {
    console.error("Unhandled error in submitNewsletter:", error);
    return { ok: false, error: "Something went wrong on our end. Please try again shortly." };
  }
}
