"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/lib/auth-context";

interface Inquiry {
  id: string;
  name: string;
  email: string;
  inquiryType: string;
  message: string;
  createdAt: string | null;
}

interface Subscriber {
  id: string;
  email: string;
  subscribedAt: string | null;
}

type Status = "loading" | "ready" | "unauthorized" | "error";

function formatDate(iso: string | null): string {
  if (!iso) return "—";
  return new Date(iso).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

export default function InquiriesView() {
  const { user, loading: authLoading } = useAuth();
  const [status, setStatus] = useState<Status>("loading");
  const [errorMessage, setErrorMessage] = useState("");
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [tab, setTab] = useState<"inquiries" | "subscribers">("inquiries");

  useEffect(() => {
    if (authLoading) return;
    if (!user) {
      // The dashboard layout already redirects unauthenticated visitors to
      // /sign-in — this is just a safety net while that redirect is in flight.
      return;
    }

    let cancelled = false;

    async function load() {
      try {
        const token = await user!.getIdToken();
        const response = await fetch("/api/dashboard/inquiries", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (cancelled) return;

        if (response.status === 403) {
          setStatus("unauthorized");
          return;
        }
        if (!response.ok) {
          const body = await response.json().catch(() => null);
          throw new Error(body?.error ?? "Failed to load inquiries.");
        }

        const body = await response.json();
        setInquiries(body.inquiries ?? []);
        setSubscribers(body.subscribers ?? []);
        setStatus("ready");
      } catch (err) {
        if (cancelled) return;
        setErrorMessage(err instanceof Error ? err.message : "Failed to load inquiries.");
        setStatus("error");
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [user, authLoading]);

  return (
    <div>
      <h1 className="font-headline-md text-headline-md text-primary mb-2">Inquiries</h1>
      <p className="text-on-surface-variant mb-10 max-w-2xl">
        Contact form submissions and newsletter sign-ups, pulled directly from Firestore.
      </p>

      {(status === "loading" || authLoading) && (
        <p className="text-on-surface-variant">Loading…</p>
      )}

      {status === "unauthorized" && (
        <div className="bg-surface-container-low rounded-xl p-8 border border-outline-variant/30 max-w-lg">
          <p className="font-label-mono text-[11px] text-secondary uppercase tracking-widest mb-2">
            Not authorized
          </p>
          <p className="text-on-surface-variant">
            You&apos;re signed in, but this account isn&apos;t on the admin allowlist for inquiry
            data. Set <code className="font-label-mono">ADMIN_EMAILS</code> in the environment to
            include this account&apos;s email if that&apos;s unexpected.
          </p>
        </div>
      )}

      {status === "error" && (
        <p role="alert" className="text-error">
          {errorMessage}
        </p>
      )}

      {status === "ready" && (
        <div>
          <div className="flex gap-6 border-b border-outline-variant/30 mb-8">
            <button
              type="button"
              onClick={() => setTab("inquiries")}
              aria-current={tab === "inquiries" ? "page" : undefined}
              className={`pb-3 font-label-mono text-label-mono border-b-2 transition-colors ${
                tab === "inquiries"
                  ? "border-primary text-primary"
                  : "border-transparent text-on-surface-variant hover:text-primary"
              }`}
            >
              Inquiries ({inquiries.length})
            </button>
            <button
              type="button"
              onClick={() => setTab("subscribers")}
              aria-current={tab === "subscribers" ? "page" : undefined}
              className={`pb-3 font-label-mono text-label-mono border-b-2 transition-colors ${
                tab === "subscribers"
                  ? "border-primary text-primary"
                  : "border-transparent text-on-surface-variant hover:text-primary"
              }`}
            >
              Subscribers ({subscribers.length})
            </button>
          </div>

          {tab === "inquiries" &&
            (inquiries.length === 0 ? (
              <p className="text-on-surface-variant">No inquiries yet.</p>
            ) : (
              <div className="space-y-4">
                {inquiries.map((inquiry) => (
                  <div
                    key={inquiry.id}
                    className="bg-surface-container-low rounded-xl p-6 border border-outline-variant/30"
                  >
                    <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
                      <div>
                        <p className="font-headline-md text-lg text-primary">{inquiry.name}</p>
                        <a
                          href={`mailto:${inquiry.email}`}
                          className="text-on-surface-variant text-sm hover:text-primary"
                        >
                          {inquiry.email}
                        </a>
                      </div>
                      <div className="text-right">
                        {inquiry.inquiryType && (
                          <span className="inline-block bg-primary/5 text-primary px-3 py-1 rounded font-label-mono text-[11px] mb-1">
                            {inquiry.inquiryType}
                          </span>
                        )}
                        <p className="font-label-mono text-[11px] text-on-surface-variant">
                          {formatDate(inquiry.createdAt)}
                        </p>
                      </div>
                    </div>
                    <p className="text-on-surface-variant whitespace-pre-wrap">
                      {inquiry.message}
                    </p>
                  </div>
                ))}
              </div>
            ))}

          {tab === "subscribers" &&
            (subscribers.length === 0 ? (
              <p className="text-on-surface-variant">No subscribers yet.</p>
            ) : (
              <div className="bg-surface-container-low rounded-xl border border-outline-variant/30 divide-y divide-outline-variant/20">
                {subscribers.map((subscriber) => (
                  <div
                    key={subscriber.id}
                    className="flex items-center justify-between px-6 py-4"
                  >
                    <a
                      href={`mailto:${subscriber.email}`}
                      className="text-on-surface-variant hover:text-primary"
                    >
                      {subscriber.email}
                    </a>
                    <p className="font-label-mono text-[11px] text-on-surface-variant">
                      {formatDate(subscriber.subscribedAt)}
                    </p>
                  </div>
                ))}
              </div>
            ))}
        </div>
      )}
    </div>
  );
}
