export type ProductCategory = 
  | 'bagues' 
  | 'colliers' 
  | 'bracelets' 
  | 'boucles' 
  | 'montres' 
  | 'packs';

export type ProductMaterial = 
  | 'Diamant' 
  | 'Or 18K' 
  | 'Plaqué Or' 
  | 'Argent 925' 
  | 'Acier Inoxydable';

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number; // in MAD (Dirhams)
  originalPrice?: number;
  category: ProductCategory;
  material: ProductMaterial;
  sizes: string[];
  stock: number; // ADMIN ONLY
  images: string[];
  featured?: boolean;
  isNew?: boolean;
  bestseller?: boolean;
  inStock?: boolean;
}

export interface CartItem {
  product: Product;
  selectedSize: string;
  quantity: number;
}

export interface CustomJewelryRequest {
  id: string;
  fullName: string;
  phone: string;
  city: string;
  pieceType: string;
  material: string;
  engravingText?: string;
  estimatedBudget?: string;
  notes?: string;
  createdAt: string;
}

export interface StoreSettings {
  whatsappNumber: string; // e.g. "212625857015"
  storeName: string;
  location: string;
  announcementText: string;
  deliveryTimeCasablanca: string;
  deliveryTimeMorocco: string;
}
