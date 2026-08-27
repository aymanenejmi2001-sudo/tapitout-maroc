"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";

/* Texte qui s'allume au fil du défilement : les mots passent de l'estompé
   au plein à mesure que le bloc traverse l'écran. La phrase se lit au
   rythme où l'on descend, au lieu d'apparaître d'un bloc.

   Règle de sécurité : les mots éteints restent à 25 % d'opacité, jamais à
   zéro. Si le défilement n'est pas suivi — animations coupées, onglet en
   arrière-plan — la phrase demeure lisible en entier au lieu de disparaître.
   Et en mouvement réduit, tout s'affiche d'emblée. */
export default function ScrollText({
  children,
  className,
}: {
  children: string;
  className?: string;
}) {
  const ref = useRef<HTMLParagraphElement>(null);
  const [avancee, setAvancee] = useState(1);
  const reduced = useReducedMotion();
  const mots = children.split(" ");

  useEffect(() => {
    if (reduced) return;
    const el = ref.current;
    if (!el) return;

    let raf = 0;
    const calcule = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      /* La phrase s'allume entre le moment où elle entre par le bas et
         celui où elle atteint le tiers supérieur de l'écran. */
      const debut = window.innerHeight * 0.9;
      const fin = window.innerHeight * 0.35;
      const p = (debut - r.top) / (debut - fin);
      setAvancee(Math.min(Math.max(p, 0), 1));
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
  }, [reduced]);

  return (
    <p ref={ref} className={className}>
      {mots.map((mot, i) => {
        /* Chaque mot a sa part de la course : le premier s'allume en
           premier, le dernier en dernier. */
        const seuil = i / mots.length;
        const allume = reduced || avancee > seuil;
        return (
          <span
            key={i}
            className={`transition-opacity duration-500 ${
              allume ? "opacity-100" : "opacity-25"
            }`}
          >
            {mot}
            {i < mots.length - 1 ? " " : ""}
          </span>
        );
      })}
    </p>
  );
}
