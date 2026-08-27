"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";

/* Curseur d'accompagnement : un disque qui suit la souris, s'élargit et
   affiche une intention quand il passe sur une image cliquable.

   Il ne remplace pas le curseur du système — celui-ci reste visible et
   fonctionnel. C'est une couche décorative en plus, désactivée au doigt,
   au stylet, et pour qui a demandé à réduire les animations : sur ces
   appareils elle n'aurait aucun sens et coûterait des images par seconde.

   Le suivi se fait en écrivant directement dans le style de l'élément,
   sans passer par l'état de React : à 60 images par seconde, un rendu
   complet du composant à chaque mouvement de souris ferait ramer la page. */
export default function Cursor() {
  const point = useRef<HTMLDivElement>(null);
  const [libelle, setLibelle] = useState<string | null>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;
    /* Pointeur fin uniquement : souris ou trackpad, jamais un doigt. */
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    const el = point.current;
    if (!el) return;

    let x = 0;
    let y = 0;
    let cx = 0;
    let cy = 0;
    let raf = 0;

    const suivre = () => {
      /* Léger retard sur la position réelle : c'est ce décalage qui donne
         l'impression d'un objet qui glisse plutôt que d'un curseur collé. */
      cx += (x - cx) * 0.18;
      cy += (y - cy) * 0.18;
      el.style.transform = `translate3d(${cx}px, ${cy}px, 0) translate(-50%, -50%)`;
      raf = requestAnimationFrame(suivre);
    };

    const onMove = (e: MouseEvent) => {
      x = e.clientX;
      y = e.clientY;

      const cible = (e.target as HTMLElement)?.closest?.(
        "[data-cursor], a, button",
      ) as HTMLElement | null;
      setLibelle(cible?.dataset?.cursor ?? null);
    };

    document.addEventListener("mousemove", onMove);
    raf = requestAnimationFrame(suivre);

    return () => {
      document.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, [reduced]);

  return (
    <div
      ref={point}
      aria-hidden
      className="curseur-suivi pointer-events-none fixed left-0 top-0 z-[95]"
    >
      <div
        className={`flex items-center justify-center rounded-full transition-all duration-300 ease-out ${
          libelle
            ? "h-20 w-20 bg-accent text-paper"
            : "h-3 w-3 bg-ink/25 backdrop-blur-sm"
        }`}
      >
        <span
          className={`text-xs font-medium tracking-wide transition-opacity duration-200 ${
            libelle ? "opacity-100" : "opacity-0"
          }`}
        >
          {libelle}
        </span>
      </div>
    </div>
  );
}
