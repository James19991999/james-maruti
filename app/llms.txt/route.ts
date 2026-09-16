import { NextResponse } from "next/server";
import {
  siteConfig,
  services,
  expertiseAreas,
  featuredProjects,
  experienceEntries,
  faqs,
} from "@/lib/site-data";

/**
 * llms.txt (see https://llmstxt.org) — a proposed convention, analogous to
 * robots.txt or sitemap.xml, for giving AI agents and LLMs a concise,
 * curated map of a site's content instead of making them crawl and parse
 * full HTML. Built from lib/site-data.ts, the same source every other page
 * uses, so this can't drift out of sync with what's actually on the site.
 *
 * Not a Next.js built-in file convention (unlike sitemap.ts/robots.ts) —
 * implemented as a route handler in a literally-named "llms.txt" folder,
 * which Next.js's App Router maps directly to the /llms.txt URL.
 */
export async function GET() {
  const lines: string[] = [];

  lines.push(`# ${siteConfig.name}`);
  lines.push("");
  lines.push(`> ${siteConfig.description}`);
  lines.push("");
  lines.push(
    `${siteConfig.name} is based in ${siteConfig.location} and is available for freelance partnerships and enterprise consultations.`
  );
  lines.push("");

  lines.push("## Services");
  for (const service of services) {
    lines.push(`- **${service.title}**: ${service.description}`);
  }
  lines.push("");

  lines.push("## Expertise");
  for (const area of expertiseAreas) {
    lines.push(`- **${area.title}**: ${area.description}`);
  }
  lines.push("");

  lines.push("## Experience");
  for (const entry of experienceEntries) {
    lines.push(`- ${entry.role} at ${entry.org} (${entry.date})`);
  }
  lines.push("");

  lines.push("## Projects");
  for (const project of featuredProjects) {
    if (project.comingSoon) continue;
    lines.push(`- **${project.title}** (${project.category}): ${project.description}`);
  }
  lines.push("");

  lines.push("## Frequently Asked Questions");
  for (const faq of faqs) {
    lines.push(`- **${faq.question}** ${faq.answer}`);
  }
  lines.push("");

  lines.push("## Pages");
  lines.push(`- [Home](${siteConfig.url}/): Overview, hero, and featured projects`);
  lines.push(`- [About](${siteConfig.url}/about): Background, philosophy, and journey`);
  lines.push(`- [Expertise](${siteConfig.url}/expertise): Detailed breakdown of core expertise`);
  lines.push(`- [Experience](${siteConfig.url}/experience): Full professional timeline`);
  lines.push(`- [Services](${siteConfig.url}/services): Service offerings and methodology`);
  lines.push(`- [FAQ](${siteConfig.url}/faq): Common questions about working together`);
  lines.push(`- [Now](${siteConfig.url}/now): Current focus`);
  lines.push(`- [Contact](${siteConfig.url}/contact): Get in touch`);
  lines.push(`- [Entity Schema](${siteConfig.url}/schema): Published structured data, in the open`);
  lines.push("");

  lines.push("## Contact");
  lines.push(`- Email: ${siteConfig.email}`);
  lines.push(`- LinkedIn: ${siteConfig.linkedin}`);
  lines.push(`- GitHub: ${siteConfig.github}`);

  return new NextResponse(lines.join("\n"), {
    headers: { "Content-Type": "text/markdown; charset=utf-8" },
  });
}
