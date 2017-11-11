#!/bin/bash
set -e

echo "set git environment"
git config user.email "teamshell@nordnet.se"
git config user.name "Nordnet Releases"
git checkout master
git remote rm origin
git remote add origin https://nordnet-releases:${GH_TOKEN}@github.com/nordnet/cz-conventional-changelog.git
git checkout master

echo "release"
npm run release

echo "publish"
echo "//registry.npmjs.org/:_authToken=${NPM_TOKEN}\n" > ~/.npmrc
npm publish
