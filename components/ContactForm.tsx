"use client";

import { useId, useState, type FormEvent } from "react";
import { inquiryTypes } from "@/lib/site-data";

type Status = "idle" | "submitting" | "success" | "error";

interface ContactFormProps {
  /** Compact variant omits the inquiry-type select, used in the homepage CTA card. */
  compact?: boolean;
}

export default function ContactForm({ compact = false }: ContactFormProps) {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const formId = useId();

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    const form = event.currentTarget;
    const data = new FormData(form);
    const payload = {
      name: data.get("name")?.toString().trim() ?? "",
      email: data.get("email")?.toString().trim() ?? "",
      inquiryType: data.get("inquiryType")?.toString() ?? "",
      message: data.get("message")?.toString().trim() ?? "",
      website: data.get("website")?.toString() ?? "", // honeypot — see below
    };

    if (!payload.name || !payload.email || !payload.message) {
      setStatus("error");
      setErrorMessage("Please fill in your name, email, and project brief.");
      return;
    }

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const body = await response.json().catch(() => null);
        throw new Error(body?.error ?? `Something went wrong (status ${response.status}). Please try again.`);
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
      <div
        role="status"
        className="flex flex-col justify-center items-center text-center bg-primary/5 rounded-xl p-8 h-full"
      >
        <span className="material-symbols-outlined text-primary text-4xl mb-4" aria-hidden="true">
          check_circle
        </span>
        <h3 className="font-headline-md text-xl text-primary mb-2">Inquiry sent.</h3>
        <p className="text-on-surface-variant">
          Thanks for reaching out — responses typically arrive within 24-48 business hours.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6" noValidate>
      {/* Honeypot: hidden from real visitors (off-screen, not tabbable, not announced),
          but a form-filling bot will populate it. See app/api/contact/route.ts. */}
      <div className="absolute -left-[9999px] w-px h-px overflow-hidden" aria-hidden="true">
        <label htmlFor={`${formId}-website`}>Website</label>
        <input
          id={`${formId}-website`}
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div>
        <label
          htmlFor={`${formId}-name`}
          className="block font-label-mono text-[11px] text-on-surface-variant uppercase tracking-widest mb-2"
        >
          Name
        </label>
        <input
          id={`${formId}-name`}
          name="name"
          type="text"
          required
          autoComplete="name"
          placeholder="Your Name"
          className="w-full border border-outline-variant rounded-lg px-4 py-3 bg-surface focus:border-secondary focus:ring-0"
        />
      </div>

      <div>
        <label
          htmlFor={`${formId}-email`}
          className="block font-label-mono text-[11px] text-on-surface-variant uppercase tracking-widest mb-2"
        >
          Email
        </label>
        <input
          id={`${formId}-email`}
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder="you@example.com"
          className="w-full border border-outline-variant rounded-lg px-4 py-3 bg-surface focus:border-secondary focus:ring-0"
        />
      </div>

      {!compact && (
        <div>
          <label
            htmlFor={`${formId}-inquiryType`}
            className="block font-label-mono text-[11px] text-on-surface-variant uppercase tracking-widest mb-2"
          >
            Inquiry Type
          </label>
          <select
            id={`${formId}-inquiryType`}
            name="inquiryType"
            defaultValue=""
            className="w-full border border-outline-variant rounded-lg px-4 py-3 bg-surface focus:border-secondary focus:ring-0"
          >
            <option value="" disabled>
              Select Inquiry Type
            </option>
            {inquiryTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
      )}

      <div>
        <label
          htmlFor={`${formId}-message`}
          className="block font-label-mono text-[11px] text-on-surface-variant uppercase tracking-widest mb-2"
        >
          Project Brief
        </label>
        <textarea
          id={`${formId}-message`}
          name="message"
          required
          rows={compact ? 3 : 5}
          placeholder="Tell me about your project…"
          className="w-full border border-outline-variant rounded-lg px-4 py-3 bg-surface focus:border-secondary focus:ring-0"
        />
      </div>

      {status === "error" && (
        <p role="alert" className="text-error text-sm">
          {errorMessage}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="w-full bg-primary text-on-primary px-6 py-3.5 rounded-lg font-label-mono text-label-mono hover:bg-primary-container transition-all active:scale-95 disabled:cursor-not-allowed disabled:opacity-60 inline-flex items-center justify-center gap-2"
      >
        {status === "submitting" ? "Sending…" : "Send Inquiry"}
        {status !== "submitting" && (
          <span className="material-symbols-outlined text-sm" aria-hidden="true">
            arrow_forward
          </span>
        )}
      </button>
    </form>
  );
}
