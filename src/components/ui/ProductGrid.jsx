// [Brand-adapted] — tokens from design-system.json | visual ref: photos/background/ + photos/logo/
import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import * as Lucide from 'lucide-react';
import Fuse from 'fuse.js';
import { useStoreState } from '../../context/StoreContext';
import { useDebounce } from '../../hooks/useDebounce';
import { useProducts } from '../../hooks/useProducts';
import { trackSearch } from '../../utils/telemetry';
import { ProductCard } from './ProductCard';
import { ProductSkeleton } from './ProductSkeleton';
import { CategoryFilters } from './CategoryFilters';

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 }
  }
};

export function ProductGrid() {
  const { searchQuery, selectedCategory } = useStoreState();
  const debouncedSearch = useDebounce(searchQuery, 300);
  const { data: products, loading } = useProducts();

  useEffect(() => {
    if (debouncedSearch.trim()) {
      trackSearch(debouncedSearch);
    }
  }, [debouncedSearch]);

  const filtered = useMemo(() => {
    let list = products || [];
    if (selectedCategory !== "Todos") list = list.filter(p => p?.category === selectedCategory);
    if (debouncedSearch.trim()) {
      const fuse = new Fuse(list, {
        keys: ['name', 'category', 'specs.*'],
        threshold: 0.3,
        ignoreLocation: true
      });
      list = fuse.search(debouncedSearch).map(result => result.item);
    }
    return list;
  }, [debouncedSearch, selectedCategory, products]);

  const categoriesToRender = useMemo(() => [...new Set(filtered.map(p => p.category))], [filtered]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-20 mt-12">
        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-10">
          {[1, 2, 3, 4, 5, 6].map(i => (
            <ProductSkeleton key={i} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <section className="max-w-7xl mx-auto px-4 md:px-8 py-20 relative" id="catalog">
      {/* Micro-circuitry backdrop */}
      <div className="absolute inset-0 micro-circuitry opacity-[0.02] pointer-events-none" />

      <CategoryFilters />

      {/* 3D Perspective Container */}
      <div className="flex flex-col gap-40 perspective-deep">
        {categoriesToRender.length > 0 ? (
          categoriesToRender.map((cat, idx) => {
            // Alternate ambient gradients between categories for mini-world feel
            const isEven = idx % 2 === 0;
            const bgGradient = isEven
              ? 'bg-gradient-to-br from-quantum-cyan/5 via-transparent to-quantum-purple/5'
              : 'bg-gradient-to-tr from-quantum-purple/5 via-transparent to-quantum-cyan/5';

            return (
              <div key={cat} className={`relative flex flex-col gap-16 p-8 md:p-12 rounded-[40px] border border-white/5 ${bgGradient} overflow-hidden group/cat transition-all duration-700 hover:border-quantum-cyan/20`}>

                {/* Immersive Category Background Blur */}
                <div className="absolute inset-0 bg-quantum-deep/40 backdrop-blur-xl -z-10" />
                <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] bg-quantum-cyan/10 blur-[120px] rounded-full pointer-events-none -z-10 opacity-50 group-hover/cat:opacity-100 transition-opacity duration-1000" />
                <div className="absolute -bottom-[20%] -right-[10%] w-[50%] h-[50%] bg-quantum-purple/10 blur-[120px] rounded-full pointer-events-none -z-10 opacity-50 group-hover/cat:opacity-100 transition-opacity duration-1000" />

                {/* Category Megatray Header */}
                <div className="flex flex-col md:flex-row md:items-end gap-6 md:gap-12 relative z-10">
                  <div className="flex flex-col relative">
                    <div className="inline-flex items-center gap-3 mb-4">
                      <span className="w-1.5 h-1.5 rounded-full bg-quantum-cyan animate-pulse" />
                      <span className="text-[10px] font-black uppercase tracking-[0.5em] text-quantum-cyan/60 holo-data">
                        SECTOR // 0{idx + 1}
                      </span>
                    </div>
                    <h2 className="text-5xl md:text-7xl font-black text-white uppercase tracking-tighter leading-none text-glow-cyan mix-blend-lighten drop-shadow-[0_0_30px_rgba(0,245,255,0.2)]">
                      {cat}
                    </h2>
                  </div>
                  <div className="h-[2px] flex-1 bg-gradient-to-r from-quantum-cyan/40 via-quantum-purple/20 to-transparent mt-4 md:mb-4 relative overflow-hidden">
                    <div className="absolute inset-0 w-1/3 h-full bg-white/40 blur-[2px] animate-data-stream" style={{ animationDuration: '3s' }} />
                  </div>
                </div>

                {/* Floating Products Grid */}
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, amount: 0.1 }}
                  className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-10 preserve-3d"
                >
                  {filtered.filter(p => p.category === cat).map((p, idx) => (
                    <ProductCard key={p.id} product={p} index={idx} />
                  ))}
                </motion.div>
              </div>
            );
          })
        ) : (
          <div className="py-32 text-center floating-island max-w-2xl mx-auto p-12">
            <Lucide.Zap size={56} className="mx-auto mb-6 text-quantum-cyan/20 animate-pulse volumetric-glow" />
            <p className="text-white/40 text-xl font-medium tracking-tight">Protocolo de búsqueda sin resultados.</p>
            <p className="text-quantum-cyan/20 text-xs mt-2 uppercase tracking-widest holo-data">Intenta con otros términos</p>
          </div>
        )}
      </div>
    </section>
  );
}
