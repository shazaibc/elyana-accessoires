import type { Metadata } from 'next';
import './globals.css';
import { StoreProvider } from '@/context/StoreContext';

export const metadata: Metadata = {
  metadataBase: new URL('https://elyana-accessoires.vercel.app'),
  title: 'Elyana Accessoires | Bijoux & Joaillerie Casablanca • Livraison Partout au Maroc',
  description: 'Maison de bijoux et accessoires fins à Casablanca. Bagues, colliers, bracelets, créoles et montres en or, argent 925 et acier chirurgical. Confection sur-mesure & paiement à la livraison (Cash on Delivery) partout au Maroc.',
  icons: {
    icon: '/brand/elyana-logo.jpg',
    apple: '/brand/elyana-logo.jpg',
  },
  openGraph: {
    title: 'Elyana Accessoires | Bijoux de Luxe & Accessoires Casablanca',
    description: 'Bijoux fins et créations sur-mesure à Casablanca. Livraison express dans toutes les villes du Maroc avec paiement à la livraison.',
    images: ['/brand/elyana-logo.jpg'],
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
        <link rel="icon" href="/brand/elyana-logo.jpg" />
      </head>
      <body className="min-h-screen bg-white text-zinc-900 font-sans selection:bg-rose-100 selection:text-[#943859]">
        <StoreProvider>
          {children}
        </StoreProvider>
      </body>
    </html>
  );
}
