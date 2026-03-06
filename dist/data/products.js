/**
 * ╔══════════════════════════════════════════╗
 * ║   TECH MARKET V3 – Datos Estrictos       ║
 * ╠══════════════════════════════════════════╣
 * ║  Nuevos productos de Nicho (Periféricos, ║
 * ║  Smart Home, Licencias, etc.)            ║
 * ╚══════════════════════════════════════════╝
 */

const mockProducts = [
    // 🏍️ Nueva Categoría: Intercomunicadores
    {
        id: "101", name: "Intercomunicador K06A", price: 40000, category: "Intercomunicadores", isPromo: true,
        fotos: ["/photos/intercoms.png", "https://placehold.co/400x400/1C2039/B026FF?text=K06A+Lateral", "https://placehold.co/400x400/1C2039/FF2D95?text=K06A+Accesorios"],
        specs: { "Conectividad": "Bluetooth 5.0", "Batería": "500mAh (Garantizado)", "Resistencia": "IPX6 (Lluvia)", "Perfil": "Motociclismo Urbano" }
    },
    {
        id: "102", name: "Intercomunicador Y30A", price: 45000, category: "Intercomunicadores", isPromo: false,
        fotos: ["/photos/intercoms.png", "https://placehold.co/400x400/1C2039/B026FF?text=Y30A+Casco", "https://placehold.co/400x400/1C2039/FF2D95?text=Y30A+Caja"],
        specs: { "Rango": "Hasta 1000m", "Intercom múltiple": "Sí (2 Riders)", "Cancelación de Ruido": "DSP Avanzado", "Resistencia": "IP67" }
    },
    {
        id: "103", name: "Intercomunicador Q58", price: 85000, category: "Intercomunicadores", isPromo: true,
        fotos: ["/photos/intercoms.png", "https://placehold.co/400x400/1C2039/B026FF?text=Q58+Microfono", "https://placehold.co/400x400/1C2039/FF2D95?text=Q58+Instalado"],
        specs: { "Batería": "1000mAh Larga duración", "Chip": "Qualcomm Dual", "Música Compartida": "Soportado", "Audio": "Hi-Fi Estéreo" }
    },

    // 🖱️ Periféricos y Accesorios anteriores adaptados al formato 'fotos'
    { id: "1", name: "Mouse Gamer Logitech G304", price: 80000, category: "Periféricos", fotos: ["https://placehold.co/400x400/1C2039/00E5FF?text=G304+Front", "https://placehold.co/400x400/1C2039/B026FF?text=G304+Side"], isPromo: true, specs: { "Sensor": "Hero", "DPI": "12.000" } },
    { id: "2", name: "Webcam Logitech C920 HD Pro", price: 150000, category: "Periféricos", fotos: ["https://placehold.co/400x400/1C2039/00E5FF?text=C920+Camera", "https://placehold.co/400x400/1C2039/B026FF?text=C920+Mount"], isPromo: false, specs: { "Resolución": "1080p", "Micrófono": "Estéreo" } },
    { id: "4", name: "Audífonos In-ear G304 / X15 Gamer", price: 30000, category: "Audio", fotos: ["https://placehold.co/400x400/1C2039/00E5FF?text=X15+Case", "https://placehold.co/400x400/1C2039/B026FF?text=X15+Buds"], isPromo: false, specs: { "Tipo": "In-ear TWS", "Estuche": "Carga magnética" } },
    { id: "5", name: "Timbre Inalámbrico con Cámara", price: 60000, category: "Smart Home", fotos: ["https://placehold.co/400x400/1C2039/00E5FF?text=Timbre+Smart", "https://placehold.co/400x400/1C2039/B026FF?text=Timbre+App"], isPromo: false, specs: { "Conexión": "WiFi", "Visión Nocturna": "Sí" } },
    { id: "6", name: "Hub Adaptador Type-C 7 en 1", price: 30000, category: "Accesorios", fotos: ["/photos/7-1.png", "https://placehold.co/400x400/1C2039/B026FF?text=Hub+Cable"], isPromo: false, specs: { "Puertos": "USB, HDMI, SD", "Interfaz": "Type-C" } },
    { id: "7", name: "Licencia MICROSOFT 365", price: 50000, category: "Software", fotos: ["/photos/ofice.png", "https://placehold.co/400x400/1C2039/B026FF?text=M365+Cloud"], isPromo: true, specs: { "Tipo": "Vitalicia", "Usuarios": "5 dispositivos" } },
    { id: "8", name: "Lápiz Táctil Universal Stylus", price: 35000, category: "Accesorios", fotos: ["/photos/stylus.png", "https://placehold.co/400x400/1C2039/B026FF?text=Stylus+Tip"], isPromo: false, specs: { "Rechazo Palma": "Soportado", "Batería": "Type-C" } }
];

// Asignar al scope global para que el frontend React lo lea
window.PRODUCTS = mockProducts;
