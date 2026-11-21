import PhoneInputBase, { type Value } from "react-phone-number-input";
import flags from "react-phone-number-input/flags";
import "react-phone-number-input/style.css";

interface PhoneInputProps {
	id?: string;
	value: string;
	onChange: (value: string) => void;
	onBlur?: () => void;
	invalid?: boolean;
	placeholder?: string;
	inputClassName?: string;
}

/**
 * Teléfono internacional con selector de país (react-phone-number-input).
 * México queda siempre como país por defecto. El valor sale en formato E.164 (+525512345678).
 */
export function PhoneInput({
	id,
	value,
	onChange,
	onBlur,
	invalid,
	placeholder,
	inputClassName,
}: PhoneInputProps) {
	return (
		<PhoneInputBase
			flags={flags}
			defaultCountry="MX"
			international={false}
			limitMaxLength
			value={(value || undefined) as Value | undefined}
			onChange={(next) => onChange(next ?? "")}
			onBlur={onBlur}
			placeholder={placeholder}
			numberInputProps={{ id, className: inputClassName, "aria-invalid": invalid || undefined }}
			countrySelectProps={{ "aria-label": "País" }}
		/>
	);
}
