import React from 'react';
import * as Lucide from 'lucide-react';

export function TopBar() {
  return (
    <div className="bg-dark-900 border-b border-white/5 h-10 flex items-center justify-between px-4 md:px-8 text-[11px] text-gray-400 font-bold uppercase tracking-[0.1em]">
      <div className="flex items-center gap-6">
        <a href="mailto:info@techmarket.com" className="flex items-center gap-2 hover:text-brand-cyan transition-colors">
          <Lucide.Mail size={12} className="text-brand-cyan" /> info@techmarket.com
        </a>
        <a href="https://wa.me/573005054912" target="_blank" className="flex items-center gap-2 hover:text-brand-cyan transition-colors">
          <Lucide.Phone size={12} className="text-brand-cyan" /> +57 300 505 4912
        </a>
      </div>
      <div className="hidden sm:flex items-center gap-5">
        <a href="#" className="hover:text-brand-cyan transition-colors"><Lucide.Instagram size={14} /></a>
        <a href="#" className="hover:text-brand-cyan transition-colors"><Lucide.Twitter size={14} /></a>
        <a href="#" className="hover:text-brand-cyan transition-colors"><Lucide.Facebook size={14} /></a>
      </div>
    </div>
  );
}
