# Layout (`src/layouts/Layout.astro`)

Envuelve todas las páginas. Responsabilidades:

- `<html lang="es-MX">` con script inline que previene el flash de modo oscuro.
- Meta del `<head>`: title, description, keywords, canonical, Open Graph, Twitter Cards.
- Google Analytics (gtag `G-BGC53R068L`), diferido con `requestIdleCallback`.
- JSON-LD con el schema Organization.
- Precarga de fuentes: Vanregis (woff2) con preload; Google Fonts carga lazy con el truco `media="print"` + swap.
- `<ClientRouter />` (Astro View Transitions / modo SPA).
- Configuración del IntersectionObserver de `.reveal`; se vuelve a ejecutar en `astro:page-load` para la navegación SPA.
- Hooks de View Transitions: `astro:before-swap` preserva la clase `dark`; `astro:after-swap` hace scroll instantáneo al ancla del hash.
