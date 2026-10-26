This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Hébergement et publication

Le site est servi par **Cloudflare Pages**, relié à ce dépôt : chaque
`git push` sur `main` reconstruit et publie le site, sans autre geste.

- Adresse officielle : https://www.tapitoutmaroc.com (le domaine nu
  `tapitoutmaroc.com` répond aussi ; les canoniques désignent `www`).
- Adresse de secours : https://tapitout-maroc.pages.dev
- Commande de construction : `bash scripts/construire.sh`, dossier de sortie
  `.next-export`, variable `NODE_VERSION=22`. L'export est statique : il n'y
  a aucun serveur.
- DNS : zone gérée par Cloudflare ; le domaine est enregistré chez
  CapConnect, dont les serveurs de noms ont été remplacés par ceux de
  Cloudflare (`algin` et `heather`).
- Avant de pousser, `npm run construire` fabrique le site en local pour le
  vérifier.

`npm run publier` et la branche `gh-pages` sont l'ancien hébergement sur
GitHub Pages, abandonné : le certificat HTTPS du domaine personnalisé n'y a
jamais été émis. Ils sont conservés au cas où.
