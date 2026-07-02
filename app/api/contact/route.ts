import { NextRequest, NextResponse } from "next/server";
import { FieldValue } from "firebase-admin/firestore";
import { getAdminDb } from "@/lib/firebase-admin";
import { checkRateLimit, getClientIp } from "@/lib/rate-limit";
import { sendInquiryNotification } from "@/lib/notifications";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: NextRequest) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const { name, email, inquiryType, message, website } = (body ?? {}) as Record<string, unknown>;

  // Honeypot: a real visitor never sees or fills this field (it's visually hidden and
  // skipped in the tab order). Bots that blindly fill every input will trip it. Respond
  // as if the submission succeeded so the bot doesn't learn to avoid the trap.
  if (typeof website === "string" && website.trim().length > 0) {
    return NextResponse.json({ ok: true }, { status: 201 });
  }

  if (typeof name !== "string" || name.trim().length < 2) {
    return NextResponse.json({ error: "Please provide your name." }, { status: 400 });
  }
  if (typeof email !== "string" || !EMAIL_RE.test(email)) {
    return NextResponse.json({ error: "Please provide a valid email address." }, { status: 400 });
  }
  if (typeof message !== "string" || message.trim().length < 10) {
    return NextResponse.json(
      { error: "Please share a bit more detail in the project brief." },
      { status: 400 }
    );
  }

  try {
    const ip = getClientIp(request);
    const { allowed, retryAfterSeconds } = await checkRateLimit(ip, "contact");
    if (!allowed) {
      return NextResponse.json(
        { error: "Too many submissions. Please try again in a few minutes." },
        { status: 429, headers: retryAfterSeconds ? { "Retry-After": String(retryAfterSeconds) } : undefined }
      );
    }
  } catch (error) {
    // If the rate limiter itself fails (e.g. Firebase misconfigured), fail open rather
    // than blocking legitimate submissions — but log it, since it means rate limiting
    // isn't actually active.
    console.error("Rate limit check failed, proceeding without it:", error);
  }

  try {
    const db = getAdminDb();
    const inquiryData = {
      name: name.trim(),
      email: email.trim(),
      inquiryType: typeof inquiryType === "string" ? inquiryType.trim() : "",
      message: message.trim(),
    };

    await db.collection("inquiries").add({
      ...inquiryData,
      createdAt: FieldValue.serverTimestamp(),
      source: "contact-form",
    });

    // Awaited (not fire-and-forget) because serverless functions can be frozen the
    // instant a response is returned, which would silently drop an unawaited send.
    // Wrapped so a failed email still doesn't fail the request — the inquiry is
    // already safely stored in Firestore either way.
    try {
      await sendInquiryNotification(inquiryData);
    } catch (error) {
      console.error("Failed to send inquiry notification email:", error);
    }

    return NextResponse.json({ ok: true }, { status: 201 });
  } catch (error) {
    console.error("Failed to save contact inquiry:", error);
    return NextResponse.json(
      { error: "Something went wrong on our end. Please try again shortly." },
      { status: 500 }
    );
  }
}
