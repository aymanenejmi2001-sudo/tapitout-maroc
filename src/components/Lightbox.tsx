"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";

type Item = { image: string; title: string; meta: string };

/* Agrandissement des réalisations. Sans lui, un visiteur qui veut voir le
   détail d'un tapis n'a aucun moyen de le faire — c'est pourtant le geste
   naturel devant une galerie.

   Ouverture par clic ou touche Entrée, fermeture par Échap, la croix ou un
   clic à côté ; flèches gauche/droite pour circuler. L'apparition est faite
   en CSS et jamais depuis une opacité nulle, pour qu'un écran figé ne laisse
   pas un voile noir sans image. */
export default function Lightbox({
  items,
  children,
}: {
  items: Item[];
  children: (open: (i: number) => void) => React.ReactNode;
}) {
  const [index, setIndex] = useState<number | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const openerRef = useRef<Element | null>(null);

  const open = useCallback((i: number) => setIndex(i), []);

  const close = useCallback(() => {
    setIndex(null);
    (openerRef.current as HTMLElement | null)?.focus?.();
  }, []);

  const move = useCallback(
    (dir: number) =>
      setIndex((i) =>
        i === null ? i : (i + dir + items.length) % items.length,
      ),
    [items.length],
  );

  useEffect(() => {
    if (index === null) return;
    /* A cet instant le focus est encore sur la vignette cliquee : on le
       memorise pour le rendre a la fermeture. */
    openerRef.current = document.activeElement;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") move(1);
      if (e.key === "ArrowLeft") move(-1);
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKey);
    };
  }, [index, close, move]);

  const item = index === null ? null : items[index];
  const bouton =
    "flex h-12 w-12 items-center justify-center rounded-full border border-white/25 bg-white/10 text-paper backdrop-blur-sm transition-colors hover:border-accent hover:bg-accent";

  return (
    <>
      {children(open)}

      {item && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`${item.title} — ${item.meta}`}
          className="fixed inset-0 z-[70] flex flex-col items-center justify-center bg-ink/95 p-4 sm:p-8"
        >
          <button
            type="button"
            aria-label="Fermer"
            onClick={close}
            className="absolute inset-0 cursor-zoom-out"
            tabIndex={-1}
          />

          <button
            ref={closeRef}
            type="button"
            onClick={close}
            aria-label="Fermer"
            className={`absolute right-4 top-4 z-10 sm:right-6 sm:top-6 ${bouton}`}
          >
            <svg
              viewBox="0 0 20 20"
              aria-hidden
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
            >
              <path d="M5 5l10 10M15 5L5 15" />
            </svg>
          </button>

          <figure className="relative z-10 flex max-h-full w-full max-w-[1100px] flex-col items-center">
            <div className="relative h-[70vh] w-full">
              <Image
                src={item.image}
                alt={item.title}
                fill
                sizes="90vw"
                className="object-contain"
              />
            </div>
            <figcaption className="mt-5 text-center">
              <p className="text-lg text-paper">{item.title}</p>
              <p className="mt-1 text-sm uppercase tracking-wide text-paper/60">
                {item.meta}
              </p>
            </figcaption>
          </figure>

          {items.length > 1 && (
            <div className="relative z-10 mt-6 flex items-center gap-3">
              <button
                type="button"
                onClick={() => move(-1)}
                aria-label="Réalisation précédente"
                className={bouton}
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
              <p className="min-w-[52px] text-center text-sm text-paper/70">
                {(index ?? 0) + 1} / {items.length}
              </p>
              <button
                type="button"
                onClick={() => move(1)}
                aria-label="Réalisation suivante"
                className={bouton}
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
          )}
        </div>
      )}
    </>
  );
}
