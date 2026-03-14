import { useMemo } from 'react';

/**
 * Hook para obtener productos relacionados (Cross-Selling).
 * Filtra por categoría y excluye el producto activo.
 */
export function useCrossSelling(activeProduct, allProducts) {
    return useMemo(() => {
        if (!activeProduct || !allProducts) return [];

        const related = allProducts.filter(
            (p) => p.category === activeProduct.category && p.id !== activeProduct.id
        );

        // Orden aleatorio simple y devolver los primeros 3
        return related.sort(() => 0.5 - Math.random()).slice(0, 3);
    }, [activeProduct, allProducts]);
}
