import { Resend } from "resend";
import { siteConfig } from "@/lib/site-data";

/**
 * Sends James an email notification when a new inquiry or newsletter signup comes in.
 *
 * This is intentionally optional: if RESEND_API_KEY isn't set, `sendInquiryNotification`
 * is a no-op and the site keeps working exactly as before (submissions still land in
 * Firestore, they just won't trigger an email). Swap providers by replacing the body of
 * this function — the API routes that call it don't need to change.
 */
export async function sendInquiryNotification(data: {
  name: string;
  email: string;
  inquiryType?: string;
  message: string;
}): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return;

  const resend = new Resend(apiKey);
  const fromAddress = process.env.CONTACT_NOTIFICATION_FROM || "onboarding@resend.dev";
  const toAddress = process.env.CONTACT_NOTIFICATION_TO || siteConfig.email;

  await resend.emails.send({
    from: `${siteConfig.name} Website <${fromAddress}>`,
    to: toAddress,
    replyTo: data.email,
    subject: `New inquiry from ${data.name}${data.inquiryType ? ` — ${data.inquiryType}` : ""}`,
    text: [
      `Name: ${data.name}`,
      `Email: ${data.email}`,
      data.inquiryType ? `Inquiry Type: ${data.inquiryType}` : null,
      "",
      "Message:",
      data.message,
    ]
      .filter(Boolean)
      .join("\n"),
  });
}

export async function sendNewsletterConfirmation(email: string): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return;

  const resend = new Resend(apiKey);
  const fromAddress = process.env.CONTACT_NOTIFICATION_FROM || "onboarding@resend.dev";

  await resend.emails.send({
    from: `${siteConfig.name} <${fromAddress}>`,
    to: email,
    subject: "You're subscribed",
    text: `Thanks for subscribing to updates from ${siteConfig.name}. You can reply to this email any time to reach me directly.`,
  });
}
