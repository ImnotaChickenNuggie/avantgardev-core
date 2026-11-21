import { type KeyboardEvent, useEffect, useId, useMemo, useRef, useState } from "react";
import PhoneInputBase, {
	type Country,
	getCountryCallingCode,
	type Value,
} from "react-phone-number-input";
import flags from "react-phone-number-input/flags";
import es from "react-phone-number-input/locale/es";

interface PhoneInputProps {
	id?: string;
	value: string;
	onChange: (value: string) => void;
	onBlur?: () => void;
	invalid?: boolean;
	placeholder?: string;
}

interface CountryOption {
	value?: Country;
	label: string;
	divider?: boolean;
}

interface CountrySelectProps {
	value?: Country;
	options: CountryOption[];
	onChange: (country?: Country) => void;
	disabled?: boolean;
	readOnly?: boolean;
	onFocus?: () => void;
	onBlur?: () => void;
}

const DEFAULT_COUNTRY: Country = "MX";

function normalize(text: string): string {
	return text.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().trim();
}

function Flag({ country, label }: { country?: Country; label: string }) {
	const Icon = country ? flags[country] : undefined;
	return (
		<span className="flex h-4 w-6 shrink-0 items-center justify-center overflow-hidden rounded-[2px]">
			{Icon ? (
				<Icon title={label} />
			) : (
				<span aria-hidden="true" className="text-xs">
					🌐
				</span>
			)}
		</span>
	);
}

/** Selector de país con búsqueda: el usuario escribe y la lista se filtra por nombre, código o prefijo. */
function CountrySelect({ value, options, onChange, disabled, readOnly }: CountrySelectProps) {
	const listId = useId();
	const rootRef = useRef<HTMLDivElement>(null);
	const searchRef = useRef<HTMLInputElement>(null);
	const triggerRef = useRef<HTMLButtonElement>(null);
	const [open, setOpen] = useState(false);
	const [query, setQuery] = useState("");
	const [active, setActive] = useState(0);

	const countries = useMemo(
		() =>
			options.filter((option): option is CountryOption & { value: Country } =>
				Boolean(option.value),
			),
		[options],
	);

	const filtered = useMemo(() => {
		const q = normalize(query);
		if (!q) return countries;
		const digits = q.replace(/^\+/, "");
		return countries.filter(
			(option) =>
				normalize(option.label).includes(q) ||
				option.value.toLowerCase() === q ||
				(/^\d+$/.test(digits) && getCountryCallingCode(option.value).startsWith(digits)),
		);
	}, [countries, query]);

	const selected = countries.find((option) => option.value === value);

	function close(returnFocus = false) {
		setOpen(false);
		setQuery("");
		if (returnFocus) triggerRef.current?.focus();
	}

	function pick(country: Country) {
		onChange(country);
		close(true);
	}

	useEffect(() => {
		if (!open) return;
		searchRef.current?.focus();
		const index = filtered.findIndex((option) => option.value === value);
		setActive(index >= 0 ? index : 0);
		// biome-ignore lint/correctness/useExhaustiveDependencies: solo al abrir
	}, [open]);

	useEffect(() => {
		if (!open) return;
		function onPointerDown(event: PointerEvent) {
			if (!rootRef.current?.contains(event.target as Node)) close();
		}
		document.addEventListener("pointerdown", onPointerDown);
		return () => document.removeEventListener("pointerdown", onPointerDown);
	}, [open]);

	useEffect(() => {
		if (!open) return;
		document.getElementById(`${listId}-${active}`)?.scrollIntoView({ block: "nearest" });
	}, [active, open, listId]);

	function onSearchKeyDown(event: KeyboardEvent<HTMLInputElement>) {
		if (event.key === "ArrowDown") {
			event.preventDefault();
			setActive((current) => Math.min(current + 1, filtered.length - 1));
		} else if (event.key === "ArrowUp") {
			event.preventDefault();
			setActive((current) => Math.max(current - 1, 0));
		} else if (event.key === "Enter") {
			event.preventDefault();
			const option = filtered[active];
			if (option) pick(option.value);
		} else if (event.key === "Escape") {
			event.preventDefault();
			close(true);
		} else if (event.key === "Tab") {
			close();
		}
	}

	return (
		<div ref={rootRef} className="relative flex">
			<button
				ref={triggerRef}
				type="button"
				disabled={disabled || readOnly}
				aria-haspopup="listbox"
				aria-expanded={open}
				aria-label={`País: ${selected?.label ?? "ninguno"}. Cambiar país`}
				onClick={() => setOpen((current) => !current)}
				className="flex h-full items-center gap-2 border-r border-line-strong px-3 text-sm text-text transition-colors hover:bg-surface-2 focus-visible:bg-surface-2 focus-visible:outline-none disabled:opacity-60"
			>
				<Flag country={value} label={selected?.label ?? ""} />
				<svg
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
					className={["size-3.5 text-muted transition-transform", open ? "rotate-180" : ""].join(
						" ",
					)}
					aria-hidden="true"
				>
					<path strokeLinecap="round" strokeLinejoin="round" d="m6 9 6 6 6-6" />
				</svg>
			</button>

			{open && (
				<div className="absolute top-full left-0 z-30 mt-1 w-72 max-w-[calc(100vw-3rem)] overflow-hidden rounded-sm border border-line-strong bg-bg shadow-lg">
					<input
						ref={searchRef}
						type="text"
						role="combobox"
						aria-expanded="true"
						aria-controls={listId}
						aria-activedescendant={filtered[active] ? `${listId}-${active}` : undefined}
						aria-label="Buscar país"
						autoComplete="off"
						placeholder="Escribe un país, ej. México"
						value={query}
						onChange={(event) => {
							setQuery(event.target.value);
							setActive(0);
						}}
						onKeyDown={onSearchKeyDown}
						className="w-full border-b border-line bg-transparent px-3 py-2.5 text-sm text-text placeholder:text-disabled focus:outline-none"
					/>
					<ul
						id={listId}
						role="listbox"
						aria-label="Países"
						className="max-h-60 overflow-y-auto py-1"
					>
						{filtered.length === 0 && (
							<li className="px-3 py-2.5 text-sm text-muted">No se encontró ningún país.</li>
						)}
						{filtered.map((option, index) => (
							<li
								key={option.value}
								id={`${listId}-${index}`}
								role="option"
								aria-selected={option.value === value}
								tabIndex={-1}
								onPointerDown={(event) => event.preventDefault()}
								onClick={() => pick(option.value)}
								onMouseMove={() => setActive(index)}
								className={[
									"flex cursor-pointer items-center gap-3 px-3 py-2 text-sm",
									index === active ? "bg-surface-2" : "",
									option.value === value ? "font-semibold text-text" : "text-text",
								].join(" ")}
							>
								<Flag country={option.value} label={option.label} />
								<span className="flex-1 truncate">{option.label}</span>
								<span className="font-mono text-xs text-muted">
									+{getCountryCallingCode(option.value)}
								</span>
							</li>
						))}
					</ul>
				</div>
			)}
		</div>
	);
}

/**
 * Teléfono internacional con selector de país buscable (react-phone-number-input).
 * México es el país por defecto. El valor sale en formato E.164 (+525512345678).
 */
export function PhoneInput({ id, value, onChange, onBlur, invalid, placeholder }: PhoneInputProps) {
	return (
		<PhoneInputBase
			flags={flags}
			labels={es}
			defaultCountry={DEFAULT_COUNTRY}
			countryOptionsOrder={["MX", "US", "CA", "|", "..."]}
			countrySelectComponent={CountrySelect}
			international={false}
			limitMaxLength
			value={(value || undefined) as Value | undefined}
			onChange={(next) => onChange(next ?? "")}
			onBlur={onBlur}
			placeholder={placeholder}
			numberInputProps={{
				id,
				type: "tel",
				inputMode: "tel",
				autoComplete: "tel-national",
				"aria-invalid": invalid || undefined,
				className:
					"min-w-0 flex-1 bg-transparent px-4 py-3 text-sm text-text placeholder:text-disabled focus:outline-none",
			}}
			className={[
				"flex w-full items-stretch rounded-sm border bg-bg transition-colors focus-within:ring-1",
				invalid
					? "border-danger focus-within:ring-danger/40"
					: "border-line-strong focus-within:border-primary focus-within:ring-primary/50",
			].join(" ")}
		/>
	);
}
