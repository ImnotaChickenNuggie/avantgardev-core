/**
 * Días festivos de México (fechas `YYYY-MM-DD`).
 * Oficiales (Ley Federal del Trabajo, art. 74): 1 ene, 1.er lunes de feb, 3.er lunes de mar,
 * 1 may, 16 sep, 3.er lunes de nov, 25 dic y el 1 oct cada 6 años (cambio de gobierno).
 * Además, Jueves y Viernes Santo, que casi todo el país descansa.
 */

function iso(year: number, month: number, day: number): string {
	return `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}

function nthMonday(year: number, month: number, n: number): string {
	const firstWeekday = new Date(Date.UTC(year, month - 1, 1)).getUTCDay();
	const firstMonday = 1 + ((8 - firstWeekday) % 7);
	return iso(year, month, firstMonday + (n - 1) * 7);
}

/** Domingo de Pascua (algoritmo de Meeus/Jones/Butcher). */
function easter(year: number): Date {
	const a = year % 19;
	const b = Math.floor(year / 100);
	const c = year % 100;
	const d = Math.floor(b / 4);
	const e = b % 4;
	const f = Math.floor((b + 8) / 25);
	const g = Math.floor((b - f + 1) / 3);
	const h = (19 * a + b - d - g + 15) % 30;
	const i = Math.floor(c / 4);
	const k = c % 4;
	const l = (32 + 2 * e + 2 * i - h - k) % 7;
	const m = Math.floor((a + 11 * h + 22 * l) / 451);
	const month = Math.floor((h + l - 7 * m + 114) / 31);
	const day = ((h + l - 7 * m + 114) % 31) + 1;
	return new Date(Date.UTC(year, month - 1, day));
}

function offsetDay(date: Date, days: number): string {
	const moved = new Date(date.getTime() + days * 24 * 60 * 60 * 1000);
	return iso(moved.getUTCFullYear(), moved.getUTCMonth() + 1, moved.getUTCDate());
}

const cache = new Map<number, Set<string>>();

export function mexicanHolidays(year: number): Set<string> {
	const cached = cache.get(year);
	if (cached) return cached;

	const days = new Set<string>([
		iso(year, 1, 1),
		nthMonday(year, 2, 1),
		nthMonday(year, 3, 3),
		iso(year, 5, 1),
		iso(year, 9, 16),
		nthMonday(year, 11, 3),
		iso(year, 12, 25),
	]);
	if (year >= 2024 && (year - 2024) % 6 === 0) days.add(iso(year, 10, 1));

	const pascua = easter(year);
	days.add(offsetDay(pascua, -3));
	days.add(offsetDay(pascua, -2));

	cache.set(year, days);
	return days;
}

export function isMexicanHoliday(date: string): boolean {
	return mexicanHolidays(Number(date.slice(0, 4))).has(date);
}
