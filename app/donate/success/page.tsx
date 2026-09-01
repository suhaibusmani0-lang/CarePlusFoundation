'use client';
import React, { Suspense, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { jsPDF } from 'jspdf';
import { motion } from 'framer-motion';

function SuccessContent() {
  const searchParams = useSearchParams();
  const [details, setDetails] = useState<any>(null);

  useEffect(() => {
    const donorName = searchParams.get('donorName') || 'Generous Donor';
    const email = searchParams.get('email') || '';
    const amount = searchParams.get('amount') || '0';
    const paymentId = searchParams.get('paymentId') || `TXN${Math.floor(Math.random()*1000000)}`;
    const panNumber = searchParams.get('panNumber') || 'Not Provided';
    
    setDetails({ donorName, email, amount, paymentId, panNumber, date: new Date().toLocaleDateString() });
  }, [searchParams]);

  const generate80GReceipt = () => {
    if (!details) return;
    const doc = new jsPDF();
    
    // Header
    doc.setFontSize(22);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(15, 74, 92);
    doc.text('CARE PLUS FOUNDATION TRUST', 105, 20, { align: 'center' });
    
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(100);
    doc.text('B-6 FIRST FLOOR KALKAJI NEW DELHI-110019, Delhi Cantonment', 105, 28, { align: 'center' });
    doc.text('Email: careplusfoundation19@gmail.com', 105, 34, { align: 'center' });
    
    doc.setDrawColor(200);
    doc.line(20, 40, 190, 40);
    
    // Title
    doc.setFontSize(16);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(0);
    doc.text('DONATION RECEIPT (80G)', 105, 50, { align: 'center' });
    
    // Details
    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    
    const leftCol = 25;
    const rightCol = 80;
    let y = 70;
    
    doc.text('Receipt No:', leftCol, y); doc.setFont("helvetica", "bold"); doc.text(`RCPT-${details.paymentId}`, rightCol, y); doc.setFont("helvetica", "normal");
    y += 10;
    doc.text('Date:', leftCol, y); doc.setFont("helvetica", "bold"); doc.text(details.date, rightCol, y); doc.setFont("helvetica", "normal");
    y += 10;
    doc.text('Received with thanks from:', leftCol, y); doc.setFont("helvetica", "bold"); doc.text(details.donorName.toUpperCase(), rightCol, y); doc.setFont("helvetica", "normal");
    y += 10;
    doc.text('Amount:', leftCol, y); doc.setFont("helvetica", "bold"); doc.text(`Rs. ${details.amount}/-`, rightCol, y); doc.setFont("helvetica", "normal");
    y += 10;
    doc.text('PAN Number:', leftCol, y); doc.setFont("helvetica", "bold"); doc.text(details.panNumber.toUpperCase(), rightCol, y); doc.setFont("helvetica", "normal");
    
    // Footer Box
    y += 20;
    doc.setDrawColor(184, 134, 11);
    doc.setFillColor(250, 250, 250);
    doc.rect(20, y, 170, 50, 'FD');
    
    doc.setFontSize(10);
    doc.setFont("helvetica", "bold");
    doc.text('Trust Registration Info:', 25, y + 10);
    doc.setFont("helvetica", "normal");
    doc.text('Reg No: 2026/10/IV/1162', 25, y + 20);
    doc.text('DARPAN ID: DL/2026/1190987', 25, y + 28);
    
    doc.setFontSize(9);
    doc.setFont("helvetica", "italic");
    doc.text('Note: Donations to Care Plus Foundation Trust are exempt under section 80G of the IT Act.', 25, y + 42);
    
    doc.save(`CarePlus_80G_Receipt_${details.paymentId}.pdf`);
  };

  if (!details) return null;

  return (
    <main className="min-h-screen bg-gray-50 pt-24 pb-20 flex items-center justify-center px-4">
      <div className="max-w-2xl w-full bg-white rounded-3xl shadow-2xl p-8 md:p-12 text-center relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#0f4a5c] to-[#b8860b]"></div>
        
        <motion.div 
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-8"
        >
          <svg className="w-12 h-12 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
          </svg>
        </motion.div>

        <h1 className="text-4xl font-extrabold text-gray-900 mb-4">Thank You!</h1>
        <p className="text-xl text-gray-600 mb-8">Your generous donation of <span className="font-bold text-gray-900">₹{details.amount}</span> has been received.</p>

        <div className="bg-gray-50 rounded-2xl p-6 text-left mb-8 border border-gray-100">
          <h3 className="font-bold text-gray-900 mb-4 border-b pb-2">Transaction Details</h3>
          <div className="space-y-3 text-sm">
             <div className="flex justify-between"><span className="text-gray-500">Name:</span><span className="font-semibold text-gray-900">{details.donorName}</span></div>
             <div className="flex justify-between"><span className="text-gray-500">Email:</span><span className="font-semibold text-gray-900">{details.email}</span></div>
             <div className="flex justify-between"><span className="text-gray-500">Payment ID:</span><span className="font-semibold text-gray-900">{details.paymentId}</span></div>
             <div className="flex justify-between"><span className="text-gray-500">Date:</span><span className="font-semibold text-gray-900">{details.date}</span></div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button 
            onClick={generate80GReceipt}
            className="px-8 py-3 bg-[#0f4a5c] text-white font-bold rounded-full hover:bg-[#0a3644] transition-colors shadow-lg flex items-center justify-center"
          >
            <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
            Download 80G Receipt
          </button>
          <Link href="/" className="px-8 py-3 bg-gray-100 text-gray-700 font-bold rounded-full hover:bg-gray-200 transition-colors flex items-center justify-center">
            Back to Home
          </Link>
        </div>
      </div>
    </main>
  );
}

export default function DonateSuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#0f4a5c]"></div>
      </div>
    }>
      <SuccessContent />
    </Suspense>
  );
}
