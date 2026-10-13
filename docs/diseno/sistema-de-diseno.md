# Sistema de diseño

Referencia completa y vigente: [`DESIGN.md`](../../DESIGN.md) (raíz). Contexto de producto: [`PRODUCT.md`](../../PRODUCT.md). Este documento resume lo que importa al implementar.

Todos los tokens viven en `src/styles/global.css`. Dirección: **El Escáner**, un HUD inspirado en Death Stranding (sin paisajes) mezclado con cyberpunk. El rediseño se hace por fases; mientras tanto algunos componentes aún usan la apariencia anterior.

## Color

Base fría desaturada en ambos temas; morado = acción; neón = acento puntual; cian = líneas HUD; ámbar = avisos.

| Token (Tailwind) | Variable | Uso |
|---|---|---|
| `bg-bg`, `bg-surface`, `bg-surface-2`, `bg-subtle` | `--ag-bg`, `--ag-surface`… | Fondos |
| `text-text`, `text-muted`, `text-disabled` | `--ag-text`, `--ag-muted`… | Texto |
| `bg-primary`, `text-primary-ink` | `--ag-primary`, `--ag-primary-ink` | Acción / texto morado legible |
| `text-neon`, `text-neon-ink` | `--ag-neon`, `--ag-neon-ink` | Acento puntual (`neon-ink` es el legible en light) |
| `text-hud`, `bg-hud-muted` | `--ag-hud` | Líneas y foco HUD |
| `text-amber`, `text-danger` | `--ag-amber`, `--ag-danger` | Aviso / error |
| `border-line`, `border-line-strong` | `--ag-line`, `--ag-line-strong` | Divisores de 1px |

Los colores se exponen como `--ag-*` y Tailwind los mapea con `@theme inline`. No hardcodear hex en componentes (el hook `check-conventions.sh` lo avisa). El Hero conserva sus colores propios en `ColorBends`.

## Tipografía

- `font-heading` → "Vanregis" (woff2 autoalojado en `/fonts/vanregis.woff2`): display en mayúsculas.
- `font-sans` → "Space Grotesk" (Google Fonts, lazy): cuerpo.
- `font-mono` → "JetBrains Mono" (Google Fonts, lazy): solo datos, índices y medidas.
- Escalas: `text-2xs` (0.625rem), `text-display` (8rem); espaciados extra: `18`, `22`, `26`, `30`, `34`, `38`, `42`.

## Utilitarios HUD

| Clase | Efecto |
|---|---|
| `hud-frame` | Borde 1px con esquinas cian de 14px; se intensifica en hover/foco |
| `hud-tick` | Regla de marcas tipo instrumento |
| `hud-tag` | Etiqueta mono corta (índices, estados) |
| `hud-scan` | Barrido cian estilo Odradek al hover/foco |
| `hud-glitch` | Separación RGB breve al hover |

Textos HUD (en español, listos para traducir) en `src/data/hud-labels.ts`.

## Forma y profundidad

Radio base 2px (`--radius`). Plano por defecto: profundidad con línea y tono. `shadow-glow-primary|neon|danger|subtle` son anillos de 1px más emisión corta, solo en hover/foco.

## Modo oscuro

Clase `dark` en `<html>`, alternada vía localStorage + preferencia del SO. Flash evitado con script inline en `<head>` (ver [layout](../arquitectura/layout.md)). Variante personalizada `.dark *` registrada en Tailwind. El rediseño aplica por igual a light y dark.

## Movimiento

Lenis para smooth scroll, GSAP para entrada/scroll, `.reveal` + IntersectionObserver. Todo respeta `prefers-reduced-motion`.
