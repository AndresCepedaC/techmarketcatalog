import React from 'react';
import { motion } from 'framer-motion';
import * as Lucide from 'lucide-react';

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-28 pb-32 md:pt-40 md:pb-56">
      {/* Deep volumetric background layers */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 micro-circuitry opacity-10" />
        {/* Main cyan volumetric cone */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[1200px] bg-quantum-cyan/4 rounded-full blur-[200px] -translate-y-1/2 animate-neon-pulse" />
        {/* Purple ambient from bottom */}
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-quantum-purple/4 rounded-full blur-[150px] translate-y-1/2 -translate-x-1/4" />
        {/* Right cyan accent */}
        <div className="absolute top-1/3 right-0 w-[400px] h-[400px] bg-quantum-cyan/3 rounded-full blur-[120px] translate-x-1/3" />
      </div>
      
      {/* Floating data trail lines */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute left-[10%] top-[20%] w-px h-[300px] bg-gradient-to-b from-transparent via-quantum-cyan/20 to-transparent animate-data-stream" />
        <div className="absolute left-[30%] top-[10%] w-px h-[400px] bg-gradient-to-b from-transparent via-quantum-purple/15 to-transparent animate-data-stream" style={{ animationDelay: '5s' }} />
        <div className="absolute right-[20%] top-[15%] w-px h-[250px] bg-gradient-to-b from-transparent via-quantum-cyan/15 to-transparent animate-data-stream" style={{ animationDelay: '10s' }} />
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10 text-center md:text-left">
        <motion.div 
          initial={{ opacity: 0, y: 30 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 1, ease: "easeOut" }}
        >
          {/* Status badge */}
          <div className="inline-flex items-center gap-3 px-6 py-2.5 rounded-full glass-quantum double-neon-cyan/50 mb-10 animate-pulse-glow">
            <span className="w-2 h-2 rounded-full bg-quantum-cyan animate-dot-pulse shadow-neon-sm" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-quantum-cyan font-mono holo-data">
              SETUP PRO // PRÓXIMA GENERACIÓN
            </span>
          </div>
          
          {/* Monumental 3D Title */}
          <h1 className="text-6xl md:text-9xl font-black mt-4 mb-4 leading-[0.85] tracking-tight">
            <span className="text-white text-3d-monumental">Eleva tu Setup</span>
            <br />
            <span className="quantum-gradient-text text-glow-intense relative">
              a nivel profesional.
              {/* Circuit glow underline */}
              <span className="absolute -bottom-4 left-0 w-full h-[2px] bg-gradient-to-r from-quantum-cyan via-quantum-purple to-transparent opacity-60" />
            </span>
          </h1>
          
          {/* Holographic subtitle */}
          <p className="text-white/50 text-lg md:text-2xl max-w-2xl mb-14 font-medium leading-relaxed tracking-wide holo-data py-2" style={{ fontSize: 'inherit' }}>
            <span className="text-white/60 text-lg md:text-xl">
              Hardware exclusivo, periféricos de alto rendimiento y soluciones smart home curadas para entusiastas y profesionales.
            </span>
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center md:justify-start">
            <button 
              onClick={() => document.getElementById('catalog').scrollIntoView({ behavior: 'smooth' })} 
              className="neon-wave-btn px-14 py-5 rounded-xl text-quantum-cyan font-black text-xs uppercase tracking-[0.2em] flex items-center justify-center gap-3 group"
            >
              Explorar Catálogo 
              <Lucide.ChevronRight size={18} className="transition-transform group-hover:translate-x-2" />
            </button>
            <a 
              href="https://wa.me/573005054912" 
              target="_blank" 
              className="neon-wave-btn px-14 py-5 rounded-xl font-black text-xs uppercase tracking-[0.2em] text-white/50 hover:text-white flex items-center justify-center gap-3"
              style={{ borderColor: 'rgba(255,255,255,0.1)' }}
            >
              <Lucide.MessageCircle size={18} /> Soporte WhatsApp
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
