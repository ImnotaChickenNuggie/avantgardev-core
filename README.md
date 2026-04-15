<p align="center">
  <img src="public/logo.png" alt="Avantgardev" width="120" />
</p>

<h1 align="center">Avantgardev</h1>

<p align="center">
  <strong>Desarrollo web con visión de vanguardia</strong>
</p>

<p align="center">
  <a href="https://avantgardev.com.mx">avantgardev.com.mx</a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Astro-6.1-BC52EE?logo=astro&logoColor=white" alt="Astro" />
  <img src="https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white" alt="React" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss&logoColor=white" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/Three.js-0.167-000000?logo=threedotjs&logoColor=white" alt="Three.js" />
  <img src="https://img.shields.io/badge/Node-%3E%3D22.12-339933?logo=nodedotjs&logoColor=white" alt="Node" />
</p>

---

## Sobre el proyecto

Sitio web oficial de **Avantgardev** — construido con Astro, React y Tailwind CSS. Incluye animaciones con GSAP, escenas 3D con Three.js y scroll suave con Lenis.

## Tech Stack

| Categoría | Tecnologías |
|:--|:--|
| **Framework** | [Astro](https://astro.build) v6 + [React](https://react.dev) v19 |
| **Estilos** | [Tailwind CSS](https://tailwindcss.com) v4, [tw-animate-css](https://github.com/Wombosvideo/tw-animate-css) |
| **UI** | [shadcn/ui](https://ui.shadcn.com), [Base UI](https://base-ui.com), [Lucide Icons](https://lucide.dev), [CVA](https://cva.style) |
| **Animaciones** | [GSAP](https://gsap.com), [Lenis](https://lenis.darkroom.engineering) |
| **3D** | [Three.js](https://threejs.org) |
| **Email** | [Resend](https://resend.com) |
| **Calidad de código** | [Biome](https://biomejs.dev), [Husky](https://typicode.github.io/husky), [lint-staged](https://github.com/lint-staged/lint-staged), [Commitlint](https://commitlint.js.org) |

## Requisitos previos

- **Node.js** >= 22.12.0
- **npm** (incluido con Node)

## Instalación

```bash
# Clonar el repositorio
git clone https://github.com/tu-usuario/avantgardev.git
cd avantgardev

# Instalar dependencias
npm install
```

## Variables de entorno

Crea un archivo `.env` en la raíz del proyecto con las variables necesarias:

```env
# Resend (servicio de email)
RESEND_API_KEY=tu_api_key
```

## Comandos

| Comando | Descripción |
|:--|:--|
| `npm run dev` | Inicia el servidor de desarrollo en `localhost:4321` |
| `npm run build` | Genera el sitio para producción en `./dist/` |
| `npm run preview` | Previsualiza el build localmente |
| `npm run lint` | Ejecuta Biome para verificar el código |
| `npm run lint:fix` | Corrige problemas de lint automáticamente |
| `npm run format` | Formatea el código con Biome |

## Estructura del proyecto

```
avantgardev/
├── public/              # Archivos estáticos (favicon, logo, og-image)
├── src/
│   ├── assets/          # Assets procesados por Astro
│   ├── components/      # Componentes Astro y React
│   │   └── ui/          # Componentes de UI reutilizables (shadcn)
│   ├── layouts/         # Layout principal
│   ├── lib/             # Utilidades y helpers
│   ├── pages/           # Rutas del sitio
│   └── styles/          # Estilos globales
├── astro.config.mjs     # Configuración de Astro
├── biome.json           # Configuración de Biome
├── tailwind.config.*    # Configuración de Tailwind
└── package.json
```

## Git Hooks

El proyecto utiliza **Husky** con **lint-staged** para mantener la calidad del código:

- **Pre-commit**: ejecuta Biome sobre los archivos staged (`.js`, `.jsx`, `.ts`, `.tsx`, `.astro`, `.json`, `.css`)
- **Commit message**: valida el formato con Commitlint ([Conventional Commits](https://www.conventionalcommits.org))

Formato de commits:

```
tipo(scope): descripción

# Ejemplos
feat(hero): agregar animación de entrada con GSAP
fix(contact): corregir validación del formulario
style(navbar): ajustar espaciado en mobile
```

## Licencia

Todos los derechos reservados &copy; Avantgardev.
