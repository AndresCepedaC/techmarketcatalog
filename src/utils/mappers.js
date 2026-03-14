/**
 * Mappers de datos para transformar estructuras crudas (JSON)
 * en modelos de datos limpios para la aplicación.
 */

/**
 * Normaliza un producto del JSON a un modelo de datos consistente.
 * Mapea las claves en español a inglés y asegura valores por defecto.
 */
export function normalizeProduct(raw) {
    const images = raw.fotos
        || (raw.foto ? [raw.foto] : null)
        || (raw.image ? [raw.image] : null)
        || (raw.images ? raw.images : []);

    return {
        id: raw.id,
        name: raw.titulo || raw.name || 'Sin nombre',
        price: raw.precio || raw.price || 0,
        images: Array.isArray(images) ? images : [images],
        category: raw.categoria || raw.category || 'General',
        description: raw.descripcion || raw.description || '',
        stock: typeof raw.stock === 'number' ? raw.stock : 10,
        specs: raw.specs || {},
        isPromo: raw.isPromo || false,
    };
}
