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
        fotos: ["/photos/products/intercoms.jpg"],
        specs: { "Conectividad": "Bluetooth 5.0", "Batería": "500mAh", "Resistencia": "IPX6", "Perfil": "Urbano" }
    },
    {
        id: "102", name: "Intercomunicador Q58", price: 85000, category: "Intercomunicadores", isPromo: false,
        descripcion: "Intercom para motociclistas con soporte para música compartida y audio Hi-Fi Estéreo. Batería de larga duración.",
        fotos: ["/photos/products/q58.jpg"],
        specs: { "Batería": "1000mAh", "Chip": "Qualcomm Dual", "Música Compartida": "Soportado", "Audio": "Hi-Fi Estéreo" }
    },
    {
        id: "103", name: "Intercomunicador Y30A", price: 45000, category: "Intercomunicadores", isPromo: false,
        descripcion: "Intercom para 2 riders con alcance de hasta 1000 metros y cancelación de ruido DSP. Perfecto para rutas largas en carretera con acompañante.",
        fotos: ["/photos/products/intercoms.jpg"],
        specs: { "Rango": "Hasta 1000m", "Intercom múltiple": "Sí (2 Riders)", "Cancelación de Ruido": "DSP Avanzado", "Resistencia": "IP67" }
    },

    // 🖱️ Periféricos
    {
        id: "1", name: "Mouse Gamer Logitech G304", price: 80000, category: "Periféricos", isPromo: true,
        descripcion: "Ratón mecánico inalámbrico con sensor Hero de 12.000 DPI y diseño ergonómico ultraligero. Conexión de baja latencia para gaming.",
        fotos: ["/photos/products/mouseBlancoLogitech.jpg", "/photos/products/mousesLogitech.jpg"],
        specs: { "Sensor": "Hero", "Conexión": "2.4GHz", "DPI": "12.000", "Peso": "Ultra ligero" }
    },
    {
        id: "6", name: "Hub Adaptador Type-C 7 en 1", price: 30000, category: "Accesorios", isPromo: false,
        descripcion: "Hub USB tipo C indispensable para tu setup, con múltiples puertos USB, HDMI y lector SD.",
        fotos: ["/photos/products/hubUSB.jpg"],
        specs: { "Puertos": "USB, HDMI, SD", "Interfaz": "Type-C", "Compatibilidad": "Universal" }
    },

    // 🎧 Audio
    {
        id: "4", name: "Audífonos In-ear X15 Gamer", price: 30000, category: "Audio", isPromo: false,
        descripcion: "Audífonos In-ear TWS Especiales para gaming con baja latencia y estuche de carga magnética.",
        fotos: ["/photos/products/headphones.jpg"],
        specs: { "Tipo": "In-ear TWS", "Estuche": "Carga magnética", "Conexión": "Bluetooth", "Uso": "Gaming" }
    },
    {
        id: "11", name: "Micrófono Inalámbrico", price: 45000, category: "Audio", isPromo: false,
        descripcion: "Micrófono inalámbrico ideal para streaming, podcast y creadores de contenido. Excelente cancelación de ruido y cero latencia.",
        fotos: ["/photos/products/wirelessMicrophone.jpg"],
        specs: { "Tipo": "Inalámbrico", "Uso": "Streaming", "Conexión": "Receptor Tipo-C/Lightning" }
    },

    // 🏠 Smart Devices & Almacenamiento
    {
        id: "5", name: "Smartwatch Deportivo Pro", price: 98000, category: "Smart Home", isPromo: false,
        descripcion: "Reloj inteligente con monitoreo de salud, notificaciones, modos deportivos y batería de larga duración. Perfecto para tu día a día.",
        fotos: ["/photos/products/smartwatch.jpg"],
        specs: { "Pantalla": "AMOLED", "Resistencia": "IP68", "Funciones": "Salud y Deportes", "Batería": "14 días" }
    },
    {
        id: "12", name: "Disco Duro Externo 1TB", price: 180000, category: "Almacenamiento", isPromo: true,
        descripcion: "Almacenamiento portátil de alta velocidad y capacidad de 1TB. Perfecto para respaldar tu setup y llevar tus datos a todas partes.",
        fotos: ["/photos/products/discoDuro.jpg"],
        specs: { "Capacidad": "1TB", "Conexión": "USB 3.0", "Tipo": "HDD Externo" }
    },

    // 🔌 Accesorios & Software
    {
        id: "8", name: "Lápiz Óptico de Precisión Stylus", price: 35000, category: "Accesorios", isPromo: false,
        descripcion: "Stylus de precisión con rechazo de palma y carga Type-C. Ideal para diseñadores, creativos y tomar notas.",
        fotos: ["/photos/products/stylus.png"],
        specs: { "Sensibilidad": "Alta precisión", "Rechazo Palma": "Soportado", "Carga": "Type-C", "Compatible": "Universal" }
    },
    {
        id: "7", name: "Licencia MICROSOFT 365", price: 50000, category: "Software", isPromo: true,
        descripcion: "Suscripción o licencia de suite de productividad Microsoft 365 con nube incluida.",
        fotos: ["/photos/products/m365.png"],
        specs: { "Tipo": "Vitalicia/Anual", "Usuarios": "5 dispositivos", "Incluye": "Office+Nube", "Soporte": "Microsoft" }
    }
];

window.PRODUCTS = mockProducts;
