import { describe, it, expect } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useCrossSelling } from '../../hooks/useCrossSelling';

const mockProducts = [
    { id: '1', name: 'Mouse Gamer', category: 'Periféricos', price: 80000 },
    { id: '2', name: 'Teclado', category: 'Periféricos', price: 120000 },
    { id: '3', name: 'Webcam', category: 'Periféricos', price: 60000 },
    { id: '4', name: 'Monitor', category: 'Periféricos', price: 450000 },
    { id: '5', name: 'Audífonos', category: 'Audio', price: 30000 },
    { id: '6', name: 'Micrófono', category: 'Audio', price: 45000 },
];

describe('useCrossSelling', () => {
    it('returns related products from the same category', () => {
        const { result } = renderHook(() =>
            useCrossSelling('1', 'Periféricos', mockProducts, 3)
        );

        const items = result.current;
        expect(items.length).toBeLessThanOrEqual(3);
        items.forEach(item => {
            expect(item.category).toBe('Periféricos');
        });
    });

    it('does not include the current product', () => {
        const { result } = renderHook(() =>
            useCrossSelling('1', 'Periféricos', mockProducts, 10)
        );

        const ids = result.current.map(p => p.id);
        expect(ids).not.toContain('1');
    });

    it('returns empty array when no products match category', () => {
        const { result } = renderHook(() =>
            useCrossSelling('5', 'Nonexistent', mockProducts, 3)
        );

        expect(result.current).toEqual([]);
    });

    it('returns empty array when allProducts is null', () => {
        const { result } = renderHook(() =>
            useCrossSelling('1', 'Periféricos', null, 3)
        );

        expect(result.current).toEqual([]);
    });

    it('limits results to the specified count', () => {
        const { result } = renderHook(() =>
            useCrossSelling('1', 'Periféricos', mockProducts, 2)
        );

        expect(result.current.length).toBeLessThanOrEqual(2);
    });

    it('returns all matching products when count exceeds matches', () => {
        // Audio category only has Audífonos and Micrófono
        const { result } = renderHook(() =>
            useCrossSelling('5', 'Audio', mockProducts, 10)
        );

        expect(result.current).toHaveLength(1); // Only Micrófono (Audífonos is excluded as current)
        expect(result.current[0].id).toBe('6');
    });
});
