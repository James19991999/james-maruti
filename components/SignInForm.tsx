"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  sendPasswordResetEmail,
  GoogleAuthProvider,
  GithubAuthProvider,
} from "firebase/auth";
import { auth } from "@/lib/firebase";

function friendlyAuthError(code: string): string {
  switch (code) {
    case "auth/invalid-credential":
    case "auth/wrong-password":
    case "auth/user-not-found":
      return "That email and password combination doesn't match our records.";
    case "auth/too-many-requests":
      return "Too many attempts. Please wait a moment and try again.";
    case "auth/popup-closed-by-user":
      return "The sign-in window was closed before completing.";
    case "auth/missing-email":
      return "Enter your email address above first, then click \"Forgot Password?\" again.";
    default:
      return "Something went wrong signing you in. Please try again.";
  }
}

export default function SignInForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [resetStatus, setResetStatus] = useState<"idle" | "sending" | "sent">("idle");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setResetStatus("idle");
    setLoading(true);

    const data = new FormData(event.currentTarget);
    const email = data.get("email")?.toString() ?? "";
    const password = data.get("password")?.toString() ?? "";

    try {
      await signInWithEmailAndPassword(auth, email, password);
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

  async function handleForgotPassword(event: React.MouseEvent<HTMLAnchorElement>) {
    event.preventDefault();
    setError("");

    const form = event.currentTarget.closest("form");
    const emailInput = form?.querySelector<HTMLInputElement>('input[name="email"]');
    const email = emailInput?.value.trim() ?? "";

    if (!email) {
      setError('Enter your email address above first, then click "Forgot Password?" again.');
      emailInput?.focus();
      return;
    }

    setResetStatus("sending");
    try {
      await sendPasswordResetEmail(auth, email);
      setResetStatus("sent");
    } catch (err) {
      const code = (err as { code?: string })?.code ?? "";
      setError(friendlyAuthError(code));
      setResetStatus("idle");
    }
  }

  return (
    <div>
      <h1 className="font-headline-md text-headline-md text-primary mb-2">Sign In</h1>
      <p className="text-on-surface-variant mb-8">
        Welcome back. Please enter your credentials to continue to the platform.
      </p>

      <form onSubmit={handleSubmit} className="space-y-6" noValidate>
        <div>
          <label htmlFor="email" className="block font-label-mono text-[11px] text-on-surface-variant uppercase tracking-widest mb-2">
            Email Address
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
          <div className="flex justify-between items-center mb-2">
            <label htmlFor="password" className="block font-label-mono text-[11px] text-on-surface-variant uppercase tracking-widest">
              Password
            </label>
            <a
              href="#"
              onClick={handleForgotPassword}
              aria-disabled={resetStatus === "sending"}
              className="font-label-mono text-[11px] text-secondary hover:underline"
            >
              {resetStatus === "sending" ? "Sending…" : "Forgot Password?"}
            </a>
          </div>
          <input
            id="password"
            name="password"
            type="password"
            required
            autoComplete="current-password"
            className="w-full border border-outline-variant rounded-lg px-4 py-3 bg-surface focus:border-secondary focus:ring-0"
          />
        </div>

        <label className="flex items-center gap-2 text-sm text-on-surface-variant">
          <input type="checkbox" name="remember" className="rounded border-outline-variant" />
          Remember this device for 30 days
        </label>

        {resetStatus === "sent" && (
          <p role="status" className="text-secondary text-sm">
            Password reset email sent — check your inbox.
          </p>
        )}

        {error && (
          <p role="alert" className="text-error text-sm">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-primary text-on-primary px-6 py-3.5 rounded-lg font-label-mono text-label-mono hover:bg-primary-container transition-all active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {loading ? "Signing in…" : "Sign In to Dashboard"}
        </button>
      </form>

      <div className="flex items-center gap-4 my-8">
        <div className="h-px flex-1 bg-outline-variant/30" />
        <span className="font-label-mono text-[11px] text-outline tracking-widest uppercase">
          Or continue with
        </span>
        <div className="h-px flex-1 bg-outline-variant/30" />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <button
          type="button"
          disabled={loading}
          onClick={() => handleProvider(new GoogleAuthProvider())}
          className="flex items-center justify-center gap-2 border border-outline-variant rounded-lg py-3 font-label-mono text-label-mono hover:bg-surface-container-high transition-colors disabled:opacity-60"
        >
          <span className="material-symbols-outlined text-sm" aria-hidden="true">
            account_circle
          </span>
          Google
        </button>
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
      </div>

      <p className="text-center text-on-surface-variant text-sm mt-8">
        New to the platform?{" "}
        <a href="/sign-up" className="text-secondary hover:underline">
          Create an account
        </a>
      </p>
    </div>
  );
}
