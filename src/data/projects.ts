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
		icon?:
			| "credit"
			| "bag"
			| "clock"
			| "phone"
			| "cash"
			| "sparkles"
			| "pin"
			| "ticket"
			| "users"
			| "code";
	}[];
	/** Efecto MacBook con scroll: título y captura (índice en `images`). */
	showcase?: { title: string; image: number };
	/** Pasos del flujo ("Cómo funciona"), con nota opcional al final. */
	steps?: { title: string; body: string }[];
	/** Títulos de sección personalizados (por defecto: "Qué hace la plataforma", "Cómo funciona", "Impacto real"). */
	sectionsTitle?: string;
	stepsTitle?: string;
	resultsTitle?: string;
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
		showcase: { title: "Tu crédito, en tu teléfono y en tu bolsillo", image: 1 },
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
		category: "Landing Page / Proyecto propio",
		seoTitle: "Amanal: landing de hackathon con animaciones | Avantgardev",
		subtitle: "Landing de hackathon con scroll narrativo, mapa y animaciones",
		description:
			"Landing de hackathon con scroll narrativo, animaciones con GSAP y mapa de la sede. Proyecto propio de Avantgardev.",
		longDescription:
			"Un concepto interno: la landing de un hackathon ficticio sobre resiliencia en Chapultepec, creada por el equipo de Avantgardev para probar cómo trabajamos juntos.",
		tags: ["Astro", "Tailwind CSS", "Lenis", "GSAP"],
		accent: "primary",
		image: landingAmanal.src,
		images: [landingAmanal, infoAmanal, ubicacionAmanal],
		alts: [
			"Página de inicio de la landing Amanal con título, fecha, sede y dotación del hackathon",
			"Página del track El Gran Acueducto con contexto, stack sugerido, desafíos y entregable",
			"Sección Sede de Amanal con mapa oscuro del Complejo Cultural de Los Pinos",
		],
		captions: [
			"Inicio con título, sede, cronograma y dotación",
			"Detalle de un track con contexto, desafíos y entregable",
			"Sede con mapa interactivo",
		],
		featured: true,
		challenge:
			"Queríamos probar qué puede lograr un equipo bien coordinado con las herramientas adecuadas: diseño, contenido, desarrollo y animación trabajando en paralelo sobre una misma landing.",
		solution:
			"Una landing completa con scroll narrativo, tracks, sede con mapa y pase de registro, construida entre todo el equipo con aprobaciones e iteraciones en cada etapa.",
		showcase: { title: "Una landing con carácter propio", image: 0 },
		highlights: [
			{ value: "Propio", label: "Proyecto interno de Avantgardev" },
			{ value: "Equipo", label: "Diseño, contenido y desarrollo en paralelo" },
			{ value: "GSAP", label: "Animaciones y scroll narrativo" },
		],
		sectionsTitle: "Qué incluye",
		sections: [
			{
				icon: "sparkles",
				title: "Animaciones y scroll",
				body: "Scroll suave con Lenis y animaciones con GSAP que guían la lectura.",
			},
			{
				icon: "users",
				title: "Tracks del hackathon",
				body: "Cada track con contexto, stack sugerido, desafíos y entregable.",
			},
			{
				icon: "pin",
				title: "Sede con mapa",
				body: "Mapa interactivo con los puntos de activación del evento.",
			},
			{
				icon: "ticket",
				title: "Registro y pase",
				body: "Llamadas a registrarse y sección de pase para participantes.",
			},
			{
				icon: "code",
				title: "Sitio estático rápido",
				body: "Astro y Tailwind CSS para cargar rápido y mantener el código simple.",
			},
		],
		stepsTitle: "Cómo se hizo",
		steps: [
			{
				title: "Brief y concepto",
				body: "Definimos el hackathon, su narrativa y las secciones de la landing.",
			},
			{
				title: "Diseño y contenido",
				body: "Identidad visual, textos y estructura de tracks, sede y pase.",
			},
			{
				title: "Desarrollo y animación",
				body: "Construcción con Astro, Tailwind, Lenis y GSAP en paralelo con el contenido.",
			},
			{
				title: "Aprobación e iteración",
				body: "Revisiones en conjunto hasta publicar la versión final.",
			},
		],
		stepsNote:
			"Todo el desarrollo, las animaciones y el contenido se completaron en unas 8 horas. Es una prueba interna del equipo, no el plazo de entrega de un proyecto de cliente: hubo aprobaciones e iteraciones en conjunto. Muestra lo que logra un equipo bien coordinado con las herramientas adecuadas.",
		resultsTitle: "Lo que demuestra",
		results: [
			"Landing completa con animaciones, contenido y mapa, publicada y funcional",
			"Flujo de trabajo en equipo validado entre diseño, contenido y desarrollo",
			"Base reutilizable para futuros lanzamientos y eventos",
		],
		year: "2026",
		client: "Avantgardev",
		url: "https://amanal.netlify.app/",
	},
	{
		slug: "sentiment-unicornio",
		title: "Sentiment Unicornio",
		category: "Social listening / SaaS",
		seoTitle: "Unicornio: plataforma de social listening | Avantgardev",
		subtitle: "Plataforma de social listening para entender menciones, sentimiento y narrativas",
		description:
			"Landing y dashboard de social listening en Next.js: menciones, sentimiento, alertas de crisis y narrativas de redes y noticias en un solo tablero.",
		longDescription:
			"Unicornio reúne redes sociales y medios en un tablero sencillo para que cualquier empresa entienda qué se dice de su marca y qué merece atención.",
		tags: ["Next.js", "Dashboard", "Analítica", "SEO"],
		accent: "neon",
		image: landingSentiment.src,
		images: [landingSentiment, dashboardSentiment, dashboard2Sentiment],
		alts: [
			"Landing de Unicornio con el lema Entender lo que cambia, identificar lo que importa y vista previa del dashboard de menciones",
			"Dashboard de Unicornio con proyectos activos, resumen con IA, sentimiento por proyecto y alertas de crisis",
			"Dashboard de Unicornio con audiencia por edad y género, mapa de regiones con mayor cuota de voz y menciones por región",
		],
		captions: [
			"Landing enfocada en equipos de marketing",
			"Panel de proyectos con sentimiento, alertas de crisis y resumen con IA",
			"Audiencia por edad, género y región",
		],
		featured: true,
		challenge:
			"La landing debía ser atractiva y clara para equipos de marketing. El verdadero reto fue el dashboard: un sistema integral de métricas para seguir redes sociales y canales de noticias, pero tan sencillo que cualquier empresa pudiera usarlo sin ser analista.",
		solution:
			"Una landing llamativa y un dashboard construidos en Next.js, con un tablero por proyecto que concentra menciones, sentimiento, alertas, narrativas y audiencia, y lo presenta de forma simple y accionable. Nos encargamos del frontend.",
		showcase: { title: "Toda la conversación, en un solo tablero", image: 1 },
		highlights: [
			{ value: "85%", label: "Mediciones más acertadas" },
			{ value: "73%", label: "Usuarios nuevos en el primer mes" },
			{ value: "Tiempo real", label: "Métricas y tendencias al momento" },
		],
		sections: [
			{
				icon: "chart",
				title: "Menciones y volumen",
				body: "Cuántas veces se habla de tu marca, en qué redes y medios, y cómo cambia con el tiempo.",
			},
			{
				icon: "face",
				title: "Sentimiento",
				body: "Qué porcentaje de la conversación es positivo, neutral o negativo, por proyecto.",
			},
			{
				icon: "bell",
				title: "Alertas de crisis",
				body: "Avisos cuando aumentan las menciones negativas, para reaccionar a tiempo.",
			},
			{
				icon: "users",
				title: "Audiencia y regiones",
				body: "Quién habla: edad, género y regiones con mayor cuota de voz.",
			},
			{
				icon: "sparkles",
				title: "Resumen con IA",
				body: "Un resumen automático de lo más importante de cada proyecto.",
			},
			{
				icon: "search",
				title: "Búsqueda y benchmarking",
				body: "Explora conversaciones y compara tu marca con otras.",
			},
		],
		steps: [
			{
				title: "Crea un proyecto",
				body: "Define qué monitorear: marca, persona o tema, con sus palabras clave.",
			},
			{
				title: "Conecta tus canales",
				body: "Redes sociales y canales de noticias en un mismo lugar.",
			},
			{
				title: "Analiza",
				body: "Sentimiento, narrativas y audiencia, con métricas y tendencias al momento.",
			},
			{
				title: "Actúa a tiempo",
				body: "Alertas y resúmenes te dicen qué merece atención.",
			},
		],
		stepsNote:
			"Se desarrolló en Next.js para mejorar el SEO de la landing y ofrecer un dashboard rápido. El foco fue la simplicidad: que cualquier empresa pueda leer sus métricas sin conocimientos técnicos.",
		results: [
			"Mediciones 85% más acertadas",
			"Verificación de métricas y tendencias al momento",
			"73% de usuarios nuevos en el primer mes de lanzamiento",
		],
		year: "2026",
		client: "Unicornio",
		url: "https://sociallisteningunicornio.com/",
	},
];
