"use client";

import { useState } from "react";
import Image from "next/image";
import Section from "./Section";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import { process } from "@/lib/site";

/* Les quatre étapes en panneaux qui s'ouvrent.

   La version précédente alignait quatre colonnes de texte identiques — la
   mise en page la plus vue du web, et 1 300 px de hauteur pour quatre
   paragraphes. Ici les étapes occupent un seul écran, côte à côte : le
   panneau survolé s'élargit et livre son texte, les autres se replient sur
   leur titre. On parcourt les quatre en un geste, sans faire défiler.

   Le survol pilote sur ordinateur, le clic sur écran tactile, et le focus
   clavier ouvre le panneau comme le survol — sinon la moitié du contenu
   serait inatteignable sans souris. Sur mobile, les panneaux s'empilent et
   restent tous ouverts : rien n'est jamais caché derrière une interaction
   qu'on ne peut pas faire. */
export default function Process() {
  const [actif, setActif] = useState(0);

  return (
    <Section>
      <SectionHeading
        eyebrow="PROCESSUS · NOTRE MÉTHODE"
        title="Une méthode, pas une formule."
      />

      <Reveal delay={0.1}>
        <div className="mt-12 flex flex-col gap-3 lg:h-[62vh] lg:min-h-[460px] lg:flex-row lg:gap-3">
          {process.map((step, i) => {
            const ouvert = actif === i;
            const [numero, verbe] = step.label.split(" / ");

            return (
              <button
                key={step.label}
                type="button"
                onMouseEnter={() => setActif(i)}
                onFocus={() => setActif(i)}
                onClick={() => setActif(i)}
                aria-expanded={ouvert}
                data-cursor={ouvert ? undefined : "Ouvrir"}
                className={`group relative overflow-hidden rounded bg-ink text-left transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                  ouvert ? "lg:flex-[3.2]" : "lg:flex-[1]"
                }`}
              >
                {/* Les quatre panneaux sont visibles en meme temps : le
                    chargement paresseux n'a aucun sens ici, il ne faisait
                    qu'afficher des rectangles gris. Tout est charge d'entree,
                    a la taille reelle des panneaux plutot qu'en 3840 px. */}
                <Image
                  src={step.image}
                  alt=""
                  fill
                  priority={i === 0}
                  loading={i === 0 ? undefined : "eager"}
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className={`object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
                    ouvert ? "scale-105" : "scale-100"
                  }`}
                />

                {/* Le voile s'éclaircit quand le panneau s'ouvre */}
                <div
                  className={`absolute inset-0 transition-colors duration-700 ${
                    ouvert
                      ? "bg-gradient-to-t from-ink/90 via-ink/55 to-ink/25"
                      : "bg-ink/75"
                  }`}
                />

                <div className="relative flex min-h-[220px] flex-col justify-end p-6 lg:h-full lg:p-8">
                  <p className="flex items-center gap-3 text-sm font-medium text-paper/70">
                    <span aria-hidden className="h-px w-6 bg-accent" />
                    {numero} · {verbe}
                  </p>

                  {/* Titre plus compact tant que le panneau est replié :
                      en pleine taille il débordait de la colonne étroite. */}
                  <h3
                    className={`mt-4 font-display leading-tight text-paper transition-all duration-500 ${
                      ouvert
                        ? "text-[26px] lg:text-[34px]"
                        : "text-[26px] lg:text-[22px]"
                    }`}
                  >
                    {step.title}
                  </h3>

                  {/* Le texte n'existe que dans le panneau ouvert sur grand
                      écran ; sur mobile il reste toujours visible. */}
                  <div
                    className={`grid transition-all duration-700 ease-out lg:grid-rows-[0fr] ${
                      ouvert ? "lg:grid-rows-[1fr] lg:opacity-100" : "lg:opacity-0"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="mt-4 max-w-[420px] text-base leading-[1.55] text-paper/85">
                        {step.body}
                      </p>
                      <p className="mt-5 flex items-center gap-2.5 text-sm font-medium text-paper">
                        <svg
                          viewBox="0 0 20 20"
                          aria-hidden
                          className="h-4 w-4 shrink-0 text-accent"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M4 10.5l4 4 8-9" />
                        </svg>
                        {step.duration}
                      </p>
                    </div>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </Reveal>
    </Section>
  );
}
