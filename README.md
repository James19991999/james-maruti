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
  layout.tsx              Root layout: fonts, SEO metadata, JSON-LD, AuthProvider
  page.tsx                Homepage (hero, expertise, projects, history, philosophy, contact CTA)
  about/  experience/  expertise/  services/  contact/  schema/
  privacy-policy/  terms-of-service/
  sign-in/  sign-up/
  dashboard/
    layout.tsx             Client-side auth guard + Sidebar
    page.tsx                Overview
    projects/ stack/ journal/ archive/ support/   Placeholder panels (Settings is fully wired)
    settings/page.tsx       Account Settings (Profile tab is live; others are labeled "coming soon")
  api/contact/route.ts     POST -> validates -> writes to Firestore via Admin SDK
  api/newsletter/route.ts  POST -> validates -> upserts subscriber doc
  sitemap.ts / robots.ts   Generated SEO files
  icon.svg / apple-icon.png / opengraph-image.png   Brand favicon + social share image (file-based, auto-wired by Next)
  not-found.tsx / loading.tsx / global-error.tsx     Branded 404, route-transition, and error states
components/                TopNavBar, Footer, FeatureCard, ProjectCard, ContactForm,
                            Sidebar, SignInForm, SignUpForm, SettingsTabs, MobileMenu
lib/
  site-data.ts             All copy/content -- single source of truth for every page
  firebase.ts              Client SDK init (guarded so builds succeed without credentials)
  firebase-admin.ts        Server-only Admin SDK init
  auth-context.tsx         React context exposing Firebase auth state
public/documents/
  james-maruti-cv.pdf      Real, downloadable ATS-formatted CV generated from the site's own content
__tests__/                 Jest + RTL unit tests
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

## Testing

```bash
npm test
```

29 tests across 7 suites: `FeatureCard`, `ProjectCard`, `Footer`, `TopNavBar`, `ContactForm`,
`NewsletterForm`, and an `accessibility` suite that runs `jest-axe` against every public page.

## Deploying

Any Next.js host (Vercel recommended) works out of the box. Set the environment variables from
`.env.example` in your hosting provider's dashboard before going live -- the app builds fine
without them, but Sign In/Up, Settings, and the contact form will error at runtime until they're
set.
