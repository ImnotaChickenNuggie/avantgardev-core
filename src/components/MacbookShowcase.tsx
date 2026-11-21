import type { ReactNode } from "react";
import { MacbookScroll } from "@/components/ui/macbook-scroll";

interface Props {
	src: string;
	title: ReactNode;
}

export default function MacbookShowcase({ src, title }: Props) {
	return (
		<div className="w-full overflow-hidden">
			<MacbookScroll title={title} src={src} showGradient={false} />
		</div>
	);
}
