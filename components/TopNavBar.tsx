import Link from "next/link";
import MobileMenu from "./MobileMenu";
import { mainNavLinks } from "@/lib/site-data";

export default function TopNavBar() {
  return (
    <nav
      className="fixed top-0 w-full z-50 bg-surface/70 backdrop-blur-md shadow-sm"
      aria-label="Primary"
    >
      <div className="flex justify-between items-center px-gutter md:px-margin-desktop py-4 max-w-full mx-auto">
        <div className="flex items-center gap-2">
          <Link href="/" className="font-headline-md text-headline-md font-bold text-primary">
            James Maruti
          </Link>
        </div>

        <div className="hidden md:flex items-center gap-8">
          {mainNavLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="font-label-mono text-label-mono text-on-surface-variant hover:text-primary transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <span
            className="material-symbols-outlined text-primary"
            style={{ fontVariationSettings: "'FILL' 1" }}
            aria-label="Verified professional"
            role="img"
          >
            verified
          </span>
          <Link
            href="/contact"
            className="hidden md:block bg-primary text-on-primary px-6 py-2.5 rounded-lg font-label-mono text-label-mono hover:bg-primary-container transition-all active:scale-95"
          >
            Let&apos;s Build
          </Link>
          <MobileMenu />
        </div>
      </div>
    </nav>
  );
}
