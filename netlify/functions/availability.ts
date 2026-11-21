import type { Context } from "@netlify/functions";
import { bookingConfig } from "../../src/data/booking";
import { listOpenSlots, slotRange } from "../../src/lib/slots";
import { calendarConfigured, fetchBusy } from "./lib/google";

const CORS_HEADERS = {
	"Access-Control-Allow-Origin": "*",
	"Access-Control-Allow-Headers": "Content-Type",
	"Access-Control-Allow-Methods": "GET, OPTIONS",
};

function json(body: unknown, status: number) {
	return new Response(JSON.stringify(body), {
		status,
		headers: { ...CORS_HEADERS, "Content-Type": "application/json" },
	});
}

export default async (req: Request, _context: Context) => {
	if (req.method === "OPTIONS") {
		return new Response(null, { status: 204, headers: CORS_HEADERS });
	}

	if (req.method !== "GET") {
		return json({ error: "Metodo no permitido" }, 405);
	}

	if (!calendarConfigured()) {
		return json({ error: "Agenda no configurada" }, 503);
	}

	try {
		const { timeMin, timeMax } = slotRange();
		const busy = await fetchBusy(timeMin, timeMax);
		const slots = listOpenSlots(busy);

		return json(
			{
				timezone: bookingConfig.timezone,
				slotMinutes: bookingConfig.slotMinutes,
				title: bookingConfig.title,
				slots,
			},
			200,
		);
	} catch (error) {
		const message = error instanceof Error ? error.message : "No se pudo consultar la agenda";
		return json({ error: message }, 500);
	}
};
