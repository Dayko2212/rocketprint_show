"use client";

import React from "react";
import { Cpu, Box, CheckCircle2, Truck, Activity, Hammer } from "lucide-react";

interface RoboticsTrackingProps {
    step: number; // 0 to 4
}

const steps = [
    { label: "Commande Reçue", icon: Box, description: "Validation effectuée au centre de contrôle." },
    { label: "Optimisation Hardware", icon: Hammer, description: "Nos techniciens préparent vos châssis et circuits." },
    { label: "Tests de Calibration", icon: Activity, description: "Vérification des servos et de la télémétrie." },
    { label: "Expédition Finale", icon: Truck, description: "Le module robotique est en route vers votre laboratoire." },
    { label: "Déploiement Réussi", icon: CheckCircle2, description: "Système livré. Prêt à l'initialisation !" },
];

export default function RoboticsTracking({ step }: RoboticsTrackingProps) {
    return (
        <div className="w-full py-12 px-4">
            <div className="relative flex justify-between">
                {/* Progress Line */}
                <div className="absolute top-1/2 left-0 w-full h-1 bg-card-border/50 -translate-y-1/2 z-0"></div>
                <div
                    className="absolute top-1/2 left-0 h-1 bg-gradient-to-r from-orange-500 to-red-600 -translate-y-1/2 z-0 transition-all duration-1000"
                    style={{ width: `${(step / (steps.length - 1)) * 100}%` }}
                ></div>

                {steps.map((s, i) => {
                    const Icon = s.icon;
                    const isActive = i <= step;
                    const isCurrent = i === step;

                    return (
                        <div key={i} className="relative z-10 flex flex-col items-center group">
                            <div
                                className={`w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all duration-500 ${isActive
                                        ? "bg-background border-orange-500 text-orange-400 shadow-[0_0_20px_rgba(249,115,22,0.4)]"
                                        : "bg-surface-accent border-card-border text-foreground/20"
                                    } ${isCurrent ? "scale-110 animate-pulse" : ""}`}
                            >
                                <Icon size={24} />
                            </div>

                            <div className="absolute top-16 w-32 text-center">
                                <p className={`text-[10px] font-black uppercase tracking-tighter mb-1 ${isActive ? "text-foreground" : "text-foreground/30"}`}>
                                    {s.label}
                                </p>
                                {isCurrent && (
                                    <p className="text-[9px] text-orange-400 font-medium leading-tight animate-fade-in uppercase">
                                        {s.description}
                                    </p>
                                )}
                            </div>

                            {/* Special Spark Effect for Current Step */}
                            {isCurrent && i < 4 && (
                                <div className="absolute -top-4 text-xs animate-bounce">
                                    ⚡
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>

            {/* Visual Scene */}
            <div className="mt-24 h-32 bg-surface-accent/30 rounded-3xl border border-card-border relative overflow-hidden flex items-center justify-center">
                <div className="absolute inset-0 opacity-10 bg-[url('/grid_bg.png')] bg-center bg-repeat"></div>
                <div className="relative flex items-center gap-20">
                    <div className="flex flex-col items-center gap-2">
                        <Cpu className="text-blue-500/50" size={32} />
                        <span className="text-[10px] font-bold text-foreground/40 uppercase">Atelier 3D Bots</span>
                    </div>

                    <div className="relative w-64 h-px border-t border-dashed border-card-border">
                        <div
                            className="absolute -top-4 transition-all duration-1000flex items-center justify-center"
                            style={{ left: `${(step / (steps.length - 1)) * 100}%`, transform: 'translateX(-50%)' }}
                        >
                            <Box className="text-orange-500" size={32} />
                        </div>
                    </div>

                    <div className="flex flex-col items-center gap-2">
                        <Box className="text-orange-500/50" size={32} />
                        <span className="text-[10px] font-bold text-foreground/40 uppercase">Labo Client</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
