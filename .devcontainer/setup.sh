#!/bin/bash

echo "🛠️ Setting up Vue.js environment..."

# Fix npm registry to avoid SSL issues
npm config set registry https://registry.npmjs.org/

# Force update npm
npm install -g npm@latest

# Fix SSL error (temporary)
export NODE_TLS_REJECT_UNAUTHORIZED=0

# Clear cache and remove old dependencies
npm cache clean --force
rm -rf node_modules package-lock.json

# Fix Laravel Mix & Webpack Issue
npm uninstall laravel-mix extract-text-webpack-plugin
npm install laravel-mix@latest
npm install webpack@5 --force

# Fix React Popper Issue
npm install react-popper@latest --force
npm install react@17 --legacy-peer-deps

# Install all dependencies properly
npm install --legacy-peer-deps

# Success message
echo "✅ Setup complete! Run 'npm run serve' to start your project."
