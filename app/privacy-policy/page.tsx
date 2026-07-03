import TopNavBar from "@/components/TopNavBar";
import Footer from "@/components/Footer";

import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Privacy Policy",
  description: "How James Maruti collects, uses, and protects your personal data.",
  path: "/privacy-policy",
});

const sections = [
  {
    number: "01",
    title: "Information Collection",
    body: [
      "We collect information that you voluntarily provide when engaging with our services or contacting us. This includes:",
    ],
    list: [
      "Identity Data: Full name and professional title.",
      "Contact Data: Email address and phone number.",
      "Project Briefs: Detailed requirements, site information, and architectural preferences.",
    ],
  },
  {
    number: "02",
    title: "Use of Information",
    body: [
      "Your data is processed based on legitimate interest to fulfill our contractual obligations and enhance our digital experience. We use your information to:",
      "Develop tailored architectural solutions, facilitate project communication, and manage administrative records. Furthermore, we analyze non-identifiable usage patterns to optimize our technical infrastructure and SEO strategy.",
    ],
  },
  {
    number: "03",
    title: "Data Retention",
    body: [
      "We retain personal data only for as long as necessary to fulfill the purposes for which it was collected, including for the purposes of satisfying any legal, accounting, or reporting requirements. Project archives are maintained securely for a period of seven years following completion to ensure architectural continuity and warranty support.",
    ],
  },
  {
    number: "04",
    title: "Security Measures",
    quote: "Technical rigor is the shield that protects human creativity.",
    body: [
      "We employ industry-standard encryption (AES-256), secure socket layer (SSL) technology, and strict access controls. Our cloud infrastructure is audited regularly to ensure that project briefs and personal data remain confidential and resilient against unauthorized access.",
    ],
  },
  {
    number: "05",
    title: "Third-Party Sharing",
    body: [
      "We do not sell, trade, or otherwise transfer your personally identifiable information to outside parties. This does not include trusted third parties who assist us in operating our website or servicing you, so long as those parties agree to keep this information confidential.",
    ],
  },
];

const rights = [
  { icon: "visibility", title: "Access & Portability", description: "Request a copy of your personal data in a structured format." },
  { icon: "edit_square", title: "Rectification", description: "Correct any inaccurate or incomplete personal information." },
  { icon: "delete_forever", title: "Erasure", description: "Request the permanent deletion of your data from our systems." },
  { icon: "block", title: "Objection", description: "Object to processing based on legitimate interests." },
];

export default function PrivacyPolicyPage() {
  return (
    <>
      <TopNavBar />
      <main className="pt-24 overflow-x-hidden">
        <section className="px-gutter md:px-margin-desktop py-section-gap">
          <span className="font-label-mono text-label-mono text-secondary tracking-widest uppercase">
            Legal Framework
          </span>
          <h1 className="font-display-lg text-display-lg-mobile md:text-display-lg text-primary mt-2 mb-6 leading-tight">
            Privacy Policy
          </h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mb-4">
            At James Maruti, technical rigor meets human-centric design. Our commitment to data
            protection is an extension of our &ldquo;Architecture for Human Impact&rdquo;
            philosophy—transparent, secure, and respectful of personal space.
          </p>
          <p className="font-label-mono text-[11px] text-outline tracking-widest uppercase">
            Last Updated · May 2024
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
                {section.quote && (
                  <blockquote className="border-l-4 border-secondary pl-4 italic text-primary mb-4">
                    &ldquo;{section.quote}&rdquo;
                  </blockquote>
                )}
                {section.body.map((paragraph, i) => (
                  <p key={i} className="text-on-surface-variant mb-4">
                    {paragraph}
                  </p>
                ))}
                {section.list && (
                  <ul className="space-y-2 list-disc list-inside text-on-surface-variant">
                    {section.list.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}

            <div>
              <span className="font-label-mono text-[11px] text-secondary tracking-widest uppercase">
                06
              </span>
              <h2 className="font-headline-md text-xl text-primary mt-1 mb-4">Your Rights</h2>
              <p className="text-on-surface-variant mb-6">
                Under global data protection regulations (including GDPR and CCPA), you have the
                right to:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {rights.map((right) => (
                  <div
                    key={right.title}
                    className="bg-surface-container-low rounded-xl p-6 border border-outline-variant/30"
                  >
                    <span className="material-symbols-outlined text-primary mb-2" aria-hidden="true">
                      {right.icon}
                    </span>
                    <h3 className="font-headline-md text-lg text-primary mb-1">{right.title}</h3>
                    <p className="text-on-surface-variant text-sm">{right.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="px-gutter md:px-margin-desktop pb-section-gap">
          <div className="max-w-3xl mx-auto bg-surface-container-low rounded-xl p-8 border border-outline-variant/30">
            <h2 className="font-headline-md text-lg text-primary mb-4">Privacy Inquiries</h2>
            <p className="text-on-surface-variant mb-6">
              For any questions regarding this policy or to exercise your rights, please reach
              out to our dedicated privacy desk.
            </p>
            <div className="flex items-center gap-3 mb-2">
              <span className="material-symbols-outlined text-primary" aria-hidden="true">
                mail
              </span>
              <a href="mailto:privacy@marutiarchitect.com" className="text-on-surface-variant hover:text-primary">
                privacy@marutiarchitect.com
              </a>
            </div>
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-primary" aria-hidden="true">
                location_on
              </span>
              <span className="text-on-surface-variant">Global Operations</span>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
