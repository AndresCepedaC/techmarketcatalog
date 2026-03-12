// [Brand-adapted] — tokens from design-system.json | visual ref: photos/background/ + photos/logo/
import React from 'react';
import { motion } from 'framer-motion';
import * as Lucide from 'lucide-react';

const benefits = [
  {
    icon: Lucide.ShieldCheck,
    title: "Garantía Oficial",
    description: "Todos nuestros productos cuentan con garantía directa de fábrica. Hardware testeado y certificado.",
    color: "cyan"
  },
  {
    icon: Lucide.Truck,
    title: "Envíos Seguros",
    description: "Despachos ultra-rápidos a nivel nacional con código de seguimiento en tiempo real.",
    color: "purple"
  },
  {
    icon: Lucide.Headphones,
    title: "Soporte Técnico 24/7",
    description: "Atención especializada vía WhatsApp o mediante Aura, nuestro bot asistente experto.",
    color: "cyan"
  },
  {
    icon: Lucide.CreditCard,
    title: "Pagos Protegidos",
    description: "Transacciones seguras y múltiples métodos de pago integrados. Tu información está cifrada.",
    color: "purple"
  }
];

export function TrustSection() {
  return (
    <section className="relative py-24 md:py-32 bg-quantum-deep overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 micro-circuitry opacity-10 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-quantum-cyan/20 to-transparent pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
        <div className="flex flex-col md:flex-row gap-12 items-center justify-between mb-24">
          <motion.div 
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="md:w-1/2 text-left"
          >
            <div className="inline-flex items-center gap-3 mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-quantum-cyan animate-pulse" />
              <span className="text-[10px] font-black uppercase tracking-[0.5em] text-quantum-cyan/60 holo-data">
                NUESTRA PROMESA
              </span>
            </div>
            <h2 className="text-5xl md:text-7xl font-black text-white text-3d-monumental tracking-tighter leading-[0.9] mix-blend-lighten">
              Calidad <br/>
              <span className="quantum-gradient-text drop-shadow-[0_0_30px_rgba(157,0,255,0.4)]">Absoluta.</span>
            </h2>
          </motion.div>
          
          <motion.p 
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="md:w-1/2 text-white/50 font-medium text-lg leading-relaxed md:border-l border-white/10 md:pl-12 py-4"
          >
            <span className="text-white/80 block mb-2">No solo vendemos tecnología.</span>
            Garantizamos que tu ecosistema digital funcione sin fallos. Construye tu setup con la tranquilidad del respaldo oficial.
          </motion.p>
        </div>

        <motion.div 
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={{
            hidden: { opacity: 0 },
            show: { opacity: 1, transition: { staggerChildren: 0.15 } }
          }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            const isCyan = benefit.color === 'cyan';
            
            return (
              <motion.div
                key={index}
                variants={{
                  hidden: { opacity: 0, y: 40, scale: 0.96 },
                  show: { opacity: 1, y: 0, scale: 1, transition: { type: 'spring', stiffness: 70, damping: 15, duration: 0.8 } }
                }}
                className={`relative floating-island overflow-hidden p-8 md:p-10 group transition-all duration-700 hover:-translate-y-3 ${isCyan ? 'hover:shadow-[0_40px_80px_rgba(0,245,255,0.08)]' : 'hover:shadow-[0_40px_80px_rgba(157,0,255,0.08)]'}`}
              >
                {/* Immersive glow background */}
                <div className={`absolute -inset-10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none blur-3xl ${isCyan ? 'bg-quantum-cyan/5' : 'bg-quantum-purple/5'}`} />
                
                <div className="relative z-10">
                  <div className={`w-14 h-14 rounded-2xl mb-8 flex items-center justify-center bg-quantum-deep/80 border ${isCyan ? 'border-quantum-cyan/30 shadow-[0_0_15px_rgba(0,245,255,0.15)]' : 'border-quantum-purple/30 shadow-[0_0_15px_rgba(157,0,255,0.15)]'} transition-transform duration-500 group-hover:scale-[1.15] group-hover:rotate-3 backdrop-blur-md`}>
                    <Icon size={24} className={isCyan ? "text-quantum-cyan animate-pulse" : "text-quantum-purple animate-pulse"} style={{ animationDuration: '3s' }} />
                  </div>
                  
                  <h3 className={`text-xl font-black text-white mb-4 transition-colors duration-500 ${isCyan ? 'group-hover:text-quantum-cyan text-glow-cyan' : 'group-hover:text-quantum-purple text-glow-purple'}`}>
                    {benefit.title}
                  </h3>
                  <p className="text-white/40 text-sm leading-relaxed tracking-wide">
                    {benefit.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
