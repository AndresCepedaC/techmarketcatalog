import React from 'react';
import { useStore } from '../../context/StoreContext';

const NAV_ITEMS = [
  { label: "Inicio", category: "Todos" },
  { label: "Intercomunicadores", category: "Intercomunicadores" },
  { label: "Periféricos", category: "Periféricos" },
  { label: "Audio", category: "Audio" },
  { label: "Smart Home", category: "Smart Home" },
  { label: "Accesorios", category: "Accesorios" },
  { label: "Software", category: "Software" },
  { label: "Novedades", category: null, href: "#catalog" },
  { label: "Soporte", category: null, href: "https://wa.me/573005054912" },
];

export function CategoryFilters() {
  const { selectedCategory, setSelectedCategory } = useStore();
  
  return (
    <nav className="border-b border-white/5 mb-16">
      <div className="flex overflow-x-auto gap-0 scrollbar-hide">
        {NAV_ITEMS.map(item => {
          const isActive = item.category && selectedCategory === item.category;
          const isExternal = item.href && item.href.startsWith('http');
          
          if (item.category === null) {
            return (
              <a
                key={item.label}
                href={item.href}
                target={isExternal ? "_blank" : undefined}
                rel={isExternal ? "noopener noreferrer" : undefined}
                className="whitespace-nowrap px-6 py-4 text-[13px] font-bold tracking-wide text-white/30 hover:text-quantum-cyan transition-all duration-300 border-b-2 border-transparent hover:border-quantum-cyan/30"
              >
                {item.label}
              </a>
            );
          }
          
          return (
            <button
              key={item.label}
              onClick={() => setSelectedCategory(item.category)}
              className={`whitespace-nowrap px-6 py-4 text-[13px] font-bold tracking-wide transition-all duration-300 border-b-2 ${isActive
                ? 'text-quantum-cyan border-quantum-cyan text-glow-cyan'
                : 'text-white/40 border-transparent hover:text-white/70 hover:border-quantum-cyan/20'
              }`}
            >
              {item.label}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
