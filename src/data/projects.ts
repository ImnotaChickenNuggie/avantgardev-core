import type { ImageMetadata } from "astro";
import dashboardSentiment from "../assets/dashboard_sentiment.webp";
import dashboard2Sentiment from "../assets/dashboard2_sentiment.webp";
import infoAmanal from "../assets/info_amanal.webp";
import landingAmanal from "../assets/landing_amanal.webp";
import landingSentiment from "../assets/landing_sentiment.webp";
import ubicacionAmanal from "../assets/ubicacion_amanal.webp";
import vazza from "../assets/vazza.webp";
import vazzaDashboard from "../assets/vazza_dashboard.webp";
import vazzaTickets from "../assets/vazza_tickets.webp";

export interface Project {
	slug: string;
	title: string;
	category: string;
	description: string;
	longDescription: string;
	tags: string[];
	accent: "neon" | "primary";
	image: string;
	images?: ImageMetadata[];
	featured: boolean;
	challenge: string;
	solution: string;
	results: string[];
	year: string;
	client: string;
	url?: string;
	links?: { href: string; label: string }[];
	/** Título SEO (≤60 caracteres). Si falta se usa `${title} — Avantgardev`. */
	seoTitle?: string;
	/** Subtítulo bajo el H1 con la palabra clave del caso. */
	subtitle?: string;
	/** Texto alternativo por captura, en el mismo orden que `images`. */
	alts?: string[];
	/** Secciones extra del caso de estudio (H2 + párrafo). */
	sections?: {
		title: string;
		body: string;
		icon?: "credit" | "bag" | "clock" | "phone" | "cash";
	}[];
	/** Pasos del flujo ("Cómo funciona"), con nota opcional al final. */
	steps?: { title: string; body: string }[];
	stepsNote?: string;
	/** Pie de foto por captura, mismo orden que `images`. */
	captions?: string[];
	/** Datos clave en chips, bajo el hero. */
	highlights?: { value: string; label: string }[];
}

export const projects: Project[] = [
	{
		slug: "vazza",
		title: "Vazza",
		category: "Fintech / PWA",
		seoTitle: "Vazza: app de crédito personal y PWA | Avantgardev",
		subtitle: "App de crédito personal para zapaterías, instalable como PWA",
		description:
			"Desarrollo de PWA fintech para Vazza: crédito personal, compras a meses sin intereses, historial de pagos y cobros con NetPay en OXXO.",
		longDescription:
			"Una PWA donde los clientes de Vazza consultan su crédito personal, compran a meses sin intereses y pagan sus mensualidades desde el teléfono.",
		tags: ["React", "Vite", "PWA", "Django", "NetPay"],
		accent: "neon",
		image: vazza.src,
		images: [vazza, vazzaDashboard, vazzaTickets],
		alts: [
			"Pantalla de inicio de sesión de la app de crédito Vazza con teléfono y contraseña",
			"Panel principal de la app Vazza con crédito personal, crédito Vazza, movimientos y tarjeta digital",
			"Historial de movimientos y pagos de la app Vazza con folios y estatus de cada pago",
		],
		featured: true,
		challenge:
			"Vazza quería darle a sus clientes un canal propio para administrar su crédito: ver su línea, comprar en cualquier sucursal y pagar sin cuenta bancaria. Debía funcionar en teléfonos de gama media y sin pasar por una tienda de apps.",
		solution:
			"Una PWA en React y Vite que se instala desde el navegador, con un backend en Django que consulta el Buró de Crédito para valuar cada línea. Los pagos se generan con NetPay para liquidarse en OXXO.",
		highlights: [
			{ value: "PWA", label: "Se instala en el teléfono" },
			{ value: "100%", label: "De los usuarios con crédito" },
			{ value: "OXXO", label: "Pagos en efectivo con NetPay" },
		],
		captions: [
			"Acceso con número de teléfono",
			"Panel con créditos, movimientos y tarjeta digital",
			"Historial de movimientos y pagos con folio y estatus",
		],
		sections: [
			{
				icon: "credit",
				title: "Crédito para todos los usuarios",
				body: "Consulta directa al Buró de Crédito para valuar el monto. Válido en todas las sucursales Vazza.",
			},
			{
				icon: "bag",
				title: "Meses sin intereses",
				body: "Zapatos, tenis y más a meses sin intereses, con promociones exclusivas en la app.",
			},
			{
				icon: "clock",
				title: "Historial de compras y pagos",
				body: "Cada movimiento con fecha, importe, folio y estatus (en proceso, aplicado o devuelto).",
			},
			{
				icon: "phone",
				title: "PWA instalable",
				body: "Se agrega a la pantalla de inicio y se abre como app, sin tienda de aplicaciones.",
			},
			{
				icon: "cash",
				title: "Pagos con NetPay en OXXO",
				body: "Referencias de pago para liquidar en efectivo, aunque no tengas tarjeta.",
			},
		],
		results: [
			"Crédito personal único, válido en todas las tiendas y sucursales Vazza",
			"App instalable en el teléfono, sin descargas desde tiendas de aplicaciones",
			"Pago de mensualidades en efectivo en OXXO con NetPay e historial consultable",
		],
		steps: [
			{
				title: "Valuamos tu crédito",
				body: "Al registrarte se consulta el Buró de Crédito y se define el monto que se te otorga.",
			},
			{
				title: "Compras a meses",
				body: "Usas tu crédito en cualquier tienda o sucursal Vazza, a meses sin intereses.",
			},
			{
				title: "Pagas en OXXO",
				body: "NetPay genera la referencia y pagas en efectivo, sin necesitar tarjeta.",
			},
			{
				title: "Consultas todo",
				body: "Cada compra y cada pago queda en tu historial, con folio y estatus.",
			},
		],
		stepsNote:
			"Se eligió una PWA para llegar a más clientes con un solo desarrollo: carga rápida, actualizaciones automáticas y sin pasar por una tienda de aplicaciones.",
		year: "2025",
		client: "Vazza",
		links: [
			{ href: "https://clientescreditocm.com/", label: "Portal de clientes" },
			{ href: "https://vazza.com.mx/pages/mi-credito-vazza", label: "Mi crédito Vazza" },
		],
	},
	{
		slug: "capital-humano",
		title: "Capital Humano",
		category: "Plataforma Web",
		description: "Sistema integral de gestión de talento con dashboards analíticos en tiempo real.",
		longDescription:
			"Construimos una plataforma integral de recursos humanos que centraliza la gestión de talento, nómina y análisis de desempeño. Los dashboards en tiempo real permiten tomar decisiones informadas al instante.",
		tags: ["React", "Node.js", "PostgreSQL"],
		accent: "primary",
		image: "/projects/capital-humano.webp",
		featured: false,
		challenge:
			"La empresa gestionaba su talento con hojas de cálculo dispersas, generando errores y pérdida de información crítica en procesos de nómina y evaluación.",
		solution:
			"Desarrollamos una plataforma centralizada con módulos de reclutamiento, onboarding, evaluación de desempeño y reportes automatizados con visualizaciones interactivas.",
		results: [
			"Reducción del 70% en tiempo de procesos administrativos",
			"Cero errores en cálculo de nómina",
			"Adopción del 100% del equipo en menos de 2 semanas",
		],
		year: "2025",
		client: "Capital Humano",
	},
	{
		slug: "magnapelle",
		title: "Magnapelle",
		category: "Sitio Corporativo",
		description:
			"Sitio web con enfoque en storytelling visual y animaciones cinematográficas para marca premium.",
		longDescription:
			"Creamos un sitio corporativo que eleva la presencia digital de Magnapelle a través de storytelling visual cinematográfico. Cada sección fue diseñada como un capítulo narrativo que comunica los valores y la calidad de la marca.",
		tags: ["Astro", "GSAP", "Three.js"],
		accent: "neon",
		image: "/projects/magnapelle.webp",
		featured: false,
		challenge:
			"Magnapelle necesitaba un sitio que comunicara su posicionamiento premium y se diferenciara radicalmente de la competencia en su industria.",
		solution:
			"Diseñamos una experiencia web cinematográfica con scroll narrativo, escenas 3D interactivas y animaciones orquestadas que guían al usuario a través de la historia de la marca.",
		results: [
			"Tiempo promedio en sitio de 4.5 minutos",
			"Incremento del 85% en solicitudes de contacto",
			"Reconocimiento en Awwwards como Site of the Day",
		],
		year: "2024",
		client: "Magnapelle",
	},
	{
		slug: "amanal",
		title: "Amanal",
		category: "Landing Page",
		description:
			"Landing de alto impacto con micro-interacciones y scroll narrativo para lanzamiento de producto.",
		longDescription:
			"Diseñamos una landing page de lanzamiento para Amanal que combina micro-interacciones sofisticadas con un scroll narrativo que revela progresivamente las características del producto, generando anticipación y deseo.",
		tags: ["Astro", "Tailwind CSS", "Lenis"],
		accent: "primary",
		image: landingAmanal.src,
		images: [landingAmanal, infoAmanal, ubicacionAmanal],
		featured: true,
		challenge:
			"Amanal lanzaba un nuevo producto al mercado y necesitaba una presencia digital que generara impacto inmediato y capturara leads cualificados desde el primer día.",
		solution:
			"Creamos una landing con scroll narrativo que revela el producto gradualmente, micro-interacciones que responden al cursor, y un formulario de registro con incentivos gamificados.",
		results: [
			"3,200 registros en la primera semana",
			"Tasa de scroll completo del 72%",
			"Costo por lead 45% menor al proyectado",
		],
		year: "2025",
		client: "Amanal",
		url: "https://amanal.netlify.app/",
	},
	{
		slug: "sentiment-unicornio",
		title: "Sentiment Unicornio",
		category: "Social listening",
		description:
			"Plataforma que identifica cambios, narrativas, percepción, actores, riesgos y oportunidades en la conversación.",
		longDescription:
			"Unicornio reúne menciones, tono y señales editoriales en un tablero para ver qué está ocurriendo y qué merece atención.",
		tags: ["Social listening", "Dashboard", "Analítica"],
		accent: "neon",
		image: landingSentiment.src,
		images: [landingSentiment, dashboardSentiment, dashboard2Sentiment],
		featured: true,
		challenge:
			"Hacía falta un lugar donde leer el volumen, el tono y las menciones editoriales de una marca sin saltar entre fuentes.",
		solution:
			"Un tablero de escucha social con menciones, sentimiento y las publicaciones que concentran la conversación.",
		results: [],
		year: "2026",
		client: "Unicornio",
		url: "https://sociallisteningunicornio.com/",
	},
];
