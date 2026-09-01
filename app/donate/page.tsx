import React from 'react';
import DonationForm from '@/app/components/DonationForm';

export default function DonatePage() {
  return (
    <main className="min-h-screen bg-gray-900 pt-24 pb-20 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-[#0f4a5c] opacity-30 blur-[120px]"></div>
        <div className="absolute top-[40%] -right-[10%] w-[40%] h-[40%] rounded-full bg-[#b8860b] opacity-20 blur-[100px]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Side: Info */}
          <div className="lg:col-span-5 text-white space-y-8">
            <div>
              <span className="inline-block px-4 py-1.5 rounded-full bg-[#b8860b]/20 text-[#b8860b] font-semibold text-sm mb-6 border border-[#b8860b]/30">Make a Difference</span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 leading-tight">Empower Change with Your Support</h1>
              <p className="text-lg text-gray-300">Your contribution directly fuels our initiatives in education, health, and community empowerment. Together, we can build a better tomorrow.</p>
            </div>

            <div className="space-y-6">
              <div className="flex items-start">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#0f4a5c] flex items-center justify-center mr-4 shadow-lg border border-white/10">
                  <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-1">100% Secure & Transparent</h3>
                  <p className="text-gray-400 text-sm">We ensure that your donation is securely processed and transparently utilized for intended causes.</p>
                </div>
              </div>

              <div className="flex items-start">
                 <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#b8860b] flex items-center justify-center mr-4 shadow-lg border border-white/10">
                  <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 14l6-6m-5.5.5h.01m4.99 5h.01M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l3.5-2 3.5 2 3.5-2 3.5 2zM10 8.5a.5.5 0 11-1 0 .5.5 0 011 0zm5 5a.5.5 0 11-1 0 .5.5 0 011 0z" /></svg>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-1">Tax Exemption Details</h3>
                  <p className="text-gray-400 text-sm">Donations to Care Plus Foundation Trust are eligible for tax exemption under section 80G. An 80G receipt will be provided upon successful donation.</p>
                </div>
              </div>
            </div>

            <div className="p-6 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-sm">
              <p className="text-sm text-gray-300 mb-2">Registration No: <span className="font-semibold text-white">2026/10/IV/1162</span></p>
              <p className="text-sm text-gray-300">DARPAN ID: <span className="font-semibold text-white">DL/2026/1190987</span></p>
            </div>
          </div>

          {/* Right Side: Form */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-2xl relative">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[url('/pattern.svg')] opacity-10 rounded-tr-3xl pointer-events-none"></div>
              <DonationForm />
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}
