'use client';

import React, { useState } from 'react';
import SectionHeading from '../components/SectionHeading';
import { motion } from 'framer-motion';

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Failed to send message');
      }

      setStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (err: any) {
      console.error(err);
      setStatus('error');
      setErrorMessage(err.message);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading title="Contact Us" subtitle="We'd love to hear from you" />
        
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Contact Information */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-2xl shadow-xl p-8"
          >
            <h3 className="text-2xl font-bold text-[#0f4a5c] mb-6">Get in Touch</h3>
            <div className="space-y-6 text-gray-600">
              <div className="flex items-start">
                <div className="flex-shrink-0 mt-1">
                  <svg className="w-6 h-6 text-[#b8860b]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                </div>
                <div className="ml-4">
                  <h4 className="text-lg font-medium text-gray-900">Our Office</h4>
                  <p className="mt-1">B-6 FIRST FLOOR KALKAJI<br />NEW DELHI-110019<br />Delhi Cantonment</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0 mt-1">
                  <svg className="w-6 h-6 text-[#b8860b]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                </div>
                <div className="ml-4">
                  <h4 className="text-lg font-medium text-gray-900">Email Us</h4>
                  <p className="mt-1">careplusfoundation19@gmail.com</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0 mt-1">
                  <svg className="w-6 h-6 text-[#b8860b]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
                </div>
                <div className="ml-4">
                  <h4 className="text-lg font-medium text-gray-900">Call Us</h4>
                  <p className="mt-1">+91 98**82**11</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-2xl shadow-xl p-8"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
                <input type="text" name="name" id="name" required value={formData.name} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#0f4a5c] focus:ring-[#0f4a5c] sm:text-sm p-3 border" placeholder="John Doe" />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
                <input type="email" name="email" id="email" required value={formData.email} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#0f4a5c] focus:ring-[#0f4a5c] sm:text-sm p-3 border" placeholder="john@example.com" />
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700">Subject</label>
                <input type="text" name="subject" id="subject" required value={formData.subject} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#0f4a5c] focus:ring-[#0f4a5c] sm:text-sm p-3 border" placeholder="How can we help?" />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label>
                <textarea name="message" id="message" rows={4} required value={formData.message} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#0f4a5c] focus:ring-[#0f4a5c] sm:text-sm p-3 border" placeholder="Your message here..."></textarea>
              </div>

              {status === 'success' && (
                <div className="p-4 bg-green-50 text-green-700 rounded-md">
                  Message sent successfully! We will get back to you soon.
                </div>
              )}

              {status === 'error' && (
                <div className="p-4 bg-red-50 text-red-700 rounded-md">
                  {errorMessage}
                </div>
              )}

              <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#0f4a5c] hover:bg-[#0a313d] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0f4a5c] disabled:opacity-50"
              >
                {status === 'loading' ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </main>
  );
}

