import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import TopNavBar from "@/components/TopNavBar";
import Footer from "@/components/Footer";
import FeatureCard from "@/components/FeatureCard";
import ProjectCard from "@/components/ProjectCard";
import ContactForm from "@/components/ContactForm";
import {
  expertiseDomains,
  featuredProjects,
  impactHistory,
  homePhilosophy,
  images,
  siteConfig,
} from "@/lib/site-data";

export const metadata: Metadata = {
  title: "James Maruti | Architecting Scalable Systems",
  description: siteConfig.description,
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <TopNavBar />
      <main className="pt-24 overflow-x-hidden">
        {/* Hero Section */}
        <section className="min-h-[819px] flex flex-col justify-center px-gutter md:px-margin-desktop py-section-gap">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-12 lg:gap-16 items-center max-w-7xl mx-auto w-full">
            <div>
              <div className="inline-flex items-center gap-2 mb-6 bg-primary-fixed px-3 py-1 rounded-full">
                <span
                  className="material-symbols-outlined text-primary text-sm"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                  aria-hidden="true"
                >
                  verified
                </span>
                <span className="font-label-mono text-[11px] text-on-primary-fixed tracking-widest uppercase">
                  Verified Professional Architect
                </span>
              </div>
              <h1 className="font-display-lg text-display-lg-mobile md:text-display-lg text-primary mb-6 leading-tight">
                James Maruti. <br />
                <span className="text-secondary italic font-light">
                  Architecting Scalable Systems.
                </span>
              </h1>
              <p className="font-body-lg text-body-lg text-on-surface-variant mb-10 max-w-2xl">
                Designing for Human Psychology. Helping Ventures Scale with Clean Code &amp;
                Advanced SEO.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/expertise"
                  className="bg-primary text-on-primary px-8 py-4 rounded font-label-mono text-label-mono text-center hover:bg-primary-container transition-all"
                >
                  View Expertise
                </Link>
                <Link
                  href="/contact"
                  className="border border-secondary text-secondary px-8 py-4 rounded font-label-mono text-label-mono text-center hover:bg-secondary-container/10 transition-all"
                >
                  Contact Me
                </Link>
              </div>
            </div>

            <div className="relative w-full max-w-xs sm:max-w-sm lg:w-[420px] lg:max-w-none aspect-[4/5] rounded-lg overflow-hidden border-8 border-primary/10 shadow-2xl mx-auto lg:mx-0 shrink-0">
              <Image
                src={images.heroPortrait.src}
                alt={images.heroPortrait.alt}
                fill
                sizes="(min-width: 1024px) 420px, (min-width: 640px) 384px, 320px"
                className="object-cover object-top"
                priority
              />
            </div>
          </div>
        </section>

        {/* Expertise Section */}
        <section
          className="py-section-gap px-gutter md:px-margin-desktop bg-surface-container-low"
          id="expertise"
        >
          <div className="mb-16">
            <span className="font-label-mono text-label-mono text-secondary tracking-widest uppercase">
              Core Domains
            </span>
            <h2 className="font-headline-md text-headline-md text-primary mt-2">
              Technical Rigor &amp; Human Insight
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {expertiseDomains.map((domain) => (
              <FeatureCard key={domain.title} {...domain} />
            ))}
          </div>
        </section>

        {/* Featured Projects Section */}
        <section className="py-section-gap px-gutter md:px-margin-desktop bg-surface" id="projects">
          <div className="mb-16">
            <span className="font-label-mono text-label-mono text-secondary tracking-widest uppercase">
              Portfolio
            </span>
            <h2 className="font-headline-md text-headline-md text-primary mt-2">
              Featured Projects
            </h2>
            <p className="font-body-lg text-on-surface-variant mt-4 max-w-2xl">
              Architecting solutions across SaaS, Education, and Agency platforms.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProjects.map((project) => (
              <ProjectCard key={project.title} {...project} />
            ))}
          </div>
        </section>

        {/* Impact-Driven History Section */}
        <section className="py-section-gap px-gutter md:px-margin-desktop bg-surface-container-low" id="experience">
          <div className="mb-16 text-center">
            <span className="font-label-mono text-label-mono text-secondary tracking-widest uppercase">
              Professional Path
            </span>
            <h2 className="font-headline-md text-headline-md text-primary mt-2">
              Impact-Driven History
            </h2>
          </div>
          <div className="max-w-4xl mx-auto space-y-12">
            {impactHistory.map((entry) => (
              <div
                key={entry.org}
                className="flex flex-col md:flex-row gap-4 md:gap-8 border-b border-outline-variant/20 pb-8"
              >
                <div className="md:w-1/3">
                  <p className="font-label-mono text-label-mono text-secondary">{entry.date}</p>
                  <p className="font-headline-md text-lg text-primary mt-1">{entry.org}</p>
                </div>
                <div className="md:w-2/3">
                  <h3 className="font-headline-md text-xl text-primary mb-2">{entry.role}</h3>
                  <p className="text-on-surface-variant">{entry.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Philosophy Section */}
        <section
          className="py-section-gap px-gutter md:px-margin-desktop bg-primary text-on-primary"
          id="about"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <div className="aspect-square bg-surface-container-highest rounded-lg overflow-hidden border-8 border-white/10">
                <Image
                  className="w-full h-full object-cover object-top"
                  src={images.aboutPortrait.src}
                  alt={images.aboutPortrait.alt}
                  width={800}
                  height={800}
                  sizes="(min-width: 1024px) 500px, 90vw"
                />
              </div>
            </div>
            <div>
              <span className="font-label-mono text-label-mono text-secondary-fixed tracking-widest uppercase">
                {homePhilosophy.eyebrow}
              </span>
              <h2 className="font-headline-md text-headline-md mt-2 mb-6">
                {homePhilosophy.title}
              </h2>
              <div className="space-y-4 text-primary-fixed/90">
                {homePhilosophy.paragraphs.map((paragraph, i) => (
                  <p key={i} className="opacity-90">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Contact CTA Section */}
        <section className="py-section-gap px-gutter md:px-margin-desktop bg-surface-container-low" id="contact">
          <div className="max-w-5xl mx-auto bg-surface rounded-2xl border border-outline-variant/30 p-8 md:p-20 grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h2 className="font-headline-md text-headline-md text-primary mb-4">
                Let&apos;s build something significant.
              </h2>
              <p className="text-on-surface-variant mb-8">
                Available for freelance partnerships and high-impact enterprise consultations.
              </p>
              <ul className="space-y-4">
                <li className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-primary" aria-hidden="true">
                    mail
                  </span>
                  <a href={`mailto:${siteConfig.email}`} className="text-on-surface-variant hover:text-primary">
                    {siteConfig.email}
                  </a>
                </li>
                <li className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-primary" aria-hidden="true">
                    location_on
                  </span>
                  <span className="text-on-surface-variant">{siteConfig.location}</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-primary" aria-hidden="true">
                    link
                  </span>
                  <a
                    href={siteConfig.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-on-surface-variant hover:text-primary"
                  >
                    LinkedIn Profile
                  </a>
                </li>
              </ul>
            </div>
            <ContactForm compact />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
