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
        descripcion: "Comunicación inalámbrica entre pilotos en tiempo real con Bluetooth 5.0 y resistencia IPX6. Ideal para recorridos urbanos en moto bajo cualquier clima.",
        fotos: ["/photos/intercoms.webp", "https://placehold.co/400x400/1C2039/B026FF?text=K06A+Lateral", "https://placehold.co/400x400/1C2039/FF2D95?text=K06A+Accesorios"],
        specs: { "Conectividad": "Bluetooth 5.0", "Batería": "500mAh (Garantizado)", "Resistencia": "IPX6 (Lluvia)", "Perfil": "Motociclismo Urbano" }
    },
    {
        id: "102", name: "Intercomunicador Y30A", price: 45000, category: "Intercomunicadores", isPromo: false,
        descripcion: "Intercom para 2 riders con alcance de hasta 1000 metros y cancelación de ruido DSP. Perfecto para rutas largas en carretera con acompañante.",
        fotos: ["/photos/intercoms.webp", "https://placehold.co/400x400/1C2039/B026FF?text=Y30A+Casco", "https://placehold.co/400x400/1C2039/FF2D95?text=Y30A+Caja"],
        specs: { "Rango": "Hasta 1000m", "Intercom múltiple": "Sí (2 Riders)", "Cancelación de Ruido": "DSP Avanzado", "Resistencia": "IP67" }
    },
    {
        id: "103", name: "Intercomunicador Q58", price: 85000, category: "Intercomunicadores", isPromo: true,
        descripcion: "Audio Hi-Fi estéreo con chip Qualcomm Dual y batería de 1000mAh para jornadas largas. Ideal para grupos que comparten música en ruta.",
        fotos: ["/photos/intercoms.webp", "https://placehold.co/400x400/1C2039/B026FF?text=Q58+Microfono", "https://placehold.co/400x400/1C2039/FF2D95?text=Q58+Instalado"],
        specs: { "Batería": "1000mAh Larga duración", "Chip": "Qualcomm Dual", "Música Compartida": "Soportado", "Audio": "Hi-Fi Estéreo" }
    },

    // 🖱️ Periféricos y Accesorios
    {
        id: "1", name: "Mouse Gamer Logitech G304", price: 80000, category: "Periféricos",
        descripcion: "Sensor Hero de 12.000 DPI con conexión inalámbrica ultrarrápida y diseño liviano. Perfecto para gaming competitivo o trabajo prolongado sin cables.",
        fotos: ["https://placehold.co/400x400/1C2039/00E5FF?text=G304+Front", "https://placehold.co/400x400/1C2039/B026FF?text=G304+Side"], isPromo: true, specs: { "Sensor": "Hero", "DPI": "12.000" }
    },
    {
        id: "2", name: "Webcam Logitech C920 HD Pro", price: 150000, category: "Periféricos",
        descripcion: "Grabación en 1080p con micrófono estéreo integrado y enfoque automático. Ideal para videollamadas profesionales, streaming o clases virtuales.",
        fotos: ["https://placehold.co/400x400/1C2039/00E5FF?text=C920+Camera", "https://placehold.co/400x400/1C2039/B026FF?text=C920+Mount"], isPromo: false, specs: { "Resolución": "1080p", "Micrófono": "Estéreo" }
    },
    {
        id: "4", name: "Audífonos In-ear G304 / X15 Gamer", price: 30000, category: "Audio",
        descripcion: "Audífonos TWS con estuche de carga magnética y sonido nítido para cualquier situación. Ideales para trabajo, estudio o viajes en transporte.",
        fotos: ["https://placehold.co/400x400/1C2039/00E5FF?text=X15+Case", "https://placehold.co/400x400/1C2039/B026FF?text=X15+Buds"], isPromo: false, specs: { "Tipo": "In-ear TWS", "Estuche": "Carga magnética" }
    },
    {
        id: "5", name: "Timbre Inalámbrico con Cámara", price: 60000, category: "Smart Home",
        descripcion: "Monitorea tu puerta desde el celular con conexión WiFi y visión nocturna incluida. Perfecto para hogares que buscan seguridad inteligente sin instalación compleja.",
        fotos: ["https://placehold.co/400x400/1C2039/00E5FF?text=Timbre+Smart", "https://placehold.co/400x400/1C2039/B026FF?text=Timbre+App"], isPromo: false, specs: { "Conexión": "WiFi", "Visión Nocturna": "Sí" }
    },
    {
        id: "6", name: "Hub Adaptador Type-C 7 en 1", price: 30000, category: "Accesorios",
        descripcion: "Convierte un puerto USB-C en 7 entradas simultáneas incluyendo HDMI, USB y SD. Perfecto para portátiles con pocos puertos en reuniones o viaje.",
        fotos: ["/photos/7-1.webp", "https://placehold.co/400x400/1C2039/B026FF?text=Hub+Cable"], isPromo: false, specs: { "Puertos": "USB, HDMI, SD", "Interfaz": "Type-C" }
    },
    {
        id: "7", name: "Licencia MICROSOFT 365", price: 50000, category: "Software",
        descripcion: "Licencia vitalicia para hasta 5 dispositivos con Word, Excel, PowerPoint y más. Ideal para estudiantes y profesionales que necesitan Office completo.",
        fotos: ["/photos/ofice.webp", "https://placehold.co/400x400/1C2039/B026FF?text=M365+Cloud"], isPromo: true, specs: { "Tipo": "Vitalicia", "Usuarios": "5 dispositivos" }
    },
    {
        id: "8", name: "Lápiz Táctil Universal Stylus", price: 35000, category: "Accesorios",
        descripcion: "Stylus con rechazo de palma y carga Type-C para dibujar o tomar notas en tablets. Ideal para diseñadores y estudiantes que trabajan en pantalla.",
        fotos: ["/photos/stylus.webp", "https://placehold.co/400x400/1C2039/B026FF?text=Stylus+Tip"], isPromo: false, specs: { "Rechazo Palma": "Soportado", "Batería": "Type-C" }
    }
];

// Asignar al scope global para que el frontend React lo lea
window.PRODUCTS = mockProducts;
