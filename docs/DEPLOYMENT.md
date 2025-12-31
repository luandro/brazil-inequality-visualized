# GitHub Pages Deployment Guide

This project is configured for automatic deployment to GitHub Pages.

## Deployment Architecture

### Stack
- **Framework**: Vite + React + TypeScript
- **Router**: React Router v6 (BrowserRouter)
- **Hosting**: GitHub Pages
- **CI/CD**: GitHub Actions

### Routing Strategy
We use **BrowserRouter** with a custom 404.html redirect for clean URLs and optimal SEO.

## How It Works

### 1. Base Path Configuration
The `vite.config.ts` is configured with dynamic base path:
- **Development**: `/` (local server)
- **Production**: `/brazil-inequality-visualized/` (repository name)

### 2. SPA Routing with 404.html
GitHub Pages doesn't support client-side routing out of the box. When users navigate directly to:
- `https://username.github.io/brazil-inequality-visualized/truth`
- `https://username.github.io/brazil-inequality-visualized/wealth`

GitHub Pages returns a 404 error because these paths don't exist as files.

**Our Solution**: The `public/404.html` file:
1. Catches all 404 errors
2. Redirects to `index.html` with the original path preserved
3. React Router takes over and renders the correct component

### 3. GitHub Actions Workflow
The `.github/workflows/deploy.yml` workflow:
1. Triggers on push to `main` branch
2. Builds the project with production settings
3. Deploys the `dist/` folder to GitHub Pages
4. Uses the official `actions/deploy-pages@v4` action

## Setup Instructions

### First-Time Setup

1. **Enable GitHub Pages** in your repository settings:
   - Go to Settings → Pages
   - Source: GitHub Actions (not Deploy from a branch)
   - Save

2. **Configure Permissions** (if not already set):
   - Settings → Actions → General
   - Workflow permissions: Read and write permissions
   - Enable "Allow GitHub Actions to create and approve pull requests"

3. **Update Base Path** (if your repo name is different):
   - Edit `vite.config.ts`
   - Change `/brazil-inequality-visualized/` to your repo name
   - Edit `.github/workflows/deploy.yml` and update the `VITE_BASE_PATH` environment variable

### Custom Domain Setup

If you want to use a custom domain (e.g., `www.yourdomain.com`):

1. **Configure DNS**:
   - Add a CNAME record pointing to `username.github.io`
   - Or add an A record for the apex domain

2. **Add CNAME File**:
   ```bash
   echo "www.yourdomain.com" > public/CNAME
   ```

3. **Update Vite Config**:
   ```typescript
   base: mode === 'production' ? '/' : '/',
   ```

4. **Commit and Push**:
   ```bash
   git add public/CNAME vite.config.ts
   git commit -m "chore: configure custom domain"
   git push origin main
   ```

## Testing Locally

Before deploying, test the production build locally:

```bash
# Build for production
npm run build

# Preview the production build
npm run preview
```

The preview server will serve from `dist/` and mimic the production environment.

## Deployment Process

### Automatic Deployment
1. Push to `main` branch
2. GitHub Actions automatically builds and deploys
3. Wait for the workflow to complete (check Actions tab)
4. Your site is live at `https://username.github.io/brazil-inequality-visualized/`

### Manual Deployment
You can also trigger the workflow manually:
1. Go to Actions tab in your repository
2. Select "Deploy to GitHub Pages" workflow
3. Click "Run workflow"
4. Select the `main` branch
5. Click "Run workflow"

## Troubleshooting

### Issue: Blank page on route refresh
**Cause**: 404.html not being served correctly
**Solution**: Make sure `public/404.html` exists and is in the `dist/` folder after build

### Issue: Assets not loading (404 errors)
**Cause**: Base path mismatch
**Solution**: Check that `vite.config.ts` base path matches your repository name

### Issue: GitHub Actions failing
**Cause**: Permissions not configured
**Solution**: Go to Settings → Actions → General → Workflow permissions

### Issue: Routes work locally but not on GitHub Pages
**Cause**: BrowserRouter needs server-side routing support
**Solution**: The 404.html redirect should handle this, verify it's being deployed

### Issue: White screen of death
**Cause**: JavaScript errors or asset loading failures
**Solution**:
1. Open browser DevTools Console
2. Check for errors
3. Verify all assets are loading correctly
4. Check the build output for errors

## Alternative Hosting Providers

This configuration is optimized for GitHub Pages but works with other providers:

### Netlify
1. Create a `netlify.toml` file
2. Add a `_redirects` file with `/* /index.html 200`
3. No base path needed for custom domains

### Vercel
1. Import your repository
2. Vercel automatically detects Vite
3. No configuration needed

### AWS S3 + CloudFront
1. Configure S3 for static website hosting
2. Set up CloudFront distribution
3. Add custom error responses for 403/404 to index.html

## Performance Optimization

The deployment includes:
- ✅ Minified JavaScript and CSS
- ✅ Tree-shaking to remove unused code
- ✅ Asset optimization (images, fonts)
- ✅ Gzip/Brotli compression (via GitHub Pages)
- ✅ CDN caching (via GitHub Pages CDN)

## Security Considerations

- ✅ Content Security Policy headers (via GitHub Pages)
- ✅ HTTPS enforced on GitHub Pages
- ✅ No sensitive data in client-side code
- ✅ Dependencies regularly updated via npm audit

## Monitoring and Analytics

Consider adding:
- Google Analytics or Plausible for privacy-friendly analytics
- GitHub Pages traffic analytics (available in repository insights)
- Uptime monitoring (e.g., UptimeRobot, Pingdom)

## Additional Resources

- [Vite Static Deployment Guide](https://vite.dev/guide/static-deploy)
- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [React Router on GitHub Pages](https://github.com/remix-run/react-router/blob/main/examples/GitHubPages.tsx)
- [GitHub Actions for Pages](https://github.com/actions/deploy-pages)
