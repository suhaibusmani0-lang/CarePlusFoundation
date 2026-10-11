'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

export default function HeroSection() {
  return (
    <section className="relative w-full bg-white overflow-hidden">
      <Link 
        href="/scholarship" 
        className="block relative w-full group cursor-pointer focus:outline-none" 
        aria-label="Buniyad Scholarship Exam 2026-2027"
      >
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="w-full relative"
        >
          <Image
            src="/buniyad-hero-banner.jpg"
            alt="Buniyad Scholarship Exam 2026 - 2027 | Care Plus Foundation Trust"
            width={1024}
            height={576}
            priority
            sizes="100vw"
            className="w-full h-auto block select-none"
          />
        </motion.div>
      </Link>
    </section>
  );
}
