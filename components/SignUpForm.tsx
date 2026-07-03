"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithPopup,
  GoogleAuthProvider,
  GithubAuthProvider,
} from "firebase/auth";
import { auth } from "@/lib/firebase";

function friendlyAuthError(code: string): string {
  switch (code) {
    case "auth/email-already-in-use":
      return "An account with that email already exists. Try signing in instead.";
    case "auth/weak-password":
      return "Please choose a password with at least 6 characters.";
    case "auth/invalid-email":
      return "Please enter a valid email address.";
    case "auth/popup-closed-by-user":
      return "The sign-up window was closed before completing.";
    default:
      return "Something went wrong creating your account. Please try again.";
  }
}

export default function SignUpForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    const data = new FormData(event.currentTarget);
    const fullName = data.get("fullName")?.toString().trim() ?? "";
    const email = data.get("email")?.toString() ?? "";
    const password = data.get("password")?.toString() ?? "";
    const agreed = data.get("agree") === "on";

    if (!agreed) {
      setError("Please agree to the Terms of Service and Privacy Policy to continue.");
      return;
    }

    setLoading(true);
    try {
      const credential = await createUserWithEmailAndPassword(auth, email, password);
      if (fullName) {
        await updateProfile(credential.user, { displayName: fullName });
      }
      router.push("/dashboard/settings");
    } catch (err) {
      const code = (err as { code?: string })?.code ?? "";
      setError(friendlyAuthError(code));
    } finally {
      setLoading(false);
    }
  }

  async function handleProvider(provider: GoogleAuthProvider | GithubAuthProvider) {
    setError("");
    setLoading(true);
    try {
      await signInWithPopup(auth, provider);
      router.push("/dashboard/settings");
    } catch (err) {
      const code = (err as { code?: string })?.code ?? "";
      setError(friendlyAuthError(code));
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <h2 className="font-headline-md text-headline-md text-primary mb-2">Create Account</h2>
      <p className="text-on-surface-variant mb-8">
        Initialize your presence in the Maruti ecosystem.
      </p>

      <form onSubmit={handleSubmit} className="space-y-6" noValidate>
        <div>
          <label htmlFor="fullName" className="block font-label-mono text-[11px] text-on-surface-variant uppercase tracking-widest mb-2">
            Full Name
          </label>
          <input
            id="fullName"
            name="fullName"
            type="text"
            required
            autoComplete="name"
            className="w-full border border-outline-variant rounded-lg px-4 py-3 bg-surface focus:border-secondary focus:ring-0"
          />
        </div>

        <div>
          <label htmlFor="email" className="block font-label-mono text-[11px] text-on-surface-variant uppercase tracking-widest mb-2">
            Corporate Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            className="w-full border border-outline-variant rounded-lg px-4 py-3 bg-surface focus:border-secondary focus:ring-0"
          />
        </div>

        <div>
          <label htmlFor="password" className="block font-label-mono text-[11px] text-on-surface-variant uppercase tracking-widest mb-2">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            required
            minLength={6}
            autoComplete="new-password"
            className="w-full border border-outline-variant rounded-lg px-4 py-3 bg-surface focus:border-secondary focus:ring-0"
          />
        </div>

        <label className="flex items-start gap-2 text-sm text-on-surface-variant">
          <input type="checkbox" name="agree" required className="mt-1 rounded border-outline-variant" />
          <span>
            I agree to the{" "}
            <a href="/terms-of-service" className="text-secondary hover:underline">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="/privacy-policy" className="text-secondary hover:underline">
              Privacy Policy
            </a>
            .
          </span>
        </label>

        {error && (
          <p role="alert" className="text-error text-sm">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-primary text-on-primary px-6 py-3.5 rounded-lg font-label-mono text-label-mono hover:bg-primary-container transition-all active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed inline-flex items-center justify-center gap-2"
        >
          {loading ? "Creating account…" : "Create Account"}
          {!loading && (
            <span className="material-symbols-outlined text-sm" aria-hidden="true">
              arrow_forward
            </span>
          )}
        </button>
      </form>

      <div className="flex items-center gap-4 my-8">
        <div className="h-px flex-1 bg-outline-variant/30" />
        <span className="font-label-mono text-[11px] text-outline tracking-widest uppercase">
          Architectural Authentication
        </span>
        <div className="h-px flex-1 bg-outline-variant/30" />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <button
          type="button"
          disabled={loading}
          onClick={() => handleProvider(new GithubAuthProvider())}
          className="flex items-center justify-center gap-2 border border-outline-variant rounded-lg py-3 font-label-mono text-label-mono hover:bg-surface-container-high transition-colors disabled:opacity-60"
        >
          <span className="material-symbols-outlined text-sm" aria-hidden="true">
            terminal
          </span>
          GitHub
        </button>
        <button
          type="button"
          disabled
          title="LinkedIn sign-up is coming soon"
          className="flex items-center justify-center gap-2 border border-outline-variant rounded-lg py-3 font-label-mono text-label-mono opacity-50 cursor-not-allowed"
        >
          <span className="material-symbols-outlined text-sm" aria-hidden="true">
            work
          </span>
          LinkedIn
        </button>
      </div>

      <p className="text-center text-on-surface-variant text-sm mt-8">
        Already part of the network?{" "}
        <a href="/sign-in" className="text-secondary hover:underline">
          Sign in instead
        </a>
      </p>
    </div>
  );
}
