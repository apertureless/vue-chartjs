#!/usr/bin/env sh

# abort on errors
set -e
# build
pnpm build

# navigate into the build output directory
cd src/.vitepress/dist

# if you are deploying to a custom domain
echo 'vue-chartjs.org' > CNAME

git init
git add -A
git commit -m 'docs: Deploy docs'

git push -f git@github.com:apertureless/vue-chartjs.git master:gh-pages

cd -
