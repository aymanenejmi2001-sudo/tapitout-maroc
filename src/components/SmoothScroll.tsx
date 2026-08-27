"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { useReducedMotion } from "motion/react";

/* Défilement adouci : la page suit la molette avec un peu d'inertie au lieu
   de sauter d'un cran à l'autre. C'est ce glissement qui donne la sensation
   d'un site posé plutôt que d'un document.

   Trois précautions :
   — rien du tout si le visiteur a demandé à réduire les animations, ou s'il
     navigue au doigt : le défilement tactile du téléphone est déjà fluide et
     le détourner le rendrait poisseux ;
   — la bibliothèque est désinstallée proprement au démontage, sinon le
     défilement resterait détourné après un changement de page ;
   — en cas d'échec, on ne fait rien : le défilement natif reprend la main
     plutôt que de laisser une page bloquée. */
export default function SmoothScroll() {
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    let lenis: Lenis | null = null;
    let raf = 0;

    try {
      lenis = new Lenis({
        /* Plus la valeur est haute, plus la page « glisse » longtemps.
           1.15 s donne une course douce sans donner l'impression que le
           site répond avec retard. */
        duration: 1.15,
        easing: (t: number) => 1 - Math.pow(1 - t, 3),
        smoothWheel: true,
        touchMultiplier: 1.6,
      });

      const boucle = (temps: number) => {
        lenis?.raf(temps);
        raf = requestAnimationFrame(boucle);
      };
      raf = requestAnimationFrame(boucle);
    } catch {
      /* Le défilement natif reste opérationnel : rien à réparer. */
      return;
    }

    return () => {
      cancelAnimationFrame(raf);
      lenis?.destroy();
    };
  }, [reduced]);

  return null;
}
