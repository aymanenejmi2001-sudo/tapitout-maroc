"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import Section from "./Section";
import Reveal from "./Reveal";
import { collections, type Collection } from "@/lib/site";

/* Les collections défilent horizontalement pendant que la page descend.

   Le bloc occupe trois hauteurs d'écran : tant qu'on le traverse, il reste
   collé en haut et les pièces glissent latéralement. C'est ce décalage
   entre le geste (vertical) et le mouvement (horizontal) qui retient
   l'attention — une grille de cartes, elle, se parcourt sans s'arrêter.

   Trois replis, dans l'ordre : sur mobile et pour qui a demandé à réduire
   les animations, le rail redevient un simple défilement au doigt, avec
   accroche par carte. Le contenu est le même dans tous les cas — jamais
   masqué, jamais dépendant d'une animation pour être lisible. */

function CornerMarks() {
  return (
    <span aria-hidden className="pointer-events-none">
      <span className="absolute left-2.5 top-2.5 h-2 w-px bg-ink" />
      <span className="absolute left-2.5 top-2.5 h-px w-2 bg-ink" />
      <span className="absolute bottom-2.5 right-2.5 h-2 w-px bg-ink" />
      <span className="absolute bottom-2.5 right-2.5 h-px w-2 bg-ink" />
    </span>
  );
}

function Card({ item }: { item: Collection }) {
  return (
    <Link
      href={`/collections/${item.slug}`}
      data-cursor="Découvrir"
      className="group relative block w-[78vw] shrink-0 snap-center pb-2.5 sm:w-[52vw] lg:w-[36vw]"
    >
      <div className="relative aspect-[4/5] overflow-hidden rounded">
        <Image
          src={item.image}
          alt={`${item.name} — tapis sur mesure`}
          fill
          sizes="(max-width: 640px) 78vw, (max-width: 1024px) 52vw, 36vw"
          className="object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06]"
        />

      </div>

      <div className="absolute inset-x-[-10px] bottom-0 rounded bg-paper p-5">
        <CornerMarks />
        <div className="flex items-start justify-between gap-6">
          <div>
            <h3 className="font-display text-[24px] leading-tight text-ink">
              {item.name}
            </h3>
            <p className="mt-1.5 text-sm text-ink/75">{item.status}</p>
          </div>
          <p className="pt-2 text-sm font-medium text-accent">{item.year}</p>
        </div>
      </div>
    </Link>
  );
}

export default function Collections() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  /* La course s'arrête avant la fin pour que la dernière pièce reste
     visible un instant, au lieu de filer hors cadre. */
  const x = useTransform(scrollYProgress, [0, 0.9], ["0%", "-62%"]);

  const entete = (
    <>
      <Reveal>
        <p className="eyebrow text-accent">COLLECTION TAPITOUT 2026</p>
      </Reveal>
      <div className="mt-4 flex flex-wrap items-end justify-between gap-6">
        <Reveal delay={0.06}>
          <h2 className="font-display text-[40px] leading-[1.05] text-ink lg:text-[60px]">
            Collections
          </h2>
        </Reveal>
        <Reveal delay={0.12}>
          <Link
            href="/collections"
            className="group inline-flex items-center gap-2.5 rounded border border-ink/20 px-6 py-3.5 text-base font-medium text-ink transition-colors hover:border-ink hover:bg-ink hover:text-paper"
          >
            Voir toutes les collections
            <span
              aria-hidden
              className="transition-transform duration-300 group-hover:translate-x-1"
            >
              →
            </span>
          </Link>
        </Reveal>
      </div>
    </>
  );

  /* Repli : défilement au doigt, sans détournement du scroll vertical. */
  if (reduced) {
    return (
      <Section>
        {entete}
        <div className="-mx-6 mt-14 flex snap-x snap-mandatory gap-6 overflow-x-auto px-6 pb-4 lg:-mx-9 lg:px-9">
          {collections.map((item) => (
            <Card key={item.slug} item={item} />
          ))}
        </div>
      </Section>
    );
  }

  return (
    <>
      {/* En-tête dans le flux normal */}
      <Section spacing="tight" className="pt-16 lg:pt-24">
        {entete}
      </Section>

      {/* Rail horizontal : sur mobile on défile au doigt, sur grand écran
          le mouvement suit la descente de la page. */}
      <div className="lg:hidden">
        <div className="-mx-6 flex snap-x snap-mandatory gap-6 overflow-x-auto px-6 pb-16">
          {collections.map((item) => (
            <Card key={item.slug} item={item} />
          ))}
        </div>
      </div>

      <div ref={ref} className="relative hidden h-[300vh] lg:block">
        {/* Filet : le rail reste defilable a la main. Si le pilotage par le
            scroll ne s'applique pas — animations suspendues, onglet en
            arriere-plan — on traverserait sinon trois ecrans de cartes
            figees, ce qui serait pire qu'une grille. */}
        <div className="sticky top-0 flex h-screen items-center overflow-x-auto overflow-y-hidden [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <motion.div style={{ x }} className="flex gap-8 px-9 will-change-transform">
            {collections.map((item) => (
              <Card key={item.slug} item={item} />
            ))}

            {/* Carton de fin : la sortie du rail mène quelque part */}
            <Link
              href="/collections"
              className="group flex w-[28vw] shrink-0 flex-col justify-center rounded bg-sand p-10"
            >
              <p className="eyebrow text-accent">LA SUITE</p>
              <p className="mt-4 font-display text-[34px] leading-[1.1] text-ink">
                Toutes les collections
              </p>
              <span className="mt-8 inline-flex items-center gap-2.5 text-base font-medium text-ink">
                Les découvrir
                <span
                  aria-hidden
                  className="transition-transform duration-300 group-hover:translate-x-1"
                >
                  →
                </span>
              </span>
            </Link>
          </motion.div>
        </div>
      </div>
    </>
  );
}
