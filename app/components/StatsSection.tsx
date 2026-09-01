'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';

const stats = [
  { label: 'Children Helped', value: 500, suffix: '+', icon: '👶' },
  { label: 'Programs', value: 50, suffix: '+', icon: '📚' },
  { label: 'Locations', value: 10, suffix: '+', icon: '📍' },
  { label: 'Volunteers', value: 1000, suffix: '+', icon: '🤝' },
];

function Counter({ end, suffix }: { end: number, suffix: string }) {
  const [count, setCount] = useState(0);
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.5,
  });

  useEffect(() => {
    if (inView) {
      let start = 0;
      const duration = 2000;
      const increment = end / (duration / 16);
      
      const timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 16);

      return () => clearInterval(timer);
    }
  }, [inView, end]);

  return (
    <span ref={ref} className="text-4xl font-bold text-[#0f4a5c]">
      {count}{suffix}
    </span>
  );
}

export default function StatsSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8"
        >
          {stats.map((stat, index) => (
            <motion.div 
              key={index}
              variants={itemVariants}
              className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow text-center border border-gray-100"
            >
              <div className="text-4xl mb-4">{stat.icon}</div>
              <Counter end={stat.value} suffix={stat.suffix} />
              <p className="mt-2 text-gray-600 font-medium">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
