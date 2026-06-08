"use client";

import React, { Suspense, useState, useEffect, useRef } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { useTheme } from "next-themes";
import { useGLTF, OrbitControls, Center, Environment, ContactShadows } from "@react-three/drei";
import { playSound } from "@/lib/sounds";
import { ZoomIn, ZoomOut } from "lucide-react";
import * as THREE from "three";

function Model({ url }: { url: string }) {
    // useGLTF supports both .gltf and .glb files. 
    // Added draco: true to support compressed binary models.
    const { scene } = useGLTF(url, true);

    return <primitive object={scene} />;
}
// Fallback logic if no model is provided
function PlaceholderBox() {
    return (
        <mesh castShadow receiveShadow>
            <boxGeometry args={[2, 2, 2]} />
            <meshStandardMaterial color="#ff6600" metalness={0.6} roughness={0.2} />
        </mesh>
    );
}

// Internal component to manage camera state and FOV zoom
function CameraController({ zoom }: { zoom: number }) {
    const { camera } = useThree();

    useEffect(() => {
        if (camera instanceof THREE.PerspectiveCamera) {
            // Optical zoom simulation via FOV
            camera.fov = 45 / zoom;
            camera.updateProjectionMatrix();
        }
    }, [camera, zoom]);

    return null;
}

interface ProductModelViewerProps {
    modelUrl?: string | null;
}

export default function ProductModelViewer({ modelUrl }: ProductModelViewerProps) {
    const { theme } = useTheme();
    const [zoom, setZoom] = useState(1);

    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const handleWheelManual = (e: WheelEvent) => {
            e.preventDefault();
            const delta = e.deltaY * -0.001;
            setZoom((prev) => {
                const newZoom = prev + delta;
                return Math.min(Math.max(newZoom, 0.5), 3);
            });
        };

        container.addEventListener('wheel', handleWheelManual, { passive: false });
        return () => container.removeEventListener('wheel', handleWheelManual);
    }, []);

    return (
        <div className="flex flex-col gap-6 w-full">
            <div
                ref={containerRef}
                className="relative aspect-square w-full bg-background/80 backdrop-blur-xl rounded-[3rem] border border-card-border shadow-2xl overflow-hidden group"
            >

                {/* HUD: Title Overlay */}
                <div className="absolute top-8 left-8 z-30 flex flex-col gap-4 pointer-events-none">
                    <div className="bg-background/80 backdrop-blur-md border border-card-border px-5 py-2.5 rounded-full shadow-2xl">
                        <span className="text-[10px] font-black uppercase text-orange-400 tracking-[0.2em]">Scanner Holographique</span>
                    </div>
                </div>

                {/* Horizontal Zoom Bar at bottom center */}
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex items-center gap-6 bg-background/80 backdrop-blur-lg p-4 rounded-full border border-card-border shadow-2xl opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                    <button
                        onClick={() => { playSound('click'); setZoom(prev => Math.max(prev - 0.2, 0.5)); }}
                        className="text-foreground/40 hover:text-brand transition-all active:scale-90"
                    >
                        <ZoomOut size={20} />
                    </button>

                    <div className="w-48 flex items-center px-2">
                        <input
                            type="range"
                            min="0.5"
                            max="3"
                            step="0.01"
                            value={zoom}
                            onChange={(e) => setZoom(parseFloat(e.target.value))}
                            onMouseEnter={() => playSound('hover')}
                            className="w-full h-1 bg-accent-blue/20 rounded-lg appearance-none cursor-pointer accent-orange-500 shadow-[0_0_10px_rgba(249,115,22,0.3)]"
                        />
                    </div>

                    <button
                        onClick={() => { playSound('click'); setZoom(prev => Math.min(prev + 0.2, 3)); }}
                        className="text-foreground/40 hover:text-orange-400 transition-all active:scale-90"
                    >
                        <ZoomIn size={20} />
                    </button>
                </div>

                {/* Navigation Legend HUD (Bottom left) */}
                <div className="absolute bottom-8 left-8 z-30 flex flex-col gap-2 translate-y-[10px] opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-700 delay-100">
                    <div className="bg-background/40 backdrop-blur-md border border-card-border p-3 rounded-[2rem] shadow-2xl flex flex-col gap-2 scale-90 origin-bottom-left">
                        {/* Rotation: Left Click */}
                        <div className="flex items-center gap-3">
                            <div className="w-5 h-7 rounded-sm border-[1.5px] border-foreground/30 relative overflow-hidden bg-foreground/5">
                                <div className="absolute top-0 left-0 w-1/2 h-2/5 border-b border-r border-foreground/30 bg-orange-500/60" /> {/* Left Button Highlight */}
                                <div className="absolute top-0 right-0 w-1/2 h-2/5 border-b border-foreground/30" /> {/* Right Button */}
                                <div className="absolute top-[1px] left-1/2 -translate-x-1/2 w-[3px] h-[5px] bg-foreground/30 rounded-full" /> {/* Wheel */}
                            </div>
                            <span className="text-[9px] font-black uppercase text-foreground/50 tracking-wider">Rotation</span>
                        </div>
                        {/* Translation: Right Click */}
                        <div className="flex items-center gap-3">
                            <div className="w-5 h-7 rounded-sm border-[1.5px] border-foreground/30 relative overflow-hidden bg-foreground/5">
                                <div className="absolute top-0 left-0 w-1/2 h-2/5 border-b border-r border-foreground/30" /> {/* Left Button */}
                                <div className="absolute top-0 right-0 w-1/2 h-2/5 border-b border-foreground/30 bg-orange-500/60" /> {/* Right Button Highlight */}
                                <div className="absolute top-[1px] left-1/2 -translate-x-1/2 w-[3px] h-[5px] bg-foreground/30 rounded-full" /> {/* Wheel */}
                            </div>
                            <span className="text-[9px] font-black uppercase text-foreground/50 tracking-wider">Translation</span>
                        </div>
                        {/* Zoom: Scroll Wheel */}
                        <div className="flex items-center gap-3">
                            <div className="w-5 h-7 rounded-sm border-[1.5px] border-foreground/30 relative overflow-hidden bg-foreground/5">
                                <div className="absolute top-0 left-0 w-1/2 h-2/5 border-b border-r border-foreground/30" /> {/* Left Button */}
                                <div className="absolute top-0 right-0 w-1/2 h-2/5 border-b border-foreground/30" /> {/* Right Button */}
                                <div className="absolute top-[1px] left-1/2 -translate-x-1/2 w-[3px] h-[6px] bg-orange-500 rounded-full shadow-[0_0_8px_orange]" /> {/* Larger Wheel Highlight */}
                            </div>
                            <span className="text-[9px] font-black uppercase text-foreground/50 tracking-wider">Zoom</span>
                        </div>
                    </div>
                </div>



                {/* 3D Scene */}
                <Canvas dpr={[1, 2]} camera={{ fov: 45, position: [4, 4, 4] }} shadows>
                    <color attach="background" args={[theme === 'light' ? '#f0f9ff' : '#050810']} />
                    <Suspense fallback={null}>
                        <CameraController zoom={zoom} />

                        <Center top>
                            {modelUrl ? (
                                <Model url={modelUrl} />
                            ) : (
                                <PlaceholderBox />
                            )}
                        </Center>

                        <OrbitControls
                            makeDefault
                            enablePan={true}
                            enableZoom={false} // Disabled independent zoom
                            dampingFactor={0.1}
                            rotateSpeed={0.8}
                            panSpeed={0.8}
                        />

                        <Environment preset="city" />
                        <ContactShadows
                            opacity={0.2}
                            scale={20}
                            blur={3.5}
                            far={10}
                            resolution={1024}
                            color="#000000"
                            position={[0, -0.01, 0]}
                        />
                        {/* Real shadow catcher plane with softer falloff */}
                        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]} receiveShadow>
                            <planeGeometry args={[30, 30]} />
                            <shadowMaterial transparent opacity={0.08} />
                        </mesh>
                        <ambientLight intensity={0.5} />
                        <spotLight 
                            position={[10, 15, 10]} 
                            angle={0.3} 
                            penumbra={1} 
                            intensity={2.5} 
                            castShadow 
                            shadow-mapSize={[2048, 2048]}
                        />
                        <pointLight position={[-10, 5, -10]} intensity={0.4} color="#ffffff" />
                    </Suspense>
                </Canvas>


            </div>

            {!modelUrl && (
                <div className="flex items-center justify-center gap-3 py-2">
                    <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-accent-blue/20"></div>
                    <p className="text-[9px] font-black text-foreground/40 uppercase tracking-[0.4em] text-center">
                        Vue Tactique Standard • Proxy Opérationnel
                    </p>
                    <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent to-accent-blue/20"></div>
                </div>
            )}
        </div>
    );
}
