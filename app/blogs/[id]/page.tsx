'use client';
import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';

export default function SingleBlogPage() {
  const { id } = useParams();
  const router = useRouter();
  const [blog, setBlog] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    const fetchBlog = async () => {
      try {
        const res = await fetch(`/api/blogs/${id}`);
        if (res.ok) {
          const data = await res.json();
          setBlog(data);
        } else {
          router.push('/blogs');
        }
      } catch (error) {
        console.error('Failed to fetch blog', error);
      } finally {
        setLoading(false);
      }
    };
    fetchBlog();
  }, [id, router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-24 pb-20 flex justify-center">
        <div className="max-w-4xl w-full px-4 animate-pulse">
          <div className="h-8 w-24 bg-gray-200 rounded mb-8"></div>
          <div className="h-[400px] bg-gray-200 rounded-2xl mb-8"></div>
          <div className="h-10 bg-gray-200 rounded w-3/4 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/4 mb-10"></div>
          <div className="space-y-4">
            <div className="h-4 bg-gray-200 rounded w-full"></div>
            <div className="h-4 bg-gray-200 rounded w-full"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!blog) return null;

  return (
    <main className="min-h-screen bg-gray-50 pt-24 pb-20">
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link href="/blogs" className="inline-flex items-center text-[#0f4a5c] font-medium hover:text-[#b8860b] transition-colors mb-8">
          <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
          Back to Blogs
        </Link>
        
        <div className="bg-white rounded-3xl overflow-hidden shadow-lg border border-gray-100">
          {blog.image && (
            <div className="w-full h-[400px] md:h-[500px] overflow-hidden">
              <img src={blog.image} alt={blog.title} className="w-full h-full object-cover" />
            </div>
          )}
          
          <div className="p-8 md:p-12">
            <div className="flex items-center gap-4 mb-6 text-sm text-gray-500 font-medium">
              <span className="flex items-center bg-gray-100 px-3 py-1 rounded-full">
                <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                {new Date(blog.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
              </span>
              {blog.author && (
                <span className="flex items-center bg-[#0f4a5c]/5 text-[#0f4a5c] px-3 py-1 rounded-full">
                  <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                  {blog.author}
                </span>
              )}
            </div>
            
            <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-8 leading-tight">{blog.title}</h1>
            
            <div className="prose prose-lg max-w-none text-gray-700 prose-headings:text-[#0f4a5c] prose-a:text-[#b8860b]" dangerouslySetInnerHTML={{ __html: blog.content }}>
            </div>
          </div>
        </div>
      </article>
    </main>
  );
}
