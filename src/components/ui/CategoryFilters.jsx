import React from 'react';
import { useStore } from '../../context/StoreContext';

const CATS = ["Todos", "Intercomunicadores", "Periféricos", "Accesorios", "Audio", "Smart Home", "Software"];

export function CategoryFilters() {
  const { selectedCategory, setSelectedCategory } = useStore();
  
  return (
    <div className="flex overflow-x-auto gap-3 pb-4 mb-6 scrollbar-hide">
      {CATS.map(cat => {
        const active = selectedCategory === cat;
        return (
          <button
            key={cat} 
            onClick={() => setSelectedCategory(cat)}
            className={`whitespace-nowrap px-5 py-2 rounded-full text-[13px] font-bold transition-all duration-300 border ${active
              ? 'bg-brand-cyan/10 text-brand-cyan border-brand-cyan shadow-[0_0_15px_rgba(0,229,255,0.2)]'
              : 'bg-dark-800 text-gray-400 border-white/[0.06] hover:bg-dark-700 hover:text-white hover:border-white/20'
              }`}
          >
            {cat}
          </button>
        );
      })}
    </div>
  );
}
