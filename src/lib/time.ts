import { type Weekday, weekdays } from "../data/booking";

const weekdayFromShort: Record<string, Weekday> = {
	Mon: "mon",
	Tue: "tue",
	Wed: "wed",
	Thu: "thu",
	Fri: "fri",
	Sat: "sat",
	Sun: "sun",
};

function partsMap(date: Date, timeZone: string): Record<string, string> {
	const parts = new Intl.DateTimeFormat("en-US", {
		timeZone,
		hourCycle: "h23",
		year: "numeric",
		month: "2-digit",
		day: "2-digit",
		hour: "2-digit",
		minute: "2-digit",
		second: "2-digit",
	}).formatToParts(date);

	return Object.fromEntries(
		parts.filter((part) => part.type !== "literal").map((part) => [part.type, part.value]),
	);
}

/** Milliseconds to add to a UTC instant to reach the wall clock in `timeZone`. */
function zoneOffsetMs(timeZone: string, utcMs: number): number {
	const map = partsMap(new Date(utcMs), timeZone);
	const asUtc = Date.UTC(
		Number(map.year),
		Number(map.month) - 1,
		Number(map.day),
		Number(map.hour) % 24,
		Number(map.minute),
		Number(map.second),
	);
	return asUtc - utcMs;
}

export function zonedTimeToUtc(date: string, time: string, timeZone: string): Date {
	const [year, month, day] = date.split("-").map(Number);
	const [hour, minute] = time.split(":").map(Number);
	const wall = Date.UTC(year, month - 1, day, hour, minute, 0);
	let utc = wall - zoneOffsetMs(timeZone, wall);
	utc = wall - zoneOffsetMs(timeZone, utc);
	return new Date(utc);
}

export function todayInZone(timeZone: string, now = new Date()): string {
	const map = partsMap(now, timeZone);
	return `${map.year}-${map.month}-${map.day}`;
}

export function addDays(date: string, days: number): string {
	const [year, month, day] = date.split("-").map(Number);
	const next = new Date(Date.UTC(year, month - 1, day + days));
	const y = next.getUTCFullYear();
	const m = String(next.getUTCMonth() + 1).padStart(2, "0");
	const d = String(next.getUTCDate()).padStart(2, "0");
	return `${y}-${m}-${d}`;
}

export function weekdayOf(date: string, timeZone: string): Weekday {
	const noon = zonedTimeToUtc(date, "12:00", timeZone);
	const short = new Intl.DateTimeFormat("en-US", { timeZone, weekday: "short" }).format(noon);
	const key = weekdayFromShort[short];
	if (!key || !weekdays.includes(key)) {
		throw new Error(`Dia de semana no reconocido: ${short}`);
	}
	return key;
}

export function dateKeyInZone(iso: string, timeZone: string): string {
	return todayInZone(timeZone, new Date(iso));
}
