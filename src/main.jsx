import React, { useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';

// Context
import { StoreProvider } from './context/StoreContext';

// Components
import { ErrorBoundary } from './components/ui/ErrorBoundary';
import { TopBar } from './components/layout/TopBar';
import { Header } from './components/layout/Header';
import { Hero } from './components/layout/Hero';
import { ProductGrid } from './components/ui/ProductGrid';
import { ProductModal } from './components/ui/ProductModal';
import { Chatbot } from './components/features/Chatbot';
import { Footer } from './components/layout/Footer';
import { ParticleField } from './components/ui/ParticleField';

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
      <div className="min-h-screen bg-quantum-deep text-white selection:bg-quantum-cyan/20">
        {/* Global Particle Field */}
        <ParticleField />
        
        <TopBar />
        <Header />
        
        <main>
          <Hero />
          <div id="grid-start" className="scroll-mt-32" />
          <ProductGrid />
        </main>
        
        <Footer />

        {/* Overlays */}
        <ProductModal />
        <Chatbot />
      </div>
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
