import { useState, useEffect } from 'react';

export function useProducts() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    const fetchProducts = async () => {
      try {
        setLoading(true);
        // Simulate network delay for Elite UI perception
        await new Promise(resolve => setTimeout(resolve, 800));
        
        const response = await fetch('/data/productos.json');
        if (!response.ok) {
          throw new Error(`Error HTTP: ${response.status}`);
        }
        
        const json = await response.json();
        if (isMounted) {
          setData(json);
          setError(null);
        }
      } catch (err) {
        console.error("Error cargando productos:", err);
        if (isMounted) {
           setError(err);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };
    
    fetchProducts();
    
    return () => { isMounted = false; };
  }, []);

  return { data, loading, error };
}
