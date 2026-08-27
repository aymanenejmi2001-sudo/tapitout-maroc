"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { motion, useReducedMotion } from "motion/react";

/* Compteur à rouleaux : chaque chiffre est une roue qui tourne et vient se
   caler sur sa valeur, comme un compteur mécanique. Les roues partent en
   décalé, de gauche à droite, si bien que le nombre se compose au lieu
   d'apparaître d'un bloc.

   RÈGLE DE SÉCURITÉ — la même que [Reveal] : la position de repos de chaque
   roue est déjà la bonne. On ne la rembobine qu'au montage, côté client, et
   seulement si la bande est encore sous la ligne de flottaison. Si les
   animations ne tournent jamais — JavaScript absent, onglet en arrière-plan,
   observateur muet — le nombre reste affiché, juste, immobile. Un chiffre
   qui dépend d'une animation pour être lisible n'a rien à faire sur une
   page de vente. */

/* Savoir si l'on est côté client, sans écrire d'état dans un effet : le
   serveur répond « non », le navigateur « oui ». Les fonctions sont posées
   hors du composant pour ne pas se réabonner à chaque rendu. */
const SANS_ABONNEMENT = () => () => {};
const COTE_CLIENT = () => true;
const COTE_SERVEUR = () => false;

/* Deux séries de 0 à 9 : la roue fait exactement un tour complet entre la
   position de départ et celle d'arrivée. */
const SERIE = Array.from({ length: 20 }, (_, i) => i % 10);

/* Hauteur d'une roue. Un cadre d'exactement 1 em rognerait le haut des
   chiffres : 1.15 leur laisse de quoi respirer. */
const CADRE = "inline-block h-[1.15em] overflow-hidden align-bottom";

function Roue({
  chiffre,
  delai,
  rembobine,
}: {
  chiffre: number;
  delai: number;
  rembobine: boolean;
}) {
  /* Au repos : la seconde série, donc un tour de plus que le départ. */
  const position = rembobine ? chiffre : 10 + chiffre;

  return (
    <span className={CADRE}>
      <motion.span
        initial={false}
        animate={{ y: `-${(position / SERIE.length) * 100}%` }}
        transition={{
          /* Le rembobinage est instantané : on ne montre jamais la roue
             partir à l'envers. */
          duration: rembobine ? 0 : 1.5,
          delay: rembobine ? 0 : delai,
          ease: [0.16, 1, 0.3, 1],
        }}
        className="flex flex-col"
      >
        {SERIE.map((c, i) => (
          <span key={i} className="block h-[1.15em] leading-[1.15]">
            {c}
          </span>
        ))}
      </motion.span>
    </span>
  );
}

export default function Odometer({
  value,
  className = "",
}: {
  value: string;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const monte = useSyncExternalStore(SANS_ABONNEMENT, COTE_CLIENT, COTE_SERVEUR);
  const [armed, setArmed] = useState(false);
  const [lance, setLance] = useState(false);
  const reduced = useReducedMotion();

  /* Les roues ne sont posées qu'une fois la page montée. Le HTML envoyé par
     le serveur ne contient donc que le nombre, une seule fois : sans ce
     garde-fou, la page livrait « 1 200 0123456789012345… » à Google et aux
     lecteurs de flux, une bouillie de chiffres autour de la vraie valeur. */

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const sousLaLigne = () =>
      el.getBoundingClientRect().top >= window.innerHeight - 80;

    if (!sousLaLigne()) return;
    setArmed(true);

    const partir = () => setLance(true);
    const observateur = new IntersectionObserver(
      (entrees) => entrees.some((e) => e.isIntersecting) && partir(),
      { rootMargin: "-80px" },
    );
    observateur.observe(el);

    /* Filet : si l'observateur ne dit jamais rien, on regarde nous-mêmes. */
    const filet = setInterval(() => !sousLaLigne() && partir(), 800);

    return () => {
      observateur.disconnect();
      clearInterval(filet);
    };
  }, []);

  if (reduced || !monte)
    return (
      <span ref={ref} className={className}>
        {value}
      </span>
    );

  const rembobine = armed && !lance;
  let rang = 0;

  return (
    <span ref={ref} className={`tabular-nums ${className}`}>
      {/* Le nombre est lu une fois, proprement, par les lecteurs d'écran :
          la mécanique des roues ne les regarde pas. */}
      <span className="sr-only">{value}</span>

      <span aria-hidden className="inline-flex select-none items-baseline">
        {[...value].map((caractere, i) => {
          if (!/[0-9]/.test(caractere)) {
            return (
              <span key={i} className={`${CADRE} leading-[1.15]`}>
                {/* Espace fine insécable : c'est le séparateur de milliers français,
                    et un espace ordinaire seul dans une boîte serait
                    supprimé au rendu. */}
                {caractere === " " ? "\u202F" : caractere}
              </span>
            );
          }
          return (
            <Roue
              key={i}
              chiffre={Number(caractere)}
              delai={rang++ * 0.08}
              rembobine={rembobine}
            />
          );
        })}
      </span>
    </span>
  );
}
