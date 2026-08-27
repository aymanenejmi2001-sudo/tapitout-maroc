"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Section from "./Section";
import ParallaxImage from "./ParallaxImage";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import Lightbox from "./Lightbox";
import { gallery } from "@/lib/site";

type Item = (typeof gallery)[number];

/* Galerie en rail horizontal.

   Trois façons d'avancer, pour que personne ne reste bloqué : les flèches
   posées sur les bords du rail (et non perdues au-dessus, où elles ne
   disaient pas à quoi elles servaient), le glisser-déposer à la souris, et
   le défilement au doigt ou à la molette. Une barre de progression indique
   où l'on en est — sans elle, rien ne signale qu'il reste des pièces. */
function Figure({ item, onOpen }: { item: Item; onOpen: () => void }) {
  return (
    <figure className="w-[76vw] shrink-0 snap-start sm:w-[46vw] lg:w-[30vw]">
      <button
        type="button"
        onClick={onOpen}
        aria-label={`Agrandir : ${item.title}`}
        data-cursor="Agrandir"
        className="group block w-full cursor-zoom-in text-left"
      >
        <div className="relative aspect-[4/5] overflow-hidden rounded">
          <ParallaxImage
            src={item.image}
            alt={item.title}
            sizes="(max-width: 640px) 76vw, (max-width: 1024px) 46vw, 30vw"
            amount={5}
            className="transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.05]"
          />
        </div>

        <figcaption className="mt-4 px-1">
          <p className="text-lg text-ink">{item.title}</p>
          <p className="mt-1 text-sm uppercase tracking-wide text-ink/50">
            {item.meta}
          </p>
        </figcaption>
      </button>
    </figure>
  );
}

export default function Gallery() {
  const rail = useRef<HTMLDivElement>(null);
  const [debut, setDebut] = useState(true);
  const [fin, setFin] = useState(false);
  const [progression, setProgression] = useState(0);
  const glisse = useRef({ actif: false, x: 0, depart: 0, bouge: false });

  const majEtat = useCallback(() => {
    const el = rail.current;
    if (!el) return;
    const course = el.scrollWidth - el.clientWidth;
    setDebut(el.scrollLeft < 12);
    setFin(el.scrollLeft >= course - 12);
    setProgression(course > 0 ? el.scrollLeft / course : 0);
  }, []);

  useEffect(() => {
    majEtat();
    const el = rail.current;
    el?.addEventListener("scroll", majEtat, { passive: true });
    window.addEventListener("resize", majEtat);
    return () => {
      el?.removeEventListener("scroll", majEtat);
      window.removeEventListener("resize", majEtat);
    };
  }, [majEtat]);

  const glisser = (sens: number) => {
    const el = rail.current;
    if (!el) return;
    el.scrollBy({ left: sens * el.clientWidth * 0.8, behavior: "smooth" });
  };

  /* Glisser-déposer à la souris. Le seuil de 4 px distingue un glissement
     d'un clic : sans lui, chaque prise en main ouvrirait une photo. */
  const onPointerDown = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse") return;
    const el = rail.current;
    if (!el) return;
    glisse.current = {
      actif: true,
      x: e.clientX,
      depart: el.scrollLeft,
      bouge: false,
    };
  };

  const onPointerMove = (e: React.PointerEvent) => {
    const g = glisse.current;
    const el = rail.current;
    if (!g.actif || !el) return;
    const delta = e.clientX - g.x;
    if (Math.abs(delta) > 4) g.bouge = true;
    el.scrollLeft = g.depart - delta;
  };

  const finGlisse = () => {
    glisse.current.actif = false;
  };

  const bouton =
    "flex h-12 w-12 items-center justify-center rounded-full border border-ink/15 bg-paper/95 text-ink shadow-lg backdrop-blur-sm transition-colors hover:bg-ink hover:text-paper disabled:pointer-events-none disabled:opacity-0";

  return (
    <Section>
      <SectionHeading
        eyebrow="RÉALISATIONS · GALERIE"
        title="Des espaces qui prennent vie."
      />

      <Reveal delay={0.1}>
        <p className="mt-6 max-w-[560px] text-base leading-[1.5] text-ink/75">
          Une sélection de réalisations pensées dans le détail, de la première
          mesure à la dernière pose.
        </p>
      </Reveal>

      <Lightbox items={gallery}>
        {(open) => (
          <div className="relative mt-12">
            <div
              ref={rail}
              onPointerDown={onPointerDown}
              onPointerMove={onPointerMove}
              onPointerUp={finGlisse}
              onPointerLeave={finGlisse}
              className="-mx-6 flex cursor-grab snap-x snap-mandatory gap-5 overflow-x-auto px-6 pb-2 [scrollbar-width:none] active:cursor-grabbing lg:-mx-9 lg:gap-6 lg:px-9 [&::-webkit-scrollbar]:hidden"
            >
              {gallery.map((item, i) => (
                <Figure
                  key={item.image}
                  item={item}
                  onOpen={() => {
                    /* On n'ouvre pas si le geste était un glissement */
                    if (!glisse.current.bouge) open(i);
                  }}
                />
              ))}
            </div>

            {/* Flèches posées sur les bords du rail, à hauteur des images */}
            <button
              type="button"
              onClick={() => glisser(-1)}
              disabled={debut}
              aria-label="Réalisations précédentes"
              className={`absolute -left-1 top-[38%] z-10 hidden lg:flex ${bouton}`}
            >
              <svg
                viewBox="0 0 20 20"
                aria-hidden
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 4l-6 6 6 6" />
              </svg>
            </button>

            <button
              type="button"
              onClick={() => glisser(1)}
              disabled={fin}
              aria-label="Réalisations suivantes"
              className={`absolute -right-1 top-[38%] z-10 hidden lg:flex ${bouton}`}
            >
              <svg
                viewBox="0 0 20 20"
                aria-hidden
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M8 4l6 6-6 6" />
              </svg>
            </button>

            {/* Barre de progression : la seule chose qui dise combien il reste */}
            <div className="mt-8 flex items-center gap-4">
              <div className="h-px flex-1 bg-ink/12">
                <div
                  className="h-px bg-accent transition-[width] duration-200"
                  style={{ width: `${Math.max(progression * 100, 6)}%` }}
                />
              </div>
              <p className="shrink-0 text-sm text-ink/50">
                {gallery.length} réalisations
              </p>
            </div>
          </div>
        )}
      </Lightbox>
    </Section>
  );
}
