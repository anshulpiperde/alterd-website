import React from 'react';
import ProductGrid from '../components/ProductGrid';
import { mockProducts } from '../data/mockData';
import { Product } from '../types';

interface TrendingProps {
  onQuickView: (product: Product) => void;
  onAddToWishlist: (productId: string) => void;
}

const Trending: React.FC<TrendingProps> = ({ onQuickView, onAddToWishlist }) => {
  const products = [...mockProducts]
    .filter(p => p.category !== 'men' && p.category !== 'kids')
    .sort((a, b) => (b.rating?.average || 0) - (a.rating?.average || 0))
    .slice(0, 8);

  return (
    <main className="bg-zara-off-white">
      <div className="max-w-[1280px] mx-auto px-6">
        <h1 className="text-3xl font-bold mt-10 mb-2 text-zara-near-black">Trending</h1>
        <p className="text-zara-charcoal mb-8">Most-loved styles that command attention.</p>
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

export default Trending;
