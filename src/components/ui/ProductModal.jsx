import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as Lucide from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { ImageMagnifier } from './ImageMagnifier';

export function ProductModal() {
  const { activeProduct, setActiveProduct } = useStore();

  if (!activeProduct) return null;

  const handleWhatsAppDirect = () => {
    const msg = `Hola, me interesa el ${activeProduct.name} de $${activeProduct.price.toLocaleString('en-US')}`;
    window.open(`https://wa.me/573005054912?text=${encodeURIComponent(msg)}`, '_blank');
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          exit={{ opacity: 0 }} 
          className="absolute inset-0 bg-black/90 backdrop-blur-md" 
          onClick={() => setActiveProduct(null)} 
        />
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }} 
          animate={{ scale: 1, opacity: 1 }} 
          exit={{ scale: 0.9, opacity: 0 }} 
          className="relative w-full max-w-5xl bg-brand-card/95 border border-white/10 rounded-2xl overflow-hidden flex flex-col md:flex-row z-10 shadow-[0_0_50px_rgba(0,0,0,0.5)]"
        >
          <button 
            onClick={() => setActiveProduct(null)} 
            className="absolute top-4 right-4 z-20 p-2 bg-dark-700/50 hover:bg-brand-cyan hover:text-white rounded-full transition-all"
          >
            <Lucide.X size={18} />
          </button>

          <div className="w-full md:w-1/2 p-4 md:p-8 bg-black/20 flex items-center justify-center min-h-[300px] md:min-h-[500px]">
            <ImageMagnifier 
              src={activeProduct?.fotos?.[0] || activeProduct?.image} 
              alt={activeProduct.name}
            />
          </div>

          <div className="w-full md:w-1/2 p-6 md:p-10 flex flex-col overflow-y-auto max-h-[60vh] md:max-h-none">
            <span className="text-[10px] uppercase font-black tracking-widest text-brand-cyan mb-2">
              {activeProduct.category}
            </span>
            <h2 className="text-3xl md:text-4xl font-black mb-4 leading-tight">{activeProduct.name}</h2>
            
            <div className="flex items-baseline gap-2 mb-8">
              <span className="text-4xl font-black text-brand-cyan">
                ${activeProduct.price.toLocaleString('en-US')}
              </span>
              <span className="text-xs text-gray-500 font-bold uppercase tracking-wider">COP</span>
            </div>

            <div className="flex-1">
              <h4 className="text-xs font-black uppercase tracking-widest text-gray-400 mb-4 border-b border-white/5 pb-2">
                Especificaciones Técnicas
              </h4>
              <div className="space-y-3 mb-10">
                {Object.entries(activeProduct.specs).map(([k, v]) => (
                  <div key={k} className="flex justify-between items-center text-sm group">
                    <span className="text-gray-400 group-hover:text-gray-300 transition-colors">{k}</span>
                    <span className="text-white font-medium">{v}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-auto space-y-4 pt-6 border-t border-white/5">
              <button 
                onClick={handleWhatsAppDirect} 
                className="w-full py-4 rounded-xl bg-[#25D366] text-white font-black hover:bg-[#20bd5a] transition-all flex items-center justify-center gap-3 shadow-[0_10px_20px_rgba(37,211,102,0.2)]"
              >
                <Lucide.MessageCircle size={20} /> PEDIR POR WHATSAPP
              </button>
              <p className="text-[10px] text-center text-gray-500 font-medium">
                Envío gratuito en compras superiores a $200.000
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
