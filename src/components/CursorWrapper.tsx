import { useEffect, useState } from "react";
import { CustomCursor } from "cursor-style";

export default function CursorWrapper() {
	const [isDesktop, setIsDesktop] = useState(false);

	useEffect(() => {
		const checkDesktop = () => {
			const hasHover = window.matchMedia("(hover: hover)").matches;
			const hasFinePointer = window.matchMedia("(pointer: fine)").matches;
			setIsDesktop(hasHover && hasFinePointer);
		};

		checkDesktop();
		window.addEventListener("resize", checkDesktop);

		return () => {
			window.removeEventListener("resize", checkDesktop);
		};
	}, []);

	if (!isDesktop) return null;

	return <CustomCursor type="one" size={2} delay={40} />;
}
