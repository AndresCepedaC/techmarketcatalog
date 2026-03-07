/**
 * Tech Market — Image Optimizer v2
 * Converts heavy images to WebP, with special handling for ofice.png
 * Idempotent: safe to run multiple times
 */

import { readdir, stat, unlink } from 'fs/promises';
import { join, extname, basename } from 'path';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';
import { existsSync, statSync } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const PROJECT_ROOT = resolve(__dirname, '..');

const SCAN_DIRS = [
    join(PROJECT_ROOT, 'public', 'photos'),
    join(PROJECT_ROOT, 'public', 'images'),
    join(PROJECT_ROOT, 'src', 'assets'),
].filter(d => existsSync(d));

const IMAGE_EXTENSIONS = new Set(['.jpg', '.jpeg', '.png', '.bmp', '.tiff']);
const SKIP_EXTENSIONS = new Set(['.gif', '.svg', '.webp', '.avif']);
const SIZE_THRESHOLD = 80 * 1024; // 80KB — skip images already under this

async function optimizeImages() {
    let sharp;
    try {
        sharp = (await import('sharp')).default;
    } catch {
        console.error('❌ sharp not installed. Run: npm install sharp --save-dev');
        process.exit(1);
    }

    console.log('🔍 Scanning image directories...\n');

    let totalOriginal = 0;
    let totalOptimized = 0;
    let optimizedCount = 0;
    let skippedCount = 0;
    const results = [];

    for (const dir of SCAN_DIRS) {
        console.log(`📁 Scanning: ${dir}`);
        const files = await readdir(dir);

        for (const file of files) {
            const ext = extname(file).toLowerCase();

            // Skip non-image files and already-optimized formats
            if (SKIP_EXTENSIONS.has(ext)) {
                console.log(`  ⏭️  ${file} — skipping (${ext} format)`);
                skippedCount++;
                continue;
            }

            if (!IMAGE_EXTENSIONS.has(ext)) {
                continue; // not an image
            }

            const filePath = join(dir, file);
            const fileStat = await stat(filePath);
            const originalKB = fileStat.size / 1024;

            // Check if WebP already exists (idempotent)
            const webpName = basename(file, ext) + '.webp';
            const webpPath = join(dir, webpName);
            if (existsSync(webpPath)) {
                const webpStat = statSync(webpPath);
                if (webpStat.size > 0 && webpStat.size < fileStat.size) {
                    console.log(`  ⏭️  ${file} — WebP already exists (${(webpStat.size / 1024).toFixed(1)}KB)`);
                    skippedCount++;
                    continue;
                }
            }

            // Skip small images
            if (fileStat.size < SIZE_THRESHOLD) {
                console.log(`  ⏭️  ${file} (${originalKB.toFixed(1)}KB) — under 80KB, skipping`);
                skippedCount++;
                continue;
            }

            // Special handling for ofice.png (5.2MB critical case)
            const isOfficeCritical = file.toLowerCase() === 'ofice.png';

            try {
                let pipeline = sharp(filePath);

                // Check if image has alpha channel
                const metadata = await sharp(filePath).metadata();
                const hasAlpha = metadata.hasAlpha;
                const width = metadata.width;

                // For ofice.png: resize if needed, lower quality
                if (isOfficeCritical) {
                    console.log(`  🔴 CRITICAL: ${file} (${(fileStat.size / 1024 / 1024).toFixed(2)}MB) — aggressive optimization`);

                    // Resize to max 1200px width if larger
                    if (width > 1200) {
                        pipeline = pipeline.resize(1200, null, { withoutEnlargement: true });
                    }

                    // First attempt: quality 72
                    let result = await pipeline.clone().webp({ quality: 72 }).toBuffer();

                    // If still over 120KB, try quality 60
                    if (result.length > 120 * 1024) {
                        result = await pipeline.clone().webp({ quality: 60 }).toBuffer();
                    }

                    // If STILL over 120KB, resize to 800px
                    if (result.length > 120 * 1024) {
                        result = await pipeline.clone()
                            .resize(800, null, { withoutEnlargement: true })
                            .webp({ quality: 60 })
                            .toBuffer();
                    }

                    // Write the buffer
                    const fs = await import('fs/promises');
                    await fs.writeFile(webpPath, result);
                    const newSize = result.length;

                    totalOriginal += fileStat.size;
                    totalOptimized += newSize;
                    optimizedCount++;
                    const savings = ((1 - newSize / fileStat.size) * 100).toFixed(1);
                    results.push({ file, originalKB: originalKB.toFixed(1), newKB: (newSize / 1024).toFixed(1), savings });
                    console.log(`  ✅ ${file} (${(fileStat.size / 1024 / 1024).toFixed(2)}MB) → ${webpName} (${(newSize / 1024).toFixed(1)}KB) — ${savings}% savings`);
                } else {
                    // Standard optimization
                    const quality = hasAlpha ? 85 : 82;

                    if (width > 1600) {
                        pipeline = pipeline.resize(1600, null, { withoutEnlargement: true });
                    }

                    const result = await pipeline
                        .webp({ quality })
                        .toFile(webpPath);

                    totalOriginal += fileStat.size;
                    totalOptimized += result.size;
                    optimizedCount++;
                    const savings = ((1 - result.size / fileStat.size) * 100).toFixed(1);
                    results.push({ file, originalKB: originalKB.toFixed(1), newKB: (result.size / 1024).toFixed(1), savings });
                    console.log(`  ✅ ${file} (${originalKB.toFixed(1)}KB) → ${webpName} (${(result.size / 1024).toFixed(1)}KB) — ${savings}% savings`);
                }

                // Verify before deleting original
                if (existsSync(webpPath)) {
                    const webpStat = statSync(webpPath);
                    if (webpStat.size > 0 && webpStat.size < fileStat.size) {
                        await unlink(filePath);
                        console.log(`  🗑️  Deleted original: ${file}`);
                    } else {
                        console.log(`  ⚠️  Kept original: ${file} (WebP not smaller)`);
                    }
                }

            } catch (err) {
                console.error(`  ❌ Error processing ${file}:`, err.message);
            }
        }
    }

    console.log('\n=== OPTIMIZATION COMPLETE ===');
    console.log('');
    for (const r of results) {
        console.log(`  ${r.file}: ${r.originalKB}KB → ${r.newKB}KB (${r.savings}% savings)`);
    }
    console.log('');
    if (optimizedCount > 0) {
        const totalSavedKB = ((totalOriginal - totalOptimized) / 1024).toFixed(1);
        const totalPct = ((1 - totalOptimized / totalOriginal) * 100).toFixed(1);
        console.log(`TOTAL: ${optimizedCount} images | Saved: ${totalSavedKB}KB (${totalPct}%)`);
    }
    console.log(`Skipped: ${skippedCount}`);
}

optimizeImages().catch(console.error);
