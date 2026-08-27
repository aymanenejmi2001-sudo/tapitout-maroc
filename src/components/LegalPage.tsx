import type { ReactNode } from "react";
import Section from "./Section";

/* Gabarit commun aux pages légales : une colonne de lecture étroite,
   une hiérarchie simple, et un style visible pour les passages qu'il
   reste à compléter (.todo) afin qu'aucun ne parte en ligne par oubli. */
export default function LegalPage({
  title,
  updated,
  children,
}: {
  title: string;
  updated: string;
  children: ReactNode;
}) {
  return (
    <main className="pt-[68px]">
      <Section>
        <h1 className="font-display text-[38px] leading-[1.05] text-ink lg:text-[52px]">
          {title}
        </h1>
        <p className="mt-4 text-sm text-ink/60">Mise à jour : {updated}</p>

        <div className="legal mt-12 max-w-[720px] text-base leading-[1.6] text-ink/80">
          {children}
        </div>
      </Section>
    </main>
  );
}
