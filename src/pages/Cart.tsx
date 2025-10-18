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
    <main className="bg-dark-bg">
      <div className="max-w-[960px] mx-auto px-6 py-12">
        <h1 className="text-3xl font-bold mb-8 text-dark-text">Your Cart</h1>

        {items.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-dark-text-secondary">Your bag is empty</p>
            <a 
              href="#/" 
              className="mt-4 inline-block text-sm font-medium border-b border-dark-text hover:border-dark-text-secondary transition-colors duration-200 text-dark-text"
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
                    <a href={`#/product/${item.product.id}`} className="font-medium text-sm hover:underline text-dark-text">
                      {item.product.title}
                    </a>
                    <p className="text-xs text-dark-text-secondary mt-1">
                      Size: {item.size} | Color: {item.color}
                    </p>
                    <p className="font-semibold text-sm mt-2 text-dark-text">
                      ${item.product.price.current}
                    </p>

                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => onUpdateQuantity(item.id, Math.max(0, item.quantity - 1))}
                          className="p-1 hover:bg-dark-bg-hover rounded text-dark-text"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="text-sm w-8 text-center text-dark-text">{item.quantity}</span>
                        <button
                          onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                          className="p-1 hover:bg-dark-bg-hover rounded text-dark-text"
                        >
                          <Plus size={14} />
                        </button>
                      </div>

                      <button
                        onClick={() => onRemoveItem(item.id)}
                        className="p-1 text-dark-text-muted hover:text-dark-text transition-colors"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Summary */}
            <div className="border border-dark-border bg-dark-bg-elevated p-6 h-fit sticky top-6">
              <h2 className="text-lg font-semibold mb-4 text-dark-text">Order Summary</h2>
              <div className="flex justify-between mb-2 text-sm text-dark-text">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between mb-4 text-sm text-dark-text-secondary">
                <span>Shipping</span>
                <span>Calculated at checkout</span>
              </div>
              <button className="w-full bg-dark-text text-dark-bg py-3 font-semibold hover:bg-dark-text-secondary transition-colors duration-200">
                Checkout
              </button>
              <a 
                href="#/" 
                className="block text-center mt-3 text-sm font-medium border-b border-dark-text hover:border-dark-text-secondary transition-colors duration-200 text-dark-text"
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
