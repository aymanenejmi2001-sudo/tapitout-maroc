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

bash scripts/construire.sh
out=.next-export

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
