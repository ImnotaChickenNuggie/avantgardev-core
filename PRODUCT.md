# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users
Dueños de pymes, artistas y creadores de proyectos personales en México que buscan una presencia digital vanguardista pero construida sobre cimientos técnicos sólidos. Llegan comparando agencias o con un proyecto concreto en mente (sitio, e-commerce, plataforma, landing) y necesitan decidir si confían en el colectivo y contactarlo.

## Product Purpose
Sitio oficial de Avantgardev, colectivo disruptivo de diseño y desarrollo web (es-MX, `avantgardev.com.mx`). Comunica cuatro servicios (Desarrollo Web, Diseño, Marketing Digital, Contenido), muestra casos reales y lleva al visitante al formulario de contacto. Éxito: el visitante entiende en segundos qué hace el colectivo y por qué es distinto, y escribe.

## Positioning
Artesanía digital con transparencia radical y soberanía tecnológica del cliente: núcleo con 7+ años de experiencia fullstack y criterio de Tech Lead, código propio sin constructores visuales limitados, sistemas comprensibles que el cliente puede poseer, y la IA como potenciador de la lógica humana, no como reemplazo de la ingeniería ("anti vibe coding").

## Operating Context
Sitio estático Astro 7 + islas React, desplegado en Netlify, formulario de contacto vía Resend. Un solo idioma (español es-MX; traducción a inglés prevista más adelante). Dos temas (claro/oscuro) con alternancia manual y preferencia del SO.

## Capabilities and Constraints
- Rutas: `/` y `/proyecto/[slug]` (Vazza, Capital Humano, Magnapelle, Nexo, Amanal), generadas desde `src/data/projects.ts`.
- Hero con fondo ColorBends (shader Three.js) que debe conservarse intacto.
- Pendiente de decidir: traducción a inglés y estructura i18n.

## Brand Commitments
- Nombre: Avantgardev; origen en el avant-garde artístico (arte en tiempos de crisis) llevado al siglo XXI.
- Tipografía display Vanregis (autoalojada) se conserva: funciona tanto en cyberpunk como en Death Stranding.
- Acentos: morado `#7C3AED` se conserva; el verde neón `#39FF14` sigue como acento secundario.
- Mezcla estética pedida: Death Stranding (sin paisajes) + cyberpunk; se conserva la esencia original (morado, neón, glows, Vanregis).

## Evidence on Hand
- Cinco casos de proyecto con desafío, solución y resultados en `src/data/projects.ts`.
- Logos de clientes en `src/assets/brands/` (Vazza, Capital Humano, Magnapelle, Amanal).
- No hay testimonios, métricas externas ni premios: no inventarlos.

## Product Principles
1. Mostrar criterio técnico, no promesas vacías: cada sección demuestra rigor.
2. Transparencia: decir qué se hace y cómo, sin jerga que oculte.
3. El cliente es dueño de su tecnología; el sitio lo dice y lo practica.
4. Vanguardia con sustancia: la estética nunca estorba la lectura ni el contacto.

## Accessibility & Inclusion
Contraste WCAG AA en ambos temas, `prefers-reduced-motion` respetado, navegación por teclado y foco visible.
