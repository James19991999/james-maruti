import Link from "next/link";
import type { Metadata } from "next";
import TopNavBar from "@/components/TopNavBar";
import Footer from "@/components/Footer";
import FeatureCard from "@/components/FeatureCard";
import { serviceMethodologySteps, serviceStack, services } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Specialized services from James Maruti: scalable web architecture, psychological UI/UX design, and entity-first technical SEO.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <>
      <TopNavBar />
      <main className="pt-24 overflow-x-hidden">
        <section className="px-gutter md:px-margin-desktop py-section-gap">
          <span className="font-label-mono text-label-mono text-secondary tracking-widest uppercase">
            Architecture &amp; Psychology
          </span>
          <h1 className="font-display-lg text-display-lg-mobile md:text-display-lg text-primary mt-2 mb-6 leading-tight max-w-4xl">
            Specialized Services
          </h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mb-4">
            I bridge the gap between technical rigor and human behavior. By architecting digital
            ecosystems with &ldquo;Entity-First&rdquo; logic and cognitive load optimization, I
            create experiences that perform at scale and resonate at a psychological level.
          </p>
          <p className="font-label-mono text-[11px] text-outline tracking-widest uppercase">
            SYS_ID: MARUTI_X01
          </p>
        </section>

        <section className="px-gutter md:px-margin-desktop pb-section-gap">
          <h2 className="sr-only">Service Offerings</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service) => (
              <FeatureCard key={service.title} {...service} />
            ))}
          </div>
        </section>

        {/* Methodology */}
        <section className="px-gutter md:px-margin-desktop py-section-gap bg-surface-container-low">
          <div className="mb-16">
            <span className="font-label-mono text-label-mono text-secondary tracking-widest uppercase">
              The Methodology
            </span>
            <h2 className="font-headline-md text-headline-md text-primary mt-2">
              A Structured Approach to Growth
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {serviceMethodologySteps.map((step) => (
              <div key={step.number}>
                <p className="font-display-lg text-secondary text-2xl mb-4">{step.number}</p>
                <h3 className="font-headline-md text-lg text-primary mb-2">{step.title}</h3>
                <p className="text-on-surface-variant text-sm">{step.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Service Stack */}
        <section className="px-gutter md:px-margin-desktop py-section-gap">
          <div className="mb-10">
            <h2 className="font-headline-md text-headline-md text-primary mb-2">
              The Service Stack
            </h2>
            <p className="text-on-surface-variant max-w-2xl">
              Modern tools selected for their precision, scalability, and ability to deliver
              elite user experiences.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            {serviceStack.map((tool) => (
              <span
                key={tool}
                className="skill-chip bg-surface-container-high px-4 py-2 rounded font-label-mono text-label-mono"
              >
                {tool}
              </span>
            ))}
          </div>
        </section>

        <section className="px-gutter md:px-margin-desktop py-section-gap bg-surface-container-low text-center">
          <h2 className="font-headline-md text-headline-md text-primary mb-4">
            Ready to scale your digital presence?
          </h2>
          <p className="text-on-surface-variant max-w-2xl mx-auto mb-8">
            Let&apos;s discuss how technical precision and media psychology can drive your
            business forward.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="bg-primary text-on-primary px-8 py-4 rounded font-label-mono text-label-mono text-center hover:bg-primary-container transition-all"
            >
              Get in Touch
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
