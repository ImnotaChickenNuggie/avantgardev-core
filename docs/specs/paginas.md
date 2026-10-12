# Páginas

## Homepage (`src/pages/index.astro`)

Orden de secciones: **Navbar → Hero → AuthorityBanner → Services → Manifesto → Methodology → Projects → FAQs → Contact**

| Sección | Archivo | Descripción |
|---------|---------|-------------|
| Navbar | `Navbar.astro` | Logo + enlaces + toggle de tema; `MobileMenu.tsx` en móvil |
| Hero | `Hero.astro` | Hero a pantalla completa con fondo 3D (Three.js), titular, CTA |
| AuthorityBanner | `AuthorityBanner.astro` | Marquesina con logos de clientes (Vazza, Capital Humano, Magnapelle, Amanal) |
| Services | `Services.astro` | Grid de tarjetas con los 4 pilares (`id="servicios"`): Desarrollo Web, Diseño, Marketing Digital, Contenido. Ver [backlog](../backlog-copy-servicios.md) |
| Manifesto | `Manifesto.astro` | Filosofía/valores de la agencia |
| Methodology | `Methodology.astro` | Pasos del proceso de trabajo |
| Projects | `Projects.astro` | Grid editorial asimétrico de tarjetas que enlazan a `/proyecto/[slug]` |
| FAQs | `FAQs.astro` + `FAQSection.tsx` | FAQ en acordeón (acordeón de Base UI, isla React) |
| Contact | `Contact.astro` + `ContactForm.tsx` | Formulario de contacto conectado al endpoint de Resend |

## Detalle de proyecto (`src/pages/proyecto/[slug].astro`)

Páginas dinámicas generadas en build con `getStaticPaths()` desde `src/data/projects.ts` (ver [datos de proyectos](datos-proyectos.md)). Cuatro secciones:

1. **Hero** — título, badge de categoría, tags de tecnologías, meta cliente/año, placeholder de imagen con letra inicial grande.
2. **Desafío y Solución** — texto en dos columnas.
3. **Resultados** — grid de tres tarjetas con métricas numeradas.
4. **CTA** — "Iniciar proyecto" (→ `/#contacto`) + "Ver más proyectos" (→ `/#proyectos`).
