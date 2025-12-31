#!/usr/bin/env node

/**
 * Image Optimization Script
 *
 * Optimizes all SVG and PNG images in the public folder
 * - SVG: Uses SVGO for maximum compression
 * - PNG: Uses sharp for optimization
 */

import { exec } from 'child_process';
import { promisify } from 'util';
import { readdir, stat } from 'fs/promises';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const execAsync = promisify(exec);
const __dirname = dirname(fileURLToPath(import.meta.url));
const publicDir = join(__dirname, '../public');

console.log('🎨 Image Optimization Script\n');

// Optimize SVG files
async function optimizeSVGs() {
  console.log('📦 Optimizing SVG files...');

  const files = await readdir(publicDir);
  const svgFiles = files.filter(f => f.endsWith('.svg'));

  if (svgFiles.length === 0) {
    console.log('  No SVG files found\n');
    return;
  }

  for (const file of svgFiles) {
    const filePath = join(publicDir, file);
    const statsBefore = await stat(filePath);

    try {
      await execAsync(`npx svgo "${filePath}" -o "${filePath}" --quiet`);
      const statsAfter = await stat(filePath);
      const savings = statsBefore.size - statsAfter.size;
      const percent = ((savings / statsBefore.size) * 100).toFixed(1);

      console.log(`  ✓ ${file}: ${statsBefore.size}B → ${statsAfter.size}B (${percent}% reduction)`);
    } catch (error) {
      console.error(`  ✗ ${file}: Failed to optimize`, error.message);
    }
  }

  console.log('');
}

// Regenerate optimized PNG files from SVG
async function regeneratePNGs() {
  console.log('📦 Regenerating PNG files from SVG...');

  try {
    await execAsync('node scripts/generate-logos.js');
    console.log('  ✓ All PNG files regenerated\n');
  } catch (error) {
    console.error('  ✗ Failed to regenerate PNG files:', error.message);
  }
}

// Main execution
async function main() {
  try {
    await optimizeSVGs();
    await regeneratePNGs();

    console.log('✅ Image optimization complete!\n');

    // Show final sizes
    const files = await readdir(publicDir);
    const imageFiles = files.filter(f =>
      f.endsWith('.svg') ||
      f.endsWith('.png') ||
      f.endsWith('.ico')
    ).sort();

    console.log('📊 Final file sizes:');
    let totalSize = 0;

    for (const file of imageFiles) {
      const filePath = join(publicDir, file);
      const stats = await stat(filePath);
      totalSize += stats.size;
      const sizeKB = (stats.size / 1024).toFixed(2);
      console.log(`  ${file}: ${sizeKB} KB`);
    }

    console.log(`\n  Total: ${(totalSize / 1024).toFixed(2)} KB\n`);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

main();
