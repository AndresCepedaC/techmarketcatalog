import React from 'react';
import * as Lucide from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-dark-950 border-t border-white/5 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
        
        <div className="md:col-span-1">
          <div className="flex items-center gap-3 mb-6">
            <Lucide.Zap size={24} className="text-brand-cyan" />
            <span className="text-xl font-black tracking-tighter text-white">
              TECH<span className="text-brand-cyan">MARKET</span>
            </span>
          </div>
          <p className="text-gray-500 text-sm leading-relaxed mb-6">
            Tu destino premium para hardware de alto rendimiento y tecnología futurista. Calidad garantizada en cada componente.
          </p>
          <div className="flex gap-4">
            <a href="#" className="p-2 bg-white/5 rounded-lg hover:text-brand-cyan transition-all"><Lucide.Instagram size={18} /></a>
            <a href="#" className="p-2 bg-white/5 rounded-lg hover:text-brand-cyan transition-all"><Lucide.Twitter size={18} /></a>
            <a href="#" className="p-2 bg-white/5 rounded-lg hover:text-brand-cyan transition-all"><Lucide.Facebook size={18} /></a>
          </div>
        </div>

        <div>
           <h4 className="text-white font-black text-xs uppercase tracking-widest mb-6">Explorar</h4>
           <ul className="space-y-4 text-sm text-gray-400">
             <li><a href="#catalog" className="hover:text-brand-cyan transition-colors">Catálogo Completo</a></li>
             <li><a href="#" className="hover:text-brand-cyan transition-colors">Nuevos Ingresos</a></li>
             <li><a href="#" className="hover:text-brand-cyan transition-colors">Ofertas Neón</a></li>
             <li><a href="#" className="hover:text-brand-cyan transition-colors">Componentes PC</a></li>
           </ul>
        </div>

        <div>
           <h4 className="text-white font-black text-xs uppercase tracking-widest mb-6">Soporte</h4>
           <ul className="space-y-4 text-sm text-gray-400">
             <li><a href="#" className="hover:text-brand-cyan transition-colors">Centro de Ayuda</a></li>
             <li><a href="#" className="hover:text-brand-cyan transition-colors">Envíos y Entregas</a></li>
             <li><a href="#" className="hover:text-brand-cyan transition-colors">Garantías</a></li>
             <li><a href="#" className="hover:text-brand-cyan transition-colors">Preguntas Frecuentes</a></li>
           </ul>
        </div>

        <div>
           <h4 className="text-white font-black text-xs uppercase tracking-widest mb-6">Contacto Directo</h4>
           <ul className="space-y-4 text-sm text-gray-400">
             <li className="flex items-center gap-3">
               <Lucide.Mail size={16} className="text-brand-cyan" />
               <span>info@techmarket.com</span>
             </li>
             <li className="flex items-center gap-3">
               <Lucide.Phone size={16} className="text-brand-cyan" />
               <span>+57 300 505 4912</span>
             </li>
             <li className="flex items-center gap-3">
               <Lucide.MapPin size={16} className="text-brand-cyan" />
               <span>Bogotá, Colombia</span>
             </li>
           </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
        <p className="text-gray-500 text-[10px] uppercase font-bold tracking-widest">
          © 2026 Tech Market. Todos los derechos reservados.
        </p>
        <div className="flex gap-8 text-[10px] uppercase font-bold tracking-widest text-gray-600">
          <a href="#" className="hover:text-gray-400 transition-colors">Términos</a>
          <a href="#" className="hover:text-gray-400 transition-colors">Privacidad</a>
          <a href="#" className="hover:text-gray-400 transition-colors">Cookies</a>
        </div>
      </div>
    </footer>
  );
}
