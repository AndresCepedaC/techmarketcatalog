// [Brand-adapted] — tokens from design-system.json | visual ref: photos/background/ + photos/logo/
import React from 'react';
import { motion } from 'framer-motion';
import * as Lucide from 'lucide-react';

export function Footer() {
  return (
    <footer className="relative bg-[#000103] border-t border-white/5 pt-20 pb-10 overflow-hidden mt-32">
      {/* Decorative gradient orb */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-quantum-purple/10 rounded-full blur-[120px] pointer-events-none opacity-50" />
      
      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
        <motion.div 
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={{
            hidden: { opacity: 0 },
            show: { opacity: 1, transition: { staggerChildren: 0.1 } }
          }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16"
        >
          {/* Brand Column */}
          <motion.div variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }} className="lg:pr-8">
            <div className="flex items-center gap-4 mb-6 relative">
              <div className="absolute -inset-4 bg-quantum-cyan/5 blur-xl rounded-full opacity-50" />
              <img 
                src="/photos/logo/logo.jpg" 
                alt="Tech Market" 
                className="h-10 w-auto object-contain logo-etched mix-blend-lighten rounded-xl relative z-10"
              />
            </div>
            <p className="text-white/40 text-sm leading-relaxed mb-8 holo-data font-medium">
            Transformamos tu espacio de juego en un entorno profesional. © 2024 Techmarket. Todos los derechos reservados.
          </p>
          <div className="flex gap-4">
            {[Lucide.Instagram, Lucide.Twitter, Lucide.Facebook].map((Icon, idx) => (
              <a key={idx} href="#" className="p-3 glass-quantum rounded-xl text-quantum-cyan/50 hover:text-white hover:border-quantum-cyan/40 transition-all shadow-sm">
                <Icon size={18} />
              </a>
            ))}
            </div>
          </motion.div>

          {/* Links Columns */}
          {/* Assuming footerLinks is defined elsewhere, e.g., as a const above or imported */}
          {/* For now, I'll replicate the original structure with motion.div wrappers */}
          <motion.div variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}>
           <h4 className="text-white font-black mb-6 uppercase tracking-wider text-sm">Atención al Cliente</h4>
           <ul className="space-y-4 text-white/50 text-sm">
             <li><a href="#catalog" className="hover:text-quantum-cyan transition-all hover:text-glow-cyan">Catálogo Completo</a></li>
             <li><a href="#" className="hover:text-quantum-cyan transition-all hover:text-glow-cyan">Envíos y Devoluciones</a></li>
             <li><a href="#" className="hover:text-quantum-cyan transition-all hover:text-glow-cyan">Garantías</a></li>
             <li><a href="#" className="hover:text-quantum-cyan transition-all hover:text-glow-cyan">Preguntas Frecuentes</a></li>
           </ul>
          </motion.div>

          <motion.div variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}>
           <h4 className="text-white font-black mb-6 uppercase tracking-wider text-sm">Información Legal</h4>
           <ul className="space-y-4 text-white/50 text-sm">
             <li><a href="#" className="hover:text-quantum-cyan transition-all hover:text-glow-cyan">Términos y Condiciones</a></li>
             <li><a href="#" className="hover:text-quantum-cyan transition-all hover:text-glow-cyan">Política de Privacidad</a></li>
             <li><a href="#" className="hover:text-quantum-cyan transition-all hover:text-glow-cyan">Aviso Legal</a></li>
             <li><a href="#" className="hover:text-quantum-cyan transition-all hover:text-glow-cyan">Política de Cookies</a></li>
           </ul>
          </motion.div>

          <motion.div variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}>
           <h4 className="text-white font-black mb-6 uppercase tracking-wider text-sm">Contacto</h4>
           <ul className="space-y-4 text-white/50 text-sm">
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
          </motion.div>
        </motion.div>

        {/* Bottom Bar */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-white/30 holo-data"
        >
        <p className="text-white/20 text-[9px] uppercase font-black tracking-[0.3em]">
          © 2024 TechMarket. Todos los derechos reservados.
        </p>
        <div className="flex gap-10 text-[9px] uppercase font-black tracking-[0.3em] text-white/10">
          <a href="#" className="hover:text-quantum-cyan transition-colors">Términos</a>
          <a href="#" className="hover:text-quantum-cyan transition-colors">Privacidad</a>
          <a href="#" className="hover:text-quantum-cyan transition-colors">Cookies</a>
        </div>
        </motion.div>
      </div>
    </footer>
  );
}
