"use client";

import { useState } from "react";
import { site } from "@/lib/site";

/* Sans back-end, l'inscription ouvre un e-mail pré-rempli.
   Pour automatiser : brancher ici un service (Brevo, Mailchimp…). */
export default function Newsletter() {
  const [email, setEmail] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    const subject = encodeURIComponent("Inscription à la newsletter");
    const body = encodeURIComponent(
      `Merci de m'inscrire à la newsletter : ${email}`,
    );
    window.location.href = `mailto:${site.formEmail}?subject=${subject}&body=${body}`;
  };

  return (
    <form onSubmit={submit} className="mt-5 flex max-w-[420px] gap-2">
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Votre e-mail"
        aria-label="Votre e-mail"
        className="min-w-0 flex-1 rounded border border-white/20 bg-transparent px-4 py-3 text-sm text-paper placeholder:text-white/40 focus:border-white/50 focus:outline-none"
      />
      <button
        type="submit"
        className="rounded bg-accent px-5 py-3 text-sm font-medium text-paper transition-colors hover:bg-accent-hover"
      >
        S&apos;abonner !
      </button>
    </form>
  );
}
