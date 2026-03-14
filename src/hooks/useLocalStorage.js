import { useState, useCallback } from 'react';

/**
 * useLocalStorage
 * 
 * Un hook que funciona igual que useState pero persiste el valor en localStorage.
 * Incluye manejo de errores robusto para modo incógnito y cuota llena.
 */
export function useLocalStorage(key, initialValue) {
    // Inicialización perezosa para evitar leer de disco en cada render
    const [storedValue, setStoredValue] = useState(() => {
        if (typeof window === 'undefined') return initialValue;

        try {
            const item = window.localStorage.getItem(key);
            return item ? JSON.parse(item) : initialValue;
        } catch (error) {
            console.warn(`[useLocalStorage] Error leyendo clave "${key}":`, error);
            return initialValue;
        }
    });

    const setValue = useCallback((value) => {
        try {
            // Permitir que el valor sea una función (igual que useState)
            const valueToStore = value instanceof Function ? value(storedValue) : value;

            setStoredValue(valueToStore);

            if (typeof window !== 'undefined') {
                window.localStorage.setItem(key, JSON.stringify(valueToStore));
            }
        } catch (error) {
            console.error(`[useLocalStorage] Error escribiendo clave "${key}":`, error);
        }
    }, [key, storedValue]);

    return [storedValue, setValue];
}
