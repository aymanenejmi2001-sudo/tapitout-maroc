export const site = {
  name: "Tapitout",
  tagline: "On ne vend pas des tapis · On installe une ambiance.",
  /* Adresse affichee publiquement sur le site. */
  email: "contact@tapitoutmaroc.com",
  /* Adresse qui RECOIT les demandes des formulaires. Distincte de celle
     affichee : le visiteur voit l'adresse de la maison, les demandes
     arrivent dans la boite reellement relevee. */
  formEmail: "heythelab@gmail.com",
  phone: "0604926202",
  /* Format international, requis par WhatsApp et par les liens d'appel. */
  phoneIntl: "+212604926202",
  whatsapp: "212604926202",
  address: "408, 410 Bd Oued Edaoura, Casablanca 20240",
  city: "Casablanca",
  postalCode: "20240",
  country: "MA",
  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=408%2C+410+Bd+Oued+Edaoura%2C+Casablanca+20240",
  /* HORAIRES : renseignez vos horaires d'ouverture du magasin dès que
     possible — Google les reprend sur votre fiche établissement. Tant que
     le tableau est vide, la page Contact affiche « Sur rendez-vous », ce
     qui reste vrai pour le relevé et l'essayage à domicile. */
  hours: [] as { days: string; time: string }[],
  url: "https://www.tapitoutmaroc.com",
  copyright: "© 2026 - TAPITOUT MAROC - Tous droits réservés.",
};

export const process = [
  {
    label: "01 / Écouter",
    title: "Le relevé",
    body: "Nous venons chez vous mesurer la pièce au centimètre : longueurs, angles, seuils de porte, zones de passage. Nous notons aussi ce qu'aucun plan ne montre — la circulation, l'ouverture des portes, la place réelle des meubles.",
    duration: "Sur rendez-vous",
    image: "/images/gal-1.jpg",
  },
  {
    label: "02 / Choisir",
    title: "Analyse de vos besoins",
    body: "Nous apportons les échantillons chez vous et les posons à l'endroit exact, sous votre lumière. Densité, hauteur de poil, teinte : le choix se fait devant votre sol, jamais sous un éclairage de showroom.",
    duration: "Essayage à domicile",
    image: "/images/col-calmora.jpg",
  },
  {
    label: "03 / Façonner",
    title: "L'atelier",
    body: "La taille est arrêtée au millimètre à partir du relevé. Toutes formes : salons en L, couloirs, escaliers, pièces sous pente, découpes autour d'obstacles. Puis la bordure, selon l'une de nos quatre finitions.",
    duration: "Fabrication sur mesure",
    image: "/images/gal-texture.jpg",
  },
  {
    label: "04 / Poser",
    title: "La livraison",
    body: "Livraison partout au Maroc en emballage protégé. Pose assurée sur demande, avec vérification des alignements et des jeux de seuil avant notre départ.",
    duration: "Partout au Maroc",
    image: "/images/gal-salon-bois.jpg",
  },
];

/* GALERIE — les proportions sont celles des fichiers : la grille les
   respecte au lieu de tout recadrer au même format, ce qui permet de
   mélanger portraits et paysages sans rogner un tapis. */
/* GALERIE — toutes les vignettes partagent le meme format : c'est ce qui
   donne une grille calme. Des hauteurs inégales, colonne par colonne,
   fatiguent l'œil et brouillent la lecture des légendes. */
export const gallery = [
  {
    title: "Forme libre, grande dimension",
    meta: "Sur mesure · Contour organique",
    image: "/images/gal-forme-libre.jpg",
  },
  {
    title: "Salon marocain",
    meta: "Casablanca · Sur mesure",
    image: "/images/gal-1.jpg",
  },
  {
    title: "Habillage d'escalier",
    meta: "Marches sur mesure · Motif graphique",
    image: "/images/gal-escalier.jpg",
  },
  {
    title: "Relief et matière",
    meta: "Détail · Poil sculpté",
    image: "/images/gal-texture.jpg",
  },
  {
    title: "Le calme comme matière",
    meta: "Résidentiel · Rabat",
    image: "/images/gal-3.jpg",
  },
  {
    title: "Une pièce, une ambiance",
    meta: "Séjour · Grande surface",
    image: "/images/gal-salon-bois.jpg",
  },
  {
    title: "Courbes et lumière",
    meta: "Séjour · Contour libre",
    image: "/images/bespoke-5.jpg",
  },
  {
    title: "Motif dessiné dans la matière",
    meta: "Pièce unique · Façonnage",
    image: "/images/bespoke-3.jpg",
  },
  {
    title: "Contournement sur mesure",
    meta: "Découpe · Obstacle intégré",
    image: "/images/bespoke-4.jpg",
  },
];



/* ------------------------------------------------------------------
   BLOC EXPERTISE — « Bespoke design »
   Photos du diaporama : public/images/bespoke-1.jpg a bespoke-5.jpg
   Si aucune n'est presente, un cadre de remplacement s'affiche.
   ------------------------------------------------------------------ */
export const bespoke = {
  eyebrow: "NOTRE EXPERTISE",
  title: "Bespoke design",
  /* Une phrase courte qui porte l'idée, mise en avant. */
  claim: "Il n'en existe qu'un exemplaire, et il est aux dimensions de votre lieu.",
  /* L'explication, en retrait : sur une image, le texte long doit s'effacer
     derrière la phrase forte. */
  body: "Un tapis vendu au format oblige la pièce à s'adapter. Nous faisons l'inverse : le contour épouse la courbe d'un canapé, contourne un pilier, s'arrête au millimètre où le sol doit reprendre.",
  /* Les capacités tiennent sur une ligne, séparées par des points. Quatre
     coches en deux colonnes alourdissaient l'image. */
  points: [
    "Formes libres",
    "Découpes autour des obstacles",
    "Grandes dimensions",
    "Escaliers et pièces sous pente",
  ],
  images: [
    {
      src: "/images/bespoke-1.jpg",
      alt: "Grand salon avec tapis sur mesure de forme libre",
    },
    {
      src: "/images/bespoke-2.jpg",
      alt: "Chambre habillée d'un tapis aux contours courbes",
    },
    {
      src: "/images/bespoke-3.jpg",
      alt: "Tapis à motif abstrait découpé en forme organique",
    },
    {
      src: "/images/bespoke-4.jpg",
      alt: "Tapis contourné autour d'une jardinière en pierre",
    },
    {
      src: "/images/bespoke-5.jpg",
      alt: "Salon ouvert sur la montagne avec tapis aux bords libres",
    },
  ],
};


/* ------------------------------------------------------------------
   INVITATION (fenêtre d'accueil)
   Textes et réglages de la fenêtre qui propose l'essayage à domicile.
   Pour la désactiver complètement : enabled: false.
   ------------------------------------------------------------------ */
export const invite = {
  enabled: true,
  eyebrow: "LE SERVICE QUI CHANGE TOUT",
  title: "Essayez le tapis chez vous, avant de choisir",
  body: "Nous apportons les matières à votre domicile et les posons à l'endroit exact, sous votre lumière. Le relevé au millimètre se fait dans la foulée.",
  primary: "Demander un essayage",
  secondary: "Voir les collections",
  image: "/images/col-calmora.jpg",
  /* Déclencheurs : la fenêtre attend que le visiteur soit engagé —
     45 % de la page lue, ou 25 s passées, ou un départ vers l'onglet.
     Jamais à l'arrivée : c'est ce que Google sanctionne sur mobile. */
  scrollPercent: 45,
  delaySeconds: 25,
  /* Nombre de jours avant de la reproposer à quelqu'un qui l'a fermée. */
  snoozeDays: 14,
};

/* ------------------------------------------------------------------
   PAGE À PROPOS
   Rédigée uniquement à partir de ce que le site affirme déjà : relevé sur
   place, essayage à domicile, façonnage au millimètre, quatre finitions
   internes, livraison et pose. Aucune date de création ni effectif n'y
   figure — ajoutez-les si vous souhaitez les rendre publics.
   ------------------------------------------------------------------ */
export const about = {
  eyebrow: "LA MAISON",
  title: "Un atelier, pas un revendeur",
  intro:
    "Tapitout façonne des tapis sur mesure à Casablanca. Nous ne vendons pas des pièces prises sur un stock : chaque tapis est relevé chez vous, taillé à vos dimensions et fini dans notre atelier.",
  image: "/images/fondateurs.jpg",
  imageAlt: "Firaz et Badie, cofondateurs de Tapitout, dans l'atelier",
  manifestoTitle: "Aucune étape n'est confiée à un tiers",
  manifestoBody:
    "Le relevé, le choix de la matière, la coupe, la bordure, la pose : tout se fait entre nos mains. C'est ce qui nous permet de répondre d'une pièce quand elle porte notre nom, et de reprendre nous-mêmes ce qui doit l'être.",
  values: [
    {
      title: "Le relevé avant tout",
      body: "Longueurs, angles, seuils, retours de mur, zones de passage : la taille est arrêtée au millimètre, chez vous, avant que rien ne soit lancé.",
      icon: "/images/value-1.svg",
    },
    {
      title: "La matière selon l'usage",
      body: "Densité, hauteur de poil et finition se choisissent selon la vie réelle du lieu : passage intense ou chambre calme, enfants, animaux, exposition au soleil.",
      icon: "/images/value-2.svg",
    },
    {
      title: "Quatre finitions maîtrisées",
      body: "Couture machine pour la régularité, couture manuelle pour les formes complexes, résine pour un bord invisible, galon semi-cuir pour un contour affirmé.",
      icon: "/images/value-3.svg",
    },
  ],
  teamEyebrow: "L'ÉQUIPE",
  teamTitle: "Les mains derrière chaque pièce",
  /* Pour ajouter quelqu'un : dupliquez une ligne et renseignez la photo
     (déposée dans public/images). Sans photo, un cadre neutre s'affiche.

     L'association nom / portrait a été confirmée : Firaz est l'homme au
     manteau sombre, Badie celui à lunettes. Ne pas intervertir les deux
     chemins ci-dessous. */
  team: [
    { name: "Firaz", role: "Direction", photo: "/images/direction-1.jpg" },
    { name: "Badie", role: "Direction", photo: "/images/direction-2.jpg" },
  ],
};

/* ------------------------------------------------------------------
   PAGE CONTACT
   ------------------------------------------------------------------ */
export const projectTypes = [
  "Salon / séjour",
  "Chambre",
  "Couloir ou escalier",
  "Hôtel, bureau, commerce",
  "Autre demande",
];


/* ------------------------------------------------------------------
   PROGRAMME PROFESSIONNELS (Trade Program)
   Les conditions commerciales — remise, minimum de commande, délais —
   relèvent de votre politique : elles sont laissées à compléter et ne
   s'affichent pas tant qu'elles sont entre crochets.
   ------------------------------------------------------------------ */
export const trade = {
  eyebrow: "TRADE PROGRAM",
  title: "Un partenaire d'atelier pour les professionnels",
  intro:
    "Architectes d'intérieur, décorateurs, agenceurs, hôteliers, promoteurs : nous façonnons vos pièces sur mesure, du relevé sur site à la pose, avec un interlocuteur unique et des délais tenus.",
  /* A qui le programme s'adresse */
  audiences: [
    {
      titre: "Architectes & décorateurs",
      texte: "Échantillons à la demande pour vos planches, relevé sur site et pièces façonnées aux cotes exactes de vos plans.",
    },
    {
      titre: "Hôtellerie & restauration",
      texte: "Grandes surfaces, couloirs, suites : matières tenant le passage intense, et rythme de pose adapté à votre exploitation.",
    },
    {
      titre: "Promoteurs & agenceurs",
      texte: "Séries de pièces sur plusieurs logements ou lots, avec constance de teinte et de finition d'une pièce à l'autre.",
    },
    {
      titre: "Revendeurs & showrooms",
      texte: "Approvisionnement en pièces sur mesure pour vos clients, sous votre nom si vous le souhaitez.",
    },
  ],
  /* Ce que le programme apporte */
  avantages: [
    {
      titre: "Tarifs professionnels",
      texte: "[À COMPLÉTER : remise consentie aux professionnels, et conditions d'obtention.]",
    },
    {
      titre: "Échantillons",
      texte: "[À COMPLÉTER : envoi d'échantillons — gratuit, payant, nombre par demande.]",
    },
    {
      titre: "Relevé sur site",
      texte: "Nous nous déplaçons sur votre chantier et relevons au millimètre : angles, seuils, retours de mur, découpes.",
    },
    {
      titre: "Interlocuteur unique",
      texte: "Un seul contact du devis à la pose, qui connaît votre dossier et vos contraintes de planning.",
    },
    {
      titre: "Toutes formes, toutes dimensions",
      texte: "Formes libres, courbes, découpes autour des obstacles, escaliers et pièces sous pente.",
    },
    {
      titre: "Livraison et pose",
      texte: "Partout au Maroc, en emballage protégé, avec pose assurée sur demande.",
    },
  ],
  /* Comment on entre dans le programme */
  etapes: [
    {
      titre: "Vous vous présentez",
      texte: "Remplissez le formulaire ci-dessous avec votre activité et votre société.",
    },
    {
      titre: "Nous validons votre compte",
      texte: "Nous vérifions votre registre de commerce et votre ICE, puis nous vous transmettons les conditions applicables à votre profession. [À COMPLÉTER : délai de réponse.]",
    },
    {
      titre: "Vous commandez",
      texte: "Tarifs professionnels appliqués, devis sous votre référence de chantier, suivi jusqu'à la pose.",
    },
  ],
  /* Formes juridiques courantes au Maroc. */
  formes: [
    "SARL",
    "SARL AU",
    "SA",
    "SNC",
    "Auto-entrepreneur",
    "Association / institution",
    "Autre",
  ],
  /* Volume declare : sert a orienter les conditions, pas a exclure. */
  volumes: [
    "Moins de 5 projets par an",
    "5 à 20 projets par an",
    "Plus de 20 projets par an",
    "Premier projet avec vous",
  ],
  /* Metiers proposes dans le formulaire */
  metiers: [
    "Architecte d'intérieur",
    "Décorateur",
    "Agenceur / menuisier",
    "Hôtellerie / restauration",
    "Promoteur immobilier",
    "Revendeur / showroom",
    "Autre profession",
  ],
};

export const legalLinks = [
  { label: "Mentions légales", href: "/mentions-legales" },
  { label: "Politique de confidentialité", href: "/confidentialite" },
  { label: "Conditions générales", href: "/conditions-generales" },
];

export const navLinks = [
  { label: "Accueil", href: "/" },
  { label: "Collections", href: "/collections" },
  { label: "Savoir-faire", href: "/savoir-faire" },
  { label: "À propos", href: "/a-propos" },
  { label: "Professionnels", href: "/professionnels" },
  { label: "Contact", href: "/contact" },
];

export type Collection = {
  slug: string;
  name: string;
  status: string;
  year: string;
  image: string;
  /* DESCRIPTION : deux ou trois phrases sur la matière, le tissage et
     l'usage auquel la collection est destinée. À compléter. */
  description: string;
  wide?: boolean;
};

export const collections: Collection[] = [
  {
    slug: "calmora",
    name: "Collection Calmora",
    status: "Disponible au magasin",
    year: "2026",
    image: "/images/col-calmora.jpg",
    description:
      "Un rouge profond, presque bordeaux, à la surface veloutée qui change de nuance selon l'angle de la lumière. Une pièce qui réchauffe un salon sobre et supporte les grands volumes.\n\n[À COMPLÉTER : matière, hauteur de poil, teintes disponibles.]",
  },
  {
    slug: "riviera",
    name: "Collection Riviera",
    status: "Disponible au magasin",
    year: "2026",
    image: "/images/col-riviera.jpg",
    description:
      "Un dessin géométrique beige court sur un fond gris clair, en poil ras. Le motif structure la pièce sans l'alourdir : il tient dans un séjour contemporain comme dans une chambre.\n\n[À COMPLÉTER : matière, hauteur de poil, teintes disponibles.]",
  },
  {
    slug: "costa",
    name: "Collection Costa",
    status: "Disponible au magasin",
    year: "2026",
    image: "/images/col-costa.jpg",
    description:
      "[À COMPLÉTER — l'image actuellement associée à cette collection est un visuel de présentation, pas une photo de tapis. Remplacez public/images/col-costa.jpg par une photo du produit, puis décrivez-le ici.]",
    wide: true,
  },
  {
    slug: "elan",
    name: "Collection Élan",
    status: "Disponible au magasin",
    year: "2026",
    image: "/images/col-elan.jpg",
    description:
      "Un tracé courbe dessiné dans la matière : deux hauteurs de poil se répondent sur un fond sable, et le dessin apparaît selon la lumière. La pièce la plus graphique de la maison.\n\n[À COMPLÉTER : matière, hauteur de poil, teintes disponibles.]",
  },
  {
    slug: "eclipse",
    name: "Collection Eclipse",
    status: "Disponible au magasin",
    year: "2026",
    image: "/images/col-eclipse.jpg",
    description:
      "Un uni doré à reflets, sans motif : toute la présence vient de la matière et de sa façon de capter la lumière rasante. À poser dans une pièce claire, où il tient le rôle principal.\n\n[À COMPLÉTER : matière, hauteur de poil, teintes disponibles.]",
  },
];

/* Chaque prestation est illustrée : une page qui vend de la matière et du
   toucher ne peut pas être un mur de texte. */
export const services = [
  {
    title: "Prise de mesure",
    body: "Nous nous déplaçons chez vous. Relevé au centimètre : longueurs, angles, seuils de porte, retours de mur, zones de passage. Nous notons aussi ce qui n'apparaît sur aucun plan — la circulation, l'ouverture des portes, la position réelle des meubles. Un relevé juste conditionne tout le reste.",
    image: "/images/gal-1.jpg",
    alt: "Relevé des dimensions d'une pièce chez un client",
  },
  {
    title: "Essayage",
    body: "Un tapis ne se choisit pas sous un éclairage de showroom. Nous apportons les matières chez vous et les posons à l'endroit exact, sous votre lumière. Vous voyez la teinte réagir au matin et au soir, la texture répondre à votre sol. Vous décidez ensuite.",
    image: "/images/col-calmora.jpg",
    alt: "Matière veloutée présentée dans un intérieur",
  },
  {
    title: "Expertise",
    body: "Densité, matière, hauteur de poil, sens du tissage, type de finition. Chaque choix engage l'entretien, le confort et la durée de vie de la pièce. Nous orientons selon l'usage réel de l'espace : passage intense ou chambre calme, enfants, animaux, exposition au soleil.",
    image: "/images/gal-texture.jpg",
    alt: "Détail du relief et de la hauteur de poil d'un tapis",
  },
  {
    title: "Façonnage sur mesure",
    body: "Toutes dimensions, toutes formes. Salons en L, couloirs, escaliers, pièces sous pente, découpes autour d'obstacles. La taille est arrêtée au millimètre à partir du relevé, sans approximation ni reprise.",
    image: "/images/gal-forme-libre.jpg",
    alt: "Grand tapis à contour libre façonné sur mesure",
  },
  {
    title: "Finitions de bordure",
    body: "Quatre techniques maîtrisées en interne : couture machine pour la régularité, couture manuelle pour les formes complexes, finition invisible à la résine pour les bords nets, galon semi-cuir pour un contour affirmé. Le choix se fait avec la matière, jamais avant.",
    image: "/images/col-riviera.jpg",
    alt: "Détail du tissage et de la bordure d'un tapis",
  },
  {
    title: "Livraison & pose",
    body: "Livraison partout au Maroc, emballage protégé. Pose assurée sur demande, avec vérification des alignements et des jeux de seuil avant notre départ.",
    image: "/images/gal-salon-bois.jpg",
    alt: "Tapis posé dans un séjour",
  },
];


/* CHIFFRES : communiqués par la maison. Vérifiez-les avant chaque mise en
   ligne — un chiffre faux se retourne vite contre une maison.

   Le nombre et son unité sont séparés : le compteur anime le chiffre seul,
   et l'unité se compose plus petite à côté. Une entrée sans unité laisse
   simplement le champ vide. */
export const stats = [
  { value: "1 200", unit: "", label: "Projets réalisés" },
  { value: "+100 000", unit: "m²", label: "Surface installée" },
  { value: "40", unit: "ans", label: "Années d'expérience" },
];

/* RÉSEAUX SOCIAUX : renseignez l'adresse complète de vos pages, par exemple
   "https://www.instagram.com/tapitout.maroc". Un lien laissé vide n'est pas
   affiché — mieux vaut aucun lien qu'un lien qui renvoie sur l'accueil du
   réseau, où le visiteur ne vous trouvera pas. */
export const socialLinks = [
  { label: "Instagram", href: "" },
  { label: "Facebook", href: "" },
];
