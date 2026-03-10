import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as Lucide from 'lucide-react';
import { useStore } from '../../context/StoreContext';

const itemVariants = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } };

export function ProductCard({ product, index }) {
  const { setActiveProduct } = useStore();
  const [currentImg, setCurrentImg] = useState(0);
  const [imgLoaded, setImgLoaded] = useState(false);
  
  const fotos = product?.fotos || (product?.image ? [product.image] : [`https://placehold.co/400x400/1C2039/00E5FF?text=${encodeURIComponent(product?.name || 'Tech')}`]);
  
  const handleNextImg = (e) => { e.stopPropagation(); setCurrentImg((prev) => (prev + 1) % fotos.length); };
  const handlePrevImg = (e) => { e.stopPropagation(); setCurrentImg((prev) => (prev - 1 + fotos.length) % fotos.length); };
  
  const handleWhatsAppDirect = (e) => {
    e.stopPropagation();
    const msg = `Hola, me interesa el ${product.name} de $${product.price.toLocaleString('en-US')}`;
    window.open(`https://wa.me/573005054912?text=${encodeURIComponent(msg)}`, '_blank');
  };

  return (
    <motion.div 
      variants={itemVariants} 
      className="group relative bg-brand-card/30 backdrop-blur-xl border border-white/5 rounded-2xl overflow-hidden cursor-pointer transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(0,229,255,0.15)] hover:border-brand-cyan/40 flex flex-col h-full" 
      onClick={() => setActiveProduct(product)}
    >
      {/* Glow effect on hover */}
      <div className="absolute -inset-1 bg-gradient-to-r from-brand-cyan/20 to-brand-purple/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
      
      {product?.isPromo && (
        <div className="absolute top-3 right-3 z-10 bg-gradient-to-r from-brand-pink to-brand-purple px-3 py-1 text-[10px] uppercase font-black tracking-widest text-white rounded-full shadow-[0_0_15px_rgba(255,45,149,0.4)]">
          Oferta Neón
        </div>
      )}

      <div className="relative aspect-square bg-dark-900/40 border-b border-white/5 overflow-hidden flex items-center justify-center">
        {fotos.length > 1 && (
          <>
            <button onClick={handlePrevImg} className="absolute left-2 z-20 p-2 bg-black/50 hover:bg-brand-cyan text-white rounded-full backdrop-blur-md opacity-0 group-hover:opacity-100 transition-all">
              <Lucide.ChevronLeft size={16} />
            </button>
            <button onClick={handleNextImg} className="absolute right-2 z-20 p-2 bg-black/50 hover:bg-brand-cyan text-white rounded-full backdrop-blur-md opacity-0 group-hover:opacity-100 transition-all">
              <Lucide.ChevronRight size={16} />
            </button>
          </>
        )}

        <AnimatePresence mode="wait">
          {!imgLoaded && (
            <div className="absolute inset-0 bg-dark-700 animate-pulse" />
          )}
          <motion.img 
            key={currentImg} 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: imgLoaded ? 1 : 0, scale: 1 }}
            transition={{ duration: 0.4 }}
            src={fotos[currentImg]} 
            onLoad={() => setImgLoaded(true)}
            width={400} 
            height={400}
            fetchPriority={index < 4 ? "high" : "auto"}
            loading={index < 4 ? "eager" : "lazy"}
            decoding="async"
            className="w-full h-full object-contain p-6 group-hover:scale-110 transition-transform duration-700" 
            alt={product?.name || "Producto Tech"}
          />
        </AnimatePresence>

        <div className="absolute top-3 left-3 z-10 bg-dark-900/80 backdrop-blur-md border border-brand-cyan/30 px-2.5 py-1 text-[10px] uppercase font-bold text-brand-cyan rounded-lg">
          {product?.category}
        </div>
      </div>

      <div className="p-5 flex flex-col flex-1">
        <h3 className="font-bold text-sm text-gray-100 mb-2 line-clamp-2 group-hover:text-brand-cyan transition-colors">
          {product?.name}
        </h3>
        <p className="text-[11px] text-gray-500 mb-4 line-clamp-2">
          {product?.specs ? Object.values(product.specs).join(" • ") : 'Calidad Garantizada'}
        </p>
        <div className="flex items-center justify-between mt-auto pt-2">
          <div className="flex flex-col">
            <span className="text-[10px] uppercase text-gray-500 font-bold tracking-wider">Precio</span>
            <span className="text-xl font-black text-white group-hover:text-brand-cyan transition-colors">
              ${product?.price?.toLocaleString('en-US')}
            </span>
          </div>
          <button 
            onClick={handleWhatsAppDirect} 
            className="h-11 px-4 rounded-xl bg-[#25D366]/10 border border-[#25D366]/30 flex items-center justify-center text-[#25D366] hover:bg-[#25D366] hover:text-white transition-all transform hover:scale-105 active:scale-95"
          >
            <Lucide.MessageCircle size={20} className="mr-2" />
            <span className="text-xs font-bold">Pedir</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
}
