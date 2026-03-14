import React from 'react';
import { useRegisterSW } from 'virtual:pwa-register/react';
import { motion, AnimatePresence } from 'framer-motion';
import * as Lucide from 'lucide-react';

/**
 * ReloadPrompt Component
 * 
 * Muestra un banner cuando hay una actualización de la PWA disponible.
 * Utiliza el Design System Quantum-Neon del proyecto.
 */
export function ReloadPrompt() {
    const {
        offlineReady: [offlineReady, setOfflineReady],
        needRefresh: [needRefresh, setNeedRefresh],
        updateServiceWorker,
    } = useRegisterSW({
        onRegistered(r) {
            console.log('SW Registered: ' + r);
        },
        onRegisterError(error) {
            console.log('SW registration error', error);
        },
    });

    const close = () => {
        setOfflineReady(false);
        setNeedRefresh(false);
    };

    return (
        <AnimatePresence>
            {(offlineReady || needRefresh) && (
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 50 }}
                    className="fixed bottom-24 right-6 z-[300] max-w-sm"
                >
                    <div className="glass-quantum border border-quantum-cyan/30 p-6 rounded-2xl shadow-neon-lg flex flex-col gap-4">
                        <div className="flex items-start gap-4">
                            <div className="p-3 bg-quantum-cyan/10 rounded-xl">
                                <Lucide.RefreshCw size={24} className="text-quantum-cyan animate-spin-slow" />
                            </div>
                            <div className="flex-1">
                                <h4 className="text-sm font-black text-white uppercase tracking-widest mb-1">
                                    {needRefresh ? 'Actualización Disponible' : 'Listo para Offline'}
                                </h4>
                                <p className="text-xs text-white/50 leading-relaxed font-mono uppercase tracking-tighter">
                                    {needRefresh
                                        ? 'Nueva versión del nexo detectada. Sincroniza ahora para la mejor experiencia.'
                                        : 'La aplicación ha sido cacheada y está lista para funcionar sin red.'}
                                </p>
                            </div>
                        </div>

                        <div className="flex gap-3">
                            {needRefresh && (
                                <button
                                    onClick={() => updateServiceWorker(true)}
                                    className="flex-1 py-3 rounded-xl bg-quantum-cyan text-quantum-deep text-[10px] font-black uppercase tracking-[0.2em] hover:bg-white transition-all shadow-neon-sm"
                                >
                                    Sincronizar
                                </button>
                            )}
                            <button
                                onClick={close}
                                className="flex-1 py-3 rounded-xl border border-white/10 hover:bg-white/5 text-[10px] text-white/60 font-black uppercase tracking-[0.2em] transition-all"
                            >
                                Ignorar
                            </button>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
