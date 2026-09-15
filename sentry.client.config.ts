import * as Sentry from "@sentry/nextjs";

// Sentry.init with an empty/undefined dsn is a documented no-op — this file
// can always run, and error monitoring simply stays off until
// NEXT_PUBLIC_SENTRY_DSN is set.
Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  tracesSampleRate: 0.1,
  // Session replay is a heavier feature with its own privacy implications
  // (it can capture page content) — left off by default rather than opt-out.
  replaysSessionSampleRate: 0,
  replaysOnErrorSampleRate: 0,
});
