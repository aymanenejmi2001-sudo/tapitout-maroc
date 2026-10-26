import Image from "next/image";
import Reveal from "@/components/Reveal";
import Section from "@/components/Section";
import TradeForm from "@/components/TradeForm";
import { sansRappels } from "@/lib/text";
import { site, trade } from "@/lib/site";
import JsonLd from "@/components/JsonLd";
import { filAriane, pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  titre: "Programme professionnels — tapis sur mesure | Tapitout Maroc",
  description:
    "Programme professionnels Tapitout : architectes d'intérieur, décorateurs, hôtellerie, promoteurs. Tapis sur mesure, relevé sur site et pose partout au Maroc.",
  chemin: "/professionnels",
});

/* Une image par public : un décorateur et un hôtelier ne se projettent pas
   dans la même pièce. */
const visuels = [
  "/images/bespoke-3.jpg",
  "/images/bespoke-5.jpg",
  "/images/bespoke-4.jpg",
  "/images/gal-forme-libre.jpg",
];

export default function ProfessionnelsPage() {
  const message = encodeURIComponent(
    "Bonjour, je suis un professionnel et souhaite des renseignements sur votre programme.",
  );

  return (
    <main id="contenu" className="pt-[68px]">
      <JsonLd data={filAriane([{ nom: "Accueil", chemin: "/" }, { nom: "Professionnels", chemin: "/professionnels" }])} />
      {/* Ouverture : le texte posé sur une image plein cadre */}
      <section className="px-6 lg:px-9">
        <div className="mx-auto w-full max-w-[1440px]">
          <div className="relative overflow-hidden rounded">
            <div className="relative aspect-[4/5] sm:aspect-[16/10] lg:aspect-[16/7]">
              <Image
                src="/images/bespoke-1.jpg"
                alt="Grand salon habillé d'un tapis sur mesure"
                fill
                priority
                sizes="100vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/45 to-ink/10" />
            </div>

            <div className="absolute inset-x-0 bottom-0 p-7 sm:p-10 lg:p-14">
              <div className="max-w-[720px]">
                <Reveal>
                  <p className="eyebrow flex items-center gap-3 text-paper/85">
                    <span aria-hidden className="h-px w-7 bg-accent" />
                    {trade.eyebrow}
                  </p>
                </Reveal>
                <Reveal delay={0.06}>
                  <h1 className="mt-5 font-display text-[32px] leading-[1.05] text-paper lg:text-[54px]">
                    {trade.title}
                  </h1>
                </Reveal>
                <Reveal delay={0.12}>
                  <p className="mt-5 max-w-[560px] text-base leading-[1.6] text-paper/85 lg:text-lg">
                    {trade.intro}
                  </p>
                </Reveal>
                <Reveal delay={0.18}>
                  <div className="mt-8 flex flex-wrap gap-3">
                    <a
                      href="#candidature"
                      className="rounded bg-accent px-6 py-3.5 text-base font-medium text-paper transition-colors hover:bg-accent-hover"
                    >
                      Ouvrir un compte professionnel
                    </a>
                    <a
                      href={`https://wa.me/${site.whatsapp}?text=${message}`}
                      target="_blank"
                      rel="noreferrer"
                      className="rounded border border-white/35 px-6 py-3.5 text-base font-medium text-paper transition-colors hover:bg-white/10"
                    >
                      Parler à un interlocuteur
                    </a>
                  </div>
                </Reveal>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* À qui il s'adresse — chaque public avec son image */}
      <Section>
        <Reveal>
          <h2 className="font-display text-[30px] leading-tight text-ink lg:text-[42px]">
            À qui il s&apos;adresse
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {trade.audiences.map((a, i) => (
            <Reveal key={a.titre} delay={(i % 4) * 0.07}>
              <div className="group">
                <div className="relative aspect-[3/4] overflow-hidden rounded">
                  <Image
                    src={visuels[i] ?? visuels[0]}
                    alt=""
                    fill
                    sizes="(max-width: 640px) 100vw, 25vw"
                    className="object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.05]"
                  />
                </div>
                <h3 className="mt-5 font-display text-xl text-ink">
                  {a.titre}
                </h3>
                <p className="mt-2.5 text-base leading-[1.55] text-ink/75">
                  {a.texte}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Ce que le programme apporte */}
      <Section className="bg-sand">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,360px)_1fr] lg:gap-16">
          <Reveal>
            <div>
              <p className="eyebrow text-accent">LE PROGRAMME</p>
              <h2 className="mt-5 font-display text-[30px] leading-[1.1] text-ink lg:text-[42px]">
                Ce que vous y gagnez
              </h2>
            </div>
          </Reveal>

          {/* Cartes plutot que lignes separees par des filets : sur fond
              sable, le blanc detache chaque avantage et rattrape le
              desequilibre des deux premiers, dont les conditions ne sont pas
              encore ecrites. */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {trade.avantages.map((a, i) => {
              const texte = sansRappels(a.texte);
              return (
                <Reveal key={a.titre} delay={(i % 3) * 0.07} className="h-full">
                  <div className="group flex h-full flex-col rounded bg-paper p-7 transition-shadow duration-500 hover:shadow-lg">
                    <span
                      aria-hidden
                      className="font-display text-[34px] leading-none text-accent/25 transition-colors duration-500 group-hover:text-accent/60"
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>

                    <h3 className="mt-6 font-display text-[22px] leading-tight text-ink">
                      {a.titre}
                    </h3>

                    {/* Sans texte redige, la carte annonce quand l'information
                        arrive plutot que de laisser un blanc. */}
                    <p
                      className={`mt-3 text-[15px] leading-[1.6] ${
                        texte ? "text-ink/75" : "text-ink/45"
                      }`}
                    >
                      {texte ||
                        "Conditions communiquées à l'ouverture de votre compte."}
                    </p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </Section>

      {/* Comment ça marche */}
      <Section>
        <Reveal>
          <h2 className="font-display text-[30px] leading-tight text-ink lg:text-[42px]">
            Comment ça marche
          </h2>
        </Reveal>
        <ol className="mt-12 grid gap-x-8 gap-y-10 sm:grid-cols-3">
          {trade.etapes.map((e, i) => {
            const texte = sansRappels(e.texte);
            return (
              <Reveal key={e.titre} delay={i * 0.08}>
                <li className="flex flex-col border-t border-ink/15 pt-6">
                  <span className="font-display text-[42px] leading-none text-accent/25">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-5 font-display text-xl text-ink">
                    {e.titre}
                  </h3>
                  {texte && (
                    <p className="mt-2.5 text-base leading-[1.55] text-ink/75">
                      {texte}
                    </p>
                  )}
                </li>
              </Reveal>
            );
          })}
        </ol>
      </Section>

      {/* Candidature */}
      <Section id="candidature" className="bg-ink text-paper">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.15fr] lg:gap-20">
          <div>
            <Reveal>
              <p className="eyebrow text-accent">CANDIDATURE</p>
              <h2 className="mt-5 font-display text-[30px] leading-[1.1] text-paper lg:text-[42px]">
                Ouvrir un compte professionnel
              </h2>
              <p className="mt-6 max-w-[420px] text-lg leading-[1.6] text-paper/75">
                Présentez-nous votre activité. Nous revenons vers vous avec les
                conditions applicables à votre profession.
              </p>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="mt-10 space-y-3 border-t border-white/15 pt-8 text-base text-paper/75">
                <p>
                  Un chantier en cours ?{" "}
                  <a
                    href={`https://wa.me/${site.whatsapp}?text=${message}`}
                    target="_blank"
                    rel="noreferrer"
                    className="font-medium text-paper underline underline-offset-4"
                  >
                    Écrivez-nous sur WhatsApp
                  </a>
                </p>
                <p>
                  <a
                    href={`tel:${site.phoneIntl}`}
                    className="inline-block py-1.5 underline-offset-4 hover:underline"
                  >
                    {site.phone}
                  </a>
                </p>
              </div>
            </Reveal>
          </div>

          {/* Le formulaire garde un fond clair : un champ sombre sur fond
              sombre décourage avant même la première frappe. */}
          <Reveal delay={0.14}>
            <div className="rounded bg-paper p-6 text-ink sm:p-8">
              <TradeForm />
            </div>
          </Reveal>
        </div>
      </Section>
    </main>
  );
}
