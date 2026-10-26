#!/usr/bin/env bash
# Fabrique le site publiable dans .next-export/.
#
#   npm run construire
#
# 1. fabrique les variantes d'images ;
# 2. exporte le site en fichiers statiques ;
# 3. écarte ce que le navigateur ne peut pas demander.
#
# C'est la commande que Cloudflare Pages exécute à chaque push sur main, et
# celle que scripts/publier.sh réutilise pour GitHub Pages.
set -euo pipefail
cd "$(dirname "$0")/.."

node scripts/variantes-images.mjs
rm -rf .next-export
EXPORT_STATIQUE=1 npx next build
rm -rf public/_i

# L'export est écrit dans .next-export (c'est son distDir). On n'y garde que
# ce que le navigateur peut réellement demander : les originaux pèsent
# plusieurs dizaines de Mo et seules les variantes de _i sont servies.
# Restent hero.jpg, les aperçus de partage (lus tels quels) et les vectoriels.
out=.next-export
find "$out/images" -type f ! -name 'hero.jpg' ! -name '*.svg' ! -path '*/partage/*' -delete
find "$out/images" -type d -empty -delete
touch "$out/.nojekyll"
echo "Site fabriqué dans $out ($(du -sh "$out" | cut -f1))."
