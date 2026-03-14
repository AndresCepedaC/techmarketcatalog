import { useEffect, useCallback } from 'react';

/**
 * Hook para atrapar el foco dentro de un contenedor.
 * Útil para modales y componentes de accesibilidad.
 */
export function useFocusTrap(ref, isActive) {
    const handleKeyDown = useCallback((e) => {
        if (!isActive || !ref.current) return;

        if (e.key === 'Tab') {
            const focusableElements = ref.current.querySelectorAll(
                'a[href], button:not([disabled]), textarea, input:not([disabled]), select, [tabindex]:not([tabindex="-1"])'
            );

            const firstElement = focusableElements[0];
            const lastElement = focusableElements[focusableElements.length - 1];

            if (e.shiftKey) { // Shift + Tab
                if (document.activeElement === firstElement) {
                    lastElement.focus();
                    e.preventDefault();
                }
            } else { // Tab
                if (document.activeElement === lastElement) {
                    firstElement.focus();
                    e.preventDefault();
                }
            }
        }
    }, [isActive, ref]);

    useEffect(() => {
        if (isActive) {
            window.addEventListener('keydown', handleKeyDown);
        }

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [isActive, handleKeyDown]);
}
