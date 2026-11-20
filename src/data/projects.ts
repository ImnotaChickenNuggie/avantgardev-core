import type { ImageMetadata } from "astro";
import dashboardSentiment from "../assets/dashboard_sentiment.png";
import dashboard2Sentiment from "../assets/dashboard2_sentiment.png";
import infoAmanal from "../assets/info_amanal.png";
import landingAmanal from "../assets/landing_amanal.png";
import landingSentiment from "../assets/landing_sentiment.png";
import ubicacionAmanal from "../assets/ubicacion_amanal.png";
import vazza from "../assets/vazza.png";
import vazzaDashboard from "../assets/vazza_dashboard.png";
import vazzaTickets from "../assets/vazza_tickets.png";

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
}

export const projects: Project[] = [
	{
		slug: "vazza",
		title: "Vazza",
		category: "E-commerce",
		description:
			"Plataforma de comercio electrónico con experiencia inmersiva de producto y checkout optimizado para conversión.",
		longDescription:
			"Diseñamos y desarrollamos una plataforma e-commerce completa para Vazza, enfocada en ofrecer una experiencia de compra premium. Cada detalle del flujo de usuario fue optimizado para maximizar conversiones sin sacrificar la estética de marca.",
		tags: ["Next.js", "Stripe", "Tailwind CSS"],
		accent: "neon",
		image: vazza.src,
		images: [vazza, vazzaDashboard, vazzaTickets],
		featured: true,
		challenge:
			"Vazza necesitaba una plataforma que reflejara la calidad premium de sus productos con un checkout rápido y sin fricciones, manteniendo una experiencia visual inmersiva.",
		solution:
			"Implementamos un catálogo con renderizado 3D de productos, un sistema de carrito optimista y un flujo de checkout en un solo paso integrado con Stripe para pagos seguros.",
		results: [
			"Incremento del 40% en tasa de conversión",
			"Reducción del 60% en tiempo de carga",
			"Experiencia móvil calificada 95/100 en Lighthouse",
		],
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
