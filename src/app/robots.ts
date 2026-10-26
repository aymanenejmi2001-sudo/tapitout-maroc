import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

export const dynamic = "force-static";

/* Tout est ouvert aux robots, pages légales comprises.

   Elles portent une balise « noindex » : c'est elle qui les garde hors des
   résultats. Les interdire AUSSI ici revenait à empêcher Google de les
   lire — donc de voir le « noindex » — et il pouvait alors les garder
   dans son index sans contenu, simplement parce que d'autres pages y
   renvoient. Un « noindex » ne fonctionne que sur une page qu'on laisse
   explorer. */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${site.url}/sitemap.xml`,
  };
}
