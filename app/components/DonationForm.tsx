'use client';

import { useState } from 'react';
import Script from 'next/script';

declare global {
  interface Window {
    Razorpay: any;
  }
}

export default function DonationForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    panNumber: '',
    amount: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const quickAmounts = ['500', '1000', '2500', '5000'];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleQuickAmount = (amt: string) => {
    setFormData(prev => ({ ...prev, amount: amt }));
  };

  const initPayment = async () => {
    if (!formData.amount || parseInt(formData.amount) <= 0) {
      setError('Please enter a valid amount');
      return;
    }
    if (!formData.name || !formData.email || !formData.phone) {
      setError('Please fill in all required fields');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      // 1. Create order
      const response = await fetch('/api/razorpay/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: parseInt(formData.amount) })
      });
      
      const orderData = await response.json();
      
      if (!response.ok) throw new Error(orderData.message || 'Failed to create order');

      // 2. Initialize Razorpay
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: orderData.amount,
        currency: orderData.currency,
        name: 'Care Plus Foundation',
        description: 'Donation',
        order_id: orderData.id,
        handler: async function (response: any) {
          try {
            // 3. Verify payment
            const verifyRes = await fetch('/api/razorpay/verify', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
              })
            });

            if (verifyRes.ok) {
              const queryParams = new URLSearchParams({
                donorName: formData.name,
                email: formData.email,
                amount: formData.amount,
                paymentId: response.razorpay_payment_id,
                panNumber: formData.panNumber || ''
              }).toString();
              
              window.location.href = `/donate/success?${queryParams}`;
            } else {
              throw new Error('Payment verification failed');
            }
          } catch (err: any) {
            setError(err.message || 'Payment verification failed');
          }
        },
        prefill: {
          name: formData.name,
          email: formData.email,
          contact: formData.phone
        },
        theme: {
          color: '#0f4a5c'
        }
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
      
    } catch (err: any) {
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Script src="https://checkout.razorpay.com/v1/checkout.js" />
      <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
        <div className="bg-[#0f4a5c] p-6 text-center text-white">
          <h2 className="text-2xl font-bold mb-2">Make a Donation</h2>
          <p className="text-gray-200 text-sm">Your contribution helps us create positive change</p>
        </div>
        
        <div className="p-8">
          {error && (
            <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 rounded">
              {error}
            </div>
          )}

          <div className="space-y-6">
            {/* Quick Amounts */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">Select Amount (₹)</label>
              <div className="grid grid-cols-4 gap-3">
                {quickAmounts.map(amt => (
                  <button
                    key={amt}
                    type="button"
                    onClick={() => handleQuickAmount(amt)}
                    className={`py-2 rounded-lg border transition-all ${
                      formData.amount === amt 
                        ? 'bg-[#0f4a5c] text-white border-[#0f4a5c]' 
                        : 'bg-white text-gray-600 border-gray-300 hover:border-[#b8860b] hover:text-[#b8860b]'
                    }`}
                  >
                    ₹{amt}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-1">Custom Amount *</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">₹</span>
                  <input
                    type="number"
                    id="amount"
                    name="amount"
                    value={formData.amount}
                    onChange={handleInputChange}
                    className="w-full pl-8 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#0f4a5c] focus:border-transparent outline-none transition-all"
                    placeholder="Enter amount"
                    min="1"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#0f4a5c] focus:border-transparent outline-none transition-all"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#0f4a5c] focus:border-transparent outline-none transition-all"
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone Number *</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#0f4a5c] focus:border-transparent outline-none transition-all"
                    placeholder="+91"
                  />
                </div>
                <div>
                  <label htmlFor="panNumber" className="block text-sm font-medium text-gray-700 mb-1">PAN Number (for 80G)</label>
                  <input
                    type="text"
                    id="panNumber"
                    name="panNumber"
                    value={formData.panNumber}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#0f4a5c] focus:border-transparent outline-none uppercase transition-all"
                    placeholder="ABCDE1234F"
                    maxLength={10}
                  />
                </div>
              </div>
            </div>

            <button
              onClick={initPayment}
              disabled={isLoading}
              className="w-full py-4 bg-gradient-to-r from-[#b8860b] to-[#daa520] hover:from-[#daa520] hover:to-[#b8860b] text-white rounded-lg font-bold text-lg shadow-md transition-all flex justify-center items-center disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : 'Proceed to Pay'}
            </button>
            <p className="text-center text-xs text-gray-500 mt-4">
              Secure payment processed via Razorpay. 80G receipt will be generated upon successful donation.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
