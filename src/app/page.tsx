'use client';

import React, { useState } from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import ProductMarquee from '@/components/ProductMarquee';
import ProductCatalog from '@/components/ProductCatalog';
import CustomJewelrySection from '@/components/CustomJewelrySection';
import AtelierSection from '@/components/AtelierSection';
import ProductModal from '@/components/ProductModal';
import CartDrawer from '@/components/CartDrawer';
import Footer from '@/components/Footer';
import { Product, ProductCategory } from '@/types';
import { Sparkles, ArrowRight, Gem } from 'lucide-react';

export default function HomePage() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory | 'all'>('all');

  const scrollToCatalog = (category?: ProductCategory | 'all') => {
    if (category) setSelectedCategory(category);
    const elem = document.getElementById('catalog-section');
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToCustomSection = () => {
    const elem = document.getElementById('custom-jewelry');
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col selection:bg-[#FAF3E0] selection:text-[#B89047]">
      {/* Sticky Header with Navigation & Cart */}
      <Header
        onSelectCategory={scrollToCatalog}
        onOpenCustomSection={scrollToCustomSection}
      />

      {/* Hero Section with Generous Whitespace */}
      <Hero
        onExploreClick={() => scrollToCatalog('all')}
        onCustomClick={scrollToCustomSection}
      />

      {/* Moving Marquee Strip (Mango / Steven Stone style) */}
      <ProductMarquee onSelectProduct={(p) => setSelectedProduct(p)} />

      {/* Editorial Curated Categories - High Whitespace Showcase */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Category Card 1: Bagues */}
            <div
              onClick={() => scrollToCatalog('bagues')}
              className="group relative h-96 bg-zinc-100 overflow-hidden cursor-pointer border border-zinc-100"
            >
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                style={{
                  backgroundImage: `url('https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=800&q=80')`
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent group-hover:from-black/70 transition-colors" />
              <div className="absolute bottom-8 left-8 right-8 text-white">
                <span className="text-[10px] uppercase tracking-[0.25em] text-[#EADBBE] block mb-1">
                  Collection
                </span>
                <h3 className="font-serif text-2xl font-light">Bagues & Solitaires</h3>
                <p className="text-xs text-white/80 font-light mt-1 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  <span>Explorer</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </p>
              </div>
            </div>

            {/* Category Card 2: Colliers */}
            <div
              onClick={() => scrollToCatalog('colliers')}
              className="group relative h-96 bg-zinc-100 overflow-hidden cursor-pointer border border-zinc-100"
            >
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                style={{
                  backgroundImage: `url('https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=800&q=80')`
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent group-hover:from-black/70 transition-colors" />
              <div className="absolute bottom-8 left-8 right-8 text-white">
                <span className="text-[10px] uppercase tracking-[0.25em] text-[#EADBBE] block mb-1">
                  Collection
                </span>
                <h3 className="font-serif text-2xl font-light">Colliers & Sautoirs</h3>
                <p className="text-xs text-white/80 font-light mt-1 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  <span>Explorer</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </p>
              </div>
            </div>

            {/* Category Card 3: Bracelets & Packs */}
            <div
              onClick={() => scrollToCatalog('bracelets')}
              className="group relative h-96 bg-zinc-100 overflow-hidden cursor-pointer border border-zinc-100"
            >
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                style={{
                  backgroundImage: `url('https://images.unsplash.com/photo-1611591475879-1662998638b9?auto=format&fit=crop&w=800&q=80')`
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent group-hover:from-black/70 transition-colors" />
              <div className="absolute bottom-8 left-8 right-8 text-white">
                <span className="text-[10px] uppercase tracking-[0.25em] text-[#EADBBE] block mb-1">
                  Collection
                </span>
                <h3 className="font-serif text-2xl font-light">Bracelets & Joncs</h3>
                <p className="text-xs text-white/80 font-light mt-1 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  <span>Explorer</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Interactive Product Catalog with Filters */}
      <ProductCatalog
        onSelectProduct={(p) => setSelectedProduct(p)}
        selectedCategory={selectedCategory}
        onCategoryChange={(cat) => setSelectedCategory(cat)}
      />

      {/* Custom Jewelry Atelier Request Section */}
      <CustomJewelrySection />

      {/* Atelier & Maison Heritage Section */}
      <AtelierSection />

      {/* Footer */}
      <Footer />

      {/* Detailed Product Modal */}
      <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />

      {/* Slide-out Cart Drawer with COD Checkout */}
      <CartDrawer />
    </div>
  );
}
