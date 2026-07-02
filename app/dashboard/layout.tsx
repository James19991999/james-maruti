"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import Sidebar from "@/components/Sidebar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/sign-in");
    }
  }, [loading, user, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <p className="font-label-mono text-label-mono text-on-surface-variant">Loading…</p>
      </div>
    );
  }

  if (!user) {
    // Redirect effect is in flight; render nothing to avoid a content flash.
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-background">
      <Sidebar />
      <main className="flex-1 p-6 md:p-12">{children}</main>
    </div>
  );
}
