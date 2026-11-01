import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import Section from "@/components/Section";
import SectionHeading from "@/components/SectionHeading";
import JsonLd from "@/components/JsonLd";
import { articles, dateLongue, minutesDeLecture } from "@/lib/journal";
import { adresse, filAriane, pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  titre: "Journal — guides du tapis sur mesure | Tapitout Maroc",
  description:
    "Taille, matière, forme, entretien, prise de mesures : les guides de l'atelier Tapitout, à Casablanca, pour bien choisir un tapis sur mesure.",
  chemin: "/journal",
});

export default function JournalPage() {
  const donnees = [
    filAriane([
      { nom: "Accueil", chemin: "/" },
      { nom: "Journal", chemin: "/journal" },
    ]),
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: "Journal Tapitout Maroc",
      url: adresse("/journal"),
      inLanguage: "fr-MA",
      isPartOf: { "@id": `${site.url}/#site` },
      mainEntity: {
        "@type": "ItemList",
        itemListElement: articles.map((a, i) => ({
          "@type": "ListItem",
          position: i + 1,
          url: adresse(`/journal/${a.slug}`),
          name: a.titre,
        })),
      },
    },
  ];

  const [premier, ...autres] = articles;

  return (
    <main id="contenu" className="pt-[68px]">
      <JsonLd data={donnees} />
      <Section>
        <SectionHeading
          level="h1"
          eyebrow="Journal"
          title="Choisir, poser, entretenir un tapis"
        />
        <Reveal>
          <p className="mt-6 max-w-2xl text-lg leading-[1.55] text-ink/70">
            Des guides écrits à l&apos;atelier, pour décider sereinement avant
            de commander.
          </p>
        </Reveal>

        <Reveal>
          <Link
            href={`/journal/${premier.slug}`}
            className="group mt-14 grid gap-8 lg:grid-cols-2 lg:gap-14"
          >
            <div className="relative aspect-[16/10] overflow-hidden rounded">
              <Image
                src={premier.image}
                alt={premier.imageAlt}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
              />
            </div>
            <div className="flex flex-col justify-center">
              <p className="eyebrow text-accent">
                {premier.categorie} · {minutesDeLecture(premier)} min de lecture
              </p>
              <h2 className="mt-4 font-display text-[30px] leading-[1.1] text-ink lg:text-[40px]">
                {premier.titre}
              </h2>
              <p className="mt-5 text-lg leading-[1.55] text-ink/70">
                {premier.extrait}
              </p>
              <p className="mt-6 text-sm text-ink/50">
                <time dateTime={premier.publie}>
                  {dateLongue(premier.publie)}
                </time>
              </p>
            </div>
          </Link>
        </Reveal>

        <div className="mt-20 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {autres.map((a, i) => (
            <Reveal key={a.slug} delay={(i % 3) * 0.06}>
              <Link href={`/journal/${a.slug}`} className="group block">
                <div className="relative aspect-[4/3] overflow-hidden rounded">
                  <Image
                    src={a.image}
                    alt={a.imageAlt}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
                  />
                </div>
                <p className="eyebrow mt-5 text-accent">
                  {a.categorie} · {minutesDeLecture(a)} min
                </p>
                <h2 className="mt-2 font-display text-2xl leading-[1.15] text-ink">
                  {a.titre}
                </h2>
                <p className="mt-3 leading-[1.55] text-ink/65">{a.extrait}</p>
              </Link>
            </Reveal>
          ))}
        </div>
      </Section>
    </main>
  );
}
