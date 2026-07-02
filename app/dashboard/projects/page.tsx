import type { Metadata } from "next";
import { featuredProjects } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Projects",
  robots: { index: false, follow: false },
};

export default function DashboardProjectsPage() {
  return (
    <div>
      <h1 className="font-headline-md text-headline-md text-primary mb-2">Projects</h1>
      <p className="text-on-surface-variant mb-10 max-w-2xl">
        Manage architectural case studies and project archives. Full CRUD editing tools for this
        panel are on the roadmap — for now, here&apos;s a read-only view of the live portfolio.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {featuredProjects.map((project) => (
          <div
            key={project.title}
            className="bg-surface-container-low rounded-xl p-6 border border-outline-variant/30"
          >
            <p className="font-label-mono text-[11px] text-secondary uppercase tracking-widest mb-1">
              {project.category}
            </p>
            <h2 className="font-headline-md text-lg text-primary mb-2">{project.title}</h2>
            <p className="text-on-surface-variant text-sm">{project.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
