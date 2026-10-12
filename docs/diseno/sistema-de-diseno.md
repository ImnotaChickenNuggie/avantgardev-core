# Sistema de diseño

Todos los tokens viven en `src/styles/global.css`.

- **Paleta**: dos colores de acento: `primary` (morado `#7C3AED`) y `neon` (verde `#39FF14`). Se usan como `accent: "neon" | "primary"` en los datos de proyecto.
- **Variables CSS**: los colores se exponen como propiedades `--ag-*`; Tailwind las mapea con `@theme inline` (p. ej. `bg-primary`, `text-neon`, `shadow-glow-neon`). No hardcodear los hex en componentes.
- **Tipografía**:
  - `font-heading` → "Vanregis" (woff2 personalizado, autoalojado en `/fonts/vanregis.woff2`): títulos display/hero en mayúsculas.
  - `font-sans` → "Space Grotesk" (Google Fonts, lazy).
  - `font-mono` → "JetBrains Mono" (Google Fonts, lazy).
- **Escalas personalizadas**: `text-2xs` (0.625rem), `text-display` (8rem); espaciados extra: `18`, `22`, `26`, `30`, `34`, `38`, `42`.
- **Sombras/glows**: `shadow-glow-primary`, `shadow-glow-neon`, `shadow-glow-danger`; se usan en hover de tarjetas y botones.
- **Modo oscuro**: clase `dark` en `<html>`, alternada vía localStorage + preferencia del SO. El flash se evita con un script inline en `<head>` (ver [layout](../arquitectura/layout.md)). La variante personalizada `.dark *` está registrada en Tailwind.
