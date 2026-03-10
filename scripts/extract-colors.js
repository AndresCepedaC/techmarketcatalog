const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const LOGO_PATH = path.join(__dirname, '../public/photos/logo/logo.png');
const OUTPUT_PATH = path.join(__dirname, 'brand-palette.json');

async function extractColors() {
  console.log('--- EXTRACTING COLORS FROM LOGO ---');
  
  if (!fs.existsSync(LOGO_PATH)) {
    console.error('Error: Logo not found at', LOGO_PATH);
    process.exit(1);
  }

  try {
    const { data, info } = await sharp(LOGO_PATH)
      .raw()
      .toBuffer({ resolveWithObject: true });

    const pixelCount = info.width * info.height;
    const colorFrequency = {};

    for (let i = 0; i < data.length; i += info.channels) {
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];
      const a = info.channels === 4 ? data[i + 3] : 255;

      // Filter: Skip transparent or near-black/near-white backgrounds
      if (a < 128) continue;
      if (r < 15 && g < 15 && b < 15) continue; 
      if (r > 245 && g > 245 && b > 245) continue;

      const hex = `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase()}`;
      colorFrequency[hex] = (colorFrequency[hex] || 0) + 1;
    }

    // Sort by frequency
    const sortedColors = Object.entries(colorFrequency)
      .sort((a, b) => b[1] - a[1])
      .map(entry => entry[0]);

    // Simple luminance calculation to find Primary/Secondary
    // (In a real scenario, we might want to group similar colors)
    const primary = sortedColors[0] || '#00E5FF';
    const secondary = sortedColors.find(c => !isSimilar(c, primary)) || primary;
    const accent = sortedColors.find(c => !isSimilar(c, primary) && !isSimilar(c, secondary)) || secondary;
    
    // Default dark background estimation (slightly darker than logo bg if detected, or deep navy)
    const darkBg = '#0B0D17'; 

    const result = {
      primary,
      secondary,
      accent,
      dark_bg: darkBg,
      variants: {
        primary_light: adjustLuminance(primary, 30),
        primary_dark: adjustLuminance(primary, -30),
        glow: hexToRgba(primary, 0.5),
        ultra_glow: hexToRgba(primary, 0.2)
      }
    };

    console.log('╔══════════════════════════════════════════════╗');
    console.log('║        TECH MARKET — BRAND COLOR PALETTE     ║');
    console.log('╠══════════════════════════════════════════════╣');
    console.log(`║ PRIMARY:   ${result.primary}                          ║`);
    console.log(`║ SECONDARY: ${result.secondary}                          ║`);
    console.log(`║ ACCENT:    ${result.accent}                          ║`);
    console.log(`║ DARK_BG:   ${result.dark_bg}                          ║`);
    console.log('╚══════════════════════════════════════════════╝');
    console.log('\nCSS Variables:');
    console.log(`--brand-primary: ${result.primary};`);
    console.log(`--brand-secondary: ${result.secondary};`);
    console.log(`--brand-accent: ${result.accent};`);
    console.log(`--brand-glow: ${result.variants.glow};`);
    console.log(`--brand-ultra-glow: ${result.variants.ultra_glow};`);

    fs.writeFileSync(OUTPUT_PATH, JSON.stringify(result, null, 2));
    console.log(`\nResults saved to ${OUTPUT_PATH}`);

  } catch (err) {
    console.error('Error analyzing image:', err);
  }
}

function isSimilar(hex1, hex2) {
  const rgb1 = hexToRgb(hex1);
  const rgb2 = hexToRgb(hex2);
  const diff = Math.sqrt(
    Math.pow(rgb1.r - rgb2.r, 2) +
    Math.pow(rgb1.g - rgb2.g, 2) +
    Math.pow(rgb1.b - rgb2.b, 2)
  );
  return diff < 60; // Similarity threshold
}

function hexToRgb(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : { r: 0, g: 0, b: 0 };
}

function hexToRgba(hex, alpha) {
  const rgb = hexToRgb(hex);
  return `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${alpha})`;
}

function adjustLuminance(hex, percent) {
  const rgb = hexToRgb(hex);
  const adjust = (val) => {
    const newVal = Math.round(val * (1 + percent / 100));
    return Math.min(255, Math.max(0, newVal));
  };
  const r = adjust(rgb.r);
  const g = adjust(rgb.g);
  const b = adjust(rgb.b);
  return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase()}`;
}

extractColors();
