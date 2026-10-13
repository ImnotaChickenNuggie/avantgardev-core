---
name: Avantgardev
description: Colectivo de diseño y desarrollo web; un hilo que conecta, sobre violeta-negro, con pulso cyberpunk.
colors:
  bg-dark: "#07070f"
  surface-dark: "#0d0d19"
  surface-2-dark: "#14142a"
  text-dark: "#eeeaf6"
  muted-dark: "#9892b0"
  line-dark: "#22213a"
  line-strong-dark: "#3b3960"
  bg-light: "#f2f0f8"
  surface-light: "#e8e5f1"
  surface-2-light: "#dcd8ea"
  text-light: "#15111f"
  muted-light: "#5b5672"
  line-light: "#d3cfe3"
  line-strong-light: "#9b96b4"
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

> Estado: **semilla direccional** del rediseño por fases. Se re-documenta en modo scan al terminar.

## Overview

**Creative North Star: "El Hilo"**

Death Stranding trata de conectar lo aislado; Avantgardev es un colectivo, una red de talento. La interfaz lo dice con una sola idea: un hilo fino que recorre la página, se enciende en neón al avanzar y marca cada sección con un nodo en forma de rombo. Alrededor, la contención de Bridges (líneas finas, aire, esquinas cortadas) y el pulso cyberpunk (neón y morado que emiten luz solo cuando algo está activo). El Hero conserva su fondo ColorBends intacto.

Rechaza: adornos de HUD sin función (barras de estado inventadas, ticks decorativos), etiquetas encima de los titulares, números fantasma, cards redondeadas con halo genérico.

**Key Characteristics:**
- Base violeta-negro / lavanda-gris, coherente con el shader del Hero.
- Morado = acción; neón = acento vivo; cian solo en el anillo de foco.
- Radios de 0–2px; plano por defecto, glow solo en hover/foco.
- Vanregis como voz display en mayúsculas.

## Colors

Estrategia Restrained con acentos vivos. Dark y light se diseñan por igual.

- **Violeta Cuántico** (`#7c3aed` dark / `#6d28d9` light): acción primaria; texto morado legible con `primary-ink`.
- **Neón Vivo** (`#39ff14` dark / `#0f7a34` light): el hilo, hover de títulos, estados vivos.
- **Cian de Foco** (`#5ec8e5` dark / `#0e7490` light): solo el anillo de foco.
- **Ámbar** (`#f5a524` / `#a14a07`) y **Rojo** (`#ef4444` / `#dc2626`): aviso y error.
- Neutros: Violeta-negro (`#07070f`), Superficie (`#0d0d19`), Lavanda-gris (`#f2f0f8`), Línea (`#22213a` / `#d3cfe3`).

### Named Rules
**La Regla del Pulso.** El neón y la emisión aparecen en hover, foco o estado activo. En reposo la interfaz está calmada.

## Typography

**Display:** Vanregis · **Body:** Space Grotesk · **Mono:** JetBrains Mono (datos).

La mono solo escribe datos o etiquetas cortas; nunca titulares ni frases de marketing.

## Layout

Contenedor `max-w-7xl`, gutter 24px, secciones de 96–152px con ritmo variable. Composición asimétrica donde conviene (Manifiesto: título fijo a la izquierda, lista a la derecha). El hilo vive en el margen izquierdo en pantallas ≥1344px.

## Elevation & Depth

Plano por defecto: línea (`line`) y tono (`surface`). `shadow-glow-*` solo en hover/foco.

## Shapes

Radio base 2px. Esquinas cortadas (`cut-corner`) en botones sólidos. Rombos como marcador (hilo, filas, pasos).

## Components

- **Hilo** (`.strand`, `.strand-node`): recorrido de la página.
- **Fila de servicio / valor:** línea superior, rombo-marcador y color de acento al hover.
- **Recorrido de metodología:** línea con rombos y números Vanregis; los pasos sí son una secuencia.
- **Botón primario:** violeta, esquinas cortadas, texto blanco, mayúsculas; barrido `hud-scan`.
- **Botón de contorno:** borde `line-strong`, hover neón.

## Do's and Don'ts

### Do
- Usar tokens, nunca hex. Respetar `prefers-reduced-motion`.
- Numerar solo cuando hay secuencia real.

### Don't
- No poner etiquetas sobre titulares ni estados inventados ("sistema en línea").
- No usar neón permanente ni degradados en texto.
- No tocar el fondo ni los colores del Hero.
