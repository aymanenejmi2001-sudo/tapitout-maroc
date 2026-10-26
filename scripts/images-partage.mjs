import sharp from 'sharp';
import { mkdir, readFile } from 'node:fs/promises';
import path from 'node:path';

/* Fabrique les aperçus de partage : l'image qui s'affiche quand le lien du
   site est envoyé sur WhatsApp, Instagram, LinkedIn ou dans un message.

   1200 x 630 est le format que ces services attendent. Une photographie
   verticale laissée telle quelle est recadrée par eux, n'importe comment ;
   mieux vaut la recadrer ici, au centre, une fois pour toutes.

   Les fichiers sont versionnés : le navigateur les demande directement, ils
   ne passent pas par le chargeur d'images.

   Usage : node scripts/images-partage.mjs */
const racine = process.cwd();
const sortie = path.join(racine, 'public', 'images', 'partage');
await mkdir(sortie, { recursive: true });

const site = await readFile(path.join(racine, 'src/lib/site.ts'), 'utf8');
const debut = site.indexOf('export const collections');
const bloc = site.slice(debut, site.indexOf('\n];', debut));
const paires = [...bloc.matchAll(/slug:\s*"([^"]+)"[\s\S]*?\n\s*image:\s*"([^"]+)"/g)];

async function fabrique(source, nom) {
  const info = await sharp(path.join(racine, 'public', source))
    .rotate()
    .resize(1200, 630, { fit: 'cover', position: 'centre' })
    .jpeg({ quality: 82, mozjpeg: true })
    .toFile(path.join(sortie, `${nom}.jpg`));
  console.log(`${nom}.jpg  ${info.width}x${info.height}  ${(info.size / 1024).toFixed(0)} Ko`);
}

/* Accueil : le panoramique du bloc « Bespoke », déjà au bon format. */
await fabrique('images/bespoke-2.jpg', 'accueil');
for (const [, slug, image] of paires) await fabrique(image.replace(/^\//, ''), slug);
