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
    aspect: '1024 / 576',
  },
  {
    id: 2,
    src: '/hero-slide-2.jpg',
    alt: 'Buniyad Scholarship Exam & ML Medo Medical Benefit Card',
    link: '/scholarship',
    width: 1024,
    height: 712,
    aspect: '1024 / 712',
  },
  {
    id: 3,
    src: '/hero-slide-3.jpg',
    alt: 'ML Medo Medical Benefit Card Special Offer for Students ₹299',
    link: '/scholarship',
    width: 1024,
    height: 817,
    aspect: '1024 / 817',
  },
  {
    id: 4,
    src: '/hero-slide-4.jpg',
    alt: 'Care Plus Foundation Trust - Education, Health & Social Welfare',
    link: '/about',
    width: 1024,
    height: 682,
    aspect: '1024 / 682',
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
    <section className="relative w-full bg-white select-none overflow-hidden">
      <div className="relative w-full max-w-7xl mx-auto px-2 sm:px-4 md:px-6 py-2 sm:py-4">
        
        {/* Banner Container with dynamic natural aspect ratio */}
        <div 
          className="relative w-full overflow-hidden rounded-2xl sm:rounded-3xl shadow-lg border border-gray-100 transition-[aspect-ratio] duration-500 ease-in-out"
          style={{ aspectRatio: currentSlide.aspect }}
        >
          <Link 
            href={currentSlide.link} 
            className="block w-full h-full relative cursor-pointer focus:outline-none" 
            aria-label={currentSlide.alt}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.45, ease: 'easeInOut' }}
                className="relative w-full h-full"
              >
                <Image
                  src={currentSlide.src}
                  alt={currentSlide.alt}
                  fill
                  priority
                  sizes="(max-width: 1280px) 100vw, 1280px"
                  className="w-full h-full object-fill block"
                />
              </motion.div>
            </AnimatePresence>
          </Link>

          {/* Previous Button */}
          <button
            onClick={handlePrev}
            aria-label="Previous slide"
            className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-20 w-8 h-8 sm:w-11 sm:h-11 rounded-full bg-black/45 hover:bg-black/75 text-white flex items-center justify-center backdrop-blur-md transition-all shadow-md hover:scale-105 active:scale-95"
          >
            <ChevronLeft size={22} />
          </button>

          {/* Next Button */}
          <button
            onClick={handleNext}
            aria-label="Next slide"
            className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-20 w-8 h-8 sm:w-11 sm:h-11 rounded-full bg-black/45 hover:bg-black/75 text-white flex items-center justify-center backdrop-blur-md transition-all shadow-md hover:scale-105 active:scale-95"
          >
            <ChevronRight size={22} />
          </button>

          {/* Dots Indicator */}
          <div className="absolute bottom-3 sm:bottom-5 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 bg-black/40 backdrop-blur-md px-3.5 py-1.5 rounded-full">
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
                    ? 'w-6 sm:w-7 h-2 bg-[#ffd700] shadow-sm shadow-amber-300'
                    : 'w-2 h-2 bg-white/60 hover:bg-white/90'
                }`}
              />
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
