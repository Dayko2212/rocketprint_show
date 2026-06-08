import { notFound } from "next/navigation";
import AddToCartButton from "@/components/AddToCartButton";
import ProductModelViewer from "@/components/ProductModelViewer";
import { ROBOTIC_ARM_PRODUCT } from "@/lib/products";

// Add generateStaticParams for static export compatibility
export function generateStaticParams() {
    return [
        { slug: "bras-robotique" }
    ];
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    
    if (slug !== ROBOTIC_ARM_PRODUCT.slug) {
        return { title: 'Produit non trouvé' };
    }

    const product = ROBOTIC_ARM_PRODUCT;

    return {
        title: `${product.name} | 3D Bots`,
        description: product.description,
    };
}

export default async function ProductDetailsPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;

    if (slug !== ROBOTIC_ARM_PRODUCT.slug) {
        notFound();
    }

    const product = ROBOTIC_ARM_PRODUCT;

    return (
        <div className="bg-transparent min-h-[80vh] relative overflow-hidden">
            {/* Background Overlay */}
            <div
                className="absolute inset-0 z-0 opacity-20 mix-blend-screen bg-repeat pattern-overlay pointer-events-none"
                style={{ backgroundImage: "url('/galaxy_bg.png')", backgroundSize: "400px" }}
            />

            <div className="container mx-auto px-4 py-16 relative z-10">
                <div className="flex flex-col lg:flex-row gap-12 lg:gap-24">

                    <div className="w-full lg:w-1/2">
                        <ProductModelViewer modelUrl={product.modelUrl} />
                    </div>

                    <div className="w-full lg:w-1/2 flex flex-col justify-center py-6">
                        <nav className="text-sm mb-6 text-foreground/40 font-bold uppercase tracking-wider flex items-center space-x-3">
                            <a href="/" className="hover:text-orange-400 transition-colors">Accueil</a>
                            <span className="text-card-border">/</span>
                            <span className="text-orange-500 truncate">{product.name}</span>
                        </nav>

                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-foreground tracking-tight leading-tight mb-6 drop-shadow-lg">
                            {product.name}
                        </h1>
 
                        <div className="flex items-end space-x-4 mb-8">
                             <span className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-500 tracking-tight">
                                {product.price.toFixed(2)} €
                            </span>
                        </div>
 
                        <div className="text-foreground/70 mb-8 leading-relaxed text-lg font-medium">
                            <p>{product.description}</p>
                        </div>

                        {/* Kit Composition Section */}
                        {product.components && product.components.length > 0 && (
                            <div className="mb-10 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-150">
                                <h3 className="text-[10px] font-black uppercase text-orange-400 tracking-[0.3em] mb-4 flex items-center gap-2">
                                    <span className="w-8 h-[1px] bg-orange-400/30"></span>
                                    Composition du Kit
                                </h3>
                                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    {product.components.map((comp) => (
                                        <li key={comp.id} className="flex items-center gap-3 bg-card-bg border border-card-border p-3 rounded-xl hover:border-orange-500/30 transition-all group">
                                            <span className="flex-shrink-0 w-8 h-8 rounded-lg bg-surface-accent flex items-center justify-center text-xs font-black text-orange-500 group-hover:bg-orange-500 group-hover:text-white transition-colors">
                                                {comp.quantity}
                                            </span>
                                            <span className="text-sm text-foreground/60 group-hover:text-foreground transition-colors font-bold uppercase tracking-wide">
                                                {comp.name}
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        <div className="mt-auto bg-card-bg backdrop-blur-md p-8 rounded-[2rem] border border-card-border shadow-xl shadow-card-shadow">
                            <AddToCartButton product={product as any} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
