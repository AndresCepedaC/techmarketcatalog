// [Brand-adapted] — tokens from design-system.json | visual ref: photos/background/ + photos/logo/
import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as Lucide from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { useCart } from '../../context/CartContext';
import { ImageMagnifier } from './ImageMagnifier';
import { formatPrice } from '../../utils/currency';

export function ProductModal() {
  const { activeProduct, setActiveProduct, currency } = useStore();
  const { addToCart } = useCart();

  useEffect(() => {
    if (!activeProduct) return;

    // Bloquear scroll
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    // Cerrar con Escape y Focus Trap
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setActiveProduct(null);
        return;
      }
      
      if (e.key === 'Tab') {
        const focusableElements = document.querySelectorAll('#product-modal-container a[href], #product-modal-container button, #product-modal-container textarea, #product-modal-container input, #product-modal-container select');
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            lastElement.focus();
            e.preventDefault();
          }
        } else {
          if (document.activeElement === lastElement) {
            firstElement.focus();
            e.preventDefault();
          }
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [activeProduct, setActiveProduct]);

  if (!activeProduct) return null;

  const handleAddToCart = () => {
    addToCart(activeProduct);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          exit={{ opacity: 0 }} 
          className="absolute inset-0 bg-quantum-deep/80 backdrop-blur-3xl" 
          onClick={() => setActiveProduct(null)} 
        />
        <motion.div 
          initial={{ scale: 0.95, opacity: 0, y: 20 }} 
          animate={{ scale: 1, opacity: 1, y: 0 }} 
          exit={{ scale: 0.95, opacity: 0, y: 20 }} 
          id="product-modal-container"
          aria-modal="true"
          role="dialog"
          className="relative w-full max-w-6xl glass-quantum double-neon-cyan/30 rounded-3xl overflow-hidden flex flex-col md:flex-row z-10 shadow-neon-xl max-h-[90vh] md:max-h-none overflow-y-auto border border-quantum-cyan/20"
        >
          <button 
            onClick={() => setActiveProduct(null)} 
            className="absolute top-6 right-6 z-30 p-2.5 glass-quantum text-quantum-cyan/50 hover:text-white rounded-xl transition-all border-white/5"
          >
            <Lucide.X size={20} />
          </button>

          <div className="w-full md:w-1/2 p-10 md:p-16 bg-quantum-deep/50 flex items-center justify-center min-h-[400px] md:min-h-[600px] relative border-r border-white/5">
            <div className="absolute inset-0 micro-circuitry opacity-[0.05]" />
            <motion.div layoutId={`product-image-${activeProduct.id}`} className="w-full h-full relative z-10 flex items-center justify-center">
              <ImageMagnifier 
                src={activeProduct?.fotos?.[0] || activeProduct?.image} 
                alt={activeProduct.name}
              />
            </motion.div>
          </div>

          <div className="w-full md:w-1/2 p-8 md:p-16 flex flex-col relative z-20">
            <span className="text-[10px] uppercase font-black tracking-[0.4em] text-quantum-cyan/60 mb-4 inline-block font-mono">
              Serial // 0x{activeProduct.id ? activeProduct.id.toString(16).padStart(4, '0') : 'F0A1'}
            </span>
            <h2 className="text-4xl md:text-6xl font-black mb-6 leading-[0.9] tracking-tighter text-white uppercase italic">{activeProduct.name}</h2>
            
            <div className="flex items-baseline gap-3 mb-12">
              <span className="text-5xl font-black quantum-gradient-text text-glow-cyan">
                {formatPrice(activeProduct.price || activeProduct.precio, currency)}
              </span>
              <span className="text-[10px] text-white/30 font-black uppercase tracking-[0.3em]">Divisa // {currency}</span>
            </div>

            <div className="flex-1">
              <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-white/20 mb-6 border-b border-white/5 pb-3">
                Especificaciones Maestras
              </h4>
              <div className="space-y-4 mb-14">
                {Object.entries(activeProduct.specs).map(([k, v]) => (
                  <div key={k} className="flex justify-between items-center text-sm group">
                    <span className="text-white/40 group-hover:text-quantum-cyan/60 transition-colors uppercase text-[11px] font-bold tracking-widest">{k}</span>
                    <span className="text-white/90 font-black tracking-tight">{v}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-auto space-y-6 pt-10 border-t border-white/5">
              <button 
                onClick={handleAddToCart} 
                className="w-full py-5 rounded-2xl font-black transition-all duration-300 flex items-center justify-center gap-4 text-xs uppercase tracking-[0.2em] group shadow-[0_0_20px_rgba(0,245,255,0.1)] active:scale-95 bg-quantum-cyan text-quantum-deep hover:bg-white border-transparent"
              >
                <Lucide.ShoppingBag size={20} className="fill-current" /> AÑADIR AL NEXO DE CARGA
              </button>
              <div className="flex items-center justify-center gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-quantum-cyan animate-pulse" />
                <p className="text-[9px] text-center text-white/30 font-black uppercase tracking-[0.2em]">
                  Logística Asegurada // Cobertura Total Quindío
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
