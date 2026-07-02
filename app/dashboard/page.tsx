import type { Metadata } from "next";
import Link from "next/link";
import { dashboardNavLinks, featuredProjects } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Dashboard Overview",
  robots: { index: false, follow: false },
};

export default function DashboardOverviewPage() {
  return (
    <div>
      <h1 className="font-headline-md text-headline-md text-primary mb-2">Overview</h1>
      <p className="text-on-surface-variant mb-10 max-w-2xl">
        A snapshot of your architectural ecosystem — projects, technical stack, and recent
        activity in one place.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
        <div className="bg-surface-container-low rounded-xl p-6 border border-outline-variant/30">
          <p className="font-display-lg text-2xl text-primary">{featuredProjects.length}</p>
          <p className="text-on-surface-variant text-sm mt-1">Active Projects</p>
        </div>
        <div className="bg-surface-container-low rounded-xl p-6 border border-outline-variant/30">
          <p className="font-display-lg text-2xl text-primary">99.9%</p>
          <p className="text-on-surface-variant text-sm mt-1">System Reliability</p>
        </div>
        <div className="bg-surface-container-low rounded-xl p-6 border border-outline-variant/30">
          <p className="font-display-lg text-2xl text-primary">24-48h</p>
          <p className="text-on-surface-variant text-sm mt-1">Typical Response Time</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {dashboardNavLinks
          .filter((link) => link.href !== "/dashboard")
          .map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="flex items-center gap-4 bg-surface-container-low rounded-xl p-6 border border-outline-variant/30 hover-lift"
            >
              <span className="material-symbols-outlined text-primary" aria-hidden="true">
                {link.icon}
              </span>
              <div>
                <p className="font-headline-md text-lg text-primary">{link.label}</p>
                <p className="text-on-surface-variant text-sm">Go to {link.label.toLowerCase()}</p>
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
}
