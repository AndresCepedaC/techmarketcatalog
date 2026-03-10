import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as Lucide from 'lucide-react';
import { useStore } from '../../context/StoreContext';

export function Header() {
  const { searchQuery, setSearchQuery } = useStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-dark-900/80 backdrop-blur-xl border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 md:px-8 h-20 md:h-24 flex items-center justify-between gap-8">
        
        {/* Logo Section */}
        <div className="flex items-center gap-4">
          <button 
            className="lg:hidden p-2 text-gray-400 hover:text-brand-cyan transition-all" 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <Lucide.X size={24} /> : <Lucide.Menu size={24} />}
          </button>
          
          <div className="flex items-center cursor-pointer group" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="relative flex items-center gap-3">
              <div className="relative">
                <Lucide.Zap size={32} className="text-brand-cyan relative z-10 filter drop-shadow-[0_0_10px_rgba(0,229,255,0.8)]" />
                <motion.div 
                  animate={{ scale: [1, 1.4, 1], opacity: [0.2, 0.5, 0.2] }}
                  transition={{ duration: 2.5, repeat: Infinity }}
                  className="absolute inset-0 bg-brand-cyan rounded-full blur-lg"
                />
              </div>
              <span className="text-2xl md:text-3xl font-black tracking-tighter text-white">
                TECH<span className="text-brand-cyan">MARKET</span>
              </span>
            </div>
          </div>
        </div>

        {/* Search Bar Desktop */}
        <div className="hidden lg:block flex-1 max-w-xl">
          <div className="relative group">
            <Lucide.Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-brand-cyan transition-colors" />
            <input
              type="text" 
              placeholder="¿Qué estás buscando hoy?" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-6 py-3.5 bg-white/5 border border-white/10 rounded-2xl text-[15px] text-white placeholder-gray-500 focus:outline-none focus:border-brand-cyan/40 focus:bg-white/10 focus:shadow-[0_0_25px_rgba(0,229,255,0.1)] transition-all duration-300"
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          <button className="hidden sm:flex items-center gap-2 px-5 py-3 text-sm font-black text-white hover:text-brand-cyan transition-all border border-white/5 hover:border-brand-cyan/20 rounded-xl bg-white/5">
            <Lucide.User size={18} />
            <span className="uppercase tracking-widest text-[10px]">Cuenta</span>
          </button>
          <button 
            onClick={() => document.getElementById('catalog')?.scrollIntoView({ behavior: 'smooth' })}
            className="p-3 bg-brand-cyan text-dark-900 rounded-xl hover:bg-white transition-all shadow-[0_10px_20px_rgba(0,229,255,0.2)]"
          >
            <Lucide.ShoppingBag size={20} />
          </button>
        </div>
      </div>

      {/* Mobile Search/Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }} 
            animate={{ height: 'auto', opacity: 1 }} 
            exit={{ height: 0, opacity: 0 }} 
            className="lg:hidden overflow-hidden border-t border-white/5 bg-dark-800"
          >
            <div className="p-6 space-y-6">
              <div className="relative">
                <Lucide.Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                <input
                  type="text" 
                  placeholder="Buscar en el catálogo..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-6 py-4 bg-dark-900 border border-white/10 rounded-2xl text-sm text-white focus:outline-none focus:border-brand-cyan/40"
                />
              </div>
              <nav className="flex flex-col gap-4 py-2">
                <a href="#catalog" onClick={() => setMobileMenuOpen(false)} className="text-xl font-black text-white hover:text-brand-cyan transition-colors">Catálogo</a>
                <a href="#" className="text-xl font-black text-white hover:text-brand-cyan transition-colors">Ofertas</a>
                <a href="#" className="text-xl font-black text-white hover:text-brand-cyan transition-colors">Contacto</a>
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
