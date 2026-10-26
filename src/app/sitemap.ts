import type { MetadataRoute } from "next";
import { collections, site } from "@/lib/site";

/* Plan du site pour les moteurs de recherche. Les pages légales en sont
   volontairement absentes : elles sont marquées non indexables. */
export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const pages = [
    { url: "", priority: 1, changeFrequency: "monthly" as const },
    { url: "/collections", priority: 0.9, changeFrequency: "monthly" as const },
    {
      url: "/savoir-faire",
      priority: 0.8,
      changeFrequency: "yearly" as const,
    },
    { url: "/a-propos", priority: 0.7, changeFrequency: "yearly" as const },
    {
      url: "/professionnels",
      priority: 0.8,
      changeFrequency: "yearly" as const,
    },
    { url: "/contact", priority: 0.8, changeFrequency: "yearly" as const },
  ];

  return [
    ...pages.map((p) => ({
      url: `${site.url}${p.url}`,
      lastModified: now,
      changeFrequency: p.changeFrequency,
      priority: p.priority,
    })),
    ...collections.map((c) => ({
      url: `${site.url}/collections/${c.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
