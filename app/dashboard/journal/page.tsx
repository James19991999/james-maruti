import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Journal",
  robots: { index: false, follow: false },
};

export default function DashboardJournalPage() {
  return (
    <div>
      <h1 className="font-headline-md text-headline-md text-primary mb-2">Journal</h1>
      <p className="text-on-surface-variant mb-10 max-w-2xl">
        A private log for architectural notes, project retrospectives, and technical decisions.
      </p>

      <div className="bg-surface-container-low rounded-xl p-10 border border-dashed border-outline-variant/40 text-center">
        <span className="material-symbols-outlined text-primary text-4xl mb-4" aria-hidden="true">
          history_edu
        </span>
        <h2 className="font-headline-md text-lg text-primary mb-2">No entries yet</h2>
        <p className="text-on-surface-variant max-w-sm mx-auto">
          The journal editor is on the roadmap. Once enabled, entries you write here will sync
          to Firestore under your account.
        </p>
      </div>
    </div>
  );
}
