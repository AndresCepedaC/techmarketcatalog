import { describe, it, expect } from 'vitest';
import { normalizeProduct } from '../../hooks/useProducts';

describe('normalizeProduct', () => {
    it('maps Spanish keys to English model', () => {
        const raw = {
            id: '1',
            titulo: 'Mouse Gamer Logitech G304',
            precio: 80000,
            categoria: 'Periféricos',
            descripcion: 'Ratón mecánico inalámbrico.',
            fotos: ['/photos/products/mouse.jpg'],
            specs: { Sensor: 'Hero', DPI: '12000' },
            isPromo: true,
        };

        const result = normalizeProduct(raw);

        expect(result).toEqual({
            id: '1',
            name: 'Mouse Gamer Logitech G304',
            price: 80000,
            images: ['/photos/products/mouse.jpg'],
            category: 'Periféricos',
            description: 'Ratón mecánico inalámbrico.',
            stock: 10, // default
            specs: { Sensor: 'Hero', DPI: '12000' },
            isPromo: true,
        });
    });

    it('handles English key fallbacks', () => {
        const raw = {
            id: '2',
            name: 'English Product',
            price: 50000,
            category: 'Audio',
            description: 'An English-keyed product.',
            image: '/photos/english.jpg',
            specs: {},
        };

        const result = normalizeProduct(raw);

        expect(result.name).toBe('English Product');
        expect(result.price).toBe(50000);
        expect(result.images).toEqual(['/photos/english.jpg']);
        expect(result.category).toBe('Audio');
    });

    it('provides sensible defaults for missing fields', () => {
        const raw = { id: '3' };
        const result = normalizeProduct(raw);

        expect(result.name).toBe('Sin nombre');
        expect(result.price).toBe(0);
        expect(result.images).toEqual([]);
        expect(result.category).toBe('General');
        expect(result.description).toBe('');
        expect(result.stock).toBe(10);
        expect(result.specs).toEqual({});
        expect(result.isPromo).toBe(false);
    });

    it('preserves explicit stock values', () => {
        const raw = { id: '4', stock: 3 };
        const result = normalizeProduct(raw);
        expect(result.stock).toBe(3);
    });

    it('handles zero price correctly', () => {
        const raw = { id: '5', precio: 0 };
        const result = normalizeProduct(raw);
        expect(result.price).toBe(0);
    });
});
