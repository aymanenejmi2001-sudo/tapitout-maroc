import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import Section from "@/components/Section";
import Services from "@/components/Services";
import Stats from "@/components/Stats";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Savoir-faire — Tapitout Maroc",
  description:
    "Prise de mesure, essayage à domicile, façonnage au millimètre, quatre finitions de bordure, livraison et pose partout au Maroc.",
  alternates: { canonical: "/savoir-faire" },
};

/* Les quatre finitions de bordure : l'argument le plus concret de la
   maison, et celui qu'aucune page ne montrait jusqu'ici. */
const finitions = [
  {
    nom: "Couture machine",
    pour: "La régularité",
    texte:
      "Un point continu et parfaitement régulier, qui suit les lignes droites sans jamais dévier. La finition la plus sobre.",
  },
  {
    nom: "Couture manuelle",
    pour: "Les formes complexes",
    texte:
      "La main suit ce que la machine ne peut pas suivre : courbes serrées, angles rentrants, contours découpés.",
  },
  {
    nom: "Résine",
    pour: "Le bord invisible",
    texte:
      "La tranche est scellée sans surépaisseur. Le tapis s'arrête net, sans bordure apparente — le choix des intérieurs épurés.",
  },
  {
    nom: "Galon semi-cuir",
    pour: "Le contour affirmé",
    texte:
      "Une bande qui souligne le pourtour et structure la pièce. Elle habille un grand format et résiste au passage.",
  },
];

export default function SavoirFairePage() {
  return (
    <main id="contenu" className="pt-[68px]">
      {/* Ouverture : le texte, puis une image pleine largeur */}
      <Section spacing="tight" className="pt-14 lg:pt-16">
        <div className="max-w-[820px]">
          <Reveal>
            <p className="eyebrow flex items-center gap-3 text-accent">
              <span aria-hidden className="h-px w-7 bg-accent" />
              SAVOIR-FAIRE
            </p>
          </Reveal>
          <Reveal delay={0.06}>
            <h1 className="mt-6 font-display text-[38px] leading-[1.05] text-ink lg:text-[60px]">
              Six métiers dans une seule maison
            </h1>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="mt-7 max-w-[640px] text-lg leading-[1.6] text-ink/75">
              Du premier relevé chez vous à la dernière finition de bordure,
              chaque étape se fait entre nos mains. Aucune n&apos;est confiée à
              un tiers — c&apos;est ce qui nous permet d&apos;en répondre.
            </p>
          </Reveal>
        </div>
      </Section>

      <Section spacing="none" className="pb-16 lg:pb-24">
        <Reveal>
          <div className="relative aspect-[16/9] overflow-hidden rounded lg:aspect-[21/9]">
            <Image
              src="/images/bespoke-2.jpg"
              alt="Tapis sur mesure posé dans une chambre"
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
          </div>
        </Reveal>
      </Section>

      <Services />

      {/* Les quatre finitions */}
      <Section className="bg-sand">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,380px)_1fr] lg:gap-16">
          <div>
            <Reveal>
              <p className="eyebrow text-accent">LE DÉTAIL QUI SIGNE</p>
              <h2 className="mt-5 font-display text-[30px] leading-[1.1] text-ink lg:text-[42px]">
                Quatre façons de finir un bord
              </h2>
              <p className="mt-6 text-lg leading-[1.6] text-ink/75">
                La bordure est ce que l&apos;œil voit en premier et ce que le
                pied touche en dernier. Nous les maîtrisons toutes les quatre en
                interne, et le choix se fait avec la matière, jamais avant.
              </p>
            </Reveal>
          </div>

          <div className="grid gap-x-10 gap-y-8 sm:grid-cols-2">
            {finitions.map((f, i) => (
              <Reveal key={f.nom} delay={(i % 2) * 0.08}>
                <div className="border-t border-ink/15 pt-5">
                  <p className="text-sm text-accent">{f.pour}</p>
                  <h3 className="mt-2 font-display text-2xl text-ink">
                    {f.nom}
                  </h3>
                  <p className="mt-3 text-base leading-[1.55] text-ink/75">
                    {f.texte}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Section>

      <Stats />

      {/* Conclusion */}
      <Section>
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <div className="relative aspect-[4/3] overflow-hidden rounded">
              <Image
                src="/images/gal-escalier.jpg"
                alt="Habillage d'escalier sur mesure"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="max-w-[500px]">
              <h2 className="font-display text-[30px] leading-[1.1] text-ink lg:text-[42px]">
                Un projet à nous confier ?
              </h2>
              <p className="mt-6 text-lg leading-[1.6] text-ink/75">
                Le relevé se fait chez vous, sur rendez-vous. L&apos;essayage
                des matières aussi — dans la pièce concernée, sous votre
                lumière.
              </p>
              <div className="mt-9 flex flex-wrap gap-3">
                <Link
                  href="/contact"
                  className="rounded bg-accent px-6 py-3.5 text-base font-medium text-paper transition-colors hover:bg-accent-hover"
                >
                  Prendre rendez-vous
                </Link>
                <a
                  href={`https://wa.me/${site.whatsapp}`}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded border border-ink/20 px-6 py-3.5 text-base font-medium text-ink transition-colors hover:bg-surface"
                >
                  Poser une question
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </Section>
    </main>
  );
}
