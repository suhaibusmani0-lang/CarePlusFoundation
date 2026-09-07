"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Download, Filter, MoreVertical, Loader2, Edit, Trash2, X } from "lucide-react";

export default function DonationsPage() {
  const [donations, setDonations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editModal, setEditModal] = useState<{ open: boolean, data: any }>({ open: false, data: null });
  const [deleteModal, setDeleteModal] = useState<{ open: boolean, id: string | null }>({ open: false, id: null });
  const [actionLoading, setActionLoading] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState<string | null>(null);

  useEffect(() => {
    fetchDonations();
  }, []);

  const fetchDonations = async () => {
    try {
      const res = await fetch('/api/donations');
      const data = await res.json();
      setDonations(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Failed to fetch donations", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteModal.id) return;
    setActionLoading(true);
    try {
      const res = await fetch(`/api/donations/${deleteModal.id}`, { method: 'DELETE' });
      if (res.ok) {
        setDonations(donations.filter(d => d.id !== deleteModal.id));
        setDeleteModal({ open: false, id: null });
      } else {
        alert("Failed to delete donation");
      }
    } catch (e) {
      alert("Error deleting donation");
    } finally {
      setActionLoading(false);
    }
  };

  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!editModal.data?.id) return;
    setActionLoading(true);

    const form = new FormData(e.currentTarget);
    const amount = form.get("amount");
    const status = form.get("status");

    try {
      const res = await fetch(`/api/donations/${editModal.data.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount, status })
      });
      if (res.ok) {
        const updated = await res.json();
        setDonations(donations.map(d => d.id === updated.id ? updated : d));
        setEditModal({ open: false, data: null });
      } else {
        alert("Failed to update donation");
      }
    } catch (e) {
      alert("Error updating donation");
    } finally {
      setActionLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="relative flex-1 max-w-md w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input 
            type="text" 
            placeholder="Search donations by name or ID..." 
            className="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0f4a5c]/20 focus:border-[#0f4a5c]"
          />
        </div>
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-xl text-gray-700 hover:bg-gray-50 transition-colors">
            <Filter size={18} />
            <span className="hidden sm:inline">Filter</span>
          </button>
          <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-[#0f4a5c] text-white rounded-xl hover:bg-[#0f4a5c]/90 transition-colors">
            <Download size={18} />
            <span className="hidden sm:inline">Export</span>
          </button>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto min-h-[300px]">
          <table className="w-full text-left whitespace-nowrap relative">
            <thead className="bg-gray-50 border-b border-gray-100 text-sm font-medium text-gray-500">
              <tr>
                <th className="px-6 py-4">Transaction ID</th>
                <th className="px-6 py-4">Donor Info</th>
                <th className="px-6 py-4">Amount</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {loading ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                    <Loader2 className="w-8 h-8 animate-spin mx-auto mb-2 text-[#0f4a5c]" />
                    Loading donations...
                  </td>
                </tr>
              ) : donations.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                    No donations found.
                  </td>
                </tr>
              ) : (
                donations.map((donation, index) => (
                  <motion.tr 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    key={donation.id} 
                    className="hover:bg-gray-50/50 transition-colors"
                  >
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">{donation.razorpay_payment_id || donation.razorpay_order_id}</td>
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-900">{donation.donor?.name || 'N/A'}</div>
                      <div className="text-sm text-gray-500">{donation.donor?.email || 'N/A'}</div>
                    </td>
                    <td className="px-6 py-4 text-sm font-bold text-gray-900">₹{donation.amount}</td>
                    <td className="px-6 py-4 text-sm text-gray-500">{new Date(donation.created_at).toLocaleDateString('en-IN', { year: 'numeric', month: 'short', day: 'numeric' })}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                        donation.status === "SUCCESS" 
                          ? "bg-emerald-50 text-emerald-700" 
                          : donation.status === "FAILED"
                          ? "bg-red-50 text-red-700"
                          : "bg-yellow-50 text-yellow-700"
                      }`}>
                        {donation.status || 'PENDING'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right relative">
                      <button 
                        onClick={() => setDropdownOpen(dropdownOpen === donation.id ? null : donation.id)}
                        className="text-gray-400 hover:text-gray-600 p-1 rounded-lg hover:bg-gray-100 transition-colors"
                      >
                        <MoreVertical size={20} />
                      </button>
                      
                      <AnimatePresence>
                        {dropdownOpen === donation.id && (
                          <motion.div 
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="absolute right-8 top-10 bg-white border border-gray-100 rounded-lg shadow-lg w-36 overflow-hidden z-10"
                          >
                            <button 
                              onClick={() => { setEditModal({ open: true, data: donation }); setDropdownOpen(null); }}
                              className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                            >
                              <Edit size={16} /> Edit
                            </button>
                            <button 
                              onClick={() => { setDeleteModal({ open: true, id: donation.id }); setDropdownOpen(null); }}
                              className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
                            >
                              <Trash2 size={16} /> Delete
                            </button>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </td>
                  </motion.tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        
        <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-between text-sm text-gray-500">
          <div>Showing {donations.length} results</div>
          <div className="flex gap-2">
            <button className="px-3 py-1 border border-gray-200 rounded-lg disabled:opacity-50" disabled>Previous</button>
            <button className="px-3 py-1 border border-gray-200 rounded-lg disabled:opacity-50" disabled>Next</button>
          </div>
        </div>
      </div>

      {/* Modals */}
      <AnimatePresence>
        {deleteModal.open && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="bg-white rounded-xl shadow-xl max-w-sm w-full p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-2">Delete Donation</h3>
              <p className="text-gray-500 mb-6">Are you sure you want to delete this donation record? This action cannot be undone.</p>
              <div className="flex justify-end gap-3">
                <button disabled={actionLoading} onClick={() => setDeleteModal({ open: false, id: null })} className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">Cancel</button>
                <button disabled={actionLoading} onClick={handleDelete} className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center gap-2">
                  {actionLoading ? <Loader2 size={16} className="animate-spin" /> : <Trash2 size={16} />} Delete
                </button>
              </div>
            </motion.div>
          </div>
        )}

        {editModal.open && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="bg-white rounded-xl shadow-xl max-w-md w-full p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-gray-900">Edit Donation</h3>
                <button onClick={() => setEditModal({ open: false, data: null })} className="p-1 hover:bg-gray-100 rounded-lg"><X size={20} className="text-gray-500" /></button>
              </div>
              
              <form onSubmit={handleUpdate} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Donor Name</label>
                  <input type="text" disabled defaultValue={editModal.data?.donor?.name} className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Amount (₹)</label>
                  <input name="amount" type="number" required defaultValue={editModal.data?.amount} className="w-full px-4 py-2 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0f4a5c]" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                  <select name="status" defaultValue={editModal.data?.status || 'SUCCESS'} className="w-full px-4 py-2 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0f4a5c]">
                    <option value="SUCCESS">SUCCESS</option>
                    <option value="PENDING">PENDING</option>
                    <option value="FAILED">FAILED</option>
                  </select>
                </div>
                
                <div className="pt-4 flex justify-end gap-3">
                  <button type="button" disabled={actionLoading} onClick={() => setEditModal({ open: false, data: null })} className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">Cancel</button>
                  <button type="submit" disabled={actionLoading} className="px-4 py-2 bg-[#0f4a5c] text-white rounded-lg hover:bg-[#0f4a5c]/90 transition-colors flex items-center gap-2">
                    {actionLoading ? <Loader2 size={16} className="animate-spin" /> : 'Save Changes'}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
