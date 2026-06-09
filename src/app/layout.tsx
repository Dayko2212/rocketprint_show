import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/Providers";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AnimatedBackground from "@/components/AnimatedBackground";
import PageTransition from "@/components/PageTransition";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "RocketPrint | L'univers de la création à portée de main",
  description: "Propulsez vos projets avec nos impressions 3D de précision et nos kits de robots.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} min-h-screen flex flex-col selection:bg-orange-500/30 selection:text-orange-200 antialiased overflow-x-hidden transition-colors duration-300`}>
        <div className="relative z-10 flex flex-col min-h-screen">
          <Providers>
            <AnimatedBackground />
            {/* Backdrop Blur Overlay above the animated background canvas but below main content */}
            <div className="fixed inset-0 backdrop-blur-[2px] bg-slate-950/20 pointer-events-none -z-10" />
            <Header />
            <main className="flex-grow">
              <PageTransition>
                {children}
              </PageTransition>
            </main>
            <Footer />
          </Providers>
        </div>
      </body>
    </html>
  );
}
