import React from 'react';
import { motion } from 'framer-motion';
import * as Lucide from 'lucide-react';

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-20 pb-32 md:pt-32 md:pb-48">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-cyan/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/4" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-brand-purple/10 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/4" />
      
      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10 text-center md:text-left">
        <motion.div 
          initial={{ opacity: 0, y: 30 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8">
            <span className="w-2 h-2 rounded-full bg-brand-cyan animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-brand-cyan">Tecnología de Próxima Generación</span>
          </div>
          
          <h1 className="text-5xl md:text-8xl font-black mt-4 mb-8 leading-[0.9] tracking-tight text-white">
            Eleva tu Setup <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-cyan via-white to-brand-purple">
              a nivel profesional.
            </span>
          </h1>
          
          <p className="text-gray-400 text-lg md:text-2xl max-w-2xl mb-12 font-medium leading-relaxed">
            Hardware exclusivo, periféricos de alto rendimiento y soluciones smart home curadas para entusiastas y profesionales.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-5 justify-center md:justify-start">
            <button 
              onClick={() => document.getElementById('catalog').scrollIntoView({ behavior: 'smooth' })} 
              className="px-10 py-5 bg-brand-cyan text-dark-900 rounded-2xl font-black text-sm uppercase tracking-widest shadow-[0_20px_40px_rgba(0,229,255,0.3)] hover:bg-white hover:shadow-[0_20px_40px_rgba(255,255,255,0.2)] transition-all flex items-center justify-center gap-3 transform hover:-translate-y-1"
            >
              Explorar Catálogo <Lucide.ArrowRight size={18} />
            </button>
            <a 
              href="https://wa.me/573005054912" 
              target="_blank" 
              className="px-10 py-5 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl font-black text-sm uppercase tracking-widest text-white hover:bg-white/10 transition-all flex items-center justify-center gap-3"
            >
              Soporte WhatsApp
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
