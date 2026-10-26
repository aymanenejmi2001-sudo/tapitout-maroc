import { execSync } from "node:child_process";
import type { MetadataRoute } from "next";
import { collections } from "@/lib/site";
import { adresse, imagePubliee } from "@/lib/seo";

export const dynamic = "force-static";

/* Plan du site pour les moteurs de recherche. Les pages légales en sont
   volontairement absentes : elles sont marquées non indexables.

   Les adresses sont celles des canoniques, au caractère près — slash final
   compris. Un plan qui annonce « /collections » quand la page se déclare
   « /collections/ » envoie deux signaux contradictoires.

   La date de modification est celle du dernier commit, pas celle du jour :
   un plan dont toutes les dates changent à chaque publication apprend aux
   moteurs à les ignorer. */
function derniereModification(): Date {
  try {
    const iso = execSync("git log -1 --format=%cI", {
      stdio: ["ignore", "pipe", "ignore"],
    })
      .toString()
      .trim();
    const date = new Date(iso);
    if (!Number.isNaN(date.getTime())) return date;
  } catch {
    /* Pas de dépôt Git (copie du dossier, intégration) : on retombe sur
       la date du build, qui reste vraie. */
  }
  return new Date();
}

export default function sitemap(): MetadataRoute.Sitemap {
  const maj = derniereModification();

  const pages = [
    { chemin: "/", priority: 1, changeFrequency: "monthly" as const },
    { chemin: "/collections", priority: 0.9, changeFrequency: "monthly" as const },
    { chemin: "/savoir-faire", priority: 0.8, changeFrequency: "yearly" as const },
    { chemin: "/a-propos", priority: 0.7, changeFrequency: "yearly" as const },
    { chemin: "/professionnels", priority: 0.8, changeFrequency: "yearly" as const },
    { chemin: "/contact", priority: 0.8, changeFrequency: "yearly" as const },
  ];

  return [
    ...pages.map((p) => ({
      url: adresse(p.chemin),
      lastModified: maj,
      changeFrequency: p.changeFrequency,
      priority: p.priority,
    })),
    ...collections.map((c) => ({
      url: adresse(`/collections/${c.slug}`),
      lastModified: maj,
      changeFrequency: "monthly" as const,
      priority: 0.8,
      /* Les photographies de la fiche, pour Google Images : un tapis se
         cherche aussi à l'œil. */
      images: [c.image, ...(c.gallery ?? [])].map(imagePubliee),
    })),
  ];
}
