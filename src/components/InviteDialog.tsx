"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, useReducedMotion } from "motion/react";
import { invite, site } from "@/lib/site";

const STORAGE_KEY = "tapitout:invite";
const SANS_INVITATION = ["/contact", "/professionnels"];

/* Fenêtre d'invitation à l'essayage à domicile.

   Règles de politesse, qui font toute la différence entre une fenêtre utile
   et une fenêtre détestée :
   — elle n'apparaît jamais à l'arrivée, mais quand le visiteur a montré de
     l'intérêt (45 % de la page lue, 25 s écoulées, ou départ du curseur) ;
   — elle ne s'affiche pas sur la page Contact, où l'on est déjà en train
     de faire la démarche ;
   — une fois fermée, elle se tait pendant deux semaines ;
   — elle se ferme par la croix, par Échap, ou en cliquant à côté ;
   — le clavier reste piégé à l'intérieur tant qu'elle est ouverte, et le
     focus revient à sa place à la fermeture. */
export default function InviteDialog() {
  const pathname = usePathname();
  const reduced = useReducedMotion();
  const [open, setOpen] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const openerRef = useRef<Element | null>(null);

  const dismiss = useCallback(() => {
    setOpen(false);
    try {
      localStorage.setItem(STORAGE_KEY, String(Date.now()));
    } catch {
      /* navigation privée : tant pis, elle se reproposera */
    }
  }, []);

  useEffect(() => {
    /* Ni sur Contact ni sur la page professionnels : dans les deux cas le
       visiteur est déjà en train de faire la démarche, et l'offre d'essayage
       s'adresse aux particuliers. */
    if (!invite.enabled || SANS_INVITATION.includes(pathname)) return;

    try {
      const seen = Number(localStorage.getItem(STORAGE_KEY));
      const jours = (Date.now() - seen) / 86_400_000;
      if (seen && jours < invite.snoozeDays) return;
    } catch {
      /* stockage indisponible : on continue */
    }

    let done = false;
    const show = () => {
      if (done) return;
      done = true;
      openerRef.current = document.activeElement;
      setOpen(true);
      cleanup();
    };

    const onScroll = () => {
      const h = document.body.scrollHeight - window.innerHeight;
      if (h > 0 && (window.scrollY / h) * 100 >= invite.scrollPercent) show();
    };
    const onLeave = (e: MouseEvent) => {
      if (e.clientY <= 0) show();
    };

    const timer = window.setTimeout(show, invite.delaySeconds * 1000);
    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("mouseleave", onLeave);

    function cleanup() {
      window.clearTimeout(timer);
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("mouseleave", onLeave);
    }
    return cleanup;
  }, [pathname]);

  /* Clavier : Échap ferme, Tab tourne en boucle dans la fenêtre. */
  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") return dismiss();
      if (e.key !== "Tab") return;
      const cibles = panelRef.current?.querySelectorAll<HTMLElement>(
        "a[href], button:not([disabled])",
      );
      if (!cibles?.length) return;
      const premier = cibles[0];
      const dernier = cibles[cibles.length - 1];
      if (e.shiftKey && document.activeElement === premier) {
        e.preventDefault();
        dernier.focus();
      } else if (!e.shiftKey && document.activeElement === dernier) {
        e.preventDefault();
        premier.focus();
      }
    };

    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKey);
      (openerRef.current as HTMLElement | null)?.focus?.();
    };
  }, [open, dismiss]);

  const message = encodeURIComponent(
    "Bonjour, je souhaite un essayage de tapis à domicile.",
  );

  if (!open) return null;

  /* Pas d'animation de sortie ni d'AnimatePresence : la fermeture doit etre
     immediate et certaine. Une sortie animee laisserait le panneau a l'ecran
     si les animations sont suspendues — on cliquerait sur la croix sans que
     rien ne disparaisse. */
  return (
    <div className="fixed inset-0 z-[60] flex items-end justify-center p-3 sm:items-center sm:p-6">
      {/* Le voile et le panneau ne partent jamais d'une opacite nulle :
              si les animations ne peuvent pas tourner (onglet en arriere-plan,
              economiseur d'energie), la fenetre resterait invisible tout en
              bloquant le defilement. Seuls le glissement et l'echelle sont
              animes. */}
      <div
        onClick={dismiss}
        className="absolute inset-0 bg-ink/70 backdrop-blur-sm"
      />

      <motion.div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="invite-titre"
        initial={reduced ? false : { y: 40, scale: 0.97 }}
        animate={{ y: 0, scale: 1 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-full max-w-[880px] overflow-hidden rounded-lg bg-paper shadow-2xl"
      >
        <button
          ref={closeRef}
          type="button"
          onClick={dismiss}
          aria-label="Fermer"
          className="absolute right-3 top-3 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-paper/90 text-ink transition-colors hover:bg-surface sm:right-4 sm:top-4"
        >
          <svg
            viewBox="0 0 20 20"
            aria-hidden
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
          >
            <path d="M5 5l10 10M15 5L5 15" />
          </svg>
        </button>

        <div className="grid sm:grid-cols-[1fr_1.15fr]">
          <div className="relative hidden min-h-[260px] sm:block">
            <Image
              src={invite.image}
              alt=""
              fill
              sizes="(max-width: 640px) 0px, 40vw"
              className="object-cover"
            />
          </div>

          <div className="p-7 sm:p-10">
            <p className="eyebrow text-accent">{invite.eyebrow}</p>
            <h2
              id="invite-titre"
              className="mt-4 font-display text-[26px] leading-[1.15] text-ink sm:text-[32px]"
            >
              {invite.title}
            </h2>
            <p className="mt-4 text-base leading-[1.5] text-ink/75">
              {invite.body}
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href={`https://wa.me/${site.whatsapp}?text=${message}`}
                target="_blank"
                rel="noreferrer"
                onClick={dismiss}
                className="rounded bg-accent px-6 py-3.5 text-center text-base font-medium text-paper transition-colors hover:bg-accent-hover"
              >
                {invite.primary}
              </a>
              <Link
                href="/collections"
                onClick={dismiss}
                className="rounded border border-ink/20 px-6 py-3.5 text-center text-base font-medium text-ink transition-colors hover:bg-surface"
              >
                {invite.secondary}
              </Link>
            </div>

            <p className="mt-5 text-sm text-ink/50">
              Déplacement sur rendez-vous · Casablanca et partout au Maroc
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
