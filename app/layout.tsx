import type { Metadata, Viewport } from "next";
import { Libre_Caslon_Text, Manrope, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { siteConfig, structuredData } from "@/lib/site-data";
import MaterialSymbolsLoader from "@/components/MaterialSymbolsLoader";

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
    "Next.js Developer",
    "Frontend Engineer",
    "Web Developer Nairobi",
    "Digital Brand Strategist",
    "Nairobi Kenya",
    "Technical SEO",
    "Entity-First SEO",
    "UI/UX Designer Kenya",
  ],
  authors: [{ name: siteConfig.name, url: siteConfig.url }],
  creator: siteConfig.name,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    title: siteConfig.title,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: "/opengraph-image.jpg",
        width: 1200,
        height: 630,
        alt: `${siteConfig.name} — UI Architect & Digital Strategist`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
    images: ["/opengraph-image.jpg"],
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
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body className="font-body-md text-body-md selection:bg-primary-fixed selection:text-on-primary-fixed">
        <MaterialSymbolsLoader />
        {children}
      </body>
    </html>
  );
}
