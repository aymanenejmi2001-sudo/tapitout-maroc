import type { NextConfig } from "next";

/* Deux modes. Par défaut, le site tourne comme toujours : serveur local et
   optimiseur d'images de Next. Avec EXPORT_STATIQUE=1 — c'est ce que fait
   scripts/publier.sh — il est exporté en fichiers statiques pour un
   hébergement sans serveur.

   L'export a son propre dossier de travail : il ne touche jamais à .next,
   que le serveur local est peut-être en train d'utiliser. */
const exportStatique = process.env.EXPORT_STATIQUE === "1";

const nextConfig: NextConfig = {
  /* Masque la pastille « N » de Next.js pendant le développement. Elle
     n'apparaissait jamais pour les visiteurs — c'est un outil de débogage
     du serveur local — mais elle gênait la relecture des maquettes. */
  devIndicators: false,

  ...(exportStatique && {
    output: "export",
    distDir: ".next-export",
    /* Un dossier par page (/collections/ et non /collections.html) : c'est
       ce que servent sans surprise les hébergements statiques. */
    trailingSlash: true,
    images: {
      loader: "custom",
      loaderFile: "./src/lib/image-loader.ts",
    },
  }),
};

export default nextConfig;
