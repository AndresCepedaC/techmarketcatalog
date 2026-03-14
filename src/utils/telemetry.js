/**
 * Motor de Telemetría TechMarket — God Tier
 * 
 * Implementación segura estandarizada para Google Tag Manager (dataLayer).
 * Diferencia entre desarrollo (logs) y producción (dataLayer.push).
 */

const isDev = import.meta.env.DEV;

// Asegurar existencia del dataLayer
if (typeof window !== 'undefined' && !window.dataLayer) {
  window.dataLayer = [];
}

/**
 * Función interna para despachar eventos de forma segura.
 */
function pushEvent(event, data = {}) {
  const payload = {
    event,
    timestamp: new Date().toISOString(),
    ...data
  };

  if (isDev) {
    console.group(`[Telemetry] ${event}`);
    console.table(data);
    console.groupEnd();
  } else if (typeof window !== 'undefined') {
    window.dataLayer.push(payload);
  }
}

export const trackSearch = (query, resultCount) => {
  pushEvent('search', {
    search_term: query,
    results_count: resultCount
  });
};

export const trackCheckoutOpen = (cartTotal, itemsCount) => {
  pushEvent('begin_checkout', {
    value: cartTotal,
    currency: 'COP',
    item_count: itemsCount
  });
};

export const trackProductView = (productName) => {
  pushEvent('view_item', {
    item_name: productName
  });
};

export const trackCartCheckout = (orderId, total) => {
  pushEvent('purchase', {
    transaction_id: orderId,
    value: total,
    currency: 'COP'
  });
};
