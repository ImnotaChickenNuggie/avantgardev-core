# Backlog — Avantgardev Copy & Servicios

Priorización con MoSCoW + Valor/Esfuerzo.
Servicios a comunicar: **Desarrollo Web · Diseño · Marketing Digital · Contenido**

---

## Must Have

### [AG-01] ~~Agregar sección de Servicios~~ ✅ Done
`Must Have · Esfuerzo: 5pts · Valor: Alto`

Crear `Services.astro` e insertarlo entre `AuthorityBanner` y `Manifesto` en `index.astro`. Mostrar los cuatro pilares del estudio como grid de tarjetas:

| Pilar | Entregables a mencionar |
|---|---|
| Desarrollo Web | Sitios, e-commerce, plataformas, apps |
| Diseño | UI/UX web, identidad visual, brandbook |
| Marketing Digital | SEO, campañas pagadas, estrategia de canales |
| Contenido | Estrategia editorial, redes sociales, copywriting |

Añadir `id="servicios"` para que el Navbar pueda enlazarlo.

**Criterio de aceptación:** un visitante puede identificar los 4 servicios sin leer el FAQ ni inferirlos de los proyectos.

---

### [AG-02] ~~Reescribir subheadline del Hero~~ ✅ Done
`Must Have · Esfuerzo: 1pt · Valor: Alto`

Archivo: `src/components/Hero.astro`

Copy actual:
> "Aplicamos soluciones tecnologicas y definimos ideas para convertirlas en realidades que potencian tu crecimiento."

Copy propuesto:
> "Desarrollo web, diseño, marketing digital y contenido que trabajan juntos para que tu marca crezca en serio."

Corregir también el acento faltante en "tecnológicas".

---

### [AG-03] ~~Agregar FAQ de marketing digital y diseño~~ ✅ Done
`Must Have · Esfuerzo: 1pt · Valor: Alto`

Archivos: `src/components/FAQSection.tsx` + `src/components/FAQs.astro` (schema JSON-LD)

Pregunta a agregar:
> **¿También hacen diseño, marketing digital y contenido?**
> "Sí, y no son servicios secundarios. Un sitio impecable sin tráfico ni identidad visual consistente no convierte. Ofrecemos diseño web y brandbook, estrategia de contenido, gestión de redes y campañas pagadas — todo conectado al mismo objetivo: que tu marca crezca."

---

### [AG-04] ~~Corrección de acentos y errores tipográficos~~ ✅ Done
`Must Have · Esfuerzo: 1pt · Valor: Medio`

> **Nota:** Títulos en `font-heading` (Vanregis) no soportan caracteres acentuados — se mantienen sin acento intencionalmente.

| Archivo | Corrección | Estado |
|---|---|---|
| `src/components/Manifesto.astro` | `"código"` | ✅ |
| `src/components/Contact.astro` | `"cómo potenciar"` | ✅ |
| `src/components/Hero.astro` | Reemplazado en AG-02 | ✅ |
| `src/components/Methodology.astro` | Vanregis — sin acento | ⚠️ Intencional |
| `src/components/Projects.astro` | Vanregis — sin acento | ⚠️ Intencional |

---

## Should Have

### [AG-05] ~~Actualizar descripciones de pasos en Methodology~~ ✅ Done
`Should Have · Esfuerzo: 2pts · Valor: Medio`

Archivo: `src/components/Methodology.astro`

| Paso | Actual | Propuesto |
|---|---|---|
| Inmersión | "Nos sumergimos en tus sueños..." | "Entendemos tu negocio, tu mercado y tu audiencia antes de escribir código, diseñar o publicar contenido." |
| Definición | "Brindamos soluciones a medida..." | "Definimos alcance, canales y métricas. Sin paquetes genéricos: solo lo que tu proyecto necesita." |
| Creación | "Te hacemos parte del proceso, desarrollando el apartado visual y tu MVP." | "Construimos en iteraciones cortas: diseño, desarrollo y contenido moviéndose al mismo tiempo." |
| Despegue | "Lanzamos al mercado y te acompañamos continuamente, durante todo este proceso." | "Lanzamos, medimos y ajustamos. El trabajo no termina con la entrega — te acompañamos mientras creces." |

---

### [AG-06] ~~Actualizar label del AuthorityBanner~~ ✅ Done
`Should Have · Esfuerzo: 1pt · Valor: Bajo`

Archivo: `src/components/AuthorityBanner.astro`

Actual: `"Ideas transformadas"`
Propuesto: `"Marcas que ya crecen con nosotros"`

---

### [AG-07] ~~Actualizar descripción de Projects~~ ✅ Done
`Should Have · Esfuerzo: 1pt · Valor: Bajo`

Archivo: `src/components/Projects.astro`

Actual:
> "Cada proyecto es una historia de colaboración, innovación y obsesión por el detalle."

Propuesto:
> "Resultados reales para marcas que se atrevieron a hacer las cosas diferente."

---

### [AG-08] ~~Actualizar copy de Contact~~ ✅ Done
`Should Have · Esfuerzo: 1pt · Valor: Medio`

Archivo: `src/components/Contact.astro`

Actual:
> "Únete a nuestro colectivo disruptivo y hablemos de como potenciar tu proyecto con tecnología y diseño de vanguardia."

Propuesto:
> "Cuéntanos qué quieres construir. Nosotros te decimos cómo hacerlo realidad — con desarrollo, diseño, marketing o todo junto."

---

## Could Have

### [AG-09] ~~Agregar proyecto de tipo Diseño o Marketing al portafolio~~ ✅ Done
`Could Have · Esfuerzo: 3pts · Valor: Medio`

Archivo: `src/data/projects.ts`

Los 4 proyectos actuales son de desarrollo/plataforma. Para validar visualmente los servicios de diseño y marketing, agregar o reclasificar un proyecto con `category: "Identidad de Marca"` o `category: "Marketing Digital"`.

Requiere: definir el proyecto, conseguir imagen, redactar el caso (challenge / solution / results).

---

### [AG-10] ~~Agregar enlace "Servicios" al Navbar~~ ✅ Done
`Could Have · Esfuerzo: 1pt · Valor: Medio`

Archivos: `src/components/Navbar.astro` + `src/components/MobileMenu.tsx`

Depende de **AG-01**. Una vez creada la sección `#servicios`, agregar el enlace de navegación.

---

## Won't Have (este ciclo)

- Rediseño de estructura de página
- Blog o sección de contenido propio
- Páginas individuales por servicio
- Testimoniales o reseñas de clientes

---

## Orden de implementación sugerido

```
AG-04  →  AG-02  →  AG-03  →  AG-01
(fixes)   (hero)    (faq)     (nueva sección)
   ↓
AG-05  →  AG-06  →  AG-07  →  AG-08  →  AG-10
(method)  (banner)  (projects) (contact)  (navbar)
```

`AG-09` es independiente y puede ejecutarse en paralelo cuando haya material del proyecto.
