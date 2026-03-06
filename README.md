# Tech Market — E-Commerce Premium de Tecnología

Frontend modular de e-commerce con tema oscuro premium, React 18, y componentes listos para conectar con un backend Spring Boot.

## 📁 Estructura

```
techmarket/
├── index.html            ← Entrada + todos los componentes React
├── data/
│   └── products.js       ← ⭐ Datos de productos (editar aquí)
└── README.md
```

## ✏️ Editar Productos

Abre `data/products.js` y modifica el array `window.PRODUCTS`. Cada producto:

```js
{
  id: 5,
  name: "Nombre del producto",
  price: 299.99,
  category: "Categoría",
  mainImage: "https://url-imagen-principal.jpg",
  gallery: ["url1.jpg", "url2.jpg", "url3.jpg"],
  shortDesc: "Descripción corta del producto.",
  specs: { "RAM": "16 GB", "Procesador": "Ryzen 9" }
}
```

## 🖥️ Ejecución Local

Necesitas un servidor local (no abrir como archivo por la carga del JSON):

```bash
# VS Code → extensión "Live Server" → clic derecho index.html → Open with Live Server
# O con Python:
python -m http.server 3000
# O con Node.js:
npx -y serve .
```

## 🔌 Migración a Vite + Spring Boot

Cuando tengas Node.js instalado:

1. `npm create vite@latest . -- --template react`
2. `npm install tailwindcss framer-motion lucide-react`
3. Extrae cada sección marcada con `═══` del HTML a su propio archivo `.jsx`
4. Reemplaza los SVG icons inline con `import { Icon } from 'lucide-react'`
5. Reemplaza las CSS animations con `<motion.div>` de Framer Motion
6. Conecta `fetch()` en lugar de `window.PRODUCTS` para llamar a tu API REST

## 🚀 Despliegue Gratuito

### Vercel
```bash
npm i -g vercel && vercel
```

### GitHub Pages
Sube al repo → Settings → Pages → Branch `main` → carpeta `/root`

### Render
Nuevo → Static Site → Publish Directory: `.` → Create
