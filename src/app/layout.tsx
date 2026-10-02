import type { Metadata } from 'next';
import './globals.css';
import { StoreProvider } from '@/context/StoreContext';

export const metadata: Metadata = {
  metadataBase: new URL('https://manad-store.vercel.app'),
  title: 'MANAD STORE | Haute Joaillerie & Accessoires • Maroc',
  description: 'Maison de haute joaillerie et bijoux raffinés au Maroc. Bagues solitaires, colliers, bracelets et montres de luxe en or, argent 925 et acier chirurgical. Confection sur-mesure & livraison express partout au Maroc avec paiement à la livraison (Cash on Delivery).',
  icons: {
    icon: '/brand/manad-logo.jpg',
    apple: '/brand/manad-logo.jpg',
  },
  openGraph: {
    title: 'MANAD STORE | Maison de Joaillerie & Accessoires • Maroc',
    description: 'Bijoux fins et créations sur-mesure. Livraison express dans tout le Maroc avec paiement en espèces à la livraison.',
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
      <body className="min-h-screen bg-white text-zinc-900 font-sans selection:bg-[#FAF3E0] selection:text-[#B89047]">
        <StoreProvider>
          {children}
        </StoreProvider>
      </body>
    </html>
  );
}
