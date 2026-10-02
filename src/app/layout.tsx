import type { Metadata } from 'next';
import './globals.css';
import { StoreProvider } from '@/context/StoreContext';

export const metadata: Metadata = {
  metadataBase: new URL('https://manad-store.vercel.app'),
  title: 'MANAD STORE | Haute Joaillerie & Accessoires Casablanca • Maroc',
  description: 'Maison de bijoux et joaillerie fine à Casablanca. Bagues solitaires, colliers, bracelets et montres de luxe en or, argent 925 et acier chirurgical. Confection sur-mesure & paiement à la livraison (Cash on Delivery) partout au Maroc.',
  icons: {
    icon: '/brand/manad-logo.jpg',
    apple: '/brand/manad-logo.jpg',
  },
  openGraph: {
    title: 'MANAD STORE | Maison de Joaillerie & Accessoires Casablanca',
    description: 'Bijoux fins et créations sur-mesure à Casablanca. Livraison express dans toutes les villes du Maroc avec paiement à la livraison.',
    images: ['/brand/manad-logo.jpg'],
    locale: 'fr_FR',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className="scroll-smooth">
      <head>
        <link rel="icon" href="/brand/manad-logo.jpg" />
      </head>
      <body className="min-h-screen bg-white text-zinc-900 font-sans selection:bg-rose-100 selection:text-[#943859]">
        <StoreProvider>
          {children}
        </StoreProvider>
      </body>
    </html>
  );
}
