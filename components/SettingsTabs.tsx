"use client";

import { useState, type FormEvent } from "react";
import Image from "next/image";
import { updateProfile } from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useAuth } from "@/lib/auth-context";
import { images } from "@/lib/site-data";

type Tab = "Profile" | "Security" | "Preferences" | "Integrations";
const TABS: Tab[] = ["Profile", "Security", "Preferences", "Integrations"];

export default function SettingsTabs() {
  const [tab, setTab] = useState<Tab>("Profile");

  return (
    <div>
      <div className="flex gap-8 border-b border-outline-variant/30 mb-10 overflow-x-auto">
        {TABS.map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setTab(t)}
            aria-current={tab === t ? "page" : undefined}
            className={`pb-4 font-label-mono text-label-mono whitespace-nowrap border-b-2 transition-colors ${
              tab === t
                ? "border-primary text-primary"
                : "border-transparent text-on-surface-variant hover:text-primary"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {tab === "Profile" && <ProfileTab />}
      {tab === "Security" && <PlaceholderTab title="Security" icon="lock" description="Password changes, two-factor authentication, and active session management will live here." />}
      {tab === "Preferences" && <PlaceholderTab title="Preferences" icon="tune" description="Notification cadence, timezone, and dashboard theme controls will live here." />}
      {tab === "Integrations" && <PlaceholderTab title="Integrations" icon="hub" description="Connect GitHub, Figma, and Stripe accounts to sync project data automatically." />}
    </div>
  );
}

function ProfileTab() {
  const { user } = useAuth();
  const [status, setStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!user) return;

    setStatus("saving");
    const data = new FormData(event.currentTarget);
    const fullName = data.get("fullName")?.toString().trim() ?? "";
    const title = data.get("title")?.toString().trim() ?? "";

    try {
      await updateProfile(user, { displayName: fullName });
      await setDoc(
        doc(db, "profiles", user.uid),
        { fullName, title, updatedAt: serverTimestamp() },
        { merge: true }
      );
      setStatus("saved");
    } catch (error) {
      console.error("Failed to save profile:", error);
      setStatus("error");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-12">
      <div className="lg:col-span-2 space-y-6">
        <div>
          <label htmlFor="fullName" className="block font-label-mono text-[11px] text-secondary uppercase tracking-widest mb-2">
            Full Name
          </label>
          <input
            id="fullName"
            name="fullName"
            type="text"
            defaultValue={user?.displayName ?? ""}
            className="w-full border border-outline-variant rounded-lg px-4 py-3 bg-surface focus:border-secondary focus:ring-0"
          />
        </div>
        <div>
          <label htmlFor="title" className="block font-label-mono text-[11px] text-secondary uppercase tracking-widest mb-2">
            Professional Title
          </label>
          <input
            id="title"
            name="title"
            type="text"
            defaultValue="UI Architect & Strategist"
            className="w-full border border-outline-variant rounded-lg px-4 py-3 bg-surface focus:border-secondary focus:ring-0"
          />
        </div>
        <div>
          <label htmlFor="email" className="block font-label-mono text-[11px] text-secondary uppercase tracking-widest mb-2">
            Email Address
          </label>
          <input
            id="email"
            name="email"
            type="email"
            readOnly
            value={user?.email ?? ""}
            className="w-full border border-outline-variant rounded-lg px-4 py-3 bg-surface-container-high text-on-surface-variant cursor-not-allowed"
          />
        </div>

        {status === "error" && (
          <p role="alert" className="text-error text-sm">
            Something went wrong saving your profile. Please try again.
          </p>
        )}
        {status === "saved" && (
          <p role="status" className="text-secondary text-sm">
            Profile changes saved.
          </p>
        )}

        <button
          type="submit"
          disabled={status === "saving"}
          className="bg-primary text-on-primary px-6 py-3.5 rounded-lg font-label-mono text-label-mono hover:bg-primary-container transition-all active:scale-95 disabled:opacity-60"
        >
          {status === "saving" ? "Saving…" : "Save Profile Changes"}
        </button>
      </div>

      <div>
        <p className="font-label-mono text-[11px] text-secondary uppercase tracking-widest mb-3">
          Identity Visual
        </p>
        <div className="relative w-40 h-40 rounded-lg overflow-hidden bg-surface-container-highest">
          <Image
            src={user?.photoURL || images.settingsAvatar.src}
            alt={images.settingsAvatar.alt}
            fill
            sizes="160px"
            className="object-cover"
          />
        </div>
        <p className="text-on-surface-variant text-xs mt-3">Recommended: 800x800px .JPG or .PNG</p>
      </div>
    </form>
  );
}

function PlaceholderTab({
  title,
  icon,
  description,
}: {
  title: string;
  icon: string;
  description: string;
}) {
  return (
    <div className="bg-surface-container-low rounded-xl p-10 border border-dashed border-outline-variant/40 text-center max-w-lg">
      <span className="material-symbols-outlined text-primary text-4xl mb-4" aria-hidden="true">
        {icon}
      </span>
      <h2 className="font-headline-md text-lg text-primary mb-2">{title} — Coming Soon</h2>
      <p className="text-on-surface-variant">{description}</p>
    </div>
  );
}
