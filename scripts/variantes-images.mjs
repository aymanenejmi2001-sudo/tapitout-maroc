import sharp from 'sharp';
import { mkdir, readdir, readFile } from 'node:fs/promises';
import path from 'node:path';

/* Fabrique les variantes d'images de la version publiée.

   Pour chaque image de public/images RÉFÉRENCÉE par le code, une copie
   WebP par largeur, rangée
   sous public/_i/<largeur>/. Le chargeur src/lib/image-loader.ts y renvoie.
   Une image plus petite que la largeur demandée n'est jamais agrandie : le
   fichier existe quand même, à sa taille réelle.

   Le dossier public/_i est un produit de fabrication : il est ignoré par
   Git et supprimé après la publication. */
const LARGEURS = [384, 640, 828, 1080, 1440, 1800];
const racine = process.cwd();
const source = path.join(racine, 'public', 'images');
const cible = path.join(racine, 'public', '_i');

async function lister(dossier) {
  const sortie = [];
  for (const e of await readdir(dossier, { withFileTypes: true })) {
    const chemin = path.join(dossier, e.name);
    if (e.isDirectory()) sortie.push(...(await lister(chemin)));
    else if (/\.(jpe?g|png|webp)$/i.test(e.name)) sortie.push(chemin);
  }
  return sortie;
}

/* Seules les images que le code cite sont fabriquées : public/images garde
   des visuels de l'ancien gabarit que plus rien n'affiche, et en produire
   les variantes alourdirait la publication pour rien. */
async function sourcesDuCode(dossier) {
  const cites = new Set();
  for (const e of await readdir(dossier, { withFileTypes: true })) {
    const chemin = path.join(dossier, e.name);
    if (e.isDirectory()) {
      for (const c of await sourcesDuCode(chemin)) cites.add(c);
    } else if (/\.(tsx?|css)$/.test(e.name)) {
      const texte = await readFile(chemin, 'utf8');
      for (const m of texte.matchAll(/\/images\/([A-Za-z0-9_\-./]+\.(?:jpe?g|png|webp))/g)) {
        cites.add(m[1]);
      }
    }
  }
  return cites;
}
const cites = await sourcesDuCode(path.join(racine, 'src'));

const fichiers = (await lister(source)).filter((f) =>
  cites.has(path.relative(source, f).split(path.sep).join('/')),
);
const vus = new Map();
let nb = 0;

for (const f of fichiers) {
  const relatif = path.relative(source, f).replace(/\.[a-z0-9]+$/i, '');
  if (vus.has(relatif)) {
    console.error(`Collision : ${f} et ${vus.get(relatif)} donneraient le même fichier.`);
    process.exit(1);
  }
  vus.set(relatif, f);

  for (const l of LARGEURS) {
    const sortie = path.join(cible, String(l), `${relatif}.webp`);
    await mkdir(path.dirname(sortie), { recursive: true });
    await sharp(f)
      .rotate()
      .resize({ width: l, withoutEnlargement: true })
      .webp({ quality: 74 })
      .toFile(sortie);
    nb++;
  }
}
console.log(`${fichiers.length} images, ${nb} variantes dans public/_i`);
