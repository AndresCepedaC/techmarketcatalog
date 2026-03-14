// [Brand-adapted] — tokens from design-system.json | visual ref: photos/background/ + photos/logo/
import React, { useState } from 'react';
import { OptimizedImage } from './OptimizedImage';

export function ImageMagnifier({ src, alt }) {
  const [zoom, setZoom] = useState({ show: false, x: 0, y: 0 });

  const handleMove = (e) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setZoom({ show: true, x, y });
  };

  return (
    <div
      className="relative w-full h-full bg-quantum-deep/80 rounded-xl overflow-hidden cursor-crosshair flex items-center justify-center border border-white/5 shadow-2xl shadow-neon-sm"
      onMouseMove={handleMove}
      onMouseLeave={() => setZoom({ ...zoom, show: false })}
    >
      <OptimizedImage
        src={src}
        alt={alt}
        className={`w-full h-full object-contain transition-opacity duration-300 ${zoom.show ? 'opacity-0' : 'opacity-100'}`}
      />
      {zoom.show && (
        <div
          className="absolute inset-0 z-10 pointer-events-none"
          style={{
            backgroundImage: `url(${src})`,
            backgroundPosition: `${zoom.x}% ${zoom.y}%`,
            backgroundSize: '250%'
          }}
        />
      )}
    </div>
  );
}
