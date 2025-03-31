#!/usr/bin/with-contenv bashio

echo Node version: $(node --version)

echo Installing node packages
cd dist
npm install

echo Starting server
NODE_ENV=production node app.js