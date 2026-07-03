import Link from "next/link";
import { createPageMetadata } from "@/lib/seo";
import SignUpForm from "@/components/SignUpForm";
import AuthBrandingPortrait from "@/components/AuthBrandingPortrait";

export const metadata = createPageMetadata({
  title: "Create Account",
  description: "Create an account in the James Maruti client ecosystem.",
  path: "/sign-up",
  noIndex: true,
});

export default function SignUpPage() {
  return (
    <div className="min-h-screen bg-background text-on-background flex flex-col lg:flex-row">
      {/* Branding panel */}
      <div className="lg:w-1/2 bg-primary text-on-primary p-10 md:p-20 flex flex-col justify-between">
        <Link href="/" className="font-headline-md text-2xl font-bold">
          James Maruti
        </Link>
        <div>
          <span className="font-label-mono text-[11px] text-secondary-fixed tracking-widest uppercase">
            System Architecture
          </span>
          <h1 className="font-headline-md text-headline-md mt-2 mb-6">
            Join a community of high-growth ventures.
          </h1>
          <blockquote className="opacity-80 max-w-md italic">
            &ldquo;The transition from simple code to scalable architecture requires a partner
            who understands both the logic of machines and the psychology of users.&rdquo;
          </blockquote>
          <AuthBrandingPortrait />
        </div>
        <div className="flex gap-8">
          <div>
            <p className="font-headline-md text-2xl">99.9%</p>
            <p className="font-label-mono text-[11px] text-secondary-fixed tracking-widest uppercase mt-1">
              Reliability
            </p>
          </div>
          <div>
            <p className="font-headline-md text-2xl">150+</p>
            <p className="font-label-mono text-[11px] text-secondary-fixed tracking-widest uppercase mt-1">
              Partners
            </p>
          </div>
        </div>
      </div>

      {/* Form panel */}
      <div className="lg:w-1/2 flex items-center justify-center p-8 md:p-20">
        <div className="w-full max-w-md">
          <SignUpForm />
        </div>
      </div>
    </div>
  );
}
