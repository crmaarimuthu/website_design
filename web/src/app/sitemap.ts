import type { MetadataRoute } from "next";
import { site } from "@/content/site";
import { galleries } from "@/content/galleries";
import { blog } from "@/content/blog";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = site.url.replace(/\/$/, "");
  const staticRoutes = [
    "",
    "/about",
    "/services",
    "/portfolio",
    "/pricing",
    "/testimonials",
    "/blog",
    "/booking",
    "/contact",
  ];

  const now = new Date();

  return [
    ...staticRoutes.map((path) => ({
      url: `${base}${path}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: path === "" ? 1 : 0.7,
    })),
    ...galleries.map((g) => ({
      url: `${base}/gallery/${g.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
    ...blog.map((p) => ({
      url: `${base}/blog/${p.slug}`,
      lastModified: new Date(p.date),
      changeFrequency: "yearly" as const,
      priority: 0.5,
    })),
  ];
}
