import React from 'react';

export function ProductSkeleton() {
  return (
    <div className="floating-island flex flex-col h-full animate-pulse opacity-80 border-white/5">
      {/* Upper Area - Image Space */}
      <div className="relative aspect-square bg-quantum-deep/60 border-b border-white/5 overflow-hidden flex items-center justify-center rounded-t-3xl p-8">
        {/* Simulated Shimmer Object */}
        <div className="w-full h-full bg-white/5 rounded-2xl flex items-center justify-center">
          <div className="w-24 h-24 bg-white/5 rounded-full blur-xl" />
        </div>
        {/* Fake Category Badge */}
        <div className="absolute top-4 left-4 w-16 h-5 bg-white/10 rounded-lg" />
      </div>

      {/* Info Section Area */}
      <div className="p-6 md:p-8 flex flex-col flex-1 relative z-10 bg-quantum-deep/40 rounded-b-[24px]">
        {/* Fake Title */}
        <div className="w-3/4 h-6 bg-white/10 rounded-md mb-4" />
        
        {/* Fake Specs */}
        <div className="flex-1">
          <div className="w-full h-3 bg-white/5 rounded-md mb-2" />
          <div className="w-5/6 h-3 bg-white/5 rounded-md" />
        </div>
        
        {/* Conversion Block Skeleton */}
        <div className="mt-6 p-5 rounded-2xl bg-black/20 border border-white/5 flex flex-col gap-5">
           {/* Price */}
           <div className="flex justify-between items-end mb-1">
             <div className="w-16 h-2 bg-quantum-cyan/20 rounded-sm" />
             <div className="w-28 h-8 bg-white/10 rounded-lg" />
           </div>
           
           {/* Button */}
           <div className="w-full h-12 rounded-xl bg-quantum-cyan/10 border border-quantum-cyan/20" />
        </div>
      </div>
    </div>
  );
}
