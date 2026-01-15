# Utammy's Store - Tienda de Uniformes

Tienda en línea para la venta de uniformes escolares y empresariales de alta calidad.

## 🎯 Características

- **Catálogo de Productos**: Amplia variedad de uniformes escolares y empresariales
- **Carrito de Compras**: Sistema de carrito con gestión de cantidades y tallas
- **Categorías**: Filtrado por tipo de uniforme (Escolares/Empresariales)
- **Interfaz en Español**: Toda la aplicación está en español
- **Diseño Responsivo**: Optimizado para dispositivos móviles y desktop
- **Integración con API**: Preparado para conectarse a una API backend

## 🛠️ Tecnologías

- **Vue.js 3** - Framework JavaScript progresivo
- **Vue Router** - Enrutamiento de la aplicación
- **Pinia** - Gestión de estado (stores)
- **Axios** - Cliente HTTP para llamadas a la API
- **Vite** - Herramienta de construcción y desarrollo
- **ESLint & Prettier** - Linting y formateo de código

## 📦 Instalación

```bash
# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev

# Compilar para producción
npm run build

# Previsualizar compilación de producción
npm run preview
```

## 🔧 Configuración

### Variables de Entorno

Crea un archivo `.env` en la raíz del proyecto:

```env
VITE_API_URL=https://tu-api.com
```

Esta variable se usa en los stores para las llamadas a la API.

## 📁 Estructura del Proyecto

```
src/
├── assets/         # Recursos estáticos (CSS, imágenes)
├── components/     # Componentes reutilizables de Vue
├── router/         # Configuración de rutas
├── stores/         # Stores de Pinia (products, cart)
├── views/          # Páginas/vistas principales
│   ├── HomeView.vue
│   ├── ProductosView.vue
│   ├── CarritoView.vue
│   └── AcercaView.vue
├── App.vue         # Componente raíz
└── main.js         # Punto de entrada
```

## 🛍️ Funcionalidades Principales

### Catálogo de Productos
- Visualización de productos con imágenes
- Filtrado por categorías
- Modal de detalles del producto
- Selección de tallas

### Carrito de Compras
- Agregar productos con talla específica
- Modificar cantidades
- Eliminar productos
- Calcular totales automáticamente
- Proceso de checkout

### Gestión de Estado
- **Products Store**: Manejo de productos y categorías
- **Cart Store**: Gestión del carrito de compras

## 🔌 Integración con API

La aplicación está preparada para conectarse a una API backend. Los stores incluyen funciones para:

- `GET /products` - Obtener lista de productos
- `POST /checkout` - Procesar pedidos

Actualmente usa datos de prueba (mock) si no hay API configurada.

## 🎨 Personalización

Los colores principales están definidos usando gradientes:
- Primario: `#667eea` → `#764ba2`
- Los estilos se pueden personalizar en los componentes `.vue`

## 📱 Páginas

1. **Inicio** (`/`) - Página principal con presentación del negocio
2. **Productos** (`/productos`) - Catálogo completo con filtros
3. **Carrito** (`/carrito`) - Gestión del carrito de compras
4. **Acerca** (`/acerca`) - Información sobre la tienda

## 🚀 Despliegue

```bash
# Compilar aplicación
npm run build

# Los archivos compilados estarán en la carpeta dist/
```

## 📝 Linting y Formateo

```bash
# Ejecutar linter
npm run lint

# Formatear código
npm run format
```

## 🤝 Contribución

Este proyecto está diseñado para ser fácilmente extensible. Puedes:

- Agregar nuevas categorías de productos
- Personalizar el diseño
- Integrar métodos de pago
- Agregar sistema de usuarios
- Implementar búsqueda de productos

## 📄 Licencia

Este proyecto es privado y todos los derechos están reservados.

---

Desarrollado con ❤️ para Utammy's Store
