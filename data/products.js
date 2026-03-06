/**
 * ╔══════════════════════════════════════════╗
 * ║   TECH MARKET V3 – Datos Estrictos       ║
 * ╠══════════════════════════════════════════╣
 * ║  Nuevos productos de Nicho (Periféricos, ║
 * ║  Smart Home, Licencias, etc.)            ║
 * ╚══════════════════════════════════════════╝
 */

export const mockProducts = [
    { id: "1", name: "Mouse Gamer Logitech G304 Lightspeed", price: 80000, category: "Periféricos", image: "/g304.jpg", isPromo: true, specs: { "Conectividad": "Inalámbrica Lightspeed", "Sensor": "Hero", "DPI": "12.000" } },
    { id: "2", name: "Webcam Logitech C920 HD Pro 1080p", price: 150000, category: "Periféricos", image: "/c920.jpg", isPromo: false, specs: { "Resolución": "1080p", "Micrófono": "Estéreo integrado" } },
    { id: "3", name: "Intercomunicador Q58 MAX para Casco", price: 85000, category: "Accesorios", image: "/q58.jpg", isPromo: true, specs: { "Conectividad": "Bluetooth", "Resistencia": "Agua y polvo", "Uso": "Múltiples dispositivos" } },
    { id: "4", name: "Audífonos Bluetooth In-ear G304 / X15 Gamer", price: 30000, category: "Audio", image: "/earbuds.jpg", isPromo: false, specs: { "Tipo": "In-ear TWS", "Estuche": "Carga magnética" } },
    { id: "5", name: "Timbre Inalámbrico con Cámara y Sensor", price: 60000, category: "Smart Home", image: "/timbre.jpg", isPromo: false, specs: { "Conexión": "WiFi", "App": "Control móvil" } },
    { id: "6", name: "Hub Adaptador Type-C 7 en 1", price: 30000, category: "Accesorios", image: "/hub.jpg", isPromo: false, specs: { "Puertos": "USB, HDMI, SD", "Interfaz": "Type-C" } },
    { id: "7", name: "Licencia MICROSOFT 365 de por vida (5 disp.)", price: 50000, category: "Software", image: "/office.jpg", isPromo: true, specs: { "Tipo": "Licencia digital", "Usuarios": "Hasta 5 dispositivos" } },
    { id: "8", name: "Lápiz Táctil Universal Stylus (Rechazo Palma)", price: 35000, category: "Accesorios", image: "/stylus.jpg", isPromo: false, specs: { "Compatibilidad": "Universal / iPad", "Batería": "Recargable Type-C" } }
];

// Asignar al scope global para que el frontend React (vía CDN) lo lea
window.PRODUCTS = mockProducts;
