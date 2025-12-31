#!/bin/bash

# Test deployment script for GitHub Pages configuration
# This script simulates the GitHub Pages environment locally

set -e

echo "🔨 Building for production..."
npm run build

echo ""
echo "✅ Build complete!"
echo ""
echo "📦 Build output:"
echo "   - dist/index.html"
echo "   - dist/404.html"
echo "   - dist/assets/"
echo ""
echo "🧪 To test the production build locally, run:"
echo "   npm run preview"
echo ""
echo "📝 To test GitHub Pages behavior, you can use a local server:"
echo "   npx serve -s dist -l 8080"
echo ""
echo "🚀 Deployment steps:"
echo "   1. Make sure GitHub Pages is enabled in repository settings"
echo "   2. Source should be set to 'GitHub Actions'"
echo "   3. Commit and push to main branch"
echo "   4. Check the Actions tab for deployment status"
echo ""
echo "📚 See docs/DEPLOYMENT.md for detailed instructions"
