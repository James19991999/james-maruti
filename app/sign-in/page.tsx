import Link from "next/link";
import type { Metadata } from "next";
import SignInForm from "@/components/SignInForm";
import AuthBrandingPortrait from "@/components/AuthBrandingPortrait";

export const metadata: Metadata = {
  title: "Sign In",
  description: "Sign in to the James Maruti client dashboard.",
  alternates: { canonical: "/sign-in" },
  robots: { index: false, follow: false },
};

export default function SignInPage() {
  return (
    <div className="min-h-screen bg-background text-on-background flex flex-col lg:flex-row">
      {/* Branding panel */}
      <div className="lg:w-1/2 bg-primary text-on-primary p-10 md:p-20 flex flex-col justify-between">
        <Link href="/" className="font-headline-md text-2xl font-bold">
          James Maruti
        </Link>
        <div>
          <span className="font-label-mono text-[11px] text-secondary-fixed tracking-widest uppercase">
            Authentication Portal
          </span>
          <h1 className="font-headline-md text-headline-md mt-2 mb-6">
            Architecting Human Systems
          </h1>
          <p className="opacity-80 max-w-md">
            Building the digital architecture of the future. Secure access to a workspace where
            media psychology meets high-fidelity software engineering.
          </p>
          <AuthBrandingPortrait />
        </div>
        <div className="flex gap-8">
          <div>
            <p className="font-label-mono text-[11px] text-secondary-fixed tracking-widest uppercase">
              Precision
            </p>
            <p className="opacity-80 text-sm mt-1">Entity-First Logic</p>
          </div>
          <div>
            <p className="font-label-mono text-[11px] text-secondary-fixed tracking-widest uppercase">
              Performance
            </p>
            <p className="opacity-80 text-sm mt-1">Next.js Optimized</p>
          </div>
        </div>
      </div>

      {/* Form panel */}
      <div className="lg:w-1/2 flex items-center justify-center p-8 md:p-20">
        <div className="w-full max-w-md">
          <SignInForm />
        </div>
      </div>
    </div>
  );
}
