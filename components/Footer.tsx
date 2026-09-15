import Link from "next/link";
import dynamic from "next/dynamic";
import { footerLinks, legalFooterLinks } from "@/lib/site-data";
import Logo from "./Logo";

const NewsletterForm = dynamic(() => import("./NewsletterForm"));

export default function Footer() {
  return (
    <footer className="border-t border-outline-variant/30 bg-surface-container-low">
      <div className="px-gutter md:px-margin-desktop py-10 max-w-full mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
        <div>
          <Link href="/" className="inline-flex items-center">
            <Logo size={32} />
            <span className="sr-only">James Maruti</span>
          </Link>
          <p className="font-label-mono text-[11px] text-on-surface-variant mt-1">
            Architecting the future of the web.
          </p>
          <nav aria-label="Social" className="flex flex-wrap gap-6 mt-6">
            {footerLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={link.href.startsWith("http") ? "_blank" : undefined}
                rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="font-label-mono text-label-mono text-on-surface-variant hover:text-primary transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>

        <div className="relative md:justify-self-center">
          <NewsletterForm />
        </div>

        <p className="font-label-mono text-[11px] text-on-surface-variant md:justify-self-end">
          © {new Date().getFullYear()} James Maruti. All rights reserved.
        </p>
      </div>

      <div className="border-t border-outline-variant/20 px-gutter md:px-margin-desktop py-4">
        <nav aria-label="Legal" className="flex flex-wrap gap-6">
          {legalFooterLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="font-label-mono text-[11px] text-on-surface-variant hover:text-primary transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  );
}
