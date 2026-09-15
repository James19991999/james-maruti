import { NextRequest, NextResponse } from "next/server";
import { FieldValue } from "firebase-admin/firestore";
import { getAdminDb } from "@/lib/firebase-admin";
import { checkRateLimit, getClientIp } from "@/lib/rate-limit";
import { sendNewsletterConfirmation } from "@/lib/notifications";
import { withTimeout } from "@/lib/with-timeout";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

async function handlePost(request: NextRequest): Promise<NextResponse> {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const { email, website } = (body ?? {}) as Record<string, unknown>;

  // Honeypot — see app/api/contact/route.ts for the same pattern.
  if (typeof website === "string" && website.trim().length > 0) {
    return NextResponse.json({ ok: true }, { status: 201 });
  }

  if (typeof email !== "string" || !EMAIL_RE.test(email)) {
    return NextResponse.json({ error: "Please provide a valid email address." }, { status: 400 });
  }

  try {
    const ip = getClientIp(request);
    const { allowed, retryAfterSeconds } = await withTimeout(
      checkRateLimit(ip, "newsletter"),
      5000,
      "Rate limit check"
    );
    if (!allowed) {
      return NextResponse.json(
        { error: "Too many attempts. Please try again in a few minutes." },
        { status: 429, headers: retryAfterSeconds ? { "Retry-After": String(retryAfterSeconds) } : undefined }
      );
    }
  } catch (error) {
    console.error("Rate limit check failed, proceeding without it:", error);
  }

  const db = getAdminDb();
  // Use the email as the document ID to make repeat sign-ups idempotent.
  await withTimeout(
    db
      .collection("newsletter_subscribers")
      .doc(email.trim().toLowerCase())
      .set(
        {
          email: email.trim().toLowerCase(),
          subscribedAt: FieldValue.serverTimestamp(),
        },
        { merge: true }
      ),
    8000,
    "Firestore write"
  );

  try {
    await withTimeout(
      sendNewsletterConfirmation(email.trim().toLowerCase()),
      5000,
      "Confirmation email"
    );
  } catch (error) {
    console.error("Failed to send newsletter confirmation email:", error);
  }

  return NextResponse.json({ ok: true }, { status: 201 });
}

/** Outer safety net — see app/api/contact/route.ts for why this exists. */
export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    return await handlePost(request);
  } catch (error) {
    console.error("Unhandled error in /api/newsletter:", error);
    return NextResponse.json(
      { error: "Something went wrong on our end. Please try again shortly." },
      { status: 500 }
    );
  }
}
