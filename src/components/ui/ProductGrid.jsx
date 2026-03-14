// [Brand-adapted] — tokens from design-system.json | visual ref: photos/background/ + photos/logo/
import React, { useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as Lucide from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { useProducts } from '../../hooks/useProducts';
import { useDebounce } from '../../hooks/useDebounce';
import { useProductSearch } from '../../hooks/useProductSearch';
import { trackSearch } from '../../utils/telemetry';
import { ProductCard } from './ProductCard';
import { ProductSkeleton } from './ProductSkeleton';
import { CategoryFilters } from './CategoryFilters';

/**
 * Variantes para las secciones y contenedores
 */
const sectionVariants = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  },
  exit: { opacity: 0, scale: 0.95, transition: { duration: 0.3 } }
};

const gridVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

export function ProductGrid() {
  const { searchQuery, selectedCategory } = useStore();
  const { data: products, loading } = useProducts();
  const debouncedSearch = useDebounce(searchQuery, 300);

  // Usar el motor de búsqueda avanzado (Tarea 10)
  const searchResults = useProductSearch(products, debouncedSearch);

  useEffect(() => {
    if (debouncedSearch.trim()) {
      trackSearch(debouncedSearch, searchResults.length);
    }
  }, [debouncedSearch, searchResults.length]);

  // Lógica de filtrado y agrupamiento
  const renderMode = useMemo(() => {
    if (debouncedSearch.trim()) return 'SEARCH';
    if (selectedCategory !== "Todos") return 'CATEGORY';
    return 'ALL';
  }, [debouncedSearch, selectedCategory]);

  const displayedContent = useMemo(() => {
    if (renderMode === 'SEARCH') return searchResults;
    if (renderMode === 'CATEGORY') {
      return products.filter(p => p.category === selectedCategory);
    }
    // Agrupar por categorías para el modo 'ALL'
    const groups = {};
    products.forEach(p => {
      if (!groups[p.category]) groups[p.category] = [];
      groups[p.category].push(p);
    });
    return groups;
  }, [renderMode, searchResults, products, selectedCategory]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-20 mt-12 grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-10">
        {[1, 2, 3, 4, 5, 6, 7, 8].map(i => <ProductSkeleton key={i} />)}
      </div>
    );
  }

  return (
    <section className="max-w-7xl mx-auto px-4 md:px-8 py-20 relative overflow-hidden" id="catalog">
      <div className="absolute inset-0 micro-circuitry opacity-[0.02] pointer-events-none" />

      <CategoryFilters />

      <div className="relative z-10">
        <AnimatePresence mode="wait">
          {renderMode === 'ALL' ? (
            <motion.div
              key="sections-grid"
              variants={gridVariants}
              initial="hidden"
              animate="show"
              exit="exit"
              className="space-y-32"
            >
              {Object.entries(displayedContent).map(([category, items], idx) => (
                <CategorySection key={category} title={category} items={items} index={idx} />
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="simple-grid"
              variants={sectionVariants}
              initial="hidden"
              animate="show"
              exit="exit"
              layout
            >
              {displayedContent.length > 0 ? (
                <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-10">
                  {displayedContent.map((p, i) => (
                    <ProductCard key={p.id} product={p} index={i} />
                  ))}
                </div>
              ) : (
                <EmptyState />
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

function CategorySection({ title, items, index }) {
  return (
    <motion.div
      variants={sectionVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      className="space-y-12"
      layout
    >
      <div className="flex items-center gap-6">
        <h2 className="text-2xl md:text-4xl font-black text-quantum-cyan uppercase tracking-[0.3em] text-glow-cyan">
          {title}
        </h2>
        <div className="h-px flex-1 bg-gradient-to-r from-quantum-cyan/50 via-quantum-purple/20 to-transparent" />
        <span className="text-[10px] font-mono text-white/20 tracking-widest">
          SEC_{index.toString().padStart(2, '0')}
        </span>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-10">
        {items.map((p, i) => (
          <ProductCard key={p.id} product={p} index={i} />
        ))}
      </div>
    </motion.div>
  );
}

function EmptyState() {
  return (
    <div className="py-32 text-center glass-quantum rounded-3xl border border-white/5 p-12 max-w-2xl mx-auto">
      <Lucide.Zap size={56} className="mx-auto mb-6 text-quantum-cyan/20 animate-pulse" />
      <h3 className="text-white/80 text-xl font-bold tracking-tight mb-2">Protocolo sin resultados</h3>
      <p className="text-white/40 text-sm uppercase tracking-widest font-mono">
        Ajusta tus parámetros de búsqueda o cambia de categoría.
      </p>
    </div>
  );
}
