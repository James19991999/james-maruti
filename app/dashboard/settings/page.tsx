import type { Metadata } from "next";
import SettingsTabs from "@/components/SettingsTabs";

export const metadata: Metadata = {
  title: "Account Settings",
  robots: { index: false, follow: false },
};

export default function DashboardSettingsPage() {
  return (
    <div>
      <h1 className="font-headline-md text-headline-md text-primary mb-2">Account Settings</h1>
      <p className="text-on-surface-variant mb-10 max-w-2xl">
        Manage your digital presence, security protocols, and system preferences within the
        Maruti architectural ecosystem.
      </p>
      <SettingsTabs />
    </div>
  );
}
