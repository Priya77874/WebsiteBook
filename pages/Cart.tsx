import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { Trash2, Plus, Minus, CreditCard } from 'lucide-react';
import { Order } from '../types';

const CartPage: React.FC = () => {
  const { cart, updateQuantity, removeFromCart, cartTotal, clearCart, addOrder } = useStore();
  const [step, setStep] = useState<'cart' | 'checkout' | 'success'>('cart');
  const [formData, setFormData] = useState({
    name: '', phone: '', email: '', address: '', payment: 'Online'
  });
  const [isProcessing, setIsProcessing] = useState(false);

  if (cart.length === 0 && step === 'cart') {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-bold mb-4">Your Cart is Empty</h2>
        <a href="#/shop" className="text-primary underline">Continue Shopping</a>
      </div>
    );
  }

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    // Simulate Payment Processing
    setTimeout(() => {
      const newOrder: Order = {
        id: `ORD-${Date.now()}`,
        customerName: formData.name,
        customerEmail: formData.email,
        customerPhone: formData.phone,
        address: formData.address,
        items: [...cart],
        totalAmount: cartTotal,
        status: 'Pending',
        date: new Date().toISOString(),
        paymentMethod: formData.payment as 'COD' | 'Online'
      };

      addOrder(newOrder);
      clearCart();
      setIsProcessing(false);
      setStep('success');
    }, 2000);
  };

  if (step === 'success') {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
          <span className="text-2xl">✓</span>
        </div>
        <h2 className="text-3xl font-bold font-poppins text-primary mb-4">Order Placed Successfully!</h2>
        <p className="text-gray-600 mb-8">Thank you for shopping with Anjeet Book Dealer.</p>
        <a href="#/" className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary-dark">Back to Home</a>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold font-poppins mb-8 text-center">
        {step === 'cart' ? 'Shopping Cart' : 'Checkout'}
      </h2>

      <div className="flex flex-col lg:flex-row gap-8 max-w-5xl mx-auto">
        {/* Left Column: Cart Items or Form */}
        <div className="lg:w-2/3">
          {step === 'cart' ? (
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              {cart.map((item) => (
                <div key={item.id} className="flex gap-4 p-4 border-b last:border-0">
                  <img src={item.image} alt={item.title} className="w-20 h-24 object-cover rounded" />
                  <div className="flex-grow">
                    <h3 className="font-semibold text-gray-800">{item.title}</h3>
                    <p className="text-sm text-gray-500 mb-2">₹{Math.round(item.price * (1 - item.discount/100))} x {item.quantity}</p>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center border rounded">
                        <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="p-1 px-2 hover:bg-gray-100"><Minus size={14}/></button>
                        <span className="px-2 text-sm">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="p-1 px-2 hover:bg-gray-100"><Plus size={14}/></button>
                      </div>
                      <button onClick={() => removeFromCart(item.id)} className="text-red-500 hover:text-red-700">
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                  <div className="text-right font-bold text-gray-800">
                    ₹{Math.round(item.price * (1 - item.discount/100)) * item.quantity}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <form id="checkout-form" onSubmit={handleCheckout} className="bg-white p-6 rounded-xl shadow-sm border space-y-4">
              <h3 className="font-bold text-lg mb-2">Shipping Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input required placeholder="Full Name" className="border p-3 rounded" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
                <input required placeholder="Phone Number" className="border p-3 rounded" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} />
              </div>
              <input required placeholder="Email Address" type="email" className="w-full border p-3 rounded" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
              <textarea required placeholder="Full Address with Pincode" className="w-full border p-3 rounded h-24" value={formData.address} onChange={e => setFormData({...formData, address: e.target.value})} />
              
              <h3 className="font-bold text-lg mt-4 mb-2">Payment Method</h3>
              <div className="space-y-2">
                <label className="flex items-center gap-3 p-3 border rounded cursor-pointer hover:bg-gray-50">
                  <input type="radio" name="payment" value="Online" checked={formData.payment === 'Online'} onChange={() => setFormData({...formData, payment: 'Online'})} />
                  <div className="flex-grow font-medium">Online Payment (UPI/Card/Netbanking)</div>
                  <CreditCard size={20} className="text-primary" />
                </label>
                <label className="flex items-center gap-3 p-3 border rounded cursor-pointer hover:bg-gray-50">
                  <input type="radio" name="payment" value="COD" checked={formData.payment === 'COD'} onChange={() => setFormData({...formData, payment: 'COD'})} />
                  <div className="font-medium">Cash on Delivery</div>
                </label>
              </div>
            </form>
          )}
        </div>

        {/* Right Column: Summary */}
        <div className="lg:w-1/3">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 sticky top-24">
            <h3 className="font-bold text-lg mb-4">Order Summary</h3>
            <div className="flex justify-between mb-2 text-sm">
              <span>Subtotal</span>
              <span>₹{cartTotal}</span>
            </div>
            <div className="flex justify-between mb-2 text-sm text-green-600">
              <span>Delivery</span>
              <span>FREE</span>
            </div>
            <div className="border-t my-4 pt-4 flex justify-between font-bold text-xl text-primary">
              <span>Total</span>
              <span>₹{cartTotal}</span>
            </div>

            {step === 'cart' ? (
              <button 
                onClick={() => setStep('checkout')}
                className="w-full bg-secondary hover:bg-secondary-dark text-white font-bold py-3 rounded-lg transition-colors mt-4"
              >
                Proceed to Checkout
              </button>
            ) : (
              <button 
                type="submit"
                form="checkout-form"
                disabled={isProcessing}
                className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-3 rounded-lg transition-colors mt-4 flex items-center justify-center gap-2"
              >
                {isProcessing ? 'Processing...' : (formData.payment === 'Online' ? 'Pay with Razorpay' : 'Place Order')}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;