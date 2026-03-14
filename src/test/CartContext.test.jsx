import React from 'react';
import { describe, it, expect, beforeEach } from 'vitest';
import { render, act } from '@testing-library/react';
import { CartProvider, useCart } from '../../context/CartContext';

// Helper component to expose cart actions and state for testing
function CartTestConsumer({ onReady }) {
    const cart = useCart();
    React.useEffect(() => {
        onReady(cart);
    });
    return null;
}

function renderCart() {
    let cartApi;
    render(
        <CartProvider>
            <CartTestConsumer onReady={(api) => { cartApi = api; }} />
        </CartProvider>
    );
    return cartApi;
}

const mockProduct1 = {
    id: '1',
    name: 'Mouse Gamer',
    price: 80000,
    images: ['/mouse.jpg'],
    category: 'Periféricos',
};

const mockProduct2 = {
    id: '2',
    name: 'Teclado Mecánico',
    price: 120000,
    images: ['/keyboard.jpg'],
    category: 'Periféricos',
};

describe('CartContext', () => {
    beforeEach(() => {
        localStorage.clear();
    });

    it('starts with an empty cart', () => {
        const cart = renderCart();
        expect(cart.cartItems).toEqual([]);
        expect(cart.cartTotal).toBe(0);
        expect(cart.totalItems).toBe(0);
    });

    it('adds a product to the cart', () => {
        let cart = renderCart();
        act(() => {
            cart.addToCart(mockProduct1);
        });
        // Re-read after state update
        expect(cart.cartItems).toHaveLength(1);
        expect(cart.cartItems[0].product.id).toBe('1');
        expect(cart.cartItems[0].quantity).toBe(1);
    });

    it('increments quantity when adding the same product twice', () => {
        let cart = renderCart();
        act(() => {
            cart.addToCart(mockProduct1);
        });
        act(() => {
            cart.addToCart(mockProduct1);
        });
        expect(cart.cartItems).toHaveLength(1);
        expect(cart.cartItems[0].quantity).toBe(2);
    });

    it('removes a product from the cart', () => {
        let cart = renderCart();
        act(() => {
            cart.addToCart(mockProduct1);
            cart.addToCart(mockProduct2);
        });
        act(() => {
            cart.removeFromCart('1');
        });
        expect(cart.cartItems).toHaveLength(1);
        expect(cart.cartItems[0].product.id).toBe('2');
    });

    it('calculates cart total correctly', () => {
        let cart = renderCart();
        act(() => {
            cart.addToCart(mockProduct1); // 80000
            cart.addToCart(mockProduct2); // 120000
            cart.addToCart(mockProduct1); // 80000 again (qty 2)
        });
        // 80000 * 2 + 120000 * 1 = 280000
        expect(cart.cartTotal).toBe(280000);
        expect(cart.totalItems).toBe(3);
    });
});
