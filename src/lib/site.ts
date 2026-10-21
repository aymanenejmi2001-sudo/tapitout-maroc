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
/* RÉALISATIONS : seize chantiers photographiés chez les clients de la
   maison. Ces vues ont remplacé les visuels du template d'origine, qui
   montraient le travail d'autres marques sous le titre « Réalisations ».

   Les intitulés décrivent ce que la photographie montre. Pour afficher
   la ville d'un chantier, complétez le champ meta — rien n'est inventé
   ici, une localisation fausse se vérifie trop facilement. */
export const gallery = [
  {
    title: "Grand séjour, tapis pleine largeur",
    meta: "Chantier livré · Pose sur marbre",
    image: "/images/realisations/projet-1.webp",
  },
  {
    title: "Salon courbe autour de la cheminée",
    meta: "Chantier livré · Découpe sur mesure",
    image: "/images/realisations/projet-2.webp",
  },
  {
    title: "Séjour traversant, baies pleine hauteur",
    meta: "Chantier livré · Grande dimension",
    image: "/images/realisations/projet-3.webp",
  },
  {
    title: "Double salon, assises en vis-à-vis",
    meta: "Chantier livré · Deux pièces assorties",
    image: "/images/realisations/projet-4.webp",
  },
  {
    title: "Séjour clair, tapis bord à bord",
    meta: "Chantier livré · Pose au millimètre",
    image: "/images/realisations/projet-5.webp",
  },
  {
    title: "Salon contemporain, assises blanches",
    meta: "Chantier livré · Poil ras",
    image: "/images/realisations/projet-6.webp",
  },
  {
    title: "Pièce de réception sous lustre",
    meta: "Chantier livré · Contour ajusté",
    image: "/images/realisations/projet-7.webp",
  },
  {
    title: "Plateau de bureaux",
    meta: "Chantier livré · Dalles, passage intense",
    image: "/images/realisations/projet-8.webp",
  },
  {
    title: "Séjour en longueur",
    meta: "Chantier livré · Sol poli",
    image: "/images/realisations/projet-9.webp",
  },
  {
    title: "Salon aux voilages",
    meta: "Chantier livré · Teinte claire",
    image: "/images/realisations/projet-10.webp",
  },
  {
    title: "Salon cuir et marbre",
    meta: "Chantier livré · Tapis rond",
    image: "/images/realisations/projet-11.webp",
  },
  {
    title: "Séjour aux tables basses bois",
    meta: "Chantier livré · Sur mesure",
    image: "/images/realisations/projet-12.webp",
  },
  {
    title: "Grand salon d'angle",
    meta: "Chantier livré · Très grande surface",
    image: "/images/realisations/projet-13.webp",
  },
  {
    title: "Espace de travail, vue dégagée",
    meta: "Chantier livré · Tertiaire",
    image: "/images/realisations/projet-14.webp",
  },
  {
    title: "Coin salon, assises basses",
    meta: "Chantier livré · Tapis rond",
    image: "/images/realisations/projet-15.webp",
  },
  {
    title: "Séjour face à la mer",
    meta: "Chantier livré · Contour libre",
    image: "/images/realisations/projet-16.webp",
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
      alt: "Salon de riad, grand tapis sur mesure sous une lumière rasante",
    },
    {
      src: "/images/bespoke-2.jpg",
      alt: "Tapis au contour libre dans une pièce aux murs sable",
    },
    {
      src: "/images/bespoke-3.jpg",
      alt: "Tapis découpé en forme organique devant une baie voilée",
    },
    {
      src: "/images/bespoke-4.jpg",
      alt: "Grand tapis à vagues sculptées, ouvert sur l'océan",
    },
    {
      src: "/images/bespoke-5.jpg",
      alt: "Majlis clair, tapis pleine surface au tissage apparent",
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
  /* Les autres prises de vue de la pièce. La fiche les affiche sous la
     photo principale ; une collection qui n'en a qu'une reste valable. */
  gallery?: string[];
  /* DESCRIPTION : ce que la photographie montre, et rien de plus. Les
     caractéristiques techniques — matière, hauteur de poil, dimensions
     disponibles — ne peuvent pas être devinées : elles sont signalées
     entre crochets et [sansRappels] les retire de l'affichage tant
     qu'elles ne sont pas renseignées. */
  description: string;
  wide?: boolean;
};

/* LE CATALOGUE RÉEL DE LA MAISON — onze collections, photographiées à
   l'atelier. Les descriptions ci-dessous décrivent uniquement ce qui est
   visible sur la prise de vue : le dessin, la couleur, le relief. Tout ce
   qui relève de la fiche technique reste à compléter par la maison. */
export const collections: Collection[] = [
  {
    slug: "riviera",
    name: "Collection Riviera",
    status: "Disponible au magasin",
    year: "2026",
    image: "/images/collections/riviera-3.webp",
    gallery: [
      "/images/collections/riviera-1.webp",
      "/images/collections/riviera-2.webp",
      "/images/collections/riviera-4.webp",
    ],
    description:
      "La pièce la plus affirmée de la maison. De larges courbes rouge profond se croisent sur un fond crème, dans un dessin qui tient de l'enseigne peinte à la main. La même collection se décline en version graphique : un entrelacs de lignes dorées sur fond gris bleuté, beaucoup plus retenu.\n\nÀ poser dans une pièce sobre, où elle tiendra seule le rôle principal.\n\n[À COMPLÉTER : matière, hauteur de poil, teintes et dimensions disponibles.]",
  },
  {
    slug: "illusion",
    name: "Collection Illusion",
    status: "Disponible au magasin",
    year: "2026",
    image: "/images/collections/illusion-3.webp",
    gallery: [
      "/images/collections/illusion-1.webp",
      "/images/collections/illusion-2.webp",
      "/images/collections/illusion-4.webp",
    ],
    description:
      "Une surface peinte plutôt que tissée : des lavis superposés où le rouille, l'ocre et le bleu d'encre affleurent sous un gris de lin. Aucun motif ne se répète, l'œil ne trouve jamais deux fois le même endroit.\n\nC'est la collection la plus colorée du catalogue, et celle qui supporte le mieux un intérieur très dépouillé.\n\n[À COMPLÉTER : matière, hauteur de poil, teintes et dimensions disponibles.]",
  },
  {
    slug: "eclipse",
    name: "Collection Eclipse",
    status: "Disponible au magasin",
    year: "2026",
    image: "/images/collections/eclipse-1.webp",
    gallery: ["/images/collections/eclipse-2.webp"],
    description:
      "Le dessin n'est pas teint, il est sculpté. Des vagues continues sont taillées dans l'épaisseur du poil : deux hauteurs se répondent, et le motif n'apparaît vraiment que lorsque la lumière arrive de côté. Au zénith, le tapis redevient uni.\n\nUne seconde version pousse le contraste, en brun et crème.\n\n[À COMPLÉTER : matière, hauteur de poil, teintes et dimensions disponibles.]",
  },
  {
    slug: "ms-luxe",
    name: "Collection MS Luxe",
    status: "Disponible au magasin",
    year: "2026",
    image: "/images/collections/ms-luxe-1.webp",
    gallery: ["/images/collections/ms-luxe-2.webp"],
    description:
      "Un relief de pierre fendue, comme une terre sèche vue de haut. Les veines sont creusées dans la matière et dessinent des plaques irrégulières aux tons de sable et de terre d'ombre.\n\nLa pièce la plus sculpturale de la maison : elle se regarde autant qu'elle se foule.\n\n[À COMPLÉTER : matière, hauteur de poil, teintes et dimensions disponibles.]",
  },
  {
    slug: "como",
    name: "Collection Como",
    status: "Disponible au magasin",
    year: "2026",
    image: "/images/collections/como-2.webp",
    gallery: [
      "/images/collections/como-1.webp",
      "/images/collections/como-3.webp",
    ],
    description:
      "Des formes ouvertes, cernées d'un trait d'or, posées sur un fond de lin. Le dessin reste ample et ne sature jamais la surface : il structure la pièce sans la fermer.\n\nLa collection se décline aussi en grandes arches concentriques et en projections dorées sur fond crème.\n\n[À COMPLÉTER : matière, hauteur de poil, teintes et dimensions disponibles.]",
  },
  {
    slug: "velaris",
    name: "Collection Velaris",
    status: "Disponible au magasin",
    year: "2026",
    image: "/images/collections/velaris-1.webp",
    gallery: [
      "/images/collections/velaris-2.webp",
      "/images/collections/velaris-3.webp",
    ],
    description:
      "Un camaïeu de sable, sans motif ni bord : la couleur se dépose par nappes, plus dense ici, presque blanchie là, comme un enduit passé à la main.\n\nC'est la pièce la plus silencieuse du catalogue, faite pour une pièce déjà chargée ou pour laisser le mobilier parler seul.\n\n[À COMPLÉTER : matière, hauteur de poil, teintes et dimensions disponibles.]",
  },
  {
    slug: "flec",
    name: "Collection Flec",
    status: "Disponible au magasin",
    year: "2026",
    image: "/images/collections/flec-1.webp",
    gallery: [
      "/images/collections/flec-2.webp",
      "/images/collections/flec-3.webp",
    ],
    description:
      "Un losange répété, creusé dans le poil, qui donne à la surface un grain régulier de vannerie. La lumière s'accroche sur les arêtes et le dessin change selon l'endroit d'où on le regarde.\n\nUne variante abandonne la trame pour un gris charbon usé, beaucoup plus libre.\n\n[À COMPLÉTER : matière, hauteur de poil, teintes et dimensions disponibles.]",
  },
  {
    slug: "euphoria",
    name: "Collection Euphoria",
    status: "Disponible au magasin",
    year: "2026",
    image: "/images/collections/euphoria-1.webp",
    description:
      "Un veinage de marbre, gris sur blanc cassé, où le trait se fend et se ramifie sans jamais se refermer. Le dessin couvre toute la surface mais reste clair : il éclaire la pièce au lieu de l'alourdir.\n\n[À COMPLÉTER : matière, hauteur de poil, teintes et dimensions disponibles.]",
  },
  {
    slug: "india",
    name: "Collection India",
    status: "Disponible au magasin",
    year: "2026",
    image: "/images/collections/india-2.webp",
    gallery: ["/images/collections/india-1.webp"],
    description:
      "Ici le motif, c'est la matière. Des boucles serrées, nouées une à une, forment un relief dru d'écru et de blé qu'on sent sous le pied avant de le voir.\n\nAucun dessin, aucune teinte rapportée : la pièce la plus brute de la maison, et la plus chaude.\n\n[À COMPLÉTER : matière, hauteur de poil, teintes et dimensions disponibles.]",
  },
  {
    slug: "cloff",
    name: "Collection Cloff",
    status: "Disponible au magasin",
    year: "2026",
    image: "/images/collections/cloff-1.webp",
    gallery: [
      "/images/collections/cloff-2.webp",
      "/images/collections/cloff-3.webp",
    ],
    description:
      "Une côte fine et régulière, tissée à plat, dans des tons de lin et de craie. Rien ne dépasse, rien n'accroche : c'est un fond, au sens le plus noble du terme.\n\nLa pièce à choisir quand le tapis doit tenir la pièce sans se faire remarquer.\n\n[À COMPLÉTER : matière, hauteur de poil, teintes et dimensions disponibles.]",
  },
  {
    slug: "diamond",
    name: "Collection Diamond",
    status: "Disponible au magasin",
    year: "2026",
    image: "/images/collections/diamond-1.webp",
    gallery: ["/images/collections/diamond-2.webp"],
    description:
      "Un uni, sans aucun dessin. Toute la présence vient du fil, qui renvoie la lumière différemment selon le sens du poil : la même pièce paraît plus claire d'un bout de la pièce, plus profonde de l'autre.\n\n[À COMPLÉTER : matière, hauteur de poil, teintes et dimensions disponibles.]",
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
