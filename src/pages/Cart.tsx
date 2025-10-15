import React from 'react';
import { CartItem } from '../types';
import { Plus, Minus, Trash2 } from 'lucide-react';

interface CartPageProps {
  items: CartItem[];
  onUpdateQuantity: (itemId: string, quantity: number) => void;
  onRemoveItem: (itemId: string) => void;
}

const Cart: React.FC<CartPageProps> = ({ items, onUpdateQuantity, onRemoveItem }) => {
  const subtotal = items.reduce((sum, item) => sum + (item.product.price.current * item.quantity), 0);

  return (
    <main className="bg-zara-off-white">
      <div className="max-w-[960px] mx-auto px-6 py-12">
        <h1 className="text-3xl font-bold mb-8 text-zara-near-black">Your Cart</h1>

        {items.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-zara-charcoal">Your bag is empty</p>
            <a 
              href="#/" 
              className="mt-4 inline-block text-sm font-medium border-b border-zara-near-black hover:border-zara-charcoal transition-colors duration-200 text-zara-near-black"
            >
              Continue Shopping
            </a>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Items */}
            <div className="lg:col-span-2 space-y-6">
              {items.map((item) => (
                <div key={`${item.id}-${item.size}-${item.color}`} className="flex space-x-4">
                  <img
                    src={item.product.images[0]}
                    alt={item.product.title}
                    className="w-24 h-24 object-cover rounded"
                  />
                  <div className="flex-1">
                    <a href={`#/product/${item.product.id}`} className="font-medium text-sm hover:underline text-zara-near-black">
                      {item.product.title}
                    </a>
                    <p className="text-xs text-zara-charcoal mt-1">
                      Size: {item.size} | Color: {item.color}
                    </p>
                    <p className="font-semibold text-sm mt-2 text-zara-near-black">
                      ${item.product.price.current}
                    </p>

                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => onUpdateQuantity(item.id, Math.max(0, item.quantity - 1))}
                          className="p-1 hover:bg-zara-light-gray rounded text-zara-near-black"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="text-sm w-8 text-center text-zara-near-black">{item.quantity}</span>
                        <button
                          onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                          className="p-1 hover:bg-zara-light-gray rounded text-zara-near-black"
                        >
                          <Plus size={14} />
                        </button>
                      </div>

                      <button
                        onClick={() => onRemoveItem(item.id)}
                        className="p-1 text-zara-dark-gray hover:text-zara-near-black transition-colors"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Summary */}
            <div className="border border-zara-gray bg-zara-white p-6 h-fit sticky top-6">
              <h2 className="text-lg font-semibold mb-4 text-zara-near-black">Order Summary</h2>
              <div className="flex justify-between mb-2 text-sm text-zara-near-black">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between mb-4 text-sm text-zara-charcoal">
                <span>Shipping</span>
                <span>Calculated at checkout</span>
              </div>
              <button className="w-full bg-zara-near-black text-zara-white py-3 font-semibold hover:bg-zara-deep-gray transition-colors duration-200">
                Checkout
              </button>
              <a 
                href="#/" 
                className="block text-center mt-3 text-sm font-medium border-b border-zara-near-black hover:border-zara-charcoal transition-colors duration-200 text-zara-near-black"
              >
                Continue Shopping
              </a>
            </div>
          </div>
        )}
      </div>
    </main>
  );
};

export default Cart;
