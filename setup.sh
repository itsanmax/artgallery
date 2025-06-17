#!/bin/bash

# Create Next.js app with TypeScript
npx create-next-app@latest my-art-gallery --typescript
cd my-art-gallery || exit

# Install dependencies
echo "Installing Material UI and Redux Toolkit..."
npm install @mui/material @emotion/react @emotion/styled
npm install @reduxjs/toolkit react-redux

# Install optional PWA support
echo "Installing next-pwa..."
npm install next-pwa

# Optional: Install ESLint & Prettier
echo "Installing ESLint & Prettier..."
npm install --save-dev eslint prettier eslint-config-prettier eslint-plugin-react eslint-plugin-react-hooks

echo "Installing Dexie..."
npm install dexie

echo "Installing Slick Carousel..."
npm install react-slick slick-carousel

echo "Installing Material Icons..."
npm install @mui/icons-material


# Init Git
git init
git add .
git commit -m "Initial setup for Art Gallery PWA"

echo "✅ Project setup complete!"
echo "👉 Run the project using: cd my-art-gallery && npm run dev"
