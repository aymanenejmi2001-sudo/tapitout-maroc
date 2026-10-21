import sharp from 'sharp';
import { readdir } from 'node:fs/promises';
import path from 'node:path';

/* Pose les upscales Magnific à la place des photographies d'origine.

   Les sources sortent de Flora en PNG 2400 px (2 à 3 Mo). À 2200 px et
   qualité 84 le WebP pesait encore près de 3 Mo : l'upscale ajoute du
   vrai détail, qui coûte des bits. 1800 px en qualité 78 garde tout le
   gain visible — les vignettes s'affichent à 440 px, la fiche à 630 —
   pour un poids comparable aux photographies d'origine.

   Usage : node scripts/poser-upscales.mjs <dossier-source> <dossier-cible>
   Les fichiers sources doivent être nommés up-<nom>-<n>.png. */
const [src, dest] = process.argv.slice(2);
if (!src || !dest) {
  console.error('Usage : node scripts/poser-upscales.mjs <source> <cible>');
  process.exit(1);
}

const fichiers = (await readdir(src)).filter((f) => /^up-.+-\d+\.png$/.test(f));
for (const f of fichiers) {
  const nom = f.replace(/^up-/, '').replace(/\.png$/, '.webp');
  const info = await sharp(path.join(src, f))
    .resize({ width: 1800, withoutEnlargement: true })
    .webp({ quality: 78 })
    .toFile(path.join(dest, nom));
  console.log(`${nom}  ${info.width}x${info.height}  ${(info.size / 1024).toFixed(0)} Ko`);
}
