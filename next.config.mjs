import { withSentryConfig } from "@sentry/nextjs/config";

const ContentSecurityPolicy = [
  "default-src 'self'",
  // 'unsafe-inline' is needed for the JSON-LD <script> tag and a couple of inline style
  // attributes from Tailwind arbitrary values. A stricter nonce-based CSP is possible via
  // middleware but adds real complexity — noted as a follow-up, not done here.
  "script-src 'self' 'unsafe-inline' https://apis.google.com https://www.gstatic.com",
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "font-src 'self' https://fonts.gstatic.com",
  "img-src 'self' data: https://lh3.googleusercontent.com https://jamesmaruti.site",
  "connect-src 'self' https://*.googleapis.com https://*.firebaseio.com https://firestore.googleapis.com https://identitytoolkit.googleapis.com https://securetoken.googleapis.com https://*.sentry.io https://*.ingest.sentry.io",
  // Firebase Auth's Google/GitHub sign-in popups need to be frameable.
  "frame-src 'self' https://*.firebaseapp.com https://accounts.google.com https://github.com",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: ContentSecurityPolicy },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
];

/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false,
  async headers() {
    return [
      { source: "/:path*", headers: securityHeaders },
      {
        source: "/images/:path*",
        headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
      },
      {
        source: "/_next/static/:path*",
        headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        pathname: "/aida-public/**",
      },
      {
        protocol: "https",
        hostname: "jamesmaruti.site",
        pathname: "/wp-content/uploads/**",
      },
    ],
    formats: ["image/avif", "image/webp"],
  },
  eslint: {
    ignoreDuringBuilds: false,
  },
};

// withSentryConfig does real work at build time beyond source-map upload — it
// auto-instruments route handlers. That's fine once Sentry is actually wanted,
// but there's no reason for that instrumentation to be active at all for a
// deployment that hasn't set a DSN yet. Rather than assume the SDK is a clean
// no-op when unconfigured (an assumption made, and not verified, when this
// was first added), only apply the wrapper when Sentry is genuinely in use.
const sentryIsConfigured = Boolean(
  process.env.SENTRY_DSN || process.env.NEXT_PUBLIC_SENTRY_DSN
);

export default sentryIsConfigured
  ? withSentryConfig(nextConfig, {
      silent: true,
      org: process.env.SENTRY_ORG,
      project: process.env.SENTRY_PROJECT,
      webpack: { treeshake: { removeDebugLogging: true } },
      // No source maps are uploaded (and no Sentry network calls happen at all
      // during build) unless SENTRY_AUTH_TOKEN is set.
      authToken: process.env.SENTRY_AUTH_TOKEN,
    })
  : nextConfig;
