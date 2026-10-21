import sharp from 'sharp';
import { mkdir, writeFile, copyFile } from 'node:fs/promises';
import path from 'node:path';

// Source albums supplied by the maison. Never infer a collection from appearance.
const groups = {
  velaris: ['16.51.03 (2)', '16.51.03 (1)', '16.51.03'],
  india: ['16.53.56', '16.53.58'],
  como: ['16.54.17', '16.57.16 (1)', '16.57.16'],
  cloff: ['16.55.51 (2)', '16.55.51 (1)', '16.55.51'],
  riviera: ['16.59.00 (2)', '16.59.00 (1)', '16.59.00', '17.01.07'],
  flec: ['17.00.26 (1)', '17.00.26', '17.00.50'],
  'ms-luxe': ['17.02.46 (1)', '17.02.46'],
  eclipse: ['eclipse', '17.03.10'],
  euphoria: ['17.04.30'],
  illusion: ['17.05.18', '17.05.19', '17.06.19', '17.07.24'],
  diamond: ['17.08.43', '17.08.43 (1)'],
};
const installations = ['17.10.18','17.10.19','17.10.19 (1)','17.10.20','17.10.20 (1)','17.10.20 (2)','17.10.21','17.10.21 (1)','17.10.21 (2)','17.10.22','17.10.22 (1)','17.10.22 (2)','17.10.22 (3)','17.10.23','17.10.23 (1)','17.10.23 (2)'];
const root = process.cwd();
const manifest = [];
const tiles = [];
const sourcePath = time => path.join('/Users/mac/Downloads', time === 'eclipse' ? 'tapitout-eclipse-01.jpeg' : `WhatsApp Image 2026-08-26 at ${time}.jpeg`);
async function convert(time, output, label) {
  const source = sourcePath(time);
  const target = path.join(root, 'public', output);
  await mkdir(path.dirname(target), { recursive: true });
  const info = await sharp(source).rotate().resize({width:1800, height:1800, fit:'inside', withoutEnlargement:true}).webp({quality:88}).toFile(target);
  manifest.push({collection:label,source:path.basename(source),image:`/${output}`,width:info.width,height:info.height});
  const thumb = await sharp(source).rotate().resize(200,225,{fit:'contain',background:'#eeeae4'}).extend({bottom:30,background:'#fbfaf7'}).png().toBuffer();
  const text = Buffer.from(`<svg width="200" height="255"><text x="8" y="246" font-family="sans-serif" font-size="13" fill="#14110f">${label}</text></svg>`);
  tiles.push(await sharp(thumb).composite([{input:text}]).png().toBuffer());
}
for(const [slug, times] of Object.entries(groups)) {
  for(const [i,time] of times.entries()) await convert(time, `images/collections/${slug}-${i+1}.webp`, `${slug} ${i+1}`);
}
for(const [i,time] of installations.entries()) await convert(time, `images/realisations/projet-${i+1}.webp`, `projet ${i+1}`);
await mkdir(path.join(root,'content'),{recursive:true});
await writeFile(path.join(root,'content/catalogue-sources.json'),JSON.stringify(manifest,null,2)+'\n');
await mkdir(path.join(root,'public/videos'),{recursive:true});
await copyFile('/Users/mac/Downloads/WhatsApp Video 2026-08-26 at 16.53.57.mp4', path.join(root,'public/videos/india.mp4'));
const cols=6,rows=Math.ceil(tiles.length/cols);
await sharp({create:{width:cols*200,height:rows*255,channels:3,background:'#fbfaf7'}}).composite(tiles.map((input,i)=>({input,left:(i%cols)*200,top:Math.floor(i/cols)*255}))).jpeg({quality:88}).toFile(path.join(root,'content/catalogue-contact-sheet.jpg'));
console.log(`Imported ${manifest.length} photographs and India video without altering product color or texture.`);
