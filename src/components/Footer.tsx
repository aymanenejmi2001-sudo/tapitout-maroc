import Image from "next/image";
import Link from "next/link";
import Newsletter from "./Newsletter";
import Reveal from "./Reveal";
import { socialIcons } from "./SocialIcons";
import { legalLinks, navLinks, site, socialLinks } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="px-3 pb-3">
      <div className="rounded bg-ink px-6 py-16 text-paper lg:py-20">
        <div className="mx-auto w-full max-w-[1440px]">
          <Reveal>
            <div className="flex flex-wrap items-center justify-between gap-8 border-b border-white/10 pb-14">
              <h2 className="font-display text-[34px] leading-tight lg:text-[52px]">
                Parlons de votre pièce
              </h2>
              <Link
                href="/contact"
                className="rounded bg-accent px-6 py-3.5 text-sm font-medium text-paper transition-colors hover:bg-accent-hover"
              >
                Prendre rendez-vous
              </Link>
            </div>
          </Reveal>

          <div className="grid gap-12 pt-14 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
            <div>
              <Image
                src="/images/logo-alt.png"
                alt={site.name}
                width={1024}
                height={283}
                className="h-[42px] w-auto"
              />
              <div className="mt-8 space-y-2 text-base text-white/70">
                <p>
                  <a
                    href={`mailto:${site.email}`}
                    className="inline-block py-2.5 transition-colors hover:text-paper"
                  >
                    {site.email}
                  </a>
                </p>
                <p>{site.address}</p>
                <p>
                  <a
                    href={`tel:${site.phoneIntl}`}
                    className="inline-block py-2.5 transition-colors hover:text-paper"
                  >
                    {site.phone}
                  </a>
                </p>
              </div>

              <p className="mt-10 text-xl font-medium">
                Abonnez-vous à notre newsletter
              </p>
              <Newsletter />
            </div>

            <div>
              <p className="text-xl font-medium">Navigation</p>
              <ul className="mt-5 space-y-3 text-base text-white/70">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="inline-block py-2.5 transition-colors hover:text-paper"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="text-xl font-medium">Informations</p>
              <ul className="mt-5 space-y-3 text-base text-white/70">
                {legalLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="inline-block py-2.5 transition-colors hover:text-paper"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="text-xl font-medium">Réseaux sociaux</p>

              {/* Icônes plutôt que du texte : elles se reconnaissent d'un coup
                d'œil et tiennent sur une seule ligne. Tant qu'une adresse
                n'est pas renseignée, l'icône reste affichée à l'identique
                mais n'est pas un lien — personne ne clique dans le vide. */}
              <ul className="mt-5 flex flex-wrap gap-3">
                {socialLinks.map((s) => {
                  const Icon = socialIcons[s.label];
                  if (!Icon) return null;

                  return (
                    <li key={s.label}>
                      {s.href ? (
                        <a
                          href={s.href}
                          target="_blank"
                          rel="noreferrer"
                          aria-label={s.label}
                          title={s.label}
                          className="flex h-11 w-11 items-center justify-center rounded-full border border-white/25 bg-white/5 text-paper transition-colors hover:border-accent hover:bg-accent"
                        >
                          <Icon className="h-[22px] w-[22px]" />
                        </a>
                      ) : (
                        <span
                          title={`${s.label} — adresse à renseigner dans site.ts`}
                          className="flex h-11 w-11 cursor-default items-center justify-center rounded-full border border-white/25 bg-white/5 text-paper"
                        >
                          <Icon className="h-[22px] w-[22px]" />
                        </span>
                      )}
                    </li>
                  );
                })}
              </ul>

              <p className="mt-6 text-base text-white/80">
                <a
                  href={`https://wa.me/${site.whatsapp}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-block py-1.5 underline-offset-4 transition-colors hover:text-paper hover:underline"
                >
                  Nous écrire sur WhatsApp →
                </a>
              </p>
            </div>
          </div>

          <p className="mt-16 border-t border-white/10 pt-8 text-sm text-white/50">
            {site.copyright}
          </p>
        </div>
      </div>
    </footer>
  );
}
