import React, { useState, useEffect, useRef, useContext, createContext, useCallback, useMemo } from 'react';
import { createRoot } from 'react-dom/client';
import { motion, AnimatePresence } from 'framer-motion';
import * as Lucide from 'lucide-react';
import './index.css';

// ═══════════════════════════════════════════
//  ERROR BOUNDARY (DevOps Protection)
// ═══════════════════════════════════════════
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error) { return { hasError: true, error }; }
  componentDidCatch(error, errorInfo) { console.error("Aura Error Boundary:", error, errorInfo); }
  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '40px', background: '#0B0D17', color: '#ff4d4d', height: '100vh', fontFamily: 'monospace' }}>
          <h1 style={{ fontSize: '24px' }}>⚠️ Error Crítico Detectado</h1>
          <p style={{ color: '#aaa', marginTop: '10px' }}>La aplicación no pudo cargar correctamente.</p>
          <pre style={{ background: '#1a1a1a', padding: '20px', borderRadius: '8px', marginTop: '20px', border: '1px solid #333', overflowX: 'auto' }}>
            {this.state.error?.toString()}
          </pre>
          <button onClick={() => window.location.reload()} style={{ marginTop: '20px', background: '#ff4d4d', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '5px', cursor: 'pointer' }}>
            Reintentar Carga
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

// ═══════════════════════════════════════════
//  GLOBAL STATE
// ═══════════════════════════════════════════
const StoreContext = createContext();

function StoreProvider({ children }) {
  const [activeProduct, setActiveProduct] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Todos");

  const value = useMemo(() => ({
    activeProduct, setActiveProduct,
    searchQuery, setSearchQuery,
    selectedCategory, setSelectedCategory
  }), [activeProduct, searchQuery, selectedCategory]);

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

function useStore() { return useContext(StoreContext); }

// (Rest of the components: TopBar, Header, CategoryFilters, ProductCard, ProductGrid, ImageMagnifier, ProductModal, Chatbot, App)
// Copiaré la lógica de index.html aquí, pero corrigiendo SlideOverCart y GROQ_API_KEY.

function TopBar() {
  return (
    <div className="bg-dark-800 border-b border-white/5 h-8 flex items-center justify-between px-4 md:px-6 text-[11px] text-gray-500 font-medium tracking-wide">
      <div className="flex items-center gap-5">
        <a href="mailto:info@techmarket.com" className="flex items-center gap-1.5 hover:text-neon-cyan transition-colors">
          <Lucide.Mail size={12} /> info@techmarket.com
        </a>
        <a href="https://wa.me/573005054912" target="_blank" className="flex items-center gap-1.5 hover:text-neon-cyan transition-colors">
          <Lucide.Phone size={12} /> +57 300 505 4912
        </a>
      </div>
      <div className="flex items-center gap-4">
        <a href="#" className="hover:text-neon-cyan transition-colors"><Lucide.Github size={14} /></a>
        <a href="#" className="hover:text-neon-cyan transition-colors"><Lucide.Linkedin size={14} /></a>
      </div>
    </div>
  );
}

function Header() {
  const { searchQuery, setSearchQuery } = useStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 glass border-b border-white/[0.04]">
      <div className="max-w-7xl mx-auto px-4 md:px-6 h-16 md:h-20 flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <button className="md:hidden p-2 text-gray-400 hover:text-neon-cyan" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            <Lucide.Menu size={24} />
          </button>
          <div className="flex items-center cursor-pointer group">
            <div className="relative flex items-center gap-2">
              <div className="relative">
                <Lucide.Zap size={28} className="text-neon-cyan relative z-10 filter drop-shadow-[0_0_8px_#00E5FF80]" />
                <motion.div 
                  animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute inset-0 bg-neon-cyan rounded-full blur-md"
                />
              </div>
              <span className="text-xl md:text-2xl font-black tracking-tighter text-white group-hover:text-neon-cyan transition-colors">
                TECH<span className="text-neon-cyan group-hover:text-white transition-colors">MARKET</span>
              </span>
            </div>
          </div>
        </div>
        <div className="hidden md:block flex-1 max-w-lg mx-6">
          <div className="relative group">
            <Lucide.Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-neon-cyan transition-colors" />
            <input
              type="text" placeholder="Geforce RTX, MacBook, Audífonos..." value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-dark-700/60 border border-white/[0.06] rounded-xl text-sm text-white placeholder-gray-500 focus:outline-none focus:border-neon-cyan/40 focus:bg-dark-700 focus:shadow-[0_0_15px_#00E5FF15] transition-all duration-300"
            />
          </div>
        </div>
        <div className="flex items-center gap-1 md:gap-3">
          <button className="hidden sm:block p-2.5 text-gray-400 hover:text-neon-cyan transition-colors rounded-xl hover:bg-white/5">
            <Lucide.User size={22} />
          </button>
        </div>
      </div>
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="md:hidden overflow-hidden border-t border-white/5 bg-dark-800">
            <div className="p-4">
              <div className="relative">
                <Lucide.Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                <input
                  type="text" placeholder="Buscar productos..." value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-dark-700 border border-white/[0.06] rounded-lg text-sm text-white focus:outline-none focus:border-neon-cyan/40"
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function CategoryFilters() {
  const { selectedCategory, setSelectedCategory } = useStore();
  const cats = ["Todos", "Intercomunicadores", "Periféricos", "Accesorios", "Audio", "Smart Home", "Software"];
  return (
    <div className="flex overflow-x-auto gap-3 pb-4 mb-6 scrollbar-hide">
      {cats.map(cat => {
        const active = selectedCategory === cat;
        return (
          <button
            key={cat} onClick={() => setSelectedCategory(cat)}
            className={`whitespace-nowrap px-4 py-1.5 rounded-full text-[13px] font-medium transition-all duration-300 border ${active
              ? 'bg-neon-cyan/10 text-neon-cyan border-neon-cyan shadow-[0_0_10px_#00E5FF20]'
              : 'bg-dark-800 text-gray-400 border-white/[0.06] hover:bg-dark-700 hover:text-white hover:border-white/20'
              }`}
          >
            {cat}
          </button>
        );
      })}
    </div>
  );
}

const containerVariants = { show: { transition: { staggerChildren: 0.1 } } };
const itemVariants = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } };

function ProductCard({ product }) {
  const { setActiveProduct } = useStore();
  const [currentImg, setCurrentImg] = useState(0);
  const fotos = product?.fotos || (product?.image ? [product.image] : [`https://placehold.co/300x300/1C2039/00E5FF?text=${encodeURIComponent(product?.name || 'Tech')}`]);
  
  const handleNextImg = (e) => { e.stopPropagation(); setCurrentImg((prev) => (prev + 1) % fotos.length); };
  const handlePrevImg = (e) => { e.stopPropagation(); setCurrentImg((prev) => (prev - 1 + fotos.length) % fotos.length); };
  const handleWhatsAppDirect = (e) => {
    e.stopPropagation();
    const msg = `Hola, me interesa el ${product.name} de $${product.price.toLocaleString('en-US')}`;
    window.open(`https://wa.me/573005054912?text=${encodeURIComponent(msg)}`, '_blank');
  };

  return (
    <motion.div variants={itemVariants} className="group relative glass border border-white/10 rounded-2xl overflow-hidden cursor-pointer transition-all duration-500 hover:-translate-y-3 hover:shadow-[0_8px_30px_#00E5FF40] hover:border-neon-cyan/50" onClick={() => setActiveProduct(product)}>
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-neon-purple/30 via-neon-cyan/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      {product?.isPromo && <div className="absolute top-3 right-3 z-10 bg-gradient-to-r from-neon-pink to-neon-purple px-3 py-1 text-[10px] uppercase font-black tracking-widest text-white rounded-full">Oferta Neón</div>}
      <div className="relative h-56 bg-dark-900/40 border-b border-white/5 overflow-hidden p-6 flex items-center justify-center">
        {fotos.length > 1 && (
          <>
            <button onClick={handlePrevImg} className="absolute left-2 z-20 p-1.5 bg-black/40 hover:bg-neon-cyan/30 text-white rounded-full backdrop-blur-md opacity-0 group-hover:opacity-100"><Lucide.ChevronLeft size={16} /></button>
            <button onClick={handleNextImg} className="absolute right-2 z-20 p-1.5 bg-black/40 hover:bg-neon-cyan/30 text-white rounded-full backdrop-blur-md opacity-0 group-hover:opacity-100"><Lucide.ChevronRight size={16} /></button>
          </>
        )}
        <AnimatePresence mode="wait">
          <motion.img key={currentImg} initial={{ opacity: 0 }} animate={{ opacity: 1 }} src={fotos[currentImg]} className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-700" />
        </AnimatePresence>
        <div className="absolute top-3 left-3 z-10 glass px-2.5 py-1 text-[10px] uppercase font-bold text-neon-cyan border border-neon-cyan/30 rounded-lg">{product?.category}</div>
      </div>
      <div className="p-5 flex flex-col h-[150px]">
        <h3 className="font-semibold text-sm text-gray-100 mb-1 line-clamp-2 group-hover:text-neon-cyan">{product?.name}</h3>
        <p className="text-[11px] text-gray-500 mb-4 line-clamp-2">{product?.specs ? Object.values(product.specs).join(" • ") : 'Sin especificaciones'}</p>
        <div className="flex items-center justify-between mt-auto">
          <span className="text-xl font-bold text-white group-hover:text-neon-cyan transition-all">${product?.price?.toLocaleString('en-US')}</span>
          <button onClick={handleWhatsAppDirect} className="w-10 h-10 rounded-xl glass border border-[#25D366]/30 flex items-center justify-center text-[#25D366] hover:bg-[#25D366] hover:text-white transition-all"><Lucide.MessageCircle size={18} /></button>
        </div>
      </div>
    </motion.div>
  );
}

function ProductGrid() {
  const { searchQuery, selectedCategory } = useStore();
  const [loading, setLoading] = useState(true);
  useEffect(() => { const t = setTimeout(() => setLoading(false), 1500); return () => clearTimeout(t); }, []);
  const filtered = useMemo(() => {
    let list = window.PRODUCTS || [];
    if (selectedCategory !== "Todos") list = list.filter(p => p?.category === selectedCategory);
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(p => p?.name?.toLowerCase().includes(q) || Object.values(p?.specs || {}).some(v => v?.toLowerCase().includes(q)));
    }
    return list;
  }, [searchQuery, selectedCategory]);
  const categoriesToRender = useMemo(() => [...new Set(filtered.map(p => p.category))], [filtered]);

  if (loading) return <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-4 md:px-6"><div className="h-64 bg-dark-800 animate-pulse rounded-2xl" /></div>;

  return (
    <section className="max-w-7xl mx-auto px-4 md:px-6 py-8">
      <CategoryFilters />
      <div className="flex flex-col gap-12">
        {categoriesToRender.map(cat => (
          <div key={cat} className="flex flex-col gap-6">
            <h2 className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-neon-purple to-neon-cyan border-b border-white/10 pb-2 w-fit">{cat}</h2>
            <motion.div variants={containerVariants} initial="hidden" animate="show" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filtered.filter(p => p.category === cat).map(p => <ProductCard key={p.id} product={p} />)}
            </motion.div>
          </div>
        ))}
      </div>
    </section>
  );
}

function ImageMagnifier({ src }) {
  const [zoom, setZoom] = useState({ show: false, x: 0, y: 0 });
  const handleMove = (e) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setZoom({ show: true, x, y });
  };
  return (
    <div className="relative w-full h-full bg-dark-900 rounded-xl overflow-hidden cursor-crosshair flex items-center justify-center border border-white/5" onMouseMove={handleMove} onMouseLeave={() => setZoom({ ...zoom, show: false })}>
      <img src={src} className={`w-full h-full object-contain ${zoom.show ? 'opacity-0' : 'opacity-100'}`} />
      {zoom.show && <div className="absolute inset-0 z-10 pointer-events-none" style={{ backgroundImage: `url(${src})`, backgroundPosition: `${zoom.x}% ${zoom.y}%`, backgroundSize: '250%' }} />}
    </div>
  );
}

function ProductModal() {
  const { activeProduct, setActiveProduct } = useStore();
  if (!activeProduct) return null;
  const handleWhatsAppDirect = () => {
    const msg = `Hola, me interesa el ${activeProduct.name} de $${activeProduct.price.toLocaleString('en-US')}`;
    window.open(`https://wa.me/573005054912?text=${encodeURIComponent(msg)}`, '_blank');
  };
  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setActiveProduct(null)} />
        <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} exit={{ scale: 0.95 }} className="relative w-full max-w-5xl bg-dark-800 rounded-2xl overflow-hidden flex flex-col md:flex-row z-10 border border-white/10">
          <button onClick={() => setActiveProduct(null)} className="absolute top-4 right-4 z-20 p-2 bg-dark-700 rounded-full hover:text-neon-cyan transition-colors"><Lucide.X size={18} /></button>
          <div className="w-full md:w-1/2 p-5 bg-dark-900/50 min-h-[300px]"><ImageMagnifier src={activeProduct?.fotos?.[0] || activeProduct?.image} /></div>
          <div className="w-full md:w-1/2 p-6 md:p-8 flex flex-col">
            <h2 className="text-3xl font-black mb-2">{activeProduct.name}</h2>
            <div className="text-3xl font-bold text-neon-cyan mb-6">${activeProduct.price.toLocaleString('en-US')}</div>
            <div className="mb-8 space-y-2">
              {Object.entries(activeProduct.specs).map(([k,v]) => (
                <div key={k} className="flex justify-between border-b border-white/5 py-2 text-sm">
                  <span className="text-gray-400">{k}</span><span className="text-white">{v}</span>
                </div>
              ))}
            </div>
            <button onClick={handleWhatsAppDirect} className="w-full py-4 rounded-xl bg-neon-cyan/20 border border-neon-cyan/50 text-neon-cyan font-bold hover:bg-neon-cyan hover:text-white transition-all flex items-center justify-center gap-2"><Lucide.MessageCircle size={18} /> Pedir por WhatsApp</button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

// ═══════════════════════════════════════════
//  CHATBOT (Aura AI)
// ═══════════════════════════════════════════
const GROQ_API_KEY = import.meta.env.VITE_GROQ_API_KEY || '';

async function fetchGroqIA(userMessage, chatHistory, productsContext, activeProduct) {
  if (!GROQ_API_KEY) {
    console.warn("Aura Debug: No VITE_GROQ_API_KEY found.");
    return "⚠️ **Modo Demo**: No hay API Key configurada.";
  }
  
  try {
    const productsString = JSON.stringify(productsContext);
    
    // Rule B: Strict string concatenation for system prompt
    const systemPrompt = "Eres 'Aura', la asesora experta y ultra-persuasiva de 'Tech Market'. " +
      "Tu personalidad es servicial, brillante y directa. " +
      "Catálogo actual disponible: " + productsString + " " +
      "Protocolo: 1. Solo ofrece productos del catálogo. 2. Estilo: Breve y en negritas. " +
      "Contexto: El cliente está viendo " + (activeProduct ? activeProduct.name : "la página principal") + ". " +
      "Objetivo: Invitar a contactar por WhatsApp: https://wa.me/573005054912";

    // Rule A: Clean and Flat Messages array
    const messages = [
      { role: "system", content: systemPrompt },
      ...chatHistory.map(m => ({ 
        role: m.r === 'user' ? 'user' : 'assistant', 
        content: String(m.t) 
      })).filter(m => m.content.trim() !== ""),
      { role: "user", content: String(userMessage) }
    ];

    // Rule C: Standard model and minimal parameters
    const payload = { 
      model: "llama3-8b-8192", 
      messages: messages
    };

    console.log("Aura Debug: Enviando payload...", payload);

    const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: { 
        'Authorization': `Bearer ${GROQ_API_KEY}`, 
        'Content-Type': 'application/json' 
      },
      body: JSON.stringify(payload)
    });

    if (!res.ok) {
      // Step 1: Detailed Error Extraction
      const errorDetail = await res.json().catch(() => ({ error: "Unknown payload error" }));
      console.error("Detalle del Error de Groq:", errorDetail);
      throw new Error(`Groq API Error ${res.status}`);
    }

    const data = await res.json();
    return data.choices[0].message.content;
  } catch (error) { 
    console.error("Error crítico en fetchGroqIA:", error);
    return "Lo siento, hubo un problema con mi sistema. ¿Podemos hablar por WhatsApp?"; 
  }
}

function Chatbot() {
  const { activeProduct } = useStore();
  const [isOpen, setIsOpen] = useState(false);
  const [msgs, setMsgs] = useState([]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const endRef = useRef(null);

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [msgs, typing]);

  const handleSend = async () => {
    if (!input.trim() || typing) return;
    const userTxt = input.trim();
    
    // Add user message locally
    setMsgs(prev => [...prev, { r: 'user', t: userTxt }]);
    setInput('');
    setTyping(true);
    
    // Pass CURRENT history (msgs) to fetchGroqIA
    const botRes = await fetchGroqIA(userTxt, msgs, window.PRODUCTS || [], activeProduct);
    
    setMsgs(prev => [...prev, { r: 'bot', t: botRes }]);
    setTyping(false);
  };

  return (
    <>
      {!isOpen && (
        <button onClick={() => setIsOpen(true)} className="fixed bottom-6 right-6 z-[110] w-14 h-14 rounded-full bg-gradient-to-r from-neon-cyan to-neon-purple flex items-center justify-center shadow-xl shadow-neon-cyan/20 animate-bounce">
          <Lucide.Bot size={26} className="text-white" />
        </button>
      )}
      <AnimatePresence>
        {isOpen && (
          <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 20, opacity: 0 }} className="fixed bottom-6 right-6 z-[110] w-[350px] h-[500px] bg-dark-800 border border-white/10 rounded-2xl shadow-2xl flex flex-col">
            <div className="p-4 border-b border-white/5 flex justify-between items-center bg-dark-700/50 rounded-t-2xl">
              <div className="flex items-center gap-2"><Lucide.Bot className="text-neon-cyan" size={20} /><span className="font-bold text-sm">Aura AI</span></div>
              <button onClick={() => setIsOpen(false)}><Lucide.ChevronDown /></button>
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {msgs.map((m, i) => (
                <div key={i} className={`flex ${m.r === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`p-3 text-[13px] rounded-xl max-w-[85%] ${m.r === 'user' ? 'bg-neon-cyan/20 text-white' : 'bg-dark-700 text-gray-300'}`}>{m.t}</div>
                </div>
              ))}
              <div ref={endRef} />
            </div>
            <div className="p-3 border-t border-white/5">
              <div className="relative">
                <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleSend()} placeholder="Pregúntale a Aura..." className="w-full bg-dark-900 border border-white/10 rounded-full px-4 py-2 text-sm focus:outline-none focus:border-neon-cyan" />
                <button onClick={handleSend} className="absolute right-2 top-1/2 -translate-y-1/2 text-neon-cyan"><Lucide.Send size={16} /></button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// ═══════════════════════════════════════════
//  APP & HERO
// ═══════════════════════════════════════════
function App() {
  return (
    <StoreProvider>
      <div className="min-h-screen bg-dark-900 text-white selection:bg-neon-cyan/30 pb-20">
        <TopBar />
        <Header />
        
        <section className="relative overflow-hidden pt-20 pb-32">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-neon-cyan/5 rounded-full blur-[100px]" />
          <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10 text-center md:text-left">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
              <span className="text-xs font-bold text-neon-cyan tracking-widest uppercase bg-white/5 border border-white/10 px-4 py-1.5 rounded-full">Tecnología de Punta</span>
              <h1 className="text-4xl md:text-6xl font-black mt-8 mb-6 leading-tight">La mejor tecnología <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-cyan via-white to-neon-purple">al mejor precio del mercado.</span></h1>
              <p className="text-gray-400 text-lg md:text-xl max-w-2xl mb-12">Explora nuestro catálogo exclusivo de hardware premium y componentes de alto rendimiento para proyectos ambiciosos.</p>
              <div className="flex flex-col md:flex-row gap-4 justify-center md:justify-start">
                <button onClick={() => document.getElementById('grid-start').scrollIntoView({ behavior: 'smooth' })} className="px-10 py-4 bg-gradient-to-r from-neon-cyan to-neon-purple rounded-2xl font-black text-white shadow-xl flex items-center justify-center gap-2">VER CATÁLOGO <Lucide.ArrowRight size={20} /></button>
                <a href="https://wa.me/573005054912" target="_blank" className="px-10 py-4 glass border border-white/10 rounded-2xl font-black hover:bg-white/5 transition-all flex items-center justify-center gap-2">WHATSAPP</a>
              </div>
            </motion.div>
          </div>
        </section>

        <div id="grid-start" />
        <ProductGrid />
        
        <ProductModal />
        <Chatbot />
      </div>
    </StoreProvider>
  );
}

// ═══════════════════════════════════════════
//  BOOT
// ═══════════════════════════════════════════
const root = createRoot(document.getElementById('root'));
root.render(
  <ErrorBoundary>
    <App />
  </ErrorBoundary>
);
