#!/usr/bin/env sh

# abort on errors
set -e
# build
npm run docs:build

# navigate into the build output directory
cd docs/.vuepress/dist

# if you are deploying to a custom domain
echo 'vue-chartjs.org' > CNAME
touch .nojekyll
