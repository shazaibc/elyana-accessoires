import { Product, StoreSettings } from '@/types';

export const DEFAULT_SETTINGS: StoreSettings = {
  whatsappNumber: '212625857015',
  storeName: 'Manad Store',
  location: 'Casablanca, Boulevard Al Qods / Dakhla, Maroc',
  announcementText: 'Livraison Express dans tout le Maroc • Paiement à la livraison (Cash on Delivery) • Satisfait ou remboursé',
  deliveryTimeCasablanca: 'Moins de 24h',
  deliveryTimeMorocco: '24h à 48h'
};

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'ely-001',
    name: 'Bague Solitaire Éclat Divin',
    slug: 'bague-solitaire-eclat-divin',
    description: 'Une bague solitaire d’une grâce intemporelle. Sertie d’un zircon cubique taille brillant facetté comme un véritable diamant, sur une monture fine en argent 925 rhodié. Résiste à l’eau et conserve son éclat éternellement.',
    price: 249,
    originalPrice: 320,
    category: 'bagues',
    material: 'Argent 925',
    sizes: ['50 (S)', '52 (M)', '54 (L)', '56 (XL)'],
    stock: 12,
    images: [
      'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=900&q=85',
      'https://images.unsplash.com/photo-1603561591411-07134e71a2a9?auto=format&fit=crop&w=900&q=85'
    ],
    featured: true,
    isNew: true,
    bestseller: true
  },
  {
    id: 'ely-002',
    name: 'Collier Sautoir Trèfle Nacre & Or',
    slug: 'collier-sautoir-trefle-nacre-or',
    description: 'Inspiré des plus grandes maisons de haute joaillerie, ce sautoir orné de motifs trèfles en nacre naturelle blanche est confectionné en acier inoxydable plaqué or 18k. Un symbole de chance et de raffinement absolu.',
    price: 289,
    originalPrice: 350,
    category: 'colliers',
    material: 'Or 18K',
    sizes: ['45 cm + 5 cm ajustable'],
    stock: 18,
    images: [
      'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=900&q=85',
      'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=900&q=85'
    ],
    featured: true,
    bestseller: true
  },
  {
    id: 'ely-003',
    name: 'Bracelet Jonc Ouvrant Signature Royale',
    slug: 'bracelet-jonc-ouvrant-signature-royale',
    description: 'Jonc rigide à fermoir invisible sécurisé, serti d’oxydes de zirconium étincelants. Confectionné en acier chirurgical 316L anti-allergique, hypoallergénique et inaltérable sous l’eau ou le parfum.',
    price: 219,
    originalPrice: 280,
    category: 'bracelets',
    material: 'Acier Inoxydable',
    sizes: ['Ajustable (Poignet 15-18 cm)'],
    stock: 9,
    images: [
      'https://images.unsplash.com/photo-1573408301185-9146fe634ad0?auto=format&fit=crop&w=900&q=85',
      'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=900&q=85'
    ],
    featured: true,
    bestseller: true
  },
  {
    id: 'ely-004',
    name: 'Boucles d’Oreilles Créoles Torsadées Dorées',
    slug: 'boucles-oreilles-creoles-torsadees-dorees',
    description: 'Créoles modernes à relief torsadé ultra-léger, offrant une luminosité subtile au visage. Fermoir à clic discret et confortable pour un porté quotidien sans aucune sensation de lourdeur.',
    price: 149,
    originalPrice: 199,
    category: 'boucles',
    material: 'Plaqué Or',
    sizes: ['Diamètre 25 mm'],
    stock: 24,
    images: [
      'https://images.unsplash.com/photo-1630019852942-f89202989a59?auto=format&fit=crop&w=900&q=85',
      'https://images.unsplash.com/photo-1635767798638-3e25273a8236?auto=format&fit=crop&w=900&q=85'
    ],
    featured: true,
    isNew: true
  },
  {
    id: 'ely-005',
    name: 'Bague Éternité Diamants Scintillants',
    slug: 'bague-eternite-diamants-scintillants',
    description: 'Une rangée continue de cristaux purs sertis grain, symbole d’amour et d’élégance perpétuelle. Idéale portée seule ou en accumulation avec un solitaire.',
    price: 189,
    category: 'bagues',
    material: 'Argent 925',
    sizes: ['50 (S)', '52 (M)', '54 (L)', '56 (XL)'],
    stock: 8,
    images: [
      'https://images.unsplash.com/photo-1603561591411-07134e71a2a9?auto=format&fit=crop&w=900&q=85',
      'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=900&q=85'
    ],
    featured: true
  },
  {
    id: 'ely-006',
    name: 'Bracelet Rivière de Diamants Tennis',
    slug: 'bracelet-riviere-de-diamants-tennis',
    description: 'Le grand classique de la joaillerie moderne. Bracelet tennis souple composé de cristaux scintillants taillés avec une précision laser. Double fermoir de sécurité joaillier.',
    price: 319,
    originalPrice: 390,
    category: 'bracelets',
    material: 'Argent 925',
    sizes: ['17 cm', '19 cm'],
    stock: 6,
    images: [
      'https://images.unsplash.com/photo-1599643477877-530eb83abc8e?auto=format&fit=crop&w=900&q=85',
      'https://images.unsplash.com/photo-1611591475879-1662998638b9?auto=format&fit=crop&w=900&q=85'
    ],
    featured: true,
    bestseller: true
  },
  {
    id: 'ely-007',
    name: 'Collier Médaille Martelé Constellation',
    slug: 'collier-medaille-martele-constellation',
    description: 'Pendentif médaille solaire martelée à la main ornée d’une étoile centrale sertie. Un bijou talisman protecteur au charme bohème chic intemporel.',
    price: 169,
    category: 'colliers',
    material: 'Acier Inoxydable',
    sizes: ['42 cm + 5 cm extension'],
    stock: 15,
    images: [
      'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=900&q=85',
      'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=900&q=85'
    ],
    featured: false,
    isNew: true
  },
  {
    id: 'ely-008',
    name: 'Montre Élysée Cadran Nacre & Or Rose',
    slug: 'montre-elysee-cadran-nacre-or-rose',
    description: 'Cadran épuré en nacre véritable aux reflets rosés iridescents, boîtier ultra-plat en acier doré et bracelet milanais ajustable. Mouvement à quartz japonais haute précision.',
    price: 349,
    originalPrice: 450,
    category: 'montres',
    material: 'Acier Inoxydable',
    sizes: ['Taille Unique Réglable'],
    stock: 7,
    images: [
      'https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=900&q=85',
      'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=900&q=85'
    ],
    featured: true,
    bestseller: true
  },
  {
    id: 'ely-009',
    name: 'Boucles Pendantes Cascade Lumineuse',
    slug: 'boucles-pendantes-cascade-lumineuse',
    description: 'Lignes délicates de cristaux qui captent la lumière à chaque mouvement. Parfaites pour illuminer vos tenues de soirée, fiançailles ou caftans d’exception.',
    price: 179,
    category: 'boucles',
    material: 'Diamant',
    sizes: ['Longueur 5 cm'],
    stock: 14,
    images: [
      'https://images.unsplash.com/photo-1635767798638-3e25273a8236?auto=format&fit=crop&w=900&q=85',
      'https://images.unsplash.com/photo-1630019852942-f89202989a59?auto=format&fit=crop&w=900&q=85'
    ],
    featured: false
  },
  {
    id: 'ely-010',
    name: 'Coffret Prestige Écrin Manad (Pack 3 Pièces)',
    slug: 'coffret-prestige-ecrin-manad',
    description: 'L’ensemble cadeau ultime livré dans son écrin de velours noir & or Manad Store : Collier trèfle or, bracelet jonc assorti et bague ajustable. Le pack parfait à offrir ou pour se faire plaisir.',
    price: 499,
    originalPrice: 650,
    category: 'packs',
    material: 'Or 18K',
    sizes: ['Coffret Complet Prêt-à-Offrir'],
    stock: 10,
    images: [
      'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=900&q=85',
      'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=900&q=85'
    ],
    featured: true,
    bestseller: true
  },
  {
    id: 'ely-011',
    name: 'Bague Chevalière Serpent Vintage',
    slug: 'bague-chevaliere-serpent-vintage',
    description: 'Le motif serpent réinventé avec deux yeux en émeraudes synthétiques et écailles ciselées. Une pièce forte et sculpturale qui sublime toutes les mains.',
    price: 159,
    category: 'bagues',
    material: 'Acier Inoxydable',
    sizes: ['52 (M)', '54 (L)', '56 (XL)'],
    stock: 11,
    images: [
      'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=900&q=85',
      'https://images.unsplash.com/photo-1603561591411-07134e71a2a9?auto=format&fit=crop&w=900&q=85'
    ],
    featured: false,
    isNew: true
  },
  {
    id: 'ely-012',
    name: 'Montre Élégance Cadran Noir & Acier Argent',
    slug: 'montre-elegance-cadran-noir-acier-argent',
    description: 'L’accord parfait entre le noir profond du cadran minimaliste et la pureté de l’argent poli. Étanche 3 ATM, verre minéral saphir inrayable.',
    price: 369,
    originalPrice: 480,
    category: 'montres',
    material: 'Acier Inoxydable',
    sizes: ['Taille Unique Ajustable'],
    stock: 5,
    images: [
      'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=900&q=85',
      'https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=900&q=85'
    ],
    featured: true
  }
];
