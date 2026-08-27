import Link from "next/link";
import Section from "./Section";
import Reveal from "./Reveal";
import TextReveal from "./TextReveal";

/* Manifeste : une déclaration centrée, en colonne étroite, sans image.
   Le schéma « titre à gauche / texte à droite » du template d'origine
   étalait 45 mots sur toute la largeur et laissait deux grandes zones
   vides — c'est ce qui faisait « site standard ». */
export default function About() {
  return (
    <Section>
      <div className="mx-auto max-w-[760px] text-center">
        <TextReveal
          as="h2"
          className="block font-display text-[32px] leading-[1.1] text-ink lg:text-[60px]"
        >
          Nous répondons de chaque pièce qui porte notre nom
        </TextReveal>

        <Reveal delay={0.08}>
          <p className="mx-auto mt-8 max-w-[640px] text-lg leading-[1.6] text-ink/75">
            Le relevé est exécuté sur place, la matière choisie selon
            l&apos;usage réel du lieu, la taille arrêtée au millimètre, la
            bordure contrôlée pièce à pièce. Aucune étape n&apos;est confiée à
            un tiers.
          </p>
        </Reveal>

        <Reveal delay={0.14}>
          <p className="mx-auto mt-5 max-w-[640px] text-lg leading-[1.6] text-ink/75">
            C&apos;est la seule manière que nous connaissions d&apos;engager une
            maison : en restant présents du premier relevé à la dernière
            finition.
          </p>
        </Reveal>

        <Reveal delay={0.2}>
          <div className="mt-10 flex flex-col items-center">
            <span aria-hidden className="h-px w-10 bg-accent" />
            <p className="mt-5 text-xl tracking-[-0.6px] text-ink">
              Firaz &amp; Badie
            </p>
            <p className="mt-1 text-sm text-ink/60">DIRECTION</p>
          </div>
        </Reveal>
      </div>

      <Reveal delay={0.26}>
        <div className="mt-12 text-center">
          <Link
            href="/collections"
            className="group inline-flex items-center gap-2.5 rounded border border-ink/20 px-6 py-3.5 text-base font-medium text-ink transition-colors hover:border-ink hover:bg-ink hover:text-paper"
          >
            Voir nos collections
            <span
              aria-hidden
              className="transition-transform duration-300 group-hover:translate-x-1"
            >
              →
            </span>
          </Link>
        </div>
      </Reveal>
    </Section>
  );
}
