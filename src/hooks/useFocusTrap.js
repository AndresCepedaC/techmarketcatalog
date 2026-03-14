import { useEffect, useCallback } from 'react';

/**
 * useFocusTrap(containerRef, isActive, onClose)
 * 
 * Traps keyboard focus inside a container (modal, dialog, drawer).
 * - Locks body scroll when active
 * - Cycles Tab/Shift+Tab among focusable elements
 * - Calls onClose on Escape key
 */
export function useFocusTrap(containerRef, isActive, onClose) {
    const handleKeyDown = useCallback((e) => {
        if (e.key === 'Escape') {
            onClose?.();
            return;
        }

        if (e.key === 'Tab' && containerRef.current) {
            const focusable = containerRef.current.querySelectorAll(
                'a[href], button:not([disabled]), textarea, input:not([disabled]), select, [tabindex]:not([tabindex="-1"])'
            );
            if (focusable.length === 0) return;

            const first = focusable[0];
            const last = focusable[focusable.length - 1];

            if (e.shiftKey) {
                if (document.activeElement === first) {
                    last.focus();
                    e.preventDefault();
                }
            } else {
                if (document.activeElement === last) {
                    first.focus();
                    e.preventDefault();
                }
            }
        }
    }, [containerRef, onClose]);

    useEffect(() => {
        if (!isActive) return;

        // Lock body scroll
        const originalOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';

        // Add key listener
        window.addEventListener('keydown', handleKeyDown);

        return () => {
            document.body.style.overflow = originalOverflow;
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [isActive, handleKeyDown]);
}
