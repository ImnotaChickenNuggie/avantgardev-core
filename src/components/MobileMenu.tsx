import { useEffect, useState } from "react";
import MobileThemeToggle from "./MobileThemeToggle";
import { StaggeredMenu } from "./StaggeredMenu";

const menuItems = [
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

export default function MobileMenu() {
	const [isDark, setIsDark] = useState(true);

	useEffect(() => {
		const check = () => setIsDark(document.documentElement.classList.contains("dark"));
		check();

		const observer = new MutationObserver(check);
		observer.observe(document.documentElement, {
			attributes: true,
			attributeFilter: ["class"],
		});
		return () => observer.disconnect();
	}, []);

	return (
		<StaggeredMenu
			position="right"
			items={menuItems}
			displaySocials={false}
			displayItemNumbering={true}
			menuButtonColor={isDark ? "#f7ebec" : "#1a1128"}
			openMenuButtonColor={isDark ? "#070711" : "#faf9fc"}
			changeMenuColorOnOpen={true}
			colors={isDark ? ["#7c3aed", "#070711"] : ["#6d28d9", "#faf9fc"]}
			logoUrl="/favicon.svg"
			accentColor={isDark ? "#7c3aed" : "#6d28d9"}
			isFixed={true}
			panelFooter={<MobileThemeToggle />}
		/>
	);
}
