// [Brand-adapted] — tokens from design-system.json | visual ref: photos/background/ + photos/logo/
import React, { createContext, useContext, useState, useMemo, useEffect } from 'react';

const StoreStateContext = createContext();
const StoreDispatchContext = createContext();

export function StoreProvider({ children }) {
  const [activeProduct, setActiveProduct] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [currency, setCurrency] = useState('COP'); 
  const [selectedCategory, setSelectedCategory] = useState(() => {
    return localStorage.getItem('techmarket_category') || "Todos";
  });

  useEffect(() => {
    localStorage.setItem('techmarket_category', selectedCategory);
  }, [selectedCategory]);

  const state = useMemo(() => ({
    activeProduct,
    searchQuery,
    selectedCategory,
    currency
  }), [activeProduct, searchQuery, selectedCategory, currency]);

  const dispatch = useMemo(() => ({
    setActiveProduct,
    setSearchQuery,
    setSelectedCategory,
    setCurrency
  }), []);

  return (
    <StoreStateContext.Provider value={state}>
      <StoreDispatchContext.Provider value={dispatch}>
        {children}
      </StoreDispatchContext.Provider>
    </StoreStateContext.Provider>
  );
}

export function useStoreState() {
  const context = useContext(StoreStateContext);
  if (context === undefined) {
    throw new Error('useStoreState must be used within a StoreProvider');
  }
  return context;
}

export function useStoreDispatch() {
  const context = useContext(StoreDispatchContext);
  if (context === undefined) {
    throw new Error('useStoreDispatch must be used within a StoreProvider');
  }
  return context;
}

// Retro-compatibilidad temporal (evita romper componentes no migrados si los hay)
export function useStore() {
  const state = useStoreState();
  const dispatch = useStoreDispatch();
  return { ...state, ...dispatch };
}
