import { bookingConfig } from "../data/booking";
import { addDays, todayInZone, weekdayOf, zonedTimeToUtc } from "./time";

export interface BusyInterval {
	start: string;
	end: string;
}

function minutes(clock: string): number {
	const [hour, minute] = clock.split(":").map(Number);
	return hour * 60 + minute;
}

function clock(total: number): string {
	const hour = String(Math.floor(total / 60)).padStart(2, "0");
	const minute = String(total % 60).padStart(2, "0");
	return `${hour}:${minute}`;
}

function overlaps(startMs: number, endMs: number, busy: BusyInterval[]): boolean {
	return busy.some((interval) => {
		const busyStart = Date.parse(interval.start);
		const busyEnd = Date.parse(interval.end);
		return startMs < busyEnd && endMs > busyStart;
	});
}

export function listOpenSlots(busy: BusyInterval[], now = new Date()): string[] {
	const { timezone, slotMinutes, minNoticeHours, horizonDays, weekly, blockedDates } =
		bookingConfig;
	const earliest = now.getTime() + minNoticeHours * 60 * 60 * 1000;
	const startDate = todayInZone(timezone, now);
	const slots: string[] = [];

	for (let day = 0; day <= horizonDays; day++) {
		const date = addDays(startDate, day);
		if (blockedDates.includes(date)) continue;

		for (const window of weekly[weekdayOf(date, timezone)]) {
			const end = minutes(window.end);
			for (let cursor = minutes(window.start); cursor + slotMinutes <= end; cursor += slotMinutes) {
				const start = zonedTimeToUtc(date, clock(cursor), timezone);
				const finish = start.getTime() + slotMinutes * 60 * 1000;
				if (start.getTime() < earliest || overlaps(start.getTime(), finish, busy)) continue;
				slots.push(start.toISOString());
			}
		}
	}

	return slots;
}

export function slotRange(now = new Date()): { timeMin: string; timeMax: string } {
	const startDate = todayInZone(bookingConfig.timezone, now);
	const last = addDays(startDate, bookingConfig.horizonDays);
	const end = zonedTimeToUtc(last, "23:59", bookingConfig.timezone);
	return { timeMin: now.toISOString(), timeMax: end.toISOString() };
}
