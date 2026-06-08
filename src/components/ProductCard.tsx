'use client'

import Link from 'next/link'
import { Product } from '@prisma/client'
import { useCartStore } from '@/store/cartStore'


interface ProductCardProps {
    product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
    const addItem = useCartStore((state) => state.addItem)

    const handleAddToCart = (e: React.MouseEvent) => {
        e.preventDefault()
        addItem({
            id: product.id,
            name: product.name,
            price: product.price,
            quantity: 1,
            imageUrl: product.imageUrl,
        })
        // Simple feedback, we could use react-hot-toast in a real app
        alert('Produit ajouté au panier !')
    }

    return (
        <div className="bg-card-bg rounded-3xl shadow-lg shadow-card-shadow border border-card-border overflow-hidden hover:shadow-orange-500/20 hover:border-orange-500/50 transition-all duration-300 group flex flex-col h-full backdrop-blur-md">
            <Link href={`/products/${product.slug}`} className="flex-grow flex flex-col">
                <div
                    className="h-64 bg-accent-blue/10 flex items-center justify-center relative bg-cover bg-center overflow-hidden border-b border-accent-blue/20"
                    style={{ backgroundImage: `url(${product.imageUrl || '/placeholder.png'})` }}
                >


                    {/* Add a subtle glow overlay on hover */}
                    <div className="absolute inset-0 bg-orange-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 mix-blend-overlay"></div>
                </div>

                <div className="p-6 flex flex-col flex-grow">
                    <div className="flex justify-between items-start mb-3">
                        <h3 className="text-xl font-black text-foreground group-hover:text-orange-400 transition-colors line-clamp-1">{product.name}</h3>
                    </div>
                    <p className="text-sm text-foreground/80 dark:text-foreground/70 line-clamp-2 flex-grow mb-6 leading-relaxed">{product.description}</p>

                    <div className="flex items-center justify-between mt-auto">
                        <div className="flex flex-col">
                            <span className="text-2xl font-black text-foreground">{product.price.toFixed(2)} €</span>
                            {product.stock <= 5 && product.stock > 0 && (
                                <span className="text-xs text-orange-400 font-bold uppercase tracking-wider mt-1 flex items-center gap-1">
                                    <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse"></span>
                                    {product.stock} restants
                                </span>
                            )}
                        </div>

                        <button
                            onClick={handleAddToCart}
                            disabled={product.stock <= 0}
                            className={`px-5 py-3 rounded-xl font-bold text-sm transition-all transform active:scale-95 ${product.stock > 0
                                ? 'bg-gradient-to-r from-orange-500 to-red-600 text-white hover:from-orange-400 hover:to-red-500 shadow-[0_0_20px_-5px_rgba(249,115,22,0.5)]'
                                : 'bg-accent-blue/20 text-foreground/30 cursor-not-allowed border border-accent-blue/10'
                                }`}
                        >
                            {product.stock > 0 ? 'Ajouter' : 'Épuisé'}
                        </button>
                    </div>
                </div>
            </Link>
        </div>
    )
}
