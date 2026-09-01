"use client";

import { motion } from "framer-motion";
import { Search, Download, Filter, MoreVertical } from "lucide-react";

export default function DonationsPage() {
  const dummyDonations = [
    { id: "DON-8293", name: "Rahul Sharma", email: "rahul@example.com", amount: "₹5,000", date: "2026-09-01", status: "Success", method: "UPI" },
    { id: "DON-8292", name: "Priya Singh", email: "priya@example.com", amount: "₹2,500", date: "2026-08-31", status: "Success", method: "Card" },
    { id: "DON-8291", name: "Amit Kumar", email: "amit@example.com", amount: "₹10,000", date: "2026-08-29", status: "Failed", method: "Net Banking" },
    { id: "DON-8290", name: "Sneha Patel", email: "sneha@example.com", amount: "₹1,000", date: "2026-08-28", status: "Success", method: "UPI" },
    { id: "DON-8289", name: "Vikram Malhotra", email: "vikram@example.com", amount: "₹15,000", date: "2026-08-25", status: "Success", method: "Card" },
  ];

  return (
    <div className="space-y-6">
      {/* Header Actions */}
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

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left whitespace-nowrap">
            <thead className="bg-gray-50 border-b border-gray-100 text-sm font-medium text-gray-500">
              <tr>
                <th className="px-6 py-4">Transaction ID</th>
                <th className="px-6 py-4">Donor Info</th>
                <th className="px-6 py-4">Amount</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4">Method</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {dummyDonations.map((donation, index) => (
                <motion.tr 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  key={donation.id} 
                  className="hover:bg-gray-50/50 transition-colors"
                >
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">{donation.id}</td>
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-gray-900">{donation.name}</div>
                    <div className="text-sm text-gray-500">{donation.email}</div>
                  </td>
                  <td className="px-6 py-4 text-sm font-bold text-gray-900">{donation.amount}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{donation.date}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{donation.method}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                      donation.status === "Success" 
                        ? "bg-emerald-50 text-emerald-700" 
                        : "bg-red-50 text-red-700"
                    }`}>
                      {donation.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-gray-400 hover:text-gray-600 p-1 rounded-lg hover:bg-gray-100 transition-colors">
                      <MoreVertical size={20} />
                    </button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Pagination Dummy */}
        <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-between text-sm text-gray-500">
          <div>Showing 1 to 5 of 45 results</div>
          <div className="flex gap-2">
            <button className="px-3 py-1 border border-gray-200 rounded-lg disabled:opacity-50">Previous</button>
            <button className="px-3 py-1 border border-gray-200 rounded-lg">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
}
