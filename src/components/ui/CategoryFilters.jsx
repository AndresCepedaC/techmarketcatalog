// [Brand-adapted] — tokens from design-system.json | visual ref: photos/background/ + photos/logo/
import React, { useMemo } from 'react';
import { useStore } from '../../context/StoreContext';
import { useProducts } from '../../hooks/useProducts';
import { WHATSAPP_URL } from '../../config/constants';

export function CategoryFilters() {
  const { selectedCategory, setSelectedCategory } = useStore();
  const { data: products } = useProducts();

  // extraer categorías únicas dinámicamente
  const dynamicCategories = useMemo(() => {
    if (!products) return [];
    const cats = [...new Set(products.map(p => p.category))];
    return cats.sort();
  }, [products]);

  const navItems = useMemo(() => [
    { label: "Todos", category: "Todos" },
    ...dynamicCategories.map(cat => ({ label: cat, category: cat })),
    { label: "Novedades", category: null, href: "#catalog" },
    { label: "Soporte", category: null, href: WHATSAPP_URL, isExternal: true },
  ], [dynamicCategories]);

  return (
    <nav className="mb-20 relative flex justify-center z-20">
      <div className="absolute inset-x-0 bottom-0 h-[1px] bg-gradient-to-r from-transparent via-quantum-cyan/20 to-transparent" />

      {/* Unified Tab Container */}
      <div className="inline-flex overflow-x-auto gap-2 p-2 rounded-[2rem] glass-quantum border border-cyan-500/10 shadow-[0_20px_40px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.05)] scrollbar-hide">
        {navItems.map(item => {
          const isActive = item.category && selectedCategory === item.category;

          if (item.category === null) {
            return (
              <a
                key={item.label}
                href={item.href}
                target={item.isExternal ? "_blank" : undefined}
                rel={item.isExternal ? "noopener noreferrer" : undefined}
                className="whitespace-nowrap px-6 py-3.5 rounded-full text-xs font-black uppercase tracking-[0.2em] transition-all duration-[400ms] text-white/50 hover:text-quantum-cyan hover:bg-quantum-deep/40 relative group"
              >
                {item.label}
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[1px] bg-quantum-cyan transition-all duration-[400ms] group-hover:w-1/2" />
              </a>
            );
          }

          return (
            <button
              key={item.label}
              onClick={() => setSelectedCategory(item.category)}
              className={`whitespace-nowrap px-8 py-3.5 rounded-full text-xs font-black uppercase tracking-[0.2em] transition-all duration-[400ms] relative group ${isActive
                ? 'text-quantum-cyan shadow-[0_0_20px_rgba(0,245,255,0.2)] text-glow-cyan bg-quantum-cyan/10'
                : 'text-white/50 hover:text-white hover:bg-quantum-deep/40'
                }`}
            >
              {item.label}
              {isActive && (
                <div className="absolute inset-0 rounded-full border border-quantum-cyan/30 pointer-events-none mix-blend-screen" />
              )}
              {isActive && (
                <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1/3 h-[2px] bg-quantum-cyan shadow-[0_0_10px_rgba(0,245,255,0.8)]" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
