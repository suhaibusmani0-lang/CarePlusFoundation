'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Facebook, Twitter, Instagram, Linkedin, Mail, MapPin } from 'lucide-react';
import { usePathname } from 'next/navigation';

export default function Footer() {
  const pathname = usePathname();

  if (pathname?.startsWith('/admin')) {
    return null;
  }

  return (
    <footer className="bg-gradient-to-br from-[#0a313d] via-[#0f4a5c] to-[#0a313d] text-white pt-20 pb-8 border-t border-[#b8860b]/20 relative overflow-hidden">
      {/* Decorative gradient overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-white/5 via-transparent to-transparent opacity-50" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* About Column */}
          <div className="space-y-6">
            <div className="bg-white/95 p-4 rounded-2xl inline-block shadow-lg backdrop-blur-sm border border-white/20">
              <Image src="/careplus-logo.jpg" alt="Care Plus Foundation Logo" width={250} height={80} className="w-[180px] h-auto" />
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              Working towards education, health, and empowerment. Together, We Create Change.
            </p>
            <div className="pt-2">
              <p className="text-[#b8860b] text-xs font-bold tracking-wider uppercase mb-1">DARPAN ID</p>
              <p className="text-white font-mono text-sm bg-black/20 py-1.5 px-3 rounded-lg inline-block border border-white/10">DL/2026/1190987</p>
            </div>
          </div>

          {/* Quick Links Column */}
          <div>
            <h3 className="text-lg font-bold mb-6 text-white flex items-center">
              <span className="w-8 h-[2px] bg-[#b8860b] mr-3 rounded-full"></span>
              Quick Links
            </h3>
            <ul className="space-y-3">
              {[
                { name: 'Home', href: '/' },
                { name: 'About Us', href: '/about' },
                { name: 'Blogs', href: '/blogs' },
                { name: 'Gallery', href: '/gallery' },
                { name: 'Donate Now', href: '/donate' }
              ].map((item) => (
                <li key={item.name}>
                  <Link 
                    href={item.href} 
                    className="text-gray-300 hover:text-[#b8860b] transition-colors flex items-center group"
                  >
                    <span className="opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300 mr-2 text-[#b8860b]">›</span>
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Column */}
          <div>
            <h3 className="text-lg font-bold mb-6 text-white flex items-center">
              <span className="w-8 h-[2px] bg-[#b8860b] mr-3 rounded-full"></span>
              Contact Us
            </h3>
            <ul className="space-y-5 text-gray-300 text-sm">
              <li className="flex items-start group">
                <div className="bg-white/10 p-2 rounded-lg mr-4 group-hover:bg-[#b8860b]/20 transition-colors">
                  <MapPin size={18} className="text-[#b8860b]" />
                </div>
                <span className="pt-1 leading-relaxed">B-6 FIRST FLOOR KALKAJI<br />NEW DELHI-110019</span>
              </li>
              <li className="flex items-center group">
                <div className="bg-white/10 p-2 rounded-lg mr-4 group-hover:bg-[#b8860b]/20 transition-colors">
                  <Mail size={18} className="text-[#b8860b]" />
                </div>
                <a href="mailto:careplusfoundation19@gmail.com" className="hover:text-white transition-colors break-all">
                  careplusfoundation19@gmail.com
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter Column */}
          <div>
            <h3 className="text-lg font-bold mb-6 text-white flex items-center">
              <span className="w-8 h-[2px] bg-[#b8860b] mr-3 rounded-full"></span>
              Stay Updated
            </h3>
            <p className="text-gray-300 text-sm mb-4">Subscribe to our newsletter for the latest updates and impact stories.</p>
            <form className="mb-6">
              <div className="relative">
                <input 
                  type="email" 
                  placeholder="Enter your email" 
                  className="w-full bg-black/20 border border-white/10 rounded-full py-3 px-5 text-sm text-white placeholder-gray-400 focus:outline-none focus:border-[#b8860b] focus:ring-1 focus:ring-[#b8860b] transition-all"
                />
                <button 
                  type="button"
                  className="absolute right-1 top-1 bottom-1 bg-gradient-to-r from-[#b8860b] to-[#daa520] hover:from-[#daa520] hover:to-[#b8860b] text-white px-4 rounded-full text-sm font-semibold transition-all shadow-md"
                >
                  Subscribe
                </button>
              </div>
            </form>
            
            <div className="flex space-x-4">
              {[
                { Icon: Facebook, label: 'Facebook' },
                { Icon: Twitter, label: 'Twitter' },
                { Icon: Instagram, label: 'Instagram' },
                { Icon: Linkedin, label: 'LinkedIn' }
              ].map(({ Icon, label }, i) => (
                <a key={i} href="#" aria-label={label} className="bg-white/10 p-2.5 rounded-full hover:bg-[#b8860b] hover:scale-110 transition-all duration-300 text-gray-300 hover:text-white">
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 mt-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} Care Plus Foundation Trust. All rights reserved.
          </p>
          <p className="text-gray-400 text-sm text-center">
            Developed by <a href="http://www.zarnetic.com" target="_blank" rel="noopener noreferrer" className="text-[#b8860b] hover:text-[#daa520] font-bold transition-colors underline decoration-1 underline-offset-2">Zarnetic</a>
          </p>
          <div className="flex space-x-6 text-sm text-gray-400">
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
            <Link href="/admin/login" className="hover:text-white transition-colors opacity-50 hover:opacity-100 flex items-center">
              <span className="w-1.5 h-1.5 bg-[#b8860b] rounded-full mr-2"></span>
              Admin
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
