import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import * as Lucide from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { ProductCard } from './ProductCard';
import { CategoryFilters } from './CategoryFilters';

const containerVariants = { show: { transition: { staggerChildren: 0.15 } } };

export function ProductGrid() {
  const { searchQuery, selectedCategory } = useStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(t);
  }, []);

  const filtered = useMemo(() => {
    let list = window.PRODUCTS || [];
    if (selectedCategory !== "Todos") list = list.filter(p => p?.category === selectedCategory);
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(p => 
        p?.name?.toLowerCase().includes(q) || 
        Object.values(p?.specs || {}).some(v => v?.toLowerCase().includes(q))
      );
    }
    return list;
  }, [searchQuery, selectedCategory]);

  const categoriesToRender = useMemo(() => [...new Set(filtered.map(p => p.category))], [filtered]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-20">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {[1,2,3,4,5,6,7,8].map(i => (
            <div key={i} className="aspect-square shimmer rounded-3xl opacity-20 border border-white/5" />
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
      <div className="flex flex-col gap-32 perspective-deep">
        {categoriesToRender.length > 0 ? (
          categoriesToRender.map(cat => (
            <div key={cat} className="flex flex-col gap-14">
              {/* Category Megatray Header */}
              <div className="flex items-center gap-8 group">
                <div className="flex flex-col relative">
                  <span className="text-[10px] font-black uppercase tracking-[0.5em] text-quantum-cyan/40 mb-2 holo-data">
                    SECTOR // 0{categoriesToRender.indexOf(cat) + 1}
                  </span>
                  <h2 className="text-4xl md:text-6xl font-black quantum-gradient-text uppercase tracking-tighter leading-none text-glow-cyan">
                    {cat}
                  </h2>
                  {/* Neon megatray underline */}
                  <div className="absolute -bottom-3 left-0 w-full h-[2px] bg-gradient-to-r from-quantum-cyan/40 via-quantum-purple/20 to-transparent" />
                </div>
                <div className="h-px flex-1 bg-gradient-to-r from-quantum-cyan/10 via-quantum-purple/5 to-transparent mt-8" />
              </div>

              {/* Floating Products Grid */}
              <motion.div 
                variants={containerVariants} 
                initial="hidden" 
                animate="show" 
                className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-10 preserve-3d"
              >
                {filtered.filter(p => p.category === cat).map((p, idx) => (
                  <ProductCard key={p.id} product={p} index={idx} />
                ))}
              </motion.div>
            </div>
          ))
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
