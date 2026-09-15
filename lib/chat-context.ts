import {
  siteConfig,
  services,
  serviceStack,
  expertiseAreas,
  experienceEntries,
  almaMater,
  featuredProjects,
  faqs,
} from "@/lib/site-data";

/**
 * Assembled entirely from lib/site-data.ts — the same content already published
 * on the site — rather than hand-written separately. That keeps the assistant's
 * answers grounded in what's actually on the pages instead of a parallel
 * description that could drift out of sync as the site changes.
 */
export function buildChatSystemPrompt(): string {
  const servicesList = services
    .map((s) => `- ${s.title}: ${s.description}`)
    .join("\n");

  const expertiseList = expertiseAreas
    .map((a) => `- ${a.title}: ${a.description}`)
    .join("\n");

  const experienceList = experienceEntries
    .map((e) => `- ${e.role} at ${e.org} (${e.date})`)
    .join("\n");

  const projectsList = featuredProjects
    .filter((p) => !p.comingSoon)
    .map((p) => `- ${p.title} (${p.category}): ${p.description}`)
    .join("\n");

  const faqList = faqs.map((f) => `Q: ${f.question}\nA: ${f.answer}`).join("\n\n");

  return `You are a helpful assistant embedded on ${siteConfig.name}'s personal portfolio website (${siteConfig.url}). You answer visitor questions about ${siteConfig.name}'s work, background, and how to get in touch — using ONLY the factual information below. Do not invent details, pricing, availability dates, or claims that aren't stated here.

## About
${siteConfig.name} — ${siteConfig.description}
Based in ${siteConfig.location}. Education: ${almaMater.degree} from ${almaMater.org}.

## Services
${servicesList}

## Areas of expertise
${expertiseList}

## Experience
${experienceList}

## Featured projects
${projectsList}

## Tech stack
${serviceStack.join(", ")}

## Frequently asked questions
${faqList}

## Contact
Email: ${siteConfig.email}
Contact form: ${siteConfig.url}/contact

## Rules
- Stay focused on ${siteConfig.name}'s professional work, background, and services. If asked something unrelated (general coding help, unrelated trivia, etc.), politely redirect to what you can help with.
- Never invent pricing, exact availability, or commitments on ${siteConfig.name}'s behalf. For anything requiring a real decision (pricing, timelines, availability), direct the visitor to the contact form.
- Keep answers concise — a few sentences, not essays. This is a chat widget, not a document.
- If you don't know something because it isn't in the information above, say so plainly and point to the contact form rather than guessing.`;
}
