'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';

function SuccessContent() {
  const searchParams = useSearchParams();
  const student_name = searchParams.get('student_name') || 'Student';
  const paymentId = searchParams.get('paymentId');
  const enrollmentNumber = searchParams.get('enrollmentNumber');

  return (
    <div className="bg-white rounded-3xl shadow-xl p-10 max-w-lg w-full text-center">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 200, damping: 15 }}
        className="flex justify-center mb-6"
      >
        <CheckCircle2 className="w-24 h-24 text-green-500" />
      </motion.div>

      <h1 className="text-3xl font-black text-gray-900 mb-4">Registration Successful!</h1>
      <p className="text-lg text-gray-600 mb-6">
        Thank you, <span className="font-bold text-gray-800">{student_name}</span>. Your registration for the Buniyad Scholarship Exam 2026–27 has been confirmed.
      </p>

      {enrollmentNumber && (
        <div className="bg-teal-50 border-2 border-teal-200 rounded-xl p-6 mb-8">
          <p className="text-sm text-teal-800 font-bold uppercase tracking-wider mb-1">Your Enrollment Number</p>
          <p className="text-3xl font-black text-teal-900">{enrollmentNumber}</p>
          <p className="text-xs text-teal-700 mt-2">Please keep this number safe for future reference.</p>
        </div>
      )}

      {paymentId && (
        <div className="bg-gray-50 rounded-lg p-4 mb-8 text-sm text-gray-500">
          <p>Payment ID: <span className="font-mono text-gray-800">{paymentId}</span></p>
        </div>
      )}

      <div className="space-y-4">
        <Link 
          href="/"
          className="block w-full py-3 px-6 bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold rounded-full transition-colors"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}

export default function ScholarshipSuccessPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Suspense fallback={<div className="p-8 text-center">Loading...</div>}>
        <SuccessContent />
      </Suspense>
    </div>
  );
}

