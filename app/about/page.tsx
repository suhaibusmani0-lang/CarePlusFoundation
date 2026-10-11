'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { 
  MapPin, 
  Mail, 
  Phone, 
  Award, 
  Target, 
  BookOpen, 
  Users, 
  Star, 
  GraduationCap, 
  Compass, 
  Heart, 
  ShieldCheck, 
  Eye, 
  Sparkles,
  CheckCircle2,
  Activity,
  ArrowRight
} from 'lucide-react';
import Link from 'next/link';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const keyInitiatives = [
  {
    title: "Education & Scholarships",
    desc: "Encouraging and empowering talented students through the Buniyad Scholarship Exam.",
    icon: GraduationCap,
    tag: "Flagship",
    color: "from-amber-500 to-yellow-600"
  },
  {
    title: "Health Awareness",
    desc: "Promoting preventive healthcare, health camps, and community well-being.",
    icon: Activity,
    tag: "Healthcare",
    color: "from-rose-500 to-red-600"
  },
  {
    title: "Career Guidance",
    desc: "Mentoring and guiding students to explore their true interests and future career opportunities.",
    icon: Compass,
    tag: "Mentorship",
    color: "from-blue-500 to-indigo-600"
  },
  {
    title: "Child & Women Welfare",
    desc: "Supporting social awareness, safety, rights, and holistic empowerment of children & women.",
    icon: Heart,
    tag: "Empowerment",
    color: "from-emerald-500 to-teal-600"
  },
  {
    title: "Social Awareness",
    desc: "Driving campaigns on drug-abuse prevention, road safety, and responsible citizenship.",
    icon: ShieldCheck,
    tag: "Community",
    color: "from-purple-500 to-violet-600"
  }
];

const valuesList = [
  { name: "Integrity", desc: "Honesty and strong moral principles in every initiative." },
  { name: "Compassion", desc: "Deep empathy and care for the underprivileged & marginalized." },
  { name: "Transparency", desc: "Openness and accountability in every action & donation." },
  { name: "Equal Opportunity", desc: "Believing every individual deserves an equal chance to thrive." },
  { name: "Community Service", desc: "Selfless dedication to collective growth and social upliftment." }
];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#fafafa] pb-24 overflow-hidden">
      
      {/* --- Hero Section --- */}
      <section className="relative pt-32 pb-24 lg:pt-40 lg:pb-32 bg-[#05161e] text-white overflow-hidden perspective-1000">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
        <div className="absolute top-0 right-0 w-[40rem] h-[40rem] bg-[#b8860b] rounded-full filter blur-[150px] opacity-20 -translate-y-1/2 translate-x-1/3"></div>
        <div className="absolute bottom-0 left-0 w-[30rem] h-[30rem] bg-[#1a667d] rounded-full filter blur-[120px] opacity-30 translate-y-1/3 -translate-x-1/3"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.div initial="hidden" animate="visible" variants={fadeUp}>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-[#e8c05c] text-xs md:text-sm font-semibold tracking-wider uppercase mb-6 shadow-sm">
              <Sparkles size={16} /> Strong Foundations, Brighter Futures
            </span>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black mb-6 tracking-tight">
              Care Plus Foundation <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#e8c05c] via-[#ffd700] to-[#b8860b]">Trust</span>
            </h1>
            <p className="text-lg md:text-2xl max-w-3xl mx-auto text-white/85 font-light leading-relaxed">
              Dedicated to promoting education, health awareness, and social welfare. We empower students, support families, and create opportunities through scholarships, guidance, and community development.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-14 relative z-20 space-y-16">
        
        {/* --- Mission & Vision Cards --- */}
        <motion.div 
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {/* Mission */}
          <div className="relative group bg-white/95 backdrop-blur-xl rounded-[2.5rem] shadow-[0_10px_35px_rgb(0,0,0,0.05)] border border-gray-100 p-8 md:p-10 hover:shadow-2xl transition-all duration-300 overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#0f4a5c]/5 rounded-bl-[100px] -z-0"></div>
            <div className="flex items-center gap-4 mb-6 relative z-10">
              <div className="w-14 h-14 bg-gradient-to-br from-[#0f4a5c] to-[#156075] rounded-2xl flex items-center justify-center text-white shadow-lg shadow-[#0f4a5c]/20">
                <Target size={28} strokeWidth={2.2} />
              </div>
              <div>
                <span className="text-xs font-bold text-[#b8860b] uppercase tracking-widest">Purpose & Commitment</span>
                <h2 className="text-2xl md:text-3xl font-extrabold text-[#0f4a5c]">Our Mission</h2>
              </div>
            </div>
            <p className="text-gray-700 text-lg leading-relaxed relative z-10 font-normal">
              To promote education, health awareness and equal opportunities for a better society.
            </p>
          </div>

          {/* Vision */}
          <div className="relative group bg-white/95 backdrop-blur-xl rounded-[2.5rem] shadow-[0_10px_35px_rgb(0,0,0,0.05)] border border-gray-100 p-8 md:p-10 hover:shadow-2xl transition-all duration-300 overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#b8860b]/5 rounded-bl-[100px] -z-0"></div>
            <div className="flex items-center gap-4 mb-6 relative z-10">
              <div className="w-14 h-14 bg-gradient-to-br from-[#b8860b] to-[#daa520] rounded-2xl flex items-center justify-center text-white shadow-lg shadow-[#b8860b]/20">
                <Eye size={28} strokeWidth={2.2} />
              </div>
              <div>
                <span className="text-xs font-bold text-[#b8860b] uppercase tracking-widest">Future Roadmap</span>
                <h2 className="text-2xl md:text-3xl font-extrabold text-[#0f4a5c]">Our Vision</h2>
              </div>
            </div>
            <p className="text-gray-700 text-lg leading-relaxed relative z-10 font-normal">
              To build an educated, healthy and empowered society where everyone gets an opportunity to grow.
            </p>
          </div>
        </motion.div>

        {/* --- Key Initiatives Section --- */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="space-y-8"
        >
          <div className="text-center max-w-3xl mx-auto">
            <span className="text-xs md:text-sm font-bold text-[#b8860b] uppercase tracking-widest">What We Do</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#0f4a5c] mt-2 mb-4">Our Key Initiatives</h2>
            <p className="text-gray-600 text-base md:text-lg">
              Structured community and educational interventions designed to create measurable, positive change on the ground.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {keyInitiatives.map((item, idx) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={idx}
                  whileHover={{ y: -6 }}
                  className="bg-white rounded-3xl p-7 border border-gray-100 shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-5">
                      <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${item.color} text-white flex items-center justify-center shadow-md`}>
                        <Icon size={24} />
                      </div>
                      <span className="text-xs font-semibold px-3 py-1 rounded-full bg-gray-100 text-gray-700">
                        {item.tag}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
                  </div>

                  {item.title.includes("Scholarship") && (
                    <div className="mt-5 pt-4 border-t border-gray-100">
                      <Link 
                        href="/scholarship" 
                        className="inline-flex items-center text-sm font-bold text-[#0f4a5c] hover:text-[#b8860b] transition-colors gap-1.5"
                      >
                        Explore Buniyad Scholarship <ArrowRight size={15} />
                      </Link>
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* --- Our Core Values --- */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="bg-gradient-to-br from-[#0a232b] to-[#0f4a5c] rounded-[3rem] p-8 md:p-14 text-white shadow-xl relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#b8860b] rounded-full filter blur-[120px] opacity-20 pointer-events-none"></div>
          
          <div className="relative z-10 max-w-3xl mb-10">
            <span className="text-xs md:text-sm font-bold text-[#e8c05c] uppercase tracking-widest">Guiding Principles</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mt-2 mb-4">Our Values</h2>
            <p className="text-white/80 text-base md:text-lg">
              Our culture and community actions are rooted in deep ethical standards, empathy, and transparent responsibility.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 relative z-10">
            {valuesList.map((val, idx) => (
              <div 
                key={idx}
                className="bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl p-6 hover:bg-white/15 transition-all"
              >
                <div className="flex items-center gap-3 mb-2">
                  <CheckCircle2 size={20} className="text-[#ffd700] flex-shrink-0" />
                  <h3 className="text-lg font-bold text-white">{val.name}</h3>
                </div>
                <p className="text-white/70 text-sm leading-relaxed">{val.desc}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* --- Trust & Government Registration Details --- */}
        <motion.div 
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {/* NPO Details */}
          <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 p-8 hover:shadow-lg transition-all">
            <div className="flex items-center gap-4 mb-6 border-b border-gray-100 pb-5">
              <div className="w-12 h-12 bg-[#0f4a5c]/10 rounded-2xl flex items-center justify-center text-[#0f4a5c]">
                <Award size={24} strokeWidth={2} />
              </div>
              <h3 className="text-2xl font-bold text-[#0f4a5c]">NPO Details</h3>
            </div>
            <ul className="space-y-4">
              <li className="flex justify-between items-center"><span className="text-gray-500 font-medium">DARPAN ID</span><span className="font-bold text-gray-900 bg-gray-50 px-3 py-1 rounded-lg border border-gray-100">DL/2026/1190987</span></li>
              <li className="flex justify-between items-center"><span className="text-gray-500 font-medium">Registration Date</span><span className="font-bold text-gray-900">26-08-2026</span></li>
              <li className="flex justify-between items-center"><span className="text-gray-500 font-medium">Act</span><span className="font-bold text-gray-900 text-right text-sm sm:text-base">The Charitable and Religious Trust Act, 1920</span></li>
            </ul>
          </div>
          
          {/* Registration Details */}
          <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 p-8 hover:shadow-lg transition-all">
            <div className="flex items-center gap-4 mb-6 border-b border-gray-100 pb-5">
              <div className="w-12 h-12 bg-[#b8860b]/10 rounded-2xl flex items-center justify-center text-[#b8860b]">
                <BookOpen size={24} strokeWidth={2} />
              </div>
              <h3 className="text-2xl font-bold text-[#0f4a5c]">Registration Info</h3>
            </div>
            <ul className="space-y-4">
              <li className="flex justify-between items-center"><span className="text-gray-500 font-medium">Registrar</span><span className="font-bold text-gray-900">Sub-Registrar, Trust</span></li>
              <li className="flex justify-between items-center"><span className="text-gray-500 font-medium">Registration No</span><span className="font-bold text-gray-900 bg-gray-50 px-3 py-1 rounded-lg border border-gray-100">2026/10/IV/1162</span></li>
              <li className="flex justify-between items-center"><span className="text-gray-500 font-medium">Location</span><span className="font-bold text-gray-900">NEW DELHI, Delhi</span></li>
              <li className="flex justify-between items-center"><span className="text-gray-500 font-medium">Date</span><span className="font-bold text-gray-900">28-07-2026</span></li>
            </ul>
          </div>
        </motion.div>

        {/* --- Board Members Section --- */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="pt-4"
        >
          <div className="text-center mb-10">
            <span className="text-xs md:text-sm font-bold text-[#b8860b] uppercase tracking-widest">Leadership</span>
            <h2 className="text-3xl md:text-4xl font-bold text-[#0f4a5c] mt-2 mb-3">Our Board Members</h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-sm md:text-base">
              The dedicated trustees driving Care Plus Foundation towards a brighter and more empowered tomorrow.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* President */}
            <div className="group relative bg-white rounded-[2.5rem] shadow-sm hover:shadow-xl transition-all duration-300 p-6 flex items-center gap-6 border border-gray-100 overflow-hidden">
              <div className="relative w-28 h-28 md:w-32 md:h-32 rounded-full overflow-hidden shadow-inner border-4 border-gray-50 flex-shrink-0 bg-gray-100 flex items-center justify-center text-gray-400">
                <svg className="w-14 h-14 md:w-16 md:h-16" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                </svg>
              </div>
              <div>
                <p className="text-xs font-bold text-[#b8860b] uppercase tracking-widest mb-1">President</p>
                <h3 className="text-2xl font-black text-gray-900 mb-1">L.K</h3>
                <p className="text-gray-500 text-sm leading-relaxed">Leading the foundation with compassion and dedicated support for children and family education.</p>
              </div>
            </div>

            {/* Trustee */}
            <div className="group relative bg-white rounded-[2.5rem] shadow-sm hover:shadow-xl transition-all duration-300 p-6 flex items-center gap-6 border border-gray-100 overflow-hidden">
              <div className="relative w-28 h-28 md:w-32 md:h-32 rounded-full overflow-hidden shadow-inner border-4 border-gray-50 flex-shrink-0 bg-gray-100 flex items-center justify-center text-gray-400">
                <svg className="w-14 h-14 md:w-16 md:h-16" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                </svg>
              </div>
              <div>
                <p className="text-xs font-bold text-[#b8860b] uppercase tracking-widest mb-1">Trustee</p>
                <h3 className="text-2xl font-black text-gray-900 mb-1">M.K</h3>
                <p className="text-gray-500 text-sm leading-relaxed">Overseeing welfare projects, operational transparency, and expanding reach to remote communities.</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* --- Sectors & Community Programs --- */}
        <motion.div 
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="bg-white rounded-[3rem] shadow-sm border border-gray-100 p-8 md:p-12 overflow-hidden relative"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 relative z-10">
            {/* Working Sectors */}
            <div>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600">
                  <Target size={24} strokeWidth={2} />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Working Sectors</h3>
              </div>
              
              <div className="space-y-6">
                <div className="bg-gray-50 p-6 rounded-3xl border border-gray-100">
                  <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Primary Focus</h4>
                  <div className="flex flex-wrap gap-3">
                    <span className="px-4 py-2 bg-white text-[#0f4a5c] rounded-xl text-sm font-bold shadow-sm border border-gray-100 flex items-center gap-2">
                      <GraduationCap size={16} /> Education & Literacy
                    </span>
                    <span className="px-4 py-2 bg-white text-[#0f4a5c] rounded-xl text-sm font-bold shadow-sm border border-gray-100 flex items-center gap-2">
                      <Star size={16} /> Food Processing
                    </span>
                  </div>
                </div>
                
                <div className="bg-gray-50 p-6 rounded-3xl border border-gray-100">
                  <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Secondary Focus</h4>
                  <div className="flex flex-wrap gap-3">
                    <span className="px-4 py-2 bg-white text-gray-700 rounded-xl text-sm font-semibold shadow-sm border border-gray-100">Children</span>
                    <span className="px-4 py-2 bg-white text-gray-700 rounded-xl text-sm font-semibold shadow-sm border border-gray-100">Health & Family Welfare</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Practical Programs */}
            <div>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600">
                  <Star size={24} strokeWidth={2} />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Community Programs</h3>
              </div>
              
              <ul className="space-y-3.5">
                {[
                  "Computer Training Centers for digital literacy",
                  "Music and Dance Classes for creative development",
                  "Education Coaching Centres for board exams",
                  "Direct Assistance to families in acute distress",
                  "Effective Implementation of social welfare schemes"
                ].map((item, i) => (
                  <li 
                    key={i} 
                    className="flex items-center p-3.5 bg-gray-50 rounded-2xl border border-gray-100 hover:border-[#b8860b]/30 hover:bg-[#b8860b]/5 transition-colors group cursor-default"
                  >
                    <div className="w-7 h-7 rounded-full bg-white shadow-sm flex items-center justify-center mr-3 text-[#b8860b] flex-shrink-0">
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                    </div>
                    <span className="text-gray-700 font-medium text-sm md:text-base">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>

        {/* --- Join Us Call to Action --- */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center bg-[#b8860b]/10 border border-[#b8860b]/30 rounded-[2.5rem] p-8 md:p-12 relative overflow-hidden"
        >
          <div className="max-w-2xl mx-auto">
            <span className="text-xs font-bold text-[#b8860b] uppercase tracking-widest">Be Part of the Impact</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#0f4a5c] mt-2 mb-4">Join Us</h2>
            <p className="text-gray-700 text-base md:text-lg mb-8 leading-relaxed">
              Together, let us build stronger foundations and create brighter futures for the next generation. Whether through volunteering, participating, or donating, your support makes all the difference.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/donate"
                className="px-8 py-3.5 bg-gradient-to-r from-[#b8860b] to-[#daa520] text-white rounded-full font-bold shadow-lg shadow-[#b8860b]/25 hover:shadow-xl hover:scale-105 transition-all text-sm md:text-base"
              >
                Donate & Support
              </Link>
              <Link
                href="/scholarship"
                className="px-8 py-3.5 bg-white text-[#0f4a5c] border border-gray-200 rounded-full font-bold hover:bg-gray-50 hover:border-gray-300 transition-all text-sm md:text-base"
              >
                Buniyad Scholarship
              </Link>
            </div>
          </div>
        </motion.div>

        {/* --- Contact Details (Full Width Card) --- */}
        <motion.div 
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="bg-gradient-to-br from-[#0f4a5c] to-[#0a313d] rounded-[3rem] shadow-2xl p-8 md:p-14 text-white relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#b8860b] rounded-full filter blur-[100px] opacity-20 translate-x-1/3 -translate-y-1/3 pointer-events-none"></div>
          
          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-10">
            <div className="lg:w-1/3 text-center lg:text-left">
              <span className="text-xs font-bold text-[#e8c05c] uppercase tracking-widest">Connect With Us</span>
              <h2 className="text-3xl md:text-4xl font-black mt-1 mb-3">Care Plus Foundation Trust</h2>
              <p className="text-white/75 text-base">We welcome your queries, partnerships, and active support. Feel free to contact us anytime.</p>
            </div>
            
            <div className="lg:w-2/3 grid grid-cols-1 sm:grid-cols-3 gap-5 w-full">
              {/* Address */}
              <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/10 hover:bg-white/15 transition-colors">
                <MapPin className="text-[#b8860b] mb-3" size={28} />
                <p className="text-white/60 text-xs uppercase tracking-widest font-bold mb-1">Office Address</p>
                <p className="font-medium text-sm sm:text-base leading-relaxed text-white">
                  B-6, Kalkaji,<br/>
                  New Delhi – 110019
                </p>
              </div>

              {/* Email */}
              <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/10 hover:bg-white/15 transition-colors flex flex-col justify-between">
                <div>
                  <Mail className="text-[#b8860b] mb-3" size={28} />
                  <p className="text-white/60 text-xs uppercase tracking-widest font-bold mb-1">Email ID</p>
                  <a href="mailto:careplusfoundation19@gmail.com" className="font-bold text-sm sm:text-base hover:text-[#b8860b] transition-colors break-words text-white">
                    careplusfoundation19@gmail.com
                  </a>
                </div>
              </div>

              {/* Phone */}
              <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/10 hover:bg-white/15 transition-colors flex flex-col justify-between">
                <div>
                  <Phone className="text-[#b8860b] mb-3" size={28} />
                  <p className="text-white/60 text-xs uppercase tracking-widest font-bold mb-1">Phone Number</p>
                  <a href="tel:+919315152763" className="font-bold text-lg hover:text-[#b8860b] transition-colors text-white block">
                    +91 9315152763
                  </a>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

      </div>
    </main>
  );
}
