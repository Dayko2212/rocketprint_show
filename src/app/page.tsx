import Link from "next/link";
import Image from "next/image";
import { ROBOTIC_ARM_PRODUCT } from "@/lib/products";

export default function Home() {
  const product = ROBOTIC_ARM_PRODUCT;

  return (
    <div className="flex flex-col min-h-[80vh] relative bg-transparent overflow-hidden">
      {/* Subtle radial gradient */}
      <div className="absolute inset-0 z-0 dark:bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] dark:from-transparent dark:via-accent-blue/10 dark:to-background pointer-events-none" />

      {/* Hero Section */}
      <section className="relative z-10 text-foreground min-h-[60vh] flex flex-col items-center justify-center py-16">
        <div className="container mx-auto px-4 text-center">
          <div className="inline-block p-1 bg-gradient-to-r from-blue-500/20 to-orange-500/20 rounded-full mb-6">
            <span className="px-5 py-2 rounded-full bg-slate-950/80 backdrop-blur-md border border-card-border text-orange-400 font-bold tracking-widest text-sm uppercase">🚀 LE FUTUR DE LA CRÉATION</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8 leading-tight drop-shadow-2xl">
            L'univers de la création <br className="hidden md:block" />
            à portée de main avec <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-500 font-black">Rocket Print</span>
          </h1>

          <p className="text-xl md:text-2xl text-foreground/85 mb-12 max-w-3xl mx-auto font-medium leading-relaxed drop-shadow-lg">
            Propulsez vos projets avec nos kits de robots à assembler. Imprimés en 3D, propulsés par Arduino, conçus pour explorer l'infini.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <Link
              href={`/products/${product.slug}`}
              className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-400 hover:to-red-500 text-white px-10 py-5 rounded-2xl font-black text-xl transition-all shadow-[0_0_40px_-10px_rgba(249,115,22,0.6)] transform hover:-translate-y-1 hover:scale-105 flex items-center gap-2"
            >
              <span>🚀 Explorer les Systèmes</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Spotlight Product Section */}
      <section className="relative z-10 py-16 bg-gradient-to-b from-transparent to-background/50 flex-grow">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center mb-16">
            <h2 className="text-4xl font-black text-foreground tracking-tight uppercase flex items-center gap-4 text-center">
              <span className="w-8 h-8 rounded bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center">
                <span className="w-3 h-3 bg-background rounded-full"></span>
              </span>
              ÉQUIPEMENT RÉCENT
            </h2>
            <div className="w-48 h-1 bg-gradient-to-r from-orange-500 via-red-500 to-transparent mt-6 rounded-full"></div>
          </div>

          {/* Premium Showcase Layout */}
          <div className="max-w-6xl mx-auto bg-card-bg backdrop-blur-md rounded-[3rem] border border-card-border p-8 md:p-12 shadow-2xl flex flex-col lg:flex-row gap-12 items-center hover:shadow-orange-500/10 hover:border-orange-500/20 transition-all duration-500">
            {/* Left: Product Image */}
            <div className="w-full lg:w-1/2 relative group overflow-hidden rounded-[2rem] border border-card-border/60 aspect-[4/3] bg-surface-accent/20">
              <Image
                src={product.imageUrl}
                alt={product.name}
                fill
                priority
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute top-6 left-6 bg-background/80 backdrop-blur-md border border-card-border px-4 py-2 rounded-full shadow-lg">
                <span className="text-[10px] font-black uppercase text-orange-400 tracking-[0.2em]">Rendu Réaliste</span>
              </div>
            </div>

            {/* Right: Description & Specs */}
            <div className="w-full lg:w-1/2 flex flex-col justify-center">
              <div className="inline-block px-4 py-1.5 bg-orange-500/10 border border-orange-500/20 text-orange-400 rounded-full text-xs font-black uppercase tracking-wider mb-6 w-fit">
                Nouveauté exclusive
              </div>
              <h3 className="text-3xl md:text-4xl font-black text-foreground mb-6 leading-tight">
                {product.name}
              </h3>
              <p className="text-lg text-foreground/80 dark:text-foreground/70 mb-8 leading-relaxed font-medium">
                {product.description}
              </p>

              {/* Quick Specs */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="p-4 bg-surface-accent/30 border border-card-border/50 rounded-2xl">
                  <div className="text-orange-500 font-black text-xl mb-1">4 Axes</div>
                  <div className="text-xs text-foreground/60 font-bold uppercase tracking-wider">Servomoteurs</div>
                </div>
                <div className="p-4 bg-surface-accent/30 border border-card-border/50 rounded-2xl">
                  <div className="text-orange-500 font-black text-xl mb-1">Impression 3D</div>
                  <div className="text-xs text-foreground/60 font-bold uppercase tracking-wider">Structure Polymère</div>
                </div>
              </div>

              <div className="flex items-center justify-between border-t border-card-border pt-8 mt-4">
                <span className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-500 tracking-tight">
                  {product.price.toFixed(2)} €
                </span>
                <Link
                  href={`/products/${product.slug}`}
                  className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-400 hover:to-red-500 text-white font-black uppercase tracking-wider py-4 px-8 rounded-2xl shadow-[0_0_30px_-5px_rgba(249,115,22,0.6)] hover:scale-105 active:scale-95 transition-all text-sm flex items-center gap-2"
                >
                  <span>Manipuler en 3D</span>
                  <span className="text-xl">&rarr;</span>
                </Link>
              </div>
            </div>
          </div>

          {/* Bottom Catalog Button for vitrine representation */}
          <div className="flex justify-center mt-12">
            <Link
              href={`/products/${product.slug}`}
              className="bg-slate-900/60 backdrop-blur-md border border-card-border hover:border-orange-500/50 hover:bg-orange-500/10 text-foreground/80 hover:text-white font-black uppercase tracking-wider py-4 px-8 rounded-2xl transition-all text-sm flex items-center gap-2 shadow-lg"
            >
              <span>Ouvrir le Catalogue Complet</span>
              <span className="text-xl">&rarr;</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
