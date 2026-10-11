'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const slides = [
  {
    id: 1,
    src: '/hero-slide-1.jpg',
    alt: 'Buniyad Scholarship Exam 2026 - 2027 | Care Plus Foundation Trust',
    link: '/scholarship',
    width: 1024,
    height: 576,
  },
  {
    id: 2,
    src: '/hero-slide-2.jpg',
    alt: 'Buniyad Scholarship Exam & ML Medo Medical Benefit Card',
    link: '/scholarship',
    width: 1024,
    height: 712,
  },
  {
    id: 3,
    src: '/hero-slide-3.jpg',
    alt: 'ML Medo Medical Benefit Card Special Offer for Students ₹299',
    link: '/scholarship',
    width: 1024,
    height: 817,
  },
  {
    id: 4,
    src: '/hero-slide-4.jpg',
    alt: 'Care Plus Foundation Trust - Education, Health & Social Welfare',
    link: '/about',
    width: 1024,
    height: 682,
  },
];

export default function HeroSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-play infinite loop
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 4500); // changes every 4.5 seconds

    return () => clearInterval(timer);
  }, []);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const handleNext = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  };

  const currentSlide = slides[currentIndex];

  return (
    <section className="relative w-full bg-[#0a1820] overflow-hidden select-none">
      <div className="relative w-full max-w-7xl mx-auto flex items-center justify-center">
        <Link 
          href={currentSlide.link} 
          className="block relative w-full group cursor-pointer focus:outline-none" 
          aria-label={currentSlide.alt}
        >
          <div className="relative w-full flex items-center justify-center min-h-[260px] sm:min-h-[400px] md:min-h-[500px] lg:min-h-[620px] bg-black/40">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.01 }}
                transition={{ duration: 0.6, ease: 'easeInOut' }}
                className="relative w-full flex justify-center items-center"
              >
                <Image
                  src={currentSlide.src}
                  alt={currentSlide.alt}
                  width={currentSlide.width}
                  height={currentSlide.height}
                  priority
                  sizes="(max-width: 1280px) 100vw, 1280px"
                  className="w-full max-h-[82vh] object-contain block mx-auto drop-shadow-2xl"
                />
              </motion.div>
            </AnimatePresence>
          </div>
        </Link>

        {/* Previous Button */}
        <button
          onClick={handlePrev}
          aria-label="Previous slide"
          className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/40 hover:bg-black/70 text-white flex items-center justify-center backdrop-blur-md transition-all opacity-80 hover:opacity-100 hover:scale-105"
        >
          <ChevronLeft size={24} />
        </button>

        {/* Next Button */}
        <button
          onClick={handleNext}
          aria-label="Next slide"
          className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/40 hover:bg-black/70 text-white flex items-center justify-center backdrop-blur-md transition-all opacity-80 hover:opacity-100 hover:scale-105"
        >
          <ChevronRight size={24} />
        </button>

        {/* Navigation Indicator Dots */}
        <div className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2.5 bg-black/50 backdrop-blur-md px-4 py-2 rounded-full">
          {slides.map((slide, idx) => (
            <button
              key={slide.id}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                goToSlide(idx);
              }}
              aria-label={`Go to slide ${idx + 1}`}
              className={`transition-all duration-300 rounded-full ${
                currentIndex === idx
                  ? 'w-7 sm:w-8 h-2 sm:h-2.5 bg-[#ffd700] shadow-md shadow-amber-400/50'
                  : 'w-2 sm:w-2.5 h-2 sm:h-2.5 bg-white/50 hover:bg-white/90'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
