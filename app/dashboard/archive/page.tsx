import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Archive",
  robots: { index: false, follow: false },
};

export default function DashboardArchivePage() {
  return (
    <div>
      <h1 className="font-headline-md text-headline-md text-primary mb-2">Archive</h1>
      <p className="text-on-surface-variant mb-10 max-w-2xl">
        Completed projects and retired inquiries will be stored here for long-term reference.
      </p>

      <div className="bg-surface-container-low rounded-xl p-10 border border-dashed border-outline-variant/40 text-center">
        <span className="material-symbols-outlined text-primary text-4xl mb-4" aria-hidden="true">
          inventory_2
        </span>
        <h2 className="font-headline-md text-lg text-primary mb-2">Archive is empty</h2>
        <p className="text-on-surface-variant max-w-sm mx-auto">
          Nothing has been archived yet. Completed work will appear here automatically.
        </p>
      </div>
    </div>
  );
}
