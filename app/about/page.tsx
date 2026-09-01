'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Mail, Award, Target, BookOpen, Users, Star, GraduationCap } from 'lucide-react';
import Image from 'next/image';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#fafafa] pb-20 overflow-hidden">
      
      {/* --- Premium Hero Section --- */}
      <section className="relative pt-32 pb-24 lg:pt-40 lg:pb-32 bg-[#05161e] text-white overflow-hidden perspective-1000">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
        <div className="absolute top-0 right-0 w-[40rem] h-[40rem] bg-[#b8860b] rounded-full filter blur-[150px] opacity-20 -translate-y-1/2 translate-x-1/3"></div>
        <div className="absolute bottom-0 left-0 w-[30rem] h-[30rem] bg-[#1a667d] rounded-full filter blur-[120px] opacity-30 translate-y-1/3 -translate-x-1/3"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.div initial="hidden" animate="visible" variants={fadeUp}>
            <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tight">
              About <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#e8c05c] to-[#b8860b]">Us</span>
            </h1>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto text-white/80 font-light leading-relaxed">
              Care Plus Foundation Trust is dedicated to empowering communities through care, support, and collective action.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 relative z-20 space-y-16">
        
        {/* --- NPO & Registration Cards --- */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {/* NPO Details */}
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 p-8 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all">
            <div className="flex items-center gap-4 mb-8 border-b border-gray-100 pb-6">
              <div className="w-12 h-12 bg-[#0f4a5c]/10 rounded-2xl flex items-center justify-center text-[#0f4a5c]">
                <Award size={24} strokeWidth={2} />
              </div>
              <h3 className="text-2xl font-bold text-[#0f4a5c]">NPO Details</h3>
            </div>
            <ul className="space-y-5">
              <li className="flex justify-between items-center"><span className="text-gray-500 font-medium">DARPAN ID</span><span className="font-bold text-gray-900 bg-gray-50 px-4 py-1.5 rounded-lg border border-gray-100">DL/2026/1190987</span></li>
              <li className="flex justify-between items-center"><span className="text-gray-500 font-medium">Registration Date</span><span className="font-bold text-gray-900">26-08-2026</span></li>
              <li className="flex justify-between items-center"><span className="text-gray-500 font-medium">Act</span><span className="font-bold text-gray-900 text-right">The Charitable and Religious Trust Act, 1920</span></li>
            </ul>
          </div>
          
          {/* Registration Details */}
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 p-8 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all">
            <div className="flex items-center gap-4 mb-8 border-b border-gray-100 pb-6">
              <div className="w-12 h-12 bg-[#b8860b]/10 rounded-2xl flex items-center justify-center text-[#b8860b]">
                <BookOpen size={24} strokeWidth={2} />
              </div>
              <h3 className="text-2xl font-bold text-[#0f4a5c]">Registration Info</h3>
            </div>
            <ul className="space-y-5">
              <li className="flex justify-between items-center"><span className="text-gray-500 font-medium">Registrar</span><span className="font-bold text-gray-900">Sub-Registrar, Trust</span></li>
              <li className="flex justify-between items-center"><span className="text-gray-500 font-medium">Registration No</span><span className="font-bold text-gray-900 bg-gray-50 px-4 py-1.5 rounded-lg border border-gray-100">2026/10/IV/1162</span></li>
              <li className="flex justify-between items-center"><span className="text-gray-500 font-medium">Location</span><span className="font-bold text-gray-900">NEW DELHI, Delhi</span></li>
              <li className="flex justify-between items-center"><span className="text-gray-500 font-medium">Date</span><span className="font-bold text-gray-900">28-07-2026</span></li>
            </ul>
          </div>
        </motion.div>

        {/* --- Board Members Section --- */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="pt-8"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#0f4a5c] mb-4">Our Board Members</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">The visionary leaders driving Care Plus Foundation towards a brighter, more equitable future.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-4xl mx-auto">
            {/* President */}
            <div className="group relative bg-white rounded-[2.5rem] shadow-sm hover:shadow-2xl transition-all duration-500 p-6 flex items-center gap-6 border border-gray-100 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-[#0f4a5c]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden shadow-lg border-4 border-white flex-shrink-0 z-10">
                <Image 
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&q=80&fit=crop" 
                  alt="Lata Kumari" 
                  fill 
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
              </div>
              <div className="relative z-10">
                <p className="text-sm font-bold text-[#b8860b] uppercase tracking-widest mb-1">President</p>
                <h3 className="text-2xl md:text-3xl font-black text-gray-900 mb-2">Lata Kumari</h3>
                <p className="text-gray-500 text-sm leading-relaxed">Leading the foundation with compassion, dedication, and a vision for universal education.</p>
              </div>
            </div>

            {/* Trustee */}
            <div className="group relative bg-white rounded-[2.5rem] shadow-sm hover:shadow-2xl transition-all duration-500 p-6 flex items-center gap-6 border border-gray-100 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-[#b8860b]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden shadow-lg border-4 border-white flex-shrink-0 z-10">
                <Image 
                  src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&q=80&fit=crop" 
                  alt="Mukesh" 
                  fill 
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
              </div>
              <div className="relative z-10">
                <p className="text-sm font-bold text-[#b8860b] uppercase tracking-widest mb-1">Trustee</p>
                <h3 className="text-2xl md:text-3xl font-black text-gray-900 mb-2">Mukesh</h3>
                <p className="text-gray-500 text-sm leading-relaxed">Ensuring operational excellence and fostering community relationships for lasting impact.</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* --- Sectors & Achievements --- */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="bg-white rounded-[3rem] shadow-sm border border-gray-100 p-8 md:p-14 overflow-hidden relative"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-gray-50 rounded-full -translate-y-1/2 translate-x-1/2"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 relative z-10">
            {/* Working Sectors */}
            <div>
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600">
                  <Target size={24} strokeWidth={2} />
                </div>
                <h4 className="text-2xl font-bold text-gray-900">Working Sectors</h4>
              </div>
              
              <div className="space-y-8">
                <div className="bg-gray-50 p-6 rounded-3xl border border-gray-100">
                  <h5 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4">Primary Focus</h5>
                  <div className="flex flex-wrap gap-3">
                    <span className="px-5 py-2.5 bg-white text-[#0f4a5c] rounded-xl text-sm font-bold shadow-sm border border-gray-100 flex items-center gap-2">
                      <GraduationCap size={16} /> Education & Literacy
                    </span>
                    <span className="px-5 py-2.5 bg-white text-[#0f4a5c] rounded-xl text-sm font-bold shadow-sm border border-gray-100 flex items-center gap-2">
                      <Star size={16} /> Food Processing
                    </span>
                  </div>
                </div>
                
                <div className="bg-gray-50 p-6 rounded-3xl border border-gray-100">
                  <h5 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4">Secondary Focus</h5>
                  <div className="flex flex-wrap gap-3">
                    <span className="px-5 py-2.5 bg-white text-gray-600 rounded-xl text-sm font-semibold shadow-sm border border-gray-100">Children</span>
                    <span className="px-5 py-2.5 bg-white text-gray-600 rounded-xl text-sm font-semibold shadow-sm border border-gray-100">Health & Family Welfare</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Key Initiatives */}
            <div>
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600">
                  <Star size={24} strokeWidth={2} />
                </div>
                <h4 className="text-2xl font-bold text-gray-900">Key Initiatives</h4>
              </div>
              
              <ul className="space-y-4">
                {[
                  "Run Computer Training Centers for digital literacy",
                  "Host regular Music and Dance Classes for youth",
                  "Operate comprehensive Education Coaching Centres",
                  "Provide Direct Help And Assistance to families in need",
                  "Implement custom Welfare Schemes effectively"
                ].map((item, i) => (
                  <motion.li 
                    key={i} 
                    whileHover={{ x: 5 }}
                    className="flex items-center p-4 bg-gray-50 rounded-2xl border border-gray-100 hover:border-[#b8860b]/30 hover:bg-[#b8860b]/5 transition-colors group cursor-default"
                  >
                    <div className="w-8 h-8 rounded-full bg-white shadow-sm flex items-center justify-center mr-4 text-[#b8860b] group-hover:scale-110 transition-transform">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                    </div>
                    <span className="text-gray-700 font-medium">{item}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>

        {/* --- Contact Details (Full Width Card) --- */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="bg-gradient-to-br from-[#0f4a5c] to-[#0a313d] rounded-[3rem] shadow-2xl p-8 md:p-16 text-white relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#b8860b] rounded-full filter blur-[100px] opacity-20 translate-x-1/3 -translate-y-1/3 pointer-events-none"></div>
          
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="md:w-1/3">
              <h3 className="text-3xl md:text-4xl font-black mb-4">Get in Touch</h3>
              <p className="text-white/70 text-lg">We welcome your questions, feedback, and support. Reach out to our registered office.</p>
            </div>
            
            <div className="md:w-2/3 flex flex-col sm:flex-row gap-8">
              <div className="flex-1 bg-white/10 backdrop-blur-md p-6 rounded-3xl border border-white/10 hover:bg-white/20 transition-colors">
                <MapPin className="text-[#b8860b] mb-4" size={32} />
                <p className="text-white/60 text-sm mb-2 uppercase tracking-widest font-bold">Registered Address</p>
                <p className="font-medium text-lg leading-relaxed">B-6 FIRST FLOOR KALKAJI<br/>NEW DELHI-110019<br/>Delhi Cantonment</p>
              </div>
              <div className="flex-1 bg-white/10 backdrop-blur-md p-6 rounded-3xl border border-white/10 hover:bg-white/20 transition-colors flex flex-col justify-center">
                <Mail className="text-[#b8860b] mb-4" size={32} />
                <p className="text-white/60 text-sm mb-2 uppercase tracking-widest font-bold">Email Address</p>
                <a href="mailto:careplusfoundation19@gmail.com" className="font-bold text-xl hover:text-[#b8860b] transition-colors break-all">
                  careplusfoundation19<br/>@gmail.com
                </a>
              </div>
            </div>
          </div>
        </motion.div>

      </div>
    </main>
  );
}
