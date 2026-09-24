'use client';

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import { Product, ProductCategory, ProductMaterial } from '@/types';
import { useStore } from '@/context/StoreContext';
import { Search, SlidersHorizontal, Heart, MessageCircle, Sparkles, Check } from 'lucide-react';

interface ProductCatalogProps {
  onSelectProduct: (product: Product) => void;
  selectedCategory: ProductCategory | 'all';
  onCategoryChange: (cat: ProductCategory | 'all') => void;
}

export default function ProductCatalog({
  onSelectProduct,
  selectedCategory,
  onCategoryChange
}: ProductCatalogProps) {
  const { products, wishlist, toggleWishlist, getWhatsAppOrderUrl } = useStore();

  const [selectedMaterial, setSelectedMaterial] = useState<ProductMaterial | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'newest'>('featured');

  const categories: { label: string; value: ProductCategory | 'all' }[] = [
    { label: 'Toutes les Pièces', value: 'all' },
    { label: 'Bagues', value: 'bagues' },
    { label: 'Colliers & Sautoirs', value: 'colliers' },
    { label: 'Bracelets', value: 'bracelets' },
    { label: 'Boucles d’Oreilles', value: 'boucles' },
    { label: 'Montres', value: 'montres' },
    { label: 'Packs & Coffrets', value: 'packs' }
  ];

  const materials: { label: string; value: ProductMaterial | 'all' }[] = [
    { label: 'Toutes Matières', value: 'all' },
    { label: 'Or 18K / Plaqué', value: 'Or 18K' },
    { label: 'Argent 925', value: 'Argent 925' },
    { label: 'Diamant / Zircon', value: 'Diamant' },
    { label: 'Acier Inoxydable', value: 'Acier Inoxydable' }
  ];

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchCategory = selectedCategory === 'all' || p.category === selectedCategory;
      const matchMaterial = selectedMaterial === 'all' || p.material === selectedMaterial;
      const matchSearch =
        searchQuery.trim() === '' ||
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.material.toLowerCase().includes(searchQuery.toLowerCase());

      return matchCategory && matchMaterial && matchSearch;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'newest') return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
      return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
    });
  }, [products, selectedCategory, selectedMaterial, searchQuery, sortBy]);

  return (
    <section id="catalog-section" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.25em] text-[#943859] font-medium mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Catalogue Exclusif</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-light text-zinc-900 tracking-tight">
            Les Collections Elyana
          </h2>
          <p className="mt-3 text-zinc-500 font-light text-sm sm:text-base">
            Chaque bijou est sélectionné avec soin pour sa finesse, sa durabilité et sa brillance. 
            Découvrez nos pièces prêtes pour expédition immédiate.
          </p>
        </div>

        {/* Filter Bar */}
        <div className="space-y-6 mb-12">
          {/* Category Tabs */}
          <div className="flex items-center justify-start sm:justify-center overflow-x-auto pb-2 scrollbar-none gap-2 sm:gap-3">
            {categories.map((cat) => (
              <button
                key={cat.value}
                onClick={() => onCategoryChange(cat.value)}
                className={`whitespace-nowrap px-4 py-2 text-xs uppercase tracking-wider transition-all duration-200 border ${
                  selectedCategory === cat.value
                    ? 'bg-zinc-900 text-white border-zinc-900 font-medium'
                    : 'bg-white text-zinc-600 border-zinc-200 hover:border-zinc-400'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Sub-Filters: Material, Search, Sort */}
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 pt-4 border-t border-zinc-100">
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400" />
              <input
                type="text"
                placeholder="Rechercher une bague, collier, sautoir, matière..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 text-xs bg-zinc-50 border border-zinc-200 rounded-none focus:outline-none focus:border-zinc-900 text-zinc-800 placeholder-zinc-400"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-zinc-400 hover:text-zinc-600"
                >
                  Effacer
                </button>
              )}
            </div>

            {/* Material & Sorting Controls */}
            <div className="flex items-center gap-3">
              {/* Material Dropdown */}
              <select
                value={selectedMaterial}
                onChange={(e) => setSelectedMaterial(e.target.value as any)}
                aria-label="Filtrer par matière"
                className="px-3 py-2 text-xs bg-white border border-zinc-200 text-zinc-700 focus:outline-none focus:border-zinc-900 cursor-pointer"
              >
                {materials.map((m) => (
                  <option key={m.value} value={m.value}>
                    {m.label}
                  </option>
                ))}
              </select>

              {/* Sort Dropdown */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                aria-label="Trier les bijoux"
                className="px-3 py-2 text-xs bg-white border border-zinc-200 text-zinc-700 focus:outline-none focus:border-zinc-900 cursor-pointer"
              >
                <option value="featured">Recommandés</option>
                <option value="newest">Nouveautés</option>
                <option value="price-asc">Prix croissant</option>
                <option value="price-desc">Prix décroissant</option>
              </select>
            </div>
          </div>
        </div>

        {/* Results Counter */}
        <div className="flex items-center justify-between text-xs text-zinc-400 uppercase tracking-widest mb-6">
          <span>{filteredProducts.length} pièces disponibles</span>
          <span>Paiement Cash à la réception</span>
        </div>

        {/* Empty State */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-20 bg-zinc-50 border border-dashed border-zinc-200">
            <p className="font-serif text-lg text-zinc-700">Aucun bijou ne correspond à vos critères.</p>
            <p className="text-xs text-zinc-400 mt-2">Essayez de réinitialiser vos filtres ou effectuez une autre recherche.</p>
            <button
              onClick={() => {
                onCategoryChange('all');
                setSelectedMaterial('all');
                setSearchQuery('');
              }}
              className="mt-5 px-5 py-2 bg-zinc-900 text-white text-xs uppercase tracking-wider font-medium"
            >
              Réinitialiser les filtres
            </button>
          </div>
        )}

        {/* Product Grid - Spacious Mango / Steven Stone aesthetic */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-12">
          {filteredProducts.map((product) => {
            const isFav = wishlist.includes(product.id);
            return (
              <div
                key={product.id}
                className="group flex flex-col bg-white transition-all duration-300"
              >
                {/* Image Container with high whitespace & hover reveal */}
                <div
                  onClick={() => onSelectProduct(product)}
                  className="relative aspect-[4/5] bg-zinc-50 overflow-hidden cursor-pointer border border-zinc-100 group-hover:border-zinc-300 transition-colors"
                >
                  <Image
                    src={product.images[0] || 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=700&q=80'}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />

                  {/* Badges */}
                  <div className="absolute top-3 left-3 flex flex-col gap-1.5 pointer-events-none">
                    {product.bestseller && (
                      <span className="bg-white/95 text-[10px] uppercase tracking-wider font-medium text-[#943859] px-2.5 py-0.5 border border-rose-100 shadow-xs">
                        Bestseller
                      </span>
                    )}
                    {product.isNew && (
                      <span className="bg-zinc-900 text-[10px] uppercase tracking-wider font-medium text-white px-2.5 py-0.5 shadow-xs">
                        Nouveau
                      </span>
                    )}
                  </div>

                  {/* Wishlist Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleWishlist(product.id);
                    }}
                    className="absolute top-3 right-3 p-2 rounded-full bg-white/90 text-zinc-600 hover:text-[#943859] shadow-sm hover:scale-110 transition-all"
                    aria-label="Ajouter aux favoris"
                  >
                    <Heart
                      className={`w-4 h-4 ${isFav ? 'fill-[#943859] text-[#943859]' : 'stroke-[1.5]'}`}
                    />
                  </button>

                  {/* Quick View Button overlay on hover */}
                  <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectProduct(product);
                      }}
                      className="w-full py-2 bg-white/95 hover:bg-white text-zinc-900 text-xs uppercase tracking-widest font-medium text-center shadow-md transition-all"
                    >
                      Aperçu Rapide
                    </button>
                  </div>
                </div>

                {/* Content */}
                <div className="pt-4 flex flex-col flex-1 justify-between">
                  <div>
                    <div className="flex items-center justify-between text-[11px] text-zinc-400 uppercase tracking-widest mb-1">
                      <span>{product.material}</span>
                      <span className="text-emerald-700 font-medium flex items-center gap-1">
                        <Check className="w-3 h-3 text-emerald-600" />
                        En stock
                      </span>
                    </div>

                    <h3
                      onClick={() => onSelectProduct(product)}
                      className="font-serif text-base text-zinc-900 hover:text-[#943859] transition-colors cursor-pointer line-clamp-1"
                    >
                      {product.name}
                    </h3>

                    {/* Sizes preview */}
                    <div className="mt-1 flex items-center gap-1.5 flex-wrap">
                      <span className="text-[10px] text-zinc-400">Tailles :</span>
                      {product.sizes.slice(0, 3).map((size) => (
                        <span key={size} className="text-[10px] bg-zinc-100 text-zinc-600 px-1.5 py-0.5 rounded-xs">
                          {size}
                        </span>
                      ))}
                      {product.sizes.length > 3 && (
                        <span className="text-[10px] text-zinc-400">+{product.sizes.length - 3}</span>
                      )}
                    </div>
                  </div>

                  {/* Price & Actions */}
                  <div className="mt-4 pt-3 border-t border-zinc-100 flex items-center justify-between">
                    <div>
                      <span className="font-serif text-lg font-normal text-zinc-900">
                        {product.price} <span className="text-xs font-sans text-zinc-500">DH</span>
                      </span>
                      {product.originalPrice && (
                        <span className="ml-2 text-xs text-zinc-400 line-through">
                          {product.originalPrice} DH
                        </span>
                      )}
                    </div>

                    <a
                      href={getWhatsAppOrderUrl(product, product.sizes[0] || 'Standard')}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-medium border border-emerald-200/60 rounded-xs transition-colors"
                      title="Commander directement sur WhatsApp"
                    >
                      <MessageCircle className="w-3.5 h-3.5 text-emerald-600 fill-emerald-600" />
                      <span className="hidden sm:inline">WhatsApp</span>
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
