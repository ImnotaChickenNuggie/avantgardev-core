import { existsSync, readFileSync } from "node:fs";
import { createServer, type Server } from "node:http";
import { google } from "googleapis";

const PORT = 53682;
const REDIRECT = `http://127.0.0.1:${PORT}/oauth`;
const SCOPE = ["https://www.googleapis.com/auth/calendar"];

function loadEnvFile() {
	if (!existsSync(".env")) return;
	for (const line of readFileSync(".env", "utf8").split("\n")) {
		const trimmed = line.trim();
		if (!trimmed || trimmed.startsWith("#")) continue;
		const eq = trimmed.indexOf("=");
		if (eq < 0) continue;
		const key = trimmed.slice(0, eq).trim();
		const value = trimmed.slice(eq + 1).trim().replace(/^["']|["']$/g, "");
		if (!process.env[key]) process.env[key] = value;
	}
}

function waitForCode(): Promise<string> {
	return new Promise((resolve, reject) => {
		let server: Server;
		const timer = setTimeout(() => {
			server.close();
			reject(new Error("Tiempo de espera agotado (5 min)"));
		}, 5 * 60 * 1000);

		server = createServer((req, res) => {
			const url = new URL(req.url ?? "/", REDIRECT);
			if (url.pathname !== "/oauth") {
				res.writeHead(404);
				res.end();
				return;
			}

			clearTimeout(timer);
			const error = url.searchParams.get("error");
			const code = url.searchParams.get("code");
			res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
			if (error || !code) {
				res.end("<p>No se autorizo. Puedes cerrar esta ventana.</p>");
				server.close();
				reject(new Error(error || "Google no devolvio el codigo"));
				return;
			}

			res.end("<p>Listo. Vuelve a la terminal. Puedes cerrar esta ventana.</p>");
			server.close();
			resolve(code);
		});

		server.listen(PORT, "127.0.0.1");
	});
}

loadEnvFile();

const clientId = process.env.GOOGLE_CLIENT_ID;
const clientSecret = process.env.GOOGLE_CLIENT_SECRET;

if (!clientId || !clientSecret) {
	console.error("Faltan GOOGLE_CLIENT_ID y GOOGLE_CLIENT_SECRET en el entorno o en .env");
	process.exit(1);
}

const oauth2 = new google.auth.OAuth2(clientId, clientSecret, REDIRECT);
const authUrl = oauth2.generateAuthUrl({
	access_type: "offline",
	prompt: "consent",
	scope: SCOPE,
});

console.log("\nAbre esta URL con tu cuenta personal de Google:\n");
console.log(authUrl);
console.log(`\nRedirect configurado: ${REDIRECT}\n`);

const code = await waitForCode();
const { tokens } = await oauth2.getToken(code);

if (!tokens.refresh_token) {
	console.error("Google no devolvio refresh_token. Revoca el acceso de la app en myaccount.google.com/permissions y vuelve a correr el script.");
	process.exit(1);
}

console.log("\nGOOGLE_REFRESH_TOKEN=\n");
console.log(tokens.refresh_token);
console.log("\nCopialo a .env y a las variables de Netlify. No lo compartas.\n");
