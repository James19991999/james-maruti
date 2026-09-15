import Link from "next/link";
import TopNavBar from "@/components/TopNavBar";
import Footer from "@/components/Footer";
import Accordion from "@/components/Accordion";
import JsonLd from "@/components/JsonLd";
import { createPageMetadata } from "@/lib/seo";
import { faqs } from "@/lib/site-data";

export const metadata = createPageMetadata({
  title: "FAQ | Working With James Maruti",
  description:
    "Answers to common questions about services, availability, tech stack, and how to start a project with James Maruti.",
  path: "/faq",
});

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  })),
};

export default function FaqPage() {
  return (
    <>
      <JsonLd data={faqSchema} />
      <TopNavBar />
      <main className="pt-24 overflow-x-hidden animate-page-fade-in">
        <section className="px-gutter md:px-margin-desktop py-section-gap">
          <span className="font-label-mono text-label-mono text-secondary tracking-widest uppercase">
            Common Questions
          </span>
          <h1 className="font-display-lg text-display-lg-mobile md:text-display-lg text-primary mt-2 mb-6 leading-tight max-w-3xl">
            Frequently Asked Questions
          </h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl">
            Everything most people ask before starting a project. Anything else, the{" "}
            <Link href="/contact" className="text-secondary hover:underline">
              contact form
            </Link>{" "}
            goes straight through.
          </p>
        </section>

        <section className="px-gutter md:px-margin-desktop pb-section-gap">
          <div className="max-w-3xl mx-auto">
            <h2 className="sr-only">Questions and Answers</h2>
            <Accordion items={faqs} />
          </div>
        </section>

        <section className="px-gutter md:px-margin-desktop pb-section-gap text-center">
          <h2 className="font-headline-md text-headline-md text-primary mb-4">
            Still have a question?
          </h2>
          <Link
            href="/contact"
            className="bg-primary text-on-primary px-8 py-4 rounded font-label-mono text-label-mono hover:bg-primary-container transition-all inline-block"
          >
            Get in Touch
          </Link>
        </section>
      </main>
      <Footer />
    </>
  );
}
