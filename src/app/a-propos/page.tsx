import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import Section from "@/components/Section";
import { about } from "@/lib/site";
import JsonLd from "@/components/JsonLd";
import { filAriane, pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  titre: "L'atelier Tapitout — tapis sur mesure à Casablanca",
  description:
    "Un atelier, pas un revendeur : chaque tapis Tapitout est relevé chez vous, taillé à vos dimensions et fini dans notre atelier de Casablanca.",
  chemin: "/a-propos",
});

export default function AProposPage() {
  return (
    <main id="contenu" className="pt-[68px]">
      <JsonLd data={filAriane([{ nom: "Accueil", chemin: "/" }, { nom: "À propos", chemin: "/a-propos" }])} />
      {/* Hero : texte à gauche, image à droite */}
      <section className="px-3">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-6">
          <div className="flex flex-col justify-center px-6 py-12 lg:py-24">
            <Reveal>
              <p className="eyebrow text-accent">{about.eyebrow}</p>
            </Reveal>
            <Reveal delay={0.06}>
              <h1 className="mt-6 max-w-[531px] font-display text-[38px] leading-[1.1] text-ink lg:text-[60px]">
                {about.title}
              </h1>
            </Reveal>
            <Reveal delay={0.12}>
              <p className="mt-8 max-w-[531px] text-lg leading-[1.4] text-ink/75">
                {about.intro}
              </p>
            </Reveal>
          </div>

          <Reveal delay={0.1}>
            <div className="relative aspect-[631/900] overflow-hidden rounded">
              <Image
                src={about.image}
                alt={about.imageAlt}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Manifeste centré */}
      <Section className="text-center">
        <Reveal>
          <h2 className="mx-auto max-w-[700px] font-display text-[34px] leading-[1.1] text-ink lg:text-[60px]">
            {about.manifestoTitle}
          </h2>
        </Reveal>
        <Reveal delay={0.08}>
          <p className="mx-auto mt-8 max-w-[500px] text-lg leading-[1.4] text-ink/75">
            {about.manifestoBody}
          </p>
        </Reveal>
      </Section>

      {/* Trois valeurs */}
      <Section>
        <div className="grid gap-12 lg:grid-cols-3">
          {about.values.map((value, i) => (
            <Reveal key={i} delay={i * 0.08}>
              <div className="max-w-[383px]">
                <Image
                  src={value.icon}
                  alt=""
                  width={50}
                  height={50}
                  className="h-[50px] w-auto"
                />
                <h3 className="mt-8 font-display text-2xl text-ink">
                  {value.title}
                </h3>
                <p className="mt-3 text-lg leading-[1.4] text-ink/75">
                  {value.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Équipe */}
      <Section>
        <Reveal>
          <p className="eyebrow text-accent">{about.teamEyebrow}</p>
        </Reveal>

        <div className="mt-4 flex flex-wrap items-end justify-between gap-6">
          <Reveal delay={0.06}>
            <h2 className="font-display text-[34px] leading-[1.05] text-ink lg:text-[60px]">
              {about.teamTitle}
            </h2>
          </Reveal>
          <Reveal delay={0.12}>
            <Link
              href="/contact"
              className="group inline-flex items-center gap-2.5 rounded border border-ink/20 px-6 py-3.5 text-base font-medium text-ink transition-colors hover:border-ink hover:bg-ink hover:text-paper"
            >
              Travaillons ensemble
              <span
                aria-hidden
                className="transition-transform duration-300 group-hover:translate-x-1"
              >
                →
              </span>
            </Link>
          </Reveal>
        </div>

        {/* Deux portraits, donc deux colonnes — et une largeur bornée. Une
            grille de quatre colonnes pour deux personnes laissait la moitié
            de la ligne vide, exactement le défaut qu'on vient de corriger
            sur la bande des chiffres. Le cadre reprend le 3/4 des photos :
            aucun recadrage, aucun visage rogné. */}
        <div className="mt-12 grid max-w-[900px] gap-6 sm:grid-cols-2 lg:mt-14">
          {about.team.map((member, i) => (
            <Reveal key={i} delay={i * 0.08}>
              <figure className="group m-0">
                <div className="relative aspect-[3/4] overflow-hidden rounded bg-surface">
                  {member.photo ? (
                    <Image
                      src={member.photo}
                      alt={`${member.name}, ${member.role.toLowerCase()} de Tapitout`}
                      fill
                      sizes="(max-width: 640px) 100vw, 450px"
                      className="object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
                    />
                  ) : (
                    <span className="absolute inset-0 flex items-center justify-center px-4 text-center text-sm text-ink/40">
                      Photo à ajouter
                    </span>
                  )}
                </div>

                <figcaption className="mt-5 flex items-baseline justify-between gap-4 border-t border-ink/15 pt-4">
                  <h3 className="font-display text-[22px] leading-none text-ink">
                    {member.name}
                  </h3>
                  <p className="eyebrow text-accent">{member.role}</p>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </Section>
    </main>
  );
}
