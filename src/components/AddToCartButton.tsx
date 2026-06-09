'use client'

import { Mail } from 'lucide-react'
import { playSound } from '@/lib/sounds'

export default function AddToCartButton({ product }: { product?: any }) {
    const handleContact = () => {
        playSound('click');
        const subject = encodeURIComponent(`Demande d'information - ${product?.name || "Bras Robotique"}`);
        window.location.href = `mailto:contact.rocketprint@gmail.com?subject=${subject}`;
    }

    return (
        <div className="space-y-6">
            <div className="flex flex-col space-y-3">
                <div className="flex justify-between items-center">
                    <label className="text-foreground/60 font-bold uppercase tracking-wider text-sm flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-orange-500 blur-[1px] animate-pulse"></span>
                        Statut du projet :
                    </label>
                    <span className="text-xs text-orange-400 font-black bg-orange-500/10 border border-orange-500/20 px-3 py-1 rounded-full uppercase tracking-widest flex items-center gap-1.5 shadow-inner">
                        Vitrine technologique
                    </span>
                </div>
            </div>

            <div className="bg-surface-accent/30 border border-card-border p-4 rounded-xl text-center text-sm font-medium text-foreground/80 leading-relaxed">
                Ce site est une présentation de notre bras robotique de précision. Les ventes en ligne ne sont pas encore ouvertes au public.
            </div>

            <button
                onClick={handleContact}
                className="w-full bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-400 hover:to-red-500 text-white font-black uppercase tracking-wider py-5 px-6 rounded-2xl shadow-[0_0_30px_-5px_rgba(249,115,22,0.6)] border-b-4 border-red-800 active:translate-y-[4px] active:border-b-0 active:mt-[4px] flex justify-center items-center gap-3 transition-all text-xl group"
            >
                <Mail className="group-hover:scale-110 transition-transform" />
                <span>Nous Contacter</span>
            </button>
        </div>
    )
}
