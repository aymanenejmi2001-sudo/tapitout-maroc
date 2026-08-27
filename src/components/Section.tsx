import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  /* "tight" pour un bloc qui prolonge le précédent (les chiffres sous
     les services, par exemple) : même largeur, moitié moins de respiration. */
  spacing?: "normal" | "tight" | "none";
  className?: string;
  id?: string;
};

/* Conteneur unique de toutes les sections du site.

   Une seule règle de gouttière — px-6 (24 px) sur mobile, px-9 (36 px)
   à partir de « large » — pour que tous les titres, textes et images du
   site s'alignent sur la même verticale, d'une section à l'autre et
   d'une page à l'autre. Le rythme vertical suit la même logique :
   py-20 / py-28. Ne pas remettre de padding horizontal au cas par cas :
   c'est ce qui avait fait dériver la mise en page.

   Ne pas ajouter non plus de `max-w` centré à l'intérieur : le contenu
   se retrouverait décalé par rapport aux sections voisines. */
export default function Section({
  children,
  spacing = "normal",
  className = "",
  id,
}: Props) {
  const vertical = {
    normal: "py-16 lg:py-24",
    tight: "py-8 lg:py-12",
    none: "",
  }[spacing];

  return (
    <section id={id} className={`px-6 lg:px-9 ${vertical} ${className}`}>
      {/* Au-delà de 1440 px, le contenu cesse de s'étirer et se centre :
          sinon les colonnes se retrouvent plaquées aux deux bords de
          l'écran et le lien visuel entre elles se perd. */}
      <div className="mx-auto w-full max-w-[1440px]">{children}</div>
    </section>
  );
}
