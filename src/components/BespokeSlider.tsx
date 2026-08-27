"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useReducedMotion } from "motion/react";

type Slide = { src: string; alt: string };

/* Diaporama du bloc « Bespoke design ».

   Le fondu se fait en CSS (classe opacity + transition) et non par animation
   JavaScript : si les transitions ne peuvent pas tourner, l'image active
   prend malgré tout son opacité finale et reste visible. Une animation
   partant d'une opacité nulle laisserait un cadre vide.

   Le défilement automatique s'arrête au survol, au focus clavier, quand
   l'onglet passe en arrière-plan, et n'existe pas du tout si le visiteur a
   demandé à réduire les animations. */
export default function BespokeSlider({ slides }: { slides: Slide[] }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduced = useReducedMotion();
  const touchX = useRef<number | null>(null);

  const go = useCallback(
    (dir: number) => setIndex((i) => (i + dir + slides.length) % slides.length),
    [slides.length],
  );

  useEffect(() => {
    if (reduced || paused || slides.length < 2) return;
    const id = setInterval(() => go(1), 6000);
    return () => clearInterval(id);
  }, [reduced, paused, go, slides.length]);

  /* On ne fait pas défiler dans le vide quand personne ne regarde. */
  useEffect(() => {
    const onVisibility = () => setPaused(document.hidden);
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, []);

  const boutonBase =
    "flex h-11 w-11 items-center justify-center rounded-full border border-white/30 bg-ink/40 text-paper backdrop-blur-sm transition-colors hover:border-accent hover:bg-accent";

  return (
    <div
      className="absolute inset-0"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
      onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
      onTouchEnd={(e) => {
        if (touchX.current === null) return;
        const delta = e.changedTouches[0].clientX - touchX.current;
        if (Math.abs(delta) > 50) go(delta < 0 ? 1 : -1);
        touchX.current = null;
      }}
    >
      {slides.map((slide, i) => (
        <div
          key={slide.src}
          aria-hidden={i !== index}
          className={`absolute inset-0 transition-opacity duration-700 ease-out ${
            i === index ? "opacity-100" : "opacity-0"
          }`}
        >
          <Image
            src={slide.src}
            alt={i === index ? slide.alt : ""}
            fill
            priority={i === 0}
            sizes="100vw"
            className="object-cover"
          />
        </div>
      ))}

      {slides.length > 1 && (
        <>
          {/* Commandes en bas à droite, à l'opposé du texte */}
          <div className="absolute bottom-5 right-5 z-20 flex items-center gap-2 sm:bottom-7 sm:right-7">
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label="Photo précédente"
              className={boutonBase}
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
              onClick={() => go(1)}
              aria-label="Photo suivante"
              className={boutonBase}
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
          </div>

          {/* Repères de position, cliquables */}
          <div className="absolute bottom-7 left-1/2 z-20 flex -translate-x-1/2 gap-2 lg:left-auto lg:right-7 lg:translate-x-0 lg:flex-col lg:bottom-24">
            {slides.map((slide, i) => (
              <button
                key={slide.src}
                type="button"
                onClick={() => setIndex(i)}
                aria-label={`Photo ${i + 1} sur ${slides.length}`}
                aria-current={i === index}
                className={`h-1.5 rounded-full transition-all duration-500 lg:h-1.5 lg:w-1.5 ${
                  i === index
                    ? "w-7 bg-paper lg:h-7 lg:w-1.5"
                    : "w-1.5 bg-paper/45 hover:bg-paper/70"
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
