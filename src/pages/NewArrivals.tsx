import React from 'react';
import ProductGrid from '../components/ProductGrid';
import { mockProducts } from '../data/mockData';
import { Product } from '../types';

interface NewArrivalsProps {
  onQuickView: (product: Product) => void;
  onAddToWishlist: (productId: string) => void;
}

const NewArrivals: React.FC<NewArrivalsProps> = ({ onQuickView, onAddToWishlist }) => {
  const products = mockProducts.filter(p => p.isNew && p.category !== 'men' && p.category !== 'kids');

  return (
    <main className="bg-zara-off-white">
      <div className="max-w-[1280px] mx-auto px-6">
        <h1 className="text-3xl font-bold mt-10 mb-2 text-zara-near-black">New Arrivals</h1>
        <p className="text-zara-charcoal mb-8">Fresh pieces that move with every version of you.</p>
      </div>
      <ProductGrid
        products={products}
        title=""
        onQuickView={onQuickView}
        onAddToWishlist={onAddToWishlist}
      />
    </main>
  );
};

export default NewArrivals;
