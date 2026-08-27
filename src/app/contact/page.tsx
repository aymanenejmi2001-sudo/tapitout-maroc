import { Suspense } from "react";
import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";
import Reveal from "@/components/Reveal";
import Section from "@/components/Section";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact — Tapitout Maroc",
  description:
    "Prenez rendez-vous pour un relevé sur place. Tapitout, tapis sur mesure à Casablanca et partout au Maroc.",
};

export default function ContactPage() {
  return (
    <main id="contenu" className="pt-[68px]">
      <Section>
        <Reveal>
          <p className="eyebrow text-accent">COMMENÇONS UNE CONVERSATION</p>
        </Reveal>
        <Reveal delay={0.06}>
          <h1 className="mt-5 max-w-[900px] font-display text-[38px] leading-[1.05] text-ink lg:text-[60px]">
            Créons quelque chose de durable.
          </h1>
        </Reveal>

        <div className="mt-16 grid gap-16 lg:grid-cols-[1.2fr_1fr] lg:gap-24">
          <div>
            <Reveal delay={0.1}>
              <h2 className="font-display text-2xl text-ink">
                Prenons contact
              </h2>
            </Reveal>
            <Reveal delay={0.14}>
              <div className="mt-8">
                <Suspense fallback={null}>
                  <ContactForm />
                </Suspense>
              </div>
            </Reveal>
            <Reveal delay={0.18}>
              <p className="mt-8 text-base text-ink/75">
                Vous préférez l&apos;e-mail ? Écrivez à{" "}
                <a
                  href={`mailto:${site.email}`}
                  className="text-ink underline underline-offset-4"
                >
                  {site.email}
                </a>
              </p>
            </Reveal>
          </div>

          <div>
            <Reveal delay={0.12}>
              <p className="eyebrow text-accent">CONTACTEZ-NOUS DIRECTEMENT</p>
              <h2 className="mt-5 font-display text-[28px] leading-tight text-ink lg:text-[34px]">
                Autres moyens de contact
              </h2>
            </Reveal>

            <Reveal delay={0.18}>
              <div className="mt-10 space-y-8">
                <div className="border-t border-black/10 pt-6">
                  <p className="text-sm text-ink/50">Adresse</p>
                  <p className="mt-2 text-lg text-ink">{site.address}</p>
                  <a
                    href={site.mapsUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-2 inline-block py-2 text-base font-medium text-accent underline-offset-4 hover:underline"
                  >
                    Voir l&apos;itinéraire →
                  </a>
                </div>

                <div className="border-t border-black/10 pt-6">
                  <p className="text-sm text-ink/50">Horaires</p>
                  {site.hours.length > 0 ? (
                    <dl className="mt-2 space-y-1.5">
                      {site.hours.map((h) => (
                        <div
                          key={h.days}
                          className="flex justify-between gap-6"
                        >
                          <dt className="text-lg text-ink">{h.days}</dt>
                          <dd className="text-lg text-ink/70">{h.time}</dd>
                        </div>
                      ))}
                    </dl>
                  ) : (
                    /* Tant que les horaires du magasin ne sont pas renseignés,
                       on affiche ce qui est vrai dans tous les cas plutôt
                       qu'un horaire approximatif. */
                    <p className="mt-2 text-lg text-ink">
                      Sur rendez-vous — relevé et essayage à domicile
                    </p>
                  )}
                </div>

                <div className="border-t border-black/10 pt-6">
                  <p className="text-sm text-ink/50">Contact</p>
                  <p className="mt-2 text-lg">
                    <a
                      href={`mailto:${site.email}`}
                      className="inline-block py-1.5 text-ink transition-opacity hover:opacity-70"
                    >
                      {site.email}
                    </a>
                  </p>
                  <p className="mt-1 text-lg">
                    <a
                      href={`tel:${site.phoneIntl}`}
                      className="inline-block py-1.5 text-ink transition-opacity hover:opacity-70"
                    >
                      {site.phone}
                    </a>
                  </p>

                  <div className="mt-5 flex flex-wrap gap-3">
                    <a
                      href={`tel:${site.phoneIntl}`}
                      className="rounded border border-black/15 px-5 py-3 text-sm font-medium text-ink transition-colors hover:bg-surface"
                    >
                      Appeler
                    </a>
                    <a
                      href={`https://wa.me/${site.whatsapp}`}
                      target="_blank"
                      rel="noreferrer"
                      className="rounded bg-[#25D366] px-5 py-3 text-sm font-medium text-white transition-opacity hover:opacity-90"
                    >
                      WhatsApp
                    </a>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </Section>
    </main>
  );
}
