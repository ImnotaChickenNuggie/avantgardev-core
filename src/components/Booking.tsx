import { type FormEvent, useEffect, useMemo, useState } from "react";
import { isValidPhoneNumber } from "react-phone-number-input";
import { bookingConfig } from "../data/booking";
import { trackEvent } from "../lib/analytics";
import { addDays, dateKeyInZone, todayInZone, weekdayOf, zonedTimeToUtc } from "../lib/time";
import { PhoneInput } from "./ui/phone-input";

declare global {
	interface Window {
		grecaptcha: {
			ready: (cb: () => void) => void;
			execute: (siteKey: string, options: { action: string }) => Promise<string>;
		};
	}
}

const RECAPTCHA_SITE_KEY = import.meta.env.PUBLIC_RECAPTCHA_SITE_KEY;
const WEEKDAY_INDEX = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];
const WEEKDAY_LABELS = ["L", "M", "X", "J", "V", "S", "D"];

type LoadStatus = "loading" | "ready" | "error";
type Step = 1 | 2 | 3;

const STEP_LABELS = ["Día", "Hora", "Tus datos"];
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

interface Availability {
	slots: string[];
}

const fieldClass =
	"w-full rounded-sm border border-line-strong bg-bg px-4 py-3 text-sm text-text placeholder:text-disabled transition-colors focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary/50";

function shiftMonth(month: string, delta: number): string {
	const [year, monthNumber] = month.split("-").map(Number);
	const next = new Date(Date.UTC(year, monthNumber - 1 + delta, 1));
	return `${next.getUTCFullYear()}-${String(next.getUTCMonth() + 1).padStart(2, "0")}`;
}

function daysInMonth(month: string): number {
	const [year, monthNumber] = month.split("-").map(Number);
	return new Date(Date.UTC(year, monthNumber, 0)).getUTCDate();
}

function formatTime(iso: string): string {
	return new Intl.DateTimeFormat("es-MX", {
		timeZone: bookingConfig.timezone,
		hour: "2-digit",
		minute: "2-digit",
		hourCycle: "h23",
	}).format(new Date(iso));
}

function formatDay(date: string): string {
	const noon = zonedTimeToUtc(date, "12:00", bookingConfig.timezone);
	return new Intl.DateTimeFormat("es-MX", {
		timeZone: bookingConfig.timezone,
		weekday: "long",
		day: "numeric",
		month: "long",
	}).format(noon);
}

function formatMonth(month: string): string {
	const noon = zonedTimeToUtc(`${month}-01`, "12:00", bookingConfig.timezone);
	const label = new Intl.DateTimeFormat("es-MX", {
		timeZone: bookingConfig.timezone,
		month: "long",
		year: "numeric",
	}).format(noon);
	return label.charAt(0).toUpperCase() + label.slice(1);
}

export default function Booking() {
	const today = todayInZone(bookingConfig.timezone);
	const horizonEnd = addDays(today, bookingConfig.horizonDays);
	const [status, setStatus] = useState<LoadStatus>("loading");
	const [errorMsg, setErrorMsg] = useState("");
	const [slots, setSlots] = useState<string[]>([]);
	const [month, setMonth] = useState(today.slice(0, 7));
	const [selectedDate, setSelectedDate] = useState<string | null>(null);
	const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
	const [step, setStep] = useState<Step>(1);
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [phone, setPhone] = useState("");
	const [note, setNote] = useState("");
	const [touched, setTouched] = useState({ name: false, email: false, phone: false });
	const [submitting, setSubmitting] = useState(false);
	const [meetLink, setMeetLink] = useState<string | null>(null);
	const [bookedStart, setBookedStart] = useState<string | null>(null);

	useEffect(() => {
		const src = `https://www.google.com/recaptcha/api.js?render=${RECAPTCHA_SITE_KEY}`;
		if (!document.querySelector(`script[src="${src}"]`)) {
			const script = document.createElement("script");
			script.src = src;
			script.async = true;
			script.defer = true;
			document.head.appendChild(script);
		}
	}, []);

	useEffect(() => {
		let cancelled = false;

		async function load() {
			try {
				const response = await fetch("/.netlify/functions/availability");
				const data = (await response.json().catch(() => null)) as
					| (Availability & { error?: string })
					| null;
				if (!response.ok || !data?.slots) {
					throw new Error(data?.error || "No se pudo cargar la disponibilidad");
				}
				if (!cancelled) {
					setSlots(data.slots);
					setStatus("ready");
				}
			} catch (error) {
				if (!cancelled) {
					setStatus("error");
					setErrorMsg(
						error instanceof Error ? error.message : "No se pudo cargar la disponibilidad",
					);
				}
			}
		}

		load();
		return () => {
			cancelled = true;
		};
	}, []);

	const slotsByDate = useMemo(() => {
		const grouped = new Map<string, string[]>();
		for (const slot of slots) {
			const key = dateKeyInZone(slot, bookingConfig.timezone);
			const list = grouped.get(key) ?? [];
			list.push(slot);
			grouped.set(key, list);
		}
		return grouped;
	}, [slots]);

	const cells = useMemo(() => {
		const first = `${month}-01`;
		const lead = WEEKDAY_INDEX.indexOf(weekdayOf(first, bookingConfig.timezone));
		const blanks = Array.from({ length: lead }, (_, index) => `blank-${month}-${index}`);
		const dates = Array.from({ length: daysInMonth(month) }, (_, index) => {
			const day = String(index + 1).padStart(2, "0");
			return `${month}-${day}`;
		});
		return { blanks, dates };
	}, [month]);

	const daySlots = selectedDate ? (slotsByDate.get(selectedDate) ?? []) : [];
	const prevDisabled = month <= today.slice(0, 7);
	const nextDisabled = `${shiftMonth(month, 1)}-01` > horizonEnd;

	const nameError = name.trim() ? "" : "Escribe tu nombre.";
	const emailError = !email.trim()
		? "Escribe tu correo."
		: EMAIL_PATTERN.test(email.trim())
			? ""
			: "Escribe un correo válido.";

	const phoneError =
		!phone || isValidPhoneNumber(phone) ? "" : "Escribe un teléfono válido o déjalo vacío.";

	function goBack() {
		setErrorMsg("");
		setStep((current) => (current > 1 ? ((current - 1) as Step) : current));
	}

	function goNext() {
		setErrorMsg("");
		if (step === 1 && selectedDate) setStep(2);
		else if (step === 2 && selectedSlot) setStep(3);
	}

	async function handleSubmit(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();
		setTouched({ name: true, email: true, phone: true });
		if (!selectedSlot || submitting || nameError || emailError || phoneError) return;
		setSubmitting(true);
		setErrorMsg("");

		try {
			const captchaToken = await new Promise<string>((resolve, reject) => {
				window.grecaptcha.ready(() => {
					window.grecaptcha
						.execute(RECAPTCHA_SITE_KEY, { action: "book" })
						.then(resolve)
						.catch(reject);
				});
			});

			const response = await fetch("/.netlify/functions/book", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					name: name.trim(),
					email: email.trim(),
					phone,
					note: note.trim(),
					start: selectedSlot,
					captchaToken,
				}),
			});
			const data = (await response.json().catch(() => null)) as {
				error?: string;
				meetLink?: string | null;
				start?: string;
			} | null;
			if (!response.ok || !data) {
				throw new Error(data?.error || "No se pudo agendar la llamada");
			}

			trackEvent("book_call", { lead_source: "agenda" });
			setBookedStart(data.start ?? selectedSlot);
			setMeetLink(data.meetLink ?? null);
		} catch (error) {
			setErrorMsg(error instanceof Error ? error.message : "No se pudo agendar la llamada");
		} finally {
			setSubmitting(false);
		}
	}

	if (bookedStart) {
		const when = `${formatDay(dateKeyInZone(bookedStart, bookingConfig.timezone))} · ${formatTime(bookedStart)}`;
		return (
			<div className="rounded-sm border border-neon/30 bg-neon/5 p-10 text-center">
				<h3 className="mb-2 font-heading text-2xl text-text">Llamada agendada</h3>
				<p className="text-muted">{when}</p>
				{meetLink ? (
					<a
						href={meetLink}
						target="_blank"
						rel="noopener noreferrer"
						className="mt-6 inline-block text-sm font-semibold text-neon-ink underline underline-offset-4"
					>
						Abrir Google Meet
					</a>
				) : null}
				<p className="mt-4 text-sm text-muted">Google envió la invitación a tu correo.</p>
			</div>
		);
	}

	const stepBlocked = step === 1 ? !selectedDate : !selectedSlot;
	const summary =
		step > 1 && selectedDate
			? `${formatDay(selectedDate)}${step === 3 && selectedSlot ? ` · ${formatTime(selectedSlot)}` : ""}`
			: "";

	return (
		<div className="rounded-sm border border-line bg-bg p-5 sm:p-6">
			<div className="mb-5 flex items-center justify-between gap-3">
				<p className="font-mono text-2xs tracking-widest text-muted uppercase">
					{bookingConfig.slotMinutes} min · Google Meet
				</p>
				<p className="font-mono text-2xs text-disabled">Ciudad de México</p>
			</div>

			{status === "loading" && (
				<p className="py-16 text-center text-sm text-muted">Cargando horarios…</p>
			)}

			{status === "error" && (
				<div
					className="rounded-sm border border-danger/30 bg-danger-muted px-4 py-3 text-sm text-danger"
					role="alert"
				>
					{errorMsg}
				</div>
			)}

			{status === "ready" && slots.length === 0 && (
				<p className="py-10 text-center text-sm text-muted">
					No hay horarios libres en las próximas semanas.
				</p>
			)}

			{status === "ready" && slots.length > 0 && (
				<div>
					<ol className="mb-6 grid grid-cols-3 gap-2" aria-label="Progreso">
						{STEP_LABELS.map((label, index) => {
							const number = index + 1;
							const active = number === step;
							const done = number < step;
							return (
								<li key={label} aria-current={active ? "step" : undefined}>
									<span
										className={[
											"mb-2 block h-0.5 transition-colors",
											active || done ? "bg-neon" : "bg-line-strong",
										].join(" ")}
									/>
									<span
										className={[
											"font-mono text-2xs tracking-widest uppercase",
											active ? "text-neon-ink" : done ? "text-muted" : "text-disabled",
										].join(" ")}
									>
										{number}. {label}
									</span>
								</li>
							);
						})}
					</ol>

					{summary && <p className="mb-4 text-sm font-medium text-text capitalize">{summary}</p>}

					<div className="min-h-[26rem]">
						{step === 1 && (
							<div>
								<div className="mb-4 flex items-center justify-between">
									<button
										type="button"
										className="px-2 py-1 text-sm text-muted transition-colors hover:text-text disabled:text-disabled"
										onClick={() => setMonth(shiftMonth(month, -1))}
										disabled={prevDisabled}
										aria-label="Mes anterior"
									>
										←
									</button>
									<p className="font-heading text-lg text-text">{formatMonth(month)}</p>
									<button
										type="button"
										className="px-2 py-1 text-sm text-muted transition-colors hover:text-text disabled:text-disabled"
										onClick={() => setMonth(shiftMonth(month, 1))}
										disabled={nextDisabled}
										aria-label="Mes siguiente"
									>
										→
									</button>
								</div>
								<div className="grid grid-cols-7 gap-1 text-center">
									{WEEKDAY_LABELS.map((label) => (
										<span key={label} className="pb-2 font-mono text-2xs text-disabled">
											{label}
										</span>
									))}
									{cells.blanks.map((key) => (
										<span key={key} />
									))}
									{cells.dates.map((date) => {
										const open = slotsByDate.has(date);
										const selected = date === selectedDate;
										return (
											<button
												key={date}
												type="button"
												disabled={!open}
												aria-pressed={selected}
												onClick={() => {
													setSelectedDate(date);
													if (date !== selectedDate) setSelectedSlot(null);
													setErrorMsg("");
												}}
												className={[
													"aspect-square rounded-sm text-sm transition-colors",
													selected
														? "bg-neon/15 font-semibold text-neon-ink"
														: open
															? "text-text hover:bg-surface-2"
															: "cursor-not-allowed text-disabled",
												].join(" ")}
											>
												{Number(date.slice(-2))}
											</button>
										);
									})}
								</div>
							</div>
						)}

						{step === 2 && (
							<div>
								<p className="mb-3 text-sm text-muted">Elige la hora de tu llamada.</p>
								{daySlots.length === 0 ? (
									<p className="text-sm text-muted">No hay horarios este día.</p>
								) : (
									<div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
										{daySlots.map((slot) => {
											const selected = slot === selectedSlot;
											return (
												<button
													key={slot}
													type="button"
													aria-pressed={selected}
													onClick={() => {
														setSelectedSlot(slot);
														setErrorMsg("");
													}}
													className={[
														"rounded-sm border px-2 py-2 font-mono text-sm transition-colors",
														selected
															? "border-neon bg-neon/10 text-neon-ink"
															: "border-line-strong text-text hover:border-neon",
													].join(" ")}
												>
													{formatTime(slot)}
												</button>
											);
										})}
									</div>
								)}
							</div>
						)}

						{step === 3 && (
							<form id="booking-form" onSubmit={handleSubmit} noValidate className="space-y-4">
								<div>
									<label
										htmlFor="booking-name"
										className="mb-2 block text-sm font-medium text-text"
									>
										Nombre
									</label>
									<input
										id="booking-name"
										name="name"
										type="text"
										required
										value={name}
										onChange={(event) => setName(event.target.value)}
										onBlur={() => setTouched((current) => ({ ...current, name: true }))}
										aria-invalid={touched.name && Boolean(nameError)}
										placeholder="Tu nombre"
										className={fieldClass}
									/>
									{touched.name && nameError && (
										<p className="mt-1.5 text-xs text-danger">{nameError}</p>
									)}
								</div>
								<div>
									<label
										htmlFor="booking-email"
										className="mb-2 block text-sm font-medium text-text"
									>
										Email
									</label>
									<input
										id="booking-email"
										name="email"
										type="email"
										required
										value={email}
										onChange={(event) => setEmail(event.target.value)}
										onBlur={() => setTouched((current) => ({ ...current, email: true }))}
										aria-invalid={touched.email && Boolean(emailError)}
										placeholder="tu@email.com"
										className={fieldClass}
									/>
									{touched.email && emailError && (
										<p className="mt-1.5 text-xs text-danger">{emailError}</p>
									)}
								</div>
								<div>
									<label
										htmlFor="booking-phone"
										className="mb-2 block text-sm font-medium text-text"
									>
										Teléfono <span className="font-normal text-disabled">(opcional)</span>
									</label>
									<PhoneInput
										id="booking-phone"
										value={phone}
										onChange={setPhone}
										onBlur={() => setTouched((current) => ({ ...current, phone: true }))}
										invalid={touched.phone && Boolean(phoneError)}
										placeholder="55 1234 5678"
									/>
									{touched.phone && phoneError && (
										<p className="mt-1.5 text-xs text-danger">{phoneError}</p>
									)}
								</div>
								<div>
									<label
										htmlFor="booking-note"
										className="mb-2 block text-sm font-medium text-text"
									>
										Nota <span className="font-normal text-disabled">(opcional)</span>
									</label>
									<textarea
										id="booking-note"
										name="note"
										rows={3}
										value={note}
										onChange={(event) => setNote(event.target.value)}
										placeholder="De qué quieres hablar"
										className={`${fieldClass} resize-none`}
									/>
								</div>
							</form>
						)}
					</div>

					{errorMsg && (
						<div
							className="mt-2 rounded-sm border border-danger/30 bg-danger-muted px-4 py-3 text-sm text-danger"
							role="alert"
						>
							{errorMsg}
						</div>
					)}

					<div className="mt-6 flex items-center justify-between gap-3 border-t border-line pt-5">
						{step > 1 ? (
							<button
								type="button"
								onClick={goBack}
								disabled={submitting}
								className="rounded-sm border border-line-strong px-5 py-3 text-sm font-semibold tracking-wider text-text uppercase transition-colors hover:border-neon disabled:opacity-60"
							>
								Atrás
							</button>
						) : (
							<span />
						)}
						{step < 3 ? (
							<button
								type="button"
								onClick={goNext}
								disabled={stepBlocked}
								className="cut-corner bg-neon px-8 py-3 text-sm font-bold tracking-widest text-white uppercase transition-all hover:brightness-110 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-40 dark:text-bg"
							>
								Continuar
							</button>
						) : (
							<button
								type="submit"
								form="booking-form"
								disabled={submitting}
								className="cut-corner bg-neon px-8 py-3 text-sm font-bold tracking-widest text-white uppercase transition-all hover:brightness-110 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60 dark:text-bg"
							>
								{submitting ? "Agendando..." : "Confirmar llamada"}
							</button>
						)}
					</div>

					{step === 3 && (
						<p className="mt-4 text-center text-2xs text-disabled">
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
								Términos
							</a>
							.
						</p>
					)}
				</div>
			)}
		</div>
	);
}
