import type { Metadata } from "next";
import { siteConfig } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Support",
  robots: { index: false, follow: false },
};

export default function DashboardSupportPage() {
  return (
    <div>
      <h1 className="font-headline-md text-headline-md text-primary mb-2">Support</h1>
      <p className="text-on-surface-variant mb-10 max-w-2xl">
        Need help with the dashboard or a live project? Reach out directly.
      </p>

      <div className="bg-surface-container-low rounded-xl p-8 border border-outline-variant/30 max-w-lg">
        <div className="flex items-center gap-3 mb-2">
          <span className="material-symbols-outlined text-primary" aria-hidden="true">
            mail
          </span>
          <a href={`mailto:${siteConfig.email}`} className="text-on-surface-variant hover:text-primary">
            {siteConfig.email}
          </a>
        </div>
        <p className="text-on-surface-variant text-sm mt-4">
          Typical response time is 24-48 business hours.
        </p>
      </div>
    </div>
  );
}
