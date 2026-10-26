#!/usr/bin/env bash
# Publie le site sur GitHub Pages (branche gh-pages).
#
#   npm run publier
#
# 1. fabrique les variantes d'images ;
# 2. exporte le site en fichiers statiques dans .next-export/ ;
# 3. pousse ce dossier, et rien d'autre, sur la branche gh-pages.
#
# gh-pages ne contient que le produit fabriqué : elle est réécrite à chaque
# publication, jamais éditée à la main.
set -euo pipefail
cd "$(dirname "$0")/.."
racine="$(pwd)"

depot="$(git remote get-url origin)"

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

# GitHub Pages ignore les dossiers commençant par « _ » sans ce fichier.
touch "$out/.nojekyll"

tmp="$(mktemp -d)"
cp -R "$out"/. "$tmp"
cd "$tmp"
git init -q -b gh-pages
git add -A
git -c user.name="Tapitout Maroc" -c user.email="noreply@tapitoutmaroc.com" \
  commit -q -m "Publication du $(date '+%d/%m/%Y à %H:%M')"
git push -q -f "$depot" gh-pages
rm -rf "$tmp"
echo "Publié sur la branche gh-pages."
