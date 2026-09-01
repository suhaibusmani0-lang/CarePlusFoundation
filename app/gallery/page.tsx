'use client';
import React, { useEffect, useState } from 'react';

export default function GalleryPage() {
  const [images, setImages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const res = await fetch('/api/gallery');
        if (res.ok) {
          const data = await res.json();
          setImages(data);
        }
      } catch (error) {
        console.error('Failed to fetch gallery', error);
      } finally {
        setLoading(false);
      }
    };
    fetchGallery();
  }, []);

  return (
    <main className="min-h-screen bg-gray-50 pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold text-[#0f4a5c] mb-4">Our Gallery</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">Glimpses of our events, programs, and the smiles we've helped create together.</p>
        </div>

        {loading ? (
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className={`bg-gray-200 rounded-2xl animate-pulse ${i % 2 === 0 ? 'h-64' : 'h-96'}`}></div>
            ))}
          </div>
        ) : images.length === 0 ? (
          <div className="text-center py-24 bg-white rounded-3xl shadow-sm border border-gray-100">
             <div className="w-24 h-24 bg-[#0f4a5c]/5 text-[#0f4a5c] rounded-full flex items-center justify-center mx-auto mb-6">
               <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
             </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Gallery Coming Soon</h2>
            <p className="text-gray-500">We are curating our best moments to share with you.</p>
          </div>
        ) : (
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
            {images.map((img, index) => (
              <div key={index} className="break-inside-avoid relative group rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300">
                <img src={img.imageUrl} alt={img.title || 'Gallery Image'} className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                  <div className="p-6">
                    {img.title && <p className="text-white font-medium text-lg">{img.title}</p>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
