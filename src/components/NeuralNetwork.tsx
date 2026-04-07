import { useEffect, useRef } from "react";

interface Node {
	x: number;
	y: number;
	vx: number;
	vy: number;
	radius: number;
}

export default function NeuralNetwork() {
	const canvasRef = useRef<HTMLCanvasElement>(null);

	useEffect(() => {
		const canvas = canvasRef.current;
		if (!canvas) return;

		const ctx = canvas.getContext("2d");
		if (!ctx) return;

		let animationId: number;
		const nodes: Node[] = [];
		const nodeCount = 60;
		const connectionDistance = 150;

		const resize = () => {
			const rect = canvas.getBoundingClientRect();
			canvas.width = rect.width * window.devicePixelRatio;
			canvas.height = rect.height * window.devicePixelRatio;
			ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
		};

		const initNodes = () => {
			const rect = canvas.getBoundingClientRect();
			nodes.length = 0;
			for (let i = 0; i < nodeCount; i++) {
				nodes.push({
					x: Math.random() * rect.width,
					y: Math.random() * rect.height,
					vx: (Math.random() - 0.5) * 0.6,
					vy: (Math.random() - 0.5) * 0.6,
					radius: Math.random() * 2 + 1,
				});
			}
		};

		const draw = () => {
			const rect = canvas.getBoundingClientRect();
			const w = rect.width;
			const h = rect.height;

			ctx.clearRect(0, 0, w, h);

			for (const node of nodes) {
				node.x += node.vx;
				node.y += node.vy;

				if (node.x < 0 || node.x > w) node.vx *= -1;
				if (node.y < 0 || node.y > h) node.vy *= -1;
			}

			for (let i = 0; i < nodes.length; i++) {
				for (let j = i + 1; j < nodes.length; j++) {
					const dx = nodes[i].x - nodes[j].x;
					const dy = nodes[i].y - nodes[j].y;
					const dist = Math.sqrt(dx * dx + dy * dy);

					if (dist < connectionDistance) {
						const opacity = 1 - dist / connectionDistance;
						const useNeon = (i + j) % 7 === 0;
						ctx.beginPath();
						ctx.moveTo(nodes[i].x, nodes[i].y);
						ctx.lineTo(nodes[j].x, nodes[j].y);
						ctx.strokeStyle = useNeon
							? `rgba(57, 255, 20, ${opacity * 0.3})`
							: `rgba(124, 58, 237, ${opacity * 0.25})`;
						ctx.lineWidth = opacity * 1.2;
						ctx.stroke();
					}
				}
			}

			for (const node of nodes) {
				ctx.beginPath();
				ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
				ctx.fillStyle = node.radius > 2 ? "rgba(57, 255, 20, 0.8)" : "rgba(124, 58, 237, 0.6)";
				ctx.fill();

				if (node.radius > 2) {
					ctx.beginPath();
					ctx.arc(node.x, node.y, node.radius + 4, 0, Math.PI * 2);
					ctx.fillStyle = "rgba(57, 255, 20, 0.1)";
					ctx.fill();
				}
			}

			animationId = requestAnimationFrame(draw);
		};

		resize();
		initNodes();
		draw();

		window.addEventListener("resize", () => {
			resize();
			initNodes();
		});

		return () => {
			cancelAnimationFrame(animationId);
		};
	}, []);

	return (
		<canvas
			ref={canvasRef}
			className="absolute inset-0 size-full opacity-60"
			tabIndex={-1}
			aria-hidden="true"
		/>
	);
}
