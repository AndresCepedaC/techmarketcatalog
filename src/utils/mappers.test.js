import { describe, it, expect } from 'vitest';
import { normalizeProduct } from './mappers';

describe('normalizeProduct mapper', () => {
    it('debería mapear correctamente de español a inglés', () => {
        const raw = {
            id: 1,
            titulo: 'Producto Test',
            precio: 500,
            categoria: 'Hardware',
            fotos: ['img1.jpg']
        };

        const result = normalizeProduct(raw);

        expect(result).toEqual({
            id: 1,
            name: 'Producto Test',
            price: 500,
            category: 'Hardware',
            images: ['img1.jpg'],
            description: '',
            stock: 10,
            specs: {},
            isPromo: false
        });
    });

    it('debería manejar casos de datos faltantes con valores por defecto', () => {
        const raw = { id: 2 };
        const result = normalizeProduct(raw);

        expect(result.name).toBe('Sin nombre');
        expect(result.price).toBe(0);
        expect(result.images).toEqual([]);
        expect(result.category).toBe('General');
    });

    it('debería manejar el formato de fotos singular o inglés', () => {
        const caseA = normalizeProduct({ id: 1, foto: 'foto1.jpg' });
        expect(caseA.images).toEqual(['foto1.jpg']);

        const caseB = normalizeProduct({ id: 2, image: 'img1.jpg' });
        expect(caseB.images).toEqual(['img1.jpg']);
    });
});
