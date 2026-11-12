'use client';

import { Suspense, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { CheckCircle2, Download, Home, Loader2, FileText, Printer, FileDown, ShieldCheck } from 'lucide-react';
import { generateScholarshipReceipt, printScholarshipReceipt, ScholarshipReceiptData } from '@/lib/generate-scholarship-receipt';
import { generateScholarshipForm, printScholarshipForm } from '@/lib/generate-scholarship-form';

function SuccessContent() {
  const searchParams = useSearchParams();
  const studentNameParam = searchParams.get('student_name') || 'Student';
  const paymentIdParam = searchParams.get('paymentId');
  const enrollmentNumberParam = searchParams.get('enrollmentNumber');

  const [applicationData, setApplicationData] = useState<ScholarshipReceiptData | null>(null);
  const [downloading, setDownloading] = useState(false);
  const [downloadingForm, setDownloadingForm] = useState(false);
  const [fetchingData, setFetchingData] = useState(true);

  useEffect(() => {
    // 1. Try reading from sessionStorage for instant load
    let cachedApp: any = null;
    try {
      const cached = sessionStorage.getItem('current_scholarship_app');
      if (cached) {
        cachedApp = JSON.parse(cached);
      }
    } catch (e) {
      console.warn('Session storage read error', e);
    }

    // 2. Fetch full verified record from database
    const fetchFullRecord = async () => {
      try {
        const queryKey = enrollmentNumberParam 
          ? `enrollmentNumber=${encodeURIComponent(enrollmentNumberParam)}`
          : paymentIdParam 
            ? `paymentId=${encodeURIComponent(paymentIdParam)}` 
            : '';

        if (queryKey) {
          const res = await fetch(`/api/scholarship/receipt?${queryKey}`);
          if (res.ok) {
            const dbData = await res.json();
            const formatted: ScholarshipReceiptData = {
              enrollmentNumber: dbData.enrollment_number || enrollmentNumberParam || 'BSE26-PENDING',
              studentName: dbData.student_name || studentNameParam,
              dob: dbData.dob || '',
              gender: dbData.gender || '',
              class: dbData.class || '',
              section: dbData.section || null,
              schoolName: dbData.school_name || '',
              schoolAddress: dbData.school_address || null,
              studentMobile: dbData.student_mobile || null,
              parentName: dbData.parent_name || '',
              motherName: dbData.mother_name || null,
              parentMobile: dbData.parent_mobile || '',
              email: dbData.email || null,
              address: dbData.address || '',
              city: dbData.city || null,
              state: dbData.state || null,
              pinCode: dbData.pin_code || null,
              category: dbData.category || null,
              religion: dbData.religion || null,
              referralId: dbData.referral_id || null,
              amount: dbData.amount || 199,
              razorpayOrderId: dbData.razorpay_order_id || null,
              razorpayPaymentId: dbData.razorpay_payment_id || paymentIdParam,
              status: dbData.status || 'SUCCESS',
              createdAt: dbData.created_at || new Date().toISOString(),
            };
            setApplicationData(formatted);
            setFetchingData(false);
            return;
          }
        }
      } catch (err) {
        console.error('Error fetching application receipt data:', err);
      }

      // Fallback to cache or query params
      if (cachedApp) {
        setApplicationData({
          enrollmentNumber: cachedApp.enrollment_number || enrollmentNumberParam || 'BSE26-PENDING',
          studentName: cachedApp.student_name || studentNameParam,
          dob: cachedApp.dob || '',
          gender: cachedApp.gender || '',
          class: cachedApp.class || '',
          section: cachedApp.section || null,
          schoolName: cachedApp.school_name || '',
          schoolAddress: cachedApp.school_address || null,
          studentMobile: cachedApp.student_mobile || null,
          parentName: cachedApp.parent_name || '',
          motherName: cachedApp.mother_name || null,
          parentMobile: cachedApp.parent_mobile || '',
          email: cachedApp.email || null,
          address: cachedApp.address || '',
          city: cachedApp.city || null,
          state: cachedApp.state || null,
          pinCode: cachedApp.pin_code || null,
          category: cachedApp.category || null,
          religion: cachedApp.religion || null,
          referralId: cachedApp.referral_id || null,
          amount: 199,
          razorpayOrderId: cachedApp.razorpay_order_id || null,
          razorpayPaymentId: cachedApp.razorpay_payment_id || paymentIdParam,
          status: 'SUCCESS',
          createdAt: cachedApp.created_at || new Date().toISOString(),
        });
      } else {
        setApplicationData({
          enrollmentNumber: enrollmentNumberParam || 'BSE26-PENDING',
          studentName: studentNameParam,
          dob: '',
          gender: '',
          class: '',
          section: null,
          schoolName: '',
          schoolAddress: null,
          studentMobile: null,
          parentName: '',
          motherName: null,
          parentMobile: '',
          email: null,
          address: '',
          city: null,
          state: null,
          pinCode: null,
          category: null,
          religion: null,
          referralId: null,
          amount: 199,
          razorpayOrderId: null,
          razorpayPaymentId: paymentIdParam,
          status: 'SUCCESS',
          createdAt: new Date().toISOString(),
        });
      }
      setFetchingData(false);
    };

    fetchFullRecord();
  }, [enrollmentNumberParam, paymentIdParam, studentNameParam]);

  const handleDownloadReceipt = async () => {
    if (!applicationData) return;
    setDownloading(true);
    try {
      await generateScholarshipReceipt(applicationData, true);
    } catch (error) {
      console.error('Receipt generation error:', error);
      alert('Failed to generate PDF receipt. Please try again.');
    } finally {
      setDownloading(false);
    }
  };

  const handlePrintReceiptClick = async () => {
    if (!applicationData) return;
    try {
      await printScholarshipReceipt(applicationData);
    } catch (error) {
      console.error('Print receipt error:', error);
      alert('Failed to open receipt print dialog.');
    }
  };

  const handleDownloadFormClick = async () => {
    if (!applicationData) return;
    setDownloadingForm(true);
    try {
      await generateScholarshipForm(applicationData, true);
    } catch (error) {
      console.error('Form generation error:', error);
      alert('Failed to generate Application Form PDF. Please try again.');
    } finally {
      setDownloadingForm(false);
    }
  };

  const handlePrintFormClick = async () => {
    if (!applicationData) return;
    try {
      await printScholarshipForm(applicationData);
    } catch (error) {
      console.error('Print form error:', error);
      alert('Failed to open form print dialog.');
    }
  };

  const studentDisplay = applicationData?.studentName || studentNameParam;
  const enrollmentDisplay = applicationData?.enrollmentNumber || enrollmentNumberParam;
  const paymentDisplay = applicationData?.razorpayPaymentId || paymentIdParam;

  return (
    <div className="bg-white rounded-3xl shadow-xl p-8 sm:p-12 max-w-2xl w-full text-center relative overflow-hidden border border-gray-100">
      {/* Decorative top accent */}
      <div className="absolute top-0 left-0 right-0 h-2.5 bg-gradient-to-r from-teal-700 via-amber-500 to-teal-800" />

      {/* Success Badge */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 200, damping: 15 }}
        className="flex justify-center mb-6"
      >
        <div className="w-20 h-20 sm:w-24 sm:h-24 bg-green-50 rounded-full flex items-center justify-center border-4 border-green-100">
          <CheckCircle2 className="w-12 h-12 sm:w-14 sm:h-14 text-green-600" />
        </div>
      </motion.div>

      <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-green-100 text-green-800 mb-3">
        <ShieldCheck className="w-3.5 h-3.5" /> Payment & Registration Confirmed
      </span>

      <h1 className="text-2xl sm:text-3xl font-black text-gray-900 mb-2">Registration Successful!</h1>
      <p className="text-gray-600 text-sm sm:text-base mb-6 leading-relaxed">
        Thank you, <span className="font-bold text-gray-900">{studentDisplay}</span>. Your application and registration fee for the <strong className="text-teal-900">Buniyad Scholarship Examination 2026–27</strong> has been successfully received.
      </p>

      {/* Enrollment Card */}
      {enrollmentDisplay && (
        <div className="bg-gradient-to-br from-teal-50 to-teal-100/60 border-2 border-teal-300/80 rounded-2xl p-5 sm:p-6 mb-6 text-center shadow-inner">
          <p className="text-xs text-teal-800 font-extrabold uppercase tracking-widest mb-1.5">Your Official Enrollment Number</p>
          <p className="text-3xl sm:text-4xl font-black text-teal-950 font-mono tracking-tight">{enrollmentDisplay}</p>
          <p className="text-xs text-teal-700 mt-2 font-medium">Please preserve this enrollment number safely. It is required for downloading your Admit Card.</p>
        </div>
      )}

      {/* Application Snapshot Details */}
      {applicationData && (
        <div className="bg-gray-50 rounded-2xl p-5 mb-8 text-left border border-gray-100 space-y-3 text-xs sm:text-sm">
          <div className="flex items-center justify-between pb-2 border-b border-gray-200">
            <span className="font-bold text-gray-800 flex items-center gap-1.5">
              <FileText className="w-4 h-4 text-teal-700" /> Registration Summary
            </span>
            <span className="text-xs font-semibold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">Fee Paid: ₹199</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-gray-700 pt-1">
            {applicationData.class && (
              <div>
                <span className="text-gray-500 font-medium">Class: </span>
                <span className="font-bold text-gray-900">{applicationData.class} {applicationData.section ? `(${applicationData.section})` : ''}</span>
              </div>
            )}
            {applicationData.schoolName && (
              <div className="truncate">
                <span className="text-gray-500 font-medium">School: </span>
                <span className="font-semibold text-gray-900">{applicationData.schoolName}</span>
              </div>
            )}
            {applicationData.parentName && (
              <div>
                <span className="text-gray-500 font-medium">Parent: </span>
                <span className="font-semibold text-gray-900">{applicationData.parentName}</span>
              </div>
            )}
            {applicationData.parentMobile && (
              <div>
                <span className="text-gray-500 font-medium">Mobile: </span>
                <span className="font-semibold text-gray-900">{applicationData.parentMobile}</span>
              </div>
            )}
            {paymentDisplay && (
              <div className="col-span-1 sm:col-span-2 text-xs font-mono text-gray-500 truncate">
                <span>Payment ID: </span>
                <span className="text-teal-800 font-bold">{paymentDisplay}</span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Download & Print Actions */}
      <div className="space-y-3">
        {/* Main CTA: Download Receipt */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleDownloadReceipt}
          disabled={downloading || fetchingData}
          className="w-full py-3.5 px-6 bg-gradient-to-r from-teal-700 to-teal-900 text-white font-bold rounded-2xl shadow-lg hover:shadow-xl hover:from-teal-800 hover:to-teal-950 transition-all flex items-center justify-center gap-3 text-base sm:text-lg disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
        >
          {downloading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Generating Official Receipt PDF...
            </>
          ) : (
            <>
              <Download className="w-5 h-5 text-amber-300" />
              Download Registration & Fee Receipt (PDF)
            </>
          )}
        </motion.button>

        {/* Secondary Buttons: Print Receipt & Download Form */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
          <button
            onClick={handlePrintReceiptClick}
            disabled={fetchingData}
            className="py-3 px-4 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 font-bold rounded-xl transition-all flex items-center justify-center gap-2 text-sm disabled:opacity-50"
          >
            <Printer className="w-4 h-4 text-emerald-700" />
            Print Receipt
          </button>

          <button
            onClick={handleDownloadFormClick}
            disabled={downloadingForm || fetchingData}
            className="py-3 px-4 bg-indigo-50 hover:bg-indigo-100 text-indigo-800 border border-indigo-200 font-bold rounded-xl transition-all flex items-center justify-center gap-2 text-sm disabled:opacity-50"
          >
            {downloadingForm ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <FileDown className="w-4 h-4 text-indigo-700" />
            )}
            Download Full Application Form
          </button>
        </div>

        <p className="text-xs text-gray-500 italic pt-1">
          Official computer-generated documents issued by Care Plus Foundation Trust.
        </p>

        <div className="pt-3">
          <Link 
            href="/"
            className="inline-flex items-center justify-center gap-2 py-2.5 px-6 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold rounded-full transition-colors text-sm"
          >
            <Home className="w-4 h-4" />
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function ScholarshipSuccessPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 py-16">
      <Suspense fallback={
        <div className="bg-white rounded-3xl p-12 text-center shadow-lg">
          <Loader2 className="w-8 h-8 animate-spin text-teal-700 mx-auto mb-3" />
          <p className="text-gray-600 font-semibold">Loading registration confirmation...</p>
        </div>
      }>
        <SuccessContent />
      </Suspense>
    </div>
  );
}
