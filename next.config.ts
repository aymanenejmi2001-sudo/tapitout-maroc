import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* Masque la pastille « N » de Next.js pendant le développement. Elle
     n'apparaissait jamais pour les visiteurs — c'est un outil de débogage
     du serveur local — mais elle gênait la relecture des maquettes. */
  devIndicators: false,
};

export default nextConfig;
