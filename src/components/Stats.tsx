import Odometer from "./Odometer";
import ParallaxImage from "./ParallaxImage";
import Reveal from "./Reveal";
import { stats } from "@/lib/site";

/* Les trois chiffres de la maison.

   Deux versions ont échoué avant celle-ci. Le bandeau qui défilait en boucle
   laissait un vide dès qu'on est passé à trois entrées. La grille en trois
   colonnes qui a suivi était pire : des nombres de 60 px perdus dans une
   bande de 1 400 px, autrement dit trois petits chiffres et beaucoup de
   vide. L'erreur était de traiter ces nombres comme du texte courant — ce
   sont les arguments les plus forts de la page, ils doivent occuper la
   largeur.

   Ici chaque chiffre tient une ligne entière : le nombre à gauche, énorme,
   son libellé poussé à droite, un filet entre les deux. Plus aucun vide, et
   trois lignes qui se lisent d'un coup d'œil.

   Le mouvement vient des roues : chaque chiffre tourne et vient se caler,
   de gauche à droite. La texture derrière glisse un peu plus lentement que
   la page. Voir [Odometer] pour la règle qui garantit que les nombres
   restent justes même si rien ne s'anime. */
export default function Stats() {
  return (
    <section className="px-3" aria-label="Nos chiffres">
      <div className="relative overflow-hidden rounded bg-ink">
        {/* Une macro de laine, très assombrie : elle donne du grain au noir
            sans jamais disputer la lecture aux chiffres. */}
        <div className="absolute inset-0 opacity-[0.22]">
          <ParallaxImage
            src="/images/gal-texture.jpg"
            alt=""
            sizes="100vw"
            amount={10}
            className="object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/85 to-ink/60" />

        <div className="relative px-6 py-9 lg:px-14 lg:py-12">
          <div className="mx-auto w-full max-w-[1440px]">
            <Reveal>
              {/* Sur fond clair le surtitre est rouge ; ici il serait à 2,5:1
                    contre l'encre, donc invisible. Le rouge passe sur le
                    filet, le texte prend l'ivoire — même règle que sur la
                    scène « Bespoke design ». */}
              <p className="eyebrow flex items-center gap-3 text-paper/85">
                <span aria-hidden className="h-px w-7 bg-accent" />
                EN CHIFFRES
              </p>
            </Reveal>

            <div className="mt-7 lg:mt-10">
              {stats.map((stat, i) => (
                <Reveal
                  key={stat.label}
                  delay={i * 0.12}
                  className={i > 0 ? "relative before:absolute before:inset-x-0 before:top-0 before:h-px before:bg-gradient-to-r before:from-white/30 before:via-white/12 before:to-transparent" : ""}
                >
                  {/* La ligne avance d'un cheveu au survol : le bloc répond
                      au curseur sans que rien ne saute. */}
                  <div className="group flex flex-col-reverse gap-1 py-3.5 transition-transform duration-500 ease-out sm:flex-row sm:items-baseline sm:justify-between sm:gap-8 sm:py-5 lg:hover:translate-x-1">
                    <p className="flex items-baseline gap-3 font-display leading-none text-paper">
                      <span className="text-[38px] sm:text-[68px] lg:text-[84px]">
                        <Odometer value={stat.value} />
                      </span>
                      {stat.unit && (
                        <span className="text-[15px] text-accent sm:text-[25px] lg:text-[30px]">
                          {stat.unit}
                        </span>
                      )}
                    </p>

                    <p className="eyebrow text-paper/60 transition-colors duration-500 group-hover:text-paper sm:text-right">
                      {stat.label}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
