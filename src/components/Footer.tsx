export default function Footer() {
    return (
        <footer className="bg-background relative z-20 text-foreground/50 py-12 border-t border-card-border mt-auto">
            <div className="container mx-auto px-4 text-center">
                <div className="flex justify-center items-center gap-2 mb-4 opacity-50">
                    <span className="text-2xl">🤖</span>
                    <span className="text-xl font-black tracking-tighter uppercase text-foreground/70">3D Bots</span>
                </div>
                <p className="text-sm mb-6 max-w-md mx-auto leading-relaxed">Créateur de systèmes robotiques d'avant-garde. Impressions 3D de précision et kits éducatifs pour éveiller le génie de vos enfants.</p>
                <div className="w-16 h-px bg-orange-500/30 mx-auto mb-6"></div>
                <div className="flex justify-center flex-wrap gap-8 mb-8">
                    <a href="/" className="text-xs font-black uppercase tracking-widest hover:text-orange-400 transition-colors">Accueil</a>
                    <a href="/products/bras-robotique" className="text-xs font-black uppercase tracking-widest hover:text-orange-400 transition-colors">Le Bras Robotique</a>
                </div>
                <p className="text-xs tracking-widest uppercase">&copy; {new Date().getFullYear()} 3D BOTS. Tous systèmes opérationnels.</p>
            </div>
        </footer>
    )
}
