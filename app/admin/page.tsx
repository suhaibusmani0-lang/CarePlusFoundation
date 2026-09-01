"use client";

import { motion } from "framer-motion";
import { Heart, FileText, ImageIcon, IndianRupee } from "lucide-react";

export default function AdminDashboard() {
  const stats = [
    { name: "Total Donations", value: "₹4,50,000", icon: IndianRupee, color: "bg-emerald-50 text-emerald-600" },
    { name: "Supporters", value: "1,245", icon: Heart, color: "bg-rose-50 text-rose-600" },
    { name: "Published Blogs", value: "24", icon: FileText, color: "bg-blue-50 text-blue-600" },
    { name: "Gallery Items", value: "156", icon: ImageIcon, color: "bg-purple-50 text-purple-600" },
  ];

  const recentDonations = [
    { id: 1, name: "Rahul Sharma", amount: "₹5,000", date: "Today", status: "Success" },
    { id: 2, name: "Priya Singh", amount: "₹2,500", date: "Yesterday", status: "Success" },
    { id: 3, name: "Amit Kumar", amount: "₹10,000", date: "Aug 29", status: "Success" },
    { id: 4, name: "Sneha Patel", amount: "₹1,000", date: "Aug 28", status: "Success" },
  ];

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex items-center gap-4"
          >
            <div className={`p-4 rounded-xl ${stat.color}`}>
              <stat.icon size={24} />
            </div>
            <div>
              <p className="text-sm text-gray-500 font-medium">{stat.name}</p>
              <h3 className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</h3>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Main Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-gray-900">Recent Donations</h2>
            <button className="text-sm text-[#0f4a5c] font-medium hover:underline">View All</button>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="text-sm text-gray-500 border-b border-gray-100">
                  <th className="pb-3 font-medium">Donor Name</th>
                  <th className="pb-3 font-medium">Amount</th>
                  <th className="pb-3 font-medium">Date</th>
                  <th className="pb-3 font-medium text-right">Status</th>
                </tr>
              </thead>
              <tbody>
                {recentDonations.map((donation) => (
                  <tr key={donation.id} className="border-b border-gray-50 last:border-0">
                    <td className="py-4 text-sm font-medium text-gray-900">{donation.name}</td>
                    <td className="py-4 text-sm text-gray-600">{donation.amount}</td>
                    <td className="py-4 text-sm text-gray-500">{donation.date}</td>
                    <td className="py-4 text-right">
                      <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700">
                        {donation.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6"
        >
          <h2 className="text-lg font-bold text-gray-900 mb-6">Quick Actions</h2>
          <div className="space-y-4">
            <button className="w-full flex items-center gap-3 p-4 rounded-xl border border-gray-100 hover:border-[#0f4a5c] hover:bg-gray-50 transition-colors text-left group">
              <div className="p-2 bg-[#0f4a5c]/10 text-[#0f4a5c] rounded-lg group-hover:bg-[#0f4a5c] group-hover:text-white transition-colors">
                <FileText size={20} />
              </div>
              <div>
                <p className="font-medium text-gray-900">Write Blog Post</p>
                <p className="text-xs text-gray-500">Create a new update</p>
              </div>
            </button>
            <button className="w-full flex items-center gap-3 p-4 rounded-xl border border-gray-100 hover:border-[#b8860b] hover:bg-gray-50 transition-colors text-left group">
              <div className="p-2 bg-[#b8860b]/10 text-[#b8860b] rounded-lg group-hover:bg-[#b8860b] group-hover:text-white transition-colors">
                <ImageIcon size={20} />
              </div>
              <div>
                <p className="font-medium text-gray-900">Upload to Gallery</p>
                <p className="text-xs text-gray-500">Add event photos</p>
              </div>
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
