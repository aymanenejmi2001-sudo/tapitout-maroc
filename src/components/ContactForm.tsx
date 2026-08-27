"use client";

import { useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { collections, projectTypes, site } from "@/lib/site";
import DatePicker from "./DatePicker";

/* Le formulaire n'a pas de serveur : il transmet la demande via WhatsApp
   (bouton principal) ou par e-mail (repli). Pour recevoir les demandes
   directement dans une boîte ou un CRM, brancher ici un service tiers
   (Formspree, Resend…) sans rien changer aux champs. */
export default function ContactForm() {
  const [sent, setSent] = useState<"whatsapp" | "email" | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  /* Quand on arrive depuis une fiche produit (/contact?collection=calmora),
     la collection est reprise automatiquement : le visiteur n'a pas à
     répéter ce qu'il vient de regarder, et la demande arrive qualifiée. */
  const params = useSearchParams();
  const collection = collections.find(
    (c) => c.slug === params.get("collection"),
  );

  const collect = () => {
    const form = formRef.current;
    if (!form) return null;
    if (!form.reportValidity()) return null;

    const data = new FormData(form);
    const get = (k: string) => String(data.get(k) ?? "").trim();

    return {
      nom: get("nom"),
      texte: [
        `Nom : ${get("nom")}`,
        `Téléphone : ${get("telephone")}`,
        `E-mail : ${get("email")}`,
        `Lieu : ${get("lieu")}`,
        `Type de projet : ${get("type")}`,
        `Date souhaitée : ${get("date") || "à convenir"}`,
        ...(collection ? [`Collection : ${collection.name}`] : []),
        "",
        get("message"),
      ].join("\n"),
    };
  };

  /* Deux chemins d'envoi plutôt qu'un seul lien mailto : beaucoup de
     visiteurs n'ont aucune application de messagerie configurée sur
     mobile, et leur demande se perdait sans qu'ils s'en aperçoivent. */
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
      `Demande de ${d.nom}`,
    )}&body=${encodeURIComponent(d.texte)}`;
    setSent("email");
  };

  const field =
    "w-full rounded border border-black/15 bg-paper px-4 py-3.5 text-base text-ink placeholder:text-ink/40 focus:border-accent focus:outline-none";

  return (
    <form
      ref={formRef}
      onSubmit={sendWhatsApp}
      noValidate
      className="space-y-5"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block">
          <span className="text-sm text-ink/75">Nom complet*</span>
          <input
            name="nom"
            required
            autoComplete="name"
            className={`${field} mt-2`}
          />
        </label>
        <label className="block">
          <span className="text-sm text-ink/75">Adresse e-mail</span>
          <input
            name="email"
            type="email"
            autoComplete="email"
            className={`${field} mt-2`}
          />
        </label>
      </div>

      {/* Le téléphone est le premier moyen de fixer un rendez-vous de
          relevé : il manquait, il est désormais demandé avant l'e-mail. */}
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
            className={`${field} mt-2`}
          />
        </label>
        <label className="block">
          <span className="text-sm text-ink/75">Lieu*</span>
          <input
            name="lieu"
            required
            placeholder="Ville, quartier"
            className={`${field} mt-2`}
          />
        </label>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block">
          <span className="text-sm text-ink/75">Type de projet*</span>
          <select
            name="type"
            required
            defaultValue=""
            className={`${field} mt-2`}
          >
            <option value="" disabled>
              Sélectionnez le type de projet
            </option>
            {projectTypes.map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>
        </label>

        {/* Un vrai calendrier plutôt qu'une échéance vague : c'est la date
            du relevé qui compte pour organiser un déplacement. Facultatif,
            pour ne pas bloquer qui n'a pas encore de date en tête. */}
        <DatePicker name="date" label="Date souhaitée pour le relevé" />
      </div>

      {collection && (
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 rounded border border-accent/20 bg-accent/[0.04] px-4 py-3">
          <span className="text-sm text-ink/60">Votre demande concerne</span>
          <span className="text-base font-medium text-ink">
            {collection.name}
          </span>
        </div>
      )}

      <label className="block">
        <span className="text-sm text-ink/75">Message</span>
        <textarea
          name="message"
          rows={5}
          defaultValue={
            collection
              ? `Bonjour, je suis intéressé(e) par la ${collection.name}.\n`
              : ""
          }
          placeholder="Dimensions approximatives, pièce concernée, matière envisagée…"
          className={`${field} mt-2 resize-y`}
        />
      </label>

      <div className="flex flex-wrap items-center gap-3 pt-1">
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

      {sent && (
        <p className="text-sm text-ink/75" role="status">
          {sent === "whatsapp"
            ? "WhatsApp s'ouvre avec votre demande pré-remplie — il ne reste qu'à l'envoyer."
            : `Votre logiciel de messagerie s'ouvre avec la demande pré-remplie. Si rien ne se passe, écrivez directement à ${site.email}.`}
        </p>
      )}
    </form>
  );
}
