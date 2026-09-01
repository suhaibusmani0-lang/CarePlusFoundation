import React from 'react';

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-gray-50 pt-32 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-gray-100">
        <h1 className="text-4xl font-extrabold text-[#0f4a5c] mb-8">Privacy Policy</h1>
        
        <div className="space-y-6 text-gray-600 leading-relaxed">
          <p>
            At <strong>Care Plus Foundation</strong>, we are committed to protecting your privacy and ensuring that your personal information is handled in a safe and responsible manner. This Privacy Policy outlines how we collect, use, and safeguard your data.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">1. Information We Collect</h2>
          <p>
            When you make a donation, sign up for our newsletter, or volunteer, we may collect personal information such as your name, email address, phone number, and PAN number (for 80G tax exemption purposes). We also collect payment information securely via our payment gateway partner (Razorpay).
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">2. How We Use Your Information</h2>
          <p>
            The information we collect is used to:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Process your donations and issue 80G tax receipts.</li>
            <li>Send you updates about our programs, campaigns, and impact reports.</li>
            <li>Respond to your inquiries and support requests.</li>
            <li>Maintain internal records and ensure compliance with Indian Trust Act regulations.</li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">3. Data Security</h2>
          <p>
            We implement a variety of security measures to maintain the safety of your personal information. Your payment data is encrypted and transmitted securely via industry-standard protocols. We do not store your credit/debit card details on our servers.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">4. Sharing Your Information</h2>
          <p>
            We do not sell, trade, or otherwise transfer your personally identifiable information to outside parties. This does not include trusted third parties who assist us in operating our website, conducting our operations, or servicing you, so long as those parties agree to keep this information confidential.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">5. Contact Us</h2>
          <p>
            If there are any questions regarding this privacy policy, you may contact us using the information below:
          </p>
          <p className="font-semibold text-gray-900">
            Care Plus Foundation<br />
            B-6 FIRST FLOOR KALKAJI<br />
            NEW DELHI-110019<br />
            Email: careplusfoundation19@gmail.com
          </p>
        </div>
      </div>
    </main>
  );
}

