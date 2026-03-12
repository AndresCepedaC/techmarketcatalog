import React from 'react';
import * as Lucide from 'lucide-react';

export function Footer() {
  return (
    <footer className="relative bg-quantum-deep border-t border-quantum-cyan/10 pt-28 pb-12 overflow-hidden">
      <div className="absolute inset-0 micro-circuitry opacity-[0.03] pointer-events-none" />
      {/* Volumetric top glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[200px] bg-quantum-cyan/3 blur-[100px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-1 md:grid-cols-4 gap-16 mb-24 relative z-10">
        
        <div className="md:col-span-1">
          <div className="flex items-center gap-4 mb-6">
            <img 
              src="/photos/logo/logo.png" 
              alt="Tech Market" 
              className="h-10 w-auto logo-etched" 
            />
          </div>
          <p className="text-white/40 text-[13px] leading-relaxed mb-8 font-medium tracking-tight">
            Transformamos tu espacio de juego en un entorno profesional. © 2024 Techmarket. Todos los derechos reservados.
          </p>
          <div className="flex gap-4">
            {[Lucide.Instagram, Lucide.Twitter, Lucide.Facebook].map((Icon, idx) => (
              <a key={idx} href="#" className="p-3 glass-quantum rounded-xl text-quantum-cyan/50 hover:text-white hover:border-quantum-cyan/40 transition-all shadow-sm">
                <Icon size={18} />
              </a>
            ))}
          </div>
        </div>

        <div>
           <h4 className="text-white/20 font-black text-[10px] uppercase tracking-[0.4em] mb-8 border-b border-white/5 pb-2">Atención al Cliente</h4>
           <ul className="space-y-4 text-[13px] font-bold text-white/40">
             <li><a href="#catalog" className="hover:text-quantum-cyan transition-all hover:text-glow-cyan">Catálogo Completo</a></li>
             <li><a href="#" className="hover:text-quantum-cyan transition-all hover:text-glow-cyan">Envíos y Devoluciones</a></li>
             <li><a href="#" className="hover:text-quantum-cyan transition-all hover:text-glow-cyan">Garantías</a></li>
             <li><a href="#" className="hover:text-quantum-cyan transition-all hover:text-glow-cyan">Preguntas Frecuentes</a></li>
           </ul>
        </div>

        <div>
           <h4 className="text-white/20 font-black text-[10px] uppercase tracking-[0.4em] mb-8 border-b border-white/5 pb-2">Información Legal</h4>
           <ul className="space-y-4 text-[13px] font-bold text-white/40">
             <li><a href="#" className="hover:text-quantum-cyan transition-all hover:text-glow-cyan">Términos y Condiciones</a></li>
             <li><a href="#" className="hover:text-quantum-cyan transition-all hover:text-glow-cyan">Política de Privacidad</a></li>
             <li><a href="#" className="hover:text-quantum-cyan transition-all hover:text-glow-cyan">Aviso Legal</a></li>
             <li><a href="#" className="hover:text-quantum-cyan transition-all hover:text-glow-cyan">Política de Cookies</a></li>
           </ul>
        </div>

        <div>
           <h4 className="text-white/20 font-black text-[10px] uppercase tracking-[0.4em] mb-8 border-b border-white/5 pb-2">Contacto</h4>
           <ul className="space-y-4 text-[13px] font-bold text-white/40">
             <li className="flex items-center gap-4 group">
               <Lucide.Mail size={16} className="text-quantum-cyan" />
               <span className="group-hover:text-white transition-colors">info@techmarket.com</span>
             </li>
             <li className="flex items-center gap-4 group">
               <Lucide.Phone size={16} className="text-quantum-cyan" />
               <a href="https://wa.me/573005054912" target="_blank" className="group-hover:text-white transition-colors">+57 3005054912</a>
             </li>
             <li className="flex items-center gap-4 group">
               <Lucide.MessageCircle size={16} className="text-quantum-cyan" />
               <span className="group-hover:text-white transition-colors">Soporte de Aura</span>
             </li>
             <li className="flex items-center gap-4 group">
               <Lucide.MapPin size={16} className="text-quantum-cyan" />
               <span className="group-hover:text-white transition-colors">Armenia, Quindío</span>
             </li>
           </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8 relative z-10">
        <p className="text-white/20 text-[9px] uppercase font-black tracking-[0.3em]">
          © 2024 TechMarket. Todos los derechos reservados.
        </p>
        <div className="flex gap-10 text-[9px] uppercase font-black tracking-[0.3em] text-white/10">
          <a href="#" className="hover:text-quantum-cyan transition-colors">Términos</a>
          <a href="#" className="hover:text-quantum-cyan transition-colors">Privacidad</a>
          <a href="#" className="hover:text-quantum-cyan transition-colors">Cookies</a>
        </div>
      </div>
    </footer>
  );
}
