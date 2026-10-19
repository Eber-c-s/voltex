# VOLTEX storefront

Sitio estático responsive multipágina basado en los diseños Stitch adjuntos. Cada sección principal abre su propia página: `index.html`, `catalogo.html`, `servicios.html`, `local.html` y `contacto.html`. Sin backend ni inventario conectado.

## Ejecutar localmente

Requiere Node.js instalado. Desde esta carpeta:

```sh
npm start
```

Abrir http://localhost:4173. No se requieren dependencias de npm.

## Configuración de negocio

- `products.json`: productos, marca, precio referencial, categoría, estado de ejemplo e imagen.
- `config.js`: número WhatsApp internacional en dígitos, dirección, horario y URL de Instagram.
- `index.html`: contenido, secciones y estilos.

El formulario valida los campos y solo deriva a WhatsApp al configurar el número. Para recibir envíos sin que el cliente abra WhatsApp se necesita un backend/servicio de formularios. Nunca confiar el stock/precio a los datos de demostración.

## Publicación

Publicar los archivos estáticos en un hosting HTTPS que admita HTML/JS. Confirmar con VOLTEX teléfono, dirección, horario, redes, precios, inventario, permisos de imágenes y dominio antes de publicar. Reemplazar Tailwind CDN por CSS compilado para producción y definir política CSP según los recursos externos usados.

Las carpetas originales `stitch_voltex_e_commerce_storefront` conservan ambos HTML y capturas de referencia exportados.
