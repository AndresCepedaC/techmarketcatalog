import { useMemo } from 'react';
import Fuse from 'fuse.js';

/**
 * useProductSearch
 * 
 * Hook que encapsula la lógica de búsqueda difusa (fuzzy search) usando Fuse.js.
 * Optimizado para rendimiento con useMemo.
 */
export function useProductSearch(products, searchQuery) {
    const fuse = useMemo(() => {
        if (!products || products.length === 0) return null;

        return new Fuse(products, {
            keys: [
                { name: 'name', weight: 1.0 },
                { name: 'category', weight: 0.7 },
                { name: 'description', weight: 0.5 },
                { name: 'specs', weight: 0.3 }
            ],
            threshold: 0.3, // Sensibilidad al error ortográfico (0.0 exacto, 1.0 todo)
            ignoreLocation: true,
            useExtendedSearch: true
        });
    }, [products]);

    return useMemo(() => {
        const query = searchQuery?.trim();

        if (!query || !fuse) {
            return products || [];
        }

        const results = fuse.search(query);
        return results.map(result => result.item);
    }, [fuse, products, searchQuery]);
}
