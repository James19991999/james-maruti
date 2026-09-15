import Link from "next/link";
import TopNavBar from "@/components/TopNavBar";
import Footer from "@/components/Footer";
import { createPageMetadata } from "@/lib/seo";
import { personSchema, siteConfig } from "@/lib/site-data";

export const metadata = createPageMetadata({
  title: "Entity Schema | Structured Data Documentation",
  description:
    "The JSON-LD structured data James Maruti's site publishes for entity-first technical SEO — transparently documented.",
  path: "/schema",
});

const fields = [
  { key: "@type", label: "Entity Type", value: personSchema["@type"] },
  { key: "name", label: "Name", value: personSchema.name },
  { key: "jobTitle", label: "Job Title", value: personSchema.jobTitle },
  { key: "url", label: "Canonical URL", value: personSchema.url },
  { key: "address", label: "Location", value: "Nairobi, KE" },
  { key: "alumniOf", label: "Alma Mater", value: personSchema.alumniOf.name },
];

export default function SchemaPage() {
  return (
    <>
      <TopNavBar />
      <main className="pt-24 overflow-x-hidden animate-page-fade-in">
        <section className="px-gutter md:px-margin-desktop py-section-gap">
          <span className="font-label-mono text-label-mono text-secondary tracking-widest uppercase">
            Entity-First SEO
          </span>
          <h1 className="font-display-lg text-display-lg-mobile md:text-display-lg text-primary mt-2 mb-6 leading-tight max-w-4xl">
            Entity Schema
          </h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl">
            This site practices what it preaches on Entity-First SEO: every page publishes a
            machine-readable <code className="font-label-mono">Person</code> schema in JSON-LD so
            search engines understand who James Maruti is, not just what keywords appear on the
            page. Here it is, in the open.
          </p>
        </section>

        <section className="px-gutter md:px-margin-desktop pb-section-gap">
          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h2 className="font-headline-md text-xl text-primary mb-6">Key Properties</h2>
              <dl className="space-y-4">
                {fields.map((field) => (
                  <div key={field.key} className="border-b border-outline-variant/20 pb-4">
                    <dt className="font-label-mono text-[11px] text-secondary uppercase tracking-widest mb-1">
                      {field.label}
                    </dt>
                    <dd className="text-on-surface-variant break-words">{field.value}</dd>
                  </div>
                ))}
                <div className="border-b border-outline-variant/20 pb-4">
                  <dt className="font-label-mono text-[11px] text-secondary uppercase tracking-widest mb-1">
                    Same As
                  </dt>
                  <dd className="space-y-1">
                    {personSchema.sameAs.map((url) => (
                      <a
                        key={url}
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block text-on-surface-variant hover:text-primary break-words"
                      >
                        {url}
                      </a>
                    ))}
                  </dd>
                </div>
                <div>
                  <dt className="font-label-mono text-[11px] text-secondary uppercase tracking-widest mb-1">
                    Knows About
                  </dt>
                  <dd className="flex flex-wrap gap-2 mt-2">
                    {personSchema.knowsAbout.map((topic) => (
                      <span
                        key={topic}
                        className="bg-surface-container-high px-3 py-1 rounded font-label-mono text-[11px]"
                      >
                        {topic}
                      </span>
                    ))}
                  </dd>
                </div>
              </dl>
            </div>

            <div>
              <h2 className="font-headline-md text-xl text-primary mb-6">Raw JSON-LD</h2>
              <pre className="bg-primary text-on-primary rounded-xl p-6 overflow-x-auto text-xs leading-relaxed font-label-mono">
                {JSON.stringify(personSchema, null, 2)}
              </pre>
              <p className="text-on-surface-variant text-sm mt-4">
                This exact object is embedded as a{" "}
                <code className="font-label-mono">&lt;script type=&quot;application/ld+json&quot;&gt;</code>{" "}
                tag in the page <code className="font-label-mono">&lt;head&gt;</code> on every
                route.
              </p>
            </div>
          </div>
        </section>

        <section className="px-gutter md:px-margin-desktop pb-section-gap text-center">
          <p className="text-on-surface-variant max-w-xl mx-auto mb-6">
            Want this level of technical rigor applied to your own site&apos;s search visibility?
          </p>
          <Link
            href="/contact"
            className="bg-primary text-on-primary px-8 py-4 rounded font-label-mono text-label-mono hover:bg-primary-container transition-all inline-block"
          >
            Talk SEO Strategy
          </Link>
          <p className="font-label-mono text-[11px] text-outline tracking-widest uppercase mt-6">
            {siteConfig.url}
          </p>
        </section>
      </main>
      <Footer />
    </>
  );
}
