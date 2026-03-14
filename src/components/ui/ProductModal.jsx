// [Brand-adapted] — tokens from design-system.json | visual ref: photos/background/ + photos/logo/
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as Lucide from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { useCart } from '../../context/CartContext';
import { ImageMagnifier } from './ImageMagnifier';
import { formatPrice } from '../../utils/currency';
import { useProducts } from '../../hooks/useProducts';
import { useFocusTrap } from '../../hooks/useFocusTrap';
import { useCrossSelling } from '../../hooks/useCrossSelling';
import { OptimizedImage } from './OptimizedImage';
import { useDynamicSEO } from '../../hooks/useDynamicSEO';

export function ProductModal() {
  const { activeProduct, setActiveProduct, currency } = useStore();
  const { addToCart } = useCart();
  const { data: products } = useProducts();
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const modalRef = useRef(null);

  // Hooks de lógica extraída
  useFocusTrap(modalRef, !!activeProduct);
  const crossSellItems = useCrossSelling(activeProduct, products);

  // SEO Dinámico (Tarea 14)
  useDynamicSEO({
    title: activeProduct?.name,
    description: activeProduct?.description || activeProduct?.category
  });

  // Reset de imagen al abrir
  useEffect(() => {
    if (activeProduct) setActiveImageIndex(0);
  }, [activeProduct]);

  // Manejo de cierre con Escape (fuera del hook según requerimiento actual)
  useEffect(() => {
    const handleEsc = (e) => { if (e.key === 'Escape') setActiveProduct(null); };
    if (activeProduct) window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [activeProduct, setActiveProduct]);

  if (!activeProduct) return null;

  const images = activeProduct.images || [];
  const mainImageSrc = images[activeImageIndex] || images[0];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        {/* Overlay con blur */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          className="absolute inset-0 bg-quantum-deep/80 backdrop-blur-3xl" onClick={() => setActiveProduct(null)} />

        {/* Modal Container */}
        <motion.div ref={modalRef} initial={{ scale: 0.95, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.95, opacity: 0, y: 20 }}
          className="relative w-full max-w-6xl glass-quantum double-neon-cyan/30 rounded-3xl overflow-hidden flex flex-col md:flex-row z-10 shadow-neon-xl max-h-[90vh] md:max-h-none overflow-y-auto border border-quantum-cyan/20">

          <button onClick={() => setActiveProduct(null)} className="absolute top-6 right-6 z-30 p-2.5 glass-quantum text-quantum-cyan/50 hover:text-white rounded-xl transition-all border-white/5">
            <Lucide.X size={20} />
          </button>

          {/* Galería de Imágenes */}
          <div className="w-full md:w-1/2 p-10 md:p-16 bg-quantum-deep/50 flex flex-col relative border-r border-white/5">
            <div className="absolute inset-0 micro-circuitry opacity-[0.05]" />
            <div className="flex-1 flex items-center justify-center min-h-[400px] mb-8 relative z-10">
              <motion.div layoutId={`product-image-${activeProduct.id}`} className="w-full h-full flex items-center justify-center">
                <ImageMagnifier src={mainImageSrc} alt={activeProduct.name} />
              </motion.div>
            </div>
            {images.length > 1 && (
              <div className="flex gap-4 justify-center relative z-10 overflow-x-auto py-2">
                {images.map((img, idx) => (
                  <button key={idx} onClick={() => setActiveImageIndex(idx)}
                    className={`relative w-16 h-16 rounded-xl overflow-hidden border-2 transition-all ${activeImageIndex === idx ? 'border-quantum-cyan shadow-neon-sm scale-110' : 'border-white/10 opacity-50 hover:opacity-100'}`}>
                    <OptimizedImage src={img} alt={`${activeProduct.name} ${idx}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Información y Compra */}
          <div className="w-full md:w-1/2 p-8 md:p-16 flex flex-col relative z-20">
            <span className="text-[10px] uppercase font-black tracking-[0.4em] text-quantum-cyan/60 mb-4 font-mono">Serial // 0x{activeProduct.id?.toString(16).padStart(4, '0')}</span>
            <h2 className="text-4xl md:text-6xl font-black mb-6 tracking-tighter text-white uppercase italic">{activeProduct.name}</h2>

            <div className="flex items-baseline gap-3 mb-10">
              <span className="text-5xl font-black quantum-gradient-text text-glow-cyan">{formatPrice(activeProduct.price, currency)}</span>
              <span className="text-[10px] text-white/30 font-black uppercase tracking-[0.3em]">{currency}</span>
            </div>

            <div className="flex-1">
              <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-white/20 mb-6 border-b border-white/5 pb-3">Especificaciones</h4>
              <div className="space-y-4 mb-10">
                {Object.entries(activeProduct.specs || {}).map(([k, v]) => (
                  <div key={k} className="flex justify-between text-sm">
                    <span className="text-white/40 uppercase text-[11px] font-bold">{k}</span>
                    <span className="text-white/90 font-black">{v}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Acciones e Indicadores */}
            <div className="mt-auto space-y-6 pt-8 border-t border-white/5">
              <button onClick={() => addToCart(activeProduct)} className="w-full py-5 rounded-2xl font-black flex items-center justify-center gap-4 text-xs uppercase tracking-[0.2em] bg-quantum-cyan text-quantum-deep hover:bg-white transition-all active:scale-95 shadow-neon-md">
                <Lucide.ShoppingBag size={20} /> AÑADIR AL NEXO
              </button>

              {/* Cross-Selling */}
              {crossSellItems.length > 0 && (
                <div className="mt-8">
                  <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-quantum-cyan/80 mb-4">COMPLETA TU SETUP</h4>
                  <div className="space-y-3">
                    {crossSellItems.map(item => (
                      <div key={item.id} className="flex items-center gap-4 p-3 rounded-xl bg-black/20 border border-white/5 hover:border-quantum-cyan/20 transition-all cursor-pointer group" onClick={() => setActiveProduct(item)}>
                        <OptimizedImage src={item.images?.[0]} alt={item.name} className="w-12 h-12 object-contain bg-quantum-deep p-1 rounded-lg" />
                        <div className="flex-1">
                          <h5 className="text-xs font-bold text-white group-hover:text-quantum-cyan transition-colors line-clamp-1">{item.name}</h5>
                          <span className="text-[10px] text-quantum-purple font-black">{formatPrice(item.price, currency)}</span>
                        </div>
                        <Lucide.Plus size={14} className="text-quantum-cyan" />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
