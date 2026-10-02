'use client';

import React from 'react';
import Image from 'next/image';
import { Product } from '@/types';
import { useStore } from '@/context/StoreContext';
import { Eye } from 'lucide-react';
import { FacetedDiamondIcon, WhatsApp21stIcon } from '@/components/icons/LuxuryIcons';

interface ProductMarqueeProps {
  onSelectProduct: (product: Product) => void;
}

export default function ProductMarquee({ onSelectProduct }: ProductMarqueeProps) {
  const { products, getWhatsAppOrderUrl } = useStore();

  // Split into two sets for the dual marquee
  const trackOne = products.slice(0, 6);
  const trackTwo = products.slice(6, 12).length >= 4 ? products.slice(6, 12) : products;

  // Duplicate items for seamless continuous loop
  const loopTrackOne = [...trackOne, ...trackOne, ...trackOne];
  const loopTrackTwo = [...trackTwo, ...trackTwo, ...trackTwo];

  return (
    <section className="py-16 bg-[#FAFAFA] border-y border-zinc-100 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10 text-center">
        <div className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.25em] text-[#B89047] font-medium mb-3">
          <FacetedDiamondIcon className="w-3.5 h-3.5" />
          <span>Sélection Coup de Cœur</span>
        </div>
        <h2 className="font-serif text-2xl sm:text-3xl font-light text-zinc-900 tracking-tight">
          Les Pièces Signature du Moment
        </h2>
        <p className="text-xs text-zinc-400 uppercase tracking-widest mt-2">
          Glissez ou survolez pour découvrir les détails
        </p>
      </div>

      {/* Row 1: Leftward moving strip */}
      <div className="relative w-full overflow-hidden mb-6">
        <div className="animate-marquee gap-6 px-4">
          {loopTrackOne.map((product, idx) => (
            <div
              key={`row1-${product.id}-${idx}`}
              className="w-64 sm:w-72 shrink-0 bg-white border border-zinc-100 hover:border-[#EADBBE] transition-all duration-300 group rounded-none flex flex-col"
            >
              {/* Image Container */}
              <div 
                onClick={() => onSelectProduct(product)}
                className="relative aspect-square w-full bg-zinc-50 overflow-hidden cursor-pointer"
              >
                <Image
                  src={product.images[0] || 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=600&q=80'}
                  alt={product.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="288px"
                />
                {product.bestseller && (
                  <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-xs text-[10px] uppercase tracking-wider font-medium text-[#B89047] px-2 py-0.5 border border-[#EADBBE]">
                    Bestseller
                  </span>
                )}
                <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectProduct(product);
                    }}
                    className="p-2.5 bg-white text-zinc-800 rounded-full shadow-md hover:bg-zinc-900 hover:text-white transition-colors"
                    title="Voir les détails"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Details */}
              <div className="p-4 flex flex-col flex-1 justify-between">
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-zinc-400 font-medium">
                    {product.material}
                  </span>
                  <h3 
                    onClick={() => onSelectProduct(product)}
                    className="font-serif text-sm text-zinc-900 line-clamp-1 mt-0.5 cursor-pointer hover:text-[#B89047] transition-colors"
                  >
                    {product.name}
                  </h3>
                </div>

                <div className="mt-3 pt-3 border-t border-zinc-100 flex items-center justify-between">
                  <span className="font-medium text-zinc-900 text-sm">
                    {product.price} <span className="text-xs text-zinc-500 font-normal">DH</span>
                  </span>

                  <a
                    href={getWhatsAppOrderUrl(product, product.sizes[0] || 'Taille unique')}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-[11px] font-medium text-emerald-800 bg-emerald-50 hover:bg-emerald-100 px-2.5 py-1 transition-colors border border-emerald-200/50 rounded-xs"
                  >
                    <WhatsApp21stIcon className="w-3.5 h-3.5 text-emerald-600" />
                    <span>WhatsApp</span>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Row 2: Rightward moving strip (Reverse) */}
      <div className="relative w-full overflow-hidden">
        <div className="animate-marquee-reverse gap-6 px-4">
          {loopTrackTwo.map((product, idx) => (
            <div
              key={`row2-${product.id}-${idx}`}
              className="w-64 sm:w-72 shrink-0 bg-white border border-zinc-100 hover:border-[#EADBBE] transition-all duration-300 group rounded-none flex flex-col"
            >
              {/* Image Container */}
              <div 
                onClick={() => onSelectProduct(product)}
                className="relative aspect-square w-full bg-zinc-50 overflow-hidden cursor-pointer"
              >
                <Image
                  src={product.images[0] || 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=600&q=80'}
                  alt={product.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="288px"
                />
                {product.isNew && (
                  <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-xs text-[10px] uppercase tracking-wider font-medium text-zinc-700 px-2 py-0.5 border border-zinc-200">
                    Nouveau
                  </span>
                )}
                <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectProduct(product);
                    }}
                    className="p-2.5 bg-white text-zinc-800 rounded-full shadow-md hover:bg-zinc-900 hover:text-white transition-colors"
                    title="Voir les détails"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Details */}
              <div className="p-4 flex flex-col flex-1 justify-between">
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-zinc-400 font-medium">
                    {product.material}
                  </span>
                  <h3 
                    onClick={() => onSelectProduct(product)}
                    className="font-serif text-sm text-zinc-900 line-clamp-1 mt-0.5 cursor-pointer hover:text-[#B89047] transition-colors"
                  >
                    {product.name}
                  </h3>
                </div>

                <div className="mt-3 pt-3 border-t border-zinc-100 flex items-center justify-between">
                  <span className="font-medium text-zinc-900 text-sm">
                    {product.price} <span className="text-xs text-zinc-500 font-normal">DH</span>
                  </span>

                  <a
                    href={getWhatsAppOrderUrl(product, product.sizes[0] || 'Taille unique')}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-[11px] font-medium text-emerald-800 bg-emerald-50 hover:bg-emerald-100 px-2.5 py-1 transition-colors border border-emerald-200/50 rounded-xs"
                  >
                    <WhatsApp21stIcon className="w-3.5 h-3.5 text-emerald-600" />
                    <span>WhatsApp</span>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
