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
	return (
		<StaggeredMenu
			position="right"
			items={menuItems}
			displaySocials={false}
			displayItemNumbering={true}
			menuButtonColor="#f7ebec"
			openMenuButtonColor="#070711"
			changeMenuColorOnOpen={true}
			colors={["#7c3aed", "#070711"]}
			logoUrl="/favicon.svg"
			accentColor="#7c3aed"
			isFixed={true}
		/>
	);
}
