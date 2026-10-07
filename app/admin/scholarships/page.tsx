'use client';

import { useEffect, useState } from 'react';
import { Loader2, Search, Download } from 'lucide-react';
import { motion } from 'framer-motion';

export default function AdminScholarships() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetch('/api/scholarships')
      .then(res => res.json())
      .then(data => {
        setApplications(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const filteredApps = applications.filter((app: any) => 
    app.student_name?.toLowerCase().includes(searchTerm.toLowerCase()) || 
    app.enrollment_number?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    app.parent_mobile?.includes(searchTerm)
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Scholarship Applications</h1>
          <p className="text-sm text-gray-500 mt-1">Manage Buniyad Scholarship registrations</p>
        </div>
        
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-64">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search students, ID..."
              className="block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-teal-500 focus:border-teal-500 bg-white"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
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
                  <th className="px-6 py-4">Referral ID</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Reg. Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredApps.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-6 py-12 text-center text-gray-500">
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
                      <td className="px-6 py-4">
                        {app.parent_mobile}
                      </td>
                      <td className="px-6 py-4 font-mono text-gray-600">
                        {app.referral_id || '-'}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          app.status === 'SUCCESS' ? 'bg-green-100 text-green-700' : 
                          app.status === 'PENDING' ? 'bg-yellow-100 text-yellow-700' : 
                          'bg-red-100 text-red-700'
                        }`}>
                          {app.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        {new Date(app.created_at).toLocaleDateString('en-IN', {
                          day: '2-digit', month: 'short', year: 'numeric'
                        })}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </motion.div>
      )}
    </div>
  );
}

