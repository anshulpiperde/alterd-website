export interface Product {
  id: string;
  title: string;
  subtitle?: string;
  price: {
    current: number;
    original?: number;
    currency: string;
  };
  images: string[];
  category: string;
  sizes: string[];
  colors: string[];
  isNew?: boolean;
  onSale?: boolean;
  rating?: {
    average: number;
    count: number;
  };
  description?: string;
  stock: number;
}

export interface CartItem {
  id: string;
  product: Product;
  size: string;
  color: string;
  quantity: number;
}

export interface Collection {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  link: string;
}

export interface FilterOptions {
  categories: string[];
  sizes: string[];
  colors: string[];
  priceRange: {
    min: number;
    max: number;
  };
}

export interface User {
  id: string;
  name: string;
  email: string;
  isLoggedIn: boolean;
}