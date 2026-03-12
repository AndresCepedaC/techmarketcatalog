import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as Lucide from 'lucide-react';
import { useStore } from '../../context/StoreContext';

const LEVITATE_CLASSES = ['animate-levitate-slow', 'animate-levitate-med', 'animate-levitate-fast'];

const itemVariants = { hidden: { opacity: 0, y: 40, scale: 0.95 }, show: { opacity: 1, y: 0, scale: 1 } };

export function ProductCard({ product, index }) {
  const { setActiveProduct } = useStore();
  const [currentImg, setCurrentImg] = useState(0);
  const [imgLoaded, setImgLoaded] = useState(false);
  const [shockwave, setShockwave] = useState(false);
  
  const fotos = product?.fotos || [`https://placehold.co/400x400/1C2039/00E5FF?text=${encodeURIComponent(product?.name || 'Tech')}`];
  const levitateClass = LEVITATE_CLASSES[index % 3];
  
  const handleNextImg = (e) => { e.stopPropagation(); setCurrentImg((prev) => (prev + 1) % fotos.length); };
  const handlePrevImg = (e) => { e.stopPropagation(); setCurrentImg((prev) => (prev - 1 + fotos.length) % fotos.length); };
  
  const handleComprar = (e) => {
    e.stopPropagation();
    setShockwave(true);
    setTimeout(() => setShockwave(false), 600);
    const msg = `Hola, me interesa el ${product.name} de $${product.price.toLocaleString('en-US')}`;
    setTimeout(() => {
      window.open(`https://wa.me/573005054912?text=${encodeURIComponent(msg)}`, '_blank');
    }, 300);
  };

  return (
    <motion.div 
      variants={itemVariants} 
      className={`group relative floating-island overflow-hidden cursor-pointer flex flex-col h-full ${levitateClass}`}
      onClick={() => setActiveProduct(product)}
      style={{ animationDelay: `${index * 0.3}s` }}
    >
      {/* Volumetric top light */}
      <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-quantum-cyan/8 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none" />
      
      {/* Ambient glow on hover */}
      <div className="absolute -inset-2 bg-quantum-cyan/5 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none rounded-3xl" />
      
      {/* Floating micro-particles inside card */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[0,1,2].map(i => (
          <div key={i} className="absolute rounded-full bg-quantum-cyan/30 animate-float" style={{
            width: 2 + i, height: 2 + i,
            left: `${20 + i * 30}%`, top: `${30 + i * 20}%`,
            animationDelay: `${i * 1.2}s`,
            boxShadow: `0 0 ${6 + i * 4}px rgba(0, 245, 255, 0.3)`,
          }} />
        ))}
      </div>

      {/* Promo badge */}
      {product?.isPromo && (
        <div className="absolute top-4 right-4 z-20 holo-data px-4 py-1.5 text-[9px] uppercase font-black tracking-[0.3em] bg-quantum-deep/80 backdrop-blur-md rounded-lg border border-quantum-cyan/30">
          ● PROMO
        </div>
      )}

      {/* Product Image Area */}
      <div className="relative aspect-square bg-quantum-deep/30 border-b border-white/5 overflow-hidden flex items-center justify-center">
        {fotos.length > 1 && (
          <>
            <button onClick={handlePrevImg} className="absolute left-3 z-30 p-2.5 glass-quantum text-quantum-cyan rounded-xl opacity-0 hover:bg-quantum-cyan hover:text-quantum-deep group-hover:opacity-100 transition-all shadow-neon-sm">
              <Lucide.ChevronLeft size={16} />
            </button>
            <button onClick={handleNextImg} className="absolute right-3 z-30 p-2.5 glass-quantum text-quantum-cyan rounded-xl opacity-0 hover:bg-quantum-cyan hover:text-quantum-deep group-hover:opacity-100 transition-all shadow-neon-sm">
              <Lucide.ChevronRight size={16} />
            </button>
          </>
        )}

        <AnimatePresence mode="wait">
          {!imgLoaded && (
            <div className="absolute inset-0 shimmer" />
          )}
          <motion.img 
            key={currentImg} 
            initial={{ opacity: 0, scale: 0.9, filter: 'blur(10px)' }}
            animate={{ opacity: imgLoaded ? 1 : 0, scale: 1, filter: 'blur(0px)' }}
            transition={{ duration: 0.6 }}
            src={fotos[currentImg]} 
            onLoad={() => setImgLoaded(true)}
            className="w-full h-full object-contain p-8 group-hover:scale-110 transition-transform duration-1000 volumetric-glow" 
            alt={product?.name}
          />
        </AnimatePresence>

        {/* Category as holographic data band */}
        <div className="absolute top-4 left-4 z-20 holo-data px-3 py-1.5 text-[8px] uppercase font-black tracking-[0.4em] bg-quantum-deep/70 backdrop-blur-md rounded-lg border border-quantum-cyan/15">
          {product?.category}
        </div>
      </div>

      {/* Data Section */}
      <div className="p-6 flex flex-col flex-1 relative z-10">
        {/* Product Name */}
        <h3 className="font-bold text-base text-white/90 mb-2 line-clamp-2 tracking-tight transition-all group-hover:text-white group-hover:text-glow-cyan">
          {product?.name}
        </h3>
        
        {/* Holographic spec readout */}
        <div className="holo-data text-[10px] mb-5 line-clamp-2 leading-relaxed tracking-tight uppercase py-1">
          {product?.specs ? Object.values(product.specs).join(" // ") : 'SPEC_NULL'}
        </div>
        
        {/* Price + Buy */}
        <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/5">
          <div className="flex flex-col">
            <span className="text-[8px] uppercase text-quantum-cyan/30 font-black tracking-[0.3em] mb-1 holo-data">VALOR.COP</span>
            <span className="text-2xl font-black text-white group-hover:text-quantum-cyan transition-all text-glow-cyan">
              ${product?.price?.toLocaleString('en-US')}
            </span>
          </div>
          
          <button 
            onClick={handleComprar} 
            className={`neon-wave-btn h-12 px-7 rounded-xl text-quantum-cyan font-black text-[11px] uppercase tracking-[0.15em] ${shockwave ? 'animate-pulse' : ''}`}
          >
            COMPRAR
          </button>
        </div>
      </div>

      {/* Decorative circuitry grain */}
      <div className="absolute inset-0 micro-circuitry opacity-[0.03] pointer-events-none" />
    </motion.div>
  );
}
