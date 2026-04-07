import { type FormEvent, useState } from "react";

declare global {
	interface Window {
		grecaptcha: {
			ready: (cb: () => void) => void;
			execute: (siteKey: string, options: { action: string }) => Promise<string>;
		};
	}
}

const RECAPTCHA_SITE_KEY = import.meta.env.PUBLIC_RECAPTCHA_SITE_KEY;

type FormStatus = "idle" | "sending" | "success" | "error";

export default function ContactForm() {
	const [status, setStatus] = useState<FormStatus>("idle");
	const [errorMsg, setErrorMsg] = useState("");

	async function handleSubmit(e: FormEvent<HTMLFormElement>) {
		e.preventDefault();
		setStatus("sending");
		setErrorMsg("");

		const form = e.currentTarget;
		const formData = new FormData(form);

		try {
			const captchaToken = await new Promise<string>((resolve, reject) => {
				window.grecaptcha.ready(() => {
					window.grecaptcha
						.execute(RECAPTCHA_SITE_KEY, { action: "contact" })
						.then(resolve)
						.catch(reject);
				});
			});

			const response = await fetch("/.netlify/functions/send-email", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					name: formData.get("name"),
					email: formData.get("email"),
					message: formData.get("message"),
					captchaToken,
				}),
			});

			const data = await response.json();

			if (!response.ok) {
				throw new Error(data.error || "Error al enviar el mensaje");
			}

			setStatus("success");
			form.reset();
		} catch (err) {
			setStatus("error");
			setErrorMsg(err instanceof Error ? err.message : "Error inesperado. Intenta de nuevo.");
		}
	}

	if (status === "success") {
		return (
			<div className="rounded-2xl border border-neon/20 bg-neon/5 p-10 text-center">
				<div className="mx-auto mb-4 flex size-16 items-center justify-center rounded-full bg-neon/10">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						className="size-8 text-neon"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
						strokeWidth={2}
						role="img"
						aria-label="Mensaje enviado exitosamente"
					>
						<title>Enviado</title>
						<path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
					</svg>
				</div>
				<h3 className="mb-2 text-xl font-bold text-text">Mensaje enviado</h3>
				<p className="text-muted">Te contactaremos pronto. Gracias por confiar en Avantgardev.</p>
				<button
					type="button"
					onClick={() => setStatus("idle")}
					className="mt-6 text-sm font-medium text-primary transition-colors hover:text-primary-hover"
				>
					Enviar otro mensaje
				</button>
			</div>
		);
	}

	return (
		<form onSubmit={handleSubmit} className="space-y-6">
			<div>
				<label htmlFor="name" className="mb-2 block text-sm font-medium text-text">
					Nombre
				</label>
				<input
					type="text"
					id="name"
					name="name"
					required
					placeholder="Tu nombre"
					className="w-full rounded-lg border border-border/60 bg-bg px-4 py-3 text-sm text-text placeholder:text-disabled transition-colors focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary/50"
				/>
			</div>

			<div>
				<label htmlFor="email" className="mb-2 block text-sm font-medium text-text">
					Email
				</label>
				<input
					type="email"
					id="email"
					name="email"
					required
					placeholder="tu@email.com"
					className="w-full rounded-lg border border-border/60 bg-bg px-4 py-3 text-sm text-text placeholder:text-disabled transition-colors focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary/50"
				/>
			</div>

			<div>
				<label htmlFor="message" className="mb-2 block text-sm font-medium text-text">
					¿Que sueno vamos a construir?
				</label>
				<textarea
					id="message"
					name="message"
					required
					rows={5}
					placeholder="Cuentanos sobre tu proyecto, tu vision y lo que necesitas..."
					className="w-full resize-none rounded-lg border border-border/60 bg-bg px-4 py-3 text-sm text-text placeholder:text-disabled transition-colors focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary/50"
				/>
			</div>

			{status === "error" && (
				<div className="rounded-lg border border-danger/30 bg-danger-muted px-4 py-3 text-sm text-danger">
					{errorMsg}
				</div>
			)}

			<button
				type="submit"
				disabled={status === "sending"}
				className="group w-full rounded-lg bg-neon px-8 py-4 text-sm font-bold tracking-widest text-bg uppercase transition-all hover:shadow-glow-neon active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed"
			>
				{status === "sending" ? "Enviando..." : "Iniciar la transformacion"}
			</button>

			<p className="text-center text-2xs text-disabled">
				Protegido por reCAPTCHA de Google.{" "}
				<a
					href="https://policies.google.com/privacy"
					target="_blank"
					rel="noopener noreferrer"
					className="underline hover:text-muted"
				>
					Privacidad
				</a>{" "}
				y{" "}
				<a
					href="https://policies.google.com/terms"
					target="_blank"
					rel="noopener noreferrer"
					className="underline hover:text-muted"
				>
					Terminos
				</a>
				.
			</p>
		</form>
	);
}
