'use client';

import HeroSection from '@/app/components/HeroSection';
import StatsSection from '@/app/components/StatsSection';
import SectionHeading from '@/app/components/SectionHeading';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function HomePage() {
  const [blogs, setBlogs] = useState<any[]>([]);
  const [gallery, setGallery] = useState<any[]>([]);

  useEffect(() => {
    fetch('/api/blogs').then(res => res.json()).then(data => {
      if(Array.isArray(data)) setBlogs(data.slice(0, 3));
    }).catch(console.error);

    fetch('/api/gallery').then(res => res.json()).then(data => {
      if(Array.isArray(data)) setGallery(data.slice(0, 8));
    }).catch(console.error);
  }, []);

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 overflow-hidden">
      <HeroSection />
      <StatsSection />
      
      {/* Focus Areas */}
      <section className="py-24 bg-white relative">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#0f4a5c]/5 rounded-bl-full -z-0"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div 
            initial="hidden" 
            whileInView="visible" 
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
          >
            <SectionHeading title="Our Focus Areas" subtitle="Areas where we strive to make an impact" />
          </motion.div>
          
          <motion.div 
            className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            {['Education & Literacy', 'Children & Health', 'Community Support'].map((area, index) => (
              <motion.div 
                key={index} 
                variants={fadeInUp}
                whileHover={{ y: -10 }}
                className="bg-white rounded-[2rem] p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(15,74,92,0.1)] transition-all duration-300 border border-gray-50 group relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#0f4a5c]/5 to-transparent rounded-bl-[100px] -z-0 group-hover:scale-110 transition-transform duration-500"></div>
                <div className="w-20 h-20 bg-gradient-to-br from-[#0f4a5c]/10 to-[#0f4a5c]/5 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300 relative z-10">
                  <div className="w-10 h-10 bg-gradient-to-br from-[#0f4a5c] to-[#1a667d] rounded-xl opacity-90 shadow-lg"></div>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4 relative z-10">{area}</h3>
                <p className="text-gray-600 leading-relaxed relative z-10">Empowering communities through dedicated initiatives and sustainable support programs in {area.toLowerCase()}.</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Latest Blog */}
      <section className="py-24 bg-gradient-to-b from-gray-50 to-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial="hidden" 
            whileInView="visible" 
            viewport={{ once: true }}
            variants={fadeInUp}
            className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6"
          >
            <div className="text-left">
              <SectionHeading title="Latest from our Blog" subtitle="Stories of impact and change" />
            </div>
            <Link href="/blogs" className="group flex items-center text-[#0f4a5c] font-semibold hover:text-[#b8860b] transition-colors mb-2 bg-white px-6 py-3 rounded-full shadow-sm border border-gray-100 hover:shadow-md">
              View All 
              <span className="ml-2 group-hover:translate-x-1 transition-transform">&rarr;</span>
            </Link>
          </motion.div>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            {blogs.length > 0 ? blogs.map((blog) => (
              <motion.div 
                key={blog.id} 
                variants={fadeInUp}
                className="bg-white rounded-[2rem] overflow-hidden shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300 group flex flex-col"
              >
                <div className="h-56 bg-gray-100 w-full relative overflow-hidden">
                  {blog.imageUrl ? (
                    <Image src={blog.imageUrl} alt={blog.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                  ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-[#0f4a5c]/20 to-[#0f4a5c]/10"></div>
                  )}
                </div>
                <div className="p-8 flex-1 flex flex-col">
                  <div className="text-xs font-bold text-[#b8860b] mb-3 uppercase tracking-wider">{new Date(blog.createdAt).toLocaleDateString()}</div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4 line-clamp-2">{blog.title}</h3>
                  <p className="text-gray-600 mb-6 line-clamp-3 flex-1">{blog.content}</p>
                  <Link href={`/blogs/${blog.id}`} className="text-[#0f4a5c] font-semibold hover:text-[#b8860b] transition-colors inline-flex items-center">
                    Read More <span className="ml-1">&rarr;</span>
                  </Link>
                </div>
              </motion.div>
            )) : [1, 2, 3].map((i) => (
              <motion.div 
                key={i} 
                variants={fadeInUp}
                className="bg-white rounded-[2rem] overflow-hidden shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300 group"
              >
                <div className="h-56 bg-gray-100 w-full relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-100 animate-pulse"></div>
                </div>
                <div className="p-8">
                  <div className="h-3 bg-[#b8860b]/20 rounded w-1/4 mb-5"></div>
                  <div className="h-6 bg-gray-200 rounded w-3/4 mb-3"></div>
                  <div className="h-6 bg-gray-200 rounded w-1/2 mb-5"></div>
                  <div className="h-4 bg-gray-100 rounded w-full mb-3"></div>
                  <div className="h-4 bg-gray-100 rounded w-2/3"></div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Gallery Highlights */}
      <section className="py-24 bg-white overflow-hidden relative">
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-96 h-96 bg-[#b8860b]/5 rounded-full blur-3xl -z-0"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <SectionHeading title="Gallery Highlights" subtitle="Moments that define our journey" />
          </motion.div>
          
          <motion.div 
            className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={staggerContainer}
          >
            {gallery.length > 0 ? gallery.map((img) => (
              <motion.div 
                key={img.id} 
                variants={fadeInUp}
                className="aspect-square bg-gray-50 rounded-2xl overflow-hidden relative group shadow-sm border border-gray-100"
              >
                 <Image src={img.imageUrl} alt={img.title || 'Gallery Image'} fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
                 <div className="absolute inset-0 bg-gradient-to-t from-[#0f4a5c]/90 via-[#0f4a5c]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 flex items-end p-4">
                    <p className="text-white font-medium text-sm">{img.title || 'Care Plus Foundation'}</p>
                 </div>
              </motion.div>
            )) : [1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <motion.div 
                key={i} 
                variants={fadeInUp}
                className="aspect-square bg-gray-50 rounded-2xl overflow-hidden relative group shadow-sm border border-gray-100"
              >
                 <div className="absolute inset-0 bg-gray-200 animate-pulse -z-0"></div>
              </motion.div>
            ))}
          </motion.div>
          
          <motion.div 
            className="mt-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
             <Link href="/gallery" className="inline-flex items-center px-8 py-4 bg-gray-50 border border-gray-200 text-[#0f4a5c] font-bold rounded-full hover:bg-[#0f4a5c] hover:text-white transition-all duration-300 shadow-sm hover:shadow-md">
               View Full Gallery
             </Link>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 bg-gradient-to-br from-[#0f4a5c] via-[#155d74] to-[#0a313d] relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03] bg-[url('/pattern.svg')]"></div>
        
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#b8860b] rounded-full mix-blend-multiply filter blur-[128px] opacity-20 animate-blob"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-white rounded-full mix-blend-overlay filter blur-[128px] opacity-10 animate-blob animation-delay-2000"></div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.h2 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: "easeOut" as const }}
            className="text-5xl md:text-7xl font-extrabold text-white mb-8 tracking-tight"
          >
            Together, We <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#b8860b] to-[#ffd700]">Create Change</span>
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-xl md:text-2xl text-white/80 mb-12 font-light max-w-2xl mx-auto leading-relaxed"
          >
            Your support can help us reach more lives and build stronger communities. Join our mission today.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            <Link href="/donate" className="inline-block px-12 py-5 bg-gradient-to-r from-[#b8860b] to-[#daa520] text-white font-bold rounded-full text-xl hover:shadow-[0_0_30px_rgba(184,134,11,0.5)] transition-all duration-300 transform hover:-translate-y-1">
              Donate Now
            </Link>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
