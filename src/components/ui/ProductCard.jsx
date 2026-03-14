// [Brand-adapted] — tokens from design-system.json | visual ref: photos/background/ + photos/logo/
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';
import * as Lucide from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { useCart } from '../../context/CartContext';
import { trackProductView } from '../../utils/telemetry';
import { formatPrice } from '../../utils/currency';
import { OptimizedImage } from './OptimizedImage';

const LEVITATE_CLASSES = ['animate-levitate-slow', 'animate-levitate-med', 'animate-levitate-fast'];

const itemVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.96 },
  show: { opacity: 1, y: 0, scale: 1, transition: { type: 'spring', stiffness: 70, damping: 15, mass: 0.8 } }
};

const ProductCardComponent = function ({ product, index }) {
  const { setActiveProduct, currency } = useStore();
  const { addToCart } = useCart();
  const [currentImg, setCurrentImg] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const cardRef = useRef(null);

  // Detect mobile on mount for JS-driven animations
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.matchMedia('(hover: none) and (pointer: coarse)').matches || window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // 3D Tilt Effect Values
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-100, 100], [4, -4]);
  const rotateY = useTransform(x, [-100, 100], [-4, 4]);

  // Normalized product model (from useProducts)
  const titulo = product?.name || 'Tech';
  const precio = product?.price || 0;
  const stock = product?.stock ?? 10;
  const fotos = product?.images?.length ? product.images : [`https://placehold.co/400x400/1C2039/00E5FF?text=${encodeURIComponent(titulo)}`];

  const levitateClass = LEVITATE_CLASSES[index % 3];

  const handleMouseMove = (event) => {
    if (isMobile || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    x.set(event.clientX - rect.left - rect.width / 2);
    y.set(event.clientY - rect.top - rect.height / 2);
  };

  const handleMouseLeave = () => {
    if (isMobile) return;
    x.set(0);
    y.set(0);
  };

  const handleNextImg = (e) => { e.stopPropagation(); setCurrentImg((prev) => (prev + 1) % fotos.length); };
  const handlePrevImg = (e) => { e.stopPropagation(); setCurrentImg((prev) => (prev - 1 + fotos.length) % fotos.length); };

  const handleComprar = (e) => {
    e.stopPropagation();
    addToCart(product);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      variants={itemVariants}
      className={`group relative floating-island overflow-visible cursor-pointer flex flex-col h-full ${levitateClass}`}
      onClick={() => {
        trackProductView(product.name);
        setActiveProduct(product);
      }}
      style={{
        animationDelay: `${index * 0.3}s`,
        rotateX: isMobile ? 0 : rotateX,
        rotateY: isMobile ? 0 : rotateY,
        transformStyle: isMobile ? 'flat' : 'preserve-3d',
        perspective: isMobile ? '1000px',
        willChange: isMobile ? 'auto' : 'transform'
      }}
    >
      {/* Volumetric top light */}
      <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-quantum-cyan/8 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none rounded-t-3xl" />

      {/* Ambient glow on hover */}
      <div className="absolute -inset-2 bg-quantum-cyan/5 md:blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none rounded-3xl" />

      {/* Floating micro-particles inside card */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden hidden md:block">
        {[0, 1, 2].map(i => (
          <div key={i} className="absolute rounded-full bg-quantum-cyan/30 animate-float" style={{
            width: 2 + i, height: 2 + i,
            left: `${20 + i * 30}%`, top: `${30 + i * 20}%`,
            animationDelay: `${i * 1.2}s`,
            boxShadow: `0 0 ${6 + i * 4}px rgba(0, 245, 255, 0.3)`,
          }} />
        ))}
      </div>

      {/* Promo badge */}
      {product?.isPromo && (
        <div className="absolute top-4 right-4 z-20 holo-data px-4 py-1.5 text-[9px] uppercase font-black tracking-[0.3em] bg-quantum-deep/80 backdrop-blur-md rounded-lg border border-quantum-cyan/30">
          ● PROMO
        </div>
      )}

      {/* Product Image Area */}
      <div className="relative aspect-square bg-quantum-deep/40 border-b border-white/5 overflow-hidden flex items-center justify-center rounded-t-3xl" style={{ transform: isMobile ? 'none' : 'translateZ(20px)' }}>
        {fotos.length > 1 && (
          <>
            <button onClick={handlePrevImg} aria-label="Imagen anterior" className="absolute left-3 z-30 p-2.5 glass-quantum text-quantum-cyan rounded-xl opacity-0 hover:bg-quantum-cyan hover:text-quantum-deep group-hover:opacity-100 transition-all shadow-neon-sm">
              <Lucide.ChevronLeft size={16} />
            </button>
            <button onClick={handleNextImg} aria-label="Siguiente imagen" className="absolute right-3 z-30 p-2.5 glass-quantum text-quantum-cyan rounded-xl opacity-0 hover:bg-quantum-cyan hover:text-quantum-deep group-hover:opacity-100 transition-all shadow-neon-sm">
              <Lucide.ChevronRight size={16} />
            </button>
          </>
        )}

        <AnimatePresence mode="wait">
          <OptimizedImage
            key={currentImg}
            layoutId={`product-image-${product.id}`}
            src={fotos[currentImg]}
            alt={titulo}
            className="w-full h-full object-contain p-8 group-hover:scale-110 transition-transform duration-1000 volumetric-glow"
          />
        </AnimatePresence>

        {/* Category as holographic data band */}
        <div className="absolute top-4 left-4 z-20 holo-data px-3 py-1.5 text-[8px] uppercase font-black tracking-[0.4em] bg-quantum-deep/70 backdrop-blur-md rounded-lg border border-quantum-cyan/15">
          {product?.category}
        </div>
      </div>

      {/* Data Section */}
      <div className="p-6 md:p-8 flex flex-col flex-1 relative z-10 bg-quantum-deep/80 md:bg-quantum-deep/40 rounded-b-[24px] md:backdrop-blur-md" style={{ transform: isMobile ? 'none' : 'translateZ(30px)' }}>
        {/* Product Name */}
        <h3 className="font-black text-lg md:text-xl text-white mb-2 line-clamp-2 tracking-tight transition-all group-hover:text-quantum-cyan text-glow-cyan leading-snug">
          {titulo}
        </h3>

        {/* Holographic spec readout */}
        <div className="flex-1">
          <div className="holo-data text-[11px] mb-6 line-clamp-2 leading-relaxed tracking-widest uppercase text-quantum-cyan/60">
            {product?.specs ? Object.values(product.specs).join(" // ") : 'SPEC_NULL'}
          </div>
        </div>

        {/* Conversion Block (Gestalt Grouping) */}
        <div className="mt-4 p-5 rounded-2xl bg-black/20 border border-white/5 flex flex-col gap-5 relative">

          {/* FOMO Scarcity Trigger */}
          {stock <= 5 && (
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 inline-flex items-center gap-1.5 px-3 py-1 bg-danger-red/20 backdrop-blur-md rounded-full border border-danger-red/40 shadow-[0_0_15px_rgba(255,42,95,0.4)] mx-auto z-20 animate-pulse w-max">
              <Lucide.AlertCircle size={10} className="text-danger-red" />
              <span className="text-[9px] uppercase font-black tracking-[0.3em] text-danger-red">
                Últimas {stock} unidades
              </span>
            </div>
          )}

          <div className="flex justify-between items-end">
            <span className="text-[9px] uppercase text-white/40 font-black tracking-[0.4em] mb-1 flex items-center gap-2">
              <Lucide.Tag size={10} className="text-quantum-cyan" /> NET VALUE
            </span>
            <span className="text-3xl font-black text-white group-hover:text-quantum-purple transition-all text-glow-purple drop-shadow-[0_0_15px_rgba(157,0,255,0.4)]">
              {formatPrice(precio, currency)}
            </span>
          </div>

          <button
            onClick={handleComprar}
            className={`neon-wave-btn w-full h-12 rounded-xl font-black text-[12px] uppercase tracking-[0.2em] flex items-center justify-center gap-2 text-quantum-cyan hover:bg-quantum-cyan/10 transition-colors`}
          >
            <Lucide.ShoppingBag size={14} /> ADQUIRIR AL NEXO
          </button>
        </div>
      </div>

      {/* Decorative circuitry grain */}
      <div className="absolute inset-0 micro-circuitry opacity-[0.03] pointer-events-none hidden md:block" />
    </motion.div>
  );
};

export const ProductCard = React.memo(ProductCardComponent, (prevProps, nextProps) => {
  return prevProps.product?.id === nextProps.product?.id;
});
