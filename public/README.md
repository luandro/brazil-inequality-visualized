# Logo Files

This directory contains optimized logo and image assets.

## Files

### Logo Assets
- `logo.svg` - Source SVG logo (1.43 KB, vector)
- `logo-64.png` - Navigation logo (64x64, 0.39 KB)
- `logo-128.png` - Medium logo (128x128, 0.61 KB)
- `logo-192.png` - Large logo (192x192, 0.79 KB)
- `logo-512.png` - PWA/OG image (512x512, 1.95 KB)

### Favicon Files
- `favicon.ico` - Main favicon (32x32, 0.28 KB)
- `favicon-16x16.png` - Small favicon (254 bytes)
- `favicon-32x32.png` - Standard favicon (0.31 KB)
- `apple-touch-icon.png` - Apple devices (180x180, 0.77 KB)

### Other Assets
- `placeholder.svg` - Placeholder image (3.13 KB)

**Total size**: ~10 KB for all assets

## Usage

### Navigation
```tsx
<img src="/logo-64.png" alt="The Cost of Inequality Logo" className="w-8 h-8" />
```

### Favicon
Configured in `index.html`:
```html
<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
```

### Open Graph / Social Media
```html
<meta property="og:image" content="/logo-512.png" />
<meta name="twitter:image" content="/logo-512.png" />
```

## Optimization

### All Images Are Optimized

**SVG files**: Optimized with SVGO (removes unnecessary data, reduces precision)
**PNG files**: Maximum compression with sharp (quality: 90, compressionLevel: 9)

### Optimization Scripts

**Regenerate all logos**:
```bash
npm run generate-logos
```

**Optimize all images** (SVG + PNG):
```bash
npm run optimize-images
```

This will:
1. Optimize all SVG files with SVGO
2. Regenerate PNG files from SVG source
3. Apply maximum compression
4. Report file size savings

## Adding New Sizes

Edit `scripts/generate-logos.js` and add to the `sizes` array:

```js
const sizes = [
  { size: 256, name: 'logo-256.png' },
  // ... add more sizes
];
```

Then run `npm run optimize-images`.

## Optimization Details

### PNG Settings
- **Quality**: 90 (high quality)
- **Compression Level**: 9 (maximum compression)
- **Adaptive Filtering**: Enabled
- **Fit**: Cover (centered, fills dimensions)

### SVG Settings
- **Precision**: Reduced to 1 decimal place
- **Unnecessary attributes**: Removed
- **Comments**: Removed
- **Empty elements**: Removed

Result: Files are compressed up to 95% while maintaining visual quality.

