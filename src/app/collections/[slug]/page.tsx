import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Reveal from "@/components/Reveal";
import Section from "@/components/Section";
import { collections, site } from "@/lib/site";
import { sansRappels } from "@/lib/text";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return collections.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const item = collections.find((c) => c.slug === slug);
  if (!item) return {};
  return {
    title: `${item.name} — Tapitout Maroc`,
    description: `${item.name}, façonnable sur mesure — toutes dimensions, toutes formes. Relevé sur place et pose partout au Maroc.`,
    openGraph: { images: [item.image] },
  };
}

export default async function CollectionPage({ params }: Params) {
  const { slug } = await params;
  const item = collections.find((c) => c.slug === slug);
  if (!item) notFound();

  const others = collections.filter((c) => c.slug !== slug).slice(0, 3);
  const message = encodeURIComponent(
    `Bonjour, je suis intéressé(e) par la ${item.name}.`,
  );

  return (
    <main id="contenu" className="pt-[68px]">
      <Section>
        <Reveal>
          <Link
            href="/collections"
            className="inline-block py-2 text-sm text-ink/60 transition-colors hover:text-accent"
          >
            ← Toutes les collections
          </Link>
        </Reveal>

        <div className="mt-8 grid gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <div>
              <div className="relative aspect-[631/726] overflow-hidden rounded">
                <Image
                  src={item.image}
                  alt={`${item.name} — détail du tissage`}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>

              {/* Les autres prises de vue de la pièce. Plusieurs collections
                  existent en variantes — une seule photographie en donnait
                  une idée fausse. Rien ne s'affiche quand il n'y en a pas. */}
              {item.gallery && item.gallery.length > 0 && (
                <div className="mt-3 grid grid-cols-3 gap-3">
                  {item.gallery.map((src, i) => (
                    <div
                      key={src}
                      className="relative aspect-square overflow-hidden rounded"
                    >
                      <Image
                        src={src}
                        alt={`${item.name} — variante ${i + 2}`}
                        fill
                        sizes="(max-width: 1024px) 33vw, 17vw"
                        className="object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:scale-[1.06]"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </Reveal>

          <div className="flex flex-col justify-center">
            <Reveal delay={0.06}>
              <p className="eyebrow text-accent">
                {item.year} · {item.status}
              </p>
              <h1 className="mt-4 font-display text-[38px] leading-[1.05] text-ink lg:text-[52px]">
                {item.name}
              </h1>
            </Reveal>

            <Reveal delay={0.12}>
              <p className="mt-6 whitespace-pre-line text-lg leading-[1.5] text-ink/75">
                {sansRappels(item.description)}
              </p>
            </Reveal>

            <Reveal delay={0.18}>
              <dl className="mt-10 space-y-4 border-t border-black/10 pt-8 text-base">
                <div className="flex justify-between gap-6">
                  <dt className="text-ink/60">Dimensions</dt>
                  <dd className="text-right text-ink">
                    Sur mesure, au millimètre
                  </dd>
                </div>
                <div className="flex justify-between gap-6">
                  <dt className="text-ink/60">Formes</dt>
                  <dd className="text-right text-ink">
                    Toutes formes, y compris découpes
                  </dd>
                </div>
                <div className="flex justify-between gap-6">
                  <dt className="text-ink/60">Finitions</dt>
                  <dd className="text-right text-ink">
                    Couture machine, main, résine ou galon
                  </dd>
                </div>
                <div className="flex justify-between gap-6">
                  <dt className="text-ink/60">Livraison</dt>
                  <dd className="text-right text-ink">Partout au Maroc</dd>
                </div>
              </dl>
            </Reveal>

            <Reveal delay={0.24}>
              <div className="mt-10 flex flex-wrap gap-3">
                <a
                  href={`https://wa.me/${site.whatsapp}?text=${message}`}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded bg-accent px-6 py-3.5 text-base font-medium text-paper transition-colors hover:bg-accent-hover"
                >
                  Demander cette collection
                </a>
                {/* La collection suit le visiteur jusqu'au formulaire */}
                <Link
                  href={`/contact?collection=${item.slug}`}
                  className="rounded border border-black/15 px-6 py-3.5 text-base font-medium text-ink transition-colors hover:bg-surface"
                >
                  Prendre rendez-vous
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </Section>

      <Section spacing="tight" className="bg-sand pb-20 lg:pb-24">
        <h2 className="font-display text-2xl text-ink">Autres collections</h2>
        <div className="mt-8 grid gap-x-8 gap-y-10 sm:grid-cols-3">
          {others.map((other) => (
            <Link
              key={other.slug}
              href={`/collections/${other.slug}`}
              className="group block"
            >
              <div className="relative aspect-[631/500] overflow-hidden rounded">
                <Image
                  src={other.image}
                  alt={other.name}
                  fill
                  sizes="(max-width: 640px) 100vw, 33vw"
                  className="object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
                />
              </div>
              <p className="mt-4 text-lg text-ink">{other.name}</p>
            </Link>
          ))}
        </div>
      </Section>
    </main>
  );
}
