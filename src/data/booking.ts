export const weekdays = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"] as const;

export type Weekday = (typeof weekdays)[number];

export interface TimeWindow {
	start: string;
	end: string;
}

export interface BookingConfig {
	title: string;
	timezone: string;
	slotMinutes: number;
	minNoticeHours: number;
	horizonDays: number;
	weekly: Record<Weekday, TimeWindow[]>;
	/** Fechas `YYYY-MM-DD` en `timezone` que no se ofrecen. */
	blockedDates: string[];
	/** Si es true, tampoco se ofrecen los días festivos de México (ver `src/lib/holidays.ts`). */
	blockMexicanHolidays: boolean;
}

export const bookingConfig: BookingConfig = {
	title: "Llamada",
	timezone: "America/Mexico_City",
	slotMinutes: 30,
	minNoticeHours: 12,
	horizonDays: 21,
	weekly: {
		mon: [{ start: "10:00", end: "18:00" }],
		tue: [{ start: "10:00", end: "18:00" }],
		wed: [{ start: "10:00", end: "18:00" }],
		thu: [{ start: "10:00", end: "18:00" }],
		fri: [{ start: "10:00", end: "18:00" }],
		sat: [],
		sun: [],
	},
	blockedDates: [],
	blockMexicanHolidays: true,
};
