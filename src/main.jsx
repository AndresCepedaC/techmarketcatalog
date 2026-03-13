// [Brand-adapted] — tokens from design-system.json | visual ref: photos/background/ + photos/logo/
import React, { useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';

import { StoreProvider, useStore } from './context/StoreContext';
import { CartProvider } from './context/CartContext';

// Components
import { ErrorBoundary } from './components/ui/ErrorBoundary';
import { OfflineBanner } from './hooks/useNetwork';
import { Header } from './components/layout/Header';
import { Hero } from './components/layout/Hero';
import { ProductGrid } from './components/ui/ProductGrid';
import { useProducts } from './hooks/useProducts';
import { ProductModal } from './components/ui/ProductModal';
import { CartDrawer } from './components/ui/CartDrawer';
import { Toast } from './components/ui/Toast';
import { SocialProofToast } from './hooks/useSocialProof';
import { Chatbot } from './components/features/Chatbot';
import { TrustSection } from './components/features/TrustSection';
import { Footer } from './components/layout/Footer';
import { ParticleField } from './components/ui/ParticleField';

/**
 * TECHMARKET UI SYSTEM
 * 
 * - Background Images: `public/photos/backgrounds/nebula_bg.png` is used for the Hero Parallax
 *   background effect and the global body styling in `index.css`.
 * - Logo Images: `public/photos/logo/logo.jpg` is used in the Header, Footer and Hero components.
 *   `mix-blend-lighten` CSS is used to adapt it cleanly to the quantum dark theme.
 * - Animations: Parallax scrolling relies on `framer-motion` (useScroll). Hover effects and Volumetric
 *   glows are built with custom Keyframes and Tailwind CSS.
 */

function DeepLinkHandler() {
  const { setActiveProduct } = useStore();
  const { data: products } = useProducts();
  
  useEffect(() => {
    // Basic URL Synchronization for Products
    const params = new URLSearchParams(window.location.search);
    const productId = params.get('product');
    
    if (productId && products && products.length > 0) {
      const foundProduct = products.find(p => p.id.toString() === productId);
      if (foundProduct) {
        setActiveProduct(foundProduct);
      }
    }
  }, [setActiveProduct, products]);
  
  return null;
}

function App() {
  useEffect(() => {
    // Proactive Image Pre-loading for LCP & Performance
    const productsToPreload = (window.PRODUCTS || []).slice(0, 4);
    productsToPreload.forEach(p => {
      const imgPath = p.fotos?.[0] || p.image;
      if (imgPath) {
        const img = new Image();
        img.src = imgPath;
      }
    });
  }, []);

  return (
    <StoreProvider>
      <DeepLinkHandler />
      <CartProvider>
        <div className="min-h-screen bg-quantum-deep text-white selection:bg-quantum-cyan/20">
          {/* Offline Banner & Global Particle Field */}
          <OfflineBanner />
          <ParticleField />
          <Toast />
          <SocialProofToast />
          
          <TopBar />
        <Header />
        
        <main>
          <Hero />
          <TrustSection />
          <div id="grid-start" className="scroll-mt-32" />
          <ProductGrid />
        </main>
        
        <Footer />

        {/* Overlays */}
        <ProductModal />
        <CartDrawer />
        <Chatbot />
      </div>
      </CartProvider>
    </StoreProvider>
  );
}

// ═══════════════════════════════════════════
//  BOOTSTRAP
// ═══════════════════════════════════════════
const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <ErrorBoundary>
    <App />
  </ErrorBoundary>
);
