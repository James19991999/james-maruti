import Link from "next/link";
import type { Metadata } from "next";
import TopNavBar from "@/components/TopNavBar";
import Footer from "@/components/Footer";
import { createPageMetadata } from "@/lib/seo";
import { expertiseAreas, methodologySteps } from "@/lib/site-data";

export const metadata = createPageMetadata({
  title: "Expertise | Scalable Systems, UI/UX & Technical SEO",
  description:
    "James Maruti's core expertise: scalable Next.js architecture, media psychology-driven UI/UX, and entity-first technical SEO for high-growth ventures.",
  path: "/expertise",
});

export default function ExpertisePage() {
  return (
    <>
      <TopNavBar />
      <main className="pt-24 overflow-x-hidden">
        <section className="px-gutter md:px-margin-desktop py-section-gap">
          <span className="font-label-mono text-label-mono text-secondary tracking-widest uppercase">
            Our Core Expertise
          </span>
          <h1 className="font-display-lg text-display-lg-mobile md:text-display-lg text-primary mt-2 mb-6 leading-tight max-w-4xl">
            Bridging Technical Rigor <br />
            <span className="text-secondary italic font-light">&amp; Human Psychology.</span>
          </h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl">
            I architect enterprise-grade systems that don&apos;t just function—they resonate. By
            combining deep engineering with media psychology and data-driven visibility, I build
            digital assets that scale alongside your ambition.
          </p>
        </section>

        {expertiseAreas.map((area, index) => (
          <section
            key={area.title}
            className={`px-gutter md:px-margin-desktop py-section-gap ${
              index % 2 === 1 ? "bg-surface-container-low" : ""
            }`}
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start max-w-5xl mx-auto">
              <div>
                <span className="font-label-mono text-[11px] text-secondary tracking-widest uppercase">
                  {String(index + 1).padStart(2, "0")}.
                </span>
                <div className="w-12 h-12 bg-primary/5 rounded-lg flex items-center justify-center my-4">
                  <span className="material-symbols-outlined text-primary" aria-hidden="true">
                    {area.icon}
                  </span>
                </div>
                <h2 className="font-headline-md text-headline-md text-primary mb-4">
                  {area.title}
                </h2>
                <p className="text-on-surface-variant">{area.description}</p>
              </div>
              <div className="space-y-8">
                <blockquote className="bg-surface p-6 rounded-xl border-l-4 border-secondary">
                  <p className="font-label-mono text-[11px] text-secondary tracking-widest uppercase mb-3">
                    {area.quoteLabel}
                  </p>
                  <p className="font-headline-md text-lg text-primary italic">
                    &ldquo;{area.quote}&rdquo;
                  </p>
                </blockquote>
                <div>
                  <p className="font-label-mono text-[11px] text-secondary tracking-widest uppercase mb-3">
                    {area.focusLabel}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {area.tags.map((tag) => (
                      <span
                        key={tag}
                        className="bg-surface-container-high px-3 py-1 rounded font-label-mono text-[11px]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>
        ))}

        {/* Methodology */}
        <section className="px-gutter md:px-margin-desktop py-section-gap">
          <div className="mb-16 text-center">
            <span className="font-label-mono text-label-mono text-secondary tracking-widest uppercase">
              Proven Methodology
            </span>
            <h2 className="font-headline-md text-headline-md text-primary mt-2">
              The 4-Step Architecture
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
            {methodologySteps.map((step) => (
              <div key={step.number}>
                <p className="font-display-lg text-secondary text-2xl mb-4">{step.number}</p>
                <h3 className="font-headline-md text-lg text-primary mb-2">{step.title}</h3>
                <p className="text-on-surface-variant text-sm">{step.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="px-gutter md:px-margin-desktop py-section-gap bg-surface-container-low text-center">
          <h2 className="font-headline-md text-headline-md text-primary mb-4">Ready to scale?</h2>
          <p className="text-on-surface-variant max-w-2xl mx-auto mb-8">
            Let&apos;s discuss how we can apply this multidisciplinary expertise to your next
            high-impact project.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="bg-primary text-on-primary px-8 py-4 rounded font-label-mono text-label-mono text-center hover:bg-primary-container transition-all"
            >
              Schedule a Consultation
            </Link>
            <Link
              href="/about"
              className="border border-secondary text-secondary px-8 py-4 rounded font-label-mono text-label-mono text-center hover:bg-secondary-container/10 transition-all"
            >
              Read Philosophy
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
