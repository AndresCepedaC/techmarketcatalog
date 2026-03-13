// [Brand-adapted] — tokens from design-system.json | visual ref: photos/background/ + photos/logo/
import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import * as Lucide from 'lucide-react';

export function Hero() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  // Parallax transforms
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section ref={containerRef} className="relative overflow-hidden pt-32 pb-32 md:pt-48 md:pb-56 min-h-screen flex items-center justify-center">
      
      {/* Dynamic Parallax Background (from public/photos/backgrounds/nebula_bg.png) */}
      <motion.div 
        style={{ y: backgroundY }}
        className="absolute inset-x-0 -top-[20%] h-[150%] pointer-events-none z-0"
      >
        <div className="absolute inset-0 bg-[url('/photos/backgrounds/nebula_bg.png')] bg-cover bg-center bg-no-repeat opacity-50 mix-blend-screen" />
      </motion.div>

      {/* Deep volumetric background layers */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 micro-circuitry opacity-10" />
        {/* Animated Cyber Grid */}
        <div className="absolute inset-0 bg-cyber-grid animate-grid-pan opacity-60 mix-blend-screen" />
        
        {/* Main cyan volumetric cone */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[1200px] bg-quantum-cyan/5 rounded-full blur-[200px] -translate-y-1/2 animate-neon-pulse" />
        {/* Purple ambient from bottom */}
        <div className="absolute bottom-[-20%] left-[-10%] w-[800px] h-[800px] bg-quantum-purple/10 rounded-full blur-[200px]" />
      </div>
      
      {/* Floating data trail lines */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 opacity-70">
        <div className="absolute left-[8%] top-[10%] w-px h-[500px] bg-gradient-to-b from-transparent via-quantum-cyan/30 to-transparent animate-data-stream" />
        <div className="absolute left-[35%] top-[5%] w-px h-[600px] bg-gradient-to-b from-transparent via-quantum-purple/20 to-transparent animate-data-stream" style={{ animationDelay: '3s' }} />
        <div className="absolute right-[15%] top-[15%] w-px h-[400px] bg-gradient-to-b from-transparent via-quantum-cyan/25 to-transparent animate-data-stream" style={{ animationDelay: '8s' }} />
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10 text-center w-full flex flex-col items-center">
        <motion.div 
          style={{ y: textY, opacity }}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          variants={{
            hidden: { opacity: 0, scale: 0.95, y: 30 },
            show: { opacity: 1, scale: 1, y: 0, transition: { staggerChildren: 0.25, duration: 1, ease: [0.22, 1, 0.36, 1] } }
          }}
          className="flex flex-col items-center max-w-5xl"
        >
          {/* Status badge */}
          <motion.div variants={{ hidden: { opacity: 0, y: -20 }, show: { opacity: 1, y: 0 } }} className="inline-flex items-center gap-3 px-8 py-3 rounded-full glass-quantum double-neon-cyan/50 mb-12 animate-gentle-float backdrop-blur-3xl bg-quantum-deep/40">
            <span className="w-2.5 h-2.5 rounded-full bg-quantum-cyan animate-pulse shadow-[0_0_15px_rgba(0,245,255,0.8)]" />
            <span className="text-[11px] md:text-xs font-black uppercase tracking-[0.4em] text-quantum-cyan font-mono holo-data">
              SETUP PRO // NEXT GEN
            </span>
          </motion.div>
          
          {/* Monumental 3D Title */}
          <motion.h1 variants={{ hidden: { opacity: 0, y: 40 }, show: { opacity: 1, y: 0 } }} className="text-6xl md:text-8xl lg:text-[10rem] font-black mt-2 mb-6 leading-[0.8] tracking-tighter mix-blend-lighten">
            <span className="text-white text-3d-monumental drop-shadow-[0_20px_50px_rgba(0,245,255,0.2)]">Eleva tu</span>
            <br />
            <span className="quantum-gradient-text text-glow-intense relative inline-block mt-4 pb-4">
              Setup.
              {/* Circuit glow underline */}
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[150%] h-[3px] bg-gradient-to-r from-transparent via-quantum-cyan to-transparent opacity-80 blur-[2px]" />
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[80%] h-[1px] bg-white opacity-90" />
            </span>
          </motion.h1>
          
          {/* Holographic subtitle */}
          <motion.p variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }} className="text-white/40 text-lg md:text-2xl max-w-3xl mb-16 font-medium leading-relaxed tracking-wide holo-data py-4">
            <span className="text-white/70 block mb-2">
              Hardware exclusivo y periféricos de alto rendimiento.
            </span>
            <span className="text-quantum-cyan/60 text-base md:text-lg font-mono tracking-widest uppercase">
              Soluciones premium para entusiastas y profesionales.
            </span>
          </motion.p>
          
          {/* CTA Buttons */}
          <motion.div variants={{ hidden: { opacity: 0, y: 20, scale: 0.9 }, show: { opacity: 1, y: 0, scale: 1 } }} className="flex flex-col sm:flex-row gap-6 w-full sm:w-auto justify-center">
            <button 
              onClick={() => document.getElementById('catalog').scrollIntoView({ behavior: 'smooth' })} 
              className="neon-wave-btn px-12 py-6 sm:px-16 rounded-2xl text-quantum-cyan font-black text-sm uppercase tracking-[0.25em] flex items-center justify-center gap-4 group shadow-[0_0_40px_rgba(0,245,255,0.2)] w-full sm:w-auto"
            >
              <Lucide.Zap size={20} className="fill-quantum-cyan/20 animate-pulse" />
              Upgrade Now
              <Lucide.ArrowRight size={20} className="transition-transform group-hover:translate-x-3 group-hover:text-white" />
            </button>
            <a 
              href={`https://wa.me/${import.meta.env.VITE_WHATSAPP_NUMBER || '573005054912'}`} 
              target="_blank" 
              rel="noreferrer"
              className="glass-quantum px-12 py-6 sm:px-16 rounded-2xl font-black text-sm uppercase tracking-[0.25em] text-white/60 hover:text-white flex items-center justify-center gap-4 transition-all duration-300 border-white/10 hover:border-quantum-purple/60 hover:bg-quantum-purple/10 hover:shadow-[0_0_40px_rgba(157,0,255,0.3)] w-full sm:w-auto overflow-hidden group relative"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              <Lucide.MessageCircle size={20} className="group-hover:scale-110 transition-transform" /> 
              Asesoría VIP
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
