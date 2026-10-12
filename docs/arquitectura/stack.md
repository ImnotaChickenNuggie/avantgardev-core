# Stack y arquitectura

- **Framework**: Astro 6 (sitio estático) con islas React 19 (`client:idle`, `client:only="react"`).
- **Routing**: basado en archivos. Dos rutas: `/` (homepage) y `/proyecto/[slug]` (páginas de detalle dinámicas).
- **Estilos**: Tailwind CSS v4 vía el plugin `@tailwindcss/vite`. No hay `tailwind.config`; todos los tokens se definen CSS-first en `src/styles/global.css` bajo `@theme`. Ver [sistema de diseño](../diseno/sistema-de-diseno.md).
- **Componentes UI**: los componentes shadcn/ui viven en `src/components/ui/` y usan `class-variance-authority` + `clsx` + `tailwind-merge` (utilidad en `src/lib/utils.ts`).
- **Animaciones**: GSAP para animaciones de entrada/scroll; Lenis para smooth scroll (`SmoothScroll.tsx`); clase `.reveal` + IntersectionObserver para fade-ins al hacer scroll (configurado en `Layout.astro`).
- **View Transitions**: `<ClientRouter />` de Astro (modo SPA) con `transition:name` en las tarjetas de proyecto para transiciones de elemento compartido entre lista y detalle.
- **3D**: Three.js (usado en la sección Hero).
- **Cursor personalizado**: librería `cursor-style` envuelta en `CursorWrapper.tsx`; solo se renderiza en escritorio (media queries hover + fine pointer).
- **Email**: SDK de Resend para el formulario de contacto.

## Variables de entorno

- `RESEND_API_KEY` — requerida para el envío de correo del formulario de contacto.

## Comandos

Gestor de paquetes: **pnpm** (v10.8+). Node >= 22.12.0.

| Comando | Propósito |
|---------|-----------|
| `pnpm dev` | Servidor de desarrollo en localhost:4321 |
| `pnpm build` | Build de producción a `./dist/` |
| `pnpm preview` | Previsualizar el build de producción |
| `pnpm lint` | Revisar código con Biome |
| `pnpm lint:fix` | Corregir problemas de lint automáticamente |
| `pnpm format` | Formatear código con Biome |
