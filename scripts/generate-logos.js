import sharp from 'sharp';
import { readFileSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const publicDir = join(__dirname, '../public');

// Sizes we need: 16x16, 32x32, 180x180 (Apple), 192x192, 512x512 (PWA), 64x64 (nav)
const sizes = [
  { size: 16, name: 'favicon-16x16.png' },
  { size: 32, name: 'favicon-32x32.png' },
  { size: 64, name: 'logo-64.png' },
  { size: 128, name: 'logo-128.png' },
  { size: 180, name: 'apple-touch-icon.png' },
  { size: 192, name: 'logo-192.png' },
  { size: 512, name: 'logo-512.png' },
];

// Read SVG file
const svgBuffer = readFileSync(join(publicDir, 'logo.svg'));

// Generate PNG files for each size
async function generateLogos() {
  console.log('Generating logo files...');

  for (const { size, name } of sizes) {
    try {
      await sharp(svgBuffer)
        .resize(size, size, {
          fit: 'cover',
          position: 'center',
        })
        .png({
          quality: 90,
          compressionLevel: 9,
          adaptiveFiltering: true,
        })
        .toFile(join(publicDir, name));

      console.log(`✓ Generated ${name} (${size}x${size})`);
    } catch (error) {
      console.error(`✗ Error generating ${name}:`, error.message);
    }
  }

  // Generate favicon.ico with multiple sizes
  try {
    await sharp(svgBuffer)
      .resize(32, 32, { fit: 'cover', position: 'center' })
      .png({ quality: 90, compressionLevel: 9 })
      .toFile(join(publicDir, 'favicon.ico'));
    console.log('✓ Generated favicon.ico');
  } catch (error) {
    console.error('✗ Error generating favicon.ico:', error.message);
  }

  console.log('\n✓ All logos generated successfully!');
}

generateLogos().catch(console.error);
