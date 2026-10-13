import { useEffect, useState } from "react";
import MobileThemeToggle from "./MobileThemeToggle";
import { StaggeredMenu } from "./StaggeredMenu";

const menuItems = [
	{
		label: "Servicios",
		ariaLabel: "Ver servicios",
		link: "#servicios",
	},
	{
		label: "Manifiesto",
		ariaLabel: "Ir a manifiesto",
		link: "#manifiesto",
	},
	{
		label: "Metodología",
		ariaLabel: "Ver metodología",
		link: "#metodologia",
	},
	{
		label: "Proyectos",
		ariaLabel: "Ver proyectos",
		link: "#proyectos",
	},
	{
		label: "FAQs",
		ariaLabel: "Preguntas frecuentes",
		link: "#faqs",
	},
	{
		label: "Conectemos",
		ariaLabel: "Ir a contacto",
		link: "#contacto",
	},
];

const readToken = (name: string) =>
	getComputedStyle(document.documentElement).getPropertyValue(name).trim();

type MenuColors = { text: string; bg: string; primary: string; hud: string };

export default function MobileMenu() {
	const [palette, setPalette] = useState<MenuColors | null>(null);

	useEffect(() => {
		const read = () =>
			setPalette({
				text: readToken("--ag-text"),
				bg: readToken("--ag-bg"),
				primary: readToken("--ag-primary"),
				hud: readToken("--ag-hud"),
			});
		read();

		const observer = new MutationObserver(read);
		observer.observe(document.documentElement, {
			attributes: true,
			attributeFilter: ["class"],
		});
		return () => observer.disconnect();
	}, []);

	if (!palette) return null;

	return (
		<StaggeredMenu
			position="right"
			items={menuItems}
			displaySocials={false}
			displayItemNumbering={true}
			menuButtonColor={palette.text}
			openMenuButtonColor={palette.text}
			changeMenuColorOnOpen={false}
			colors={[palette.primary, palette.bg]}
			logoUrl="/favicon.svg"
			accentColor={palette.hud}
			isFixed={true}
			panelFooter={<MobileThemeToggle />}
		/>
	);
}
