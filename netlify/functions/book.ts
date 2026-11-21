import type { Context } from "@netlify/functions";
import { bookingConfig } from "../../src/data/booking";
import { listOpenSlots, slotRange } from "../../src/lib/slots";
import { calendarConfigured, calendarId, fetchBusy, getCalendar, meetLinkFromEvent } from "./lib/google";

interface RecaptchaResponse {
	success: boolean;
	score?: number;
	action?: string;
	hostname?: string;
	"error-codes"?: string[];
}

const CORS_HEADERS = {
	"Access-Control-Allow-Origin": "*",
	"Access-Control-Allow-Headers": "Content-Type",
	"Access-Control-Allow-Methods": "POST, OPTIONS",
};

function json(body: unknown, status: number) {
	return new Response(JSON.stringify(body), {
		status,
		headers: { ...CORS_HEADERS, "Content-Type": "application/json" },
	});
}

async function verifyCaptcha(token: string): Promise<boolean> {
	const secret = process.env.RECAPTCHA_SECRET_KEY;
	if (!secret) throw new Error("RECAPTCHA_SECRET_KEY not configured");

	const response = await fetch("https://www.google.com/recaptcha/api/siteverify", {
		method: "POST",
		headers: { "Content-Type": "application/x-www-form-urlencoded" },
		body: new URLSearchParams({ secret, response: token }),
	});

	const data = (await response.json()) as RecaptchaResponse;
	const passed = data.success && (data.score ?? 0) >= 0.5 && data.action === "book";
	if (!passed) {
		console.error("reCAPTCHA rechazado", {
			success: data.success,
			score: data.score,
			action: data.action,
			hostname: data.hostname,
			errors: data["error-codes"],
		});
	}
	return passed;
}

function readPayload(body: unknown): {
	name: string;
	email: string;
	phone: string;
	note: string;
	start: string;
	captchaToken: string;
} {
	const data = body as Record<string, unknown>;
	const name = typeof data.name === "string" ? data.name.trim() : "";
	const email = typeof data.email === "string" ? data.email.trim() : "";
	const phone = typeof data.phone === "string" ? data.phone.trim() : "";
	const note = typeof data.note === "string" ? data.note.trim() : "";
	const start = typeof data.start === "string" ? data.start.trim() : "";
	const captchaToken = typeof data.captchaToken === "string" ? data.captchaToken.trim() : "";

	if (!name || !email || !start || !captchaToken) {
		throw new Error("Todos los campos son obligatorios");
	}

	if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
		throw new Error("Email invalido");
	}

	if (name.length > 200 || email.length > 254 || note.length > 2000) {
		throw new Error("Uno o mas campos exceden el limite de caracteres");
	}

	if (phone && !/^\+\d{8,15}$/.test(phone)) {
		throw new Error("Telefono invalido");
	}

	if (Number.isNaN(Date.parse(start))) {
		throw new Error("Horario invalido");
	}

	return { name, email, phone, note, start, captchaToken };
}

export default async (req: Request, _context: Context) => {
	if (req.method === "OPTIONS") {
		return new Response(null, { status: 204, headers: CORS_HEADERS });
	}

	if (req.method !== "POST") {
		return json({ error: "Metodo no permitido" }, 405);
	}

	if (!calendarConfigured()) {
		return json({ error: "Agenda no configurada" }, 503);
	}

	try {
		const body = await req.json();
		const { name, email, phone, note, start, captchaToken } = readPayload(body);

		const isHuman = await verifyCaptcha(captchaToken);
		if (!isHuman) {
			return json({ error: "Verificacion de captcha fallida" }, 403);
		}

		const { timeMin, timeMax } = slotRange();
		const busy = await fetchBusy(timeMin, timeMax);
		const slots = listOpenSlots(busy);
		const match = slots.find((slot) => Date.parse(slot) === Date.parse(start));
		if (!match) {
			return json({ error: "Ese horario ya no esta disponible" }, 409);
		}

		const startDate = new Date(match);
		const endDate = new Date(startDate.getTime() + bookingConfig.slotMinutes * 60 * 1000);
		const description = [
			"Llamada de 30 minutos agendada desde avantgardev.com.mx/agenda.",
			phone ? `\nTeléfono: ${phone}` : "",
			note ? `\nNota:\n${note}` : "",
		].join("");

		const calendar = await getCalendar();
		const created = await calendar.events.insert({
			calendarId: calendarId(),
			conferenceDataVersion: 1,
			sendUpdates: "all",
			requestBody: {
				summary: `Llamada Avantgardev — ${name}`,
				description,
				start: { dateTime: startDate.toISOString(), timeZone: bookingConfig.timezone },
				end: { dateTime: endDate.toISOString(), timeZone: bookingConfig.timezone },
				attendees: [{ email }],
				conferenceData: {
					createRequest: {
						requestId: crypto.randomUUID(),
						conferenceSolutionKey: { type: "hangoutsMeet" },
					},
				},
			},
		});

		const meetLink = created.data ? meetLinkFromEvent(created.data) : null;

		return json(
			{
				success: true,
				start: match,
				meetLink,
			},
			200,
		);
	} catch (error) {
		const message = error instanceof Error ? error.message : "No se pudo crear la cita";
		const status = message === "Todos los campos son obligatorios" || message === "Email invalido" || message === "Horario invalido" || message === "Telefono invalido" || message.includes("limite") ? 400 : 500;
		return json({ error: message }, status);
	}
};
