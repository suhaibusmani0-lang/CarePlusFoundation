'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  if (pathname?.startsWith('/admin')) {
    return null;
  }

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between min-h-[6rem] items-center py-2">
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" aria-label="Home">
              <motion.div
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, type: 'spring', bounce: 0.4 }}
              >
                <Image src="/logo-new.png" alt="Care Plus Foundation Logo" width={600} height={400} className="h-20 sm:h-24 w-auto object-contain py-2" priority />
              </motion.div>
            </Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-700 hover:text-[#0f4a5c] font-medium transition-colors">Home</Link>
            <Link href="/about" className="text-gray-700 hover:text-[#0f4a5c] font-medium transition-colors">About Us</Link>
            <Link href="/blogs" className="text-gray-700 hover:text-[#0f4a5c] font-medium transition-colors">Blogs</Link>
            <Link href="/gallery" className="text-gray-700 hover:text-[#0f4a5c] font-medium transition-colors">Gallery</Link>
            <Link href="/contact" className="text-gray-700 hover:text-[#0f4a5c] font-medium transition-colors">Contact Us</Link>
            <Link href="/donate">
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-[#b8860b] to-[#daa520] text-white px-6 py-2 rounded-full font-semibold shadow-md hover:shadow-lg transition-all"
              >
                Donate Now
              </motion.button>
            </Link>
          </div>

          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} aria-label={isOpen ? "Close menu" : "Open menu"} className="text-gray-700 hover:text-[#0f4a5c]">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-white px-2 pt-2 pb-3 space-y-1 sm:px-3 shadow-lg absolute w-full left-0 border-b border-gray-100">
          <Link href="/" onClick={() => setIsOpen(false)} className="block px-3 py-2 text-gray-700 hover:bg-gray-50 hover:text-[#0f4a5c] rounded-md font-medium">Home</Link>
          <Link href="/about" onClick={() => setIsOpen(false)} className="block px-3 py-2 text-gray-700 hover:bg-gray-50 hover:text-[#0f4a5c] rounded-md font-medium">About Us</Link>
          <Link href="/blogs" onClick={() => setIsOpen(false)} className="block px-3 py-2 text-gray-700 hover:bg-gray-50 hover:text-[#0f4a5c] rounded-md font-medium">Blogs</Link>
          <Link href="/gallery" onClick={() => setIsOpen(false)} className="block px-3 py-2 text-gray-700 hover:bg-gray-50 hover:text-[#0f4a5c] rounded-md font-medium">Gallery</Link>
          <Link href="/contact" onClick={() => setIsOpen(false)} className="block px-3 py-2 text-gray-700 hover:bg-gray-50 hover:text-[#0f4a5c] rounded-md font-medium">Contact Us</Link>
          <Link href="/donate" onClick={() => setIsOpen(false)} className="block px-3 py-2">
            <button className="w-full bg-gradient-to-r from-[#b8860b] to-[#daa520] text-white px-6 py-2 rounded-full font-semibold">
              Donate Now
            </button>
          </Link>
        </div>
      )}
    </nav>
  );
}
