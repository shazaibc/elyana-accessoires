'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { MessageCircle, MapPin, ShieldCheck, Heart } from 'lucide-react';
import { InstagramIcon } from '@/components/icons/InstagramIcon';
import { useStore } from '@/context/StoreContext';

export default function Footer() {
  const { settings } = useStore();

  return (
    <footer className="bg-white border-t border-zinc-100 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-14">
          {/* Brand Col */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="relative w-10 h-10 rounded-full overflow-hidden border border-rose-200">
                <Image
                  src="/brand/elyana-logo.jpg"
                  alt="Elyana Accessoires"
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <span className="font-serif text-lg font-light tracking-[0.18em] text-zinc-900">
                  ELYANA
                </span>
                <span className="block text-[8px] uppercase tracking-[0.3em] text-zinc-400 font-medium">
                  ACCESSOIRES CASABLANCA
                </span>
              </div>
            </div>
            <p className="text-xs text-zinc-500 font-light leading-relaxed">
              Maison de bijoux raffinés en acier chirurgical 316L, argent 925 et or. Livraison express partout au Maroc avec paiement en espèces à la livraison.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://www.instagram.com/elyana_accessoires"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full border border-zinc-200 flex items-center justify-center text-zinc-600 hover:text-[#943859] hover:border-[#943859] transition-colors"
                title="Instagram @elyana_accessoires"
              >
                <InstagramIcon className="w-4 h-4" />
              </a>
              <a
                href={`https://wa.me/${settings.whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full border border-zinc-200 flex items-center justify-center text-emerald-600 hover:bg-emerald-50 transition-colors"
                title="WhatsApp Direct"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Collections */}
          <div>
            <h4 className="text-xs uppercase tracking-widest text-zinc-900 font-semibold mb-4">
              Collections
            </h4>
            <ul className="space-y-2.5 text-xs text-zinc-500 font-light">
              <li>
                <a href="#catalog-section" className="hover:text-zinc-900 transition-colors">
                  Bagues Solitaires & Alliances
                </a>
              </li>
              <li>
                <a href="#catalog-section" className="hover:text-zinc-900 transition-colors">
                  Colliers & Sautoirs Nacre
                </a>
              </li>
              <li>
                <a href="#catalog-section" className="hover:text-zinc-900 transition-colors">
                  Bracelets Joncs & Tennis
                </a>
              </li>
              <li>
                <a href="#catalog-section" className="hover:text-zinc-900 transition-colors">
                  Boucles d’Oreilles & Créoles
                </a>
              </li>
              <li>
                <a href="#catalog-section" className="hover:text-zinc-900 transition-colors">
                  Montres Élégance & Coffrets
                </a>
              </li>
            </ul>
          </div>

          {/* Services & Custom */}
          <div>
            <h4 className="text-xs uppercase tracking-widest text-zinc-900 font-semibold mb-4">
              Services & Sur-Mesure
            </h4>
            <ul className="space-y-2.5 text-xs text-zinc-500 font-light">
              <li>
                <a href="#custom-jewelry" className="hover:text-[#943859] transition-colors">
                  ✨ Confection de Bijou Sur-Mesure
                </a>
              </li>
              <li>
                <a href="#custom-jewelry" className="hover:text-[#943859] transition-colors">
                  Gravure & Prénoms Calligraphiés
                </a>
              </li>
              <li>
                <span className="text-zinc-500">Paiement Cash on Delivery (COD)</span>
              </li>
              <li>
                <span className="text-zinc-500">Livraison Express Maroc (24h/48h)</span>
              </li>
              <li>
                <span className="text-zinc-500">Garantie Qualité Anti-Allergique</span>
              </li>
            </ul>
          </div>

          {/* Contact & Boutique */}
          <div>
            <h4 className="text-xs uppercase tracking-widest text-zinc-900 font-semibold mb-4">
              Boutique Casablanca
            </h4>
            <div className="space-y-3 text-xs text-zinc-500 font-light">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#943859] shrink-0 mt-0.5" />
                <span>{settings.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <MessageCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                <a href={`https://wa.me/${settings.whatsappNumber}`} className="hover:underline">
                  WhatsApp : +212 625-857015
                </a>
              </div>
              <div className="pt-2">
                <Link
                  href="/admin"
                  className="inline-block text-[11px] text-zinc-400 hover:text-zinc-700 uppercase tracking-wider underline underline-offset-4"
                >
                  Accès Espace Administrateur
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-zinc-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-zinc-400 font-light">
          <p>© {new Date().getFullYear()} Elyana Accessoires. Tous droits réservés. Casablanca, Maroc.</p>
          <p className="flex items-center gap-1">
            Façonné avec élégance pour la femme marocaine
          </p>
        </div>
      </div>
    </footer>
  );
}
