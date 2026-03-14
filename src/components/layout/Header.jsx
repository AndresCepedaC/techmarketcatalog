// [Brand-adapted] — tokens from design-system.json | visual ref: photos/background/ + photos/logo/
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as Lucide from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { useCart } from '../../context/CartContext';
import { TopBar } from './TopBar';

/**
 * Header Component - Master Controller
 * 
 * Implementa un Stacked Header (TopBar + Nav) que es 100% adhesivo.
 * Maneja el estado de scroll y el menú móvil para toda la navegación superior.
 */
export function Header() {
  const { searchQuery, setSearchQuery } = useStore();
  const { totalItems, setIsCartOpen } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 inset-x-0 z-[100] flex flex-col w-full transition-all duration-500 ${scrolled
          ? 'shadow-[0_10px_40px_rgba(0,0,0,0.5)]'
          : ''
        }`}
    >
      {/* 1. TOP BAR - Parte del flujo adhesivo */}
      <TopBar />

      {/* 2. MAIN NAV - La navegación principal */}
      <nav className={`relative transition-all duration-500 overflow-hidden ${scrolled
          ? 'bg-quantum-deep/90 backdrop-blur-3xl border-b border-quantum-cyan/10 h-16 md:h-20'
          : 'bg-quantum-deep/40 backdrop-blur-md border-b border-white/5 h-20 md:h-24'
        }`}>
        {/* Background Visual Enhancements */}
        <div className="absolute inset-x-0 top-0 h-full pointer-events-none opacity-20 overflow-hidden">
          <img
            src="/photos/logo/logo.jpg"
            alt=""
            className="absolute -top-1/2 left-1/2 -translate-x-1/2 w-[800px] max-w-none opacity-10 blur-[100px] logo-etched mix-blend-lighten"
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 md:px-8 h-full flex items-center justify-between gap-8 relative z-10">

          {/* Logo Section */}
          <div className="flex items-center gap-4">
            <button
              className="lg:hidden p-2 text-quantum-cyan hover:text-white transition-all"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Menú principal"
            >
              {mobileMenuOpen ? <Lucide.X size={24} /> : <Lucide.Menu size={24} />}
            </button>

            <div
              className="flex items-center cursor-pointer group"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              <motion.img
                animate={scrolled ? {} : { y: [0, -4, 0] }}
                transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                src="/photos/logo/logo.jpg"
                alt="Tech Market"
                className={`w-auto object-contain transition-all duration-500 logo-etched group-hover:drop-shadow-[0_0_20px_rgba(0,245,255,0.4)] mix-blend-lighten rounded-lg ${scrolled ? 'h-8 md:h-10' : 'h-10 md:h-14'
                  }`}
              />
            </div>
          </div>

          {/* Search Bar Desktop */}
          <div className="hidden lg:block flex-1 max-w-xl">
            <div className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-quantum-cyan/20 to-quantum-purple/20 rounded-2xl blur opacity-0 group-focus-within:opacity-100 transition duration-500" />
              <div className="relative flex items-center bg-black/40 border border-white/5 rounded-2xl group-focus-within:border-quantum-cyan/30 transition-all">
                <Lucide.Search size={18} className="ml-4 text-quantum-cyan/50 group-focus-within:text-quantum-cyan transition-colors" />
                <input
                  type="text"
                  placeholder="¿Qué estás buscando hoy?"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-3 pr-6 py-2.5 md:py-3 bg-transparent text-sm text-white placeholder-white/20 focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center p-0.5 rounded-xl border border-white/5 bg-white/5 hover:bg-white/10 transition-all">
              <button className="flex items-center gap-2 px-4 py-2 text-white/70 hover:text-white transition-all rounded-lg">
                <Lucide.User size={16} />
                <span className="uppercase tracking-[0.2em] text-[9px] font-black">Cuenta</span>
              </button>
            </div>

            <div className="flex items-center p-0.5 rounded-xl border border-quantum-cyan/30 bg-quantum-cyan/10 shadow-neon-sm hover:shadow-neon-md transition-all relative">
              <button
                onClick={() => setIsCartOpen(true)}
                className={`bg-quantum-cyan text-quantum-deep rounded-lg hover:bg-white transition-all active:scale-95 ${scrolled ? 'p-2.5' : 'p-3'
                  }`}
                aria-label="Abrir carrito"
              >
                <Lucide.ShoppingBag size={20} />
              </button>
              {totalItems > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-danger-red text-white text-[10px] font-black rounded-full flex items-center justify-center shadow-[0_0_10px_rgba(255,42,95,0.6)]">
                  {totalItems}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Search/Menu Dropdown */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="lg:hidden overflow-hidden border-t border-white/5 bg-quantum-deep/98 backdrop-blur-3xl"
            >
              <div className="p-6 space-y-6">
                <div className="relative">
                  <Lucide.Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-quantum-cyan/40" />
                  <input
                    type="text"
                    placeholder="Buscar en el catálogo..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-12 pr-6 py-4 bg-black/40 border border-white/10 rounded-2xl text-sm text-white focus:outline-none focus:border-quantum-cyan/30"
                  />
                </div>
                <nav className="flex flex-col gap-4 py-2">
                  <a href="#grid-start" onClick={() => setMobileMenuOpen(false)} className="text-lg font-black text-white hover:text-quantum-cyan transition-colors uppercase tracking-widest">Catálogo</a>
                  <a href="#grid-start" onClick={() => setMobileMenuOpen(false)} className="text-lg font-black text-white hover:text-quantum-cyan transition-colors uppercase tracking-widest">Ofertas</a>
                  <a href="https://wa.me/573005054912" target="_blank" className="text-lg font-black text-white hover:text-quantum-cyan transition-colors uppercase tracking-widest">Contacto Directo</a>
                </nav>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}
