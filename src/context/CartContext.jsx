import React, { createContext, useContext, useState, useMemo, useCallback } from 'react';
import { STORAGE_KEYS } from '../config/constants';
import { useLocalStorage } from '../hooks/useLocalStorage';

const CartContext = createContext();

export function CartProvider({ children }) {
  // Usar el nuevo hook de abstracción de storage
  const [cartItems, setCartItems] = useLocalStorage(STORAGE_KEYS.CART, []);

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  const addToCart = useCallback((product) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });

    // Disparar Toast
    const nombre = product.name;
    setToastMessage(`SISTEMA: ${nombre} añadido al enlace de datos.`);

    // Ocultar toast después de 3 segundos
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  }, [setCartItems]);

  const removeFromCart = useCallback((productId) => {
    setCartItems(prev => prev.filter(item => item.product.id !== productId));
  }, [setCartItems]);

  const updateQuantity = useCallback((productId, qty) => {
    if (qty < 1) return;
    setCartItems(prev => prev.map(item =>
      item.product.id === productId ? { ...item, quantity: qty } : item
    ));
  }, [setCartItems]);

  const clearCart = useCallback(() => {
    setCartItems([]);
  }, [setCartItems]);

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
