import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as Lucide from 'lucide-react';
import { useStore } from '../../context/StoreContext';

export function Header() {
  const { searchQuery, setSearchQuery } = useStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-quantum-deep/80 backdrop-blur-3xl border-b border-quantum-cyan/10 overflow-hidden">
      {/* Colossal blurred background logo */}
      <div className="absolute inset-x-0 top-0 h-full pointer-events-none opacity-20 overflow-hidden">
        <img 
          src="/photos/logo/logo.png" 
          alt="" 
          className="absolute -top-1/2 left-1/2 -translate-x-1/2 w-[800px] max-w-none opacity-40 blur-[100px] logo-etched"
        />
        <div className="absolute inset-0 star-field opacity-30" />
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 h-20 md:h-24 flex items-center justify-between gap-8 relative z-10">
        
        {/* Logo Section - Etched into background */}
        <div className="flex items-center gap-4">
          <button 
            className="lg:hidden p-2 text-quantum-cyan hover:text-white transition-all" 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <Lucide.X size={24} /> : <Lucide.Menu size={24} />}
          </button>
          
          <div className="flex items-center cursor-pointer group" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <img 
              src="/photos/logo/logo.png" 
              alt="Tech Market" 
              className="h-10 md:h-14 w-auto object-contain transition-all duration-300 logo-etched group-hover:drop-shadow-[0_0_25px_rgba(0,245,255,0.6)]"
            />
          </div>
        </div>

        {/* Search Bar Desktop - Double Neon Frame */}
        <div className="hidden lg:block flex-1 max-w-xl">
          <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-quantum-cyan/20 to-quantum-purple/20 rounded-2xl blur opacity-0 group-focus-within:opacity-100 transition duration-500" />
            <div className="relative flex items-center bg-quantum-deep/40 rounded-2xl double-neon-cyan">
              <Lucide.Search size={18} className="ml-4 text-quantum-cyan/50 group-focus-within:text-quantum-cyan transition-colors" />
              <input
                type="text" 
                placeholder="¿Qué estás buscando hoy?" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-3 pr-6 py-3.5 bg-transparent text-[15px] text-white placeholder-quantum-cyan/30 focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Action Buttons - Geometric Pods */}
        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center p-0.5 rounded-xl double-neon-cyan/50 bg-quantum-glass">
            <button className="flex items-center gap-2 px-6 py-2.5 text-sm font-black text-quantum-cyan hover:text-white transition-all rounded-lg hover:bg-quantum-cyan/10">
              <Lucide.User size={18} />
              <span className="uppercase tracking-[0.2em] text-[10px]">Cuenta</span>
            </button>
          </div>

          <div className="flex items-center p-0.5 rounded-xl double-neon-cyan bg-quantum-cyan/10 shadow-neon-sm hover:shadow-neon-md transition-all">
            <button 
              onClick={() => document.getElementById('catalog')?.scrollIntoView({ behavior: 'smooth' })}
              className="p-3.5 bg-quantum-cyan text-quantum-deep rounded-lg hover:bg-white transition-all active:scale-95"
            >
              <Lucide.ShoppingBag size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Search/Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }} 
            animate={{ height: 'auto', opacity: 1 }} 
            exit={{ height: 0, opacity: 0 }} 
            className="lg:hidden overflow-hidden border-t border-white/5 bg-quantum-deep/95 backdrop-blur-3xl"
          >
            <div className="p-6 space-y-6">
              <div className="relative">
                <Lucide.Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-quantum-cyan/40" />
                <input
                  type="text" 
                  placeholder="Buscar en el catálogo..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-6 py-4 glass-quantum border-white/10 rounded-2xl text-sm text-white focus:outline-none focus:border-quantum-cyan/30"
                />
              </div>
              <nav className="flex flex-col gap-4 py-2">
                <a href="#catalog" onClick={() => setMobileMenuOpen(false)} className="text-xl font-black text-white hover:text-quantum-cyan transition-colors">Catálogo</a>
                <a href="#" className="text-xl font-black text-white hover:text-quantum-cyan transition-colors">Ofertas</a>
                <a href="https://wa.me/573005054912" target="_blank" className="text-xl font-black text-white hover:text-quantum-cyan transition-colors">Contacto</a>
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
