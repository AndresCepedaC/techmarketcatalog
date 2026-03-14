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

  // Manejo de cierre con Escape
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
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-2 sm:p-4">
        {/* Overlay con blur */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-quantum-deep/90 backdrop-blur-2xl"
          onClick={() => setActiveProduct(null)}
        />

        {/* Modal Container */}
        <motion.div
          ref={modalRef}
          initial={{ scale: 0.95, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 20 }}
          className="relative w-full max-w-6xl glass-quantum double-neon-cyan/30 rounded-[2rem] overflow-hidden flex flex-col md:flex-row z-10 shadow-neon-xl max-h-[95vh] border border-quantum-cyan/20"
        >
          {/* Close Button */}
          <button
            onClick={() => setActiveProduct(null)}
            className="absolute top-4 right-4 sm:top-6 sm:right-6 z-[60] p-2.5 glass-quantum text-quantum-cyan/50 hover:text-white rounded-xl transition-all border-white/5 active:scale-90"
            aria-label="Cerrar modal"
          >
            <Lucide.X size={20} />
          </button>

          {/* Galería de Imágenes */}
          <div className="w-full md:w-1/2 p-6 sm:p-10 md:p-16 bg-quantum-deep/50 flex flex-col relative border-b md:border-b-0 md:border-r border-white/5 overflow-y-auto md:overflow-visible flex-shrink-0">
            <div className="absolute inset-0 micro-circuitry opacity-[0.05] pointer-events-none" />

            <div className="flex-1 flex items-center justify-center min-h-[300px] sm:min-h-[400px] mb-6 sm:mb-8 relative z-10">
              <motion.div layoutId={`product-image-${activeProduct.id}`} className="w-full h-full flex items-center justify-center">
                <ImageMagnifier src={mainImageSrc} alt={activeProduct.name} />
              </motion.div>
            </div>

            {images.length > 1 && (
              <div className="flex gap-3 sm:gap-4 justify-center relative z-10 overflow-x-auto py-2 scrollbar-hide">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`relative w-12 h-12 sm:w-16 sm:h-16 rounded-xl overflow-hidden border-2 transition-all flex-shrink-0 ${activeImageIndex === idx ? 'border-quantum-cyan shadow-neon-sm scale-110' : 'border-white/10 opacity-50 hover:opacity-100'}`}
                  >
                    <OptimizedImage src={img} alt={`${activeProduct.name} ${idx}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Información y Compra */}
          <div className="w-full md:w-1/2 p-6 sm:p-10 md:p-16 flex flex-col relative z-20 overflow-y-auto custom-scrollbar">
            <span className="text-[9px] sm:text-[10px] uppercase font-black tracking-[0.4em] text-quantum-cyan/60 mb-2 sm:mb-4 font-mono">Serial // 0x{activeProduct.id?.toString(16).padStart(4, '0')}</span>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-black mb-4 sm:mb-6 tracking-tighter text-white uppercase italic leading-none break-words">
              {activeProduct.name}
            </h2>

            <div className="flex items-baseline gap-2 sm:gap-3 mb-6 sm:mb-10 overflow-hidden flex-wrap">
              <span className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black quantum-gradient-text text-glow-cyan leading-none whitespace-nowrap">
                {formatPrice(activeProduct.price, currency)}
              </span>
              <span className="text-[10px] sm:text-[12px] text-white/30 font-black uppercase tracking-[0.3em]">{currency}</span>
            </div>

            <div className="flex-1">
              <h4 className="text-[9px] sm:text-[10px] font-black uppercase tracking-[0.4em] text-white/20 mb-4 sm:mb-6 border-b border-white/5 pb-3">Especificaciones</h4>
              <div className="space-y-3 sm:space-y-4 mb-8 sm:mb-10">
                {Object.entries(activeProduct.specs || {}).map(([k, v]) => (
                  <div key={k} className="flex justify-between text-xs sm:text-sm gap-4">
                    <span className="text-white/40 uppercase font-bold flex-shrink-0">{k}</span>
                    <span className="text-white/90 font-black text-right break-words">{v}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Acciones e Indicadores */}
            <div className="mt-auto space-y-6 pt-6 sm:pt-8 border-t border-white/5">
              <button
                onClick={() => addToCart(activeProduct)}
                className="w-full py-4 sm:py-5 rounded-2xl font-black flex items-center justify-center gap-3 sm:gap-4 text-[10px] sm:text-xs uppercase tracking-[0.2em] bg-quantum-cyan text-quantum-deep hover:bg-white transition-all active:scale-95 shadow-neon-md"
              >
                <Lucide.ShoppingBag size={20} className="flex-shrink-0" /> <span className="truncate">AÑADIR AL NEXO</span>
              </button>

              {/* Cross-Selling */}
              {crossSellItems.length > 0 && (
                <div className="mt-6 sm:mt-8">
                  <h4 className="text-[9px] sm:text-[10px] font-black uppercase tracking-[0.4em] text-quantum-cyan/80 mb-3 sm:mb-4">COMPLETA TU SETUP</h4>
                  <div className="space-y-3">
                    {crossSellItems.map(item => (
                      <div
                        key={item.id}
                        className="flex items-center gap-3 sm:gap-4 p-2 sm:p-3 rounded-xl bg-black/20 border border-white/5 hover:border-quantum-cyan/20 transition-all cursor-pointer group min-w-0"
                        onClick={() => setActiveProduct(item)}
                      >
                        <div className="w-10 h-10 sm:w-12 sm:h-12 flex-shrink-0 bg-quantum-deep p-1 rounded-lg overflow-hidden">
                          <OptimizedImage src={item.images?.[0]} alt={item.name} className="w-full h-full object-contain" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h5 className="text-[10px] sm:text-xs font-bold text-white group-hover:text-quantum-cyan transition-colors line-clamp-1 break-words">{item.name}</h5>
                          <span className="text-[9px] sm:text-[10px] text-quantum-purple font-black whitespace-nowrap">{formatPrice(item.price, currency)}</span>
                        </div>
                        <Lucide.Plus size={14} className="text-quantum-cyan flex-shrink-0" />
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
