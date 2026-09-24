'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useStore } from '@/context/StoreContext';
import { ShoppingBag, Heart, Search, Menu, X, ShieldCheck, Sparkles, MessageCircle } from 'lucide-react';
import { ProductCategory } from '@/types';

interface HeaderProps {
  onSelectCategory?: (category: ProductCategory | 'all') => void;
  onOpenCustomSection?: () => void;
}

export default function Header({ onSelectCategory, onOpenCustomSection }: HeaderProps) {
  const { settings, cart, wishlist, setIsCartOpen } = useStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const categories: { label: string; value: ProductCategory | 'all' }[] = [
    { label: 'Toutes les Créations', value: 'all' },
    { label: 'Bagues', value: 'bagues' },
    { label: 'Colliers & Sautoirs', value: 'colliers' },
    { label: 'Bracelets', value: 'bracelets' },
    { label: 'Boucles d’Oreilles', value: 'boucles' },
    { label: 'Montres', value: 'montres' },
    { label: 'Coffrets & Packs', value: 'packs' }
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-zinc-100 transition-all">
      {/* Top Luxury Announcement Ticker */}
      <div className="bg-[#FAF7F8] border-b border-rose-100/60 py-2 px-4 text-center text-xs tracking-wider text-zinc-700 flex items-center justify-center gap-3">
        <span className="inline-flex items-center gap-1.5 font-medium text-[#943859]">
          <Sparkles className="w-3.5 h-3.5" />
          {settings.announcementText}
        </span>
        <span className="hidden md:inline-block text-zinc-300">|</span>
        <span className="hidden md:inline-flex items-center gap-1 text-zinc-500">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
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
              className="p-2 text-zinc-600 hover:text-zinc-900 rounded-md focus:outline-none"
              aria-label="Ouvrir le menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Left Navigation Links - Steven Stone / Mango Inspired */}
          <nav className="hidden lg:flex items-center gap-8">
            <button
              onClick={() => onSelectCategory && onSelectCategory('all')}
              className="text-xs uppercase tracking-widest text-zinc-700 hover:text-[#943859] transition-colors py-2 font-medium"
            >
              Collection
            </button>
            <button
              onClick={() => onSelectCategory && onSelectCategory('bagues')}
              className="text-xs uppercase tracking-widest text-zinc-700 hover:text-[#943859] transition-colors py-2 font-medium"
            >
              Bagues
            </button>
            <button
              onClick={() => onSelectCategory && onSelectCategory('colliers')}
              className="text-xs uppercase tracking-widest text-zinc-700 hover:text-[#943859] transition-colors py-2 font-medium"
            >
              Colliers
            </button>
            <button
              onClick={() => onSelectCategory && onSelectCategory('bracelets')}
              className="text-xs uppercase tracking-widest text-zinc-700 hover:text-[#943859] transition-colors py-2 font-medium"
            >
              Bracelets
            </button>
            <button
              onClick={() => onOpenCustomSection && onOpenCustomSection()}
              className="text-xs uppercase tracking-widest font-semibold text-[#943859] hover:text-[#782845] transition-colors py-2 border-b-2 border-[#943859]/30"
            >
              Sur-Mesure ✨
            </button>
          </nav>

          {/* Center Brand Identity */}
          <div className="flex-1 lg:flex-initial flex items-center justify-center">
            <Link href="/" className="group flex items-center gap-3">
              <div className="relative w-12 h-12 rounded-full overflow-hidden border border-rose-200/60 shadow-sm group-hover:scale-105 transition-transform duration-300">
                <Image
                  src="/brand/elyana-logo.jpg"
                  alt="Elyana Accessoires Logo"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              <div className="text-left">
                <span className="block font-serif text-xl sm:text-2xl font-light tracking-[0.18em] text-zinc-900 group-hover:text-[#943859] transition-colors">
                  ELYANA
                </span>
                <span className="block text-[9px] uppercase tracking-[0.35em] text-zinc-400 font-medium -mt-0.5">
                  ACCESSOIRES • CASABLANCA
                </span>
              </div>
            </Link>
          </div>

          {/* Right Action Icons */}
          <div className="flex items-center gap-3 sm:gap-5">
            {/* Direct WhatsApp Concierge Button */}
            <a
              href={`https://wa.me/${settings.whatsappNumber}?text=${encodeURIComponent("Bonjour Elyana Accessoires, j'ai une question concernant vos bijoux.")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 text-xs text-emerald-800 bg-emerald-50 hover:bg-emerald-100/80 px-3 py-1.5 rounded-full transition-colors font-medium border border-emerald-200/60"
              title="Discuter directement sur WhatsApp"
            >
              <MessageCircle className="w-3.5 h-3.5 text-emerald-600 fill-emerald-600" />
              <span>WhatsApp</span>
            </a>

            {/* Admin shortcut */}
            <Link
              href="/admin"
              className="text-[11px] uppercase tracking-wider text-zinc-400 hover:text-zinc-800 transition-colors px-2 py-1 rounded"
              title="Accès Gestionnaire / Admin"
            >
              Admin
            </Link>

            {/* Cart Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 text-zinc-700 hover:text-[#943859] transition-colors"
              aria-label="Panier d'achats"
            >
              <ShoppingBag className="w-5 h-5 stroke-[1.5]" />
              {totalCartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#943859] text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                  {totalCartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-zinc-100 bg-white px-4 pt-3 pb-6 space-y-3">
          <div className="text-xs uppercase tracking-widest text-zinc-400 font-semibold mb-2">
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
                className="text-left text-sm py-2 px-3 rounded-lg hover:bg-rose-50/50 text-zinc-700 hover:text-[#943859] transition-colors"
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
              className="w-full text-center py-2.5 px-4 bg-rose-50 text-[#943859] font-medium rounded-lg text-sm"
            >
              ✨ Demande de Bijou Sur-Mesure
            </button>
            <a
              href={`https://wa.me/${settings.whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full text-center py-2.5 px-4 bg-emerald-600 text-white font-medium rounded-lg text-sm flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-4 h-4" />
              Commander sur WhatsApp
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
