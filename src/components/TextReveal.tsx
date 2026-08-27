"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import type { ElementType } from "react";

type Props = {
  children: string;
  className?: string;
  as?: ElementType;
  delay?: number;
};

/* Effet « rideau » : chaque mot monte depuis sous une ligne invisible.

   Principe de sécurité : le texte est VISIBLE par défaut. Le masque n'est
   armé qu'au montage, côté client, et seulement pour un titre encore hors
   écran — celui qu'on verra donc arriver. Si quoi que ce soit échoue
   (JavaScript absent, animations suspendues, observateur muet), le texte
   reste simplement affiché. Un texte ne doit jamais disparaître à cause
   d'une animation.

   L'observation porte sur le conteneur, jamais sur les mots : ceux-ci
   débordent de leur masque `overflow-hidden`, et un observateur posé sur
   eux les croirait hors écran pour toujours. */
export default function TextReveal({
  children,
  className,
  as: Tag = "span",
  delay = 0,
}: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const [armed, setArmed] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const reduced = useReducedMotion();
  const words = children.split(" ");

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const belowFold = () =>
      el.getBoundingClientRect().top >= window.innerHeight - 60;

    // Déjà à l'écran au chargement : on n'y touche pas.
    if (!belowFold()) return;

    setArmed(true);

    const reveal = () => setRevealed(true);
    const observer = new IntersectionObserver(
      (entries) => entries.some((e) => e.isIntersecting) && reveal(),
      { rootMargin: "-60px" },
    );
    observer.observe(el);

    // Filet : si l'observateur reste muet, on révèle quand même.
    const fallback = setInterval(() => !belowFold() && reveal(), 800);

    return () => {
      observer.disconnect();
      clearInterval(fallback);
    };
  }, []);

  if (reduced) return <Tag className={className}>{children}</Tag>;

  const hidden = armed && !revealed;

  return (
    <Tag className={className}>
      <span ref={ref} className="inline">
        {words.map((w, i) => (
          <span
            key={i}
            className="inline-flex overflow-hidden align-bottom"
            style={{ paddingBottom: "0.12em" }}
          >
            <motion.span
              className="inline-block"
              initial={false}
              animate={{ y: hidden ? "110%" : "0%" }}
              transition={{
                duration: hidden ? 0 : 0.9,
                delay: hidden ? 0 : delay + i * 0.045,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              {w}
            </motion.span>
            {i < words.length - 1 && <span>&nbsp;</span>}
          </span>
        ))}
      </span>
    </Tag>
  );
}
