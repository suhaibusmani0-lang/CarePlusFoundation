'use client';

import { useEffect, useState } from 'react';
import { Loader2, Search, Download, Eye, X, FileText, Printer, FileDown, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { generateScholarshipReceipt, printScholarshipReceipt, ScholarshipReceiptData } from '@/lib/generate-scholarship-receipt';
import { generateScholarshipForm, printScholarshipForm } from '@/lib/generate-scholarship-form';

export default function AdminScholarships() {
  const [applications, setApplications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedApp, setSelectedApp] = useState<any | null>(null);
  const [actionLoading, setActionLoading] = useState<{ [key: string]: boolean }>({});

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      const res = await fetch('/api/scholarships');
      const data = await res.json();
      setApplications(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error('Failed to load applications:', err);
    } finally {
      setLoading(false);
    }
  };

  const formatAppData = (app: any): ScholarshipReceiptData => ({
    enrollmentNumber: app.enrollment_number || 'BSE26-PENDING',
    studentName: app.student_name,
    dob: app.dob || '',
    gender: app.gender || '',
    class: app.class || '',
    section: app.section || null,
    schoolName: app.school_name || '',
    schoolAddress: app.school_address || null,
    studentMobile: app.student_mobile || null,
    parentName: app.parent_name || '',
    motherName: app.mother_name || null,
    parentMobile: app.parent_mobile || '',
    email: app.email || null,
    address: app.address || '',
    city: app.city || null,
    state: app.state || null,
    pinCode: app.pin_code || null,
    category: app.category || null,
    religion: app.religion || null,
    referralId: app.referral_id || null,
    amount: app.amount || 199,
    razorpayOrderId: app.razorpay_order_id || null,
    razorpayPaymentId: app.razorpay_payment_id || null,
    status: app.status || 'SUCCESS',
    createdAt: app.created_at || new Date(),
  });

  const handleDownloadReceipt = async (app: any) => {
    const key = `receipt-dl-${app.id}`;
    setActionLoading((prev) => ({ ...prev, [key]: true }));
    try {
      await generateScholarshipReceipt(formatAppData(app), true);
    } catch (e) {
      console.error('Download receipt error:', e);
      alert('Failed to generate receipt PDF');
    } finally {
      setActionLoading((prev) => ({ ...prev, [key]: false }));
    }
  };

  const handlePrintReceipt = async (app: any) => {
    const key = `receipt-print-${app.id}`;
    setActionLoading((prev) => ({ ...prev, [key]: true }));
    try {
      await printScholarshipReceipt(formatAppData(app));
    } catch (e) {
      console.error('Print receipt error:', e);
      alert('Failed to open print dialog');
    } finally {
      setActionLoading((prev) => ({ ...prev, [key]: false }));
    }
  };

  const handleDownloadForm = async (app: any) => {
    const key = `form-dl-${app.id}`;
    setActionLoading((prev) => ({ ...prev, [key]: true }));
    try {
      await generateScholarshipForm(formatAppData(app), true);
    } catch (e) {
      console.error('Download form error:', e);
      alert('Failed to generate registration form PDF');
    } finally {
      setActionLoading((prev) => ({ ...prev, [key]: false }));
    }
  };

  const handlePrintForm = async (app: any) => {
    const key = `form-print-${app.id}`;
    setActionLoading((prev) => ({ ...prev, [key]: true }));
    try {
      await printScholarshipForm(formatAppData(app));
    } catch (e) {
      console.error('Print form error:', e);
      alert('Failed to open form print dialog');
    } finally {
      setActionLoading((prev) => ({ ...prev, [key]: false }));
    }
  };

  const exportToCSV = () => {
    if (applications.length === 0) {
      alert('No data to export');
      return;
    }

    const headers = [
      'Enrollment Number',
      'Student Name',
      'Date of Birth',
      'Gender',
      'Class',
      'Section',
      'School Name',
      'School Address',
      'Student Mobile',
      'Parent Name',
      'Mother Name',
      'Parent Mobile',
      'Email',
      'Address',
      'City',
      'State',
      'PIN Code',
      'Category',
      'Religion',
      'Referral ID',
      'Amount (INR)',
      'Status',
      'Razorpay Order ID',
      'Razorpay Payment ID',
      'Registration Date'
    ];

    const rows = applications.map((app: any) => [
      `"${app.enrollment_number || ''}"`,
      `"${app.student_name || ''}"`,
      `"${app.dob || ''}"`,
      `"${app.gender || ''}"`,
      `"${app.class || ''}"`,
      `"${app.section || ''}"`,
      `"${app.school_name ? app.school_name.replace(/"/g, '""') : ''}"`,
      `"${app.school_address ? app.school_address.replace(/"/g, '""') : ''}"`,
      `"${app.student_mobile || ''}"`,
      `"${app.parent_name ? app.parent_name.replace(/"/g, '""') : ''}"`,
      `"${app.mother_name ? app.mother_name.replace(/"/g, '""') : ''}"`,
      `"${app.parent_mobile || ''}"`,
      `"${app.email || ''}"`,
      `"${app.address ? app.address.replace(/"/g, '""') : ''}"`,
      `"${app.city || ''}"`,
      `"${app.state || ''}"`,
      `"${app.pin_code || ''}"`,
      `"${app.category || ''}"`,
      `"${app.religion || ''}"`,
      `"${app.referral_id || ''}"`,
      `"${app.amount || 199}"`,
      `"${app.status || ''}"`,
      `"${app.razorpay_order_id || ''}"`,
      `"${app.razorpay_payment_id || ''}"`,
      `"${new Date(app.created_at).toLocaleString('en-IN')}"`
    ]);

    const csvContent = '\uFEFF' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `Scholarship_Applications_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filteredApps = applications.filter((app: any) => 
    app.student_name?.toLowerCase().includes(searchTerm.toLowerCase()) || 
    app.enrollment_number?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    app.parent_mobile?.includes(searchTerm) ||
    app.school_name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Scholarship Applications & Backend</h1>
          <p className="text-sm text-gray-500 mt-1">Manage, download forms, and print receipts for Buniyad Scholarship registrations ({applications.length} total)</p>
        </div>
        
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-64">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search students, ID, mobile, school..."
              className="block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-teal-500 focus:border-teal-500 bg-white"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <button
            onClick={exportToCSV}
            className="inline-flex items-center gap-2 px-4 py-2 bg-[#0f4a5c] text-white text-sm font-semibold rounded-lg hover:bg-[#0c3a48] transition-colors shadow-sm"
          >
            <Download className="w-4 h-4" />
            Export CSV
          </button>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64 bg-white rounded-xl shadow-sm border border-gray-100">
          <Loader2 className="w-8 h-8 animate-spin text-teal-600" />
        </div>
      ) : (
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"
        >
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-gray-600 whitespace-nowrap">
              <thead className="bg-gray-50 text-gray-700 font-semibold border-b border-gray-100">
                <tr>
                  <th className="px-6 py-4">Enrollment No.</th>
                  <th className="px-6 py-4">Student Name</th>
                  <th className="px-6 py-4">Class</th>
                  <th className="px-6 py-4">Parent Mobile</th>
                  <th className="px-6 py-4">School</th>
                  <th className="px-6 py-4">Fee / Status</th>
                  <th className="px-6 py-4">Reg. Date</th>
                  <th className="px-6 py-4 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredApps.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="px-6 py-12 text-center text-gray-500">
                      No applications found matching your criteria
                    </td>
                  </tr>
                ) : (
                  filteredApps.map((app: any) => (
                    <tr key={app.id} className="hover:bg-gray-50/50 transition-colors">
                      <td className="px-6 py-4 font-mono font-medium text-teal-700">
                        {app.enrollment_number || '-'}
                      </td>
                      <td className="px-6 py-4 font-medium text-gray-900">
                        {app.student_name}
                      </td>
                      <td className="px-6 py-4">
                        {app.class} {app.section ? `(${app.section})` : ''}
                      </td>
                      <td className="px-6 py-4 font-medium text-gray-800">
                        {app.parent_mobile}
                      </td>
                      <td className="px-6 py-4 max-w-[200px] truncate text-gray-700" title={app.school_name}>
                        {app.school_name}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${
                          app.status === 'SUCCESS' ? 'bg-green-100 text-green-700' : 
                          app.status === 'PENDING' ? 'bg-yellow-100 text-yellow-700' : 
                          'bg-red-100 text-red-700'
                        }`}>
                          ₹{app.amount || 199} • {app.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        {new Date(app.created_at).toLocaleDateString('en-IN', {
                          day: '2-digit', month: 'short', year: 'numeric'
                        })}
                      </td>
                      <td className="px-6 py-4 text-center">
                        <div className="flex items-center justify-center gap-1.5">
                          {/* View Full Details */}
                          <button
                            onClick={() => setSelectedApp(app)}
                            className="inline-flex items-center gap-1 text-teal-700 hover:text-teal-900 font-semibold text-xs px-2.5 py-1.5 rounded-md hover:bg-teal-50 transition-colors border border-teal-200"
                            title="View Complete Student & Parent Details"
                          >
                            <Eye className="w-3.5 h-3.5" /> View
                          </button>

                          {/* Download Form */}
                          <button
                            onClick={() => handleDownloadForm(app)}
                            disabled={actionLoading[`form-dl-${app.id}`]}
                            className="inline-flex items-center gap-1 text-indigo-700 hover:text-indigo-900 font-semibold text-xs px-2.5 py-1.5 rounded-md hover:bg-indigo-50 transition-colors border border-indigo-200 disabled:opacity-50"
                            title="Download Full Registration Application Form (PDF)"
                          >
                            {actionLoading[`form-dl-${app.id}`] ? (
                              <Loader2 className="w-3.5 h-3.5 animate-spin" />
                            ) : (
                              <FileDown className="w-3.5 h-3.5 text-indigo-600" />
                            )}
                            Form
                          </button>

                          {/* Print Receipt */}
                          <button
                            onClick={() => handlePrintReceipt(app)}
                            disabled={actionLoading[`receipt-print-${app.id}`]}
                            className="inline-flex items-center gap-1 text-emerald-700 hover:text-emerald-900 font-semibold text-xs px-2.5 py-1.5 rounded-md hover:bg-emerald-50 transition-colors border border-emerald-200 disabled:opacity-50"
                            title="Print Official Receipt"
                          >
                            {actionLoading[`receipt-print-${app.id}`] ? (
                              <Loader2 className="w-3.5 h-3.5 animate-spin" />
                            ) : (
                              <Printer className="w-3.5 h-3.5 text-emerald-600" />
                            )}
                            Print Receipt
                          </button>

                          {/* Download Receipt */}
                          <button
                            onClick={() => handleDownloadReceipt(app)}
                            disabled={actionLoading[`receipt-dl-${app.id}`]}
                            className="inline-flex items-center gap-1 text-amber-700 hover:text-amber-900 font-semibold text-xs px-2.5 py-1.5 rounded-md hover:bg-amber-50 transition-colors border border-amber-200 disabled:opacity-50"
                            title="Download Official Receipt PDF"
                          >
                            {actionLoading[`receipt-dl-${app.id}`] ? (
                              <Loader2 className="w-3.5 h-3.5 animate-spin" />
                            ) : (
                              <Download className="w-3.5 h-3.5 text-amber-600" />
                            )}
                            Receipt
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </motion.div>
      )}

      {/* Details & Action Modal */}
      <AnimatePresence>
        {selectedApp && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-3xl max-w-3xl w-full max-h-[92vh] overflow-y-auto shadow-2xl p-6 sm:p-8 relative border border-gray-100"
            >
              {/* Header */}
              <div className="flex justify-between items-start border-b border-gray-100 pb-4 mb-5">
                <div>
                  <div className="flex items-center gap-3">
                    <h3 className="text-2xl font-black text-gray-900">{selectedApp.student_name}</h3>
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider ${
                      selectedApp.status === 'SUCCESS' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {selectedApp.status}
                    </span>
                  </div>
                  <p className="text-sm font-mono text-teal-700 mt-1 font-bold">Enrollment No: {selectedApp.enrollment_number || 'BSE26-PENDING'}</p>
                </div>
                <button
                  onClick={() => setSelectedApp(null)}
                  className="p-1.5 rounded-xl hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Action Toolbar Inside Modal */}
              <div className="bg-gradient-to-r from-teal-50 via-slate-50 to-amber-50 p-4 rounded-2xl border border-teal-100/80 mb-6 flex flex-wrap items-center justify-between gap-3">
                <div className="text-xs font-bold text-gray-700 uppercase tracking-wider">
                  Quick Actions (Print & Download):
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <button
                    onClick={() => handleDownloadForm(selectedApp)}
                    disabled={actionLoading[`form-dl-${selectedApp.id}`]}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl shadow-sm transition-all"
                  >
                    <FileDown className="w-4 h-4" /> Download Form (PDF)
                  </button>

                  <button
                    onClick={() => handlePrintForm(selectedApp)}
                    disabled={actionLoading[`form-print-${selectedApp.id}`]}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-slate-800 hover:bg-slate-900 text-white text-xs font-bold rounded-xl shadow-sm transition-all"
                  >
                    <Printer className="w-4 h-4" /> Print Form
                  </button>

                  <button
                    onClick={() => handlePrintReceipt(selectedApp)}
                    disabled={actionLoading[`receipt-print-${selectedApp.id}`]}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-sm transition-all"
                  >
                    <Printer className="w-4 h-4" /> Print Receipt
                  </button>

                  <button
                    onClick={() => handleDownloadReceipt(selectedApp)}
                    disabled={actionLoading[`receipt-dl-${selectedApp.id}`]}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold rounded-xl shadow-sm transition-all"
                  >
                    <Download className="w-4 h-4" /> Download Receipt
                  </button>
                </div>
              </div>

              {/* Full Details Display */}
              <div className="space-y-6 text-sm">
                {/* 1. Student Details */}
                <div>
                  <h4 className="font-bold text-gray-800 text-xs uppercase tracking-wider mb-2.5 text-teal-800 flex items-center gap-2">
                    <span className="w-2 h-2 bg-teal-600 rounded-full"></span> 1. Candidate / Student Information
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 bg-gray-50 p-4 sm:p-5 rounded-2xl border border-gray-100">
                    <div><span className="text-gray-500">Student Name:</span> <span className="font-bold text-gray-900">{selectedApp.student_name}</span></div>
                    <div><span className="text-gray-500">Class & Section:</span> <span className="font-bold text-gray-900">{selectedApp.class} {selectedApp.section ? `(${selectedApp.section})` : ''}</span></div>
                    <div><span className="text-gray-500">Date of Birth:</span> <span className="font-semibold text-gray-800">{selectedApp.dob || '-'}</span></div>
                    <div><span className="text-gray-500">Gender:</span> <span className="font-semibold text-gray-800">{selectedApp.gender || '-'}</span></div>
                    <div><span className="text-gray-500">Student Mobile:</span> <span className="font-semibold text-gray-800">{selectedApp.student_mobile || '-'}</span></div>
                    <div><span className="text-gray-500">Category / Religion:</span> <span className="font-semibold text-gray-800">{selectedApp.category || 'General'} / {selectedApp.religion || '-'}</span></div>
                    <div className="sm:col-span-2"><span className="text-gray-500">School Name:</span> <span className="font-semibold text-gray-900">{selectedApp.school_name}</span></div>
                    {selectedApp.school_address && <div className="sm:col-span-2"><span className="text-gray-500">School Address:</span> <span className="font-semibold text-gray-800">{selectedApp.school_address}</span></div>}
                  </div>
                </div>

                {/* 2. Parent & Contact Details */}
                <div>
                  <h4 className="font-bold text-gray-800 text-xs uppercase tracking-wider mb-2.5 text-teal-800 flex items-center gap-2">
                    <span className="w-2 h-2 bg-teal-600 rounded-full"></span> 2. Parent / Guardian & Residential Information
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 bg-gray-50 p-4 sm:p-5 rounded-2xl border border-gray-100">
                    <div><span className="text-gray-500">Father / Guardian:</span> <span className="font-bold text-gray-900">{selectedApp.parent_name}</span></div>
                    <div><span className="text-gray-500">Mother's Name:</span> <span className="font-semibold text-gray-800">{selectedApp.mother_name || '-'}</span></div>
                    <div><span className="text-gray-500">Parent Mobile:</span> <span className="font-bold text-teal-900">{selectedApp.parent_mobile}</span></div>
                    <div><span className="text-gray-500">Email ID:</span> <span className="font-semibold text-gray-800">{selectedApp.email || '-'}</span></div>
                    <div className="sm:col-span-2"><span className="text-gray-500">Full Address:</span> <span className="font-semibold text-gray-900">{selectedApp.address}</span></div>
                    <div><span className="text-gray-500">City / State:</span> <span className="font-semibold text-gray-800">{selectedApp.city || '-'}, {selectedApp.state || '-'}</span></div>
                    <div><span className="text-gray-500">PIN Code:</span> <span className="font-semibold text-gray-800">{selectedApp.pin_code || '-'}</span></div>
                    <div><span className="text-gray-500">Referral ID:</span> <span className="font-mono text-teal-800 font-semibold">{selectedApp.referral_id || 'Direct'}</span></div>
                    <div><span className="text-gray-500">Registration Date:</span> <span className="font-semibold text-gray-800">{new Date(selectedApp.created_at).toLocaleString('en-IN')}</span></div>
                  </div>
                </div>

                {/* 3. Payment & Transaction Details */}
                <div>
                  <h4 className="font-bold text-gray-800 text-xs uppercase tracking-wider mb-2.5 text-teal-800 flex items-center gap-2">
                    <span className="w-2 h-2 bg-teal-600 rounded-full"></span> 3. Payment & Transaction Verification
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 bg-gray-50 p-4 sm:p-5 rounded-2xl border border-gray-100">
                    <div><span className="text-gray-500">Registration Fee:</span> <span className="font-black text-gray-900 text-base">₹{selectedApp.amount || 199}</span></div>
                    <div><span className="text-gray-500">Payment Status:</span> <span className="font-bold text-green-700 bg-green-50 px-2.5 py-0.5 rounded-full inline-block">{selectedApp.status}</span></div>
                    <div className="sm:col-span-2"><span className="text-gray-500">Razorpay Order ID:</span> <span className="font-mono text-xs text-gray-800 bg-white px-2 py-0.5 rounded border border-gray-200">{selectedApp.razorpay_order_id}</span></div>
                    <div className="sm:col-span-2"><span className="text-gray-500">Razorpay Payment ID:</span> <span className="font-mono text-xs text-teal-800 font-bold bg-white px-2 py-0.5 rounded border border-gray-200">{selectedApp.razorpay_payment_id || 'Pending / N/A'}</span></div>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="mt-8 flex justify-end">
                <button
                  onClick={() => setSelectedApp(null)}
                  className="px-6 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-bold rounded-xl transition-colors"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
