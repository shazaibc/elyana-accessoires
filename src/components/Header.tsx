'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useStore } from '@/context/StoreContext';
import { Menu, X } from 'lucide-react';
import {
  FacetedDiamondIcon,
  LuxuryToteIcon,
  WhatsApp21stIcon
} from '@/components/icons/LuxuryIcons';
import { ProductCategory } from '@/types';

interface HeaderProps {
  onSelectCategory?: (category: ProductCategory | 'all') => void;
  onOpenCustomSection?: () => void;
}

export default function Header({ onSelectCategory, onOpenCustomSection }: HeaderProps) {
  const { settings, cart, setIsCartOpen } = useStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const categories: { label: string; value: ProductCategory | 'all' }[] = [
    { label: 'Toutes les Pièces', value: 'all' },
    { label: 'Bagues', value: 'bagues' },
    { label: 'Colliers & Sautoirs', value: 'colliers' },
    { label: 'Bracelets', value: 'bracelets' },
    { label: 'Boucles d’Oreilles', value: 'boucles' },
    { label: 'Montres', value: 'montres' },
    { label: 'Coffrets & Packs', value: 'packs' }
  ];

  // Clean announcement text (removing any leftover emojis)
  const cleanAnnouncement = settings.announcementText.replace(/[✨💎]/g, '').trim();

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-zinc-100 transition-all">
      {/* Top Luxury Announcement Ticker */}
      <div className="bg-[#FAFAFA] border-b border-zinc-100 py-2 px-4 text-center text-xs tracking-wider text-zinc-600 flex items-center justify-center gap-3">
        <span className="inline-flex items-center gap-2 font-medium text-zinc-800">
          <FacetedDiamondIcon className="w-3 h-3 text-[#B89047]" />
          {cleanAnnouncement}
        </span>
        <span className="hidden md:inline-block text-zinc-300">/</span>
        <span className="hidden md:inline-flex items-center gap-1.5 text-zinc-500 font-light">
          Paiement à la livraison partout au Maroc
        </span>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Mobile menu trigger */}
          <div className="flex items-center lg:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-zinc-700 hover:text-zinc-950 focus:outline-none"
              aria-label="Ouvrir le menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5 stroke-[1.25]" /> : <Menu className="w-5 h-5 stroke-[1.25]" />}
            </button>
          </div>

          {/* Left Navigation Links - Steven Stone / Mango Inspired */}
          <nav className="hidden lg:flex items-center gap-8">
            <button
              onClick={() => onSelectCategory && onSelectCategory('all')}
              className="text-xs uppercase tracking-[0.2em] text-zinc-700 hover:text-[#B89047] transition-colors py-2 font-medium cursor-pointer"
            >
              Collection
            </button>
            <button
              onClick={() => onSelectCategory && onSelectCategory('bagues')}
              className="text-xs uppercase tracking-[0.2em] text-zinc-700 hover:text-[#B89047] transition-colors py-2 font-medium cursor-pointer"
            >
              Bagues
            </button>
            <button
              onClick={() => onSelectCategory && onSelectCategory('colliers')}
              className="text-xs uppercase tracking-[0.2em] text-zinc-700 hover:text-[#B89047] transition-colors py-2 font-medium cursor-pointer"
            >
              Colliers
            </button>
            <button
              onClick={() => onSelectCategory && onSelectCategory('bracelets')}
              className="text-xs uppercase tracking-[0.2em] text-zinc-700 hover:text-[#B89047] transition-colors py-2 font-medium cursor-pointer"
            >
              Bracelets
            </button>
            <button
              onClick={() => onOpenCustomSection && onOpenCustomSection()}
              className="text-xs uppercase tracking-[0.2em] font-medium text-[#B89047] hover:text-zinc-900 transition-colors py-2 border-b border-[#B89047]/40 cursor-pointer"
            >
              Sur-Mesure
            </button>
          </nav>

          {/* Center Brand Identity */}
          <div className="flex-1 lg:flex-initial flex items-center justify-center">
            <Link href="/" className="group flex items-center gap-3">
              <div className="relative w-11 h-11 rounded-full overflow-hidden border border-zinc-200/80 group-hover:border-zinc-400 transition-colors bg-white">
                <Image
                  src="/brand/manad-logo.jpg"
                  alt="MANAD Store Logo"
                  fill
                  className="object-contain p-0.5"
                  priority
                />
              </div>
              <div className="text-left">
                <span className="block font-serif text-xl sm:text-2xl font-light tracking-[0.22em] text-zinc-900 group-hover:text-[#B89047] transition-colors">
                  MANAD
                </span>
                <span className="block text-[8px] uppercase tracking-[0.38em] text-[#B89047] font-medium -mt-0.5">
                  STORE • MAROC
                </span>
              </div>
            </Link>
          </div>

          {/* Right Action Icons */}
          <div className="flex items-center gap-3 sm:gap-5">
            {/* Direct WhatsApp Concierge Button from 21st dev */}
            <a
              href={`https://wa.me/${settings.whatsappNumber}?text=${encodeURIComponent("Bonjour Manad Store, j'ai une question concernant vos bijoux.")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-2 text-xs text-zinc-700 hover:text-emerald-700 hover:border-emerald-300 px-3 py-1.5 transition-colors font-medium border border-zinc-200"
              title="Discuter directement sur WhatsApp"
            >
              <WhatsApp21stIcon className="w-3.5 h-3.5 text-emerald-600" />
              <span>WhatsApp</span>
            </a>

            {/* Admin shortcut */}
            <Link
              href="/admin"
              className="text-[11px] uppercase tracking-widest text-zinc-400 hover:text-zinc-900 transition-colors px-2 py-1"
              title="Accès Gestionnaire / Admin"
            >
              Admin
            </Link>

            {/* Cart Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 text-zinc-800 hover:text-[#B89047] transition-colors cursor-pointer"
              aria-label="Panier d'achats"
            >
              <LuxuryToteIcon className="w-5 h-5 stroke-[1.25]" />
              {totalCartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-zinc-900 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-medium">
                  {totalCartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-zinc-100 bg-white px-4 pt-4 pb-6 space-y-3">
          <div className="text-[10px] uppercase tracking-[0.25em] text-zinc-400 font-medium mb-2">
            Catégories
          </div>
          <div className="grid grid-cols-2 gap-2">
            {categories.map((cat) => (
              <button
                key={cat.value}
                onClick={() => {
                  onSelectCategory && onSelectCategory(cat.value);
                  setMobileMenuOpen(false);
                }}
                className="text-left text-xs uppercase tracking-wider py-2.5 px-3 border border-zinc-100 hover:border-zinc-300 text-zinc-700 hover:text-[#B89047] transition-colors"
              >
                {cat.label}
              </button>
            ))}
          </div>
          <div className="pt-3 border-t border-zinc-100 flex flex-col gap-2">
            <button
              onClick={() => {
                onOpenCustomSection && onOpenCustomSection();
                setMobileMenuOpen(false);
              }}
              className="w-full text-center py-3 px-4 bg-zinc-900 text-white font-medium text-xs uppercase tracking-widest"
            >
              Atelier Sur-Mesure
            </button>
            <a
              href={`https://wa.me/${settings.whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full text-center py-3 px-4 border border-zinc-300 text-zinc-800 font-medium text-xs uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-zinc-50"
            >
              <WhatsApp21stIcon className="w-3.5 h-3.5 text-emerald-600" />
              <span>Commander sur WhatsApp</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
