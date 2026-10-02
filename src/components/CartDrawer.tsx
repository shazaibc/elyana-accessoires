'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useStore } from '@/context/StoreContext';
import { X, Trash2, Plus, Minus } from 'lucide-react';
import {
  LuxuryToteIcon,
  WhatsApp21stIcon,
  BanknoteShieldIcon
} from '@/components/icons/LuxuryIcons';

const MOROCCO_CITIES = [
  'Toutes les villes du Maroc',
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
  'Autre ville au Maroc'
];

export default function CartDrawer() {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateCartQuantity,
    clearCart,
    getWhatsAppCartUrl
  } = useStore();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('Toutes les villes du Maroc');
  const [address, setAddress] = useState('');
  const [showCheckoutForm, setShowCheckoutForm] = useState(false);

  if (!isCartOpen) return null;

  const totalAmount = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  const handleWhatsAppCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone || !address) {
      alert('Veuillez renseigner votre nom, téléphone et adresse pour la livraison.');
      return;
    }

    const url = getWhatsAppCartUrl({
      name,
      phone,
      city,
      address
    });

    window.open(url, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-xs flex justify-end transition-opacity">
      <div 
        className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 border-b border-zinc-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <LuxuryToteIcon className="w-5 h-5 text-zinc-900 stroke-[1.25]" />
            <h2 className="font-serif text-lg text-zinc-900 font-normal">Votre Panier</h2>
            <span className="text-xs bg-zinc-100 text-zinc-700 px-2 py-0.5 rounded-full font-medium">
              {cart.reduce((s, i) => s + i.quantity, 0)} articles
            </span>
          </div>
          <button
            onClick={() => setIsCartOpen(false)}
            className="p-2 text-zinc-400 hover:text-zinc-800 transition-colors cursor-pointer"
            aria-label="Fermer le panier"
          >
            <X className="w-5 h-5 stroke-[1.25]" />
          </button>
        </div>

        {/* Cart items list */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {cart.length === 0 ? (
            <div className="text-center py-20 text-zinc-400">
              <LuxuryToteIcon className="w-10 h-10 stroke-[1] mx-auto text-zinc-300 mb-3" />
              <p className="font-serif text-base text-zinc-600">Votre panier est vide</p>
              <p className="text-xs text-zinc-400 mt-1">Explorez nos collections et découvrez nos pièces uniques.</p>
              <button
                onClick={() => setIsCartOpen(false)}
                className="mt-6 px-6 py-2.5 bg-zinc-900 text-white text-xs uppercase tracking-wider font-medium cursor-pointer"
              >
                Découvrir la collection
              </button>
            </div>
          ) : (
            cart.map((item) => (
              <div
                key={`${item.product.id}-${item.selectedSize}`}
                className="flex gap-4 pb-4 border-b border-zinc-100"
              >
                {/* Thumbnail */}
                <div className="relative w-20 h-20 bg-zinc-50 shrink-0 border border-zinc-100 overflow-hidden">
                  <Image
                    src={item.product.images[0]}
                    alt={item.product.name}
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Details */}
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="font-serif text-sm text-zinc-900 leading-snug line-clamp-1">
                        {item.product.name}
                      </h3>
                      <button
                        onClick={() => removeFromCart(item.product.id, item.selectedSize)}
                        className="text-zinc-400 hover:text-rose-600 transition-colors"
                        title="Retirer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="mt-1 flex items-center gap-2 text-xs text-zinc-500">
                      <span>Taille : <strong>{item.selectedSize}</strong></span>
                      <span>•</span>
                      <span>{item.product.material}</span>
                    </div>
                  </div>

                  <div className="mt-2 flex items-center justify-between">
                    {/* Quantity Selector */}
                    <div className="flex items-center border border-zinc-200">
                      <button
                        onClick={() => updateCartQuantity(item.product.id, item.selectedSize, item.quantity - 1)}
                        className="p-1 hover:bg-zinc-100 text-zinc-600"
                        aria-label="Diminuer la quantité"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="px-2.5 text-xs font-medium text-zinc-800">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateCartQuantity(item.product.id, item.selectedSize, item.quantity + 1)}
                        className="p-1 hover:bg-zinc-100 text-zinc-600"
                        aria-label="Augmenter la quantité"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <div className="text-right">
                      <span className="font-medium text-zinc-900 text-sm">
                        {item.product.price * item.quantity} <span className="text-xs text-zinc-500 font-normal">DH</span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer & Checkout Form */}
        {cart.length > 0 && (
          <div className="p-5 border-t border-zinc-100 bg-zinc-50/50">
            {/* Total summary */}
            <div className="flex items-baseline justify-between mb-4">
              <span className="text-xs uppercase tracking-wider text-zinc-500 font-medium">
                Total Commande (COD) :
              </span>
              <span className="font-serif text-2xl font-normal text-zinc-900">
                {totalAmount} <span className="text-sm font-sans font-medium text-zinc-600">DH</span>
              </span>
            </div>

            {/* Cash on Delivery Notice */}
            <div className="bg-zinc-100/70 border border-zinc-200 p-3 text-xs text-zinc-700 mb-4 flex items-center gap-2">
              <BanknoteShieldIcon className="w-4 h-4 shrink-0 text-zinc-900" />
              <span>Paiement en espèces à la livraison après inspection de votre commande.</span>
            </div>

            {/* Quick Checkout Form Toggle */}
            {!showCheckoutForm ? (
              <button
                onClick={() => setShowCheckoutForm(true)}
                className="w-full py-3.5 bg-zinc-900 hover:bg-black text-white text-xs uppercase tracking-[0.2em] font-medium transition-colors flex items-center justify-center gap-2 shadow-xs cursor-pointer"
              >
                <span>Commander (Cash on Delivery)</span>
              </button>
            ) : (
              <form onSubmit={handleWhatsAppCheckout} className="space-y-3 pt-2">
                <input
                  type="text"
                  required
                  placeholder="Votre Nom & Prénom"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-white border border-zinc-200 focus:outline-none focus:border-zinc-900 text-zinc-800"
                />

                <input
                  type="tel"
                  required
                  placeholder="Numéro de Téléphone (WhatsApp)"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-white border border-zinc-200 focus:outline-none focus:border-zinc-900 text-zinc-800"
                />

                <select
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-white border border-zinc-200 focus:outline-none focus:border-zinc-900 text-zinc-800 cursor-pointer"
                >
                  {MOROCCO_CITIES.map((c) => (
                    <option key={c} value={c}>
                      {c} (Livraison Express 24h-48h)
                    </option>
                  ))}
                </select>

                <textarea
                  rows={2}
                  required
                  placeholder="Adresse complète de livraison (Quartier, Rue, N°...)"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-white border border-zinc-200 focus:outline-none focus:border-zinc-900 text-zinc-800 resize-none"
                />

                <button
                  type="submit"
                  className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs uppercase tracking-[0.2em] font-medium transition-colors flex items-center justify-center gap-2 shadow-xs cursor-pointer"
                >
                  <WhatsApp21stIcon className="w-4 h-4" />
                  <span>Confirmer la commande sur WhatsApp</span>
                </button>
              </form>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
