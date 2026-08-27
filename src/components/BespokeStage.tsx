"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useReducedMotion } from "motion/react";
import { bespoke, site } from "@/lib/site";

type Slide = { src: string; alt: string };

/* « Bespoke design » en scène plein écran.

   C'est le cœur du métier : il ne pouvait pas rester une carte parmi les
   autres. Le bloc occupe plusieurs hauteurs d'écran, reste collé pendant
   qu'on le traverse, et les pièces se succèdent en fondu — on ne fait pas
   défiler une section, on entre dans une suite de lieux.

   Le fondu est fait en CSS. Si les transitions ne peuvent pas tourner, la
   pièce active prend malgré tout son opacité finale : jamais d'écran noir.
   Sur mobile et en mouvement réduit, la scène redevient une image fixe
   avec des points de navigation — aucun contenu n'est perdu. */
export default function BespokeStage({ slides }: { slides: Slide[] }) {
  const zone = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const reduced = useReducedMotion();

  /* L'index suit la position dans la zone traversée. On lit le scroll
     directement plutôt que d'animer une valeur : la correspondance reste
     exacte même si l'on remonte, et rien ne se désynchronise. */
  useEffect(() => {
    if (reduced) return;
    const el = zone.current;
    if (!el) return;

    let raf = 0;
    const calcule = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      const course = r.height - window.innerHeight;
      if (course <= 0) return;
      const p = Math.min(Math.max(-r.top / course, 0), 0.999);
      setIndex(Math.floor(p * slides.length));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(calcule);
    };

    calcule();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [reduced, slides.length]);

  const message = encodeURIComponent(
    "Bonjour, je souhaite un tapis sur mesure de forme particulière.",
  );

  const contenu = (
    <div className="relative z-20 flex h-full flex-col justify-end px-6 pb-14 pt-24 sm:px-10 lg:justify-center lg:px-16 lg:pb-0 lg:pt-0">
      <div className="max-w-[560px]">
        <p className="eyebrow flex items-center gap-3 text-paper/85">
          <span aria-hidden className="h-px w-7 bg-accent" />
          {bespoke.eyebrow}
        </p>

        <h2 className="mt-5 font-display text-[38px] leading-[1.05] text-paper lg:text-[60px]">
          {bespoke.title}
        </h2>

        {/* Trois niveaux de lecture au lieu d'un pave : la phrase qui porte
            l'idee, l'explication en retrait, puis les capacites sur une
            seule ligne. Sur une image, un bloc dense se lit mal et abime la
            photo — la hierarchie fait le travail que la longueur ne fait
            pas. */}
        <p className="mt-6 max-w-[440px] font-display text-[22px] leading-[1.3] text-paper lg:text-[26px]">
          {bespoke.claim}
        </p>

        <p className="mt-5 max-w-[420px] text-[15px] leading-[1.6] text-paper/65">
          {bespoke.body}
        </p>

        <ul className="mt-7 flex flex-wrap items-center gap-x-3 gap-y-2 text-[13px] uppercase tracking-wide text-paper/70">
          {bespoke.points.map((point, i) => (
            <li key={point} className="flex items-center gap-3">
              {i > 0 && (
                <span aria-hidden className="h-1 w-1 rounded-full bg-accent" />
              )}
              {point}
            </li>
          ))}
        </ul>

        <div className="mt-9 flex flex-wrap gap-3">
          <a
            href={`https://wa.me/${site.whatsapp}?text=${message}`}
            target="_blank"
            rel="noreferrer"
            className="rounded bg-accent px-6 py-3.5 text-base font-medium text-paper transition-colors hover:bg-accent-hover"
          >
            Décrire mon projet
          </a>
          <Link
            href="/collections"
            className="rounded border border-white/35 px-6 py-3.5 text-base font-medium text-paper transition-colors hover:bg-white/10"
          >
            Voir les matières
          </Link>
        </div>
      </div>
    </div>
  );

  const images = (actif: number) => (
    <>
      {slides.map((slide, i) => (
        <div
          key={slide.src}
          aria-hidden={i !== actif}
          className={`absolute inset-0 transition-opacity duration-[900ms] ease-out ${
            i === actif ? "opacity-100" : "opacity-0"
          }`}
        >
          <Image
            src={slide.src}
            alt={i === actif ? slide.alt : ""}
            fill
            priority={i === 0}
            sizes="100vw"
            className="object-cover"
          />
        </div>
      ))}
      <div className="absolute inset-0 bg-gradient-to-t from-ink/92 via-ink/55 to-ink/25 lg:bg-gradient-to-r lg:from-ink/92 lg:via-ink/45 lg:to-transparent" />
    </>
  );

  /* Repli : une seule image, navigation par points. */
  if (reduced) {
    return (
      <section className="px-3">
        <div className="relative h-[86vh] min-h-[560px] overflow-hidden rounded">
        {images(index)}
        {contenu}
        <div className="absolute bottom-6 right-6 z-20 flex gap-2">
          {slides.map((s, i) => (
            <button
              key={s.src}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`Vue ${i + 1} sur ${slides.length}`}
              aria-current={i === index}
              className={`h-1.5 rounded-full transition-all ${
                i === index ? "w-7 bg-paper" : "w-1.5 bg-paper/45"
              }`}
            />
          ))}
        </div>
        </div>
      </section>
    );
  }

  return (
    <div ref={zone} className="relative h-[320vh] px-3">
      {/* Le cadre reprend la marge de 12 px et l'arrondi du hero : une scene
          bord a bord au milieu de blocs encadres cassait la ligne du site. */}
      <div className="sticky top-3 h-[calc(100vh-24px)] overflow-hidden rounded">
        {images(index)}
        {contenu}

        {/* Progression : où l'on en est dans la suite de pièces */}
        <div className="absolute bottom-8 right-6 z-20 flex items-center gap-3 sm:right-10">
          <span className="font-display text-sm text-paper/70">
            {String(index + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}
          </span>
          <div className="flex gap-1.5">
            {slides.map((s, i) => (
              <span
                key={s.src}
                aria-hidden
                className={`h-1 rounded-full transition-all duration-500 ${
                  i === index ? "w-8 bg-paper" : "w-4 bg-paper/35"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
