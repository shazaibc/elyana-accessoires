'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useStore } from '@/context/StoreContext';
import { Product, ProductCategory, ProductMaterial } from '@/types';
import {
  Lock,
  Plus,
  Edit2,
  Trash2,
  ArrowLeft,
  Package,
  DollarSign,
  AlertTriangle,
  RotateCcw,
  Check,
  Search,
  Settings as SettingsIcon,
  ShieldAlert,
  Sparkles,
  ExternalLink
} from 'lucide-react';

const ADMIN_PIN = 'manad2024';

const CATEGORIES: { label: string; value: ProductCategory }[] = [
  { label: 'Bagues', value: 'bagues' },
  { label: 'Colliers & Sautoirs', value: 'colliers' },
  { label: 'Bracelets', value: 'bracelets' },
  { label: 'Boucles d’Oreilles', value: 'boucles' },
  { label: 'Montres', value: 'montres' },
  { label: 'Packs & Coffrets', value: 'packs' }
];

const MATERIALS: ProductMaterial[] = [
  'Diamant',
  'Or 18K',
  'Plaqué Or',
  'Argent 925',
  'Acier Inoxydable'
];

export default function AdminPage() {
  const {
    products,
    settings,
    addProduct,
    updateProduct,
    deleteProduct,
    resetToInitialCatalog,
    updateSettings
  } = useStore();

  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState(false);

  // Filter / Search
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState<string>('all');

  // Modals
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  // Form State for Add / Edit
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: 199,
    originalPrice: 0,
    category: 'bagues' as ProductCategory,
    material: 'Acier Inoxydable' as ProductMaterial,
    sizes: '50, 52, 54, 56',
    stock: 10,
    images: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=800&q=80',
    bestseller: false,
    isNew: true
  });

  // Settings Form State
  const [settingsData, setSettingsData] = useState({
    whatsappNumber: settings.whatsappNumber,
    announcementText: settings.announcementText,
    location: settings.location
  });

  // Authenticate
  const handlePinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pinInput === ADMIN_PIN || pinInput === 'elyana2024' || pinInput === 'admin') {
      setIsAuthenticated(true);
      setPinError(false);
    } else {
      setPinError(true);
    }
  };

  // Open Edit Modal
  const openEditModal = (p: Product) => {
    setEditingProduct(p);
    setFormData({
      name: p.name,
      description: p.description,
      price: p.price,
      originalPrice: p.originalPrice || 0,
      category: p.category,
      material: p.material,
      sizes: p.sizes.join(', '),
      stock: p.stock,
      images: p.images.join('\n'),
      bestseller: !!p.bestseller,
      isNew: !!p.isNew
    });
  };

  // Open Add Modal
  const openAddModal = () => {
    setEditingProduct(null);
    setFormData({
      name: '',
      description: '',
      price: 249,
      originalPrice: 0,
      category: 'bagues',
      material: 'Acier Inoxydable',
      sizes: '50, 52, 54, 56',
      stock: 15,
      images: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=800&q=80',
      bestseller: false,
      isNew: true
    });
    setIsAddModalOpen(true);
  };

  // Save product (Add or Update)
  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();

    const parsedSizes = formData.sizes
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);

    const parsedImages = formData.images
      .split('\n')
      .map((img) => img.trim())
      .filter(Boolean);

    if (editingProduct) {
      updateProduct(editingProduct.id, {
        name: formData.name,
        description: formData.description,
        price: Number(formData.price),
        originalPrice: formData.originalPrice ? Number(formData.originalPrice) : undefined,
        category: formData.category,
        material: formData.material,
        sizes: parsedSizes.length > 0 ? parsedSizes : ['Standard'],
        stock: Number(formData.stock),
        images: parsedImages.length > 0 ? parsedImages : [editingProduct.images[0]],
        bestseller: formData.bestseller,
        isNew: formData.isNew
      });
      setEditingProduct(null);
    } else {
      addProduct({
        name: formData.name,
        description: formData.description,
        price: Number(formData.price),
        originalPrice: formData.originalPrice ? Number(formData.originalPrice) : undefined,
        category: formData.category,
        material: formData.material,
        sizes: parsedSizes.length > 0 ? parsedSizes : ['Standard'],
        stock: Number(formData.stock),
        images: parsedImages.length > 0 ? parsedImages : ['https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=800&q=80'],
        bestseller: formData.bestseller,
        isNew: formData.isNew
      });
      setIsAddModalOpen(false);
    }
  };

  // Metrics
  const totalStockUnits = products.reduce((sum, p) => sum + (p.stock || 0), 0);
  const totalValuation = products.reduce((sum, p) => sum + p.price * (p.stock || 0), 0);
  const lowStockCount = products.filter((p) => p.stock <= 5).length;

  // Filtered Products Table
  const filteredProducts = products.filter((p) => {
    const matchCat = filterCategory === 'all' || p.category === filterCategory;
    const matchSearch =
      searchTerm.trim() === '' ||
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.material.toLowerCase().includes(searchTerm.toLowerCase());
    return matchCat && matchSearch;
  });

  // If not authenticated, render Login Screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-zinc-50 flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-white p-8 border border-zinc-200 shadow-xl text-center">
          <div className="w-12 h-12 rounded-full bg-[#FAF6EF] text-[#B89047] border border-[#EADBBE] mx-auto flex items-center justify-center mb-4">
            <Lock className="w-5 h-5" />
          </div>

          <h1 className="font-serif text-2xl text-zinc-900 font-normal">
            Espace Administrateur
          </h1>
          <p className="text-xs text-zinc-500 font-light mt-1 mb-6">
            Manad Store • Gestion du stock & catalogue
          </p>

          <form onSubmit={handlePinSubmit} className="space-y-4">
            <div>
              <input
                type="password"
                placeholder="Entrez le code d'accès"
                value={pinInput}
                onChange={(e) => {
                  setPinInput(e.target.value);
                  setPinError(false);
                }}
                className="w-full px-4 py-3 text-center tracking-widest text-sm bg-zinc-50 border border-zinc-200 focus:outline-none focus:border-zinc-900"
                autoFocus
              />
              {pinError && (
                <p className="text-xs text-rose-600 mt-2">
                  Code incorrect. (Indice par défaut : manad2024)
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-zinc-900 hover:bg-black text-white text-xs uppercase tracking-widest font-medium transition-colors"
            >
              Déverrouiller
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-zinc-100">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-xs text-zinc-500 hover:text-zinc-900"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Retour à la boutique</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-50 pb-20">
      {/* Top Admin Header */}
      <header className="bg-white border-b border-zinc-200 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="text-xs uppercase tracking-wider text-zinc-500 hover:text-zinc-900 flex items-center gap-1.5"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Boutique</span>
            </Link>
            <span className="text-zinc-300">|</span>
            <span className="font-serif text-lg text-zinc-900 font-normal">
              Manad Store Admin Panel
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsSettingsOpen(true)}
              className="p-2 text-zinc-600 hover:text-zinc-900 border border-zinc-200 bg-zinc-50 hover:bg-white rounded-xs transition-colors flex items-center gap-1.5 text-xs"
              title="Paramètres de la boutique"
            >
              <SettingsIcon className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Paramètres</span>
            </button>

            <button
              onClick={openAddModal}
              className="px-4 py-2 bg-zinc-900 hover:bg-black text-white text-xs uppercase tracking-wider font-medium flex items-center gap-2 shadow-xs transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>Nouveau Produit</span>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* KPI Metrics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="p-5 bg-white border border-zinc-200">
            <span className="text-xs uppercase tracking-wider text-zinc-500">Références Actives</span>
            <div className="mt-2 flex items-baseline justify-between">
              <span className="font-serif text-3xl font-normal text-zinc-900">{products.length}</span>
              <Package className="w-5 h-5 text-zinc-400" />
            </div>
            <p className="text-[11px] text-zinc-400 mt-1">Visibles sur le catalogue public</p>
          </div>

          <div className="p-5 bg-white border border-zinc-200">
            <span className="text-xs uppercase tracking-wider text-zinc-500">Stock Total (Unités)</span>
            <div className="mt-2 flex items-baseline justify-between">
              <span className="font-serif text-3xl font-normal text-zinc-900">{totalStockUnits}</span>
              <span className="text-xs bg-emerald-50 text-emerald-700 px-2 py-0.5 font-medium">Privé</span>
            </div>
            <p className="text-[11px] text-zinc-400 mt-1">Strictement masqué aux clients</p>
          </div>

          <div className="p-5 bg-white border border-zinc-200">
            <span className="text-xs uppercase tracking-wider text-zinc-500">Valeur Marchande du Stock</span>
            <div className="mt-2 flex items-baseline justify-between">
              <span className="font-serif text-3xl font-normal text-zinc-900">{totalValuation}</span>
              <span className="text-xs text-zinc-500 font-sans">DH</span>
            </div>
            <p className="text-[11px] text-zinc-400 mt-1">Calculée selon prix de vente</p>
          </div>

          <div className="p-5 bg-white border border-zinc-200">
            <span className="text-xs uppercase tracking-wider text-zinc-500">Alertes Stock Faible (≤ 5)</span>
            <div className="mt-2 flex items-baseline justify-between">
              <span className="font-serif text-3xl font-normal text-rose-600">{lowStockCount}</span>
              <AlertTriangle className="w-5 h-5 text-rose-500" />
            </div>
            <p className="text-[11px] text-zinc-400 mt-1">À réapprovisionner prochainement</p>
          </div>
        </div>

        {/* Catalog Control Bar */}
        <div className="p-4 bg-white border border-zinc-200 mb-6 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          {/* Search bar */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
            <input
              type="text"
              placeholder="Rechercher par nom, matière..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs bg-zinc-50 border border-zinc-200 focus:outline-none focus:border-zinc-900"
            />
          </div>

          {/* Category Filter */}
          <div className="flex items-center gap-3">
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              aria-label="Filtrer les produits par catégorie"
              className="px-3 py-2 text-xs bg-zinc-50 border border-zinc-200 text-zinc-700 focus:outline-none cursor-pointer"
            >
              <option value="all">Toutes les catégories</option>
              {CATEGORIES.map((c) => (
                <option key={c.value} value={c.value}>
                  {c.label}
                </option>
              ))}
            </select>

            <button
              onClick={() => {
                if (confirm('Voulez-vous réinitialiser le catalogue avec les données d’origine ? Les modifications récentes seront écrasées.')) {
                  resetToInitialCatalog();
                }
              }}
              className="px-3 py-2 text-xs text-zinc-600 hover:text-zinc-900 border border-zinc-200 hover:bg-zinc-50 flex items-center gap-1.5 transition-colors"
              title="Réinitialiser le catalogue d'usine"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Réinitialiser</span>
            </button>
          </div>
        </div>

        {/* Product Table */}
        <div className="bg-white border border-zinc-200 shadow-xs overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-zinc-200 bg-zinc-50/70 text-[11px] uppercase tracking-wider text-zinc-500 font-semibold">
                <th className="py-3 px-4">Produit</th>
                <th className="py-3 px-4">Catégorie</th>
                <th className="py-3 px-4">Matière</th>
                <th className="py-3 px-4">Prix (DH)</th>
                <th className="py-3 px-4">Tailles</th>
                <th className="py-3 px-4">
                  <span className="inline-flex items-center gap-1 text-[#B89047]">
                    Stock (Admin)
                  </span>
                </th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100 text-xs">
              {filteredProducts.map((p) => {
                const isLow = p.stock <= 5;
                const isOut = p.stock === 0;

                return (
                  <tr key={p.id} className="hover:bg-zinc-50/60 transition-colors">
                    {/* Image & Title */}
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <div className="relative w-12 h-12 bg-zinc-100 shrink-0 border border-zinc-200 overflow-hidden">
                          <Image
                            src={p.images[0]}
                            alt={p.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <p className="font-serif text-sm text-zinc-900 font-normal">
                            {p.name}
                          </p>
                          <div className="flex items-center gap-2 mt-0.5">
                            {p.bestseller && (
                              <span className="text-[9px] bg-[#FAF6EF] text-[#B89047] px-1.5 py-0.2 rounded-xs font-medium border border-[#EADBBE]">
                                Bestseller
                              </span>
                            )}
                            {p.isNew && (
                              <span className="text-[9px] bg-zinc-100 text-zinc-700 px-1.5 py-0.2 rounded-xs font-medium">
                                Nouveau
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Category */}
                    <td className="py-3 px-4 text-zinc-600 capitalize">
                      {p.category}
                    </td>

                    {/* Material */}
                    <td className="py-3 px-4 text-zinc-600">
                      {p.material}
                    </td>

                    {/* Price */}
                    <td className="py-3 px-4 font-medium text-zinc-900">
                      {p.price} DH
                    </td>

                    {/* Sizes */}
                    <td className="py-3 px-4 text-zinc-600 max-w-xs">
                      <div className="flex flex-wrap gap-1">
                        {p.sizes.map((s) => (
                          <span key={s} className="bg-zinc-100 text-zinc-700 px-1.5 py-0.5 text-[10px]">
                            {s}
                          </span>
                        ))}
                      </div>
                    </td>

                    {/* Stock (Admin Only) */}
                    <td className="py-3 px-4">
                      <span
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-xs ${
                          isOut
                            ? 'bg-rose-100 text-rose-800'
                            : isLow
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-emerald-100 text-emerald-800'
                        }`}
                      >
                        {p.stock} unités
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => openEditModal(p)}
                          className="p-1.5 text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100 transition-colors"
                          title="Modifier le produit"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => {
                            if (confirm(`Confirmer la suppression de "${p.name}" ?`)) {
                              deleteProduct(p.id);
                            }
                          }}
                          className="p-1.5 text-zinc-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                          title="Supprimer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          {filteredProducts.length === 0 && (
            <div className="text-center py-12 text-zinc-400 text-xs">
              Aucun produit trouvé dans cette vue.
            </div>
          )}
        </div>
      </main>

      {/* Add / Edit Product Modal */}
      {(isAddModalOpen || editingProduct) && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-2xl p-6 sm:p-8 shadow-2xl border border-zinc-200">
            <h2 className="font-serif text-2xl text-zinc-900 mb-6">
              {editingProduct ? 'Modifier la Création' : 'Ajouter une Nouvelle Création'}
            </h2>

            <form onSubmit={handleSaveProduct} className="space-y-4 text-xs">
              {/* Name */}
              <div>
                <label className="block uppercase tracking-wider text-zinc-700 font-semibold mb-1">
                  Nom du produit :
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Ex : Bague Solitaire Diamant Manad"
                  className="w-full px-3 py-2 bg-zinc-50 border border-zinc-200 focus:outline-none focus:border-zinc-900"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block uppercase tracking-wider text-zinc-700 font-semibold mb-1">
                  Description & Détails de confection :
                </label>
                <textarea
                  rows={3}
                  required
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Détails du métal, finitions, résistance..."
                  className="w-full px-3 py-2 bg-zinc-50 border border-zinc-200 focus:outline-none focus:border-zinc-900 resize-none"
                />
              </div>

              {/* Category & Material */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block uppercase tracking-wider text-zinc-700 font-semibold mb-1">
                    Catégorie :
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value as ProductCategory })}
                    className="w-full px-3 py-2 bg-zinc-50 border border-zinc-200 focus:outline-none cursor-pointer"
                  >
                    {CATEGORIES.map((c) => (
                      <option key={c.value} value={c.value}>
                        {c.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block uppercase tracking-wider text-zinc-700 font-semibold mb-1">
                    Matière Principale :
                  </label>
                  <select
                    value={formData.material}
                    onChange={(e) => setFormData({ ...formData, material: e.target.value as ProductMaterial })}
                    className="w-full px-3 py-2 bg-zinc-50 border border-zinc-200 focus:outline-none cursor-pointer"
                  >
                    {MATERIALS.map((m) => (
                      <option key={m} value={m}>
                        {m}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Price, Original Price, Stock */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block uppercase tracking-wider text-zinc-700 font-semibold mb-1">
                    Prix de vente (DH) :
                  </label>
                  <input
                    type="number"
                    required
                    min={1}
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                    className="w-full px-3 py-2 bg-zinc-50 border border-zinc-200 focus:outline-none focus:border-zinc-900"
                  />
                </div>

                <div>
                  <label className="block uppercase tracking-wider text-zinc-700 font-semibold mb-1">
                    Prix barré (optionnel) :
                  </label>
                  <input
                    type="number"
                    min={0}
                    value={formData.originalPrice}
                    onChange={(e) => setFormData({ ...formData, originalPrice: Number(e.target.value) })}
                    className="w-full px-3 py-2 bg-zinc-50 border border-zinc-200 focus:outline-none focus:border-zinc-900"
                  />
                </div>

                <div>
                  <label className="block uppercase tracking-wider text-[#B89047] font-bold mb-1">
                    Stock (Visible Admin Seul) :
                  </label>
                  <input
                    type="number"
                    required
                    min={0}
                    value={formData.stock}
                    onChange={(e) => setFormData({ ...formData, stock: Number(e.target.value) })}
                    className="w-full px-3 py-2 bg-[#FAF6EF] border border-[#EADBBE] focus:outline-none focus:border-[#B89047] font-bold"
                  />
                </div>
              </div>

              {/* Sizes */}
              <div>
                <label className="block uppercase tracking-wider text-zinc-700 font-semibold mb-1">
                  Tailles disponibles (séparées par une virgule) :
                </label>
                <input
                  type="text"
                  value={formData.sizes}
                  onChange={(e) => setFormData({ ...formData, sizes: e.target.value })}
                  placeholder="Ex : 50, 52, 54, 56 ou Ajustable ou 45 cm"
                  className="w-full px-3 py-2 bg-zinc-50 border border-zinc-200 focus:outline-none focus:border-zinc-900"
                />
              </div>

              {/* Image URLs */}
              <div>
                <label className="block uppercase tracking-wider text-zinc-700 font-semibold mb-1">
                  URLs des images (une par ligne) :
                </label>
                <textarea
                  rows={2}
                  value={formData.images}
                  onChange={(e) => setFormData({ ...formData, images: e.target.value })}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full px-3 py-2 bg-zinc-50 border border-zinc-200 focus:outline-none focus:border-zinc-900 resize-none"
                />
              </div>

              {/* Toggles */}
              <div className="flex items-center gap-6 pt-2">
                <label className="inline-flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.bestseller}
                    onChange={(e) => setFormData({ ...formData, bestseller: e.target.checked })}
                    className="rounded text-zinc-900"
                  />
                  <span>Mettre en Bestseller</span>
                </label>

                <label className="inline-flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.isNew}
                    onChange={(e) => setFormData({ ...formData, isNew: e.target.checked })}
                    className="rounded text-zinc-900"
                  />
                  <span>Badge Nouveauté</span>
                </label>
              </div>

              {/* Modal Actions */}
              <div className="pt-6 border-t border-zinc-200 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setIsAddModalOpen(false);
                    setEditingProduct(null);
                  }}
                  className="px-4 py-2 border border-zinc-200 text-zinc-600 hover:bg-zinc-50 uppercase tracking-wider"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-zinc-900 hover:bg-black text-white uppercase tracking-wider font-medium shadow-xs"
                >
                  {editingProduct ? 'Enregistrer les Modifications' : 'Créer le Produit'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Settings Modal */}
      {isSettingsOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-lg p-6 sm:p-8 shadow-2xl border border-zinc-200">
            <h2 className="font-serif text-2xl text-zinc-900 mb-4">
              Paramètres de la Boutique
            </h2>
            <p className="text-xs text-zinc-500 mb-6">
              Mettez à jour vos coordonnées WhatsApp et messages d’annonce.
            </p>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                updateSettings(settingsData);
                setIsSettingsOpen(false);
              }}
              className="space-y-4 text-xs"
            >
              <div>
                <label className="block uppercase tracking-wider text-zinc-700 font-semibold mb-1">
                  Numéro WhatsApp de réception des commandes :
                </label>
                <input
                  type="text"
                  required
                  value={settingsData.whatsappNumber}
                  onChange={(e) => setSettingsData({ ...settingsData, whatsappNumber: e.target.value })}
                  placeholder="212625857015"
                  className="w-full px-3 py-2 bg-zinc-50 border border-zinc-200 focus:outline-none focus:border-zinc-900"
                />
                <span className="text-[10px] text-zinc-400">Format international sans le + (Ex : 212625857015)</span>
              </div>

              <div>
                <label className="block uppercase tracking-wider text-zinc-700 font-semibold mb-1">
                  Bandeau d’annonce en haut du site :
                </label>
                <textarea
                  rows={2}
                  value={settingsData.announcementText}
                  onChange={(e) => setSettingsData({ ...settingsData, announcementText: e.target.value })}
                  className="w-full px-3 py-2 bg-zinc-50 border border-zinc-200 focus:outline-none focus:border-zinc-900 resize-none"
                />
              </div>

              <div>
                <label className="block uppercase tracking-wider text-zinc-700 font-semibold mb-1">
                  Zone de Livraison & Adresse :
                </label>
                <input
                  type="text"
                  value={settingsData.location}
                  onChange={(e) => setSettingsData({ ...settingsData, location: e.target.value })}
                  className="w-full px-3 py-2 bg-zinc-50 border border-zinc-200 focus:outline-none focus:border-zinc-900"
                />
              </div>

              <div className="pt-6 border-t border-zinc-200 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsSettingsOpen(false)}
                  className="px-4 py-2 border border-zinc-200 text-zinc-600 hover:bg-zinc-50 uppercase tracking-wider"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-zinc-900 hover:bg-black text-white uppercase tracking-wider font-medium shadow-xs"
                >
                  Enregistrer les Paramètres
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
