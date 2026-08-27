import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Politique de confidentialité — Tapitout Maroc",
  description:
    "Comment Tapitout Maroc collecte et utilise vos données personnelles.",
  robots: { index: false },
};

export default function ConfidentialitePage() {
  return (
    <LegalPage title="Politique de confidentialité" updated="Août 2026">
      <h2>Données que nous recueillons</h2>
      <p>
        Nous ne recueillons que les informations que vous nous transmettez
        volontairement : nom, adresse e-mail, lieu du projet, type de pièce,
        échéance souhaitée et contenu de votre message. Aucune donnée n&apos;est
        collectée à votre insu.
      </p>

      <h2>Usage de ces données</h2>
      <p>
        Ces informations servent uniquement à répondre à votre demande, à
        organiser le relevé à votre domicile et à établir votre devis. Elles ne
        sont ni vendues, ni louées, ni transmises à des tiers à des fins
        commerciales.
      </p>

      <h2>Formulaire de contact</h2>
      <p>
        Le formulaire du site ouvre votre application de messagerie ou WhatsApp
        avec votre demande pré-remplie. Vos réponses transitent donc par le
        service que vous choisissez, et non par un serveur de notre part.
      </p>

      <h2>Newsletter</h2>
      <p>
        L&apos;inscription est facultative et vous pouvez vous désabonner à tout
        moment en nous écrivant à {site.email}.
      </p>

      <h2>Conservation</h2>
      <p className="todo">
        À COMPLÉTER — précisez la durée de conservation des demandes et devis
        (par exemple trois ans après le dernier contact).
      </p>

      <h2>Vos droits</h2>
      <p>
        Conformément à la loi 09-08 relative à la protection des personnes
        physiques à l&apos;égard du traitement des données à caractère
        personnel, vous disposez d&apos;un droit d&apos;accès, de rectification
        et d&apos;opposition. Pour l&apos;exercer, écrivez à{" "}
        <a href={`mailto:${site.email}`}>{site.email}</a>.
      </p>
      <p className="todo">
        À VÉRIFIER — un traitement de données personnelles doit en principe être
        déclaré auprès de la CNDP. Vérifiez si votre activité est concernée.
      </p>

      <h2>Cookies</h2>
      <p>
        Ce site ne dépose aucun cookie publicitaire ni traceur de mesure
        d&apos;audience.
      </p>
      <p className="todo">
        À METTRE À JOUR si vous ajoutez un outil de statistiques ou un pixel
        publicitaire : un bandeau de consentement deviendrait alors nécessaire.
      </p>
    </LegalPage>
  );
}
