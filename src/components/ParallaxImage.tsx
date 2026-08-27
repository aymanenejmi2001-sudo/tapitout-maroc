"use client";

import Image from "next/image";
import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";

type Props = {
  src: string;
  alt: string;
  sizes: string;
  className?: string;
  /* Amplitude du décalage, en % de la hauteur de l'image. */
  amount?: number;
  priority?: boolean;
};

/* L'image glisse un peu plus lentement que la page : le cadre gagne en
   profondeur sans que le mouvement se remarque. L'image déborde en haut
   et en bas pour ne jamais laisser apparaître de vide. */
export default function ParallaxImage({
  src,
  alt,
  sizes,
  className = "",
  amount = 8,
  priority,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    [`-${amount}%`, `${amount}%`],
  );

  const overflow = reduced ? 0 : amount;

  return (
    <div ref={ref} className="absolute inset-0 overflow-hidden">
      <motion.div
        className="absolute inset-x-0"
        style={{
          top: `-${overflow}%`,
          bottom: `-${overflow}%`,
          ...(reduced ? {} : { y }),
        }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          className={`object-cover ${className}`}
        />
      </motion.div>
    </div>
  );
}
