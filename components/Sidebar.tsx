"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useAuth } from "@/lib/auth-context";
import { dashboardFooterLinks, dashboardNavLinks } from "@/lib/site-data";
import ThemeToggle from "./ThemeToggle";
import CommandPaletteTrigger from "./CommandPaletteTrigger";

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { user } = useAuth();

  async function handleSignOut() {
    await signOut(auth);
    router.push("/sign-in");
  }

  return (
    <aside className="w-full lg:w-64 shrink-0 bg-surface-container-low lg:min-h-screen flex flex-col justify-between p-6 lg:p-8 border-r border-outline-variant/20">
      <div>
        <Link href="/" className="block mb-1">
          <span className="font-headline-md text-2xl font-bold text-primary leading-tight">
            {user?.displayName ?? "James Maruti"}
          </span>
        </Link>
        <p className="font-label-mono text-[11px] text-on-surface-variant tracking-widest uppercase mb-6">
          UI Architect &amp; Strategist
        </p>
        <div className="mb-6">
          <CommandPaletteTrigger />
        </div>

        <nav aria-label="Dashboard" className="space-y-1">
          {dashboardNavLinks.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? "page" : undefined}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg font-label-mono text-label-mono transition-colors ${
                  active
                    ? "bg-primary text-on-primary"
                    : "text-on-surface-variant hover:bg-surface-container-high"
                }`}
              >
                <span className="material-symbols-outlined text-lg" aria-hidden="true">
                  {link.icon}
                </span>
                {link.label}
              </Link>
            );
          })}
        </nav>
      </div>

      <div>
        <Link
          href="/contact"
          className="block text-center bg-primary text-on-primary px-4 py-3 rounded-lg font-label-mono text-label-mono hover:bg-primary-container transition-all mb-6"
        >
          New Inquiry
        </Link>
        <nav aria-label="Dashboard secondary" className="space-y-1 mb-6">
          {dashboardFooterLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="flex items-center gap-3 px-4 py-2 rounded-lg font-label-mono text-label-mono text-on-surface-variant hover:bg-surface-container-high transition-colors"
            >
              <span className="material-symbols-outlined text-lg" aria-hidden="true">
                {link.icon}
              </span>
              {link.label}
            </Link>
          ))}
        </nav>
        <button
          type="button"
          onClick={handleSignOut}
          className="flex items-center gap-3 px-4 py-2 rounded-lg font-label-mono text-label-mono text-on-surface-variant hover:bg-surface-container-high transition-colors w-full"
        >
          <span className="material-symbols-outlined text-lg" aria-hidden="true">
            logout
          </span>
          Sign Out
        </button>
        <div className="flex items-center gap-3 px-4 py-2 mt-1">
          <ThemeToggle />
          <span className="font-label-mono text-label-mono text-on-surface-variant">Theme</span>
        </div>
      </div>
    </aside>
  );
}
