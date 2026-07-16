export type CategoryId = 'clasicas' | 'gourmet' | 'especiales';

export interface Category {
  id: CategoryId;
  name: string;
  icon: string; // Lucide icon name
  description: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: CategoryId;
  image: string;
  isNew?: boolean;
  isPopular?: boolean;
  ingredients?: string[];
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  comment: string;
  rating: number;
  avatar: string;
}

export interface Promotion {
  id: string;
  title: string;
  description: string;
  price: number;
  originalPrice: number;
  badge: string;
  image: string;
  category: CategoryId;
}

export interface BrandInfo {
  name: string;
  slogan: string;
  logoUrl?: string;
  qrUrl?: string;
  heroImageUrl?: string;
  heroTitle?: string;
  heroSubtitle?: string;
  whatsapp: string;
  phone: string;
  address: string;
  schedule: string;
  social: {
    facebook: string;
    instagram: string;
    tiktok: string;
  };
}

