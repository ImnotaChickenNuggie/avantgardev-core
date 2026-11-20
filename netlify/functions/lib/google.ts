import { bookingConfig } from "../../../src/data/booking";
import type { BusyInterval } from "../../../src/lib/slots";

export function calendarId(): string {
	return process.env.GOOGLE_CALENDAR_ID || "primary";
}

export function calendarConfigured(): boolean {
	return Boolean(
		process.env.GOOGLE_CLIENT_ID &&
			process.env.GOOGLE_CLIENT_SECRET &&
			process.env.GOOGLE_REFRESH_TOKEN &&
			calendarId(),
	);
}

export async function getCalendar() {
	const { google } = await import("googleapis");
	const auth = new google.auth.OAuth2(process.env.GOOGLE_CLIENT_ID, process.env.GOOGLE_CLIENT_SECRET);
	auth.setCredentials({ refresh_token: process.env.GOOGLE_REFRESH_TOKEN });
	return google.calendar({ version: "v3", auth });
}

export async function fetchBusy(timeMin: string, timeMax: string): Promise<BusyInterval[]> {
	const calendar = await getCalendar();
	const id = calendarId();
	const res = await calendar.freebusy.query({
		requestBody: {
			timeMin,
			timeMax,
			items: [{ id }],
		},
	});

	const calendars = res.data.calendars ?? {};
	const cal = calendars[id] ?? Object.values(calendars)[0];
	if (cal?.errors?.length) {
		throw new Error("No se pudo leer el calendario");
	}

	return (cal?.busy ?? []).flatMap((interval) =>
		interval.start && interval.end ? [{ start: interval.start, end: interval.end }] : [],
	);
}

export function meetLinkFromEvent(event: {
	hangoutLink?: string | null;
	conferenceData?: { entryPoints?: { entryPointType?: string | null; uri?: string | null }[] | null } | null;
}): string | null {
	if (event.hangoutLink) return event.hangoutLink;
	const video = event.conferenceData?.entryPoints?.find((point) => point.entryPointType === "video");
	return video?.uri ?? null;
}
