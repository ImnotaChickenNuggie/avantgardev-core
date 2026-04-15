import type { Context } from "@netlify/functions";
import { Resend } from "resend";

interface ContactPayload {
	name: string;
	email: string;
	message: string;
	captchaToken: string;
}

interface RecaptchaResponse {
	success: boolean;
	score: number;
	action: string;
	"error-codes"?: string[];
}

const CORS_HEADERS = {
	"Access-Control-Allow-Origin": "*",
	"Access-Control-Allow-Headers": "Content-Type",
	"Access-Control-Allow-Methods": "POST, OPTIONS",
};

async function verifyCaptcha(token: string): Promise<boolean> {
	const secret = process.env.RECAPTCHA_SECRET_KEY;
	if (!secret) throw new Error("RECAPTCHA_SECRET_KEY not configured");

	const response = await fetch("https://www.google.com/recaptcha/api/siteverify", {
		method: "POST",
		headers: { "Content-Type": "application/x-www-form-urlencoded" },
		body: new URLSearchParams({ secret, response: token }),
	});

	const data = (await response.json()) as RecaptchaResponse;
	return data.success && data.score >= 0.5;
}

function validatePayload(body: unknown): ContactPayload {
	const data = body as Record<string, unknown>;

	const name = typeof data.name === "string" ? data.name.trim() : "";
	const email = typeof data.email === "string" ? data.email.trim() : "";
	const message = typeof data.message === "string" ? data.message.trim() : "";
	const captchaToken = typeof data.captchaToken === "string" ? data.captchaToken.trim() : "";

	if (!name || !email || !message || !captchaToken) {
		throw new Error("Todos los campos son obligatorios");
	}

	if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
		throw new Error("Email invalido");
	}

	if (name.length > 200 || email.length > 254 || message.length > 5000) {
		throw new Error("Uno o mas campos exceden el limite de caracteres");
	}

	return { name, email, message, captchaToken };
}

export default async (req: Request, _context: Context) => {
	if (req.method === "OPTIONS") {
		return new Response(null, { status: 204, headers: CORS_HEADERS });
	}

	if (req.method !== "POST") {
		return new Response(JSON.stringify({ error: "Metodo no permitido" }), {
			status: 405,
			headers: { ...CORS_HEADERS, "Content-Type": "application/json" },
		});
	}

	try {
		const body = await req.json();
		const { name, email, message, captchaToken } = validatePayload(body);

		const isHuman = await verifyCaptcha(captchaToken);
		if (!isHuman) {
			return new Response(JSON.stringify({ error: "Verificacion de captcha fallida" }), {
				status: 403,
				headers: { ...CORS_HEADERS, "Content-Type": "application/json" },
			});
		}

		const resendKey = process.env.RESEND_API_KEY;
		const contactEmail = process.env.CONTACT_EMAIL;
		if (!resendKey || !contactEmail) {
			throw new Error("Variables de entorno de email no configuradas");
		}

		const resend = new Resend(resendKey);

		await resend.emails.send({
			from: "Avantgardev <onboarding@resend.dev>",
			to: contactEmail,
			replyTo: email,
			subject: `Nuevo contacto: ${name}`,
			html: `
				<div style="font-family: 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto; background: #070711; color: #f7ebec; padding: 32px; border-radius: 12px;">
					<h1 style="color: #39ff14; font-size: 24px; margin-bottom: 24px; border-bottom: 1px solid #1f1f38; padding-bottom: 16px;">
						Nuevo mensaje de contacto
					</h1>
					<p style="margin-bottom: 8px;"><strong style="color: #7C3AED;">Nombre:</strong> ${name}</p>
					<p style="margin-bottom: 8px;"><strong style="color: #7C3AED;">Email:</strong> <a href="mailto:${email}" style="color: #39ff14;">${email}</a></p>
					<div style="margin-top: 24px; padding: 20px; background: #0e0e1c; border-radius: 8px; border-left: 3px solid #39ff14;">
						<p style="margin: 0; white-space: pre-wrap;">${message}</p>
					</div>
					<p style="margin-top: 32px; font-size: 12px; color: #9490a8;">
						Enviado desde el formulario de contacto de avantgardev.com.mx
					</p>
				</div>
			`,
		});

		return new Response(JSON.stringify({ success: true }), {
			status: 200,
			headers: { ...CORS_HEADERS, "Content-Type": "application/json" },
		});
	} catch (error) {
		const message = error instanceof Error ? error.message : "Error interno del servidor";
		return new Response(JSON.stringify({ error: message }), {
			status: 500,
			headers: { ...CORS_HEADERS, "Content-Type": "application/json" },
		});
	}
};
