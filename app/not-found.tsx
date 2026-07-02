import Link from "next/link";
import type { Metadata } from "next";
import TopNavBar from "@/components/TopNavBar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Page Not Found",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <>
      <TopNavBar />
      <main className="pt-24 min-h-[70vh] flex items-center justify-center px-gutter">
        <div className="text-center max-w-lg">
          <p className="font-label-mono text-label-mono text-secondary tracking-widest uppercase mb-4">
            Error 404
          </p>
          <h1 className="font-display-lg text-display-lg-mobile md:text-display-lg text-primary mb-6">
            This route doesn&apos;t exist.
          </h1>
          <p className="text-on-surface-variant mb-10">
            The page you&apos;re looking for may have been moved, renamed, or never built. Let&apos;s
            get you back on solid architecture.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/"
              className="bg-primary text-on-primary px-8 py-4 rounded font-label-mono text-label-mono text-center hover:bg-primary-container transition-all"
            >
              Back to Homepage
            </Link>
            <Link
              href="/contact"
              className="border border-secondary text-secondary px-8 py-4 rounded font-label-mono text-label-mono text-center hover:bg-secondary-container/10 transition-all"
            >
              Contact Me
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
