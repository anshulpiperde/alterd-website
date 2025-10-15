import React, { useState } from 'react';
import { Product } from '../types';

interface ProductDetailProps {
  product: Product | null;
  onAddToCart: (product: Product, size: string, color: string, quantity: number) => void;
}

const ProductDetail: React.FC<ProductDetailProps> = ({ product, onAddToCart }) => {
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [currentImage, setCurrentImage] = useState(0);

  if (!product) {
    return (
      <main className="bg-zara-off-white">
        <div className="max-w-[960px] mx-auto px-6 py-16 text-center">
          <h1 className="text-2xl font-bold mb-2 text-zara-near-black">Product not found</h1>
          <a href="#/" className="text-sm font-medium border-b border-zara-near-black text-zara-near-black">Go back home</a>
        </div>
      </main>
    );
  }

  const handleAdd = () => {
    if (!selectedSize || !selectedColor) return;
    onAddToCart(product, selectedSize, selectedColor, quantity);
    // Reset selections after adding to cart
    setQuantity(1);
  };

  return (
    <main className="bg-zara-off-white">
      <div className="max-w-[1280px] mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Images */}
        <div>
          <div className="aspect-[3/4] mb-4">
            <img
              src={product.images[currentImage]}
              alt={product.title}
              className="w-full h-full object-cover"
            />
          </div>
          {product.images.length > 1 && (
            <div className="flex space-x-2">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentImage(idx)}
                  className={`w-16 h-16 overflow-hidden ${currentImage === idx ? 'ring-2 ring-zara-near-black' : ''}`}
                >
                  <img src={img} alt={`${product.title} ${idx + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Details */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold mb-2 text-zara-near-black">{product.title}</h1>
            {product.subtitle && <p className="text-zara-charcoal mb-4">{product.subtitle}</p>}
            <div className="flex items-center space-x-2 mb-4">
              <span className="text-2xl font-bold text-zara-near-black">${product.price.current}</span>
              {product.price.original && (
                <span className="text-lg text-zara-charcoal line-through">${product.price.original}</span>
              )}
            </div>
          </div>

          {/* Color */}
          <div>
            <h3 className="font-medium mb-3 text-zara-near-black">
              Color {selectedColor && <span className="font-normal text-zara-charcoal">- {selectedColor}</span>}
            </h3>
            <div className="flex space-x-2">
              {product.colors.map((color) => (
                <button
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  className={`w-10 h-10 rounded-full border-2 transition-all ${
                    selectedColor === color 
                      ? 'border-zara-near-black ring-2 ring-zara-near-black ring-offset-2' 
                      : 'border-zara-gray hover:border-zara-charcoal'
                  } ${
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
                  title={color}
                />
              ))}
            </div>
          </div>

          {/* Size */}
          <div>
            <h3 className="font-medium mb-3 text-zara-near-black">Size</h3>
            <div className="grid grid-cols-4 gap-2">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`py-2 text-sm font-medium border ${
                    selectedSize === size ? 'border-zara-near-black bg-zara-near-black text-zara-white' : 'border-zara-gray hover:border-zara-charcoal text-zara-near-black'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity and Add */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center space-x-4">
              <div className="flex items-center border border-zara-gray">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="px-3 py-2 text-zara-near-black hover:bg-zara-light-gray">-</button>
                <span className="px-4 py-2 text-zara-near-black">{quantity}</span>
                <button onClick={() => setQuantity(Math.min(10, quantity + 1))} className="px-3 py-2 text-zara-near-black hover:bg-zara-light-gray">+</button>
              </div>
              <button
                onClick={handleAdd}
                disabled={!selectedSize || !selectedColor}
                className="flex-1 bg-zara-near-black text-zara-white py-3 font-semibold disabled:bg-zara-gray disabled:cursor-not-allowed hover:bg-zara-deep-gray transition-colors"
              >
                Add to Bag
              </button>
            </div>
            {(!selectedSize || !selectedColor) && (
              <p className="text-sm text-red-600">
                Please select {!selectedColor && 'a color'}{!selectedColor && !selectedSize && ' and '}{!selectedSize && 'a size'}
              </p>
            )}
          </div>

          <p className="text-sm text-zara-charcoal pt-4">Category: {product.category}</p>
        </div>
      </div>
    </main>
  );
};

export default ProductDetail;
