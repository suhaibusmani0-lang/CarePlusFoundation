'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';

export default function BlogsPage() {
  const [blogs, setBlogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await fetch('/api/blogs');
        if (res.ok) {
          const data = await res.json();
          setBlogs(data);
        }
      } catch (error) {
        console.error('Failed to fetch blogs', error);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  return (
    <main className="min-h-screen bg-gray-50 pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold text-[#0f4a5c] mb-4">Our Blog</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">Discover stories, updates, and insights from our ongoing projects and community initiatives.</p>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100">
                <div className="h-56 bg-gray-200 animate-pulse"></div>
                <div className="p-6">
                  <div className="h-4 bg-gray-200 rounded w-1/4 mb-4 animate-pulse"></div>
                  <div className="h-6 bg-gray-200 rounded w-3/4 mb-3 animate-pulse"></div>
                  <div className="h-4 bg-gray-200 rounded w-full mb-2 animate-pulse"></div>
                  <div className="h-4 bg-gray-200 rounded w-2/3 animate-pulse"></div>
                </div>
              </div>
            ))}
          </div>
        ) : blogs.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl shadow-sm border border-gray-100">
            <span className="text-5xl mb-4 block">✍️</span>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">No blogs yet</h2>
            <p className="text-gray-500">Check back later for inspiring stories and updates.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {blogs.map((blog) => (
              <Link href={`/blogs/${blog.id}`} key={blog.id} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 group flex flex-col">
                <div className="h-56 overflow-hidden">
                  <img src={blog.imageUrl || '/placeholder-blog.jpg'} alt={blog.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <div className="text-sm font-medium text-[#b8860b] mb-3">
                    {new Date(blog.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-[#0f4a5c] transition-colors">{blog.title}</h3>
                  <p className="text-gray-600 line-clamp-3 mb-4 flex-1" dangerouslySetInnerHTML={{ __html: blog.content }}></p>
                  <div className="text-[#0f4a5c] font-semibold text-sm uppercase tracking-wider flex items-center">
                    Read More <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
