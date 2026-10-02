'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, CartItem, StoreSettings, CustomJewelryRequest } from '@/types';
import { INITIAL_PRODUCTS, DEFAULT_SETTINGS } from '@/data/initialProducts';

interface StoreContextType {
  products: Product[];
  settings: StoreSettings;
  cart: CartItem[];
  wishlist: string[];
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  addToCart: (product: Product, size: string, quantity?: number) => void;
  removeFromCart: (productId: string, size: string) => void;
  updateCartQuantity: (productId: string, size: string, quantity: number) => void;
  clearCart: () => void;
  toggleWishlist: (productId: string) => void;
  isWishlisted: (productId: string) => boolean;
  // Admin functions
  addProduct: (product: Omit<Product, 'id' | 'slug'>) => void;
  updateProduct: (id: string, updates: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  resetToInitialCatalog: () => void;
  updateSettings: (updates: Partial<StoreSettings>) => void;
  // WhatsApp utilities
  getWhatsAppOrderUrl: (product: Product, selectedSize: string, clientCity?: string) => string;
  getWhatsAppCartUrl: (clientInfo: { name: string; phone: string; address: string; city: string }) => string;
  getWhatsAppCustomRequestUrl: (req: Omit<CustomJewelryRequest, 'id' | 'createdAt'>) => string;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

const STORAGE_KEYS = {
  PRODUCTS: 'manad_products_v1',
  SETTINGS: 'manad_settings_v1',
  CART: 'manad_cart_v1',
  WISHLIST: 'manad_wishlist_v1',
};

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [settings, setSettings] = useState<StoreSettings>(DEFAULT_SETTINGS);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from LocalStorage once on client
  useEffect(() => {
    try {
      const storedProducts = localStorage.getItem(STORAGE_KEYS.PRODUCTS);
      if (storedProducts) {
        setProducts(JSON.parse(storedProducts));
      }

      const storedSettings = localStorage.getItem(STORAGE_KEYS.SETTINGS);
      if (storedSettings) {
        setSettings(JSON.parse(storedSettings));
      }

      const storedCart = localStorage.getItem(STORAGE_KEYS.CART);
      if (storedCart) {
        setCart(JSON.parse(storedCart));
      }

      const storedWishlist = localStorage.getItem(STORAGE_KEYS.WISHLIST);
      if (storedWishlist) {
        setWishlist(JSON.parse(storedWishlist));
      }
    } catch (e) {
      console.warn('LocalStorage load error:', e);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Sync to LocalStorage when changed
  useEffect(() => {
    if (!isLoaded) return;
    try {
      localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(products));
    } catch (e) {
      console.warn('Error saving products:', e);
    }
  }, [products, isLoaded]);

  useEffect(() => {
    if (!isLoaded) return;
    try {
      localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
    } catch (e) {
      console.warn('Error saving settings:', e);
    }
  }, [settings, isLoaded]);

  useEffect(() => {
    if (!isLoaded) return;
    try {
      localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(cart));
    } catch (e) {
      console.warn('Error saving cart:', e);
    }
  }, [cart, isLoaded]);

  useEffect(() => {
    if (!isLoaded) return;
    try {
      localStorage.setItem(STORAGE_KEYS.WISHLIST, JSON.stringify(wishlist));
    } catch (e) {
      console.warn('Error saving wishlist:', e);
    }
  }, [wishlist, isLoaded]);

  // Cart operations
  const addToCart = (product: Product, size: string, quantity = 1) => {
    setCart((prev) => {
      const existingIndex = prev.findIndex(
        (item) => item.product.id === product.id && item.selectedSize === size
      );
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += quantity;
        return updated;
      }
      return [...prev, { product, selectedSize: size, quantity }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (productId: string, size: string) => {
    setCart((prev) =>
      prev.filter((item) => !(item.product.id === productId && item.selectedSize === size))
    );
  };

  const updateCartQuantity = (productId: string, size: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId, size);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.product.id === productId && item.selectedSize === size
          ? { ...item, quantity }
          : item
      )
    );
  };

  const clearCart = () => setCart([]);

  // Wishlist
  const toggleWishlist = (productId: string) => {
    setWishlist((prev) =>
      prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]
    );
  };

  const isWishlisted = (productId: string) => wishlist.includes(productId);

  // Admin actions
  const addProduct = (newProdData: Omit<Product, 'id' | 'slug'>) => {
    const slug = newProdData.name
      .toLowerCase()
      .replace(/[^\w ]+/g, '')
      .replace(/ +/g, '-');
    const newProduct: Product = {
      ...newProdData,
      id: `ely-${Date.now()}`,
      slug: `${slug}-${Math.floor(Math.random() * 1000)}`
    };
    setProducts((prev) => [newProduct, ...prev]);
  };

  const updateProduct = (id: string, updates: Partial<Product>) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...updates } : p))
    );
  };

  const deleteProduct = (id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  const resetToInitialCatalog = () => {
    setProducts(INITIAL_PRODUCTS);
    setSettings(DEFAULT_SETTINGS);
    localStorage.removeItem(STORAGE_KEYS.PRODUCTS);
    localStorage.removeItem(STORAGE_KEYS.SETTINGS);
  };

  const updateSettings = (updates: Partial<StoreSettings>) => {
    setSettings((prev) => ({ ...prev, ...updates }));
  };

  // WhatsApp Helpers
  const getWhatsAppOrderUrl = (product: Product, selectedSize: string, clientCity = 'Casablanca') => {
    const phone = settings.whatsappNumber;
    const text = 
`Bonjour Manad Store,
Je souhaite commander cet article :

💍 *Produit :* ${product.name}
🏷️ *Prix :* ${product.price} DH
📐 *Taille choisie :* ${selectedSize}
💎 *Matière :* ${product.material}
📍 *Ville de livraison :* ${clientCity}
💵 *Paiement :* Cash à la livraison (COD)

Merci de me confirmer la disponibilité et le délai d'expédition !`;

    return `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
  };

  const getWhatsAppCartUrl = (clientInfo: { name: string; phone: string; address: string; city: string }) => {
    const phone = settings.whatsappNumber;
    const itemsList = cart
      .map(
        (item, index) =>
          `${index + 1}. *${item.product.name}* (Taille: ${item.selectedSize}) x${item.quantity} = ${item.product.price * item.quantity} DH`
      )
      .join('\n');

    const total = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

    const text = 
`Bonjour Manad Store,
Je souhaite valider ma commande avec Paiement à la Livraison (Cash on Delivery) :

🛍️ *Détails de la commande :*
${itemsList}

💰 *Total à régler à la livraison :* ${total} DH

👤 *Coordonnées de livraison :*
- Nom complet : ${clientInfo.name}
- Téléphone : ${clientInfo.phone}
- Ville : ${clientInfo.city}
- Adresse : ${clientInfo.address}

Merci de préparer mon colis pour expédition !`;

    return `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
  };

  const getWhatsAppCustomRequestUrl = (req: Omit<CustomJewelryRequest, 'id' | 'createdAt'>) => {
    const phone = settings.whatsappNumber;
    const text = 
`Bonjour Manad Store,
Je souhaite faire une demande de *Création Sur-Mesure* / Personnalisation :

💎 *Type de bijou :* ${req.pieceType}
✨ *Matière souhaitée :* ${req.material}
✍️ *Gravure / Prénom ou Texte :* ${req.engravingText || 'Non spécifié'}
💰 *Budget approximatif :* ${req.estimatedBudget || 'À définir ensemble'}
📍 *Ville :* ${req.city}
👤 *Nom du client :* ${req.fullName}
📞 *Téléphone :* ${req.phone}

📝 *Détails & Inspiration :*
${req.notes || 'Je souhaiterais voir des photos d\'inspiration et discuter des détails.'}

Merci de m'orienter vers la confection de cette pièce unique !`;

    return `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
  };

  return (
    <StoreContext.Provider
      value={{
        products,
        settings,
        cart,
        wishlist,
        isCartOpen,
        setIsCartOpen,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        toggleWishlist,
        isWishlisted,
        addProduct,
        updateProduct,
        deleteProduct,
        resetToInitialCatalog,
        updateSettings,
        getWhatsAppOrderUrl,
        getWhatsAppCartUrl,
        getWhatsAppCustomRequestUrl,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
}
