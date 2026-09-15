"use client";

import { useEffect } from "react";
import * as Sentry from "@sentry/nextjs";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
    Sentry.captureException(error);
  }, [error]);

  return (
    <html lang="en">
      <body className="font-body-md">
        <main className="min-h-screen flex items-center justify-center px-6 bg-[#fcf9f8] text-[#00113a]">
          <div className="text-center max-w-lg">
            <p className="font-mono text-xs tracking-widest uppercase text-[#884f45] mb-4">
              Something Broke
            </p>
            <h1 className="text-3xl font-bold mb-6">An unexpected error occurred.</h1>
            <p className="text-[#444650] mb-10">
              This has been logged. Try reloading the page, or head back to the homepage.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                type="button"
                onClick={reset}
                className="bg-[#00113a] text-white px-8 py-4 rounded font-mono text-sm hover:opacity-90 transition-opacity"
              >
                Try Again
              </button>
              <a
                href="/"
                className="border border-[#884f45] text-[#884f45] px-8 py-4 rounded font-mono text-sm text-center hover:bg-[#884f45]/10 transition-colors"
              >
                Back to Homepage
              </a>
            </div>
          </div>
        </main>
      </body>
    </html>
  );
}
