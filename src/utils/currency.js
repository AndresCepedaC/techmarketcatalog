/**
 * Utilidad de Divisas para TECHMARKET
 * Maneja la conversión y formateo de precios dinámicos.
 */

const EXCHANGE_RATE_USD_COP = 4000;

export const formatPrice = (price, currency = 'COP') => {
  if (!price || isNaN(price)) return '$0';

  let finalPrice = price;
  if (currency === 'USD') {
    finalPrice = price / EXCHANGE_RATE_USD_COP;
  }

  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: currency === 'USD' ? 2 : 0,
    maximumFractionDigits: currency === 'USD' ? 2 : 0,
  }).format(finalPrice);
};
