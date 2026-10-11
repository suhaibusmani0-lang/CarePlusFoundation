'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

export default function HeroSection() {
  return (
    <section className="relative w-full bg-[#05161e] overflow-hidden">
      <div className="w-full max-w-[1920px] mx-auto">
        <Link href="/scholarship" className="block relative group cursor-pointer" aria-label="Buniyad Scholarship Exam 2026-2027">
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="relative w-full aspect-[16/9] sm:aspect-[21/9] md:aspect-[16/9] lg:aspect-[1920/1000] max-h-[88vh]"
          >
            <Image
              src="/buniyad-hero-banner.jpg"
              alt="Buniyad Scholarship Exam 2026 - 2027 | Care Plus Foundation Trust"
              fill
              priority
              sizes="100vw"
              className="object-contain md:object-cover w-full h-full"
            />
          </motion.div>
        </Link>
      </div>
    </section>
  );
}
