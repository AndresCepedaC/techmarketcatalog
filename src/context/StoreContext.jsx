// [Brand-adapted] — tokens from design-system.json | visual ref: photos/background/ + photos/logo/
import React, { createContext, useContext, useState, useMemo } from 'react';

const StoreContext = createContext();

export function StoreProvider({ children }) {
  const [activeProduct, setActiveProduct] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Todos");

  const value = useMemo(() => ({
    activeProduct, setActiveProduct,
    searchQuery, setSearchQuery,
    selectedCategory, setSelectedCategory
  }), [activeProduct, searchQuery, selectedCategory]);

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
}
