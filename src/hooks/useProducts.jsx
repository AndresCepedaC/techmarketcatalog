import { useState, useEffect } from 'react';
import { normalizeProduct } from '../utils/mappers';

/**
 * Función auxiliar para realizar fetch con reintentos y delay.
 */
async function fetchWithRetry(url, options = {}, retries = 3, delay = 1000) {
  try {
    const response = await fetch(url, options);
    if (!response.ok) throw new Error(`HTTP Error: ${response.status}`);
    return response;
  } catch (error) {
    if (retries <= 0) throw error;
    console.warn(`Fetch fallido. Reintentando en ${delay}ms... (${retries} intentos restantes)`);
    await new Promise(resolve => setTimeout(resolve, delay));
    return fetchWithRetry(url, options, retries - 1, delay);
  }
}

export function useProducts() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const loadProducts = async () => {
      try {
        setLoading(true);
        const response = await fetchWithRetry('/data/productos.json');
        const json = await response.json();

        if (isMounted) {
          const normalizedData = json.map(normalizeProduct);
          setData(normalizedData);
          setError(null);
        }
      } catch (err) {
        console.error("Error definitivo tras reintentos:", err);
        if (isMounted) setError(err.message);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    loadProducts();

    return () => { isMounted = false; };
  }, []);

  return { data, loading, error };
}
