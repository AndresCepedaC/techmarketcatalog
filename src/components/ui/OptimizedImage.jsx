import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * OptimizedImage Component
 * 
 * Implementa lazy loading nativo, esqueletos de carga animados
 * y una transición suave de fade-in al completarse la carga.
 * Soporta layoutId para Framer Motion.
 */
export function OptimizedImage({ src, alt, className = "", layoutId, ...props }) {
    const [isLoaded, setIsLoaded] = useState(false);

    return (
        <div className={`relative overflow-hidden ${className}`}>
            {/* Esqueleto de carga con efecto pulso */}
            <AnimatePresence>
                {!isLoaded && (
                    <motion.div
                        initial={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                        className="absolute inset-0 bg-white/5 animate-pulse z-10"
                    />
                )}
            </AnimatePresence>

            {/* Imagen con lazy loading y fade-in */}
            <motion.img
                src={src}
                alt={alt}
                layoutId={layoutId}
                loading="lazy"
                onLoad={() => setIsLoaded(true)}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{
                    opacity: isLoaded ? 1 : 0,
                    scale: isLoaded ? 1 : 1.05
                }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className={`w-full h-full object-cover relative z-0 ${className}`}
                {...props}
            />
        </div>
    );
}
