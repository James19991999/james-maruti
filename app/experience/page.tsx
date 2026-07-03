import type { Metadata } from "next";
import TopNavBar from "@/components/TopNavBar";
import Footer from "@/components/Footer";
import { createPageMetadata } from "@/lib/seo";
import { almaMater, experienceEntries, siteConfig } from "@/lib/site-data";

export const metadata = createPageMetadata({
  title: "Experience | Web Design & Development Career",
  description:
    "James Maruti's professional timeline: JG Creative Tech Solution, freelance design, and digital architecture work across Nairobi and Kenya.",
  path: "/experience",
});

export default function ExperiencePage() {
  return (
    <>
      <TopNavBar />
      <main className="pt-24 overflow-x-hidden">
        <section className="px-gutter md:px-margin-desktop py-section-gap">
          <span className="font-label-mono text-label-mono text-secondary tracking-widest uppercase">
            The Architect&apos;s Log
          </span>
          <h1 className="font-display-lg text-display-lg-mobile md:text-display-lg text-primary mt-2 mb-6 leading-tight max-w-4xl">
            Professional Journey <br />
            <span className="text-secondary italic font-light">&amp; Impact</span>
          </h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl">
            A timeline of architecting digital ecosystems, driving growth, and bridging technical
            rigor with human experience.
          </p>
        </section>

        <section className="px-gutter md:px-margin-desktop pb-section-gap">
          <div className="max-w-4xl mx-auto space-y-8">
            {experienceEntries.map((entry) => (
              <div
                key={entry.org}
                className="bg-surface-container-low rounded-xl border border-outline-variant/30 p-8"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-primary/5 rounded-lg flex items-center justify-center">
                      <span className="material-symbols-outlined text-primary" aria-hidden="true">
                        {entry.icon}
                      </span>
                    </div>
                    <div>
                      <h2 className="font-headline-md text-xl text-primary">{entry.org}</h2>
                      <p className="font-label-mono text-label-mono text-secondary">
                        {entry.date}
                      </p>
                    </div>
                  </div>
                </div>
                <p className="font-headline-md text-lg text-on-surface-variant mb-6">
                  {entry.role}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {entry.stats.map((stat, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-3 bg-surface rounded-lg p-4 border border-outline-variant/20"
                    >
                      {stat.icon && (
                        <span className="material-symbols-outlined text-secondary" aria-hidden="true">
                          {stat.icon}
                        </span>
                      )}
                      <div>
                        {stat.value && (
                          <p className="font-headline-md text-lg text-primary">{stat.value}</p>
                        )}
                        <p className="text-on-surface-variant text-sm">{stat.label}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}

            {/* Alma Mater */}
            <div className="bg-primary text-on-primary rounded-xl p-8">
              <span className="font-label-mono text-[11px] text-secondary-fixed tracking-widest uppercase">
                Alma Mater
              </span>
              <div className="flex items-center gap-4 mt-4 mb-2">
                <span className="material-symbols-outlined" aria-hidden="true">
                  auto_stories
                </span>
                <div>
                  <h2 className="font-headline-md text-xl">{almaMater.org}</h2>
                  <p className="font-label-mono text-label-mono opacity-80">{almaMater.date}</p>
                </div>
              </div>
              <p className="opacity-90 mb-1">{almaMater.degree}</p>
              <p className="opacity-70 text-sm">{almaMater.note}</p>
            </div>
          </div>
        </section>

        <section className="px-gutter md:px-margin-desktop pb-section-gap text-center">
          <h2 className="font-headline-md text-headline-md text-primary mb-8">
            Ready to bring technical rigor to your next project?
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={siteConfig.cvUrl}
              download
              className="bg-primary text-on-primary px-8 py-4 rounded font-label-mono text-label-mono text-center hover:bg-primary-container transition-all inline-flex items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined text-sm" aria-hidden="true">
                download
              </span>
              Download CV
            </a>
            <a
              href={siteConfig.cvUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="border border-secondary text-secondary px-8 py-4 rounded font-label-mono text-label-mono text-center hover:bg-secondary-container/10 transition-all"
            >
              View Detailed Resume
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
