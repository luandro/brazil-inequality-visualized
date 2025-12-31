# Logo Files

This directory contains optimized logo files generated from `logo.svg`.

## Generated Files

### Favicon Files
- `favicon.ico` - Main favicon (32x32)
- `favicon-16x16.png` - Small favicon (254 bytes)
- `favicon-32x32.png` - Standard favicon (316 bytes)
- `apple-touch-icon.png` - Apple devices (180x180, 788 bytes)

### Logo Images
- `logo-64.png` - Navigation logo (64x64, 401 bytes)
- `logo-128.png` - Medium logo (128x128, 622 bytes)
- `logo-192.png` - Large logo (192x192, 806 bytes)
- `logo-512.png` - PWA/OG image (512x512, 2KB)

## Source File
- `logo.svg` - Original SVG logo (vector, infinite scaling)

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

## Regenerating Logos

To regenerate all logo files from the source SVG:

```bash
npm run generate-logos
```

This will:
1. Read `public/logo.svg`
2. Generate PNG files at multiple sizes
3. Apply maximum compression (quality: 90, compressionLevel: 9)
4. Maintain image quality while minimizing file size

## Optimization Details

All PNG files are optimized with:
- **Quality**: 90 (high quality)
- **Compression Level**: 9 (maximum compression)
- **Adaptive Filtering**: Enabled
- **Fit**: Cover (centered, fills dimensions)

Result: Files are compressed up to 95% while maintaining visual quality.

## Adding New Sizes

Edit `scripts/generate-logos.js` and add to the `sizes` array:

```js
const sizes = [
  { size: 256, name: 'logo-256.png' },
  // ... add more sizes
];
```

Then run `npm run generate-logos`.
