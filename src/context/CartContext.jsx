import React, { createContext, useContext, useState, useMemo, useCallback, useReducer, useEffect } from 'react';
import { STORAGE_KEYS } from '../config/constants';
import { useLocalStorage } from '../hooks/useLocalStorage';

const CartContext = createContext();

/**
 * Acciones para el Reducer
 */
const ACTION_TYPES = {
  ADD_ITEM: 'ADD_ITEM',
  REMOVE_ITEM: 'REMOVE_ITEM',
  UPDATE_QUANTITY: 'UPDATE_QUANTITY',
  CLEAR_CART: 'CLEAR_CART'
};

/**
 * cartReducer
 * 
 * Lógica pura de mutación de estado del carrito.
 */
function cartReducer(state, action) {
  switch (action.type) {
    case ACTION_TYPES.ADD_ITEM: {
      const { product } = action.payload;
      const existing = state.find(item => item.product.id === product.id);
      if (existing) {
        return state.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...state, { product, quantity: 1 }];
    }

    case ACTION_TYPES.REMOVE_ITEM: {
      const { productId } = action.payload;
      return state.filter(item => item.product.id !== productId);
    }

    case ACTION_TYPES.UPDATE_QUANTITY: {
      const { productId, qty } = action.payload;
      if (qty < 1) return state;
      return state.map(item =>
        item.product.id === productId ? { ...item, quantity: qty } : item
      );
    }

    case ACTION_TYPES.CLEAR_CART: {
      return [];
    }

    default:
      return state;
  }
}

export function CartProvider({ children }) {
  // 1. Obtener valor inicial y función de persistencia de Tarea 3
  const [storedItems, setStoredItems] = useLocalStorage(STORAGE_KEYS.CART, []);

  // 2. Inicializar useReducer con el valor de localStorage
  const [cartItems, dispatch] = useReducer(cartReducer, storedItems);

  // 3. Sincronizar cambios del reducer con localStorage
  useEffect(() => {
    setStoredItems(cartItems);
  }, [cartItems, setStoredItems]);

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  /**
   * API del Contexto (mantiene retrocompatibilidad)
   */

  const addToCart = useCallback((product) => {
    dispatch({ type: ACTION_TYPES.ADD_ITEM, payload: { product } });

    // UX Feedback (Toast)
    setToastMessage(`SISTEMA: ${product.name} añadido al enlace de datos.`);
    setTimeout(() => setToastMessage(null), 3000);
  }, []);

  const removeFromCart = useCallback((productId) => {
    dispatch({ type: ACTION_TYPES.REMOVE_ITEM, payload: { productId } });
  }, []);

  const updateQuantity = useCallback((productId, qty) => {
    dispatch({ type: ACTION_TYPES.UPDATE_QUANTITY, payload: { productId, qty } });
  }, []);

  const clearCart = useCallback(() => {
    dispatch({ type: ACTION_TYPES.CLEAR_CART });
  }, []);

  const cartTotal = useMemo(() => {
    return cartItems.reduce((total, item) => {
      const price = item.product.price || 0;
      return total + (price * item.quantity);
    }, 0);
  }, [cartItems]);

  const totalItems = useMemo(() => {
    return cartItems.reduce((acc, item) => acc + item.quantity, 0);
  }, [cartItems]);

  const value = {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    cartTotal,
    totalItems,
    isCartOpen,
    setIsCartOpen,
    toastMessage
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (ctx === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return ctx;
}
