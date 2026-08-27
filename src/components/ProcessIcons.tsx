/* Icônes dessinées pour le métier du tapis : mètre, échantillons, bordure
   et rouleau. Elles remplacent les illustrations du template d'origine —
   un plan d'architecte, un presse-papier et une grue de chantier — qui ne
   racontaient rien de l'atelier.

   Tracé au trait, en currentColor : elles prennent la couleur du texte
   qui les entoure et restent nettes à toutes les tailles. */

const base = {
  viewBox: "0 0 64 64",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.4,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

/* 01 — Le relevé : mètre ruban gradué. */
function IconMesure(props: { className?: string }) {
  return (
    <svg {...base} {...props}>
      <rect x="6" y="24" width="52" height="16" rx="2" />
      <path d="M14 24v6M22 24v9M30 24v6M38 24v9M46 24v6" />
      <path d="M6 46h52" strokeDasharray="2 3" opacity="0.5" />
      <path d="M9 43.5 6 46l3 2.5M55 43.5 58 46l-3 2.5" opacity="0.5" />
    </svg>
  );
}

/* 02 — La matière : échantillons superposés, texture apparente. */
function IconMatiere(props: { className?: string }) {
  return (
    <svg {...base} {...props}>
      <rect x="8" y="14" width="30" height="30" rx="2" />
      <rect x="18" y="22" width="30" height="30" rx="2" />
      <path d="M22 30h22M22 35h22M22 40h16" opacity="0.55" />
    </svg>
  );
}

/* 03 — L'atelier : tapis vu de dessus, bordure marquée, coin relevé. */
function IconBordure(props: { className?: string }) {
  return (
    <svg {...base} {...props}>
      <path d="M10 14h44v36H22" />
      <path d="M10 14v36" />
      <path d="M16 20h32v24H24" />
      <path d="M16 20v24" />
      <path d="M22 50l-8-6 8-6z" />
    </svg>
  );
}

/* 04 — La livraison : tapis roulé, vu en perspective, prêt à partir. */
function IconRouleau(props: { className?: string }) {
  return (
    <svg {...base} {...props}>
      {/* corps du rouleau */}
      <path d="M18 17h26" />
      <path d="M18 47h26" />
      {/* tranche enroulée, côté visible */}
      <ellipse cx="18" cy="32" rx="8" ry="15" />
      <ellipse cx="18" cy="32" rx="3.5" ry="7" opacity="0.6" />
      {/* extrémité opposée */}
      <path d="M44 17a8 15 0 0 1 0 30" />
      {/* départ en livraison */}
      <path d="M12 54h34" strokeDasharray="2 3" opacity="0.5" />
      <path d="M43 51l3 3-3 3" opacity="0.5" />
    </svg>
  );
}

export const processIcons = [IconMesure, IconMatiere, IconBordure, IconRouleau];
