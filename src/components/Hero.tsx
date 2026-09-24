'use client';

import React from 'react';
import { Sparkles, ArrowRight, ShieldCheck, Truck, RefreshCw } from 'lucide-react';

interface HeroProps {
  onExploreClick: () => void;
  onCustomClick: () => void;
}

export default function Hero({ onExploreClick, onCustomClick }: HeroProps) {
  return (
    <section className="relative bg-white pt-12 pb-20 md:pt-20 md:pb-28 overflow-hidden">
      {/* Subtle Luxury Gradient Background Elements - strictly non-intrusive */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-rose-50/40 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Subtle pill tag */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-50/70 border border-rose-200/50 mb-8">
          <span className="w-1.5 h-1.5 rounded-full bg-[#943859]" />
          <span className="text-[11px] uppercase tracking-[0.25em] text-[#943859] font-medium">
            Maison de Joaillerie • Casablanca
          </span>
        </div>

        {/* Editorial Heading - Steven Stone & Mango aesthetic */}
        <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light tracking-tight text-zinc-900 leading-[1.15] mb-6">
          L’art du détail. <br className="hidden sm:inline" />
          <span className="italic font-normal text-zinc-800">L’élégance</span> à fleur de peau.
        </h1>

        {/* Concise, non-dense subtitle */}
        <p className="max-w-2xl mx-auto text-base sm:text-lg text-zinc-500 font-light leading-relaxed mb-10">
          Créations joaillières raffinées en acier inoxydable 316L, argent 925 et or. 
          Commandez directement via WhatsApp avec <span className="text-zinc-800 font-normal">paiement à la livraison</span> dans toutes les villes du Maroc.
        </p>

        {/* Call-to-actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 mb-16">
          <button
            onClick={onExploreClick}
            className="w-full sm:w-auto px-8 py-4 bg-zinc-900 hover:bg-black text-white text-xs uppercase tracking-[0.2em] font-medium transition-all duration-300 shadow-sm hover:shadow-md flex items-center justify-center gap-2 group"
          >
            <span>Découvrir le Catalogue</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
          </button>

          <button
            onClick={onCustomClick}
            className="w-full sm:w-auto px-8 py-4 bg-white hover:bg-rose-50/60 text-[#943859] border border-rose-200 text-xs uppercase tracking-[0.2em] font-medium transition-all duration-300 flex items-center justify-center gap-2"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Création Sur-Mesure</span>
          </button>
        </div>

        {/* Trust Badges - Moroccan E-commerce reassure */}
        <div className="pt-10 border-t border-zinc-100 grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto text-left sm:text-center">
          <div className="flex items-center sm:flex-col sm:justify-center gap-3">
            <div className="w-9 h-9 rounded-full bg-zinc-50 flex items-center justify-center text-zinc-700 shrink-0">
              <Truck className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs uppercase tracking-wider font-semibold text-zinc-800">Livraison Express Maroc</p>
              <p className="text-[11px] text-zinc-400 mt-0.5">Casablanca sous 24h • Autres villes 24-48h</p>
            </div>
          </div>

          <div className="flex items-center sm:flex-col sm:justify-center gap-3">
            <div className="w-9 h-9 rounded-full bg-rose-50/80 flex items-center justify-center text-[#943859] shrink-0">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs uppercase tracking-wider font-semibold text-zinc-800">Cash on Delivery</p>
              <p className="text-[11px] text-zinc-400 mt-0.5">Payez à la livraison après vérification</p>
            </div>
          </div>

          <div className="flex items-center sm:flex-col sm:justify-center gap-3">
            <div className="w-9 h-9 rounded-full bg-zinc-50 flex items-center justify-center text-zinc-700 shrink-0">
              <RefreshCw className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs uppercase tracking-wider font-semibold text-zinc-800">Qualité Certifiée</p>
              <p className="text-[11px] text-zinc-400 mt-0.5">Inoxydable, résiste à l’eau et au parfum</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
