import type { Metadata, Viewport } from "next";
import { Libre_Caslon_Text, Manrope, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { siteConfig, personSchema } from "@/lib/site-data";
import { AuthProvider } from "@/lib/auth-context";

const libreCaslonText = Libre_Caslon_Text({
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
  variable: "--font-libre-caslon",
});

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["300", "400", "600"],
  display: "swap",
  variable: "--font-manrope",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
  variable: "--font-jetbrains-mono",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "James Maruti",
    "UI Architect",
    "Frontend Engineer",
    "Next.js Developer",
    "Digital Brand Strategist",
    "Nairobi Kenya",
    "Technical SEO",
  ],
  authors: [{ name: siteConfig.name, url: siteConfig.url }],
  creator: siteConfig.name,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    title: siteConfig.title,
    description: siteConfig.description,
    siteName: siteConfig.name,
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#00113a",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`scroll-smooth ${libreCaslonText.variable} ${manrope.variable} ${jetbrainsMono.variable}`}
    >
      <head>
        {/* Material Symbols Outlined uses variable icon axes (FILL/GRAD/opsz) that
            next/font/google's simplified weight-only API can't express, so it stays
            on a <link> tag rather than being self-hosted like the text fonts above. */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
      </head>
      <body className="font-body-md text-body-md selection:bg-primary-fixed selection:text-on-primary-fixed">
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
