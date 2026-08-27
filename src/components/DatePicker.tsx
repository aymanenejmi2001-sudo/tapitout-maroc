"use client";

import { useEffect, useRef, useState } from "react";

const JOURS = ["L", "M", "M", "J", "V", "S", "D"];

const moisAnnee = new Intl.DateTimeFormat("fr-FR", {
  month: "long",
  year: "numeric",
});
const dateLongue = new Intl.DateTimeFormat("fr-FR", {
  weekday: "long",
  day: "numeric",
  month: "long",
  year: "numeric",
});

const memeJour = (a: Date, b: Date) =>
  a.getFullYear() === b.getFullYear() &&
  a.getMonth() === b.getMonth() &&
  a.getDate() === b.getDate();

/* Calendrier de prise de rendez-vous.

   Un champ « date » natif change d'aspect à chaque navigateur et reste
   austère sur ordinateur ; celui-ci suit la charte du site et affiche la
   date choisie en toutes lettres, pour qu'il n'y ait aucun doute sur le
   jour retenu.

   Les jours passés ne sont pas sélectionnables. La valeur part dans le
   formulaire via un champ caché, au format ISO d'un côté et en français
   dans le message envoyé de l'autre. */
export default function DatePicker({
  name,
  label,
}: {
  name: string;
  label: string;
}) {
  const aujourdhui = new Date();
  aujourdhui.setHours(0, 0, 0, 0);

  const [ouvert, setOuvert] = useState(false);
  const [mois, setMois] = useState(
    new Date(aujourdhui.getFullYear(), aujourdhui.getMonth(), 1),
  );
  const [choisie, setChoisie] = useState<Date | null>(null);
  const zone = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ouvert) return;
    const dehors = (e: MouseEvent) => {
      if (!zone.current?.contains(e.target as Node)) setOuvert(false);
    };
    const echap = (e: KeyboardEvent) => e.key === "Escape" && setOuvert(false);
    document.addEventListener("mousedown", dehors);
    document.addEventListener("keydown", echap);
    return () => {
      document.removeEventListener("mousedown", dehors);
      document.removeEventListener("keydown", echap);
    };
  }, [ouvert]);

  /* Grille du mois, commencée un lundi */
  const premier = new Date(mois.getFullYear(), mois.getMonth(), 1);
  const decalage = (premier.getDay() + 6) % 7;
  const nbJours = new Date(
    mois.getFullYear(),
    mois.getMonth() + 1,
    0,
  ).getDate();
  const cases: (Date | null)[] = [
    ...Array(decalage).fill(null),
    ...Array.from(
      { length: nbJours },
      (_, i) => new Date(mois.getFullYear(), mois.getMonth(), i + 1),
    ),
  ];

  const moisPrecedentPossible =
    mois.getFullYear() > aujourdhui.getFullYear() ||
    (mois.getFullYear() === aujourdhui.getFullYear() &&
      mois.getMonth() > aujourdhui.getMonth());

  const decaleMois = (n: number) =>
    setMois(new Date(mois.getFullYear(), mois.getMonth() + n, 1));

  return (
    <div ref={zone} className="relative">
      <span className="text-sm text-ink/75">{label}</span>

      {/* La valeur transmise au formulaire, en clair dans le message */}
      <input
        type="hidden"
        name={name}
        value={choisie ? dateLongue.format(choisie) : ""}
      />

      <button
        type="button"
        onClick={() => setOuvert((v) => !v)}
        aria-expanded={ouvert}
        aria-haspopup="dialog"
        className="mt-2 flex w-full items-center justify-between rounded border border-black/15 bg-paper px-4 py-3.5 text-left text-base text-ink transition-colors hover:border-black/30 focus:border-accent focus:outline-none"
      >
        <span className={choisie ? "text-ink" : "text-ink/40"}>
          {choisie ? dateLongue.format(choisie) : "Choisir une date"}
        </span>
        <svg
          viewBox="0 0 20 20"
          aria-hidden
          className="h-4 w-4 shrink-0 text-ink/50"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
        >
          <rect x="3" y="4.5" width="14" height="13" rx="2" />
          <path d="M3 8.5h14M7 2.5v3M13 2.5v3" />
        </svg>
      </button>

      {ouvert && (
        <div
          role="dialog"
          aria-label="Choisir une date"
          className="absolute left-0 right-0 top-full z-30 mt-2 rounded border border-black/10 bg-paper p-4 shadow-xl"
        >
          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={() => decaleMois(-1)}
              disabled={!moisPrecedentPossible}
              aria-label="Mois précédent"
              className="flex h-9 w-9 items-center justify-center rounded-full text-ink transition-colors hover:bg-surface disabled:opacity-25"
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
                <path d="M12 4l-6 6 6 6" />
              </svg>
            </button>

            <p className="text-base capitalize text-ink" aria-live="polite">
              {moisAnnee.format(mois)}
            </p>

            <button
              type="button"
              onClick={() => decaleMois(1)}
              aria-label="Mois suivant"
              className="flex h-9 w-9 items-center justify-center rounded-full text-ink transition-colors hover:bg-surface"
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
                <path d="M8 4l6 6-6 6" />
              </svg>
            </button>
          </div>

          <div className="mt-4 grid grid-cols-7 gap-1 text-center">
            {JOURS.map((j, i) => (
              <span key={i} className="py-1 text-xs text-ink/40">
                {j}
              </span>
            ))}

            {cases.map((jour, i) => {
              if (!jour) return <span key={i} />;
              const passe = jour < aujourdhui;
              const actif = choisie && memeJour(jour, choisie);
              const cejour = memeJour(jour, aujourdhui);

              return (
                <button
                  key={i}
                  type="button"
                  disabled={passe}
                  aria-pressed={!!actif}
                  onClick={() => {
                    setChoisie(jour);
                    setOuvert(false);
                  }}
                  className={`flex h-9 items-center justify-center rounded text-sm transition-colors ${
                    actif
                      ? "bg-accent text-paper"
                      : passe
                        ? "cursor-not-allowed text-ink/20"
                        : cejour
                          ? "border border-accent/40 text-ink hover:bg-surface"
                          : "text-ink hover:bg-surface"
                  }`}
                >
                  {jour.getDate()}
                </button>
              );
            })}
          </div>

          <div className="mt-4 flex items-center justify-between border-t border-black/10 pt-3">
            <button
              type="button"
              onClick={() => {
                setChoisie(null);
                setOuvert(false);
              }}
              className="text-sm text-ink/60 underline-offset-4 hover:text-accent hover:underline"
            >
              Effacer
            </button>
            <p className="text-xs text-ink/50">
              Nous confirmons le créneau par téléphone
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
