import { useEffect, useRef } from 'react';

/**
 * useDynamicSEO
 * 
 * Actualiza el título del documento y la meta-descripción dinámicamente.
 * Restaura los valores originales al desmontar o al recibir nulos.
 */
export function useDynamicSEO({ title, description }) {
    const originalTitle = useRef(document.title);
    const originalDescription = useRef(
        document.querySelector('meta[name="description"]')?.getAttribute('content') || ''
    );

    useEffect(() => {
        // Si no hay valores nuevos, restaurar originales
        if (!title && !description) {
            document.title = originalTitle.current;
            const meta = document.querySelector('meta[name="description"]');
            if (meta) meta.setAttribute('content', originalDescription.current);
            return;
        }

        // Aplicar nuevos valores
        if (title) {
            document.title = `TechMarket | ${title}`;
        }

        if (description) {
            const meta = document.querySelector('meta[name="description"]');
            if (meta) {
                meta.setAttribute('content', description);
            } else {
                // Crear el meta si no existe (raro en este proyecto pero buena práctica)
                const newMeta = document.createElement('meta');
                newMeta.name = 'description';
                newMeta.content = description;
                document.head.appendChild(newMeta);
            }
        }

        // Cleanup: Restaurar al desmontar
        return () => {
            document.title = originalTitle.current;
            const meta = document.querySelector('meta[name="description"]');
            if (meta) meta.setAttribute('content', originalDescription.current);
        };
    }, [title, description]);
}
