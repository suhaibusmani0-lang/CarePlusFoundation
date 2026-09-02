"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Search, Plus, Trash2, Loader2, Image as ImageIcon, Edit2, X } from "lucide-react";
import Image from "next/image";

export default function BlogsPage() {
  const [blogs, setBlogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  
  // Form State
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [existingImageUrl, setExistingImageUrl] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const res = await fetch('/api/blogs');
      const data = await res.json();
      setBlogs(Array.isArray(data) ? data : []);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (blog: any) => {
    setEditingId(blog.id);
    setTitle(blog.title);
    setContent(blog.content);
    setExistingImageUrl(blog.imageUrl || '');
    setFile(null);
    setShowForm(true);
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingId(null);
    setTitle('');
    setContent('');
    setFile(null);
    setExistingImageUrl('');
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this blog?')) return;
    try {
      await fetch(`/api/blogs/${id}`, { method: 'DELETE' });
      setBlogs(blogs.filter(b => b.id !== id));
    } catch (e) {
      console.error(e);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      let finalImageUrl = existingImageUrl;
      
      // Upload new image if exists
      if (file) {
        const formData = new FormData();
        formData.append('file', file);
        const uploadRes = await fetch('/api/upload', {
          method: 'POST',
          body: formData
        });
        const uploadData = await uploadRes.json();
        finalImageUrl = uploadData.url;
      }

      const method = editingId ? 'PUT' : 'POST';
      const url = editingId ? `/api/blogs/${editingId}` : '/api/blogs';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, content, imageUrl: finalImageUrl, author: 'Admin' })
      });
      
      if (res.ok) {
        handleCancel();
        fetchBlogs();
      }
    } catch (error) {
      console.error(error);
      alert('Failed to save blog');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Actions */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="relative flex-1 max-w-md w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input 
            type="text" 
            placeholder="Search blogs..." 
            className="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0f4a5c]/20 focus:border-[#0f4a5c]"
          />
        </div>
        <button 
          onClick={showForm ? handleCancel : () => setShowForm(true)}
          className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2 bg-[#0f4a5c] text-white rounded-xl hover:bg-[#0f4a5c]/90 transition-colors"
        >
          {showForm ? <X size={18} /> : <Plus size={18} />}
          <span>{showForm ? 'Cancel' : 'New Post'}</span>
        </button>
      </div>

      {showForm && (
        <motion.form 
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 space-y-4"
        >
          <h3 className="text-xl font-bold text-gray-900 mb-4">{editingId ? 'Edit Blog' : 'Create New Blog'}</h3>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
            <input type="text" required value={title} onChange={e => setTitle(e.target.value)} className="w-full p-3 border rounded-xl" placeholder="Blog Title" />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Content</label>
            <textarea required value={content} onChange={e => setContent(e.target.value)} className="w-full p-3 border rounded-xl h-32" placeholder="Write something amazing..." />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Cover Image (Optional)</label>
            <div className="flex items-center gap-4">
              <div className="flex-1">
                <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-xl cursor-pointer bg-gray-50 hover:bg-gray-100">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <ImageIcon className="w-8 h-8 text-gray-400 mb-2" />
                    <p className="text-sm text-gray-500">{file ? file.name : (existingImageUrl ? "Click to change image" : "Click to upload image")}</p>
                  </div>
                  <input type="file" className="hidden" accept="image/*" onChange={(e) => {
                    if (e.target.files && e.target.files.length > 0) {
                       setFile(e.target.files[0]);
                       setExistingImageUrl('');
                    }
                  }} />
                </label>
              </div>
              
              {(file || existingImageUrl) && (
                <button
                  type="button"
                  onClick={() => {
                    setFile(null);
                    setExistingImageUrl('');
                  }}
                  className="p-3 bg-red-50 text-red-600 rounded-xl hover:bg-red-100 transition-colors flex items-center justify-center"
                  title="Remove image"
                >
                  <Trash2 size={24} />
                </button>
              )}
            </div>
            {(existingImageUrl && !file) && (
                <div className="mt-2 text-sm text-green-600">Current image is set.</div>
            )}
          </div>

          <button disabled={submitting} type="submit" className="w-full py-3 bg-[#b8860b] text-white rounded-xl font-bold hover:bg-[#daa520] transition-colors flex items-center justify-center">
            {submitting ? <Loader2 className="animate-spin w-5 h-5" /> : (editingId ? 'Update Blog' : 'Publish Blog')}
          </button>
        </motion.form>
      )}

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-gray-500 flex justify-center"><Loader2 className="animate-spin" /></div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left whitespace-nowrap">
              <thead className="bg-gray-50 border-b border-gray-100 text-sm font-medium text-gray-500">
                <tr>
                  <th className="px-6 py-4">Image</th>
                  <th className="px-6 py-4">Title</th>
                  <th className="px-6 py-4">Date</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {blogs.map((blog, index) => (
                  <motion.tr 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    key={blog.id} 
                    className="hover:bg-gray-50/50 transition-colors"
                  >
                    <td className="px-6 py-4">
                      {blog.imageUrl ? (
                        <div className="w-12 h-12 relative rounded-lg overflow-hidden">
                          <Image src={blog.imageUrl} alt="" fill className="object-cover" />
                        </div>
                      ) : <div className="w-12 h-12 bg-gray-100 rounded-lg" />}
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">
                      <div className="truncate max-w-[300px]">{blog.title}</div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {new Date(blog.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button onClick={() => handleEdit(blog)} className="p-2 mr-2 text-gray-400 hover:text-[#0f4a5c] rounded-lg hover:bg-blue-50 transition-colors">
                        <Edit2 size={18} />
                      </button>
                      <button onClick={() => handleDelete(blog.id)} className="p-2 text-gray-400 hover:text-red-600 rounded-lg hover:bg-red-50 transition-colors">
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </motion.tr>
                ))}
                {blogs.length === 0 && (
                  <tr><td colSpan={4} className="p-8 text-center text-gray-500">No blogs found.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
