import TopNavBar from "@/components/TopNavBar";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";

import { breadcrumbSchema, createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Terms of Service",
  description: "The terms governing use of the James Maruti portfolio and services.",
  path: "/terms-of-service",
});

const sections = [
  {
    number: "01",
    title: "1. Acceptance of Terms",
    body: [
      "By accessing our services, you agree to these terms. Your engagement with the James Maruti portfolio ecosystem constitutes a binding legal agreement. If you do not agree to these terms, you must cease all use of the platform immediately.",
      'We reserve the right to modify these terms at any time. Significant changes will be communicated via the "Last Updated" timestamp at the top of this document.',
    ],
  },
  {
    number: "02",
    title: "2. Intellectual Property",
    body: [
      "All architectural designs, code snippets, visual assets, and content displayed on this platform are owned by James Maruti unless otherwise explicitly stated.",
      'Users are granted a limited, non-exclusive license to view the materials for professional inquiry. Any unauthorized reproduction, redistribution, or "scraping" of the system\'s logic or design patterns is strictly prohibited and protected under international copyright law.',
    ],
  },
  {
    number: "03",
    title: "3. User Conduct",
    body: [
      "Users agree to use the platform for professional inquiry and authorized collaboration only. We maintain a zero-tolerance policy for malicious technical interference, including but not limited to:",
    ],
    list: [
      "Attempting to circumvent security protocols or data structures.",
      "Automated extraction of proprietary methodology or project data.",
      'Using the platform to distribute unsolicited marketing or "spam."',
    ],
  },
  {
    number: "04",
    title: "4. Limitation of Liability",
    body: [
      "We provide services on an 'as-is' and 'as-available' basis. While we strive for 99.9% architectural integrity, James Maruti makes no warranties regarding the absolute accuracy or uninterrupted availability of the portfolio ecosystem.",
      "In no event shall the owner be liable for any indirect, incidental, or consequential damages arising out of your use or inability to use the site content.",
    ],
  },
  {
    number: "05",
    title: "5. Privacy & Data",
    body: [
      'Your use is also governed by our Privacy Policy. We value the "Human Touch" and treat your professional data with the same rigor we apply to our technical architecture.',
    ],
  },
];

export default function TermsOfServicePage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "" },
          { name: "Terms of Service", path: "/terms-of-service" },
        ])}
      />
      <TopNavBar />
      <main className="pt-24 overflow-x-hidden animate-page-fade-in">
        <section className="px-gutter md:px-margin-desktop py-section-gap">
          <span className="font-label-mono text-label-mono text-secondary tracking-widest uppercase">
            Legal Framework
          </span>
          <h1 className="font-display-lg text-display-lg-mobile md:text-display-lg text-primary mt-2 mb-6 leading-tight">
            Terms of Service
          </h1>
          <p className="flex items-center gap-2 font-label-mono text-[11px] text-outline tracking-widest uppercase mb-4">
            <span className="material-symbols-outlined text-sm" aria-hidden="true">
              calendar_today
            </span>
            Last Updated: May 2024
          </p>
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl">
            Welcome to the Maruti Identity System. These terms govern your use of our platform
            and services. We&apos;ve designed this document to be as architecturally sound as the
            systems we build.
          </p>
        </section>

        <section className="px-gutter md:px-margin-desktop pb-section-gap">
          <div className="max-w-3xl mx-auto space-y-16">
            {sections.map((section) => (
              <div key={section.number} id={`section-${section.number}`}>
                <span className="font-label-mono text-[11px] text-secondary tracking-widest uppercase">
                  {section.number}
                </span>
                <h2 className="font-headline-md text-xl text-primary mt-1 mb-4">
                  {section.title}
                </h2>
                {section.body.map((paragraph, i) => (
                  <p key={i} className="text-on-surface-variant mb-4">
                    {paragraph}
                  </p>
                ))}
                {section.list && (
                  <ul className="space-y-2 text-on-surface-variant">
                    {section.list.map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <span className="material-symbols-outlined text-secondary text-sm mt-1" aria-hidden="true">
                          arrow_forward
                        </span>
                        {item}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </section>

        <section className="px-gutter md:px-margin-desktop pb-section-gap">
          <div className="max-w-3xl mx-auto bg-primary text-on-primary rounded-xl p-8">
            <h2 className="font-headline-md text-lg mb-4">Questions?</h2>
            <p className="opacity-90 mb-6">
              For inquiries regarding our legal structure or data practices.
            </p>
            <div className="flex items-center gap-3 mb-6">
              <span className="material-symbols-outlined" aria-hidden="true">
                mail
              </span>
              <a href="mailto:legal@jamesmaruti.com" className="hover:underline">
                legal@jamesmaruti.com
              </a>
            </div>
            <p className="font-headline-md italic opacity-80">
              &ldquo;Architecture for Human Impact&rdquo;
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
