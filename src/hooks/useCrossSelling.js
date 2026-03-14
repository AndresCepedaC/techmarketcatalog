import { useMemo } from 'react';

/**
 * useCrossSelling(productId, productCategory, allProducts, count)
 * 
 * Returns an array of related products from the same category,
 * excluding the current product. Shuffled randomly, limited to `count`.
 */
export function useCrossSelling(productId, productCategory, allProducts, count = 3) {
    return useMemo(() => {
        if (!allProducts || !productId) return [];

        const related = allProducts.filter(
            p => p.id !== productId && p.category === productCategory
        );

        // Fisher-Yates shuffle (copy first to avoid mutation)
        const shuffled = [...related];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }

        return shuffled.slice(0, count);
    }, [productId, productCategory, allProducts, count]);
}
