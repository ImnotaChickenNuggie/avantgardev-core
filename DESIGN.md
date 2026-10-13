---
name: Avantgardev
description: Colectivo de diseño y desarrollo web; HUD de escáner sobre base fría, con pulso cyberpunk.
colors:
  bg-dark: "#0a0d12"
  surface-dark: "#10151c"
  surface-2-dark: "#171e28"
  text-dark: "#e6ebf0"
  muted-dark: "#8a95a5"
  line-dark: "#232c3a"
  line-strong-dark: "#3a4659"
  bg-light: "#eef1f5"
  surface-light: "#e4e9ef"
  surface-2-light: "#d8dfe8"
  text-light: "#0e1620"
  muted-light: "#4f5b6b"
  line-light: "#c5cedb"
  line-strong-light: "#8d9aac"
  primary: "#7c3aed"
  primary-hover: "#8b5cf6"
  primary-ink-dark: "#a78bfa"
  primary-light: "#6d28d9"
  neon: "#39ff14"
  neon-ink-light: "#0f7a34"
  hud-dark: "#5ec8e5"
  hud-light: "#0e7490"
  amber-dark: "#f5a524"
  amber-light: "#a14a07"
  danger-dark: "#ef4444"
  danger-light: "#dc2626"
typography:
  display:
    fontFamily: "Vanregis, Arial Black, system-ui, sans-serif"
    fontSize: "clamp(2.25rem, 7vw, 6rem)"
    fontWeight: 900
    lineHeight: 0.95
    letterSpacing: "-0.02em"
  body:
    fontFamily: "Space Grotesk, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "JetBrains Mono, ui-monospace, monospace"
    fontSize: "0.625rem"
    fontWeight: 500
    lineHeight: 1.4
    letterSpacing: "0.14em"
rounded:
  none: "0px"
  sm: "2px"
  lg: "4px"
spacing:
  sm: "8px"
  md: "16px"
  lg: "24px"
  xl: "96px"
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "#ffffff"
    rounded: "{rounded.sm}"
    padding: "14px 28px"
  button-primary-hover:
    backgroundColor: "{colors.primary-hover}"
  hud-frame:
    textColor: "{colors.text-dark}"
    rounded: "{rounded.none}"
    padding: "24px"
---

# Design System: Avantgardev

> Estado: **semilla direccional** (fase 0+1 del rediseño). Los tokens de color, radios y utilitarios HUD ya existen en `src/styles/global.css`; los componentes se migran por fases (2–5). Se re-documenta en modo scan al terminar el rediseño.

## Overview

**Creative North Star: "El Escáner"**

La interfaz se comporta como el instrumento de un porteador: mide, marca y revela, no decora. Toma del HUD de Death Stranding (sin paisajes) la contención: líneas finas de una fracción de píxel, esquinas de encuadre, mucho aire y datos en lugar de adornos. Toma del cyberpunk el pulso: un acento neón que solo aparece cuando algo está vivo, y un glitch breve de canal que ocurre al interactuar. El Hero conserva su fondo ColorBends (morado y verde) intacto; todo lo demás se ordena en frío alrededor de él.

Rechaza: cards redondeadas con halo genérico, degradados en texto, vidrio decorativo y neón permanente. Mantiene el tono del colectivo: técnico, directo, con criterio.

**Key Characteristics:**
- Base fría desaturada (azul-negro / papel gris frío), nunca negro puro ni blanco puro.
- Morado = acción; neón = acento puntual; cian = línea HUD; ámbar = aviso.
- Radios de 0–2px; profundidad por línea y tono, no por sombra.
- Etiquetas mono cortas como datos de instrumento, en español.
- Vanregis como voz display en mayúsculas.

## Colors

Estrategia Restrained: neutros azul-acero con un acento de acción. Dark y light se diseñan por igual.

### Primary
- **Violeta Cuántico** (`#7c3aed` dark / `#6d28d9` light): botones y acciones primarias. Texto sobre fondo oscuro usa `Violeta Claro` (`#a78bfa`, token `primary-ink`).

### Secondary
- **Neón Vivo** (`#39ff14` dark / `#0f7a34` light): indicadores de estado, foco de hover, el acento de "algo vivo". Uso escaso.

### Tertiary
- **Cian de Escáner** (`#5ec8e5` dark / `#0e7490` light): líneas HUD, esquinas de encuadre, anillo de foco, barrido tipo Odradek.
- **Ámbar de Aviso** (`#f5a524` dark / `#a14a07` light): solo advertencias.

### Neutral
- **Azul-negro** (`#0a0d12`), **Superficie** (`#10151c`), **Superficie 2** (`#171e28`), **Hueso frío** (`#e6ebf0`), **Apagado** (`#8a95a5`), **Línea** (`#232c3a`).
- Light: **Papel frío** (`#eef1f5`), **Superficie** (`#e4e9ef`), **Tinta** (`#0e1620`), **Apagado** (`#4f5b6b`), **Línea** (`#c5cedb`).

### Named Rules
**La Regla del Pulso.** El neón y los efectos de emisión solo aparecen en hover, foco o estado activo. En reposo la interfaz está fría.
**La Regla de la Línea.** Separar con 1px de `line`, no con sombras ni fondos distintos cuando basta.

## Typography

**Display Font:** Vanregis (fallback Arial Black, system-ui)
**Body Font:** Space Grotesk
**Label/Mono Font:** JetBrains Mono

**Character:** Vanregis aporta peso y vanguardia; Space Grotesk mantiene la lectura limpia; la mono se reserva para datos y medidas del HUD.

### Hierarchy
- **Display** (900, `clamp(2.25rem, 7vw, 6rem)`, 0.95): titulares de sección y hero, en mayúsculas.
- **Body** (400, 1rem, 1.6): párrafos, 65–75ch.
- **Label** (500, 0.625rem, +0.14em, mayúsculas, tabular): utilitario `hud-tag`.

### Named Rules
**La Regla del Dato.** La mono solo escribe datos, índices y medidas; nunca títulos ni frases de marketing.

## Layout

Contenedor `max-w-7xl` con gutter de 24px; secciones separadas por 96–152px verticales con ritmo variable. Mucho espacio negativo. Los marcos HUD enmarcan contenido concreto, no cada bloque.

## Elevation & Depth

Plano por defecto. La profundidad se logra con línea (`line`, `line-strong`) y tono (`surface`, `surface-2`). Los tokens `shadow-glow-*` son anillos de 1px más una emisión corta, y solo se activan en hover o foco.

## Shapes

Radio base 2px (`--radius`); escala hasta 8px solo en controles pequeños. Esquinas de encuadre de 14px (`hud-frame`) en lugar de bordes redondeados.

## Components

- **Marco HUD** (`hud-frame`): borde de 1px con esquinas cian que se intensifican en hover/foco.
- **Regla de ticks** (`hud-tick`): separador tipo instrumento de medición.
- **Etiqueta HUD** (`hud-tag`): dato en mono; textos en `src/data/hud-labels.ts`.
- **Barrido** (`hud-scan`): línea cian que cruza el elemento en hover/foco.
- **Glitch** (`hud-glitch`): separación RGB de 0.42s al hover en titulares.
- **Botón primario:** fondo violeta, texto blanco, radio 2px, tracking amplio, mayúsculas.

## Do's and Don'ts

### Do
- Usar tokens (`bg-surface`, `text-hud`, `border-line`), nunca hex.
- Hacer que cada efecto HUD mida o revele algo real (estado, índice, foco).
- Respetar `prefers-reduced-motion` (el barrido se oculta, el glitch se anula).

### Don't
- No poner etiquetas encima de cada titular como eyebrow; el titular habla solo.
- No usar neón permanente ni degradados en texto.
- No tocar el fondo ni los colores del Hero (ColorBends).
- No numerar secciones salvo que la secuencia importe (metodología, índice HUD).
