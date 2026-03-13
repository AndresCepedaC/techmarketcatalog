import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';

export default defineConfig({
  plugins: [
    react(),
    ViteImageOptimizer({
      png: { quality: 80, compressionLevel: 8 },
      jpeg: { quality: 80 },
      webp: { quality: 80 },
      avif: { quality: 70 }
    }),
    VitePWA({
      registerType: 'autoUpdate',
      devOptions: {
        enabled: true
      },
      manifestFilename: 'manifest.json',
      includeAssets: ['favicon.ico', 'robots.txt', 'apple-touch-icon.png'],
      manifest: {
        name: 'TECHMARKET',
        short_name: 'TechMarket',
        description: 'Hardware Premium & Setups Neón',
        theme_color: '#0B0D17',
        background_color: '#0B0D17',
        display: 'standalone',
        icons: [
          {
            src: 'pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable'
          }
        ]
      }
    })
  ],
  base: '/',
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom'],
          'framer-vendor': ['framer-motion'],
          'lucide-vendor': ['lucide-react']
        }
      }
    }
  },
  esbuild: {
    drop: ['console', 'debugger']
  }
});
