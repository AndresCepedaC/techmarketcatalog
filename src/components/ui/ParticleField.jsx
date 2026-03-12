// [Brand-adapted] — tokens from design-system.json | visual ref: photos/background/ + photos/logo/
import React, { useMemo } from 'react';

/**
 * CSS-only particle system — 30 floating neon dots across the viewport.
 * Each particle has random position, size, opacity, and animation duration.
 */
export function ParticleField() {
  const particles = useMemo(() => {
    return Array.from({ length: 30 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      size: 1 + Math.random() * 3,
      opacity: 0.15 + Math.random() * 0.4,
      duration: 15 + Math.random() * 25,
      delay: Math.random() * 20,
      color: Math.random() > 0.7 
        ? `rgba(157, 0, 255, ${0.3 + Math.random() * 0.4})` 
        : `rgba(0, 245, 255, ${0.3 + Math.random() * 0.4})`,
    }));
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-[1] overflow-hidden" aria-hidden="true">
      {particles.map(p => (
        <div
          key={p.id}
          className="particle"
          style={{
            left: p.left,
            bottom: '-5%',
            width: p.size,
            height: p.size,
            backgroundColor: p.color,
            boxShadow: `0 0 ${p.size * 4}px ${p.color}`,
            opacity: p.opacity,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
          }}
        />
      ))}
    </div>
  );
}
