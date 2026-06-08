'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import ThemeToggle from './ThemeToggle'
import { playSound } from '@/lib/sounds'

export default function Header() {
    const pathname = usePathname()

    return (
        <header className="bg-background/80 backdrop-blur-md text-foreground sticky top-0 z-50 border-b border-card-border shadow-lg shadow-card-shadow">
            <div className="container mx-auto px-4 flex justify-between items-center h-20">
                <Link
                    href="/"
                    className="flex items-center gap-2 group"
                    onMouseEnter={() => playSound('hover')}
                    onClick={() => playSound('click')}
                >
                    <span className="text-3xl">🤖</span>
                    <span className="text-2xl font-black tracking-tighter uppercase text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-600 group-hover:from-orange-300 group-hover:to-orange-500 transition-all">
                        3D Bots
                    </span>
                </Link>
                <nav className="flex space-x-6 items-center font-bold text-xs uppercase tracking-widest">
                    <Link 
                        href="/" 
                        onMouseEnter={() => playSound('hover')} 
                        onClick={() => playSound('click')} 
                        className={`hidden lg:flex items-center px-4 h-8 rounded-full border border-card-border bg-surface-accent text-foreground/80 dark:text-foreground/70 hover:text-brand hover:bg-accent-blue/10 transition-all relative ${pathname === '/' ? 'border-orange-500/50' : ''}`}
                    >
                        Accueil
                        {pathname === '/' && (
                            <div className="absolute -bottom-1.5 inset-x-0 flex justify-center">
                                <div className="w-4 h-0.5 bg-orange-500 rounded-full shadow-[0_0_8px_rgba(249,115,22,0.8)]" />
                            </div>
                        )}
                    </Link>
                    <Link 
                        href="/products/bras-robotique" 
                        onMouseEnter={() => playSound('hover')} 
                        onClick={() => playSound('click')} 
                        className={`flex items-center px-4 h-8 rounded-full border border-card-border bg-surface-accent text-foreground/80 dark:text-foreground/70 hover:text-brand hover:bg-accent-blue/10 transition-all relative ${pathname === '/products/bras-robotique' ? 'border-orange-500/50' : ''}`}
                    >
                        Le Bras Robotique
                        {pathname === '/products/bras-robotique' && (
                            <div className="absolute -bottom-1.5 inset-x-0 flex justify-center">
                                <div className="w-4 h-0.5 bg-orange-500 rounded-full shadow-[0_0_8px_rgba(249,115,22,0.8)]" />
                            </div>
                        )}
                    </Link>

                    <ThemeToggle />
                </nav>
            </div>
        </header>
    )
}
