import type { Metadata } from "next";
import { siteConfig } from "./site-data";

const defaultOgImage = {
  url: "/opengraph-image.jpg",
  width: 1200,
  height: 630,
  alt: `${siteConfig.name} — UI Architect & Digital Strategist`,
};

type PageMetadataOptions = {
  title: string;
  description: string;
  path: `/${string}` | "";
  noIndex?: boolean;
};

export function createPageMetadata({
  title,
  description,
  path,
  noIndex = false,
}: PageMetadataOptions): Metadata {
  const pageUrl = path === "" ? siteConfig.url : `${siteConfig.url}${path}`;

  return {
    title,
    description,
    alternates: { canonical: path || "/" },
    openGraph: {
      type: "website",
      locale: "en_US",
      url: pageUrl,
      title,
      description,
      siteName: siteConfig.name,
      images: [defaultOgImage],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [defaultOgImage.url],
    },
    ...(noIndex ? { robots: { index: false, follow: false } } : {}),
  };
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.path === "" ? siteConfig.url : `${siteConfig.url}${item.path}`,
    })),
  };
}

export function serviceSchema(items: { title: string; description: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: items.map((item, index) => ({
      "@type": "Service",
      position: index + 1,
      name: item.title,
      description: item.description,
      provider: {
        "@type": "Person",
        name: siteConfig.name,
        url: siteConfig.url,
      },
      areaServed: {
        "@type": "Country",
        name: "Worldwide",
      },
    })),
  };
}
