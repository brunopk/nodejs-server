#!/bin/bash

echo "📁 Creating dist/ directory"
mkdir -p dist

echo "📁 Creating dist/src directory"
mkdir -p dist/src

echo "💲 Copying .env"
[ -e .env ] && cp .env dist/

echo "💲 Copying .env.production"
[ -e .env.production ] && cp .env.production dist/

echo "💲 Copying run.sh"
[ -e run.sh ] && cp run.sh dist/

echo "⚙️  Copying config.yaml"
[ -e config.yaml ] && cp config.yaml dist/

echo "🐳 Copying Dockerfile"
[ -e Dockerfile ] && cp Dockerfile dist/

echo "🖼️  Copying icon.png"
[ -e icon.png ] && cp icon.png dist/

echo "🖼️  Copying logo.png"
[ -e logo.png ] && cp logo.png dist/

echo "📦 Copying package.json"
[ -e package.json ] && cp package.json dist/

echo "ℹ️  Copying README.md"
[ -e README.md ] && cp README.md dist/

echo "🛠️  Building"
tsc