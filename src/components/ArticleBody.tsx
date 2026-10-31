import { Fragment } from "react";
import Link from "next/link";
import type { Bloc } from "@/lib/journal";

/* Texte courant d'un article. Deux marques seulement : [mot](/chemin/) pour
   un lien interne, **mot** pour une mise en valeur. Les liens sont de vrais
   liens (<a>) : c'est ce que Google suit pour comprendre comment les pages
   se répondent. */
function enLigne(texte: string) {
  const morceaux = texte.split(/(\[[^\]]+\]\([^)]+\)|\*\*[^*]+\*\*)/g);
  return morceaux.map((m, i) => {
    const lien = m.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (lien) {
      return (
        <Link
          key={i}
          href={lien[2]}
          className="text-accent underline decoration-accent/30 underline-offset-4 transition-colors hover:decoration-accent"
        >
          {lien[1]}
        </Link>
      );
    }
    const gras = m.match(/^\*\*([^*]+)\*\*$/);
    if (gras) {
      return (
        <strong key={i} className="font-medium text-ink">
          {gras[1]}
        </strong>
      );
    }
    return <Fragment key={i}>{m}</Fragment>;
  });
}

export default function ArticleBody({ blocs }: { blocs: Bloc[] }) {
  return (
    <div className="text-[17px] leading-[1.75] text-ink/80">
      {blocs.map((b, i) => {
        switch (b.type) {
          case "p":
            return (
              <p key={i} className="mt-5">
                {enLigne(b.texte)}
              </p>
            );
          case "h2":
            return (
              <h2
                key={i}
                className="mt-14 font-display text-[28px] leading-[1.15] text-ink lg:text-[32px]"
              >
                {b.texte}
              </h2>
            );
          case "h3":
            return (
              <h3
                key={i}
                className="mt-8 font-display text-xl leading-snug text-ink"
              >
                {b.texte}
              </h3>
            );
          case "ul":
            return (
              <ul key={i} className="mt-5 space-y-3">
                {b.items.map((it, j) => (
                  <li key={j} className="flex gap-3">
                    <span
                      aria-hidden
                      className="mt-[0.8em] h-px w-4 shrink-0 bg-accent"
                    />
                    <span>{enLigne(it)}</span>
                  </li>
                ))}
              </ul>
            );
          case "ol":
            return (
              <ol key={i} className="mt-5 list-decimal space-y-3 pl-6">
                {b.items.map((it, j) => (
                  <li key={j}>{enLigne(it)}</li>
                ))}
              </ol>
            );
          case "encart":
            return (
              <aside
                key={i}
                className="mt-10 rounded border border-black/10 bg-sand px-6 py-6"
              >
                <p className="eyebrow text-accent">{b.titre}</p>
                {b.texte && <p className="mt-3">{enLigne(b.texte)}</p>}
                {b.items && (
                  <ul className="mt-3 space-y-2">
                    {b.items.map((it, j) => (
                      <li key={j} className="flex gap-3">
                        <span
                          aria-hidden
                          className="mt-[0.8em] h-px w-4 shrink-0 bg-accent"
                        />
                        <span>{enLigne(it)}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </aside>
            );
        }
      })}
    </div>
  );
}
