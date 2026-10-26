import Hero from "@/components/Hero";
import Intro from "@/components/Intro";
import Collections from "@/components/Collections";
import Bespoke from "@/components/Bespoke";
import Process from "@/components/Process";
import Stats from "@/components/Stats";
import Gallery from "@/components/Gallery";
import About from "@/components/About";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  titre: "Tapis sur mesure à Casablanca et au Maroc — Tapitout",
  description:
    "Tapitout façonne des tapis sur mesure à Casablanca : relevé sur place, essayage chez vous, finitions maîtrisées en atelier, livraison et pose partout au Maroc.",
  chemin: "/",
});

/* Ordre de lecture de l'accueil : on accroche, on montre, on explique,
   on prouve, on signe.

   « Bespoke design » précède les collections : la grande image annonce ce
   que la maison sait faire, et les collections répondent ensuite en montrant
   les matières. L'inverse donnait l'impression de revenir en arrière.

   Le détail des six prestations a rejoint la page « Savoir-faire », où il ne
   fait plus doublon avec les quatre étapes du processus. */
export default function Home() {
  return (
    <main id="contenu">
      <Hero />
      <Intro />
      <Bespoke />
      <Collections />
      <Process />
      <Stats />
      <Gallery />
      <About />
    </main>
  );
}
