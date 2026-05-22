# 🍕 El Rey de la Media Masa - Menú Digital

Sitio web moderno y responsive para el menú digital de la pizzería "El Rey de la Media Masa" en Mercedes, Buenos Aires.

## 🚀 Características

- ✅ **Diseño moderno y atractivo** con paleta de colores del branding
- ✅ **100% responsive** (mobile, tablet, desktop)
- ✅ **Navbar sticky navegable** con scroll suave
- ✅ **Buscador en tiempo real** para filtrar pizzas por nombre o ingrediente
- ✅ **Datos dinámicos** cargados desde JSON
- ✅ **Footer con redes sociales** clickeables
- ✅ **Zero dependencias** - Vanilla JS puro
- ✅ **Rápido y ligero** - < 100KB total

## 📁 Estructura del Proyecto

```
menu-rey/
├── index.html          # Estructura HTML principal
├── styles.css          # Estilos CSS (con variables CSS)
├── script.js           # Lógica JavaScript
├── menu-data.json      # Datos del menú
└── README.md           # Este archivo
```

## 🛠️ Tecnologías Usadas

- **HTML5** - Semántico y accesible
- **CSS3** - Con variables, Grid, Flexbox
- **JavaScript ES6+** - Fetch API, async/await
- **Google Fonts** - Outfit (fuente principal)

## 💻 Ejecutar Localmente

### Opción 1: Live Server (VS Code)
1. Abrí el proyecto en VS Code
2. Instalá la extensión "Live Server"
3. Click derecho en `index.html` → "Open with Live Server"

### Opción 2: Python Server
```bash
# Python 3
python -m http.server 8000

# Luego abrí: http://localhost:8000
```

### Opción 3: Node.js
```bash
npx serve
```

## 🌐 Deployar a GitHub Pages

### Paso 1: Crear/Actualizar el repositorio

Si ya tenés el repo `menu-rey`:
1. Andá a: `https://github.com/franuncal/menu-rey`
2. Borrá todos los archivos viejos (imágenes, index.html viejo)

### Paso 2: Subir archivos nuevos

1. En la página principal del repo, click en **"Add file"** → **"Upload files"**
2. Arrastrá estos 4 archivos:
   - `index.html`
   - `styles.css`
   - `script.js`
   - `menu-data.json`
3. Mensaje de commit: `Nuevo menú web con código`
4. Click en **"Commit changes"**

### Paso 3: Verificar GitHub Pages

1. Andá a **Settings** del repo
2. Menú lateral → **Pages**
3. Verificá que esté configurado en **Branch: main**, **/ (root)**
4. Esperá 2-3 minutos

### Paso 4: Acceder al sitio

```
https://franuncal.github.io/menu-rey/
```

Los QR que ya imprimiste **siguen funcionando** - la URL no cambió.

## 📝 Actualizar el Menú

Para cambiar precios o agregar pizzas:

1. Editá `menu-data.json` en GitHub (click en el archivo → lápiz ✏️)
2. Modificá los datos (respetando la estructura JSON)
3. Guardá (Commit changes)
4. Refrescá el sitio en 1-2 minutos

**Ejemplo de actualización:**
```json
{
  "nombre": "NUEVA PIZZA",
  "ingredientes": "Muzarella, tomate, albahaca",
  "precio": {
    "grande": 25000,
    "chica": 23000
  }
}
```

## 🎨 Personalización

### Cambiar colores:
Editá las variables CSS en `styles.css`:
```css
:root {
    --rojo-rey: #B22234;    /* Color principal */
    --crema: #F5EDDC;        /* Color secundario */
}
```

### Cambiar fuente:
En `index.html`, reemplazá el link de Google Fonts y actualizá la variable en CSS.

## 📱 Características del Buscador

- Busca en nombre de pizzas e ingredientes
- Normaliza texto (ignora tildes y mayúsculas)
- Actualización en tiempo real mientras escribís
- Se puede cerrar con `ESC` o el botón X

## 🔗 Links de Redes Sociales

Actualizá los links en `index.html` (líneas ~150-160):
```html
<a href="TU_INSTAGRAM_AQUI" target="_blank">Instagram</a>
<a href="TU_FACEBOOK_AQUI" target="_blank">Facebook</a>
```

## 🐛 Troubleshooting

**El menú no carga:**
- Verificá que `menu-data.json` esté en el mismo directorio
- Abrí la consola del navegador (F12) para ver errores

**Los estilos no se ven:**
- Verificá que `styles.css` esté en el mismo directorio
- Limpiá el caché del navegador (Ctrl + Shift + R)

**El buscador no funciona:**
- Verificá que `script.js` esté cargando correctamente
- Revisá la consola por errores de JavaScript

## 📊 Performance

- **Peso total:** ~95KB (sin imágenes)
- **Tiempo de carga:** < 1 segundo
- **Requests:** 4 archivos
- **Compatible:** Todos los navegadores modernos

## ✨ Futuras Mejoras (Opcionales)

- [ ] PWA (funciona offline)
- [ ] Modo oscuro/claro
- [ ] Filtros por categoría de pizza
- [ ] Animaciones al scroll
- [ ] Carrito de compras (si agregan pedidos online)

## 📄 Licencia

Proyecto desarrollado para "El Rey de la Media Masa" - Mercedes, Buenos Aires.

---

**Desarrollado con ❤️ por Fran Uncal**
