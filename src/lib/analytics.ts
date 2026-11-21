declare global {
	interface Window {
		gtag?: (...args: unknown[]) => void;
	}
}

/** Envía un evento a GA4. No hace nada si gtag no cargó (bloqueadores, SSR). */
export function trackEvent(name: string, params: Record<string, unknown> = {}) {
	if (typeof window === "undefined" || typeof window.gtag !== "function") return;
	window.gtag("event", name, params);
}
