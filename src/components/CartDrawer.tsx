import React from 'react';
import { X, Plus, Minus, Trash2 } from 'lucide-react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (itemId: string, quantity: number) => void;
  onRemoveItem: (itemId: string) => void;
}

const CartDrawer: React.FC<CartDrawerProps> = ({ 
  isOpen, 
  onClose, 
  items, 
  onUpdateQuantity, 
  onRemoveItem 
}) => {
  const subtotal = items.reduce((sum, item) => sum + (item.product.price.current * item.quantity), 0);

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-70 z-40"
        onClick={onClose}
      />
      
      {/* Drawer */}
      <div className="fixed right-0 top-0 h-full w-96 bg-dark-bg-elevated z-50 shadow-2xl transform transition-transform duration-300 border-l border-dark-border">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-dark-border">
            <h2 className="text-lg font-semibold text-dark-text">Shopping Bag ({items.length})</h2>
            <button onClick={onClose} className="p-2 hover:bg-dark-bg-hover rounded-full text-dark-text">
              <X size={20} />
            </button>
          </div>

          {/* Items */}
          <div className="flex-1 overflow-y-auto p-6">
            {items.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-dark-text-secondary">Your bag is empty</p>
                <button 
                  onClick={onClose}
                  className="mt-4 text-sm font-medium border-b border-dark-text hover:border-dark-text-secondary transition-colors duration-200 text-dark-text"
                >
                  Continue Shopping
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                {items.map((item) => (
                  <div key={`${item.id}-${item.size}-${item.color}`} className="flex space-x-4">
                    <img
                      src={item.product.images[0]}
                      alt={item.product.title}
                      className="w-20 h-20 object-cover rounded"
                    />
                    <div className="flex-1">
                      <h3 className="font-medium text-sm text-dark-text">{item.product.title}</h3>
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
            )}
          </div>

          {/* Footer */}
          {items.length > 0 && (
            <div className="border-t border-dark-border p-6 space-y-4">
              <div className="flex justify-between items-center">
                <span className="font-semibold text-dark-text">Subtotal</span>
                <span className="font-bold text-lg text-dark-text">${subtotal.toFixed(2)}</span>
              </div>
              <a
                href="#/checkout"
                onClick={onClose}
                className="block w-full bg-dark-text text-dark-bg py-3 font-semibold hover:bg-dark-text-secondary transition-colors duration-200 text-center"
              >
                Checkout
              </a>
              <a
                href="#/cart"
                onClick={onClose}
                className="block w-full text-center border border-dark-border-light py-3 font-medium hover:bg-dark-bg-hover transition-colors duration-200 text-dark-text"
              >
                View Cart
              </a>
              <button 
                onClick={onClose}
                className="w-full border border-dark-border-light py-3 font-medium hover:bg-dark-bg-hover transition-colors duration-200 text-dark-text"
              >
                Continue Shopping
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CartDrawer;