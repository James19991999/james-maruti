import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site-data";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "",
    "/about",
    "/expertise",
    "/experience",
    "/services",
    "/faq",
    "/now",
    "/contact",
    "/schema",
    "/privacy-policy",
    "/terms-of-service",
  ];

  const priorities: Record<string, number> = {
    "": 1,
    "/services": 0.9,
    "/expertise": 0.9,
    "/contact": 0.8,
    "/about": 0.8,
    "/experience": 0.7,
    "/faq": 0.6,
    "/now": 0.5,
    "/schema": 0.5,
    "/privacy-policy": 0.3,
    "/terms-of-service": 0.3,
  };

  return routes.map((route) => ({
    url: `${siteConfig.url}${route}`,
    lastModified: new Date("2026-07-03"),
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: priorities[route] ?? 0.7,
  }));
}
