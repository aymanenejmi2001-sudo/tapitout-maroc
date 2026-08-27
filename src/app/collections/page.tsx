import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Reveal from "@/components/Reveal";
import Section from "@/components/Section";
import SectionHeading from "@/components/SectionHeading";
import { collections } from "@/lib/site";

export const metadata: Metadata = {
  title: "Collections — Tapitout Maroc",
  description:
    "Les collections de tapis Tapitout : Calmora, Riviera, Costa, Élan et Eclipse. Toutes façonnables sur mesure, toutes dimensions et toutes formes.",
};

export default function CollectionsPage() {
  return (
    <main id="contenu" className="pt-[68px]">
      <Section>
        <SectionHeading
          eyebrow="COLLECTION TAPITOUT 2026"
          title="Nos collections"
        />
        <Reveal delay={0.1}>
          <p className="mt-6 max-w-[560px] text-lg leading-[1.5] text-ink/75">
            Chaque collection se décline sur mesure : la taille est arrêtée au
            millimètre à partir du relevé fait chez vous.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {collections.map((item, i) => (
            <Reveal key={item.slug} delay={(i % 3) * 0.08}>
              <Link href={`/collections/${item.slug}`} className="group block">
                <div
                  className={`relative overflow-hidden rounded ${
                    item.wide ? "aspect-[4/3]" : "aspect-[631/726]"
                  }`}
                >
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
                  />
                </div>
                <div className="mt-5 flex items-start justify-between gap-6">
                  <div>
                    <h2 className="font-display text-[22px] leading-tight text-ink">
                      {item.name}
                    </h2>
                    <p className="mt-1.5 text-sm text-ink/75">{item.status}</p>
                  </div>
                  <p className="pt-1 text-sm font-medium text-accent">
                    {item.year}
                  </p>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </Section>
    </main>
  );
}
