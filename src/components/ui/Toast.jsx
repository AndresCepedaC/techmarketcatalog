import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as Lucide from 'lucide-react';
import { useCart } from '../../context/CartContext';

export function Toast() {
  const { toastMessage } = useCart();

  return (
    <AnimatePresence>
      {toastMessage && (
        <motion.div 
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.9 }}
          className="fixed bottom-6 right-6 z-[200]"
        >
          <div className="flex items-center gap-3 px-6 py-4 bg-success-green/10 backdrop-blur-md border border-success-green/30 rounded-xl shadow-[0_0_20px_rgba(0,255,157,0.2)]">
            <Lucide.Terminal size={18} className="text-success-green animate-pulse" />
            <span className="font-mono text-xs text-success-green font-bold tracking-wider">
              {toastMessage}
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
