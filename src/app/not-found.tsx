import type { Metadata } from "next";
import Link from "next/link";
import Section from "@/components/Section";
import { collections } from "@/lib/site";

export const metadata: Metadata = {
  title: "Page introuvable — Tapitout Maroc",
  robots: { index: false },
};

/* Une page d'erreur qui répare au lieu de constater : elle explique en
   français, puis propose les trois chemins les plus probables. La page
   par défaut de Next est en anglais et ne mène nulle part. */
export default function NotFound() {
  return (
    <main id="contenu" className="pt-[68px]">
      <Section>
        <div className="mx-auto max-w-[640px] py-10 text-center">
          <p className="flex items-center justify-center gap-3 eyebrow text-accent">
            <span aria-hidden className="h-px w-7 bg-accent" />
            ERREUR 404
          </p>

          <h1 className="mt-6 font-display text-[34px] leading-[1.1] text-ink lg:text-[48px]">
            Cette page n&apos;existe pas
          </h1>

          <p className="mx-auto mt-6 max-w-[520px] text-lg leading-[1.55] text-ink/75">
            L&apos;adresse est peut-être incomplète, ou la page a été déplacée.
            Voici par où reprendre.
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <Link
              href="/collections"
              className="rounded bg-accent px-6 py-3.5 text-base font-medium text-paper transition-colors hover:bg-accent-hover"
            >
              Voir les collections
            </Link>
            <Link
              href="/"
              className="rounded border border-ink/20 px-6 py-3.5 text-base font-medium text-ink transition-colors hover:bg-surface"
            >
              Retour à l&apos;accueil
            </Link>
          </div>

          <div className="mt-14 border-t border-black/10 pt-8">
            <p className="text-sm text-ink/60">Nos collections</p>
            <ul className="mt-4 flex flex-wrap justify-center gap-x-6 gap-y-2">
              {collections.map((c) => (
                <li key={c.slug}>
                  <Link
                    href={`/collections/${c.slug}`}
                    className="inline-block py-1.5 text-base text-ink underline-offset-4 hover:text-accent hover:underline"
                  >
                    {c.name.replace("Collection ", "")}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>
    </main>
  );
}
