# TechVault — Catálogo de Tecnología

Catálogo estático de productos tech con diseño moderno (modo oscuro + acentos neón). Sin dependencias: solo HTML, CSS y JavaScript.

## 📁 Estructura del Proyecto

```
Marca/
├── index.html              ← Página principal
├── css/
│   └── styles.css          ← Estilos (tema oscuro neón)
├── js/
│   └── app.js              ← Lógica: carga JSON, búsqueda en tiempo real
├── data/
│   └── productos.json      ← ⭐ Archivo de datos (editar aquí)
└── README.md
```

## ✏️ Cómo editar productos

Abre `data/productos.json` en IntelliJ IDEA (o cualquier editor) y modifica el array. Cada producto tiene esta estructura:

```json
{
  "id": 4,
  "foto": "https://ejemplo.com/imagen.jpg",
  "titulo": "Nombre del producto",
  "descripcion": "Detalles técnicos del producto.",
  "colores": ["Color 1", "Color 2"],
  "precio": 499
}
```

Guarda el archivo y recarga la página. ¡Eso es todo!

## 🖥️ Ejecución local

Al ser un sitio estático, necesitas un servidor local (no abrir el HTML directamente como archivo). Opciones rápidas:

```bash
# Opción 1 – Python (suele estar instalado)
python -m http.server 3000

# Opción 2 – Node.js (si lo tienes)
npx -y serve .

# Opción 3 – VS Code
# Instala la extensión "Live Server" y haz clic derecho → Open with Live Server
```

Luego abre `http://localhost:3000` en tu navegador.

## 🚀 Despliegue gratuito

### Vercel

1. Instala Vercel CLI: `npm i -g vercel`
2. En la carpeta del proyecto ejecuta: `vercel`
3. Sigue las instrucciones. Tu sitio estará en vivo en segundos.

### GitHub Pages

1. Sube el proyecto a un repositorio en GitHub.
2. Ve a **Settings → Pages → Branch → `main`** (carpeta `/root`).
3. GitHub publicará el sitio automáticamente.

### Render

1. Crea una cuenta en [render.com](https://render.com).
2. Nuevo → **Static Site** → conecta tu repositorio.
3. **Publish Directory**: `.` (raíz).
4. Click en **Create Static Site**.

## 📝 Licencia

Proyecto con fines demostrativos. Libre de usar y modificar.
