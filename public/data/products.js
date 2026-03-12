/**
 * ╔══════════════════════════════════════════╗
 * ║   SETUP PRO – Ciber-Gótico Neón Catalog  ║
 * ╠══════════════════════════════════════════╣
 * ║  Productos exactos, precios definitivos  ║
 * ╚══════════════════════════════════════════╝
 */

const mockProducts = [
    // 🎧 Intercomunicadores
    {
        id: "101", name: "Intercomunicador DOBA K06A", price: 148000, category: "Intercomunicadores", isPromo: true,
        descripcion: "Comunicación inalámbrica entre pilotos en tiempo real con Bluetooth 5.0 y resistencia IPX6. Ideal para recorridos urbanos en moto bajo cualquier clima.",
        fotos: ["/photos/intercoms.webp"],
        specs: { "Conectividad": "Bluetooth 5.0", "Batería": "500mAh", "Resistencia": "IPX6", "Perfil": "Urbano" }
    },
    {
        id: "102", name: "Intercomunicador Headset X", price: 140000, category: "Intercomunicadores", isPromo: false,
        descripcion: "Intercom para 2 riders con alcance de hasta 1000 metros y cancelación de ruido DSP. Perfecto para rutas largas en carretera con acompañante.",
        fotos: ["/photos/intercoms.webp"],
        specs: { "Rango": "Hasta 1000m", "Intercom": "2 Riders", "Cancelación": "DSP", "Resistencia": "IP67" }
    },
    {
        id: "103", name: "BIntercom 300 5H", price: 148000, category: "Intercomunicadores", isPromo: false,
        descripcion: "Audio Hi-Fi estéreo con chip Qualcomm Dual y batería de 1000mAh para jornadas largas. Ideal para grupos que comparten música en ruta.",
        fotos: ["/photos/intercoms.webp"],
        specs: { "Batería": "1000mAh", "Chip": "Qualcomm Dual", "Audio": "Hi-Fi Estéreo", "Música": "Compartida" }
    },

    // 🖱️ Periféricos
    {
        id: "1", name: "Ratón Mecánico RGB M0", price: 86000, category: "Periféricos", isPromo: true,
        descripcion: "Ratón mecánico RGB con sensor óptico de 16.000 DPI y diseño ergonómico ultraligero. Conexión inalámbrica de baja latencia para gaming competitivo.",
        fotos: ["https://placehold.co/400x400/1C2039/00E5FF?text=Ratón+RGB"],
        specs: { "Sensor": "Óptico 16K DPI", "Conexión": "2.4GHz", "Peso": "63g", "RGB": "16.8M" }
    },
    {
        id: "2", name: "Alfombrilla RGB Extended Pro", price: 138000, category: "Periféricos", isPromo: false,
        descripcion: "Alfombrilla de escritorio extendida con iluminación RGB perimetral, superficie de micro-textura optimizada para precisión y base antideslizante.",
        fotos: ["/photos/mousepad.png"],
        specs: { "Tamaño": "900x400mm", "RGB": "Perimetral", "Superficie": "Micro-textura", "Base": "Antideslizante" }
    },
    {
        id: "3", name: "Soporte de Teclado Quantum", price: 69000, category: "Periféricos", isPromo: false,
        descripcion: "Soporte ergonómico para teclado mecánico con ángulo ajustable, construcción de aluminio anodizado y pads de silicona antideslizantes.",
        fotos: ["/photos/microphone.png"],
        specs: { "Material": "Aluminio", "Ángulo": "Ajustable", "Pads": "Silicona", "Compatible": "Universal" }
    },

    // 🎧 Audio
    {
        id: "4", name: "HIFI X60", price: 148000, category: "Audio", isPromo: false,
        descripcion: "Audífonos over-ear Hi-Fi con drivers de 50mm planar-magnéticos y cancelación activa de ruido adaptativa. Almohadillas de espuma viscoelástica para sesiones prolongadas.",
        fotos: ["https://placehold.co/400x400/1C2039/00E5FF?text=HIFI+X60"],
        specs: { "Drivers": "50mm Planar", "ANC": "Adaptativa", "Batería": "40h", "Bluetooth": "5.3" }
    },

    // 🏠 Smart Home
    {
        id: "5", name: "Termostato Inteligente Pro", price: 98000, category: "Smart Home", isPromo: false,
        descripcion: "Termostato con pantalla táctil LCD a color, control por app, programación inteligente y compatibilidad con Alexa y Google Home.",
        fotos: ["/photos/smart_thermostat.png"],
        specs: { "Pantalla": "LCD Color", "Compatible": "Alexa/Google", "WiFi": "2.4GHz", "Ahorro": "30%" }
    },
    {
        id: "9", name: "Cámara de Seguridad Smart", price: 11000, category: "Smart Home", isPromo: false,
        descripcion: "Cámara de seguridad inteligente 1080p con visión nocturna, detección de movimiento IA y almacenamiento en la nube. Audio bidireccional incluido.",
        fotos: ["/photos/security_camera.png"],
        specs: { "Resolución": "1080p", "Visión Nocturna": "IR", "Detección": "IA", "Audio": "Bidireccional" }
    },

    // 🔌 Accesorios
    {
        id: "6", name: "Kit de Limpieza Multiuso Pro", price: 35500, category: "Accesorios", isPromo: false,
        descripcion: "Kit profesional de limpieza para electrónicos: spray antiestático, paños de microfibra, cepillos precisos y solución limpiadora. Todo para mantener tu setup impecable.",
        fotos: ["/photos/cleaning_kit.png"],
        specs: { "Componentes": "Spray+Paños+Cepillos", "Tipo": "Antiestático", "Uso": "Electrónicos", "Material": "Microfibra" }
    },
    {
        id: "8", name: "Lápiz Óptico de Precisión Quantum", price: 26000, category: "Accesorios", isPromo: false,
        descripcion: "Stylus de precisión con rechazo de palma, 4096 niveles de sensibilidad y carga Type-C. Ideal para diseñadores y creadores de contenido.",
        fotos: ["/photos/stylus.webp"],
        specs: { "Sensibilidad": "4096 niveles", "Rechazo Palma": "Sí", "Carga": "Type-C", "Compatible": "Universal" }
    },

    // 💿 Software
    {
        id: "7", name: "Leeva Security Suite Pro", price: 99000, category: "Software", isPromo: true,
        descripcion: "Licencia vitalicia de suite de productividad y seguridad con Office completo, antivirus y VPN incluidos. Protección total para hasta 5 dispositivos.",
        fotos: ["/photos/ofice.webp"],
        specs: { "Tipo": "Vitalicia", "Dispositivos": "5", "Incluye": "Office+AV+VPN", "Soporte": "24/7" }
    }
];

window.PRODUCTS = mockProducts;
