import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as Lucide from 'lucide-react';
import { useStore } from '../../context/StoreContext';

const GROQ_API_KEY = import.meta.env.VITE_GROQ_API_KEY || '';
const GROQ_MODEL = 'llama-3.3-70b-versatile';
const VALID_ROLES = new Set(['system', 'user', 'assistant']);
const WHATSAPP_LINK = 'https://wa.me/573005054912';

function sanitizeMessages(rawMessages) {
  return rawMessages.filter(m => {
    if (!m || !m.content) return false;
    if (!VALID_ROLES.has(m.role)) return false;
    const content = String(m.content).trim();
    if (content === '' || content.startsWith('__ERROR__')) return false;
    return true;
  }).map(m => ({ role: m.role, content: String(m.content) }));
}

async function fetchGroqIA(userMessage, chatHistory, productsContext, activeProduct) {
  if (!GROQ_API_KEY) {
    return { ok: false, text: "⚠️ Modo Demo: No hay API Key configurada." };
  }
  
  try {
    const safeCatalog = (productsContext || []).slice(0, 20).map(p => ({
      name: p.name, price: p.price, category: p.category, specs: p.specs
    }));

    const systemPrompt = `Eres un asistente de ventas experto de TechMarket llamado 'Aura'. 
Responde preguntas basándote ÚNICAMENTE en este catálogo de productos. 
Si te preguntan por algo fuera del catálogo, di amablemente que no lo tenemos pero ofrece alternativas similares. 
Estilo: Breve, profesional, usa negritas para nombres y precios.
Contexto Actual: El cliente está viendo ${activeProduct ? activeProduct.name : "el catálogo general"}.
Para compras/cierre: Invita a contactar por WhatsApp: ${WHATSAPP_LINK}.
Catálogo: ${JSON.stringify(safeCatalog)}`;

    const messages = sanitizeMessages([
      { role: "system", content: systemPrompt },
      ...chatHistory.filter(m => m.r !== 'error').map(m => ({ 
        role: m.r === 'user' ? 'user' : 'assistant', 
        content: String(m.t) 
      })),
      { role: "user", content: String(userMessage) }
    ]);

    const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: { 
        'Authorization': `Bearer ${GROQ_API_KEY}`, 
        'Content-Type': 'application/json' 
      },
      body: JSON.stringify({ model: GROQ_MODEL, messages, temperature: 0.7, max_tokens: 512 })
    });

    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    return { ok: true, text: data.choices?.[0]?.message?.content || "No pude generar respuesta." };
  } catch (error) { 
    return { ok: false, text: "Lo siento, hubo un problema. ¿Podemos hablar por WhatsApp?" }; 
  }
}

export function Chatbot() {
  const { activeProduct } = useStore();
  const [isOpen, setIsOpen] = useState(false);
  const [msgs, setMsgs] = useState([]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const [showInvite, setShowInvite] = useState(false);
  const endRef = useRef(null);

  useEffect(() => {
    const hasBeenOpened = sessionStorage.getItem('aura_opened');
    if (!hasBeenOpened) {
      const timer = setTimeout(() => setShowInvite(true), 5000);
      return () => clearTimeout(timer);
    }
  }, []);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [msgs, typing]);

  const toggleChat = () => {
    setIsOpen(!isOpen);
    setShowInvite(false);
    sessionStorage.setItem('aura_opened', 'true');
  };

  const handleSend = async () => {
    if (!input.trim() || typing) return;
    const userTxt = input.trim();
    setMsgs(prev => [...prev, { r: 'user', t: userTxt }]);
    setInput('');
    setTyping(true);
    
    const result = await fetchGroqIA(userTxt, msgs, window.PRODUCTS || [], activeProduct);
    setMsgs(prev => [...prev, { r: result.ok ? 'bot' : 'error', t: result.text }]);
    setTyping(false);
  };

  return (
    <>
      <div className="fixed bottom-6 right-6 z-[110] flex flex-col items-end gap-3">
        <AnimatePresence>
          {showInvite && !isOpen && (
            <motion.div 
               initial={{ opacity: 0, scale: 0.8, x: 20 }} 
               animate={{ opacity: 1, scale: 1, x: 0 }} 
               exit={{ opacity: 0, scale: 0.8 }}
               className="glass-quantum double-neon-purple/50 p-5 rounded-2xl shadow-neon-xl max-w-[220px] relative overflow-hidden"
            >
              <div className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-quantum-cyan to-quantum-purple opacity-50" />
              <p className="text-[11px] font-black text-white/90 leading-relaxed uppercase tracking-wider">¡Hola! Soy Aura. ¿Necesitas ayuda buscando algo?</p>
              <button 
                onClick={() => setShowInvite(false)}
                className="absolute top-2 right-2 text-quantum-cyan/50 hover:text-white transition-colors"
              >
                <Lucide.X size={12} />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
        
        <button 
          onClick={toggleChat} 
          className={`w-14 h-14 rounded-xl glass-quantum double-neon-cyan flex items-center justify-center shadow-neon-md transition-all hover:scale-110 active:scale-95 group ${!isOpen && 'animate-neon-pulse'}`}
        >
          {isOpen ? <Lucide.X size={24} className="text-quantum-cyan transition-transform group-hover:rotate-90" /> : <Lucide.Bot size={24} className="text-quantum-cyan" />}
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ y: 50, opacity: 0, scale: 0.95 }} 
            animate={{ y: 0, opacity: 1, scale: 1 }} 
            exit={{ y: 50, opacity: 0, scale: 0.95 }} 
            className="fixed bottom-24 right-6 z-[110] w-[90vw] sm:w-[380px] h-[550px] glass-quantum double-neon-purple rounded-3xl shadow-neon-xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="p-6 border-b border-white/5 flex justify-between items-center bg-quantum-deep/40 backdrop-blur-md">
              <div className="flex items-center gap-4">
                <div className="p-2.5 bg-quantum-cyan/10 rounded-xl text-quantum-cyan border border-quantum-cyan/20 shadow-neon-sm">
                  <Lucide.Cpu size={20} className="animate-pulse" />
                </div>
                <div>
                  <h4 className="font-black text-[11px] text-white uppercase tracking-[0.3em]">Aura Intel</h4>
                  <p className="text-[9px] text-quantum-purple font-black tracking-[0.2em] uppercase">Módulo de Asistencia</p>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-white/20 hover:text-white transition-colors">
                <Lucide.X size={18} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-hide micro-circuitry bg-[length:20px_20px]">
              {msgs.length === 0 && (
                <div className="text-center py-20 opacity-30">
                  <Lucide.Zap size={40} className="mx-auto mb-5 text-quantum-cyan animate-pulse" />
                  <p className="text-[9px] font-black uppercase tracking-[0.4em]">Sincronización Lista</p>
                </div>
              )}
              {msgs.map((m, i) => (
                <div key={i} className={`flex ${m.r === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`p-4 text-[12.5px] leading-relaxed rounded-2xl max-w-[85%] font-medium transition-all ${
                    m.r === 'user' 
                      ? 'bg-quantum-cyan text-quantum-deep shadow-neon-sm font-black' 
                      : m.r === 'error'
                        ? 'bg-red-500/10 border border-red-500/30 text-red-500 text-[11px]'
                        : 'glass-quantum border-white/10 text-white/90 shadow-sm'
                  }`}>
                    {m.t}
                    {m.r === 'error' && (
                       <a href={WHATSAPP_LINK} target="_blank" className="mt-4 flex items-center gap-2 text-[10px] font-black uppercase text-white bg-green-500/20 border border-green-500/40 px-3 py-2.5 rounded-xl justify-center transition-all hover:bg-green-500/30">
                         <Lucide.MessageCircle size={14} /> Canal de WhatsApp
                       </a>
                    )}
                  </div>
                </div>
              ))}
              {typing && (
                <div className="flex justify-start">
                  <div className="px-5 py-4 glass-quantum border-white/5 rounded-2xl flex gap-2 items-center">
                    <span className="w-1.5 h-1.5 bg-quantum-cyan rounded-full animate-bounce shadow-neon-sm" style={{ animationDelay: '0ms' }} />
                    <span className="w-1.5 h-1.5 bg-quantum-cyan rounded-full animate-bounce shadow-neon-sm" style={{ animationDelay: '200ms' }} />
                    <span className="w-1.5 h-1.5 bg-quantum-cyan rounded-full animate-bounce shadow-neon-sm" style={{ animationDelay: '400ms' }} />
                  </div>
                </div>
              )}
              <div ref={endRef} />
            </div>

            {/* Input */}
            <div className="p-5 border-t border-white/5 bg-quantum-deep/60">
              <div className="relative group">
                <input 
                  value={input} 
                  onChange={e => setInput(e.target.value)} 
                  onKeyDown={e => e.key === 'Enter' && handleSend()} 
                  placeholder="Inicia protocolo de consulta..." 
                  className="w-full glass-quantum border-white/10 rounded-2xl pl-5 pr-14 py-4 text-sm text-white placeholder-quantum-cyan/20 focus:outline-none focus:border-quantum-cyan/30 focus:shadow-neon-sm transition-all" 
                />
                <button 
                  onClick={handleSend} 
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-2.5 text-quantum-cyan hover:text-white transition-all transform hover:scale-110 active:scale-95"
                >
                  <Lucide.Zap size={20} className="fill-current" />
                </button>
              </div>
              <p className="text-[9px] text-center text-white/20 mt-3 font-mono tracking-widest uppercase">Protocolo Aura v3.3.70b</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
