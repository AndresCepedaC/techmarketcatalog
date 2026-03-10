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
               className="bg-brand-card border border-brand-cyan/30 p-4 rounded-2xl shadow-2xl max-w-[200px]"
            >
              <p className="text-[11px] font-bold text-gray-200">¡Hola! Soy Aura. ¿Necesitas ayuda buscando algo?</p>
              <button 
                onClick={() => setShowInvite(false)}
                className="absolute -top-2 -left-2 bg-dark-900 border border-white/10 rounded-full p-1 text-gray-400 hover:text-white"
              >
                <Lucide.X size={10} />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
        
        <button 
          onClick={toggleChat} 
          className={`w-16 h-16 rounded-full bg-gradient-to-br from-brand-cyan to-brand-purple flex items-center justify-center shadow-2xl transition-transform hover:scale-110 active:scale-95 ${!isOpen && 'animate-pulse shadow-brand-cyan/20'}`}
        >
          {isOpen ? <Lucide.X size={28} className="text-white" /> : <Lucide.Bot size={28} className="text-white" />}
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ y: 100, opacity: 0, scale: 0.9 }} 
            animate={{ y: 0, opacity: 1, scale: 1 }} 
            exit={{ y: 100, opacity: 0, scale: 0.9 }} 
            className="fixed bottom-24 right-6 z-[110] w-[90vw] sm:w-[380px] h-[550px] bg-brand-card border border-white/10 rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.6)] flex flex-col overflow-hidden"
          >
            <div className="p-5 border-b border-white/5 flex justify-between items-center bg-gradient-to-r from-brand-cyan/10 to-transparent">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-brand-cyan/20 rounded-lg text-brand-cyan"><Lucide.Bot size={20} /></div>
                <div>
                  <h4 className="font-black text-sm text-white uppercase tracking-widest">Aura AI</h4>
                  <p className="text-[10px] text-brand-cyan font-bold tracking-[0.2em] uppercase">Especialista Tech</p>
                </div>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-5 space-y-5 scrollbar-thin">
              {msgs.length === 0 && (
                <div className="text-center py-10 opacity-50">
                  <Lucide.MessageSquare size={40} className="mx-auto mb-4 text-brand-cyan" />
                  <p className="text-xs font-bold uppercase tracking-widest">Inicia una conversación</p>
                </div>
              )}
              {msgs.map((m, i) => (
                <div key={i} className={`flex ${m.r === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`p-4 text-[13px] leading-relaxed rounded-2xl max-w-[85%] ${
                    m.r === 'user' 
                      ? 'bg-brand-cyan text-dark-900 font-bold' 
                      : m.r === 'error'
                        ? 'bg-brand-pink/10 border border-brand-pink/30 text-brand-pink'
                        : 'bg-white/5 text-gray-200 border border-white/5'
                  }`}>
                    {m.t}
                    {m.r === 'error' && (
                       <a href={WHATSAPP_LINK} target="_blank" className="mt-3 flex items-center gap-2 text-[10px] font-black uppercase text-white bg-[#25D366] px-3 py-2 rounded-lg justify-center transition-opacity hover:opacity-90">
                         <Lucide.MessageCircle size={14} /> Ir a WhatsApp
                       </a>
                    )}
                  </div>
                </div>
              ))}
              {typing && (
                <div className="flex justify-start">
                  <div className="p-4 bg-white/5 rounded-2xl flex gap-1.5 items-center">
                    <span className="w-1.5 h-1.5 bg-brand-cyan rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-1.5 h-1.5 bg-brand-cyan rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-1.5 h-1.5 bg-brand-cyan rounded-full animate-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              )}
              <div ref={endRef} />
            </div>

            <div className="p-4 border-t border-white/5 bg-black/20">
              <div className="relative group">
                <input 
                  value={input} 
                  onChange={e => setInput(e.target.value)} 
                  onKeyDown={e => e.key === 'Enter' && handleSend()} 
                  placeholder="Escribe tu mensaje..." 
                  className="w-full bg-dark-900 border border-white/10 rounded-xl px-4 py-4 text-sm focus:outline-none focus:border-brand-cyan/50 focus:shadow-[0_0_15px_rgba(0,229,255,0.05)] transition-all" 
                />
                <button 
                  onClick={handleSend} 
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-2 text-brand-cyan hover:text-white transition-colors"
                >
                  <Lucide.Send size={18} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
