import TopNavBar from "@/components/TopNavBar";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";
import JsonLd from "@/components/JsonLd";
import { breadcrumbSchema, createPageMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site-data";

export const metadata = createPageMetadata({
  title: "Contact James Maruti | Hire a Next.js Developer",
  description:
    "Contact James Maruti for freelance partnerships, enterprise consultations, and scalable system architecture reviews in Nairobi, Kenya.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "" },
          { name: "Contact", path: "/contact" },
        ])}
      />
      <TopNavBar />
      <main className="pt-24 overflow-x-hidden">
        <section className="px-gutter md:px-margin-desktop py-section-gap">
          <span className="font-label-mono text-label-mono text-secondary tracking-widest uppercase">
            Contact &amp; Inquiry
          </span>
          <h1 className="font-display-lg text-display-lg-mobile md:text-display-lg text-primary mt-2 mb-6 leading-tight max-w-3xl">
            Let&apos;s build something significant.
          </h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl">
            Available for freelance partnerships and high-impact enterprise consultations.
            Together, we can architect digital solutions that bridge technical rigor and human
            psychology.
          </p>
        </section>

        <section className="px-gutter md:px-margin-desktop pb-section-gap">
          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-12">
            <div className="md:col-span-2 space-y-8">
              <div className="flex items-start gap-4">
                <span className="material-symbols-outlined text-primary" aria-hidden="true">
                  alternate_email
                </span>
                <div>
                  <p className="font-label-mono text-[11px] text-secondary tracking-widest uppercase mb-1">
                    Email
                  </p>
                  <a
                    href={`mailto:${siteConfig.email}`}
                    className="text-on-surface-variant hover:text-primary"
                  >
                    {siteConfig.email}
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <span className="material-symbols-outlined text-primary" aria-hidden="true">
                  location_on
                </span>
                <div>
                  <p className="font-label-mono text-[11px] text-secondary tracking-widest uppercase mb-1">
                    Location
                  </p>
                  <p className="text-on-surface-variant">{siteConfig.location}</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <span className="material-symbols-outlined text-primary" aria-hidden="true">
                  share
                </span>
                <div>
                  <p className="font-label-mono text-[11px] text-secondary tracking-widest uppercase mb-1">
                    Professional
                  </p>
                  <a
                    href={siteConfig.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-on-surface-variant hover:text-primary"
                  >
                    LinkedIn Profile
                  </a>
                </div>
              </div>
              <p className="text-on-surface-variant text-sm pt-4 border-t border-outline-variant/20">
                Responses typically delivered within 24-48 business hours.
              </p>
            </div>

            <div className="md:col-span-3 bg-surface-container-low rounded-2xl border border-outline-variant/30 p-8">
              <ContactForm />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
