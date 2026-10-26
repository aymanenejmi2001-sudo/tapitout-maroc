/* Données structurées d'une page, au format que lisent les moteurs.
   « < » est échappé : un texte contenant « </script> » ne doit pas pouvoir
   refermer la balise et laisser du code dans la page. */
export default function JsonLd({ data }: { data: object | object[] }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
