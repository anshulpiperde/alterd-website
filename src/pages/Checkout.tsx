import React, { useState } from 'react';
import { CartItem } from '../types';
import { CreditCard, Lock, AlertCircle, CheckCircle } from 'lucide-react';

interface CheckoutProps {
  items: CartItem[];
  onPaymentSuccess: () => void;
}

declare global {
  interface Window {
    Razorpay: any;
  }
}

const Checkout: React.FC<CheckoutProps> = ({ items, onPaymentSuccess }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
  });

  const subtotal = items.reduce((sum, item) => sum + (item.product.price.current * item.quantity), 0);
  const shipping = subtotal > 1000 ? 0 : 50;
  const tax = subtotal * 0.18; // 18% GST
  const total = subtotal + shipping + tax;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePayment = async () => {
    // Validate form
    if (!formData.name || !formData.email || !formData.phone || !formData.address) {
      setError('Please fill in all required fields');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Load Razorpay script
      const scriptLoaded = await loadRazorpayScript();
      if (!scriptLoaded) {
        throw new Error('Failed to load Razorpay SDK');
      }

      // Create order on backend
      const orderResponse = await fetch('http://localhost:3001/api/create-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: total,
          currency: 'INR',
          receipt: `order_${Date.now()}`,
        }),
      });

      const orderData = await orderResponse.json();

      if (!orderData.success) {
        throw new Error(orderData.error || 'Failed to create order');
      }

      // Razorpay options
      const options = {
        key: orderData.key_id,
        amount: orderData.order.amount,
        currency: orderData.order.currency,
        name: 'Alterd',
        description: 'Fashion Purchase',
        order_id: orderData.order.id,
        prefill: {
          name: formData.name,
          email: formData.email,
          contact: formData.phone,
        },
        theme: {
          color: '#262626', // zara-near-black
        },
        handler: async function (response: any) {
          try {
            // Verify payment on backend
            const verifyResponse = await fetch('http://localhost:3001/api/verify-payment', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
              }),
            });

            const verifyData = await verifyResponse.json();

            if (verifyData.success) {
              setSuccess(true);
              setLoading(false);
              setTimeout(() => {
                onPaymentSuccess();
              }, 2000);
            } else {
              throw new Error('Payment verification failed');
            }
          } catch (err: any) {
            setError(err.message || 'Payment verification failed');
            setLoading(false);
          }
        },
        modal: {
          ondismiss: function () {
            setLoading(false);
            setError('Payment cancelled');
          },
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (err: any) {
      setError(err.message || 'Payment failed. Please try again.');
      setLoading(false);
    }
  };

  if (items.length === 0) {
    return (
      <main className="bg-zara-off-white min-h-screen">
        <div className="max-w-[960px] mx-auto px-6 py-12">
          <div className="text-center py-16">
            <p className="text-zara-charcoal">Your cart is empty</p>
            <a 
              href="#/" 
              className="mt-4 inline-block text-sm font-medium border-b border-zara-near-black hover:border-zara-charcoal transition-colors duration-200 text-zara-near-black"
            >
              Continue Shopping
            </a>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="bg-zara-off-white min-h-screen">
      <div className="max-w-[1200px] mx-auto px-6 py-12">
        <h1 className="text-3xl font-bold mb-8 text-zara-near-black">Checkout</h1>

        {success && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded flex items-center gap-3">
            <CheckCircle className="text-green-600" size={24} />
            <div>
              <p className="font-semibold text-green-800">Payment Successful!</p>
              <p className="text-sm text-green-700">Redirecting you to order confirmation...</p>
            </div>
          </div>
        )}

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded flex items-center gap-3">
            <AlertCircle className="text-red-600" size={24} />
            <div>
              <p className="font-semibold text-red-800">Error</p>
              <p className="text-sm text-red-700">{error}</p>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Shipping Information */}
            <div className="bg-white border border-zara-medium-gray p-6">
              <h2 className="text-lg font-semibold mb-4 text-zara-near-black">Shipping Information</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-zara-near-black mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-zara-medium-gray focus:outline-none focus:border-zara-near-black text-zara-near-black"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-zara-near-black mb-1">
                      Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-zara-medium-gray focus:outline-none focus:border-zara-near-black text-zara-near-black"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-zara-near-black mb-1">
                      Phone *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-zara-medium-gray focus:outline-none focus:border-zara-near-black text-zara-near-black"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-zara-near-black mb-1">
                    Address *
                  </label>
                  <textarea
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full px-3 py-2 border border-zara-medium-gray focus:outline-none focus:border-zara-near-black text-zara-near-black"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-zara-near-black mb-1">
                      City
                    </label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-zara-medium-gray focus:outline-none focus:border-zara-near-black text-zara-near-black"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-zara-near-black mb-1">
                      State
                    </label>
                    <input
                      type="text"
                      name="state"
                      value={formData.state}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-zara-medium-gray focus:outline-none focus:border-zara-near-black text-zara-near-black"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-zara-near-black mb-1">
                      Pincode
                    </label>
                    <input
                      type="text"
                      name="pincode"
                      value={formData.pincode}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-zara-medium-gray focus:outline-none focus:border-zara-near-black text-zara-near-black"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Order Items */}
            <div className="bg-white border border-zara-medium-gray p-6">
              <h2 className="text-lg font-semibold mb-4 text-zara-near-black">Order Items</h2>
              <div className="space-y-4">
                {items.map((item) => (
                  <div key={`${item.id}-${item.size}-${item.color}`} className="flex space-x-4">
                    <img
                      src={item.product.images[0]}
                      alt={item.product.title}
                      className="w-20 h-20 object-cover"
                    />
                    <div className="flex-1">
                      <p className="font-medium text-sm text-zara-near-black">{item.product.title}</p>
                      <p className="text-xs text-zara-charcoal mt-1">
                        Size: {item.size} | Color: {item.color} | Qty: {item.quantity}
                      </p>
                      <p className="font-semibold text-sm mt-1 text-zara-near-black">
                        ₹{(item.product.price.current * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white border border-zara-medium-gray p-6">
              <h2 className="text-lg font-semibold mb-4 text-zara-near-black">Order Summary</h2>
              
              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm text-zara-near-black">
                  <span>Subtotal</span>
                  <span>₹{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm text-zara-near-black">
                  <span>Shipping</span>
                  <span>{shipping === 0 ? 'FREE' : `₹${shipping.toFixed(2)}`}</span>
                </div>
                <div className="flex justify-between text-sm text-zara-near-black">
                  <span>Tax (GST 18%)</span>
                  <span>₹{tax.toFixed(2)}</span>
                </div>
                <div className="border-t border-zara-medium-gray pt-2 mt-2">
                  <div className="flex justify-between font-semibold text-zara-near-black">
                    <span>Total</span>
                    <span>₹{total.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <button
                onClick={handlePayment}
                disabled={loading || success}
                className="w-full bg-black text-white py-3 px-4 font-semibold hover:bg-gray-800 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-4"
              >
                {loading ? (
                  <>Processing...</>
                ) : (
                  <>
                    <CreditCard size={18} />
                    Pay with Razorpay
                  </>
                )}
              </button>

              <div className="mt-4 flex items-center justify-center gap-2 text-xs text-zara-charcoal">
                <Lock size={14} />
                <span>Secure payment powered by Razorpay</span>
              </div>

              <a 
                href="#/cart" 
                className="block text-center mt-4 text-sm font-medium border-b border-zara-near-black hover:border-zara-charcoal transition-colors duration-200 text-zara-near-black"
              >
                Back to Cart
              </a>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Checkout;
