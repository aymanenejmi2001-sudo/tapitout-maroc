"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "motion/react";

/* Anime la partie chiffrée d'une valeur ("4 860 m²" → compte jusqu'à 4860
   en gardant le préfixe, l'espace et l'unité). La valeur finale est rendue
   côté serveur : sans JavaScript, le chiffre reste juste. */
export default function Counter({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const reduced = useReducedMotion();
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    if (!inView || reduced) return;

    const match = value.match(/^(\D*)(\d[\d  .,]*\d|\d)(.*)$/);
    if (!match) return;

    const [, prefix, raw, suffix] = match;
    const target = Number(raw.replace(/[ \s.,]/g, ""));
    if (Number.isNaN(target)) return;

    const grouped = /[ \s]/.test(raw);
    const render = (n: number) =>
      `${prefix}${grouped ? n.toLocaleString("fr-FR") : n}${suffix}`;

    const duration = 1400;
    const start = performance.now();
    let frame = requestAnimationFrame(function tick(now) {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3); // ralentit en fin de course
      setDisplay(render(Math.round(target * eased)));
      if (p < 1) frame = requestAnimationFrame(tick);
      else setDisplay(value);
    });

    return () => cancelAnimationFrame(frame);
  }, [inView, reduced, value]);

  return <span ref={ref}>{display}</span>;
}
