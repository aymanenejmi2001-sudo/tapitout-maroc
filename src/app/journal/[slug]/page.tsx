import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import ArticleBody from "@/components/ArticleBody";
import JsonLd from "@/components/JsonLd";
import Reveal from "@/components/Reveal";
import Section from "@/components/Section";
import {
  articleParSlug,
  articles,
  dateLongue,
  minutesDeLecture,
} from "@/lib/journal";
import { NOM, adresse, filAriane, pageMetadata } from "@/lib/seo";
import { collections, site } from "@/lib/site";

type Params = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const article = articleParSlug(slug);
  if (!article) return {};
  const meta = pageMetadata({
    titre: `${article.titre} | Tapitout Maroc`,
    description: article.description,
    chemin: `/journal/${article.slug}`,
    type: "article",
    partage: {
      url: `/images/partage/journal-${article.slug}.jpg`,
      width: 1200,
      height: 630,
      alt: article.imageAlt,
    },
  });
  return {
    ...meta,
    openGraph: {
      ...meta.openGraph,
      type: "article",
      publishedTime: article.publie,
      modifiedTime: article.modifie,
      authors: [NOM],
    },
  };
}

export default async function ArticlePage({ params }: Params) {
  const { slug } = await params;
  const article = articleParSlug(slug);
  if (!article) notFound();

  const suite = article.aLire
    .map((s) => articleParSlug(s))
    .filter((a): a is NonNullable<typeof a> => Boolean(a));
  const liees = article.collections
    .map((s) => collections.find((c) => c.slug === s))
    .filter((c): c is NonNullable<typeof c> => Boolean(c));

  const url = adresse(`/journal/${article.slug}`);
  const rapports = ["16x9", "4x3", "1x1"].map(
    (r) => `${site.url}/images/partage/journal-${article.slug}-${r}.jpg`,
  );

  const donnees = [
    filAriane([
      { nom: "Accueil", chemin: "/" },
      { nom: "Journal", chemin: "/journal" },
      { nom: article.titre, chemin: `/journal/${article.slug}` },
    ]),
    {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      mainEntityOfPage: { "@type": "WebPage", "@id": url },
      headline: article.titre,
      description: article.description,
      image: rapports,
      datePublished: article.publie,
      dateModified: article.modifie,
      inLanguage: "fr-MA",
      author: {
        "@type": "Organization",
        name: NOM,
        url: adresse("/a-propos"),
      },
      publisher: { "@id": `${site.url}/#entreprise` },
      isPartOf: { "@id": `${site.url}/#site` },
    },
  ];

  return (
    <main id="contenu" className="pt-[68px]">
      <JsonLd data={donnees} />
      <Section>
        <article className="mx-auto max-w-[760px]">
          <Reveal>
            <Link
              href="/journal"
              className="inline-block py-2 text-sm text-ink/60 transition-colors hover:text-accent"
            >
              ← Le Journal
            </Link>
          </Reveal>

          <Reveal delay={0.06}>
            <p className="eyebrow mt-8 text-accent">{article.categorie}</p>
            <h1 className="mt-4 font-display text-[36px] leading-[1.08] text-ink lg:text-[52px]">
              {article.titre}
            </h1>
            <p className="mt-6 text-sm text-ink/55">
              Par {NOM} ·{" "}
              <time dateTime={article.publie}>{dateLongue(article.publie)}</time>
              {article.modifie !== article.publie && (
                <>
                  {" "}
                  · mis à jour le{" "}
                  <time dateTime={article.modifie}>
                    {dateLongue(article.modifie)}
                  </time>
                </>
              )}{" "}
              · {minutesDeLecture(article)} min de lecture
            </p>
          </Reveal>

          <Reveal delay={0.12}>
            <div className="relative mt-10 aspect-[16/10] overflow-hidden rounded">
              <Image
                src={article.image}
                alt={article.imageAlt}
                fill
                priority
                sizes="(max-width: 800px) 100vw, 760px"
                className="object-cover"
              />
            </div>
          </Reveal>

          <ArticleBody blocs={article.contenu} />

          <div className="mt-16 rounded bg-ink px-7 py-9 text-paper">
            <p className="eyebrow text-paper/60">Votre projet</p>
            <p className="mt-3 font-display text-2xl leading-snug">
              Un tapis conçu pour votre pièce, mesuré chez vous.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/contact"
                className="rounded bg-paper px-6 py-3.5 text-base font-medium text-ink transition-opacity hover:opacity-90"
              >
                Prendre rendez-vous
              </Link>
              <Link
                href="/savoir-faire"
                className="rounded border border-paper/30 px-6 py-3.5 text-base font-medium text-paper transition-colors hover:bg-paper/10"
              >
                Notre savoir-faire
              </Link>
            </div>
          </div>
        </article>
      </Section>

      {liees.length > 0 && (
        <Section spacing="tight" className="bg-sand">
          <h2 className="font-display text-2xl text-ink">
            Collections à découvrir
          </h2>
          <div className="mt-8 grid gap-x-8 gap-y-10 sm:grid-cols-3">
            {liees.map((c) => (
              <Link
                key={c.slug}
                href={`/collections/${c.slug}`}
                className="group block"
              >
                <div className="relative aspect-[631/500] overflow-hidden rounded">
                  <Image
                    src={c.image}
                    alt={`${c.name} — tapis sur mesure`}
                    fill
                    sizes="(max-width: 640px) 100vw, 33vw"
                    className="object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
                  />
                </div>
                <p className="mt-4 text-lg text-ink">{c.name}</p>
              </Link>
            ))}
          </div>
        </Section>
      )}

      {suite.length > 0 && (
        <Section spacing="tight" className="pb-20 lg:pb-24">
          <h2 className="font-display text-2xl text-ink">À lire ensuite</h2>
          <div className="mt-8 grid gap-8 sm:grid-cols-2">
            {suite.map((a) => (
              <Link
                key={a.slug}
                href={`/journal/${a.slug}`}
                className="group block border-t border-black/10 pt-5"
              >
                <p className="eyebrow text-accent">{a.categorie}</p>
                <p className="mt-2 font-display text-xl leading-snug text-ink transition-colors group-hover:text-accent">
                  {a.titre}
                </p>
                <p className="mt-2 text-ink/65">{a.extrait}</p>
              </Link>
            ))}
          </div>
        </Section>
      )}
    </main>
  );
}
