'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Product } from '@/types';
import { useStore } from '@/context/StoreContext';
import { X } from 'lucide-react';
import {
  WhatsApp21stIcon,
  LuxuryToteIcon,
  CourierBoxIcon,
  BanknoteShieldIcon
} from '@/components/icons/LuxuryIcons';

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
}

const MOROCCO_CITIES = [
  'Casablanca',
  'Rabat',
  'Marrakech',
  'Tanger',
  'Fès',
  'Agadir',
  'Meknès',
  'Oujda',
  'Kénitra',
  'Tétouan',
  'Safi',
  'Mohammédia',
  'El Jadida',
  'Nador',
  'Autre ville au Maroc'
];

export default function ProductModal({ product, onClose }: ProductModalProps) {
  const { addToCart, getWhatsAppOrderUrl } = useStore();

  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedImage, setSelectedImage] = useState<string>('');
  const [selectedCity, setSelectedCity] = useState<string>('Casablanca');
  const [addedNotice, setAddedNotice] = useState(false);

  useEffect(() => {
    if (product) {
      setSelectedSize(product.sizes[0] || 'Standard');
      setSelectedImage(product.images[0] || '');
      setAddedNotice(false);
    }
  }, [product]);

  if (!product) return null;

  const handleAddToCart = () => {
    addToCart(product, selectedSize, 1);
    setAddedNotice(true);
    setTimeout(() => setAddedNotice(false), 2500);
  };

  const whatsappUrl = getWhatsAppOrderUrl(product, selectedSize, selectedCity);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 transition-opacity">
      <div 
        className="relative bg-white w-full max-w-4xl shadow-2xl overflow-hidden border border-zinc-100 flex flex-col md:flex-row max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 bg-white/90 hover:bg-zinc-100 text-zinc-600 hover:text-zinc-900 rounded-full transition-colors"
          aria-label="Fermer le dialogue"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left: Gallery Column */}
        <div className="md:w-1/2 bg-zinc-50 flex flex-col justify-between p-4 sm:p-6 overflow-y-auto">
          {/* Main Display Image */}
          <div className="relative aspect-square w-full bg-white border border-zinc-100 overflow-hidden mb-4">
            <Image
              src={selectedImage || product.images[0]}
              alt={product.name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            {product.bestseller && (
              <span className="absolute top-3 left-3 bg-white/95 text-[10px] uppercase tracking-wider font-semibold text-[#943859] px-2.5 py-1 border border-rose-100">
                Pièce Bestseller
              </span>
            )}
          </div>

          {/* Thumbnails */}
          {product.images.length > 1 && (
            <div className="flex items-center gap-3 overflow-x-auto pb-1">
              {product.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImage(img)}
                  className={`relative w-16 h-16 shrink-0 border overflow-hidden transition-all ${
                    selectedImage === img ? 'border-[#943859] ring-1 ring-[#943859]' : 'border-zinc-200 opacity-70 hover:opacity-100'
                  }`}
                >
                  <Image src={img} alt={`Aperçu ${i + 1}`} fill className="object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right: Info & Actions Column */}
        <div className="md:w-1/2 p-6 sm:p-8 flex flex-col justify-between overflow-y-auto">
          <div>
            {/* Category & Material Tag */}
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#943859] font-medium mb-1">
              <span>{product.category}</span>
              <span>•</span>
              <span>{product.material}</span>
            </div>

            {/* Product Title */}
            <h2 className="font-serif text-2xl sm:text-3xl font-light text-zinc-900 leading-snug">
              {product.name}
            </h2>

            {/* Price (in MAD / DH) */}
            <div className="mt-3 flex items-baseline gap-3">
              <span className="font-serif text-3xl font-normal text-zinc-900">
                {product.price} <span className="text-sm font-sans font-medium text-zinc-600">DH</span>
              </span>
              {product.originalPrice && (
                <span className="text-sm text-zinc-400 line-through">
                  {product.originalPrice} DH
                </span>
              )}
              <span className="text-xs text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-xs font-medium">
                Paiement Cash à la Réception
              </span>
            </div>

            {/* Description */}
            <div className="mt-5 pt-5 border-t border-zinc-100">
              <p className="text-zinc-600 text-sm leading-relaxed font-light">
                {product.description}
              </p>
            </div>

            {/* Size Selector */}
            <div className="mt-6">
              <div className="flex items-center justify-between text-xs uppercase tracking-wider text-zinc-700 font-medium mb-2.5">
                <span>Choisir votre taille / format :</span>
                <span className="text-[#943859] lowercase text-[11px] font-normal cursor-pointer hover:underline">
                  Guide des tailles
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-3.5 py-2 text-xs transition-all border ${
                      selectedSize === size
                        ? 'border-zinc-900 bg-zinc-900 text-white font-medium'
                        : 'border-zinc-200 bg-white text-zinc-700 hover:border-zinc-400'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* City Selector for WhatsApp delivery calculation */}
            <div className="mt-5">
              <label className="block text-xs uppercase tracking-wider text-zinc-700 font-medium mb-1.5">
                Votre ville de livraison au Maroc :
              </label>
              <select
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-zinc-50 border border-zinc-200 text-zinc-800 focus:outline-none focus:border-zinc-900 cursor-pointer"
              >
                {MOROCCO_CITIES.map((c) => (
                  <option key={c} value={c}>
                    {c} {c === 'Casablanca' ? '(Livraison Express <24h)' : '(24h-48h)'}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-8 pt-6 border-t border-zinc-100 space-y-3">
            {/* Primary Action: Direct WhatsApp Order */}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-4 bg-emerald-600 hover:bg-emerald-700 text-white text-xs uppercase tracking-[0.2em] font-medium transition-colors flex items-center justify-center gap-2.5 shadow-sm"
            >
              <WhatsApp21stIcon className="w-4 h-4" />
              <span>Commander via WhatsApp ({product.price} DH)</span>
            </a>

            {/* Secondary Action: Add to Cart (COD Checkout) */}
            <button
              onClick={handleAddToCart}
              className="w-full py-3.5 bg-white hover:bg-zinc-50 text-zinc-900 border border-zinc-300 text-xs uppercase tracking-[0.2em] font-medium transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <LuxuryToteIcon className="w-4 h-4 stroke-[1.25]" />
              <span>{addedNotice ? '✓ Ajouté au panier !' : 'Ajouter au Panier (COD)'}</span>
            </button>

            {/* Trust Info */}
            <div className="pt-3 flex items-center justify-between text-[11px] text-zinc-500">
              <div className="flex items-center gap-1.5">
                <CourierBoxIcon className="w-3.5 h-3.5 text-zinc-400" />
                <span>Casablanca & tout le Maroc</span>
              </div>
              <div className="flex items-center gap-1.5">
                <BanknoteShieldIcon className="w-3.5 h-3.5 text-zinc-700" />
                <span>Paiement à la livraison</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
