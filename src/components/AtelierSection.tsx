'use client';

import React from 'react';
import Image from 'next/image';
import { MapPin, Clock } from 'lucide-react';
import {
  FacetedDiamondIcon,
  CertifiedHallmarkIcon,
  Instagram21stIcon,
  WhatsApp21stIcon
} from '@/components/icons/LuxuryIcons';
import { useStore } from '@/context/StoreContext';

export default function AtelierSection() {
  const { settings } = useStore();

  return (
    <section className="py-24 bg-[#FAFAFA] border-t border-zinc-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left Column: Visual Collage */}
          <div className="relative">
            <div className="relative aspect-[4/5] w-full max-w-md mx-auto bg-zinc-100 overflow-hidden shadow-lg border border-zinc-200">
              <Image
                src="https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=1000&q=85"
                alt="Atelier Manad Store Maroc"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <span className="text-[10px] uppercase tracking-widest bg-white/20 backdrop-blur-xs px-2.5 py-1 border border-white/30 inline-block mb-2">
                  Royaume du Maroc
                </span>
                <p className="font-serif text-lg font-light">
                  Livraison Express Nationale
                </p>
                <p className="text-xs text-white/80 font-light mt-0.5">
                  Expédition rapide 24h à 48h dans toutes les villes
                </p>
              </div>
            </div>

            {/* Floating accent card - Clean 21st.dev style without pills */}
            <div className="hidden sm:block absolute -bottom-6 -right-6 bg-white p-5 shadow-md border border-zinc-200 max-w-xs">
              <div className="flex items-start gap-3">
                <div className="text-[#B89047] shrink-0 mt-0.5">
                  <CertifiedHallmarkIcon className="w-5 h-5 stroke-[1.25]" />
                </div>
                <div>
                  <p className="text-xs font-medium text-zinc-900 uppercase tracking-wider">Acier 316L & Or</p>
                  <p className="text-[11px] text-zinc-500 font-light mt-0.5">Résistance certifiée à l’eau et au parfum</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Narrative */}
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.25em] text-[#B89047] font-medium">
              <FacetedDiamondIcon className="w-3.5 h-3.5" />
              <span>Notre Histoire</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light text-zinc-900 tracking-tight leading-tight">
              Haute Joaillerie & Raffinement, <br />
              <span className="italic font-normal text-zinc-800">Livrés chez vous</span> partout au Maroc.
            </h2>

            <p className="text-zinc-600 font-light text-sm sm:text-base leading-relaxed">
              La maison <strong>Manad Store</strong> s’est donnée pour mission d’offrir des bijoux et accessoires de caractère, alliant l’éclat précieux des plus grands joailliers à la résistance absolue de l’acier inoxydable et de l’argent 925.
            </p>

            <p className="text-zinc-600 font-light text-sm sm:text-base leading-relaxed">
              Où que vous soyez au Maroc — <strong>Rabat, Marrakech, Tanger, Fès, Agadir, Oujda ou toute autre ville</strong> —, chaque pièce est vérifiée manuellement avant son expédition dans son écrin protecteur, prête à sublimer votre quotidien ou vos plus belles cérémonies.
            </p>

            {/* Quick contact / visiting cards */}
            <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 bg-white border border-zinc-200">
                <div className="flex items-center gap-2 text-zinc-900 text-xs font-medium uppercase tracking-wider mb-1">
                  <MapPin className="w-3.5 h-3.5 text-[#B89047] stroke-[1.25]" />
                  <span>Couverture</span>
                </div>
                <p className="text-xs text-zinc-500 font-light">
                  {settings.location}
                </p>
              </div>

              <div className="p-4 bg-white border border-zinc-200">
                <div className="flex items-center gap-2 text-zinc-900 text-xs font-medium uppercase tracking-wider mb-1">
                  <Clock className="w-3.5 h-3.5 text-zinc-700 stroke-[1.25]" />
                  <span>Service Client WhatsApp</span>
                </div>
                <p className="text-xs text-zinc-500 font-light">
                  7j/7 de 10h à 21h au +212 625-857015
                </p>
              </div>
            </div>

            {/* Instagram link button */}
            <div className="pt-4 flex flex-wrap gap-3">
              <a
                href="https://www.instagram.com/elyana_accessoires"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-6 py-3.5 bg-white border border-zinc-300 hover:border-zinc-900 text-zinc-800 text-xs uppercase tracking-widest font-medium transition-all"
              >
                <Instagram21stIcon className="w-4 h-4" />
                <span>Rejoindre nos 21K+ abonnés sur Instagram</span>
              </a>

              <a
                href={`https://wa.me/${settings.whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-zinc-900 hover:bg-black text-white text-xs uppercase tracking-widest font-medium transition-all"
              >
                <WhatsApp21stIcon className="w-4 h-4" />
                <span>Contacter l’Atelier</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
