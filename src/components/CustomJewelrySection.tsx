'use client';

import React, { useState } from 'react';
import { useStore } from '@/context/StoreContext';
import { Sparkles, MessageCircle, Gem, PenTool, CheckCircle, ArrowRight } from 'lucide-react';

const JEWELRY_TYPES = [
  'Collier Prénom / Calligraphie',
  'Bague Gravée ou Solitaire',
  'Gourmette / Bracelet Personnalisé',
  'Piercing & Boucles Sur-Mesure',
  'Parure Événementielle (Caftan / Mariage)',
  'Autre Création Unique'
];

const MATERIALS = [
  'Acier Inoxydable Plaqué Or 18K (Anti-allergique)',
  'Argent Massif 925 Rhodié',
  'Or Jaune / Blanc 18K',
  'Serti Diamant Lab / Oxydes de Zirconium',
  'Nacre Naturelle & Pierres Fines'
];

const BUDGET_OPTIONS = [
  '150 DH - 300 DH',
  '300 DH - 600 DH',
  '600 DH - 1 200 DH',
  '+ 1 200 DH (Haute Joaillerie)'
];

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
  'Autre ville'
];

export default function CustomJewelrySection() {
  const { getWhatsAppCustomRequestUrl } = useStore();

  const [pieceType, setPieceType] = useState(JEWELRY_TYPES[0]);
  const [material, setMaterial] = useState(MATERIALS[0]);
  const [engravingText, setEngravingText] = useState('');
  const [estimatedBudget, setEstimatedBudget] = useState(BUDGET_OPTIONS[1]);
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState(MOROCCO_CITIES[0]);
  const [notes, setNotes] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const url = getWhatsAppCustomRequestUrl({
      fullName: fullName || 'Client Elyana',
      phone: phone || 'Non renseigné',
      city,
      pieceType,
      material,
      engravingText,
      estimatedBudget,
      notes
    });

    setSubmitted(true);
    // Open WhatsApp in new tab
    window.open(url, '_blank');
  };

  return (
    <section id="custom-jewelry" className="py-24 bg-white border-t border-zinc-100 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.25em] text-[#943859] font-medium mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Atelier de Confection</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light text-zinc-900 tracking-tight">
            Création Sur-Mesure & Personnalisation
          </h2>
          <p className="mt-4 text-zinc-500 font-light text-sm sm:text-base leading-relaxed">
            Vous rêvez d’un prénom calligraphié, d’une gravure de date symbolique ou d’une pièce inspirée ?
            Configurez votre projet en quelques clics et échangez directement avec notre créatrice sur WhatsApp.
          </p>
        </div>

        {/* Studio Process Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 max-w-4xl mx-auto">
          <div className="p-6 bg-zinc-50/70 border border-zinc-100 text-center">
            <span className="w-8 h-8 rounded-full bg-white text-[#943859] border border-rose-200 inline-flex items-center justify-center font-serif text-sm font-semibold mb-3">
              1
            </span>
            <h3 className="font-serif text-base text-zinc-900 font-normal">Définissez Votre Idée</h3>
            <p className="text-xs text-zinc-500 font-light mt-1.5 leading-relaxed">
              Choisissez le modèle, le métal, vos inscriptions personnalisées et votre budget.
            </p>
          </div>

          <div className="p-6 bg-zinc-50/70 border border-zinc-100 text-center">
            <span className="w-8 h-8 rounded-full bg-white text-[#943859] border border-rose-200 inline-flex items-center justify-center font-serif text-sm font-semibold mb-3">
              2
            </span>
            <h3 className="font-serif text-base text-zinc-900 font-normal">Échange WhatsApp</h3>
            <p className="text-xs text-zinc-500 font-light mt-1.5 leading-relaxed">
              Validation des maquettes, calligraphies et photos d’échantillons avec Yasmine.
            </p>
          </div>

          <div className="p-6 bg-zinc-50/70 border border-zinc-100 text-center">
            <span className="w-8 h-8 rounded-full bg-white text-[#943859] border border-rose-200 inline-flex items-center justify-center font-serif text-sm font-semibold mb-3">
              3
            </span>
            <h3 className="font-serif text-base text-zinc-900 font-normal">Façonnage & Livraison</h3>
            <p className="text-xs text-zinc-500 font-light mt-1.5 leading-relaxed">
              Confection soignée et livraison sécurisée à domicile avec paiement Cash on Delivery.
            </p>
          </div>
        </div>

        {/* Interactive Custom Order Form */}
        <div className="bg-[#FAF7F8]/60 border border-rose-100 p-6 sm:p-10 md:p-12 max-w-4xl mx-auto">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Step 1: Piece Type Selection */}
            <div>
              <label className="block text-xs uppercase tracking-widest text-zinc-800 font-semibold mb-3">
                1. Quel type de pièce souhaitez-vous créer ?
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
                {JEWELRY_TYPES.map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setPieceType(type)}
                    className={`p-3 text-left text-xs transition-all border ${
                      pieceType === type
                        ? 'border-zinc-900 bg-zinc-900 text-white font-medium shadow-xs'
                        : 'border-zinc-200 bg-white text-zinc-700 hover:border-zinc-400'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Material Selection */}
            <div>
              <label className="block text-xs uppercase tracking-widest text-zinc-800 font-semibold mb-3">
                2. Matière de confection souhaitée :
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {MATERIALS.map((mat) => (
                  <button
                    key={mat}
                    type="button"
                    onClick={() => setMaterial(mat)}
                    className={`p-3 text-left text-xs transition-all border ${
                      material === mat
                        ? 'border-zinc-900 bg-zinc-900 text-white font-medium shadow-xs'
                        : 'border-zinc-200 bg-white text-zinc-700 hover:border-zinc-400'
                    }`}
                  >
                    {mat}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 3: Engraving Text & Budget */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs uppercase tracking-widest text-zinc-800 font-semibold mb-2">
                  3. Prénom, Initiales ou Date à graver :
                </label>
                <input
                  type="text"
                  placeholder="Ex : Yasmine, 14.06.2024, Initiales M & S..."
                  value={engravingText}
                  onChange={(e) => setEngravingText(e.target.value)}
                  className="w-full px-4 py-3 text-xs bg-white border border-zinc-200 focus:outline-none focus:border-zinc-900 text-zinc-800"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-widest text-zinc-800 font-semibold mb-2">
                  4. Budget estimatif envisagé :
                </label>
                <select
                  value={estimatedBudget}
                  onChange={(e) => setEstimatedBudget(e.target.value)}
                  className="w-full px-4 py-3 text-xs bg-white border border-zinc-200 focus:outline-none focus:border-zinc-900 text-zinc-800 cursor-pointer"
                >
                  {BUDGET_OPTIONS.map((b) => (
                    <option key={b} value={b}>
                      {b}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Step 4: Contact details & City */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-zinc-200/60">
              <div>
                <label className="block text-xs uppercase tracking-wider text-zinc-700 font-medium mb-1.5">
                  Votre Nom Complet :
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ex : Kenza Alaoui"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs bg-white border border-zinc-200 focus:outline-none focus:border-zinc-900 text-zinc-800"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-zinc-700 font-medium mb-1.5">
                  Numéro WhatsApp :
                </label>
                <input
                  type="tel"
                  required
                  placeholder="Ex : 06 12 34 56 78"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs bg-white border border-zinc-200 focus:outline-none focus:border-zinc-900 text-zinc-800"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-zinc-700 font-medium mb-1.5">
                  Ville de Livraison :
                </label>
                <select
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs bg-white border border-zinc-200 focus:outline-none focus:border-zinc-900 text-zinc-800 cursor-pointer"
                >
                  {MOROCCO_CITIES.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Notes / Special Instructions */}
            <div>
              <label className="block text-xs uppercase tracking-wider text-zinc-700 font-medium mb-1.5">
                Précisions, style souhaité ou lien d’inspiration :
              </label>
              <textarea
                rows={3}
                placeholder="Décrivez vos envies particulières, police d’écriture, taille de chaîne, etc..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full px-4 py-3 text-xs bg-white border border-zinc-200 focus:outline-none focus:border-zinc-900 text-zinc-800 resize-none"
              />
            </div>

            {/* Submit Button */}
            <div className="pt-2 text-center">
              <button
                type="submit"
                className="w-full sm:w-auto px-10 py-4 bg-emerald-600 hover:bg-emerald-700 text-white text-xs uppercase tracking-[0.2em] font-medium transition-all duration-300 inline-flex items-center justify-center gap-3 shadow-md"
              >
                <MessageCircle className="w-4 h-4 fill-white" />
                <span>Transmettre mon Projet sur WhatsApp</span>
              </button>
              <p className="text-[11px] text-zinc-400 mt-3 font-light">
                Message personnalisé généré automatiquement à destination de notre atelier à Casablanca.
              </p>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
