import { readdirSync, statSync, unlinkSync } from "node:fs";
import { join, extname } from "node:path";
import sharp from "sharp";

const DIR = process.argv[2] ?? "src/assets";
const QUALITY = 95;

function* walk(dir: string): Generator<string> {
	for (const name of readdirSync(dir)) {
		const path = join(dir, name);
		if (statSync(path).isDirectory()) yield* walk(path);
		else if (extname(path).toLowerCase() === ".png") yield path;
	}
}

let before = 0;
let after = 0;
for (const png of walk(DIR)) {
	const out = png.replace(/\.png$/i, ".webp");
	await sharp(png).webp({ quality: QUALITY, effort: 6, smartSubsample: false }).toFile(out);
	const a = statSync(png).size;
	const b = statSync(out).size;
	before += a;
	after += b;
	console.log(`${png}: ${(a / 1024).toFixed(0)} KB -> ${(b / 1024).toFixed(0)} KB`);
	if (process.argv.includes("--delete")) unlinkSync(png);
}
console.log(`Total: ${(before / 1024).toFixed(0)} KB -> ${(after / 1024).toFixed(0)} KB`);
