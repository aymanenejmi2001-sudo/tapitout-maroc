"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import { site } from "@/lib/site";

const ease = [0.22, 1, 0.36, 1] as const;

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  /* Filet de sécurité sur la révélation du nom. L'animation masque le logo
     par le centre ; si le navigateur la démarre sans jamais la faire
     progresser — onglet ouvert en arrière-plan, animations suspendues —
     le logo resterait coupé en deux. Passé trois secondes, on retire la
     classe : le nom de la maison s'affiche, animation ou pas. */
  const [entree, setEntree] = useState(true);
  useEffect(() => {
    const t = setTimeout(() => setEntree(false), 3000);
    return () => clearTimeout(t);
  }, []);

  /* Au scroll, l'image descend légèrement pendant que le titre remonte
     et s'efface : le hero se referme au lieu de simplement défiler. */
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "-40%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section className="px-3 pt-[68px]">
      <div
        ref={ref}
        className="relative h-[calc(100svh-80px)] overflow-hidden rounded"
      >
        <motion.div
          initial={{ scale: 1.12 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.6, ease }}
          style={reduced ? undefined : { y: imageY }}
          className="absolute inset-0"
        >
          <Image
            src="/images/hero.jpg"
            alt="Intérieur habillé par un tapis Tapitout"
            fill
            priority
            sizes="100vw"
            className="scale-110 object-cover"
          />
        </motion.div>

        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/30" />

        <motion.div
          style={reduced ? undefined : { y: contentY, opacity: contentOpacity }}
          className="relative flex h-full flex-col items-center justify-center px-6"
        >
          {/* Sur mobile, le nom touchait presque les deux bords : il est
              ramené à 86 % de la largeur pour lui rendre de l'air. À partir
              de la tablette, il reprend toute la place disponible. */}
          <div className="w-[86%] max-w-[1208px] sm:w-full">
            {/* Le nom est le titre principal de la page : rendu en h1 pour
                que sa structure soit lisible par Google et les lecteurs
                d'écran, même si visuellement c'est le logo qui s'affiche. */}
            <h1 className="m-0">
              <span className="sr-only">
                Tapitout Maroc — tapis sur mesure à Casablanca et partout au
                Maroc
              </span>
              <Image
                src="/images/logo-white.png"
                alt={site.name}
                width={2048}
                height={567}
                priority
                className={`h-auto w-full ${entree ? "logo-entree" : ""}`}
              />
            </h1>
          </div>

          <p className={`mt-8 text-center text-base text-paper sm:text-lg ${entree ? "tagline-entree" : ""}`}>
            {site.tagline}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
