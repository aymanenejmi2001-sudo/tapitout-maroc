"use client";

import { usePathname } from "next/navigation";
import { site } from "@/lib/site";

/* Bouton d'appel permanent. Au Maroc, WhatsApp est le premier canal de
   contact : il doit rester à portée de pouce, pas à 10 000 pixels de
   défilement. Masqué sur la page Contact, où les coordonnées sont déjà
   au premier plan. */
export default function WhatsAppButton() {
  const pathname = usePathname();
  if (pathname === "/contact") return null;

  const message = encodeURIComponent(
    "Bonjour, je souhaite des renseignements sur un tapis sur mesure.",
  );

  return (
    <a
      href={`https://wa.me/${site.whatsapp}?text=${message}`}
      target="_blank"
      rel="noreferrer"
      aria-label="Nous écrire sur WhatsApp"
      className="fixed bottom-5 right-5 z-40 flex items-center gap-2.5 rounded-full bg-[#25D366] py-3 pl-3.5 pr-4 text-sm font-medium text-white shadow-lg transition-transform hover:scale-105 sm:bottom-8 sm:right-8"
    >
      <svg
        viewBox="0 0 24 24"
        aria-hidden
        className="h-5 w-5 shrink-0 fill-current"
      >
        <path d="M17.47 14.38c-.3-.15-1.75-.86-2.02-.96-.27-.1-.47-.15-.67.15-.2.3-.77.96-.94 1.16-.17.2-.35.22-.64.07-.3-.15-1.25-.46-2.38-1.47-.88-.78-1.47-1.75-1.64-2.05-.17-.3-.02-.46.13-.6.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.6-.92-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.01-1.04 2.47s1.06 2.86 1.21 3.06c.15.2 2.1 3.2 5.08 4.49.71.3 1.26.49 1.69.63.71.22 1.36.19 1.87.12.57-.09 1.75-.72 2-1.41.25-.69.25-1.28.17-1.41-.07-.13-.27-.2-.57-.35z" />
        <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91C21.96 6.45 17.5 2 12.04 2zm0 18.02h-.01a8.2 8.2 0 0 1-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.2 8.2 0 0 1-1.26-4.38c0-4.54 3.7-8.23 8.25-8.23a8.23 8.23 0 0 1 8.24 8.24c0 4.54-3.7 8.23-8.24 8.23z" />
      </svg>
      <span className="hidden sm:inline">WhatsApp</span>
    </a>
  );
}
