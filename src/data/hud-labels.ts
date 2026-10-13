/**
 * Etiquetas del lenguaje HUD (español es-MX).
 * Centralizadas aquí para traducirlas a inglés más adelante sin tocar los componentes.
 * Son datos o medidas de instrumento (índices, estados, coordenadas), nunca títulos.
 */
export const hudSections = {
	servicios: { index: "01", label: "SERVICIOS" },
	manifiesto: { index: "02", label: "MANIFIESTO" },
	metodologia: { index: "03", label: "METODOLOGÍA" },
	proyectos: { index: "04", label: "PROYECTOS" },
	faqs: { index: "05", label: "PREGUNTAS" },
	contacto: { index: "06", label: "CONTACTO" },
} as const;

export type HudSectionKey = keyof typeof hudSections;

/** Formato de índice: `[01 // SERVICIOS]` */
export const hudIndexLabel = (key: HudSectionKey) => {
	const { index, label } = hudSections[key];
	return `[${index} // ${label}]`;
};

export const hudStatus = {
	online: "SISTEMA EN LÍNEA",
	scanning: "ESCANEANDO",
	signal: "SEÑAL ESTABLE",
	location: "MÉXICO",
	available: "DISPONIBLE",
	sending: "TRANSMITIENDO",
	sent: "MENSAJE ENVIADO",
	error: "FALLA DE ENLACE",
} as const;

export const hudMeta = {
	year: "AÑO",
	client: "CLIENTE",
	category: "CATEGORÍA",
	stack: "STACK",
	result: "RESULTADO",
} as const;
