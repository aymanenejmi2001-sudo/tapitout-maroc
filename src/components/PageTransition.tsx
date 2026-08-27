"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useReducedMotion } from "motion/react";

type Phase = "repos" | "couvre" | "decouvre";

const DUREE = 480; // doit rester synchronisé avec la transition CSS
const SECURITE = 2500; // au-delà, on retire le voile quoi qu'il arrive

/* Transition entre les pages : un voile ivoire monte, couvre l'écran le
   temps du changement de page, puis poursuit sa course vers le haut. Le
   mouvement va toujours dans le même sens, comme un rideau — c'est ce qui
   donne la continuité, plutôt qu'un fondu qui clignote.

   Trois garde-fous, parce qu'un voile plein écran qui reste bloqué rend le
   site inutilisable :
   — le mouvement est fait en CSS, pas en JavaScript animé : si les
     transitions ne tournent pas, le voile saute d'un état à l'autre au lieu
     de se figer à mi-course ;
   — une minuterie de sécurité le retire au bout de 2,5 s quoi qu'il arrive ;
   — il ne se déclenche pas du tout si le visiteur a demandé à réduire les
     animations, et laisse passer tous les clics inhabituels (nouvel onglet,
     lien externe, ancre, téléphone). */
export default function PageTransition() {
  const [phase, setPhase] = useState<Phase>("repos");
  const router = useRouter();
  const pathname = usePathname();
  const reduced = useReducedMotion();
  const cible = useRef<string | null>(null);
  const minuteries = useRef<number[]>([]);

  const nettoie = useCallback(() => {
    minuteries.current.forEach(clearTimeout);
    minuteries.current = [];
  }, []);

  const plusTard = useCallback((fn: () => void, ms: number) => {
    minuteries.current.push(window.setTimeout(fn, ms));
  }, []);

  /* Interception des clics sur les liens internes */
  useEffect(() => {
    if (reduced) return;

    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0) return;
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;

      const lien = (e.target as HTMLElement)?.closest?.("a");
      if (!lien) return;

      const href = lien.getAttribute("href");
      if (!href || !href.startsWith("/")) return; // externe, ancre, mailto, tel
      if (lien.target === "_blank" || lien.hasAttribute("download")) return;
      if (href === pathname) return; // déjà sur la page

      e.preventDefault();
      cible.current = href;
      setPhase("couvre");

      plusTard(() => {
        router.push(href);
      }, DUREE);

      /* Filet : si la navigation échoue ou traîne, on découvre quand même. */
      plusTard(() => {
        cible.current = null;
        setPhase("decouvre");
        plusTard(() => setPhase("repos"), DUREE);
      }, SECURITE);
    };

    /* Phase de capture : il faut passer AVANT le gestionnaire de Next,
       sinon la navigation part et le voile ne sert plus a rien. */
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, [pathname, router, reduced, plusTard]);

  /* La nouvelle page est montée : on retire le voile et on repart du haut. */
  useEffect(() => {
    if (cible.current === null) return;
    cible.current = null;
    nettoie();
    window.scrollTo({ top: 0, behavior: "instant" });
    setPhase("decouvre");
    plusTard(() => setPhase("repos"), DUREE);
  }, [pathname, nettoie, plusTard]);

  useEffect(() => nettoie, [nettoie]);

  if (reduced) return null;

  const position =
    phase === "couvre"
      ? "translate-y-0"
      : phase === "decouvre"
        ? "-translate-y-full"
        : "translate-y-full";

  return (
    <div
      aria-hidden
      className={`pointer-events-none fixed inset-0 z-[90] flex items-center justify-center bg-paper ${position} ${
        phase === "repos" ? "duration-0" : "duration-[480ms]"
      } transition-transform ease-[cubic-bezier(0.76,0,0.24,1)]`}
    >
      <Image
        src="/images/logo-red.png"
        alt=""
        width={1024}
        height={283}
        priority
        className={`h-7 w-auto transition-opacity duration-300 ${
          phase === "couvre" ? "opacity-100" : "opacity-0"
        }`}
      />
    </div>
  );
}
