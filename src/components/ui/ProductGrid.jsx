import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useStore } from '../../context/StoreContext';
import { ProductCard } from './ProductCard';
import { CategoryFilters } from './CategoryFilters';

const containerVariants = { show: { transition: { staggerChildren: 0.1 } } };

export function ProductGrid() {
  const { searchQuery, selectedCategory } = useStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate initial load for performance perception
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
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1,2,3,4].map(i => (
            <div key={i} className="aspect-square bg-dark-800 animate-pulse rounded-2xl" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <section className="max-w-7xl mx-auto px-4 md:px-6 py-8" id="catalog">
      <CategoryFilters />
      <div className="flex flex-col gap-16">
        {categoriesToRender.length > 0 ? (
          categoriesToRender.map(cat => (
            <div key={cat} className="flex flex-col gap-8">
              <div className="flex items-center gap-4">
                <h2 className="text-2xl md:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-brand-purple to-brand-cyan">
                  {cat}
                </h2>
                <div className="h-px flex-1 bg-gradient-to-r from-brand-cyan/20 to-transparent" />
              </div>
              <motion.div 
                variants={containerVariants} 
                initial="hidden" 
                animate="show" 
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8"
              >
                {filtered.filter(p => p.category === cat).map((p, idx) => (
                  <ProductCard key={p.id} product={p} index={idx} />
                ))}
              </motion.div>
            </div>
          ))
        ) : (
          <div className="py-20 text-center">
            <p className="text-gray-500 text-lg italic">No se encontraron productos que coincidan con tu búsqueda.</p>
          </div>
        )}
      </div>
    </section>
  );
}
