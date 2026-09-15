import Link from "next/link";
import TopNavBar from "@/components/TopNavBar";
import Footer from "@/components/Footer";
import { createPageMetadata } from "@/lib/seo";
import { experienceEntries, expertiseAreas, siteConfig } from "@/lib/site-data";

export const metadata = createPageMetadata({
  title: "Now",
  description: `What ${siteConfig.name} is currently focused on.`,
  path: "/now",
});

const currentRole = experienceEntries[0];

export default function NowPage() {
  return (
    <>
      <TopNavBar />
      <main className="pt-24 overflow-x-hidden animate-page-fade-in">
        <section className="px-gutter md:px-margin-desktop py-section-gap">
          <span className="font-label-mono text-label-mono text-secondary tracking-widest uppercase">
            /now
          </span>
          <h1 className="font-display-lg text-display-lg-mobile md:text-display-lg text-primary mt-2 mb-6 leading-tight max-w-3xl">
            What I&apos;m focused on right now.
          </h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl">
            A{" "}
            <a
              href="https://nownownow.com/about"
              target="_blank"
              rel="noopener noreferrer"
              className="text-secondary hover:underline"
            >
              /now page
            </a>
            , for anyone who prefers a snapshot over a full resume.
          </p>
        </section>

        <section className="px-gutter md:px-margin-desktop pb-section-gap">
          <div className="max-w-2xl mx-auto space-y-12">
            <div>
              <span className="font-label-mono text-[11px] text-secondary uppercase tracking-widest">
                Currently
              </span>
              <h2 className="font-headline-md text-xl text-primary mt-1 mb-3">
                {currentRole.role} at {currentRole.org}
              </h2>
              <p className="text-on-surface-variant">
                {currentRole.date}. Focused on Webflow and WordPress performance work and
                technical SEO visibility — the kind of measurable, infrastructure-level
                improvements described on the{" "}
                <Link href="/experience" className="text-secondary hover:underline">
                  experience page
                </Link>
                .
              </p>
            </div>

            <div>
              <span className="font-label-mono text-[11px] text-secondary uppercase tracking-widest">
                Sharpening
              </span>
              <h2 className="font-headline-md text-xl text-primary mt-1 mb-3">
                {expertiseAreas[2].title}
              </h2>
              <p className="text-on-surface-variant">{expertiseAreas[2].description}</p>
            </div>

            <div>
              <span className="font-label-mono text-[11px] text-secondary uppercase tracking-widest">
                Recently shipped
              </span>
              <h2 className="font-headline-md text-xl text-primary mt-1 mb-3">
                This portfolio
              </h2>
              <p className="text-on-surface-variant">
                The site you&apos;re on — rebuilt from the ground up on Next.js, with the{" "}
                <Link href="/schema" className="text-secondary hover:underline">
                  entity schema
                </Link>{" "}
                and{" "}
                <Link href="/faq" className="text-secondary hover:underline">
                  FAQ
                </Link>{" "}
                pages as recent additions.
              </p>
            </div>

            <div>
              <span className="font-label-mono text-[11px] text-secondary uppercase tracking-widest">
                Open to
              </span>
              <h2 className="font-headline-md text-xl text-primary mt-1 mb-3">
                Freelance partnerships &amp; consultations
              </h2>
              <p className="text-on-surface-variant">
                See{" "}
                <Link href="/contact" className="text-secondary hover:underline">
                  the contact page
                </Link>{" "}
                for the fastest way to reach me.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
