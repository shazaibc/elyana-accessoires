'use client';

import React from 'react';
import { ArrowRight } from 'lucide-react';
import {
  CourierBoxIcon,
  BanknoteShieldIcon,
  CertifiedHallmarkIcon,
  AtelierCompassIcon,
  FacetedDiamondIcon
} from '@/components/icons/LuxuryIcons';

interface HeroProps {
  onExploreClick: () => void;
  onCustomClick: () => void;
}

export default function Hero({ onExploreClick, onCustomClick }: HeroProps) {
  return (
    <section className="relative bg-white pt-16 pb-20 md:pt-24 md:pb-28 overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Clean Editorial Tag - No generic pills */}
        <div className="flex items-center justify-center gap-3 mb-8">
          <span className="h-px w-8 bg-zinc-200" />
          <div className="flex items-center gap-2">
            <FacetedDiamondIcon className="w-3.5 h-3.5 text-[#943859]" />
            <span className="text-[11px] uppercase tracking-[0.3em] text-zinc-500 font-medium">
              Maison de Joaillerie • Casablanca
            </span>
          </div>
          <span className="h-px w-8 bg-zinc-200" />
        </div>

        {/* Editorial Heading - Steven Stone & Mango aesthetic */}
        <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light tracking-tight text-zinc-900 leading-[1.12] mb-6">
          L’art du détail. <br className="hidden sm:inline" />
          <span className="italic font-normal text-zinc-800">L’élégance</span> à fleur de peau.
        </h1>

        {/* Concise, non-dense subtitle */}
        <p className="max-w-2xl mx-auto text-base sm:text-lg text-zinc-500 font-light leading-relaxed mb-12">
          Créations joaillières raffinées en acier inoxydable 316L, argent 925 et or. 
          Commandez directement via WhatsApp avec <span className="text-zinc-800 font-normal">paiement à la livraison</span> dans toutes les villes du Maroc.
        </p>

        {/* Call-to-actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-5 mb-20">
          <button
            onClick={onExploreClick}
            className="w-full sm:w-auto px-8 py-4 bg-zinc-900 hover:bg-black text-white text-xs uppercase tracking-[0.2em] font-medium transition-all duration-300 shadow-xs flex items-center justify-center gap-2.5 group cursor-pointer"
          >
            <span>Découvrir le Catalogue</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
          </button>

          <button
            onClick={onCustomClick}
            className="w-full sm:w-auto px-8 py-4 bg-white hover:bg-zinc-50 text-zinc-900 border border-zinc-300 hover:border-zinc-900 text-xs uppercase tracking-[0.2em] font-medium transition-all duration-300 flex items-center justify-center gap-2.5 cursor-pointer"
          >
            <AtelierCompassIcon className="w-4 h-4 text-[#943859]" />
            <span>Création Sur-Mesure</span>
          </button>
        </div>

        {/* 21st.dev Style Editorial Trust Grid - No generic pill badges */}
        <div className="border-t border-b border-zinc-100 py-8 grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-4 max-w-4xl mx-auto">
          {/* Item 1 */}
          <div className="flex flex-col items-center text-center px-4">
            <div className="text-[#943859] mb-3">
              <CourierBoxIcon className="w-5 h-5 stroke-[1.25]" />
            </div>
            <p className="text-xs uppercase tracking-widest font-medium text-zinc-900">
              Livraison Express Maroc
            </p>
            <p className="text-[11px] text-zinc-400 font-light mt-1">
              Casablanca sous 24h • Autres villes 24-48h
            </p>
          </div>

          {/* Item 2 */}
          <div className="flex flex-col items-center text-center px-4 sm:border-x sm:border-zinc-100">
            <div className="text-[#943859] mb-3">
              <BanknoteShieldIcon className="w-5 h-5 stroke-[1.25]" />
            </div>
            <p className="text-xs uppercase tracking-widest font-medium text-zinc-900">
              Cash on Delivery
            </p>
            <p className="text-[11px] text-zinc-400 font-light mt-1">
              Paiement à la livraison après vérification
            </p>
          </div>

          {/* Item 3 */}
          <div className="flex flex-col items-center text-center px-4">
            <div className="text-[#943859] mb-3">
              <CertifiedHallmarkIcon className="w-5 h-5 stroke-[1.25]" />
            </div>
            <p className="text-xs uppercase tracking-widest font-medium text-zinc-900">
              Qualité Certifiée
            </p>
            <p className="text-[11px] text-zinc-400 font-light mt-1">
              Inoxydable, résiste à l’eau et au parfum
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
