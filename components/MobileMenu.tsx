"use client";

import { useState } from "react";
import Link from "next/link";
import { mainNavLinks } from "@/lib/site-data";

export default function MobileMenu() {
  const [open, setOpen] = useState(false);

  return (
    <div className="md:hidden">
      <button
        type="button"
        className="text-primary"
        aria-expanded={open}
        aria-controls="mobile-nav-panel"
        aria-label={open ? "Close menu" : "Open menu"}
        onClick={() => setOpen((v) => !v)}
      >
        <span className="material-symbols-outlined" aria-hidden="true">
          {open ? "close" : "menu"}
        </span>
      </button>

      {open && (
        <div
          id="mobile-nav-panel"
          className="fixed inset-x-0 top-[72px] z-50 border-t border-outline-variant/30 bg-surface/95 backdrop-blur-md shadow-sm"
        >
          <nav aria-label="Mobile" className="flex flex-col px-gutter py-6 gap-6">
            {mainNavLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="font-label-mono text-label-mono text-on-surface-variant hover:text-primary transition-colors"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/contact"
              className="bg-primary text-on-primary px-6 py-2.5 rounded-lg font-label-mono text-label-mono text-center hover:bg-primary-container transition-all active:scale-95"
              onClick={() => setOpen(false)}
            >
              Let&apos;s Build
            </Link>
          </nav>
        </div>
      )}
    </div>
  );
}
