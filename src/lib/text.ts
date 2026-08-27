/* Les données du site contiennent des rappels entre crochets — « [À
   COMPLÉTER : matière…] ». Ils servent à vous signaler ce qu'il reste à
   écrire, mais n'ont rien à faire sous les yeux d'un client.

   Cette fonction les retire à l'affichage : le rappel reste visible dans
   site.ts, la page publiée ne montre que le texte rédigé. */
export function sansRappels(texte: string) {
  return texte
    .replace(/\[[^\]]*\]/g, "")
    .replace(/\n{2,}/g, "\n")
    .trim();
}
