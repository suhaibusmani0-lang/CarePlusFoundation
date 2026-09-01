'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { HeartHandshake, Users, GraduationCap, Globe2, ArrowRight, Play } from 'lucide-react';

const pillars = [
  { title: 'Care', icon: HeartHandshake, desc: 'Nurturing lives', color: 'from-pink-500/80 to-rose-600/80' },
  { title: 'Support', icon: Users, desc: 'Standing together', color: 'from-blue-500/80 to-cyan-600/80' },
  { title: 'Empower', icon: GraduationCap, desc: 'Building futures', color: 'from-amber-500/80 to-yellow-600/80' },
  { title: 'Together', icon: Globe2, desc: 'Global community', color: 'from-emerald-500/80 to-teal-600/80' }
];

export default function HeroSection() {
  return (
    <div className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-[#05161e]">
      
      {/* --- Background Video --- */}
      <div className="absolute inset-0 w-full h-full z-0">
        <video 
          autoPlay 
          loop 
          muted 
          playsInline 
          className="object-cover w-full h-full opacity-60"
        >
          <source src="https://assets.mixkit.co/videos/preview/mixkit-hands-of-a-group-of-people-joined-in-a-circle-45699-large.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        {/* Dark Gradient Overlays for Readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#05161e]/90 via-[#05161e]/50 to-[#0f4a5c]/90"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#05161e_100%)] opacity-80"></div>
      </div>

      {/* --- Main Content --- */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20 flex flex-col items-center text-center">
        
        {/* Animated Badge */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-8"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white/90 text-sm font-semibold tracking-widest uppercase shadow-xl">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
            Together, We Create Change
          </span>
        </motion.div>

        {/* Logo */}
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1, type: "spring", bounce: 0.5, delay: 0.2 }}
          className="mb-8 relative"
        >
          <div className="absolute inset-0 bg-white/20 blur-[60px] rounded-full"></div>
          <Image 
            src="/logo-new.png" 
            alt="Care Plus Foundation" 
            width={800} 
            height={400} 
            className="w-[180px] md:w-[240px] h-auto object-contain drop-shadow-[0_20px_30px_rgba(0,0,0,0.8)] relative z-10"
            priority
          />
        </motion.div>

        {/* Headline */}
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter text-white mb-6 drop-shadow-2xl"
        >
          Care Plus <br className="md:hidden" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#e8c05c] via-[#ffd700] to-[#b8860b]">
            Foundation
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="text-lg md:text-2xl text-white/80 max-w-3xl mx-auto font-light leading-relaxed mb-12 drop-shadow-md"
        >
          Empowering marginalized communities, bringing smiles to children, and fostering a world where everyone has the opportunity to thrive.
        </motion.p>

        {/* Call to Action Buttons */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-col sm:flex-row justify-center items-center gap-6 mb-24 w-full sm:w-auto"
        >
          <Link href="/donate" className="w-full sm:w-auto">
            <button className="group relative w-full sm:w-auto px-10 py-4 bg-gradient-to-r from-[#b8860b] to-[#daa520] text-white rounded-full font-bold text-lg overflow-hidden shadow-[0_0_40px_rgba(184,134,11,0.4)] hover:shadow-[0_0_60px_rgba(184,134,11,0.6)] transition-all duration-300 transform hover:-translate-y-1">
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out"></div>
              <span className="relative flex items-center justify-center gap-2">
                Donate Now
                <HeartHandshake size={20} className="group-hover:scale-110 transition-transform" />
              </span>
            </button>
          </Link>
          
          <Link href="/about" className="w-full sm:w-auto">
            <button className="group w-full sm:w-auto px-10 py-4 bg-white/5 hover:bg-white/10 backdrop-blur-md border border-white/20 hover:border-white/40 text-white rounded-full font-bold text-lg transition-all duration-300 flex items-center justify-center gap-2">
              <Play size={18} className="text-[#b8860b] group-hover:text-[#ffd700] transition-colors" fill="currentColor" />
              Watch Our Story
            </button>
          </Link>
        </motion.div>
      </div>

      {/* --- Glassmorphism Pillars (Overlapping bottom edge) --- */}
      <div className="relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((pillar, index) => {
            const Icon = pillar.icon;
            return (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1 + index * 0.15, type: "spring" }}
                whileHover={{ y: -10 }}
                className="group relative bg-white/10 backdrop-blur-2xl border border-white/20 p-8 rounded-3xl overflow-hidden shadow-2xl cursor-pointer"
              >
                {/* Hover Gradient Background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${pillar.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10`}></div>
                
                <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center mb-6 text-white group-hover:scale-110 group-hover:bg-white/20 transition-all duration-300 border border-white/10 shadow-inner">
                  <Icon size={28} strokeWidth={2} />
                </div>
                
                <h3 className="text-xl font-bold text-white mb-2">{pillar.title}</h3>
                <p className="text-white/70 text-sm mb-6">{pillar.desc}</p>
                
                <div className="flex items-center text-white/50 text-sm font-semibold group-hover:text-white transition-colors">
                  Explore <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

    </div>
  );
}
