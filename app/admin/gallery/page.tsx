"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Plus, Trash2, Image as ImageIcon, Loader2, Edit2, X } from "lucide-react";
import Image from "next/image";

export default function GalleryPage() {
  const [images, setImages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  
  const [file, setFile] = useState<File | null>(null);
  const [existingImageUrl, setExistingImageUrl] = useState('');
  const [title, setTitle] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchGallery();
  }, []);

  const fetchGallery = async () => {
    try {
      const res = await fetch('/api/gallery');
      const data = await res.json();
      setImages(Array.isArray(data) ? data : []);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (image: any) => {
    setEditingId(image.id);
    setTitle(image.title || '');
    setExistingImageUrl(image.imageUrl || '');
    setFile(null);
    setShowForm(true);
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingId(null);
    setTitle('');
    setFile(null);
    setExistingImageUrl('');
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this image?')) return;
    try {
      await fetch(`/api/gallery/${id}`, { method: 'DELETE' });
      setImages(images.filter(i => i.id !== id));
    } catch (e) {
      console.error(e);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file && !existingImageUrl) return alert('Please select a file');
    setSubmitting(true);
    try {
      let finalImageUrl = existingImageUrl;

      if (file) {
        // 1. Upload to Cloudinary
        const formData = new FormData();
        formData.append('file', file);
        const uploadRes = await fetch('/api/upload', {
          method: 'POST',
          body: formData
        });
        const uploadData = await uploadRes.json();
        
        if (!uploadRes.ok) throw new Error(uploadData.error || 'Upload failed');
        finalImageUrl = uploadData.url;
      }

      const method = editingId ? 'PUT' : 'POST';
      const url = editingId ? `/api/gallery/${editingId}` : '/api/gallery';

      // 2. Save to DB
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, imageUrl: finalImageUrl })
      });
      
      if (res.ok) {
        handleCancel();
        fetchGallery();
      }
    } catch (error) {
      console.error(error);
      alert('Failed to save image');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Actions */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-xl font-bold text-gray-900">Gallery Management</h2>
        <button 
          onClick={showForm ? handleCancel : () => setShowForm(true)}
          className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2 bg-[#b8860b] text-white rounded-xl hover:bg-[#b8860b]/90 transition-colors"
        >
          {showForm ? <X size={18} /> : <Plus size={18} />}
          <span>{showForm ? 'Cancel' : 'Upload Image'}</span>
        </button>
      </div>

      {showForm && (
        <motion.form 
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 space-y-4"
        >
          <h3 className="text-xl font-bold text-gray-900 mb-4">{editingId ? 'Edit Image' : 'Upload New Image'}</h3>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Title / Caption</label>
            <input type="text" value={title} onChange={e => setTitle(e.target.value)} className="w-full p-3 border rounded-xl" placeholder="E.g., Food Distribution 2026" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Select Image</label>
            <div className="flex items-center gap-4">
              <div className="flex-1">
                <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-xl cursor-pointer bg-gray-50 hover:bg-gray-100">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <ImageIcon className="w-8 h-8 text-gray-400 mb-2" />
                    <p className="text-sm text-gray-500">{file ? file.name : (existingImageUrl ? "Click to change image" : "Click to upload image")}</p>
                  </div>
                  <input required={!existingImageUrl} type="file" className="hidden" accept="image/*" onChange={(e) => {
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
            {submitting ? <Loader2 className="animate-spin w-5 h-5" /> : (editingId ? 'Update Image' : 'Upload Image')}
          </button>
        </motion.form>
      )}

      {/* Grid */}
      {loading ? (
        <div className="p-12 flex justify-center text-gray-500"><Loader2 className="animate-spin w-8 h-8" /></div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {images.map((image, index) => (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
              key={image.id}
              className="group bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden relative"
            >
              <div className="aspect-[4/3] relative bg-gray-100 flex items-center justify-center">
                <Image 
                  src={image.imageUrl} 
                  alt={image.title || 'Gallery image'}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                  <button onClick={() => handleEdit(image)} className="p-2 bg-white/20 hover:bg-blue-500 text-white rounded-full backdrop-blur-md transition-colors">
                    <Edit2 size={20} />
                  </button>
                  <button onClick={() => handleDelete(image.id)} className="p-2 bg-white/20 hover:bg-red-500 text-white rounded-full backdrop-blur-md transition-colors">
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-sm font-medium text-gray-900 truncate">{image.title || 'Untitled'}</h3>
              </div>
            </motion.div>
          ))}
          {images.length === 0 && (
             <div className="col-span-full p-8 text-center text-gray-500">No images in gallery yet.</div>
          )}
        </div>
      )}
    </div>
  );
}
