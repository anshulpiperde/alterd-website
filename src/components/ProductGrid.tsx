import React from 'react';
import ProductCard from './ProductCard';
import { Product } from '../types';

interface ProductGridProps {
  products: Product[];
  title: string;
  viewAllLink?: string;
  onQuickView: (product: Product) => void;
  onAddToWishlist: (productId: string) => void;
}

const ProductGrid: React.FC<ProductGridProps> = ({ 
  products, 
  title, 
  viewAllLink, 
  onQuickView, 
  onAddToWishlist 
}) => {
  return (
    <section className="py-16 bg-zara-white">
      <div className="max-w-[1280px] mx-auto px-6">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-zara-near-black">{title}</h2>
          {viewAllLink && (
            <a
              href={viewAllLink}
              className="text-sm font-medium border-b border-zara-near-black hover:border-zara-charcoal transition-colors duration-200 text-zara-near-black"
            >
              View All
            </a>
          )}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onQuickView={onQuickView}
              onAddToWishlist={onAddToWishlist}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductGrid;