import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as Lucide from 'lucide-react';

export function useNetwork() {
  const [isOnline, setIsOnline] = useState(
    typeof navigator !== 'undefined' ? navigator.onLine : true
  );

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return isOnline;
}

export function OfflineBanner() {
  const isOnline = useNetwork();

  return (
    <AnimatePresence>
      {!isOnline && (
        <motion.div
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
          className="fixed top-0 inset-x-0 z-[9999] flex justify-center pointer-events-none"
        >
          <div className="mt-4 px-6 py-3 rounded-b-2xl rounded-t-sm bg-danger-red/10 border-b border-x border-danger-red/40 backdrop-blur-md shadow-[0_10px_40px_rgba(255,42,95,0.25)] flex items-center justify-center gap-3">
            <Lucide.WifiOff size={18} className="text-danger-red animate-pulse" />
            <span className="text-[11px] font-black uppercase tracking-[0.3em] text-danger-red holo-data">
              SISTEMA OFFLINE - ESPERANDO CONEXIÓN...
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
