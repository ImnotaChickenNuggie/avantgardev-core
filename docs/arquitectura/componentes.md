# Patrón de componentes

- Archivos `.astro`: secciones estáticas / renderizadas en servidor (sin JS por defecto).
- Archivos `.tsx`: islas React interactivas.

| Directiva | Componentes |
|-----------|-------------|
| `client:idle` | SmoothScroll, ContactForm |
| `client:only="react"` | CursorWrapper (necesita el DOM de inmediato, sin SSR) |
| `client:load` | MobileMenu, ThemeToggle, FAQSection |

Las directivas `client:*` van en el `.astro` que usa el componente, no dentro del `.tsx`.

- Alias de rutas: `@/*` → `./src/*`.
- Componentes UI basados en Base UI en `src/components/ui/` (actualmente `accordion.tsx`).

## Assets

- `src/assets/logo.webp` — logo de la agencia.
- `src/assets/brands/*.webp` — logos de clientes para AuthorityBanner (amanal, capital-humano, magnapelle, vazza).
- `public/projects/*.webp` — imágenes de portada de proyectos referenciadas en `projects.ts`.
- `public/fonts/vanregis.woff2` — fuente display autoalojada.
- `public/favicon.svg` + `public/favicon.ico`.
