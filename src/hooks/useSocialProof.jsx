import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as Lucide from 'lucide-react';
import { useProducts } from './useProducts';

const CITIES = ['Bogotá', 'Medellín', 'Cali', 'Barranquilla', 'Cartagena', 'Bucaramanga', 'Pereira', 'Manizales'];

export function useSocialProof() {
  const [proofMessage, setProofMessage] = useState(null);
  const { data: products } = useProducts();

  useEffect(() => {
    let timeoutId;
    
    const triggerProof = () => {
      if (products && products.length > 0) {
        const randomProduct = products[Math.floor(Math.random() * products.length)];
        const randomCity = CITIES[Math.floor(Math.random() * CITIES.length)];
        const nombre = randomProduct.name || randomProduct.titulo;
        
        setProofMessage(`Alguien en ${randomCity} acaba de añadir un ${nombre} a su setup.`);
        
        // Esconder despues de 5s
        setTimeout(() => setProofMessage(null), 5000);
      }
      
      // Siguiente trigger entre 15s y 30s
      const nextTime = Math.floor(Math.random() * (30000 - 15000 + 1)) + 15000;
      timeoutId = setTimeout(triggerProof, nextTime);
    };

    // Iniciar primer trigger
    if (products && products.length > 0) {
      timeoutId = setTimeout(triggerProof, 10000);
    }

    return () => clearTimeout(timeoutId);
  }, [products]);

  return { proofMessage };
}

export function SocialProofToast() {
  const { proofMessage } = useSocialProof();

  return (
    <AnimatePresence>
      {proofMessage && (
        <motion.div 
          initial={{ opacity: 0, x: -50, scale: 0.9 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, x: -20, scale: 0.9 }}
          className="fixed bottom-6 left-6 z-[200] max-w-[280px]"
        >
          <div className="flex items-start gap-3 px-4 py-3 bg-quantum-deep/80 backdrop-blur-md border border-quantum-purple/30 rounded-xl shadow-[0_0_20px_rgba(157,0,255,0.2)]">
            <div className="mt-0.5">
              <Lucide.ShoppingBag size={14} className="text-quantum-purple animate-pulse" />
            </div>
            <span className="font-mono text-[10px] text-white/80 leading-snug">
              {proofMessage}
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
