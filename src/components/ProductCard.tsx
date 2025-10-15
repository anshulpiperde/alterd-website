import React, { useState } from 'react';
import { Heart, Eye } from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onQuickView: (product: Product) => void;
  onAddToWishlist: (productId: string) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onQuickView, onAddToWishlist }) => {
  const [currentImage, setCurrentImage] = useState(0);
  const [isWishlisted, setIsWishlisted] = useState(false);

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsWishlisted(!isWishlisted);
    onAddToWishlist(product.id);
  };

  const handleQuickView = (e: React.MouseEvent) => {
    e.preventDefault();
    onQuickView(product);
  };

  return (
    <div className="group relative">
      <a href={`#/product/${product.id}`} className="block">
        <div className="relative aspect-[3/4] bg-zara-light-gray overflow-hidden">
          {/* Product Image */}
          <img
            src={product.images[currentImage]}
            alt={product.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            onMouseEnter={() => setCurrentImage(1 % product.images.length)}
            onMouseLeave={() => setCurrentImage(0)}
          />

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col space-y-1">
            {product.isNew && (
              <span className="bg-zara-near-black text-zara-white text-xs px-2 py-1">NEW</span>
            )}
            {product.onSale && (
              <span className="bg-zara-near-black text-zara-white text-xs px-2 py-1">SALE</span>
            )}
          </div>

          {/* Quick Actions */}
          <div className="absolute top-3 right-3 flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <button
              onClick={handleWishlist}
              className={`p-2 rounded-full backdrop-blur-sm transition-colors duration-200 ${
                isWishlisted 
                  ? 'bg-zara-near-black text-zara-white' 
                  : 'bg-zara-white/80 hover:bg-zara-white text-zara-near-black'
              }`}
              aria-label="Add to wishlist"
            >
              <Heart size={16} fill={isWishlisted ? 'currentColor' : 'none'} />
            </button>
            <button
              onClick={handleQuickView}
              className="p-2 bg-zara-white/80 hover:bg-zara-white text-zara-near-black rounded-full backdrop-blur-sm transition-colors duration-200"
              aria-label="Quick view"
            >
              <Eye size={16} />
            </button>
          </div>

          {/* Color Swatches */}
          {product.colors.length > 1 && (
            <div className="absolute bottom-3 left-3 flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              {product.colors.slice(0, 4).map((color, index) => (
                <div
                  key={index}
                  className={`w-4 h-4 rounded-full border-2 border-zara-white shadow-sm ${
                    color === 'black' ? 'bg-gray-900' :
                    color === 'white' ? 'bg-white' :
                    color === 'navy' ? 'bg-blue-900' :
                    color === 'beige' ? 'bg-amber-100' :
                    color === 'emerald' ? 'bg-emerald-500' :
                    color === 'burgundy' ? 'bg-red-900' :
                    color === 'charcoal' ? 'bg-gray-700' :
                    color === 'cream' ? 'bg-amber-50' :
                    color === 'camel' ? 'bg-yellow-600' :
                    color === 'blue' ? 'bg-blue-500' :
                    color === 'brown' ? 'bg-amber-800' :
                    'bg-gray-300'
                  }`}
                />
              ))}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="mt-4 space-y-1">
          <h3 className="font-medium text-zara-near-black group-hover:text-zara-charcoal transition-colors duration-200">
            {product.title}
          </h3>
          {product.subtitle && (
            <p className="text-sm text-zara-charcoal">{product.subtitle}</p>
          )}
          <div className="flex items-center space-x-2">
            <span className="font-semibold text-zara-near-black">
              ${product.price.current}
            </span>
            {product.price.original && (
              <span className="text-sm text-zara-charcoal line-through">
                ${product.price.original}
              </span>
            )}
          </div>
          {product.rating && (
            <div className="flex items-center space-x-1">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <span
                    key={i}
                    className={`text-xs ${
                      i < Math.floor(product.rating!.average) 
                        ? 'text-yellow-400' 
                        : 'text-zara-gray'
                    }`}
                  >
                    ★
                  </span>
                ))}
              </div>
              <span className="text-xs text-zara-charcoal">
                ({product.rating.count})
              </span>
            </div>
          )}
        </div>
      </a>
    </div>
  );
};

export default ProductCard;