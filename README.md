# James Maruti — Portfolio (Next.js)

Production build of the **james_maruti_portfolio_with_projects** Stitch export ("Architectural
Precision" design system), plus the Sign In / Sign Up / Account Settings screens from the same
export, wired to Firebase.

## Stack

- Next.js 14 (App Router) + TypeScript
- TailwindCSS (design tokens ported 1:1 from the Stitch `tailwind.config`)
- Firebase Auth (client SDK) — email/password + Google/GitHub OAuth
- Firebase Admin SDK (server-only) — Firestore writes from API routes
- Jest + React Testing Library

## Getting started

```bash
npm install
cp .env.example .env.local   # fill in Firebase credentials, see below
npm run dev
```

Visit http://localhost:3000.

## Firebase setup

1. Create a project at https://console.firebase.google.com.
2. **Authentication** → Sign-in method → enable **Email/Password**, **Google**, and **GitHub**.
   (The Sign Up page also has a "LinkedIn" button rendered disabled — Firebase has no native
   LinkedIn provider; wire it up via a custom OIDC provider if you need it.)
3. **Firestore Database** → create in production mode. Deploy `firestore.rules` from this repo
   (`firebase deploy --only firestore:rules`, or paste it into the console's Rules tab). Rules
   lock `inquiries` and `newsletter_subscribers` to server-only writes (via the Admin SDK) and
   scope `profiles/{uid}` to its owner.
4. **Project Settings → General**: copy the client config into the `NEXT_PUBLIC_FIREBASE_*`
   vars in `.env.local`.
5. **Project Settings → Service Accounts**: generate a private key and copy `project_id`,
   `client_email`, and `private_key` into the `FIREBASE_*` (no `NEXT_PUBLIC_`) vars. Keep the
   `\n` escapes in the private key as-is — `lib/firebase-admin.ts` un-escapes them at runtime.

Without these env vars the public marketing pages still build and run fine; only
Sign In/Up, Settings, and the contact/newsletter API routes need Firebase configured.

## Image assets

The Stitch export references photos hosted on `lh3.googleusercontent.com` (Stitch's asset CDN)
and `jamesmaruti.site` (your existing WordPress media library) rather than bundling image files.
This build points `next/image` at those same original URLs via `remotePatterns` in
`next.config.mjs` — nothing was re-hosted or swapped out.

If you'd rather self-host them under `/public/images`, download each URL listed in
`lib/site-data.ts` under `images`, drop the files into `public/images/`, update the `src` values
to local paths (e.g. `/images/hero-portrait.jpg`), and you can remove the `remotePatterns` entry
for that host.

## Project structure

```
app/
  layout.tsx              Root layout: fonts, SEO metadata, JSON-LD, theme/command-palette providers
  page.tsx                Homepage (hero, expertise, projects, history, philosophy, contact CTA)
  about/  experience/  expertise/  services/  contact/  schema/  faq/  now/
  privacy-policy/  terms-of-service/
  sign-in/  sign-up/
  dashboard/
    layout.tsx             Client-side auth guard + Sidebar
    page.tsx                Overview
    inquiries/page.tsx      Real contact-form/newsletter data -- see below, needs ADMIN_EMAILS
    projects/ stack/ journal/ archive/ support/   Placeholder panels (Settings is fully wired)
    settings/page.tsx       Account Settings (Profile tab is live; others are labeled "coming soon")
  api/contact/route.ts     POST -> validates -> writes to Firestore via Admin SDK
  api/newsletter/route.ts  POST -> validates -> upserts subscriber doc
  api/chat/route.ts        POST -> optional AI chat widget backend (see below)
  api/dashboard/inquiries/route.ts   GET -> admin-only, verified via requireAdmin()
  sitemap.ts / robots.ts / manifest.ts   Generated SEO + PWA files
  icon.svg / apple-icon.png / opengraph-image.png   Brand favicon + social share image (file-based, auto-wired by Next)
  not-found.tsx / loading.tsx / global-error.tsx     Branded 404, route-transition, and error states (global-error reports to Sentry)
components/                TopNavBar, Footer, FeatureCard, ProjectCard, ContactForm,
                            Sidebar, SignInForm, SignUpForm, SettingsTabs, MobileMenu,
                            ThemeProvider, ThemeToggle, CommandPalette(+Context/Trigger),
                            ChatWidget, GithubActivity, Accordion, Reveal, InquiriesView
lib/
  site-data.ts             All copy/content -- single source of truth for every page
  firebase.ts              Client SDK init (guarded so builds succeed without credentials)
  firebase-admin.ts        Server-only Admin SDK init + requireAdmin() token/allowlist check
  auth-context.tsx         React context exposing Firebase auth state
  chat-context.ts          Builds the AI chat widget's system prompt from site-data.ts
  github.ts                GitHub GraphQL API client for the contribution graph
  rate-limit.ts            Firestore-backed rate limiter shared by contact/newsletter/chat
  notifications.ts         Optional Resend email notifications
public/documents/
  james-maruti-cv.pdf      Real, downloadable ATS-formatted CV generated from the site's own content
__tests__/                 Jest + RTL unit tests
testing/test-utils.tsx     Shared render helper (outside __tests__/ so Jest won't treat it as a suite)
e2e/                       Playwright specs (unproven -- see Operational pass section)
sentry.client.config.ts / sentry.server.config.ts / sentry.edge.config.ts   Error monitoring (optional)
.github/workflows/ci.yml   Type-check, lint, test, build on every push/PR
.github/workflows/e2e.yml  Playwright, manual trigger only (unproven, see above)
firestore.rules            Security rules for Firestore
.env.example                Environment variable template
```

## Every link and button, accounted for

As of this pass, every interactive element resolves to something real:

- **Footer** — Privacy Policy, Terms of Service, and Entity Schema all route to real pages;
  LinkedIn/GitHub open the real profiles.
- **"Download CV" / "View Detailed Resume"** (About, Experience pages) — download or open the
  real PDF at `/documents/james-maruti-cv.pdf`, generated from the site's own experience data.
- **"Forgot Password?"** (Sign In) — sends a real Firebase password-reset email instead of doing
  nothing.
- **Project cards** — each links to a verified, real destination (live deploy, GitHub, or the
  agency's own domain as authored in the original design). PULSE renders a disabled "Coming
  Soon" button rather than a dead link, matching how the original Stitch design itself marked it.
- **`/schema`** — a new page that transparently documents the JSON-LD structured data the site
  publishes (on-brand with the "Entity-First SEO" positioning, and replaces what was a dead `/#`
  footer link).

## Scope notes

The original Stitch export contained 13 pages. Two near-duplicate homepage variants
(`professional_portfolio_1` / `_2`) were superseded by the richer `portfolio_with_projects`
variant, which is the canonical `/` route here. The dashboard sidebar (Overview, Projects,
Technical Stack, Journal, Settings, Archive, Support) was only fully designed for the **Settings
→ Profile** tab in the export; the other panels ship as on-brand placeholder states rather than
empty 404s, ready for real content/data wiring later.

## Hardening pass (security, spam protection, a11y, PWA basics)

On top of the initial build, this pass added:

- **Security headers** (`next.config.mjs`) — CSP scoped to Firebase Auth/Firestore/Google
  Fonts, `X-Frame-Options`, `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy`,
  and HSTS. The CSP uses `'unsafe-inline'` for scripts/styles (needed for the JSON-LD tag and
  a couple of Tailwind arbitrary-value inline styles) — a stricter nonce-based CSP is possible
  via middleware but is real added complexity, noted here rather than done silently.
- **Contact & newsletter forms** now have a honeypot field (invisible to real users, tab-index
  `-1`, `aria-hidden`) and Firestore-backed rate limiting (5 requests / 10 min per IP) — chosen
  over an in-memory counter specifically because serverless functions don't share memory across
  invocations, so an in-memory limiter would silently do nothing in production.
- **Contact-form email notifications** via Resend (`lib/notifications.ts`), gated entirely
  behind `RESEND_API_KEY` — unset, the site behaves exactly as before (submissions still save
  to Firestore, they just won't also trigger an email). Swapping providers means editing one
  file; the API routes don't change.
- **Newsletter signup form** in the footer — previously `/api/newsletter` existed with no UI
  calling it.
- **`app/manifest.ts`** — basic PWA/add-to-home-screen metadata.
- **Fonts migrated to `next/font/google`** for Libre Caslon Text, Manrope, and JetBrains Mono
  (self-hosted at build time, no render-blocking request, no font-swap layout shift). Material
  Symbols Outlined stays on a `<link>` tag — its variable icon axes (FILL/GRAD/opsz) aren't
  expressible through `next/font`'s simplified weight-only API.
  ⚠️ **This repo's build has not been verified end-to-end in the environment these files were
  authored in** — that sandbox's network egress blocks `fonts.googleapis.com`, so
  `next build` cannot complete there. `tsc --noEmit`, `next lint`, and the full Jest suite all
  pass in that environment, so the code itself is verified; only the actual font-fetching step
  is unconfirmed. Run `npm run build` here, where normal internet access should let it fetch
  fonts and complete cleanly — if it doesn't, the previous `<link>`-tag approach is a safe
  fallback (see git history / ask for it to be reverted).
- **Accessibility**: added `jest-axe` covering every public page + Sign In/Sign Up. It found
  and fixed one real issue (a skipped heading level on `/services`). Note: jsdom can't do real
  layout/paint, so the `color-contrast` rule is disabled in these tests to avoid false
  positives — run a real browser tool (Lighthouse, axe DevTools) before launch to check actual
  contrast.

## Modern features pass

On top of the hardening pass, this added:

- **Dark mode** — the full color system was converted from hardcoded hex to CSS variables so
  every existing utility class (`bg-surface`, `text-primary`, etc.) works unchanged in both
  themes. The dark palette follows Material Design 3 conventions: "fixed" roles
  (`secondary-fixed`, `primary-fixed`, etc.) are intentionally identical in both themes — that's
  the point of a fixed role — while `primary`/`secondary`/`tertiary` swap to their lighter
  "fixed-dim" tones for contrast against dark surfaces. `next-themes` handles persistence and
  system-preference detection; toggle is in `TopNavBar` and the dashboard `Sidebar`.
- **Vercel Analytics + Speed Insights** — real visitor and performance data, where there was
  previously none.
- **Scroll-reveal micro-interactions** (`components/Reveal.tsx`) — IntersectionObserver-based,
  no new dependency, automatically inert under `prefers-reduced-motion` via the existing global
  CSS rule. Applied to the homepage's card grids and history timeline.
- **Command palette** (`Cmd+K` / `Ctrl+K`, `components/CommandPalette.tsx`) — built on `cmdk`.
  Fuzzy search across pages, projects, and quick actions (toggle theme, download CV, open
  GitHub). Global keyboard shortcut via `CommandPaletteContext`; trigger buttons in `TopNavBar`
  and `Sidebar`.
- **FAQ page** (`/faq`) — 8 questions grounded in existing site content (services, stack,
  availability, location) rather than invented copy, with `FAQPage` JSON-LD schema.
- **`/now` page** — the personal-web "now page" convention (nownownow.com). Content pulled
  directly from `experienceEntries`/`expertiseAreas` rather than written separately, so it can't
  drift out of sync with the rest of the site.
- **AI chat widget** (`components/ChatWidget.tsx`, `/api/chat`) — optional, off by default.
  Proxies to the Anthropic API with a system prompt assembled entirely from `lib/site-data.ts`
  (`lib/chat-context.ts`), so it can't invent pricing, availability, or claims not already on
  the site. Rate-limited via the same Firestore limiter used by the contact form. **Requires
  both `ANTHROPIC_API_KEY` and `NEXT_PUBLIC_CHAT_ENABLED=true`** — deliberately gated behind two
  separate flags so the widget never appears half-configured (a chat bubble that can't respond
  looks broken, not "coming soon").
- **GitHub contribution graph** (`components/GithubActivity.tsx`, on `/about`) — optional,
  needs `GITHUB_TOKEN`. Uses GitHub's GraphQL API rather than an unverified third-party
  image-proxy service, since contribution data isn't available via unauthenticated REST. A
  token with no special scopes is enough (public data). The whole section — not just the
  graph — is omitted when unconfigured, so there's no empty heading left over.
- **Page transitions** — a CSS fade applied directly to each marketing page's `<main>` element.
  Next 14.2.35 has no support at all for the experimental `viewTransition` flag (it landed in a
  later version), and hand-rolling the native View Transitions API across every `<Link>` in the
  app was a much bigger risk than this cosmetic feature justified. A root-level
  `app/template.tsx` was tried first and reverted — it would've remounted everything below it,
  including the auth-gated dashboard layout, on every navigation, causing a loading flash there
  for a feature that was only ever meant for the public pages.

## Operational pass (admin access, CI, error monitoring, e2e)

- **Dashboard Inquiries view** (`/dashboard/inquiries`) — the contact form and newsletter signup
  were writing to Firestore with no way to read that data except the Firebase console. Now
  there's a real view for it, but note the security model carefully: `/sign-up` is open to the
  public, so being logged in does **not** mean being authorized to read this data.
  `/api/dashboard/inquiries` verifies a Firebase ID token server-side *and* checks it against an
  `ADMIN_EMAILS` allowlist (`lib/firebase-admin.ts`'s `requireAdmin`) before returning anything.
  **You must set `ADMIN_EMAILS`** (comma-separated) for this page to show real data — without
  it, every authenticated user gets a 403, including you.
- **CI** (`.github/workflows/ci.yml`) — type-check, lint, test, and a full `next build` on every
  push/PR to `main`. This is also the first time the build has been verified end-to-end anywhere
  — the sandbox this project was developed in blocks `fonts.googleapis.com`, so `next build`
  (which fetches fonts via `next/font` at build time) could never be confirmed there.
- **Error monitoring** (Sentry, `sentry.*.config.ts`) — gated behind `SENTRY_DSN` /
  `NEXT_PUBLIC_SENTRY_DSN`; a documented no-op until set, same pattern as every other optional
  integration in this project. Wired into both error boundaries.
- **E2E tests** (Playwright, `e2e/`) — homepage nav, command palette, dark mode persistence,
  contact form validation. **Important:** these were authored without being able to install a
  browser to run them (same class of sandbox network restriction as above, blocking
  `deb.nodesource.com` this time). They're syntactically correct but unproven. That's why
  `.github/workflows/e2e.yml` is `workflow_dispatch`-only (manually triggered from the Actions
  tab), not wired into `ci.yml`'s automatic triggers — run `npm run test:e2e` locally first,
  confirm it passes, and only then consider adding it to the required checks.

## Testing

```bash
npm test
```

41 tests across 10 suites: `FeatureCard`, `ProjectCard`, `Footer`, `TopNavBar`, `ContactForm`,
`NewsletterForm`, `Accordion`, `ChatWidget`, `InquiriesView`, and an `accessibility` suite that
runs `jest-axe` against every public page (including async Server Components like `/about`).

E2E tests (`npm run test:e2e`) are unproven — see the Operational pass section above.

## Deploying

Any Next.js host (Vercel recommended) works out of the box. Set the environment variables from
`.env.example` in your hosting provider's dashboard before going live -- the app builds fine
without them, but Sign In/Up, Settings, and the contact form will error at runtime until they're
set.
