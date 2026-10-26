import type { Metadata } from "next";
import { collections, site, socialLinks } from "./site";
import { sansRappels } from "./text";

/* Tout ce que les moteurs de recherche et les réseaux sociaux lisent d'une
   page passe par ici. Avant ce module, chaque page héritait de la
   canonique du layout — « / » — ce qui revenait à déclarer toutes les
   collections comme des copies de l'accueil. Une canonique ne se déduit
   jamais : chaque page la donne elle-même. */

export const NOM = "Tapitout Maroc";

/* L'export statique sert un dossier par page : l'adresse réelle d'une page
   se termine donc par « / ». Canonique, og:url et plan du site doivent
   dire la même chose, au caractère près. */
export function adresse(chemin: string): string {
  if (chemin === "/" || chemin === "") return `${site.url}/`;
  const propre = chemin.replace(/^\/+|\/+$/g, "");
  return `${site.url}/${propre}/`;
}

type Partage = { url: string; width: number; height: number; alt: string };

/* Image par défaut des aperçus de partage : 1200 x 630, le format que les
   réseaux et les messageries attendent. */
export const PARTAGE_DEFAUT: Partage = {
  url: "/images/partage/accueil.jpg",
  width: 1200,
  height: 630,
  alt: "Salon d'un riad habillé d'un tapis sur mesure Tapitout",
};

type Options = {
  /* Titre complet, marque comprise : le layout n'ajoute rien. */
  titre: string;
  description: string;
  chemin: string;
  partage?: Partage;
  type?: "website" | "article";
  /* Pages légales : utiles au visiteur, sans intérêt dans une recherche. */
  indexable?: boolean;
};

export function pageMetadata({
  titre,
  description,
  chemin,
  partage = PARTAGE_DEFAUT,
  type = "website",
  indexable = true,
}: Options): Metadata {
  const url = adresse(chemin);
  return {
    title: titre,
    description,
    alternates: { canonical: url },
    ...(indexable ? {} : { robots: { index: false, follow: true } }),
    /* Next ne fusionne pas openGraph avec celui du layout : une page qui
       en déclare un doit le déclarer en entier. */
    openGraph: {
      type,
      locale: "fr_MA",
      siteName: NOM,
      url,
      title: titre,
      description,
      images: [partage],
    },
    twitter: {
      card: "summary_large_image",
      title: titre,
      description,
      images: [partage.url],
    },
  };
}

/* Coupe un texte à la limite d'un mot, sans jamais finir au milieu d'une
   phrase tronquée par un « … » abrupt : un extrait de recherche coupé net
   donne l'impression d'un site négligé. */
export function extrait(texte: string, max = 155): string {
  const propre = sansRappels(texte).replace(/\s+/g, " ").trim();
  if (propre.length <= max) return propre;
  const coupe = propre.slice(0, max);
  const finPhrase = Math.max(coupe.lastIndexOf(". "), coupe.lastIndexOf("."));
  if (finPhrase > max * 0.55) return coupe.slice(0, finPhrase + 1);
  return coupe.slice(0, coupe.lastIndexOf(" ")).replace(/[,;:]$/, "") + "…";
}

/* Aperçu de partage d'une collection : un recadrage 1200 x 630 de sa
   photographie, fabriqué par scripts/images-partage.mjs. */
export function partageCollection(slug: string, nom: string): Partage {
  return {
    url: `/images/partage/${slug}.jpg`,
    width: 1200,
    height: 630,
    alt: `${nom} — détail du tissage`,
  };
}

export const nomsCollections = collections.map((c) =>
  c.name.replace(/^Collection\s+/i, ""),
);

/* Fil d'Ariane : les moteurs l'affichent à la place de l'adresse brute dans
   les résultats, ce qui rend la page lisible avant même qu'on clique. */
export function filAriane(etapes: { nom: string; chemin: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: etapes.map((e, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: e.nom,
      item: adresse(e.chemin),
    })),
  };
}

/* Fiche de la maison et du site, présente sur toutes les pages.

   Ne figure ici que ce qui est vrai et vérifiable : ni fourchette de prix,
   ni avis, ni coordonnées GPS devinées. Les horaires et les réseaux
   sociaux s'ajouteront d'eux-mêmes dès qu'ils seront renseignés dans
   site.ts. Les mêmes informations doivent rester identiques, au mot près,
   à celles de la fiche Google Business : c'est leur cohérence que Google
   récompense. */
export function donneesEntreprise() {
  const reseaux = socialLinks.map((r) => r.href).filter(Boolean);
  const idEntreprise = `${site.url}/#entreprise`;
  return [
    {
      "@context": "https://schema.org",
      "@type": "HomeGoodsStore",
      "@id": idEntreprise,
      name: NOM,
      description:
        "Atelier de tapis sur mesure à Casablanca : relevé sur place, essayage chez vous, façonnage et finitions en atelier, livraison et pose partout au Maroc.",
      url: adresse("/"),
      logo: `${site.url}/images/logo-red.png`,
      image: `${site.url}${PARTAGE_DEFAUT.url}`,
      telephone: site.phoneIntl,
      email: site.email,
      address: {
        "@type": "PostalAddress",
        streetAddress: "408, 410 Bd Oued Edaoura",
        addressLocality: site.city,
        postalCode: site.postalCode,
        addressCountry: site.country,
      },
      areaServed: { "@type": "Country", name: "Maroc" },
      hasMap: site.mapsUrl,
      ...(reseaux.length ? { sameAs: reseaux } : {}),
      ...(site.hours.length
        ? {
            openingHours: site.hours.map((h) => `${h.days} ${h.time}`),
          }
        : {}),
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "@id": `${site.url}/#site`,
      url: adresse("/"),
      name: NOM,
      inLanguage: "fr-MA",
      publisher: { "@id": idEntreprise },
    },
  ];
}

/* Adresse publiée d'une image du site. Les originaux ne sont pas mis en
   ligne ; seules les variantes fabriquées par scripts/variantes-images.mjs
   le sont. On désigne la plus grande, celle que Google Images doit voir. */
export function imagePubliee(src: string): string {
  const chemin = src.replace(/^\/images\//, "").replace(/\.[a-z0-9]+$/i, "");
  return `${site.url}/_i/1800/${chemin}.webp`;
}
