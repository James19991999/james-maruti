import Link from "next/link";
import Image from "next/image";
import TopNavBar from "@/components/TopNavBar";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import GithubActivity, { fetchGithubActivity } from "@/components/GithubActivity";
import { breadcrumbSchema, createPageMetadata } from "@/lib/seo";
import { foundationalValues, images, journeyMilestones, philosophyPillars, siteConfig } from "@/lib/site-data";

export const metadata = createPageMetadata({
  title: "About James Maruti | UI Architect & Next.js Developer",
  description:
    "The philosophy behind James Maruti's practice: bridging technical rigor with media psychology, from linguistics theory to advanced Next.js architecture in Nairobi, Kenya.",
  path: "/about",
});

export default async function AboutPage() {
  const githubActivity = await fetchGithubActivity();

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "" },
          { name: "About", path: "/about" },
        ])}
      />
      <TopNavBar />
      <main className="pt-24 overflow-x-hidden animate-page-fade-in">
        {/* Header */}
        <section className="px-gutter md:px-margin-desktop py-section-gap">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-12 items-start">
            <div>
              <span className="font-label-mono text-label-mono text-secondary tracking-widest uppercase">
                The Architect&apos;s Origin
              </span>
              <h1 className="font-display-lg text-display-lg-mobile md:text-display-lg text-primary mt-2 mb-6 leading-tight max-w-4xl">
                The Architect Behind <br />
                <span className="text-secondary italic font-light">The Systems.</span>
              </h1>
              <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl">
                Specializing at the critical intersection of media psychology and technical
                precision. I don&apos;t just build applications; I architect digital ecosystems that
                resonate with human cognition while maintaining rigorous code integrity.
              </p>
            </div>
            <div className="relative w-56 h-72 lg:w-64 lg:h-80 rounded-lg overflow-hidden border-8 border-primary/10 shrink-0 mx-auto lg:mx-0">
              <Image
                src={images.heroPortrait.src}
                alt={images.heroPortrait.alt}
                fill
                sizes="(min-width: 1024px) 256px, 224px"
                className="object-cover object-top"
                priority
              />
            </div>
          </div>
        </section>

        {/* Bridging Rigor & Psychology */}
        <section className="px-gutter md:px-margin-desktop py-section-gap bg-surface-container-low">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-16">
            <div>
              <span className="font-label-mono text-label-mono text-secondary tracking-widest uppercase">
                Bridging Rigor
              </span>
              <span className="font-label-mono text-label-mono text-on-surface-variant tracking-widest uppercase">
                {" "}
                &amp; Psychology
              </span>
              <h2 className="font-headline-md text-headline-md text-primary mt-4 mb-6">
                Engineering is more than syntax.
              </h2>
              <p className="text-on-surface-variant mb-4">
                It is the practice of mapping complex data structures to the mental models of a
                user. My philosophy centers on the belief that code should be empathetic—it must
                anticipate friction before it occurs.
              </p>
              <p className="text-on-surface-variant mb-8">
                By leveraging my background in linguistics and media communication, I translate
                human intent into high-performance React architectures. Every component is a node
                in a larger psychological journey, designed to reduce cognitive load and maximize
                engagement.
              </p>
              <Link
                href="/expertise"
                className="inline-flex items-center gap-2 text-secondary font-label-mono text-label-mono hover:gap-4 transition-all"
              >
                Read Philosophy{" "}
                <span className="material-symbols-outlined text-sm" aria-hidden="true">
                  arrow_forward
                </span>
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {philosophyPillars.map((pillar) => (
                <div
                  key={pillar.title}
                  className="bg-surface p-6 rounded-xl border border-outline-variant/30"
                >
                  <span className="material-symbols-outlined text-primary mb-3" aria-hidden="true">
                    {pillar.icon}
                  </span>
                  <h3 className="font-headline-md text-lg text-primary mb-1">{pillar.title}</h3>
                  <p className="text-on-surface-variant text-sm">{pillar.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Foundational Values */}
        <section className="px-gutter md:px-margin-desktop py-section-gap">
          <h2 className="font-headline-md text-headline-md text-primary mb-16 text-center">
            Foundational Values
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {foundationalValues.map((value) => (
              <div key={value.number}>
                <p className="font-display-lg text-secondary text-2xl mb-4">{value.number}</p>
                <h3 className="font-headline-md text-xl text-primary mb-3">{value.title}</h3>
                <p className="text-on-surface-variant">{value.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* The Journey */}
        <section className="px-gutter md:px-margin-desktop py-section-gap bg-surface-container-low">
          <div className="mb-16">
            <h2 className="font-headline-md text-headline-md text-primary mb-2">The Journey</h2>
            <p className="text-on-surface-variant">
              From linguistic theory to advanced algorithmic architecture.
            </p>
          </div>
          <div className="max-w-4xl mx-auto space-y-16">
            {journeyMilestones.map((milestone) => (
              <div key={milestone.title} className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div>
                  <p className="font-label-mono text-label-mono text-secondary">
                    {milestone.date}
                  </p>
                  <p className="font-headline-md text-lg text-primary mt-1">{milestone.org}</p>
                </div>
                <div className="md:col-span-2">
                  <h3 className="font-headline-md text-xl text-primary mb-3">
                    {milestone.title}
                  </h3>
                  <p className="text-on-surface-variant mb-4">{milestone.description}</p>
                  {milestone.tags && (
                    <div className="flex flex-wrap gap-2">
                      {milestone.tags.map((tag) => (
                        <span
                          key={tag}
                          className="bg-surface-container-high px-3 py-1 rounded font-label-mono text-[11px]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* GitHub Activity — the whole section is omitted if GITHUB_TOKEN isn't configured */}
        {githubActivity && (
          <section className="px-gutter md:px-margin-desktop py-section-gap">
            <div className="max-w-4xl mx-auto">
              <h2 className="font-headline-md text-headline-md text-primary mb-2">
                Recent Activity
              </h2>
              <p className="text-on-surface-variant mb-8">
                The code doesn&apos;t stop at the portfolio — here&apos;s what&apos;s actually
                shipping.
              </p>
              <GithubActivity data={githubActivity} />
            </div>
          </section>
        )}

        {/* CTA */}
        <section className="px-gutter md:px-margin-desktop py-section-gap text-center">
          <h2 className="font-headline-md text-headline-md text-primary mb-4">
            Architect the Future Together
          </h2>
          <p className="text-on-surface-variant max-w-2xl mx-auto mb-8">
            I am currently seeking collaborations with high-growth ventures and design agencies
            who value precision, psychology, and performance.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="bg-primary text-on-primary px-8 py-4 rounded font-label-mono text-label-mono text-center hover:bg-primary-container transition-all inline-flex items-center justify-center gap-2"
            >
              Get in Touch{" "}
              <span className="material-symbols-outlined text-sm" aria-hidden="true">
                arrow_forward
              </span>
            </Link>
            <a
              href={siteConfig.cvUrl}
              download
              className="border border-secondary text-secondary px-8 py-4 rounded font-label-mono text-label-mono text-center hover:bg-secondary-container/10 transition-all inline-flex items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined text-sm" aria-hidden="true">
                download
              </span>
              Download CV
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
