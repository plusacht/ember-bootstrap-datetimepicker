#!/bin/bash
git branch -D gh-pages
git push origin --delete gh-pages
git checkout -b gh-pages
ember build --environment production
git rm -rf app addon config tests
git rm -rf Brocfile.js bower.json package.json testem.json
git rm -rf .bowerrc .editorconfig .travis.yml
mv dist/* .
rm -rf dist
git add .
git commit -m "Publish to github pages"
git push origin gh-pages
git checkout master
