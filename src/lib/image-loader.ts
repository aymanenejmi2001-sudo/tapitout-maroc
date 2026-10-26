/* Chargeur d'images de la version publiée sur un hébergement statique.

   L'optimiseur intégré de Next demande un serveur, que GitHub Pages n'est
   pas. À la place, scripts/variantes-images.mjs fabrique d'avance chaque
   image en plusieurs largeurs, et ce chargeur désigne la plus proche
   au-dessus de ce que le navigateur demande. Sans cela, les cartes de
   collection livreraient des fichiers de 1 à 2 Mo chacune.

   Les chemins produits doivent rester les mêmes que ceux du script. */
const LARGEURS = [384, 640, 828, 1080, 1440, 1800];

export default function chargeurStatique({
  src,
  width,
}: {
  src: string;
  width: number;
}): string {
  /* Les vectoriels n'ont pas de taille à choisir, et tout ce qui ne vient
     pas de /images est servi tel quel. */
  if (!src.startsWith("/images/") || /\.svg$/i.test(src)) return src;

  const largeur =
    LARGEURS.find((l) => l >= width) ?? LARGEURS[LARGEURS.length - 1];
  const chemin = src.replace(/^\/images\//, "").replace(/\.[a-z0-9]+$/i, "");
  return `/_i/${largeur}/${chemin}.webp`;
}
