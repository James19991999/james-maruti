import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site-data";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/dashboard/", "/sign-in", "/sign-up", "/api/"],
    },
    sitemap: `${siteConfig.url}/sitemap.xml`,
  };
}
