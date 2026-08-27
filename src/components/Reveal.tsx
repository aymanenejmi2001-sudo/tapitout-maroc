"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
};

/* Apparition au défilement, avec la même règle de sécurité que
   [TextReveal] : le contenu est visible par défaut et n'est masqué qu'au
   montage, côté client, s'il se trouve encore sous la ligne de flottaison.
   Si les animations ne peuvent pas tourner (JavaScript absent, onglet en
   arrière-plan, observateur muet), la page reste entièrement lisible. */
export default function Reveal({
  children,
  delay = 0,
  y = 28,
  className,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [armed, setArmed] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const reduced = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const belowFold = () =>
      el.getBoundingClientRect().top >= window.innerHeight - 80;

    if (!belowFold()) return;

    setArmed(true);

    const reveal = () => setRevealed(true);
    const observer = new IntersectionObserver(
      (entries) => entries.some((e) => e.isIntersecting) && reveal(),
      { rootMargin: "-80px" },
    );
    observer.observe(el);

    const fallback = setInterval(() => !belowFold() && reveal(), 800);

    return () => {
      observer.disconnect();
      clearInterval(fallback);
    };
  }, []);

  if (reduced) return <div className={className}>{children}</div>;

  const hidden = armed && !revealed;

  return (
    <motion.div
      ref={ref}
      initial={false}
      animate={{ opacity: hidden ? 0 : 1, y: hidden ? y : 0 }}
      transition={{
        duration: hidden ? 0 : 0.8,
        delay: hidden ? 0 : delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
