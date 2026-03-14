import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as Lucide from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useStore } from '../../context/StoreContext';
import { trackCartCheckout } from '../../utils/telemetry';
import { formatPrice } from '../../utils/currency';

export function CartDrawer() {
  const {
    isCartOpen,
    setIsCartOpen,
    cartItems,
    cartTotal,
    totalItems,
    updateQuantity,
    removeFromCart,
    clearCart
  } = useCart();

  const { currency } = useStore();

  const handleCheckout = () => {
    if (cartItems.length === 0) return;

    // Construir la orden
    let orderText = "Hola TECHMARKET, solicito la siguiente orden:\n";
    cartItems.forEach(item => {
      const nombre = item.product.name;
      const precioUnitario = item.product.price;
      const precioItem = precioUnitario * item.quantity;
      orderText += `- ${item.quantity}x ${nombre} (${formatPrice(precioItem, currency)})\n`;
    });
    orderText += `\nTOTAL: ${formatPrice(cartTotal, currency)}`;

    // Disparar telemetría
    trackCartCheckout(cartTotal, totalItems);

    // Abrir WhatsApp
    const whatsappNum = import.meta.env.VITE_WHATSAPP_NUMBER || '573005054912';
    window.open(`https://wa.me/${whatsappNum}?text=${encodeURIComponent(orderText)}`, '_blank');

    // Opcional: vaciar carrito despues de enviar al checkout?
    // clearCart();
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Overlay oscuro */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[101] bg-quantum-deep/80 backdrop-blur-sm"
            onClick={() => setIsCartOpen(false)}
          />

          {/* Panel Lateral */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            drag="x"
            dragConstraints={{ left: 0, right: 300 }}
            dragElastic={0.2}
            onDragEnd={(e, info) => {
              if (info.offset.x > 100) setIsCartOpen(false);
            }}
            className="fixed top-0 right-0 bottom-0 z-[102] w-full max-w-md bg-quantum-deep/90 backdrop-blur-xl border-l border-quantum-cyan/20 shadow-[-10px_0_40px_rgba(0,245,255,0.1)] flex flex-col"
          >
            {/* Header */}
            <div className="p-6 border-b border-white/5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Lucide.ShoppingBag className="text-quantum-cyan" size={24} />
                <h2 className="text-xl font-black uppercase tracking-widest text-white text-glow-cyan">Nexo de Carga</h2>
              </div>
              <button
                onClick={() => setIsCartOpen(false)}
                className="p-2 text-white/50 hover:text-quantum-cyan hover:bg-quantum-cyan/10 rounded-lg transition-colors"
              >
                <Lucide.X size={24} />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {cartItems.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center opacity-40">
                  <Lucide.PackageX size={64} className="mb-4 text-quantum-cyan" />
                  <p className="font-mono text-xs uppercase tracking-[0.2em] text-center">Protocolo de carga vacío</p>
                </div>
              ) : (
                cartItems.map(item => {
                  const nombre = item.product.name;
                  const foto = item.product.images?.[0];
                  const precio = item.product.price;

                  return (
                    <div key={item.product.id} className="flex gap-4 p-4 rounded-xl bg-black/30 border border-white/5 relative group">
                      <div className="w-20 h-20 rounded-lg bg-quantum-deep flex items-center justify-center p-2 border border-white/5 flex-shrink-0">
                        <img src={foto} alt={nombre} className="w-full h-full object-contain drop-shadow-[0_0_8px_rgba(0,245,255,0.2)]" />
                      </div>

                      <div className="flex-1 flex flex-col justify-between">
                        <div className="pr-6">
                          <h4 className="text-sm font-bold text-white leading-tight line-clamp-2">{nombre}</h4>
                          <span className="text-xs text-quantum-cyan font-black mt-1 inline-block drop-shadow-[0_0_8px_rgba(0,245,255,0.4)]">
                            {formatPrice(precio, currency)}
                          </span>
                        </div>

                        <div className="flex items-center gap-4 mt-2">
                          <div className="flex items-center gap-2 bg-black/40 rounded-lg p-1 border border-white/10">
                            <button
                              onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                              className="w-6 h-6 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 rounded"
                            >
                              <Lucide.Minus size={12} />
                            </button>
                            <span className="text-xs font-mono font-bold w-4 text-center">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                              className="w-6 h-6 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 rounded"
                            >
                              <Lucide.Plus size={12} />
                            </button>
                          </div>
                        </div>
                      </div>

                      <button
                        onClick={() => removeFromCart(item.product.id)}
                        className="absolute top-4 right-4 text-white/20 hover:text-danger-red transition-colors"
                      >
                        <Lucide.Trash2 size={16} />
                      </button>
                    </div>
                  );
                })
              )}
            </div>

            {/* Footer / Checkout */}
            {cartItems.length > 0 && (
              <div className="p-6 border-t border-white/5 bg-black/20">
                <div className="flex justify-between items-center mb-6">
                  <span className="text-xs font-black uppercase text-white/50 tracking-widest">Valor Neto ({currency})</span>
                  <span className="text-3xl font-black text-white text-glow-cyan drop-shadow-[0_0_15px_rgba(0,245,255,0.4)]">
                    {formatPrice(cartTotal, currency)}
                  </span>
                </div>

                <button
                  onClick={handleCheckout}
                  className="neon-wave-btn w-full py-4 rounded-xl text-quantum-cyan font-black text-sm uppercase tracking-[0.2em] flex items-center justify-center gap-3"
                >
                  <Lucide.Zap size={18} className="fill-current" /> PROCESAR ORDEN GLOBAL
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
