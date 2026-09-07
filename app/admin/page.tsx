"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Heart, FileText, ImageIcon, IndianRupee, Loader2 } from "lucide-react";

export default function AdminDashboard() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch('/api/stats');
        const stats = await res.json();
        setData(stats);
      } catch (error) {
        console.error('Failed to fetch stats:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <Loader2 className="w-8 h-8 animate-spin text-[#0f4a5c]" />
      </div>
    );
  }

  const stats = [
    { name: "Total Donations", value: `₹${(data?.totalAmount || 0).toLocaleString('en-IN')}`, icon: IndianRupee, color: "bg-emerald-50 text-emerald-600" },
    { name: "Supporters", value: (data?.totalSupporters || 0).toLocaleString('en-IN'), icon: Heart, color: "bg-rose-50 text-rose-600" },
    { name: "Published Blogs", value: (data?.totalBlogs || 0).toLocaleString(), icon: FileText, color: "bg-blue-50 text-blue-600" },
    { name: "Gallery Items", value: (data?.totalGalleryItems || 0).toLocaleString(), icon: ImageIcon, color: "bg-purple-50 text-purple-600" },
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
                {data?.recentDonations?.map((donation: any) => (
                  <tr key={donation.id} className="border-b border-gray-50 last:border-0">
                    <td className="py-4 text-sm font-medium text-gray-900">{donation.name}</td>
                    <td className="py-4 text-sm text-gray-600">₹{donation.amount}</td>
                    <td className="py-4 text-sm text-gray-500">
                      {new Date(donation.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                    </td>
                    <td className="py-4 text-right">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                        donation.status === 'SUCCESS' ? 'bg-emerald-50 text-emerald-700' :
                        donation.status === 'FAILED' ? 'bg-red-50 text-red-700' :
                        'bg-yellow-50 text-yellow-700'
                      }`}>
                        {donation.status || 'PENDING'}
                      </span>
                    </td>
                  </tr>
                ))}
                {(!data?.recentDonations || data.recentDonations.length === 0) && (
                  <tr>
                    <td colSpan={4} className="py-8 text-center text-gray-500">
                      No recent donations
                    </td>
                  </tr>
                )}
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
            <a href="/admin/blogs" className="w-full flex items-center gap-3 p-4 rounded-xl border border-gray-100 hover:border-[#0f4a5c] hover:bg-gray-50 transition-colors text-left group block">
              <div className="p-2 bg-[#0f4a5c]/10 text-[#0f4a5c] rounded-lg group-hover:bg-[#0f4a5c] group-hover:text-white transition-colors">
                <FileText size={20} />
              </div>
              <div>
                <p className="font-medium text-gray-900">Manage Blogs</p>
                <p className="text-xs text-gray-500">Create & edit updates</p>
              </div>
            </a>
            <a href="/admin/gallery" className="w-full flex items-center gap-3 p-4 rounded-xl border border-gray-100 hover:border-[#b8860b] hover:bg-gray-50 transition-colors text-left group block">
              <div className="p-2 bg-[#b8860b]/10 text-[#b8860b] rounded-lg group-hover:bg-[#b8860b] group-hover:text-white transition-colors">
                <ImageIcon size={20} />
              </div>
              <div>
                <p className="font-medium text-gray-900">Manage Gallery</p>
                <p className="text-xs text-gray-500">Upload event photos</p>
              </div>
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
