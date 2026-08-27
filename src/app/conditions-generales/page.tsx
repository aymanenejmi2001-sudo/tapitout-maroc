import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Conditions générales — Tapitout Maroc",
  description: "Conditions générales de vente de Tapitout Maroc.",
  robots: { index: false },
};

export default function ConditionsGeneralesPage() {
  return (
    <LegalPage title="Conditions générales de vente" updated="Août 2026">
      <p className="todo">
        À FAIRE RELIRE — ce texte est une base de travail. Faites-le valider par
        un juriste avant la mise en ligne : une vente sur mesure engage votre
        responsabilité sur les dimensions, les délais et le droit de
        rétractation.
      </p>

      <h2>Objet</h2>
      <p>
        Les présentes conditions régissent la vente de tapis façonnés sur mesure
        ainsi que les prestations associées : relevé à domicile, essayage,
        façonnage, finition de bordure, livraison et pose.
      </p>

      <h2>Devis et commande</h2>
      <p>
        Chaque commande fait l&apos;objet d&apos;un devis établi après le relevé
        effectué sur place. Le devis précise les dimensions retenues, la
        matière, le type de finition, le prix et le délai. La commande est ferme
        à compter de son acceptation écrite par le client.
      </p>
      <p className="todo">
        À COMPLÉTER — durée de validité du devis, montant ou pourcentage de
        l&apos;acompte demandé à la commande.
      </p>

      <h2>Prix et paiement</h2>
      <p className="todo">
        À COMPLÉTER — devise et mention TTC ou HT, moyens de paiement acceptés,
        conditions de règlement du solde.
      </p>

      <h2>Délais</h2>
      <p>
        Les délais annoncés courent à compter de la validation du devis et de
        l&apos;encaissement de l&apos;acompte. Ils sont donnés à titre indicatif
        et peuvent varier selon la disponibilité de la matière choisie.
      </p>

      <h2>Produits sur mesure</h2>
      <p>
        Les pièces étant façonnées aux dimensions relevées chez le client, elles
        ne peuvent être ni reprises ni échangées, sauf défaut de fabrication
        avéré. Les dimensions figurant au devis sont celles validées par le
        client avant lancement en atelier.
      </p>

      <h2>Livraison et pose</h2>
      <p>
        La livraison est assurée partout au Maroc, en emballage protégé. La pose
        est proposée en option ; elle comprend la vérification des alignements
        et des jeux de seuil avant notre départ.
      </p>

      <h2>Réclamations</h2>
      <p className="todo">
        À COMPLÉTER — délai pour signaler un défaut à la réception, procédure de
        réclamation, garantie éventuelle sur les finitions.
      </p>

      <h2>Droit applicable</h2>
      <p>
        Les présentes conditions sont soumises au droit marocain. En cas de
        litige, et à défaut d&apos;accord amiable, compétence est attribuée aux
        tribunaux de Casablanca.
      </p>
    </LegalPage>
  );
}
