# VOLTEX — La Casa del Electricista

Sitio estático multipágina responsive para publicar con **GitHub Pages**. Las páginas están al nivel raíz para que GitHub las sirva directamente:

- `index.html` — Inicio
- `catalogo.html` — catálogo con búsqueda, filtros y consulta por WhatsApp
- `servicios.html` — servicios
- `local.html` — ubicación y horarios configurables
- `contacto.html` — formulario de consulta

## Ver localmente

La forma más simple es usar VS Code con la extensión **Live Server**: abre esta carpeta, clic derecho en `index.html` → **Open with Live Server**. También puedes subir la carpeta a GitHub y activar Pages.

Con Node.js instalado, ejecuta `node server.js` desde esta carpeta y abre `http://localhost:4173`.

## Datos que debes configurar antes de publicar

1. `config.js`: número de WhatsApp en formato internacional solo dígitos (sin `+`), dirección, horarios y URL real de Instagram.
2. `products.json`: reemplaza todos los valores de ejemplo por datos y stock verificados. No existe sincronización con inventario.
3. `index.html`: contenido, imágenes/recursos de marca y textos.

El formulario solo prepara un mensaje para WhatsApp después de configurar el número; no almacena ni envía información a un servidor. Para recibir consultas sin WhatsApp hace falta un backend o proveedor de formularios.

## Subir a GitHub y habilitar Pages

1. Crea un repositorio en GitHub.
2. Sube el **contenido de esta carpeta `github-pages`** a la raíz del repositorio (`index.html` debe quedar en la raíz, no dentro de otra carpeta).
3. En GitHub abre **Settings → Pages**.
4. En **Build and deployment**, selecciona **Deploy from a branch**, rama `main`, carpeta `/(root)` y guarda.
5. Espera a que Pages publique y abre la URL que muestra esa pantalla.

No se requieren dependencias ni proceso de compilación. Tailwind CSS y Font Awesome se cargan desde CDN; para ver el estilo, se requiere conexión a internet. Verifica que las imágenes externas sigan disponibles y que tengas permiso para publicarlas.
