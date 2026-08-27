"use client";

import { useRef, useState } from "react";
import { site, trade } from "@/lib/site";

/* Candidature au programme professionnels.

   Les pièces d'identification de l'entreprise — RC, ICE, forme juridique —
   sont demandées d'entrée et non plus « facultatives à ce stade ». C'est le
   filtre : un particulier qui cherche un tarif remisé n'a pas de numéro de
   registre de commerce, et une société qui en a un fournit ces champs en
   trente secondes. Le formulaire est plus long, mais chaque demande reçue
   est exploitable.

   Trois blocs séparés plutôt qu'une suite de champs : l'entreprise, le
   contact, l'activité. Une colonne de douze champs d'affilée décourage même
   quand chacun est légitime. */
export default function TradeForm() {
  const [sent, setSent] = useState<"whatsapp" | "email" | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const collect = () => {
    const form = formRef.current;
    if (!form || !form.reportValidity()) return null;
    const data = new FormData(form);
    const get = (k: string) => String(data.get(k) ?? "").trim();

    return {
      societe: get("societe"),
      texte: [
        "DEMANDE — PROGRAMME PROFESSIONNELS",
        "",
        "— ENTREPRISE —",
        `Raison sociale : ${get("societe")}`,
        `Forme juridique : ${get("forme")}`,
        `RC : ${get("rc")} (${get("greffe")})`,
        `ICE : ${get("ice")}`,
        `IF : ${get("if") || "non communiqué"}`,
        `Adresse : ${get("adresse")}`,
        `Ville : ${get("ville")}`,
        `Site / réseaux : ${get("web") || "non communiqué"}`,
        "",
        "— CONTACT —",
        `Nom : ${get("nom")}`,
        `Fonction : ${get("fonction") || "non précisée"}`,
        `Téléphone : ${get("telephone")}`,
        `E-mail : ${get("email")}`,
        "",
        "— ACTIVITÉ —",
        `Métier : ${get("metier")}`,
        `Volume : ${get("volume")}`,
        "",
        get("message"),
      ].join("\n"),
    };
  };

  const sendWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();
    const d = collect();
    if (!d) return;
    window.open(
      `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(d.texte)}`,
      "_blank",
      "noopener",
    );
    setSent("whatsapp");
  };

  const sendEmail = () => {
    const d = collect();
    if (!d) return;
    window.location.href = `mailto:${site.formEmail}?subject=${encodeURIComponent(
      `Programme professionnels — ${d.societe}`,
    )}&body=${encodeURIComponent(d.texte)}`;
    setSent("email");
  };

  const champ =
    "w-full rounded border border-black/15 bg-paper px-4 py-3.5 text-base text-ink placeholder:text-ink/40 focus:border-accent focus:outline-none";
  const titreBloc =
    "eyebrow flex items-center gap-3 text-accent";
  const trait = <span aria-hidden className="h-px w-6 bg-accent" />;

  return (
    <form ref={formRef} onSubmit={sendWhatsApp} noValidate className="space-y-10">
      {/* 1 — L'entreprise */}
      <fieldset className="space-y-5">
        <legend className={titreBloc}>
          {trait}
          L&apos;ENTREPRISE
        </legend>

        <div className="grid gap-5 sm:grid-cols-2">
          <label className="block">
            <span className="text-sm text-ink/75">Raison sociale*</span>
            <input
              name="societe"
              required
              autoComplete="organization"
              className={`${champ} mt-2`}
            />
          </label>
          <label className="block">
            <span className="text-sm text-ink/75">Forme juridique*</span>
            <select name="forme" required defaultValue="" className={`${champ} mt-2`}>
              <option value="" disabled>
                Sélectionnez
              </option>
              {trade.formes.map((f) => (
                <option key={f}>{f}</option>
              ))}
            </select>
          </label>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <label className="block">
            <span className="text-sm text-ink/75">N° registre de commerce*</span>
            <input
              name="rc"
              required
              inputMode="numeric"
              placeholder="Ex. 123456"
              className={`${champ} mt-2`}
            />
          </label>
          <label className="block">
            <span className="text-sm text-ink/75">Ville du greffe*</span>
            <input
              name="greffe"
              required
              placeholder="Casablanca, Rabat…"
              className={`${champ} mt-2`}
            />
          </label>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <label className="block">
            <span className="text-sm text-ink/75">ICE*</span>
            {/* 15 chiffres : la vérification se fait ici, pas après coup. */}
            <input
              name="ice"
              required
              inputMode="numeric"
              pattern="[0-9]{15}"
              title="L'ICE comporte 15 chiffres"
              placeholder="15 chiffres"
              className={`${champ} mt-2`}
            />
          </label>
          <label className="block">
            <span className="text-sm text-ink/75">Identifiant fiscal</span>
            <input
              name="if"
              inputMode="numeric"
              placeholder="Facultatif"
              className={`${champ} mt-2`}
            />
          </label>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <label className="block">
            <span className="text-sm text-ink/75">Adresse du siège*</span>
            <input
              name="adresse"
              required
              autoComplete="street-address"
              className={`${champ} mt-2`}
            />
          </label>
          <label className="block">
            <span className="text-sm text-ink/75">Ville*</span>
            <input
              name="ville"
              required
              placeholder="Casablanca, Rabat…"
              className={`${champ} mt-2`}
            />
          </label>
        </div>

        <label className="block">
          <span className="text-sm text-ink/75">
            Site web ou page Instagram
          </span>
          <input
            name="web"
            type="url"
            placeholder="https://… — nous aide à qualifier votre activité"
            className={`${champ} mt-2`}
          />
        </label>
      </fieldset>

      {/* 2 — Le contact */}
      <fieldset className="space-y-5">
        <legend className={titreBloc}>
          {trait}
          VOTRE CONTACT
        </legend>

        <div className="grid gap-5 sm:grid-cols-2">
          <label className="block">
            <span className="text-sm text-ink/75">Nom et prénom*</span>
            <input
              name="nom"
              required
              autoComplete="name"
              className={`${champ} mt-2`}
            />
          </label>
          <label className="block">
            <span className="text-sm text-ink/75">Fonction</span>
            <input
              name="fonction"
              placeholder="Gérant, architecte, acheteur…"
              className={`${champ} mt-2`}
            />
          </label>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <label className="block">
            <span className="text-sm text-ink/75">Téléphone*</span>
            <input
              name="telephone"
              type="tel"
              required
              inputMode="tel"
              autoComplete="tel"
              placeholder="06 00 00 00 00"
              className={`${champ} mt-2`}
            />
          </label>
          <label className="block">
            <span className="text-sm text-ink/75">E-mail professionnel*</span>
            <input
              name="email"
              type="email"
              required
              autoComplete="email"
              className={`${champ} mt-2`}
            />
          </label>
        </div>
      </fieldset>

      {/* 3 — L'activité */}
      <fieldset className="space-y-5">
        <legend className={titreBloc}>
          {trait}
          VOTRE ACTIVITÉ
        </legend>

        <div className="grid gap-5 sm:grid-cols-2">
          <label className="block">
            <span className="text-sm text-ink/75">Métier*</span>
            <select name="metier" required defaultValue="" className={`${champ} mt-2`}>
              <option value="" disabled>
                Sélectionnez votre activité
              </option>
              {trade.metiers.map((m) => (
                <option key={m}>{m}</option>
              ))}
            </select>
          </label>
          <label className="block">
            <span className="text-sm text-ink/75">Volume estimé*</span>
            <select name="volume" required defaultValue="" className={`${champ} mt-2`}>
              <option value="" disabled>
                Sélectionnez
              </option>
              {trade.volumes.map((v) => (
                <option key={v}>{v}</option>
              ))}
            </select>
          </label>
        </div>

        <label className="block">
          <span className="text-sm text-ink/75">Votre besoin</span>
          <textarea
            name="message"
            rows={4}
            placeholder="Type de projets, chantier en cours, échéance…"
            className={`${champ} mt-2 resize-y`}
          />
        </label>
      </fieldset>

      <div className="space-y-4">
        <p className="text-sm text-ink/60">
          Ces informations nous permettent d&apos;ouvrir votre compte et
          d&apos;appliquer les conditions professionnelles. Elles ne servent à
          rien d&apos;autre.
        </p>

        <div className="flex flex-wrap items-center gap-3">
          <button
            type="submit"
            className="rounded bg-accent px-7 py-3.5 text-base font-medium text-paper transition-colors hover:bg-accent-hover"
          >
            Envoyer sur WhatsApp
          </button>
          <button
            type="button"
            onClick={sendEmail}
            className="rounded border border-black/15 px-7 py-3.5 text-base font-medium text-ink transition-colors hover:bg-surface"
          >
            Envoyer par e-mail
          </button>
        </div>
      </div>

      {sent && (
        <p className="text-sm text-ink/75" role="status">
          {sent === "whatsapp"
            ? "WhatsApp s'ouvre avec votre demande pré-remplie — il ne reste qu'à l'envoyer."
            : `Votre logiciel de messagerie s'ouvre avec la demande pré-remplie. Si rien ne se passe, écrivez à ${site.email}.`}
        </p>
      )}
    </form>
  );
}
