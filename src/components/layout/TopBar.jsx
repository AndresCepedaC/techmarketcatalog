// [Brand-adapted] — tokens from design-system.json | visual ref: photos/background/ + photos/logo/
import React from 'react';
import * as Lucide from 'lucide-react';
import { useStore } from '../../context/StoreContext';

/**
 * TopBar Component - Responsive & Stacked
 * 
 * Proporciona información de contacto rápida y selector de divisa.
 * Se integra como la capa superior del Header maestro.
 */
export function TopBar() {
  const { currency, setCurrency } = useStore();

  return (
    <div className="bg-quantum-deep/95 backdrop-blur-md border-b border-white/5 py-2 px-4 md:px-8 text-[10px] md:text-xs text-white/60 font-bold uppercase tracking-widest relative z-[60]">
      <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-4">

        {/* Lado Izquierdo: Contacto */}
        <div className="flex items-center gap-4 md:gap-6">
          <a
            href="mailto:info@techmarket.com"
            className="hidden sm:flex items-center gap-2 hover:text-quantum-cyan transition-colors"
            title="Enviar Email"
          >
            <Lucide.Mail size={12} className="text-quantum-cyan" />
            <span className="hidden md:inline">info@techmarket.com</span>
          </a>
          <a
            href="https://wa.me/573005054912"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 hover:text-quantum-cyan transition-colors"
            title="Contactar WhatsApp"
          >
            <Lucide.Phone size={12} className="text-quantum-cyan" />
            <span>+57 300 505 4912</span>
          </a>
        </div>

        {/* Lado Derecho: Socials & Currency Toggle */}
        <div className="flex items-center gap-4 md:gap-8">
          <div className="hidden xs:flex items-center gap-4 border-r border-white/10 pr-4">
            <a href="#" className="hover:text-quantum-cyan transition-all hover:scale-110"><Lucide.Instagram size={14} /></a>
            <a href="#" className="hover:text-quantum-cyan transition-all hover:scale-110"><Lucide.Twitter size={14} /></a>
          </div>

          {/* Selector de Divisa Neón - Touch Friendly */}
          <div className="flex items-center p-1 bg-black/40 rounded-full border border-white/5">
            <button
              onClick={() => setCurrency('COP')}
              className={`px-3 py-1 rounded-full text-[9px] md:text-[10px] font-black transition-all duration-300 ${currency === 'COP'
                  ? 'bg-quantum-cyan/20 text-quantum-cyan shadow-[0_0_10px_rgba(0,245,255,0.3)]'
                  : 'text-white/20 hover:text-white/50'
                }`}
            >
              COP
            </button>
            <button
              onClick={() => setCurrency('USD')}
              className={`px-3 py-1 rounded-full text-[9px] md:text-[10px] font-black transition-all duration-300 ${currency === 'USD'
                  ? 'bg-quantum-purple/20 text-quantum-purple shadow-[0_0_10px_rgba(157,0,255,0.3)]'
                  : 'text-white/20 hover:text-white/50'
                }`}
            >
              USD
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
