import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      /* Pages sans intérêt pour la recherche */
      disallow: [
        "/mentions-legales",
        "/confidentialite",
        "/conditions-generales",
      ],
    },
    sitemap: `${site.url}/sitemap.xml`,
  };
}
