# 🎵 Biblioteca Musical - Music Library App

Una aplicación web moderna de biblioteca musical construida con **React**, **TypeScript**, **Redux Toolkit** y **styled-components**. Esta aplicación permite buscar álbumes y lanzamientos musicales utilizando la API de MusicBrainz, ver detalles completos de cada lanzamiento y gestionar una lista de favoritos con persistencia local.

## 📋 Descripción del Proyecto

Este proyecto es una aplicación de biblioteca musical que permite a los usuarios:

- 🔍 **Buscar artistas y álbumes** mediante la API pública de MusicBrainz
- 📖 **Ver información detallada** de cada lanzamiento musical (fecha, país, formato, número de canciones, sello discográfico)
- ❤️ **Gestionar favoritos** con persistencia en localStorage
- 🎨 **Interfaz moderna** con componentes estilizados usando styled-components
- ✅ **Pruebas unitarias** implementadas con Jest y React Testing Library

## 🛠️ Tecnologías Utilizadas

### Core
- **React 19.2.0** - Biblioteca de interfaz de usuario
- **TypeScript 4.9.5** - Tipado estático
- **React Router DOM 7.9.6** - Navegación entre páginas

### Estado y Datos
- **Redux Toolkit 2.8.2** - Gestión de estado global
- **React Redux 9.2.0** - Integración de Redux con React
- **Axios 1.13.2** - Cliente HTTP para consumir APIs

### Estilos
- **styled-components 6.1.19** - CSS-in-JS para componentes estilizados
- **react-icons 5.5.0** - Iconos para la interfaz

### Testing
- **Jest 27.5.1** - Framework de testing
- **@testing-library/react 16.3.0** - Utilidades para testing de componentes React
- **@testing-library/jest-dom 6.9.1** - Matchers personalizados para Jest
- **@testing-library/user-event 14.6.1** - Simulación de eventos de usuario
- **redux-mock-store 1.5.5** - Mock del store de Redux para testing

### Build Tools
- **React Scripts 5.0.1** - Configuración y scripts de Create React App
- **Babel** - Transpilación de código
- **identity-obj-proxy 3.0.0** - Mock de módulos CSS en tests

## 📁 Estructura del Proyecto

```
src/
├── Components/
│   ├── App/
│   │   ├── index.tsx          # Componente principal con rutas
│   │   └── store.ts           # Configuración del store de Redux
│   ├── Header/
│   │   └── index.tsx          # Componente de encabezado
│   ├── SearchBar/
│   │   └── index.tsx          # Barra de búsqueda
│   ├── FavoritesList/
│   │   └── index.tsx          # Lista de favoritos
│   ├── Pages/
│   │   ├── SearchPage.tsx     # Página principal de búsqueda
│   │   ├── SongDetail.tsx     # Página de detalles del álbum
│   │   └── style/             # Estilos de las páginas
│   ├── types/
│   │   ├── index.ts           # Tipos TypeScript compartidos
│   │   └── releaseDetails.ts  # Tipos para detalles de lanzamientos
│   └── __test__/              # Tests unitarios
│       ├── App.test.js
│       ├── Header.test.js
│       ├── Library.test.js
│       ├── SearchBar.test.js
│       └── SearchPage.test.js
├── state/
│   ├── searchSlice.ts         # Slice de Redux para búsqueda
│   ├── librarySlice.ts        # Slice de Redux para favoritos
│   ├── detailsSlice.ts        # Slice de Redux para detalles
│   └── status.ts              # Constantes de estado
├── hooks/                     # Custom hooks de React
├── index.tsx                  # Punto de entrada de la aplicación
└── setupTests.js              # Configuración de tests

public/
├── index.html                 # HTML principal
├── manifest.json              # Manifest de PWA
├── placeholder.webp           # Imagen placeholder
└── robots.txt                 # Configuración para crawlers
```

## 🚀 Características Principales

### 1. Búsqueda de Música
- Búsqueda en tiempo real de artistas utilizando la API de MusicBrainz
- Visualización de resultados en una cuadrícula responsive
- Imágenes de portada de álbumes desde Cover Art Archive
- Fallback a imagen placeholder si no hay portada disponible

### 2. Gestión de Favoritos
- Agregar/quitar álbumes de favoritos con un solo clic
- Persistencia de favoritos en localStorage
- Página dedicada para ver todos los favoritos
- Indicador visual de favoritos (corazón activo/inactivo)

### 3. Detalles de Lanzamientos
- Vista detallada de cada álbum/lanzamiento
- Información completa: artista, fecha, país, formato, número de canciones, sello discográfico
- Navegación fluida entre búsqueda y detalles

### 4. Gestión de Estado con Redux
- **searchSlice**: Maneja la búsqueda de artistas y lanzamientos
- **librarySlice**: Gestiona la lista de favoritos
- **detailsSlice**: Maneja los detalles de lanzamientos individuales
- Acciones asíncronas con `createAsyncThunk`
- Estados de carga y error bien manejados

### 5. Testing Completo
- Tests unitarios para componentes principales
- Tests de integración con Redux
- Cobertura de código con Jest
- Configuración de jsdom para testing de DOM

## 📦 Instalación

1. **Clonar el repositorio**
```bash
git clone <url-del-repositorio>
cd Tarea-JEST-REACT
```

2. **Instalar dependencias**
```bash
npm install
```

3. **Iniciar la aplicación en modo desarrollo**
```bash
npm start
```

La aplicación se abrirá en [http://localhost:3000](http://localhost:3000)

## 🧪 Scripts Disponibles

### `npm start`
Ejecuta la aplicación en modo desarrollo.
- Abre [http://localhost:3000](http://localhost:3000) en el navegador
- La página se recarga automáticamente al hacer cambios
- Los errores de lint aparecen en la consola

### `npm test`
Ejecuta las pruebas unitarias en modo interactivo.
- Utiliza Jest y React Testing Library
- Modo watch activado por defecto
- Muestra cobertura de código

### `npm run build`
Construye la aplicación para producción en la carpeta `build`.
- Optimiza el código para mejor rendimiento
- Minifica archivos
- Incluye hashes en nombres de archivo

### `npm run eject`
**⚠️ Operación irreversible**: Expone toda la configuración de webpack, Babel, ESLint, etc.

## 🔌 API Utilizada

### MusicBrainz API
- **Endpoint de búsqueda**: `https://musicbrainz.org/ws/2/release/?query=artist:{artist}&fmt=json`
- **Endpoint de detalles**: `https://musicbrainz.org/ws/2/release/{id}?inc=artist-credits+labels+recordings&fmt=json`

### Cover Art Archive
- **Portadas de álbumes**: `https://coverartarchive.org/release/{id}/front-250`

## 🎨 Componentes Principales

### `App`
Componente raíz que configura las rutas de la aplicación:
- `/` - Página de búsqueda
- `/song/:id` - Detalles del álbum
- `/favorites` - Lista de favoritos

### `SearchPage`
Página principal con:
- Barra de búsqueda
- Cuadrícula de resultados
- Estados de carga y error
- Botones de favoritos y detalles

### `SongDetail`
Página de detalles que muestra:
- Portada del álbum
- Información completa del lanzamiento
- Datos del artista, fecha, país, formato, etc.

### `FavoritesList`
Lista de álbumes favoritos con:
- Misma interfaz que la página de búsqueda
- Opción de eliminar favoritos
- Mensaje cuando no hay favoritos

### `SearchBar`
Componente de búsqueda reutilizable con:
- Input controlado
- Callback para manejar búsquedas
- Estilos personalizados

## 🧩 Redux Slices

### `searchSlice`
```typescript
- State: { artist, releases, loading, error }
- Actions: setArtist, resetResults
- Async Thunks: fetchReleases
```

### `librarySlice`
```typescript
- State: { status, songs }
- Actions: addSong, removeSong
- Persistencia en localStorage
```

### `detailsSlice`
```typescript
- State: { details, loading, error }
- Async Thunks: fetchDetails
```

## 🧪 Testing

El proyecto incluye tests para:
- ✅ Componente App
- ✅ Componente Header
- ✅ Componente SearchBar
- ✅ Página SearchPage
- ✅ Gestión de biblioteca (favoritos)

### Ejecutar tests con cobertura
```bash
npm test -- --coverage
```

Los reportes de cobertura se generan en la carpeta `coverage/`.

## 📝 Configuración TypeScript

El proyecto utiliza TypeScript con configuración estricta:
- Target: ES6
- JSX: React
- Strict mode activado
- Module resolution: Node

## 🎯 Características de Accesibilidad

- Atributos ARIA en botones interactivos
- `aria-pressed` para estado de favoritos
- `aria-label` descriptivos
- `role="status"` y `role="alert"` para mensajes
- Manejo de errores de carga de imágenes

## 🔄 Flujo de Datos

1. Usuario escribe en `SearchBar`
2. Se dispara `setArtist` action
3. `useEffect` detecta cambio y dispara `fetchReleases`
4. API de MusicBrainz devuelve resultados
5. Redux actualiza el estado
6. Componentes se re-renderizan con nuevos datos
7. Usuario puede agregar a favoritos (persiste en localStorage)
8. Usuario puede navegar a detalles (nueva petición a API)

## 🌐 Navegación

La aplicación utiliza React Router con las siguientes rutas:

- **`/`** - Página principal de búsqueda
- **`/song/:id`** - Detalles de un álbum específico
- **`/favorites`** - Lista de favoritos guardados

## 💾 Persistencia de Datos

Los favoritos se guardan automáticamente en `localStorage`:
- Se cargan al iniciar la aplicación
- Se actualizan al agregar/eliminar favoritos
- Persisten entre sesiones del navegador

## 🐛 Manejo de Errores

- Estados de carga mientras se obtienen datos
- Mensajes de error amigables para el usuario
- Fallback de imágenes cuando no hay portada
- Validación de datos antes de renderizar

## 📄 Licencia

Este proyecto es parte de un curso de desarrollo front-end y está destinado para fines educativos.

## 👨‍💻 Autor

Proyecto desarrollado como tarea del curso de Desarrollo Front-End - Módulo JEST y React Testing.

---

**🎵 ¡Disfruta explorando música con esta aplicación!**
