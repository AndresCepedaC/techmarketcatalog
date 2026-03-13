// [Brand-adapted] — tokens from design-system.json | visual ref: photos/background/ + photos/logo/
import React from 'react';
import * as Lucide from 'lucide-react';
import { useStore } from '../../context/StoreContext';

export function TopBar() {
  const { currency, setCurrency } = useStore();
  
  return (
    <div className="bg-quantum-deep border-b border-white/5 h-10 flex items-center justify-between px-4 md:px-8 text-[11px] text-white/30 font-bold uppercase tracking-[0.1em] relative z-20">
      <div className="flex items-center gap-6">
        <a href="mailto:info@techmarket.com" className="flex items-center gap-2 hover:text-quantum-cyan transition-colors">
          <Lucide.Mail size={12} className="text-quantum-cyan" /> info@techmarket.com
        </a>
        <a href="https://wa.me/573005054912" target="_blank" className="flex items-center gap-2 hover:text-quantum-cyan transition-colors">
          <Lucide.Phone size={12} className="text-quantum-cyan" /> +57 300 505 4912
        </a>
      </div>
      
      <div className="flex items-center gap-6">
        {/* Toggle Divisa Neón */}
        <div className="flex items-center gap-2 bg-black/40 px-3 py-1.5 rounded-full border border-white/5">
          <button 
            onClick={() => setCurrency('COP')}
            className={`transition-colors duration-300 ${currency === 'COP' ? 'text-quantum-cyan drop-shadow-[0_0_5px_rgba(0,245,255,0.8)]' : 'text-white/20 hover:text-white/50'}`}
          >
            COP
          </button>
          <span className="text-white/10">|</span>
          <button 
            onClick={() => setCurrency('USD')}
            className={`transition-colors duration-300 ${currency === 'USD' ? 'text-quantum-purple drop-shadow-[0_0_5px_rgba(157,0,255,0.8)]' : 'text-white/20 hover:text-white/50'}`}
          >
            USD
          </button>
        </div>
        
        <div className="hidden sm:flex items-center gap-5">
          <a href="#" className="hover:text-quantum-cyan transition-colors"><Lucide.Instagram size={14} /></a>
          <a href="#" className="hover:text-quantum-cyan transition-colors"><Lucide.Twitter size={14} /></a>
          <a href="#" className="hover:text-quantum-cyan transition-colors"><Lucide.Facebook size={14} /></a>
        </div>
      </div>
    </div>
  );
}
