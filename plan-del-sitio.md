# Avantgardev: Brand Guidelines & Technical Architecture

## 1. Core Identity
* **Brand Name:** Avantgardev
* **Concept:** Un colectivo disruptivo de diseño y desarrollo web. 
* **Tagline:** Transformamos ideas en realidades.
* **Vibe & Tone:** Vanguardista, directo, profesional, honesto. Rechaza las soluciones vacías ("vibe coding") y prioriza la ingeniería con propósito.

## 2. Visual Identity (Figma AI Prompt Data)
* **Aesthetic:** Avant-garde, dark mode, high contrast, tech-gallery.
* **Typography:**
  * **Headings (H1/H2):** Vanregis (Futurista, geométrica, de alto impacto).
  * **Body & UI (Primary):** Space Grotesk (Técnica, legible, moderna).
* **Color Palette:**
  * **Background / Base Dark:** `#070711` (Negro Profundo)
  * **Text / Base Light:** `#F7EBEC` (Blanco Suave)
  * **Primary Action / Accent 1:** `#197BBD` (Azul Brillante)
  * **Disruptive Highlight / Accent 2:** `#39FF14` (Verde Neón)
  * **Emphasis / Alert:** `#F71735` (Rojo Vibrante)
* **Imagery:** Gráficos abstractos de ciberespacio, nodos, conexiones neuronales tecnológicas en colores neón sobre fondo oscuro. Cero ilustraciones corporativas genéricas.

## 3. Manifesto (Core Values)
1. **IA InnecesarIA:** No implementamos tecnología por tendencia. La usamos solo si aporta un valor real a tu sueño.
2. **Prioridad Humana:** Tu idea es el centro. No buscamos imponer nuestra visión, sino potenciar la tuya.
3. **Artesanía Digital:** No generamos basura digital. Cada línea de código y cada píxel tiene una razón de ser. Eficiencia y durabilidad por encima de la inmediatez.
4. **Transparencia Radical:** Te diremos la verdad, aunque signifique venderte menos. Proyectos sólidos y honestos.
5. **Profesionalismo al mando:** Soluciones listas para crecer, no "vibe coding" de 5 minutos que requiere reestructuración en 6 meses.
6. **Ingeniería con Alma:** Codeamos con el cerebro y diseñamos con el alma; no "vibramos" con el código.

## 4. Website Architecture & Copywriting

### Navbar
* **Links:** Manifiesto | Metodología | Proyectos | FAQs
* **Primary CTA Button:** CONECTEMOS (Estilo Outline, hover fill).

### Section 01: Hero
* **H1:** TRANSFORMAMOS IDEAS EN REALIDADES
* **Subtitle:** Aplicamos soluciones tecnológicas y definimos ideas para convertirlas en realidades que potencian tu crecimiento.
* **CTA Primary (Solid):** Escríbenos
* **CTA Secondary (Outline):** Conoce nuestro impacto
* **Visual:** Gráfico de "cerebro digital/conexiones neón" alineado a la derecha.

### Section 02: Authority Banner
* **Title:** IDEAS TRANSFORMADAS
* **Content:** Fila de logotipos de empresas/colaboraciones previas en escala de grises / baja opacidad, con scroll horizontal infinito.

### Section 03: The Manifesto
* **Layout:** Lista vertical limpia con mucho white-space y números de gran tamaño.
* **Content:** Los 6 puntos de los Core Values.

### Section 04: Metodología Evolutiva
* **01. Inmersión:** Entendemos tu visión. Nos sumergimos en tus sueños para diseñar la propuesta tecnológica que realmente necesitas.
* **02. Definición:** Trazamos el camino. Solución a medida, transparencia radical y ajustes para potenciar tu marca.
* **03. Creación:** Construimos el futuro. Te hacemos parte del proceso, desarrollando el apartado visual y tu MVP.
* **04. Despegue:** Tu realidad digital. Lanzamiento al mercado y acompañamiento continuo.

### Section 05: FAQs
* **¿Están peleados con la IA?** No, es un apoyo. Rechazamos las "soluciones milagrosas" sin base técnica.
* **¿Solo se dedican al desarrollo web?** Somos un estudio integral (logotipos, brandbooks, estrategia técnica y digital).
* **¿Cuál es el precio?** Cotizaciones personalizadas basadas en un análisis profundo de tus necesidades reales, sin paquetes genéricos.
* **¿El primer acercamiento tiene costo?** No. Creemos en el libre albedrío; escuchamos tu visión sin compromisos.

### Section 06: Contact (Footer/CTA)
* **Hook:** Dale vida a tus sueños. No dejes que una gran idea se quede en el papel. Únete a nuestro colectivo disruptivo y hablemos de cómo potenciar tu proyecto con tecnología y diseño de vanguardia.
* **Form Fields:** Nombre | Email | ¿Qué sueño vamos a construir?
* **Submit Button:** Iniciar la transformación

## 5. Technical Stack Considerations (Web)
* **Frontend Framework:** Astro como base principal / React unicamente para componentes que necesiten hidratación o manejo completo de animaciones (Alineado a rendimiento y SEO).
* **Styling:** Tailwind CSS, Shadcn para diseño UI del sitio, magicUI y react bits para micro animaciones o animaciones un poco mas complejas.
* **Hosting:** Netlify.