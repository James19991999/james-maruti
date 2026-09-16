"use server";

import { headers } from "next/headers";
import { FieldValue } from "firebase-admin/firestore";
import { getAdminDb } from "@/lib/firebase-admin";
import { checkRateLimit, getClientIp } from "@/lib/rate-limit";
import { sendInquiryNotification } from "@/lib/notifications";
import { withTimeout } from "@/lib/with-timeout";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export interface ContactActionResult {
  ok: boolean;
  error?: string;
}

async function handleContactSubmit(formData: FormData): Promise<ContactActionResult> {
  const name = formData.get("name");
  const email = formData.get("email");
  const inquiryType = formData.get("inquiryType");
  const message = formData.get("message");
  const website = formData.get("website"); // honeypot

  // Honeypot: a real visitor never sees or fills this field (it's visually hidden
  // and skipped in the tab order). Respond as if the submission succeeded so a bot
  // doesn't learn to avoid the trap.
  if (typeof website === "string" && website.trim().length > 0) {
    return { ok: true };
  }

  if (typeof name !== "string" || name.trim().length < 2) {
    return { ok: false, error: "Please provide your name." };
  }
  if (typeof email !== "string" || !EMAIL_RE.test(email)) {
    return { ok: false, error: "Please provide a valid email address." };
  }
  if (typeof message !== "string" || message.trim().length < 10) {
    return { ok: false, error: "Please share a bit more detail in the project brief." };
  }

  try {
    const requestHeaders = await headers();
    const ip = getClientIp(requestHeaders);
    const { allowed } = await withTimeout(checkRateLimit(ip, "contact"), 5000, "Rate limit check");
    if (!allowed) {
      return { ok: false, error: "Too many submissions. Please try again in a few minutes." };
    }
  } catch (error) {
    // If the rate limiter itself fails (e.g. Firebase misconfigured), fail open rather
    // than blocking legitimate submissions — but log it, since it means rate limiting
    // isn't actually active.
    console.error("Rate limit check failed, proceeding without it:", error);
  }

  const db = getAdminDb();
  const inquiryData = {
    name: name.trim(),
    email: email.trim(),
    inquiryType: typeof inquiryType === "string" ? inquiryType.trim() : "",
    message: message.trim(),
  };

  await withTimeout(
    db.collection("inquiries").add({
      ...inquiryData,
      createdAt: FieldValue.serverTimestamp(),
      source: "contact-form",
    }),
    8000,
    "Firestore write"
  );

  try {
    await withTimeout(sendInquiryNotification(inquiryData), 5000, "Notification email");
  } catch (error) {
    console.error("Failed to send inquiry notification email:", error);
  }

  return { ok: true };
}

/**
 * Outer safety net — same reasoning as the old /api/contact route: a person
 * filling out this form should always get a real, readable error, never a
 * server crash with no message at all (Server Actions surface an unhandled
 * throw as a generic "An error occurred" on the client with no detail).
 */
export async function submitContact(formData: FormData): Promise<ContactActionResult> {
  try {
    return await handleContactSubmit(formData);
  } catch (error) {
    console.error("Unhandled error in submitContact:", error);
    return { ok: false, error: "Something went wrong on our end. Please try again shortly." };
  }
}
