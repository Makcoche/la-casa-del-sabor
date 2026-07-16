import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Star, ChevronLeft, ChevronRight, MessageSquareQuote } from 'lucide-react';
import { TESTIMONIALS } from '../data';

export const TestimonialsCarousel: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  // Auto scroll testimonials
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 7000);
    return () => clearInterval(timer);
  }, []);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % TESTIMONIALS.length);
  };

  const current = TESTIMONIALS[activeIndex];

  return (
    <section className="py-16 bg-amber-50/5 dark:bg-transparent transition-colors duration-300 overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="text-center mb-10">
          <span className="text-brand-brown dark:text-brand-yellow font-display font-extrabold text-xs tracking-wider uppercase bg-brand-yellow/10 border border-brand-yellow/20 px-4 py-1.5 rounded-full">
            Clientes Felices
          </span>
          <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-neutral-900 dark:text-neutral-50 mt-3 leading-tight">
            Lo que dicen nuestros comensales
          </h2>
        </div>

        {/* Carousel Slide wrapper */}
        <div className="relative bg-white dark:bg-white/5 dark:backdrop-blur-md border border-amber-950/10 dark:border-white/10 rounded-3xl p-6 sm:p-10 shadow-lg dark:shadow-[0_8px_32px_rgba(0,0,0,0.3)] min-h-[260px] flex flex-col justify-between">
          
          {/* Quote mark decoration */}
          <div className="absolute top-6 right-8 text-amber-500/10 dark:text-brand-yellow/10">
            <MessageSquareQuote className="w-20 h-20 shrink-0" />
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.35 }}
              className="space-y-6 z-10"
            >
              {/* Stars rating */}
              <div className="flex items-center space-x-1">
                {Array.from({ length: current.rating }).map((_, idx) => (
                  <Star key={idx} className="w-5 h-5 fill-brand-yellow text-brand-yellow" />
                ))}
              </div>

              {/* Quote text */}
              <p className="font-sans text-base sm:text-lg text-neutral-700 dark:text-neutral-200 italic leading-relaxed">
                "{current.comment}"
              </p>

              {/* Client metadata */}
              <div className="flex items-center space-x-4">
                <img
                  src={current.avatar}
                  alt={current.name}
                  referrerPolicy="no-referrer"
                  className="w-12 h-12 rounded-full object-cover border-2 border-brand-yellow"
                />
                <div>
                  <h4 className="font-display font-bold text-sm text-neutral-900 dark:text-neutral-50">
                    {current.name}
                  </h4>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400 font-sans font-medium">
                    {current.role}
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation controls */}
          <div className="flex items-center justify-between mt-8 border-t border-neutral-100 dark:border-white/10 pt-6">
            
            {/* Dots */}
            <div className="flex items-center space-x-2">
              {TESTIMONIALS.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveIndex(idx)}
                  className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                    activeIndex === idx ? 'w-6 bg-brand-brown dark:bg-brand-yellow' : 'w-2.5 bg-neutral-200 dark:bg-white/10'
                  }`}
                  title={`Ir al testimonio ${idx + 1}`}
                  id={`testimonial-dot-${idx}`}
                />
              ))}
            </div>

            {/* Chevrons */}
            <div className="flex items-center space-x-2">
              <button
                onClick={handlePrev}
                className="p-2 rounded-xl bg-neutral-50 hover:bg-amber-100 dark:bg-white/5 dark:hover:bg-white/15 text-neutral-600 dark:text-neutral-300 transition-colors duration-200 cursor-pointer"
                title="Anterior"
                id="testimonial-prev-btn"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={handleNext}
                className="p-2 rounded-xl bg-neutral-50 hover:bg-amber-100 dark:bg-white/5 dark:hover:bg-white/15 text-neutral-600 dark:text-neutral-300 transition-colors duration-200 cursor-pointer"
                title="Siguiente"
                id="testimonial-next-btn"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
