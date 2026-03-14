/**
 * Centralización de constantes para TechMarket.
 * Evita el uso de strings mágicas dispersas por el proyecto.
 */

// Información de contacto y ventas
export const WHATSAPP_NUMBER = '573005054912';
export const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}`;

// Configuración de la tienda
export const DEFAULT_CURRENCY = 'COP';

// Claves de LocalStorage para persistencia
export const STORAGE_KEYS = {
    CART: 'techmarket_cart',
    CATEGORY: 'techmarket_category',
    CHAT_OPEN: 'aura_opened'
};
