import React, { useState } from 'react';
import { X, Plus, Minus, Heart } from 'lucide-react';
import { Product } from '../types';

interface QuickViewModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (product: Product, size: string, color: string, quantity: number) => void;
}

const QuickViewModal: React.FC<QuickViewModalProps> = ({ 
  product, 
  isOpen, 
  onClose, 
  onAddToCart 
}) => {
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [currentImage, setCurrentImage] = useState(0);

  if (!isOpen || !product) return null;

  const handleAddToCart = () => {
    if (!selectedSize || !selectedColor) return;
    onAddToCart(product, selectedSize, selectedColor, quantity);
    // Reset selections
    setSelectedSize('');
    setSelectedColor('');
    setQuantity(1);
    setCurrentImage(0);
    onClose();
  };

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-zara-near-black bg-opacity-50 z-50"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="fixed inset-0 z-50 overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">
          <div className="bg-zara-white max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-end p-4">
              <button onClick={onClose} className="p-2 hover:bg-zara-light-gray rounded-full text-zara-near-black">
                <X size={20} />
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6 pt-0">
              {/* Product Images */}
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
                    {product.images.map((image, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImage(index)}
                        className={`w-16 h-16 overflow-hidden ${
                          currentImage === index ? 'ring-2 ring-zara-near-black' : ''
                        }`}
                      >
                        <img
                          src={image}
                          alt={`${product.title} ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Product Details */}
              <div className="space-y-6">
                <div>
                  <h1 className="text-2xl font-bold mb-2 text-zara-near-black">{product.title}</h1>
                  {product.subtitle && (
                    <p className="text-zara-charcoal mb-4">{product.subtitle}</p>
                  )}
                  <div className="flex items-center space-x-2 mb-4">
                    <span className="text-2xl font-bold text-zara-near-black">
                      ${product.price.current}
                    </span>
                    {product.price.original && (
                      <span className="text-lg text-zara-charcoal line-through">
                        ${product.price.original}
                      </span>
                    )}
                  </div>
                  
                  {product.rating && (
                    <div className="flex items-center space-x-2 mb-6">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <span
                            key={i}
                            className={`text-sm ${
                              i < Math.floor(product.rating!.average) 
                                ? 'text-yellow-400' 
                                : 'text-zara-gray'
                            }`}
                          >
                            ★
                          </span>
                        ))}
                      </div>
                      <span className="text-sm text-zara-charcoal">
                        {product.rating.average} ({product.rating.count} reviews)
                      </span>
                    </div>
                  )}
                </div>

                {/* Color Selection */}
                <div>
                  <h3 className="font-medium mb-3 text-zara-near-black">Color</h3>
                  <div className="flex space-x-2">
                    {product.colors.map((color) => (
                      <button
                        key={color}
                        onClick={() => setSelectedColor(color)}
                        className={`w-8 h-8 rounded-full border-2 ${
                          selectedColor === color 
                            ? 'border-zara-near-black' 
                            : 'border-zara-gray'
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

                {/* Size Selection */}
                <div>
                  <h3 className="font-medium mb-3 text-zara-near-black">Size</h3>
                  <div className="grid grid-cols-4 gap-2">
                    {product.sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`py-2 text-sm font-medium border ${
                          selectedSize === size 
                            ? 'border-zara-near-black bg-zara-near-black text-zara-white' 
                            : 'border-zara-gray hover:border-zara-charcoal text-zara-near-black'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Quantity */}
                <div>
                  <h3 className="font-medium mb-3 text-zara-near-black">Quantity</h3>
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="p-2 border border-zara-gray hover:bg-zara-light-gray text-zara-near-black"
                    >
                      <Minus size={16} />
                    </button>
                    <span className="w-12 text-center font-medium text-zara-near-black">{quantity}</span>
                    <button
                      onClick={() => setQuantity(Math.min(10, quantity + 1))}
                      className="p-2 border border-zara-gray hover:bg-zara-light-gray text-zara-near-black"
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                </div>

                {/* Add to Cart */}
                <div className="flex space-x-4">
                  <button
                    onClick={handleAddToCart}
                    disabled={!selectedSize || !selectedColor}
                    className="flex-1 bg-zara-near-black text-zara-white py-3 font-semibold disabled:bg-zara-gray disabled:cursor-not-allowed hover:bg-zara-deep-gray transition-colors duration-200"
                  >
                    Add to Bag
                  </button>
                  <button className="p-3 border border-zara-gray hover:bg-zara-light-gray text-zara-near-black">
                    <Heart size={20} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default QuickViewModal;