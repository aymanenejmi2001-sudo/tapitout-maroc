/* Le Journal : des guides pour choisir, poser et entretenir un tapis.

   RÈGLES D'ÉCRITURE — elles découlent des consignes de Google sur le contenu
   utile, écrit pour les lecteurs et non pour les moteurs :

   — chaque article répond à une vraie question que se pose un client, et la
     traite à fond ; on n'en publie pas davantage qu'on n'en peut écrire
     correctement ;
   — ce que dit Tapitout de sa propre méthode (relevé, essayage, atelier,
     finitions, pose) est repris tel qu'écrit dans site.ts, sans rien y
     ajouter : ni prix, ni délai, ni chiffre qui n'y figure pas ;
   — le reste relève de connaissances courantes sur les fibres, les
     dimensions et l'entretien, formulées avec prudence (« en général »,
     « souvent ») quand ce sont des usages et non des règles ;
   — les photographies sont celles de vos chantiers et de vos collections ;
   — les dates sont les vraies : on ne « rafraîchit » pas un article en
     changeant sa date, on la change quand le texte change vraiment.

   TOUT ARTICLE DOIT ÊTRE RELU AVANT PUBLICATION par quelqu'un de la maison :
   ce texte a été rédigé avec l'aide d'un outil d'IA, et c'est votre savoir-
   faire de terrain qui lui donne sa valeur. Ajoutez-y ce que vous seul
   savez — un cas rencontré, un conseil appris sur un chantier. */

/* Blocs de contenu. Dans un texte, [mot](/chemin/) fait un lien interne et
   **mot** met en valeur : rien d'autre, volontairement. */
export type Bloc =
  | { type: "p"; texte: string }
  | { type: "h2"; texte: string }
  | { type: "h3"; texte: string }
  | { type: "ul"; items: string[] }
  | { type: "ol"; items: string[] }
  | { type: "encart"; titre: string; texte?: string; items?: string[] };

export type Article = {
  slug: string;
  titre: string;
  /* Entre 120 et 160 caractères : c'est ce que Google affiche dans les
     résultats. Elle est relue comme le reste. */
  description: string;
  /* Phrase d'accroche de la liste d'articles. */
  extrait: string;
  categorie: string;
  /* ISO 8601, avec fuseau horaire : Google le demande. */
  publie: string;
  modifie: string;
  image: string;
  imageAlt: string;
  /* Collections proposées en fin d'article, par leur identifiant. */
  collections: string[];
  /* Autres articles à lire ensuite, par leur identifiant. */
  aLire: string[];
  contenu: Bloc[];
};

export const articles: Article[] = [
  {
    slug: "comment-choisir-un-tapis-sur-mesure-pour-son-salon",
    titre: "Comment choisir un tapis sur mesure pour son salon",
    description:
      "Rôle, dimensions, matière, hauteur de poil, teinte : les cinq questions à trancher avant de commander un tapis sur mesure pour votre salon.",
    extrait:
      "Cinq questions à trancher dans l'ordre, avant de commander : ce qui compte vraiment, et ce qui se décide mieux chez vous qu'en magasin.",
    categorie: "Guide",
    publie: "2026-10-31T09:00:00+01:00",
    modifie: "2026-10-31T09:00:00+01:00",
    image: "/images/realisations/projet-5.webp",
    imageAlt:
      "Salon aux canapés en cuir cognac posé sur un grand tapis clair à motif de losanges, sol en marbre poli",
    collections: ["velaris", "riviera", "eclipse"],
    aLire: [
      "quelle-taille-de-tapis-pour-un-salon",
      "quelle-matiere-de-tapis-choisir",
    ],
    contenu: [
      {
        type: "p",
        texte:
          "Un tapis standard se choisit parmi ce qui existe : trois ou quatre formats, quelques teintes, et l'on s'adapte. Un tapis sur mesure renverse la question : on part de la pièce, de vos meubles et de votre façon de vivre, puis on dessine le tapis qui leur correspond. Cette liberté a un revers : il faut savoir quoi décider, et dans quel ordre.",
      },
      {
        type: "p",
        texte:
          "Voici les cinq questions à trancher, dans l'ordre où elles se posent. Elles valent pour un salon, mais la démarche est la même pour une chambre ou une salle à manger.",
      },
      { type: "h2", texte: "1. À quoi sert ce tapis ?" },
      {
        type: "p",
        texte:
          "Avant la matière ou la couleur, nommez le rôle du tapis. Il peut **rassembler** un coin salon qui flotte au milieu d'une grande pièce, **réchauffer** un sol en marbre ou en carrelage, **amortir** le bruit et l'écho, ou simplement **donner du caractère** à un intérieur sobre. Un tapis qui doit surtout réchauffer et absorber les sons n'a pas les mêmes exigences qu'un tapis qui doit tenir sous le passage quotidien de toute la famille.",
      },
      { type: "h2", texte: "2. Quelles dimensions ?" },
      {
        type: "p",
        texte:
          "C'est l'erreur la plus fréquente : un tapis trop petit, qui flotte au milieu du salon sans relier les meubles. Partez de l'emplacement des canapés et des fauteuils, pas des murs. Les repères courants sont détaillés dans [notre guide sur la taille d'un tapis de salon](/journal/quelle-taille-de-tapis-pour-un-salon/). Le sur-mesure permet ici ce qu'un format du commerce ne permet pas : suivre la forme réelle de la pièce, y compris un salon en L ou un angle.",
      },
      { type: "h2", texte: "3. Quelle matière, pour quelle vie ?" },
      {
        type: "p",
        texte:
          "La matière engage l'entretien, le confort et la durée de vie du tapis. Elle se choisit selon l'usage réel de la pièce : passage intense ou espace calme, enfants, animaux, exposition au soleil. Chaque fibre a ses forces et ses faiblesses, que nous passons en revue dans [le guide des matières de tapis](/journal/quelle-matiere-de-tapis-choisir/).",
      },
      { type: "h2", texte: "4. Quelle hauteur de poil ?" },
      {
        type: "p",
        texte:
          "La hauteur de poil change autant l'usage que l'aspect. Un **poil ras** est plus facile à aspirer, laisse les chaises et les tables basses stables, et convient bien aux zones de passage. Un **poil haut** est plus moelleux sous le pied, mais retient davantage la poussière et marque plus facilement sous le poids des meubles.",
      },
      {
        type: "p",
        texte:
          "Entre les deux existent des surfaces à relief, où deux hauteurs de poil se côtoient dans un même tapis et dessinent un motif que l'on voit surtout sous une lumière rasante.",
      },
      { type: "h2", texte: "5. Quelle teinte, quel dessin ?" },
      {
        type: "p",
        texte:
          "La couleur d'un tapis n'est pas la même dans un catalogue, dans un magasin et dans votre salon. Elle réagit à la lumière du matin, à celle du soir, à la couleur de vos murs et de votre sol. C'est la décision la plus difficile à prendre sur photo, et c'est la raison pour laquelle nous apportons les échantillons chez vous et les posons à l'endroit exact où le tapis ira, avant que vous ne choisissiez.",
      },
      {
        type: "p",
        texte:
          "Un dessin marqué gagne à être entouré d'un décor calme ; un tapis très uni met en valeur le mobilier. Dans les deux cas, regardez l'échantillon à plusieurs heures de la journée.",
      },
      {
        type: "encart",
        titre: "Avant de passer commande",
        items: [
          "Notez l'emplacement définitif des canapés, des fauteuils et des tables basses.",
          "Repérez les portes qui s'ouvrent sur la zone du tapis, et les seuils.",
          "Décidez de l'usage dominant : passage, détente, enfants, animaux.",
          "Observez la pièce à deux moments de la journée.",
          "Demandez la composition exacte de la matière.",
        ],
      },
      { type: "h2", texte: "Et le budget ?" },
      {
        type: "p",
        texte:
          "Fixez d'abord les dimensions et l'usage, ensuite seulement le budget. Deux tapis de même taille peuvent différer fortement selon la matière et la densité : comparez toujours sur des dimensions identiques et une composition indiquée, pour éviter les fausses économies.",
      },
      { type: "h2", texte: "Ce que change le sur-mesure" },
      {
        type: "p",
        texte:
          "Un tapis sur mesure n'est pas seulement un tapis à la bonne taille : sa **forme**, ses **dimensions** et sa **bordure** sont décidées pour votre pièce. Chez Tapitout, la taille est arrêtée au millimètre à partir d'un relevé fait chez vous, et la bordure se choisit parmi quatre finitions : couture machine, couture manuelle, finition à la résine, galon semi-cuir. La démarche est détaillée sur [la page savoir-faire](/savoir-faire/).",
      },
      {
        type: "p",
        texte:
          "Si vous hésitez encore, le plus simple est de [prendre rendez-vous](/contact/) : le relevé et l'essayage se font chez vous, et c'est devant votre sol que le choix se fait.",
      },
    ],
  },

  {
    slug: "quelle-taille-de-tapis-pour-un-salon",
    titre: "Quelle taille de tapis pour un salon ? Les repères à connaître",
    description:
      "Pieds avant des canapés, marge autour du tapis, table à manger : les repères courants pour choisir les bonnes dimensions, et pourquoi la pièce a le dernier mot.",
    extrait:
      "Trop petit, un tapis flotte au milieu du salon. Les repères d'usage pour le dimensionner, et les cas où la pièce impose sa propre forme.",
    categorie: "Guide",
    publie: "2026-10-31T09:00:00+01:00",
    modifie: "2026-10-31T09:00:00+01:00",
    image: "/images/realisations/projet-1.webp",
    imageAlt:
      "Grand canapé d'angle gris clair posé sur un tapis clair uni, devant des rideaux",
    collections: ["diamond", "cloff", "velaris"],
    aLire: [
      "prise-de-mesures-tapis-a-domicile",
      "tapis-sur-mesure-forme-libre",
    ],
    contenu: [
      {
        type: "p",
        texte:
          "Un tapis trop petit est l'erreur la plus courante en décoration d'intérieur. Posé au milieu d'un salon, il ressemble à une île : il ne relie rien, laisse les meubles à distance et fait paraître la pièce plus petite. Choisir la bonne taille tient moins à une formule qu'à quelques repères simples.",
      },
      {
        type: "p",
        texte:
          "Les chiffres ci-dessous sont des repères d'usage, largement partagés par les décorateurs. Ce ne sont pas des règles absolues : c'est toujours la pièce, ses ouvertures et ses meubles qui ont le dernier mot.",
      },
      { type: "h2", texte: "Le principe : le tapis rassemble" },
      {
        type: "p",
        texte:
          "Un tapis de salon a un travail précis : relier les assises et la table basse en une seule zone, lisible d'un coup d'œil. Il doit donc être assez grand pour que les meubles principaux aient au moins une partie de leurs pieds dessus.",
      },
      {
        type: "h2",
        texte: "Trois façons de placer un tapis sous un salon",
      },
      {
        type: "ul",
        items: [
          "**Tous les pieds sur le tapis.** C'est la solution la plus enveloppante, celle qui convient aux grandes pièces : le coin salon forme un îlot cohérent. Elle demande un tapis nettement plus grand que la table basse.",
          "**Seuls les pieds avant sur le tapis.** C'est le compromis le plus courant. Les canapés et les fauteuils mordent sur le tapis, sans qu'il soit nécessaire de couvrir toute la pièce.",
          "**Un tapis seulement sous la table basse.** Aucun meuble n'y touche. C'est la configuration où un tapis paraît le plus souvent trop petit ; elle ne se justifie que si l'on veut un effet volontairement léger.",
        ],
      },
      { type: "h2", texte: "Laisser du sol visible autour" },
      {
        type: "p",
        texte:
          "En général, on laisse entre le bord du tapis et les murs une marge de sol visible, souvent de l'ordre de 30 à 50 centimètres. Elle donne à la pièce un cadre et évite l'effet de moquette. Dans une petite pièce, la marge peut être réduite ; dans une très grande, elle peut être plus large.",
      },
      { type: "h2", texte: "Sous une table à manger" },
      {
        type: "p",
        texte:
          "La règle qui compte ici : le tapis doit rester sous les chaises quand on les recule pour s'asseoir. On compte donc, couramment, environ 60 centimètres de tapis au-delà du bord de la table, de chaque côté. Un tapis qui s'arrête au ras de la table fait buter les pieds de chaise sur son bord.",
      },
      { type: "h2", texte: "Quand la pièce impose sa forme" },
      {
        type: "p",
        texte:
          "Les repères précédents supposent un salon rectangulaire et dégagé. Beaucoup de pièces ne le sont pas : salon en L, angle, colonne, cheminée, porte qui s'ouvre sur la zone, seuil entre deux espaces, couloir, escalier. Ces contraintes expliquent pourquoi un format standard donne si souvent un résultat approximatif.",
      },
      {
        type: "p",
        texte:
          "C'est le cas typique où le sur-mesure change le résultat : au lieu de choisir entre trois formats, on relève la pièce (longueurs, angles, seuils de porte, retours de mur, zones de passage) et le tapis est découpé pour elle. Ce relevé est décrit dans [notre article sur la prise de mesures à domicile](/journal/prise-de-mesures-tapis-a-domicile/).",
      },
      {
        type: "encart",
        titre: "Un test simple avant de commander",
        texte:
          "Dessinez au sol le contour du futur tapis avec du ruban de masquage, et vivez quelques jours avec. Vous verrez tout de suite si les pieds des canapés tombent au bon endroit, si une porte frotte, si la circulation reste naturelle.",
      },
      { type: "h2", texte: "Les erreurs fréquentes" },
      {
        type: "ul",
        items: [
          "Choisir la taille d'après la table basse plutôt que d'après les canapés.",
          "Oublier l'ouverture des portes : un tapis épais peut les gêner.",
          "Laisser le tapis toucher les murs, ce qui supprime tout cadre visible.",
          "Prendre la taille du dessous pour économiser, alors que c'est la dimension qui fait l'effet.",
        ],
      },
      {
        type: "p",
        texte:
          "Pour une pièce qui sort du rectangle, le plus fiable reste le relevé sur place. Vous pouvez [prendre rendez-vous](/contact/), ou parcourir [les collections](/collections/) pour repérer des matières et des teintes avant la visite.",
      },
    ],
  },

  {
    slug: "quelle-matiere-de-tapis-choisir",
    titre: "Quelle matière de tapis choisir selon l'usage de la pièce",
    description:
      "Laine, viscose, coton, fibres végétales, synthétiques : ce que chaque matière fait bien, ce qu'elle supporte mal, et comment choisir selon le passage, les enfants ou le soleil.",
    extrait:
      "Laine, viscose, coton, jute, synthétiques : ce que chaque fibre supporte, et celle qu'il faut choisir selon le passage, les enfants ou le soleil.",
    categorie: "Guide",
    publie: "2026-10-31T09:00:00+01:00",
    modifie: "2026-10-31T09:00:00+01:00",
    image: "/images/collections/india-2.webp",
    imageAlt: "Gros plan sur la matière d'un tapis à boucles serrées, tons écrus",
    collections: ["india", "cloff", "flec"],
    aLire: [
      "entretenir-un-tapis-en-laine",
      "comment-choisir-un-tapis-sur-mesure-pour-son-salon",
    ],
    contenu: [
      {
        type: "p",
        texte:
          "Le choix de la matière décide de ce que le tapis supportera : le passage, les taches, le soleil, l'humidité. C'est aussi ce qui fait l'écart le plus net entre deux tapis qui se ressemblent sur une photo. Voici les grandes familles de fibres, avec ce que chacune fait bien et ce qu'elle supporte mal.",
      },
      {
        type: "p",
        texte:
          "Beaucoup de tapis mélangent plusieurs fibres : la composition indiquée compte plus que le seul mot « laine » ou « soie » dans une description.",
      },
      { type: "h2", texte: "La laine" },
      {
        type: "p",
        texte:
          "C'est la fibre naturelle de référence pour les tapis. Elle est élastique : les fibres reprennent leur forme après avoir été écrasées, ce qui aide un tapis à bien vieillir. Elle isole du froid, amortit le bruit et supporte bien l'usage quotidien.",
      },
      {
        type: "ul",
        items: [
          "**Points forts :** résistance à l'écrasement, confort, chaleur, bonne tenue dans le temps.",
          "**À savoir :** une laine neuve perd quelques fibres lâches au début, ce qui est normal et s'atténue avec l'aspirateur ; elle n'aime pas rester longtemps humide.",
        ],
      },
      { type: "h2", texte: "La viscose" },
      {
        type: "p",
        texte:
          "Fibre issue de la cellulose, appréciée pour son aspect brillant et soyeux, qui donne de la profondeur aux dessins. Elle est en revanche plus fragile : elle supporte mal l'eau et s'abîme plus vite sous un passage intense.",
      },
      {
        type: "ul",
        items: [
          "**Points forts :** brillance, toucher doux, rendu des motifs.",
          "**À savoir :** l'eau peut laisser des auréoles. À réserver aux pièces calmes, hors zones humides, et à entretenir avec précaution.",
        ],
      },
      { type: "h2", texte: "Le coton" },
      {
        type: "p",
        texte:
          "Doux et souple, il est souvent utilisé dans les tissages plats et les tapis légers. Il manque d'élasticité : il s'écrase plus facilement qu'une laine et marque davantage.",
      },
      {
        type: "ul",
        items: [
          "**Points forts :** souplesse, toucher, légèreté.",
          "**À savoir :** certains modèles se lavent, d'autres non. C'est la fabrication qui décide.",
        ],
      },
      { type: "h2", texte: "Le jute, le sisal et les fibres végétales" },
      {
        type: "p",
        texte:
          "Fibres naturelles au rendu brut, très texturées. Elles sont robustes, mais rêches sous le pied, et délicates face à l'humidité et aux taches, qui s'enlèvent mal.",
      },
      { type: "h2", texte: "Les fibres synthétiques" },
      {
        type: "p",
        texte:
          "Polyamide, polypropylène, polyester : elles résistent bien aux taches et à l'humidité, s'entretiennent facilement et conviennent aux zones très sollicitées. Leur toucher et leur rendu sont généralement moins riches que ceux d'une fibre naturelle.",
      },
      { type: "h2", texte: "Choisir selon la pièce" },
      {
        type: "ul",
        items: [
          "**Passage intense (entrée, couloir, salon familial) :** une matière résiliente et un poil plutôt ras. La laine, ou une fibre synthétique de qualité.",
          "**Enfants et animaux :** une matière qui pardonne les taches et se nettoie sans craindre l'eau. Évitez la viscose.",
          "**Pièce calme (chambre) :** le confort prime. On peut choisir une matière plus douce et un poil plus haut.",
          "**Forte exposition au soleil :** toutes les teintes finissent par passer à la lumière directe. Tournez le tapis de temps en temps et choisissez des teintes qui supportent cette évolution.",
          "**Zone humide :** les fibres synthétiques. Évitez la viscose, le sisal et le jute.",
        ],
      },
      {
        type: "p",
        texte:
          "C'est la logique que nous suivons chez Tapitout : orienter selon l'usage réel de l'espace, qu'il s'agisse d'un passage intense ou d'une chambre calme, d'enfants, d'animaux ou d'une exposition au soleil. Pour une pièce précise, [demandez-nous conseil](/contact/).",
      },
      {
        type: "encart",
        titre: "Quatre questions à poser avant d'acheter",
        items: [
          "Quelle est la composition exacte du tapis ?",
          "Quelle est sa hauteur de poil et sa densité ?",
          "Quel entretien recommande-t-on pour cette matière ?",
          "Quelle finition de bordure est prévue ?",
        ],
      },
    ],
  },

  {
    slug: "tapis-sur-mesure-forme-libre",
    titre: "Tapis à contour libre : quand oser une forme sur mesure",
    description:
      "Salon en L, canapé arrondi, colonne, escalier : dans quels cas un tapis découpé à la forme de la pièce est la bonne solution, et ce qu'il demande en précision.",
    extrait:
      "Une pièce n'est pas toujours un rectangle. Les cas où un tapis découpé à la forme de l'espace est la bonne réponse, et ce qu'il exige du relevé.",
    categorie: "Guide",
    publie: "2026-10-31T09:00:00+01:00",
    modifie: "2026-10-31T09:00:00+01:00",
    image: "/images/realisations/projet-7.webp",
    imageAlt: "Salon aux canapés arrondis clairs, avec un tapis rond et un tapis à motif marbré au premier plan",
    collections: ["eclipse", "ms-luxe", "como"],
    aLire: [
      "prise-de-mesures-tapis-a-domicile",
      "quelle-taille-de-tapis-pour-un-salon",
    ],
    contenu: [
      {
        type: "p",
        texte:
          "Les tapis du commerce sont presque tous rectangulaires ou ronds. Les pièces, elles, le sont rarement : un salon en L, un angle, une colonne, un escalier, une pièce sous pente. Un tapis à contour libre est un tapis dont le bord suit la forme de l'espace, ou celle des meubles, au lieu de leur imposer un format.",
      },
      { type: "h2", texte: "Les situations où une forme libre s'impose" },
      {
        type: "ul",
        items: [
          "**Le salon en L :** un rectangle laisse toujours un bras du L à nu, ou déborde sur l'autre. Une forme en L suit les deux parties.",
          "**Le canapé courbe ou arrondi :** un bord qui épouse la courbe du meuble donne un ensemble cohérent, là où un rectangle crée des angles perdus.",
          "**La colonne, la cheminée, la trappe :** une découpe contourne l'obstacle, sans plis ni raccord visible.",
          "**La pièce sous pente ou l'alcôve :** le tapis s'arrête là où la hauteur cesse d'être praticable.",
          "**Le couloir et l'escalier :** des formats longs et étroits, que le commerce propose rarement dans les bonnes dimensions.",
        ],
      },
      { type: "h2", texte: "Ce qu'elle exige : un relevé précis" },
      {
        type: "p",
        texte:
          "Plus la forme s'éloigne du rectangle, plus l'erreur de quelques centimètres se voit. Le relevé doit donc noter les longueurs, les angles, les seuils de porte et les retours de mur, mais aussi ce qu'un plan ne montre pas : la circulation, l'ouverture des portes, la position réelle des meubles. C'est le travail du [relevé à domicile](/journal/prise-de-mesures-tapis-a-domicile/).",
      },
      { type: "h2", texte: "La bordure : le détail qui tient la forme" },
      {
        type: "p",
        texte:
          "Sur une forme libre, la finition du bord compte autant que le dessin. Chez Tapitout, la bordure se choisit parmi quatre techniques maîtrisées en interne, avec la matière :",
      },
      {
        type: "ul",
        items: [
          "la **couture machine**, pour la régularité ;",
          "la **couture manuelle**, pour les formes complexes ;",
          "la **finition invisible à la résine**, pour des bords nets ;",
          "le **galon semi-cuir**, pour un contour affirmé.",
        ],
      },
      { type: "h2", texte: "Accorder la forme et le motif" },
      {
        type: "p",
        texte:
          "Une forme très marquée gagne à rester sobre côté surface : plus le contour parle, plus un fond calme lui laisse la place. À l'inverse, un motif affirmé s'accommode mieux d'un contour simple. Ce n'est pas une règle, c'est un équilibre à chercher devant la pièce.",
      },
      {
        type: "encart",
        titre: "Avant de dessiner une forme",
        items: [
          "Quels bords du tapis iront contre un mur, un meuble ou un obstacle ?",
          "Une porte s'ouvre-t-elle sur la zone, et jusqu'où ?",
          "Les meubles vont-ils bouger prochainement ?",
          "Le tapis doit-il passer un seuil, une marche ?",
        ],
      },
      {
        type: "p",
        texte:
          "Un tapis qui épouse la pièce se décide sur place. Vous pouvez [prendre rendez-vous](/contact/) pour un relevé, ou voir comment la démarche s'organise sur [la page savoir-faire](/savoir-faire/).",
      },
    ],
  },

  {
    slug: "entretenir-un-tapis-en-laine",
    titre: "Comment entretenir un tapis en laine au quotidien",
    description:
      "Aspirateur, taches, soleil, rotation, nettoyage professionnel : les gestes simples qui prolongent la vie d'un tapis en laine, et les erreurs à éviter.",
    extrait:
      "La laine pardonne beaucoup, à condition de quelques gestes réguliers. Aspirer, tamponner, tourner : l'essentiel, et ce qu'il faut éviter.",
    categorie: "Entretien",
    publie: "2026-10-31T09:00:00+01:00",
    modifie: "2026-10-31T09:00:00+01:00",
    image: "/images/realisations/projet-12.webp",
    imageAlt:
      "Séjour aux canapés arrondis clairs posés sur un épais tapis à boucles écru, tables basses en bois",
    collections: ["india", "velaris", "cloff"],
    aLire: [
      "quelle-matiere-de-tapis-choisir",
      "comment-choisir-un-tapis-sur-mesure-pour-son-salon",
    ],
    contenu: [
      {
        type: "p",
        texte:
          "La laine est une fibre indulgente : élastique, elle reprend sa forme, et elle supporte bien l'usage quotidien. L'entretenir demande peu, mais régulièrement. Voici les gestes qui comptent, du plus simple au plus occasionnel.",
      },
      { type: "h2", texte: "Au quotidien : aspirer, sans s'acharner" },
      {
        type: "p",
        texte:
          "Un passage d'aspirateur régulier retire la poussière avant qu'elle ne s'incruste entre les fibres. On le fait plus souvent dans les zones de passage que dans les coins. Évitez la brosse rotative sur un poil haut, des boucles ou des fibres délicates : elle peut tirer ou accrocher les fibres. Une simple aspiration, dans le sens du poil, suffit.",
      },
      {
        type: "h2",
        texte: "Les premiers mois : la perte de fibres est normale",
      },
      {
        type: "p",
        texte:
          "Un tapis en laine neuf laisse échapper de petites fibres lâches, issues de la fabrication. Cela peut surprendre, mais ce n'est pas un défaut : l'aspirateur régulier les retire, et le phénomène s'atténue avec le temps.",
      },
      { type: "h2", texte: "Les taches : tamponner, jamais frotter" },
      {
        type: "p",
        texte:
          "Intervenez vite. Épongez avec un linge propre et absorbant, en tamponnant du bord de la tache vers le centre, sans frotter : frotter enfonce le liquide et abîme la fibre. N'utilisez pas d'eau chaude, qui peut fixer certaines taches, et ne détrempez pas le tapis. Pour une tache tenace ou étendue, mieux vaut s'adresser à un professionnel que d'insister.",
      },
      {
        type: "p",
        texte:
          "Si le tapis mélange la laine à de la viscose, soyez encore plus prudent : l'eau peut laisser des auréoles sur cette fibre.",
      },
      { type: "h2", texte: "Le soleil et l'usure inégale" },
      {
        type: "ul",
        items: [
          "**Le soleil direct** décolore les teintes à la longue. Si le tapis reçoit la lumière d'une baie vitrée, tournez-le de temps en temps pour que la décoloration reste homogène.",
          "**La rotation** répartit aussi l'usure : un demi-tour une à deux fois par an est un repère courant.",
          "**Les meubles lourds** laissent des empreintes. Déplacez-les légèrement de temps à autre et utilisez des protections sous les pieds.",
        ],
      },
      { type: "h2", texte: "Le sous-tapis" },
      {
        type: "p",
        texte:
          "Un sous-tapis antidérapant évite que le tapis glisse, protège le sol et ménage le dos du tapis. Il est particulièrement utile sur un sol lisse comme le marbre ou le carrelage poli.",
      },
      { type: "h2", texte: "Le nettoyage professionnel" },
      {
        type: "p",
        texte:
          "Un nettoyage en profondeur, confié à un spécialiste, se fait selon l'usage : plus souvent pour un tapis de passage, plus rarement pour une chambre. Précisez la composition du tapis, car les méthodes diffèrent selon les fibres.",
      },
      {
        type: "encart",
        titre: "À éviter",
        items: [
          "L'eau chaude, l'eau de Javel et les produits agressifs.",
          "Frotter une tache au lieu de la tamponner.",
          "Laisser le tapis détrempé : une laine qui reste humide s'abîme.",
          "Traîner des meubles lourds sur le tapis.",
          "Une exposition prolongée au soleil direct, sans jamais le tourner.",
        ],
      },
      {
        type: "p",
        texte:
          "Le bon entretien commence au moment du choix : la matière, la hauteur de poil et la teinte se décident selon l'usage réel de la pièce. Notre guide sur [le choix de la matière](/journal/quelle-matiere-de-tapis-choisir/) aide à le faire, et vous pouvez toujours [nous poser la question](/contact/).",
      },
    ],
  },

  {
    slug: "prise-de-mesures-tapis-a-domicile",
    titre: "Prise de mesures d'un tapis à domicile : comment ça se passe",
    description:
      "Relevé au centimètre, essayage sous votre lumière, fabrication à l'atelier, livraison et pose : les quatre étapes d'un tapis sur mesure Tapitout.",
    extrait:
      "Du relevé chez vous à la pose : les quatre étapes d'un tapis sur mesure, et comment préparer le rendez-vous pour en tirer le meilleur.",
    categorie: "Coulisses",
    publie: "2026-10-31T09:00:00+01:00",
    modifie: "2026-10-31T09:00:00+01:00",
    image: "/images/realisations/projet-9.webp",
    imageAlt: "Long séjour aux banquettes claires en L, grand tapis gris sur sol en marbre",
    collections: ["riviera", "illusion", "como"],
    aLire: [
      "quelle-taille-de-tapis-pour-un-salon",
      "tapis-sur-mesure-forme-libre",
    ],
    contenu: [
      {
        type: "p",
        texte:
          "Commander un tapis sur mesure, c'est confier à quelqu'un le soin de mesurer votre pièce, puis de fabriquer quelque chose qui ne ressemblera à aucun autre. Il est normal de se demander comment cela se passe concrètement. Voici les quatre étapes de notre démarche, telles que nous les menons.",
      },
      { type: "h2", texte: "1. Le relevé, chez vous" },
      {
        type: "p",
        texte:
          "Nous venons chez vous, sur rendez-vous, mesurer la pièce au centimètre : longueurs, angles, seuils de porte, retours de mur, zones de passage. Nous notons aussi ce qu'aucun plan ne montre : la circulation, l'ouverture des portes, la place réelle des meubles. Un relevé juste conditionne tout le reste.",
      },
      { type: "h2", texte: "2. L'essayage, sous votre lumière" },
      {
        type: "p",
        texte:
          "Un tapis ne se choisit pas sous l'éclairage d'un showroom. Nous apportons les échantillons chez vous et les posons à l'endroit exact où le tapis ira. Vous voyez la teinte réagir au matin et au soir, la texture répondre à votre sol. Densité, hauteur de poil, teinte : le choix se fait devant votre sol. Vous décidez ensuite.",
      },
      { type: "h2", texte: "3. L'atelier" },
      {
        type: "p",
        texte:
          "La taille est arrêtée au millimètre à partir du relevé. Toutes les formes sont possibles : salons en L, couloirs, escaliers, pièces sous pente, découpes autour d'obstacles. Vient ensuite la bordure, selon l'une de nos quatre finitions :",
      },
      {
        type: "ul",
        items: [
          "la couture machine, pour la régularité ;",
          "la couture manuelle, pour les formes complexes ;",
          "la finition invisible à la résine, pour des bords nets ;",
          "le galon semi-cuir, pour un contour affirmé.",
        ],
      },
      {
        type: "p",
        texte:
          "Notre atelier est à Casablanca. Le relevé, le choix de la matière, la coupe, la bordure et la pose se font entre nos mains : aucune étape n'est confiée à un tiers.",
      },
      { type: "h2", texte: "4. La livraison et la pose" },
      {
        type: "p",
        texte:
          "Nous livrons partout au Maroc, sous emballage protégé. La pose est assurée sur demande, avec vérification des alignements et des jeux de seuil avant notre départ.",
      },
      { type: "h2", texte: "Comment bien préparer le rendez-vous" },
      {
        type: "ul",
        items: [
          "**Dégagez la pièce autant que possible**, ou repérez où iront définitivement les meubles.",
          "**Dites ce qui va changer :** un sol, une peinture, un canapé. Le tapis doit s'accorder au futur, pas seulement au présent.",
          "**Pensez à l'usage :** passage intense ou chambre calme, enfants, animaux, exposition au soleil. Ce sont eux qui orientent le choix de la matière.",
          "**Notez vos goûts et vos contraintes :** teintes que vous aimez ou fuyez, sensibilité aux poils, entretien que vous êtes prêt à faire.",
        ],
      },
      {
        type: "p",
        texte:
          "Pour mieux comprendre ce que le relevé permet, lisez [notre guide sur la taille d'un tapis](/journal/quelle-taille-de-tapis-pour-un-salon/) ou celui sur [les tapis à contour libre](/journal/tapis-sur-mesure-forme-libre/). Et pour fixer un rendez-vous, c'est [par ici](/contact/).",
      },
    ],
  },
];

export function articleParSlug(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug);
}

/* Nombre de mots d'un article, pour estimer le temps de lecture. */
export function motsDe(article: Article): number {
  const texte = article.contenu
    .map((b) => {
      if (b.type === "ul" || b.type === "ol") return b.items.join(" ");
      if (b.type === "encart")
        return [b.titre, b.texte ?? "", ...(b.items ?? [])].join(" ");
      return b.texte;
    })
    .join(" ")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/\*\*/g, "");
  return texte.split(/\s+/).filter(Boolean).length;
}

/* Environ 220 mots par minute en lecture courante. */
export function minutesDeLecture(article: Article): number {
  return Math.max(1, Math.round(motsDe(article) / 220));
}

/* « 31 octobre 2026 », à l'heure du Maroc. */
export function dateLongue(iso: string): string {
  return new Intl.DateTimeFormat("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Africa/Casablanca",
  }).format(new Date(iso));
}
