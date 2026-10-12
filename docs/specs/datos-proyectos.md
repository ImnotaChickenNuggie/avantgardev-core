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
}
```

Proyectos actuales: **Vazza** (e-commerce), **Capital Humano** (plataforma de RH), **Magnapelle** (sitio corporativo), **Amanal** (landing page). Los logos de marca están en `src/assets/brands/`; las portadas en `public/projects/`.
