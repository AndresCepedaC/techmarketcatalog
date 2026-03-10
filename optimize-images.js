/**
 * ╔══════════════════════════════════════════╗
 * ║   TECH MARKET — Image Optimizer          ║
 * ╠══════════════════════════════════════════╣
 * ║  Converts heavy images to WebP (82%)     ║
 * ║  Run once: node optimize-images.js       ║
 * ╚══════════════════════════════════════════╝
 * 
 * Requires: npm install sharp (one-time dev dependency)
 * 
 * Usage:
 *   node optimize-images.js
 * 
 * This script will:
 *   1. Scan public/photos/ for images > 200KB
 *   2. Convert them to WebP at 82% quality
 *   3. Save .webp files alongside originals
 *   4. Print a summary of space saved
 * 
 * ⚠️ After running, update image paths in public/data/products.js
 *    to use the .webp versions for maximum performance.
 */

import { readdir, stat } from 'fs/promises';
import { join, extname, basename } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const PHOTOS_DIR = join(__dirname, 'public', 'photos');
const SIZE_THRESHOLD = 200 * 1024; // 200KB
const WEBP_QUALITY = 82;
const IMAGE_EXTENSIONS = new Set(['.jpg', '.jpeg', '.png', '.avif', '.bmp', '.tiff']);

async function optimizeImages() {
    let sharp;
    try {
        sharp = (await import('sharp')).default;
    } catch {
        console.error('❌ sharp no está instalado. Ejecuta primero:');
        console.error('   npm install sharp --save-dev');
        process.exit(1);
    }

    console.log('🔍 Escaneando public/photos/ ...\n');

    const files = await readdir(PHOTOS_DIR);
    const imageFiles = files.filter(f => IMAGE_EXTENSIONS.has(extname(f).toLowerCase()));

    if (imageFiles.length === 0) {
        console.log('No se encontraron imágenes en public/photos/');
        return;
    }

    let totalOriginal = 0;
    let totalOptimized = 0;
    let converted = 0;
    let skipped = 0;

    for (const file of imageFiles) {
        const filePath = join(PHOTOS_DIR, file);
        const fileStat = await stat(filePath);
        const sizeKB = (fileStat.size / 1024).toFixed(1);

        if (fileStat.size < SIZE_THRESHOLD) {
            console.log(`  ⏭️  ${file} (${sizeKB}KB) — menor a 200KB, saltando`);
            skipped++;
            continue;
        }

        const outputName = basename(file, extname(file)) + '.webp';
        const outputPath = join(PHOTOS_DIR, outputName);

        try {
            const result = await sharp(filePath)
                .webp({ quality: WEBP_QUALITY })
                .toFile(outputPath);

            const newSizeKB = (result.size / 1024).toFixed(1);
            const savings = ((1 - result.size / fileStat.size) * 100).toFixed(1);

            totalOriginal += fileStat.size;
            totalOptimized += result.size;
            converted++;

            console.log(`  ✅ ${file} (${sizeKB}KB) → ${outputName} (${newSizeKB}KB) — ${savings}% ahorro`);
        } catch (err) {
            console.error(`  ❌ Error procesando ${file}:`, err.message);
        }
    }

    console.log('\n══════════════════════════════════════');
    console.log(`📊 Resumen:`);
    console.log(`   Convertidos: ${converted}`);
    console.log(`   Saltados (< 200KB): ${skipped}`);
    if (converted > 0) {
        const totalSaved = ((1 - totalOptimized / totalOriginal) * 100).toFixed(1);
        console.log(`   Tamaño original: ${(totalOriginal / 1024 / 1024).toFixed(2)}MB`);
        console.log(`   Tamaño optimizado: ${(totalOptimized / 1024 / 1024).toFixed(2)}MB`);
        console.log(`   Ahorro total: ${totalSaved}%`);
    }
    console.log('══════════════════════════════════════');
    console.log('\n⚠️  Recuerda actualizar las rutas en public/data/products.js');
    console.log('    para usar las versiones .webp\n');
}

optimizeImages().catch(console.error);
