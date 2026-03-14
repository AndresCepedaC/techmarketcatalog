import { describe, it, expect } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useCrossSelling } from './useCrossSelling';

const mockProducts = [
    { id: 1, name: 'Prod A', category: 'Cat1' },
    { id: 2, name: 'Prod B', category: 'Cat1' },
    { id: 3, name: 'Prod C', category: 'Cat1' },
    { id: 4, name: 'Prod D', category: 'Cat1' },
    { id: 5, name: 'Prod E', category: 'Cat2' },
];

describe('useCrossSelling', () => {
    it('debería devolver productos de la misma categoría excluyendo el activo', () => {
        const activeProduct = { id: 1, category: 'Cat1' };
        const { result } = renderHook(() => useCrossSelling(activeProduct, mockProducts));

        expect(result.current).toHaveLength(3);
        result.current.forEach(prod => {
            expect(prod.category).toBe('Cat1');
            expect(prod.id).not.toBe(1);
        });
    });

    it('no debería devolver más de 3 elementos', () => {
        const activeProduct = { id: 5, category: 'Cat2' };
        // Solo hay un producto de Cat2 (el activo), no debería devolver nada
        const { result } = renderHook(() => useCrossSelling(activeProduct, mockProducts));
        expect(result.current).toHaveLength(0);
    });

    it('debería devolver un array vacío si no hay productos o no hay activo', () => {
        const { result: noActive } = renderHook(() => useCrossSelling(null, mockProducts));
        expect(noActive.current).toEqual([]);

        const { result: noProducts } = renderHook(() => useCrossSelling({ id: 1 }, null));
        expect(noProducts.current).toEqual([]);
    });
});
