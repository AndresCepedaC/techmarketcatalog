// [Brand-adapted] — tokens from design-system.json | visual ref: photos/background/ + photos/logo/
import React, { useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';

import { StoreProvider, useStore } from './context/StoreContext';
import { CartProvider } from './context/CartContext';

// Components
import { ErrorBoundary } from './components/ui/ErrorBoundary';
import { OfflineBanner } from './hooks/useNetwork';
import { TopBar } from './components/layout/TopBar';
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

function DeepLinkHandler() {
  const { setActiveProduct } = useStore();
  const { data: products } = useProducts();
  
  useEffect(() => {
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
    // Proactive Image Pre-loading
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

          <ProductModal />
          <CartDrawer />
          <Chatbot />
        </div>
      </CartProvider>
    </StoreProvider>
  );
}

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <ErrorBoundary>
    <App />
  </ErrorBoundary>
);
