"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "motion/react";

/* La page d'accueil fait plus de 11 000 pixels de haut : arrivé en bas, on
   n'a aucun moyen de remonter sans faire défiler tout le chemin inverse.
   Le bouton apparaît après deux écrans et se place au-dessus du bouton
   WhatsApp, jamais devant. */
export default function BackToTop() {
  const [visible, setVisible] = useState(false);
  const reduced = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 2);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      type="button"
      onClick={() =>
        window.scrollTo({ top: 0, behavior: reduced ? "auto" : "smooth" })
      }
      aria-label="Revenir en haut de la page"
      className="fixed bottom-[84px] right-5 z-40 flex h-11 w-11 items-center justify-center rounded-full border border-black/10 bg-paper text-ink shadow-lg transition-colors hover:bg-ink hover:text-paper sm:bottom-[96px] sm:right-8"
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
        <path d="M10 16V5M5 10l5-5 5 5" />
      </svg>
    </button>
  );
}
