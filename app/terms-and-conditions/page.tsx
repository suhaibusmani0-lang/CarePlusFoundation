import React from 'react';

export default function TermsAndConditions() {
  return (
    <div className="min-h-screen bg-gray-50 pt-28 pb-20 px-4">
      <div className="max-w-4xl mx-auto bg-white p-8 md:p-14 rounded-3xl shadow-sm border border-gray-100">
        
        {/* Header Title */}
        <div className="border-b border-gray-200 pb-8 mb-8">
          <p className="text-xs sm:text-sm font-bold tracking-widest uppercase text-[#b8860b] mb-2">
            Care Plus Foundation Trust
          </p>
          <h1 className="text-3xl md:text-5xl font-black text-[#0f4a5c] tracking-tight mb-3">
            ML MEDO Health (OPC) Pvt. Ltd.
          </h1>
          <h2 className="text-xl md:text-2xl font-bold text-gray-800">
            MEDICAL BENEFIT CARD – TERMS & CONDITIONS
          </h2>
          <div className="mt-4 flex flex-wrap gap-3 items-center text-sm font-semibold">
            <span className="bg-teal-50 text-teal-800 px-3.5 py-1.5 rounded-full border border-teal-100">
              Organised by Care Plus Foundation Trust
            </span>
            <span className="bg-amber-50 text-amber-800 px-3.5 py-1.5 rounded-full border border-amber-200">
              Card Fee: ₹299
            </span>
            <span className="bg-gray-100 text-gray-800 px-3.5 py-1.5 rounded-full border border-gray-200">
              Validity: 1 Year
            </span>
          </div>
        </div>

        {/* Content sections */}
        <div className="space-y-8 text-gray-700 leading-relaxed text-sm md:text-base">
          
          <section>
            <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2">
              1. Validity
            </h3>
            <p>
              The Medical Benefit Card is valid for one year from its activation date, subject to the validity date mentioned on the card.
            </p>
          </section>

          <section>
            <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2">
              2. Participating Hospitals and Clinics
            </h3>
            <div className="bg-gray-50 border border-gray-200 p-4 rounded-2xl mb-3 space-y-1.5 text-sm font-medium text-gray-800">
              <p><strong>1. Adharsh Hospital:</strong> Khirdki Extn., Malviya Nagar, New Delhi – 110017</p>
              <p><strong>2. I Capital Eyes and Polyclinic:</strong> Malviya Nagar, New Delhi – 110017</p>
              <p><strong>3. ICI Hospital:</strong> R-57, Greater Kailash-I (G.K.-I), New Delhi – 110048</p>
            </div>
            <p>
              The card is valid only at hospitals, clinics, diagnostic centres and other healthcare providers that have an active tie-up with ML Medo under this program. The card cannot be used at non-participating facilities. The list of participating providers may be updated, and the applicable provider should be confirmed before booking a service.
            </p>
          </section>

          <section>
            <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2">
              3. Medical Benefits
            </h3>
            <p className="mb-3">
              Subject to the applicable services and participating providers, the card offers:
            </p>
            <ul className="list-disc pl-6 space-y-1.5 mb-3 font-medium text-gray-800">
              <li><strong>Blood Tests:</strong> Up to 50% discount.</li>
              <li><strong>Radiology Tests:</strong> 30%–40% discount.</li>
              <li><strong>Doctor Consultation:</strong> 40%–50% discount.</li>
              <li><strong>Eye Check-up:</strong> Free, within the scope of the specified participating provider's service.</li>
            </ul>
            <p className="text-gray-600 text-sm">
              The exact discount and amount payable depend on the selected service and the participating provider's applicable rates. Please confirm the final charges before availing the service.
            </p>
          </section>

          <section>
            <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2">
              4. Home Sample Collection
            </h3>
            <p>
              Home sample collection is not free under this card. Additional charges may apply and will be communicated before booking.
            </p>
          </section>

          <section>
            <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2">
              5. Nature of the Card
            </h3>
            <p>
              This is a medical benefit and discount card, not a health insurance policy. It does not provide insurance coverage, reimbursement of medical expenses or a guarantee of free treatment.
            </p>
          </section>

          <section>
            <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2">
              6. Additional Charges
            </h3>
            <p>
              Services not expressly included in the stated benefits, including any applicable procedures, medicines or additional investigations, are chargeable separately. Any applicable charges will be disclosed before the service is provided.
            </p>
          </section>

          <section>
            <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2">
              7. Appointments and Availability
            </h3>
            <p>
              All services are subject to appointment availability, participating-provider arrangements and applicable medical requirements. Possession of the card does not guarantee immediate appointments or the availability of every service.
            </p>
          </section>

          <section>
            <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2">
              8. Card Use
            </h3>
            <p>
              The card must be presented when requesting benefits. Verification may be required. Any misuse or fraudulent use may result in suspension of benefits, subject to applicable law.
            </p>
          </section>

          <section>
            <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2">
              9. Refunds and Consumer Rights
            </h3>
            <p>
              The card is subject to the terms communicated at the time of purchase and all applicable laws. Nothing in these terms limits any consumer right or remedy that cannot legally be excluded.
            </p>
          </section>

          <section>
            <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2">
              10. Privacy
            </h3>
            <p>
              Personal information will be handled for disclosed purposes related to card administration and requested services, with appropriate safeguards and consent where required by applicable law.
            </p>
          </section>

          <section className="bg-gray-50 border border-gray-200 p-6 rounded-2xl">
            <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-3">
              11. Contact Details
            </h3>
            <div className="text-sm md:text-base space-y-1 font-medium text-gray-800">
              <p className="font-bold text-[#0f4a5c]">ML Medo – Medical Benefit Card Program</p>
              <p>Program organised by Care Plus Foundation Trust</p>
              <p>B-6, Kalkaji, New Delhi – 110019</p>
              <p>Email: <a href="mailto:careplusfoundation19@gmail.com" className="text-teal-700 hover:underline">careplusfoundation19@gmail.com</a></p>
              <p>Phone: <a href="tel:9315152763" className="text-teal-700 hover:underline">9315152763</a></p>
            </div>
            <p className="mt-4 text-xs md:text-sm text-gray-500 italic">
              By purchasing or using the card, the customer acknowledges the applicable terms and the stated limitations of the benefits.
            </p>
          </section>

        </div>
      </div>
    </div>
  );
}
