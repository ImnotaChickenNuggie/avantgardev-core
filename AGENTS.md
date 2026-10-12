# AGENTS.md

Guía para agentes de código (Claude Code, etc.) en este repositorio. El detalle vive en [`docs/`](docs/README.md).

## Planning Rules (CRITICAL)

- Genera planes EXTREMADAMENTE concisos. Sacrifica gramática y fluidez verbal para ser breve.
- Al final de CADA plan, incluye obligatoriamente una sección: `### Preguntas sin resolver` con ambigüedades o asunciones a validar antes de ejecutar, definidas por un número para que el usuario pueda responderlas.


## Cuándo leer qué

| Tema | Doc |
|---|---|
| Stack, routing, env, comandos | [docs/arquitectura/stack.md](docs/arquitectura/stack.md) |
| `Layout.astro` (meta, GA, fuentes, transiciones) | [docs/arquitectura/layout.md](docs/arquitectura/layout.md) |
| Componentes, islas, assets | [docs/arquitectura/componentes.md](docs/arquitectura/componentes.md) |
| Tokens, tipografía, modo oscuro | [docs/diseno/sistema-de-diseno.md](docs/diseno/sistema-de-diseno.md) |
| Secciones y páginas | [docs/specs/paginas.md](docs/specs/paginas.md) |
| Modelo `Project` | [docs/specs/datos-proyectos.md](docs/specs/datos-proyectos.md) |
| Lint, hooks, commits | [docs/guias/calidad-de-codigo.md](docs/guias/calidad-de-codigo.md) |
