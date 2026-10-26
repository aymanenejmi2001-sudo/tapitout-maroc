import LegalPage from "@/components/LegalPage";
import { site } from "@/lib/site";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  titre: "Mentions légales — Tapitout Maroc",
  description: "Mentions légales du site Tapitout Maroc.",
  chemin: "/mentions-legales",
  indexable: false,
});

export default function MentionsLegalesPage() {
  return (
    <LegalPage title="Mentions légales" updated="Août 2026">
      <h2>Éditeur du site</h2>
      <p>
        TAPITOUT MAROC
        <br />
        {site.address}
        <br />
        Téléphone : {site.phone}
        <br />
        E-mail : {site.email}
      </p>
      <p className="todo">
        À COMPLÉTER — informations obligatoires au Maroc : forme juridique
        (SARL, SNC…), capital social, numéro du Registre du Commerce et ville du
        greffe, identifiant fiscal (IF), numéro ICE, numéro de patente et
        éventuelle immatriculation à la CNSS.
      </p>

      <h2>Directeur de la publication</h2>
      <p className="todo">
        À COMPLÉTER — nom et qualité de la personne responsable de la
        publication.
      </p>

      <h2>Hébergement</h2>
      <p className="todo">
        À COMPLÉTER — nom, adresse et téléphone de l&apos;hébergeur du site.
      </p>

      <h2>Propriété intellectuelle</h2>
      <p>
        L&apos;ensemble des contenus de ce site — textes, photographies,
        illustrations, logo et éléments graphiques — est protégé par le droit
        d&apos;auteur. Toute reproduction ou représentation, totale ou
        partielle, sans autorisation écrite préalable est interdite.
      </p>
      <p className="todo">
        À VÉRIFIER — les photographies actuellement en ligne proviennent du
        modèle de site d&apos;origine. Remplacez-les par vos propres visuels, ou
        assurez-vous de détenir les droits d&apos;exploitation, avant la mise en
        ligne publique.
      </p>

      <h2>Responsabilité</h2>
      <p>
        Les informations publiées sur ce site sont données à titre indicatif.
        Les dimensions, matières et délais sont confirmés lors du relevé
        effectué à votre domicile et font foi dans le devis remis.
      </p>
    </LegalPage>
  );
}
