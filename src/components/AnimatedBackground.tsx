"use client";

import React, { useEffect, useRef } from "react";
import { useTheme } from "next-themes";

interface Node {
    x: number;
    y: number;
    connections: number[];
}

interface Pulse {
    path: number[];
    progress: number;
    speed: number;
}

export default function AnimatedBackground() {
    const { theme } = useTheme();
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const mouseRef = useRef({ x: -1000, y: -1000 });

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let animationFrameId: number;
        let nodes: Node[] = [];
        const pulses: Pulse[] = [];
        const gridSize = 100;

        const isLight = theme === "light";

        const init = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;

            // Generate nodes in a grid with some randomness
            nodes = [];
            for (let x = 0; x < canvas.width + gridSize; x += gridSize) {
                for (let y = 0; y < canvas.height + gridSize; y += gridSize) {
                    nodes.push({
                        x: x + (Math.random() - 0.5) * gridSize * 0.5,
                        y: y + (Math.random() - 0.5) * gridSize * 0.5,
                        connections: [],
                    });
                }
            }

            // Create connections (circuit lines)
            nodes.forEach((node, i) => {
                const nearNodes = nodes
                    .map((n, idx) => ({ idx, dist: Math.hypot(n.x - node.x, n.y - node.y) }))
                    .filter((n) => n.dist > 0 && n.dist < gridSize * 1.5)
                    .sort((a, b) => a.dist - b.dist)
                    .slice(0, 2);

                nearNodes.forEach((near) => {
                    if (!node.connections.includes(near.idx)) {
                        node.connections.push(near.idx);
                    }
                });
            });
        };

        const createPulse = () => {
            if (nodes.length === 0) return;
            let startIndex = Math.floor(Math.random() * nodes.length);
            const path = [startIndex];

            for (let i = 0; i < 5; i++) {
                const nextIndices = nodes[startIndex].connections;
                if (nextIndices.length === 0) break;
                const next = nextIndices[Math.floor(Math.random() * nextIndices.length)];
                path.push(next);
                startIndex = next;
            }

            if (path.length > 1) {
                pulses.push({ path, progress: 0, speed: 0.005 + Math.random() * 0.01 });
            }
        };

        const drawLightning = (x1: number, y1: number, x2: number, y2: number) => {
            const dist = Math.hypot(x2 - x1, y2 - y1);
            const steps = Math.floor(dist / 10);

            ctx.beginPath();
            ctx.moveTo(x1, y1);

            for (let i = 1; i < steps; i++) {
                const tx = x1 + (x2 - x1) * (i / steps) + (Math.random() - 0.5) * 15;
                const ty = y1 + (y2 - y1) * (i / steps) + (Math.random() - 0.5) * 15;
                ctx.lineTo(tx, ty);
            }

            ctx.lineTo(x2, y2);
            ctx.strokeStyle = isLight ? "rgba(0, 165, 233, 0.6)" : "rgba(180, 220, 255, 0.4)";
            ctx.lineWidth = isLight ? 1.5 : 1;
            ctx.shadowBlur = 5;
            ctx.shadowColor = isLight ? "rgba(0, 165, 233, 0.5)" : "#00ffff";
            ctx.stroke();
            ctx.shadowBlur = 0;
        };

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Draw static circuits - Slightly more visible
            ctx.strokeStyle = isLight ? "rgba(0, 165, 233, 0.25)" : "rgba(60, 80, 120, 0.25)";
            ctx.lineWidth = 1;
            nodes.forEach((node) => {
                node.connections.forEach((connIdx) => {
                    const target = nodes[connIdx];
                    ctx.beginPath();
                    ctx.moveTo(node.x, node.y);
                    ctx.lineTo(target.x, target.y);
                    ctx.stroke();
                });

                ctx.fillStyle = isLight ? "rgba(0, 165, 233, 0.3)" : "rgba(60, 80, 120, 0.4)";
                ctx.beginPath();
                ctx.arc(node.x, node.y, 1.5, 0, Math.PI * 2);
                ctx.fill();
            });

            // Update and draw pulses (electricity bands) - More frequent
            if (Math.random() < 0.08) createPulse();

            for (let i = pulses.length - 1; i >= 0; i--) {
                const p = pulses[i];
                p.progress += p.speed;

                if (p.progress >= p.path.length - 1) {
                    pulses.splice(i, 1);
                    continue;
                }

                const currentSegment = Math.floor(p.progress);
                const segmentProgress = p.progress - currentSegment;

                const n1 = nodes[p.path[currentSegment]];
                const n2 = nodes[p.path[currentSegment + 1]];

                const px = n1.x + (n2.x - n1.x) * segmentProgress;
                const py = n1.y + (n2.y - n1.y) * segmentProgress;

                // Draw glow
                const grad = ctx.createRadialGradient(px, py, 0, px, py, 15);
                grad.addColorStop(0, "rgba(249, 115, 22, 0.9)"); // High-tech Orange (Tailwind orange-500)
                grad.addColorStop(0.5, "rgba(194, 65, 12, 0.4)");
                grad.addColorStop(1, "rgba(124, 45, 18, 0)");

                ctx.fillStyle = grad;
                ctx.beginPath();
                ctx.arc(px, py, 15, 0, Math.PI * 2);
                ctx.fill();

                // Draw point
                ctx.fillStyle = "#fb923c"; // orange-400
                ctx.beginPath();
                ctx.arc(px, py, 2, 0, Math.PI * 2);
                ctx.fill();
            }

            // Interactive Lightning - Increased range and more arcs
            const nearbyNodes = nodes
                .map((n, idx) => ({ idx, dist: Math.hypot(n.x - mouseRef.current.x, n.y - mouseRef.current.y) }))
                .filter((n) => n.dist < 120)
                .sort((a, b) => a.dist - b.dist)
                .slice(0, 3);

            nearbyNodes.forEach((near) => {
                drawLightning(mouseRef.current.x, mouseRef.current.y, nodes[near.idx].x, nodes[near.idx].y);

                // Spark at node
                ctx.fillStyle = isLight ? "#0096ff" : "#fff";
                ctx.beginPath();
                ctx.arc(nodes[near.idx].x, nodes[near.idx].y, 2.5, 0, Math.PI * 2);
                ctx.fill();
            });

            animationFrameId = requestAnimationFrame(animate);
        };

        init();
        animate();

        const handleMouseMove = (e: MouseEvent) => {
            mouseRef.current = { x: e.clientX, y: e.clientY };
        };

        const handleResize = () => {
            init();
        };

        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("resize", handleResize);

        return () => {
            cancelAnimationFrame(animationFrameId);
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("resize", handleResize);
        };
    }, [theme]);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 pointer-events-none -z-10"
        />
    );
}
