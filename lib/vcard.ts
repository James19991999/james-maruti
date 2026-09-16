import { siteConfig } from "@/lib/site-data";

/**
 * Generates vCard 3.0 content (the standard "save to contacts" format) from
 * the same siteConfig every other page uses. Kept as one function so the
 * downloadable .vcf file and the QR code (which encodes this same content
 * directly, not just a URL to it) can never drift apart.
 */
export function buildVCard(): string {
  const [firstName, ...rest] = siteConfig.name.split(" ");
  const lastName = rest.join(" ");

  return [
    "BEGIN:VCARD",
    "VERSION:3.0",
    `N:${lastName};${firstName};;;`,
    `FN:${siteConfig.name}`,
    "TITLE:UI Architect & Digital Strategist",
    `EMAIL;TYPE=INTERNET:${siteConfig.email}`,
    `URL:${siteConfig.url}`,
    `ADR;TYPE=WORK:;;;${siteConfig.location.split(",")[0]};;;${siteConfig.location.split(",")[1]?.trim() ?? ""}`,
    `NOTE:Available for freelance partnerships and enterprise consultations.`,
    "END:VCARD",
  ].join("\r\n");
}
