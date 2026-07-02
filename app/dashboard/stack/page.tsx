import type { Metadata } from "next";
import { serviceStack } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Technical Stack",
  robots: { index: false, follow: false },
};

export default function DashboardStackPage() {
  return (
    <div>
      <h1 className="font-headline-md text-headline-md text-primary mb-2">Technical Stack</h1>
      <p className="text-on-surface-variant mb-10 max-w-2xl">
        The tools currently powering the Maruti architectural ecosystem.
      </p>

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

      <div className="mt-12 bg-surface-container-low rounded-xl p-6 border border-outline-variant/30 max-w-xl">
        <p className="font-label-mono text-[11px] text-secondary uppercase tracking-widest mb-2">
          Coming Soon
        </p>
        <p className="text-on-surface-variant">
          Editable tool ratings, proficiency levels, and integration health checks will live
          here in a future release.
        </p>
      </div>
    </div>
  );
}
