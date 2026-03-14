import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen, act } from '@testing-library/react';
import { CartProvider, useCart } from './CartContext';

// Componente dummy para interactuar con el context
const TestComponent = () => {
    const { cartItems, addToCart, totalItems, cartTotal } = useCart();
    return (
        <div>
            <div data-testid="total-items">{totalItems}</div>
            <div data-testid="cart-total">{cartTotal}</div>
            <button onClick={() => addToCart({ id: 1, name: 'Test Prod', price: 100 })}>
                Add Product
            </button>
        </div>
    );
};

describe('CartContext Integration', () => {
    it('debería aumentar totalItems y cartTotal al usar addToCart', async () => {
        render(
            <CartProvider>
                <TestComponent />
            </CartProvider>
        );

        const addButton = screen.getByText('Add Product');
        const totalItemsEl = screen.getByTestId('total-items');
        const cartTotalEl = screen.getByTestId('cart-total');

        expect(totalItemsEl.textContent).toBe('0');
        expect(cartTotalEl.textContent).toBe('0');

        await act(async () => {
            addButton.click();
        });

        expect(totalItemsEl.textContent).toBe('1');
        expect(cartTotalEl.textContent).toBe('100');
    });
});
