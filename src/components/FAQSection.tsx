import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
	{
		question: "¿Están peleados con la IA?",
		answer:
			'No, es un apoyo. Rechazamos las "soluciones milagrosas" sin base técnica. La IA es una herramienta poderosa cuando se usa con criterio y conocimiento, no un reemplazo de la ingeniería real.',
	},
	{
		question: "¿Solo se dedican al desarrollo web?",
		answer:
			"Somos un estudio integral. Diseñamos logotipos, brandbooks, estrategia técnica y digital. El desarrollo web es nuestro fuerte, pero nuestra visión abarca todo el ecosistema digital de tu proyecto.",
	},
	{
		question: "¿Cuál es el precio?",
		answer:
			"Cotizaciones personalizadas basadas en un análisis profundo de tus necesidades reales, sin paquetes genéricos. Cada proyecto es único y merece una propuesta que refleje exactamente lo que necesitas.",
	},
	{
		question: "¿El primer acercamiento tiene costo?",
		answer:
			"No. Creemos en el libre albedrío; escuchamos tu visión sin compromisos. La primera conversación es para entenderte, no para venderte.",
	},
];

export default function FAQSection() {
	return (
		<Accordion className="space-y-2">
			{faqs.map((faq) => (
				<AccordionItem
					key={faq.question}
					className="rounded-xl border border-border/40 bg-surface/50 px-6 transition-colors hover:border-primary/20 not-last:border-b-0"
				>
					<AccordionTrigger className="py-5 text-base font-semibold tracking-tight text-text hover:no-underline sm:text-lg">
						{faq.question}
					</AccordionTrigger>
					<AccordionContent className="text-muted">
						<p>{faq.answer}</p>
					</AccordionContent>
				</AccordionItem>
			))}
		</Accordion>
	);
}
