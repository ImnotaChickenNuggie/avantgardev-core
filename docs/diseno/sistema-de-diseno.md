# Sistema de diseño

Referencia vigente: [`DESIGN.md`](../../DESIGN.md). Producto: [`PRODUCT.md`](../../PRODUCT.md). Los tokens viven en `src/styles/global.css`. El rediseño avanza por fases; los componentes aún no migrados conservan la apariencia anterior.

Dirección: **El Hilo**. Base violeta-negro (coherente con el shader del Hero), acentos morado y neón con emisión en hover, y una sola idea de interfaz: un hilo que conecta las secciones, tomada de la idea de conexión de Death Stranding y del carácter "colectivo" de la marca.

## Color

| Token (Tailwind) | Variable | Uso |
|---|---|---|
| `bg-bg`, `bg-surface`, `bg-surface-2`, `bg-subtle` | `--ag-bg`, `--ag-surface`… | Fondos |
| `text-text`, `text-muted`, `text-disabled` | `--ag-text`, `--ag-muted`… | Texto |
| `bg-primary`, `text-primary-ink` | `--ag-primary`, `--ag-primary-ink` | Acción / texto morado legible |
| `text-neon`, `text-neon-ink` | `--ag-neon`, `--ag-neon-ink` | Acento vivo (`neon-ink` es el legible en light) |
| `text-hud` | `--ag-hud` | Cian: solo anillo de foco |
| `text-amber`, `text-danger` | `--ag-amber`, `--ag-danger` | Aviso / error |
| `border-line`, `border-line-strong` | `--ag-line`, `--ag-line-strong` | Divisores de 1px |

No hardcodear hex en componentes (el hook `check-conventions.sh` avisa). El Hero conserva sus colores propios en `ColorBends`.

## Tipografía

- `font-heading` → Vanregis (autoalojado): display en mayúsculas.
- `font-sans` → Space Grotesk: cuerpo. `font-mono` → JetBrains Mono: datos y etiquetas.
- Escalas: `text-2xs`, `text-display`; espaciados extra `18`…`42`.

## Lenguaje propio

| Pieza | Uso |
|---|---|
| **Hilo** (`.strand` + `.strand-node`, `Strand.astro`) | Línea vertical que se enciende en neón al avanzar; un nodo (rombo) por sección. Solo ≥1344px. Cada sección pone `<span class="strand-node">` |
| **Rombo-marcador** | Aparece en hover de filas (servicios, manifiesto) y en los pasos de metodología |
| `cut-corner` | Esquinas cortadas (chaflán) en botones sólidos; recorta sombras, no usar con glow |
| `hud-scan` | Barrido tipo Odradek al hover/foco |
| `hud-glitch` | Separación RGB breve al hover en titulares |

Reglas: sin etiquetas encima de los titulares; números solo donde hay secuencia (metodología); glow solo en hover/foco.

## Forma y profundidad

Radio base 2px. Plano por defecto; `shadow-glow-primary|neon|danger|subtle` solo en hover/foco.

## Modo oscuro

Clase `dark` en `<html>` (localStorage + preferencia del SO). Aplica por igual a light y dark. Ver [layout](../arquitectura/layout.md).

## Movimiento

Lenis, GSAP y `.reveal`. Respetan `prefers-reduced-motion`.
