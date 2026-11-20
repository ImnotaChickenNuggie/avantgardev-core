# Capa de datos: proyectos

`src/data/projects.ts` exporta la interfaz `Project` y el arreglo `projects`.

```ts
interface Project {
  slug: string;          // URL slug
  title: string;
  category: string;      // e.g. "E-commerce", "Landing Page"
  description: string;   // Corta (meta + tarjetas)
  longDescription: string;
  tags: string[];        // Stack mostrado como chips
  accent: "neon" | "primary"; // Tema de color del proyecto
  image: string;         // Ruta bajo /projects/ en public/
  featured: boolean;     // Controla posición/énfasis en el grid
  challenge: string;
  solution: string;
  results: string[];     // Arreglo de 3 métricas
  year: string;
  client: string;
  url?: string;          // Enlace externo opcional
  links?: { href: string; label: string }[];
  seoTitle?: string;     // <title> (≤60 car.); si falta: "{title} — Avantgardev"
  subtitle?: string;     // Bajo el H1, con la palabra clave del caso
  alts?: string[];       // Alt por captura, mismo orden que `images`
  steps?: { title: string; body: string }[]; // "Cómo funciona" (+ stepsNote)
  sections?: { title: string; body: string }[]; // H2/H3 extra del caso
}
```

Proyectos actuales: **Vazza** (fintech / PWA de crédito personal), **Capital Humano** (plataforma de RH), **Magnapelle** (sitio corporativo), **Amanal** (landing page). Los logos de marca están en `src/assets/brands/`; las capturas (`images`) en `src/assets/` en formato `.webp` (`scripts/to-webp.ts` convierte PNG a webp) y se renderizan con `<Image>` de `astro:assets`.
