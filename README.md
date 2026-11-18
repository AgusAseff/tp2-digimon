**Deploy:** https://tp2-digimon.vercel.app/

## Tema y API

- **Tema:** Digimon.
- **API:** [Digimon API](https://digimon-api.vercel.app/) —
  endpoint `https://digimon-api.vercel.app/api/digimon`. Pública, sin clave.
  Devuelve 209 Digimons con nombre, imagen y nivel.

## Funcionalidades

- Landing con presentación del tema y acceso al catálogo.
- Catálogo con tarjetas generadas desde JavaScript (imagen, nombre y nivel).
- Estados de **cargando**, **error** y **sin resultados**.
- Búsqueda por nombre.
- Filtro por nivel, con opciones generadas a partir de los datos de la API.
- Diseño responsivo para dispositivos moviles.

## Cómo ejecutarlo

Requiere Node.js 22 o superior(probado en la v24.21.0).

```bash
npm install
npm run dev
```

## Build

```bash
npm run build     # genera dist/
npm run preview   # sirve dist/ para probarlo
```

## Estructura

```
├── index.html        Landing
├── catalogo.html     Catálogo
├── vite.config.js    Entradas del build (las dos páginas) y base relativa
└── src/
    ├── main.js       Estilos de la landing
    ├── catalogo.js   Fetch, tarjetas, estados, búsqueda y filtro
    └── style.css     Estilos compartidos
```
