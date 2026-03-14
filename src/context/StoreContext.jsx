// [Brand-adapted] — tokens from design-system.json | visual ref: photos/background/ + photos/logo/
import React, { createContext, useContext, useState, useMemo } from 'react';
import { DEFAULT_CURRENCY, STORAGE_KEYS } from '../config/constants';
import { useLocalStorage } from '../hooks/useLocalStorage';

const StoreStateContext = createContext();
const StoreDispatchContext = createContext();

export function StoreProvider({ children }) {
  const [activeProduct, setActiveProduct] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [currency, setCurrency] = useState(DEFAULT_CURRENCY);

  // Usar hook abstracto para la categoría seleccionada
  const [selectedCategory, setSelectedCategory] = useLocalStorage(STORAGE_KEYS.CATEGORY, "Todos");

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
  }), [setSelectedCategory]);

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

export function useStore() {
  const state = useStoreState();
  const dispatch = useStoreDispatch();
  return { ...state, ...dispatch };
}
