"use client";

import { useId, useState, type FormEvent } from "react";

type Status = "idle" | "submitting" | "success" | "error";

export default function NewsletterForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const formId = useId();

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    const form = event.currentTarget;
    const data = new FormData(form);
    const email = data.get("email")?.toString().trim() ?? "";
    const website = data.get("website")?.toString() ?? ""; // honeypot

    if (!email) {
      setStatus("error");
      setErrorMessage("Please enter an email address.");
      return;
    }

    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, website }),
      });

      if (!response.ok) {
        const body = await response.json().catch(() => null);
        throw new Error(body?.error ?? "Something went wrong. Please try again.");
      }

      setStatus("success");
      form.reset();
    } catch (err) {
      setStatus("error");
      setErrorMessage(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    }
  }

  if (status === "success") {
    return (
      <p role="status" className="font-label-mono text-[11px] text-secondary-fixed">
        You&apos;re subscribed — thanks!
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="w-full max-w-xs">
      <label
        htmlFor={`${formId}-newsletter-email`}
        className="block font-label-mono text-[11px] text-on-surface-variant uppercase tracking-widest mb-2"
      >
        Get occasional updates
      </label>
      <div className="flex gap-2">
        <input
          id={`${formId}-newsletter-email`}
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder="you@example.com"
          className="min-w-0 flex-1 border border-outline-variant rounded-lg px-3 py-2 bg-surface text-sm focus:border-secondary focus:ring-0"
        />
        <button
          type="submit"
          disabled={status === "submitting"}
          className="shrink-0 bg-primary text-on-primary px-4 py-2 rounded-lg font-label-mono text-[11px] hover:bg-primary-container transition-all active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {status === "submitting" ? "…" : "Subscribe"}
        </button>
      </div>
      {/* Honeypot */}
      <div className="absolute -left-[9999px] w-px h-px overflow-hidden" aria-hidden="true">
        <label htmlFor={`${formId}-newsletter-website`}>Website</label>
        <input
          id={`${formId}-newsletter-website`}
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>
      {status === "error" && (
        <p role="alert" className="text-error text-xs mt-2">
          {errorMessage}
        </p>
      )}
    </form>
  );
}
