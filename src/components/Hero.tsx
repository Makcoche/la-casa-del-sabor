import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { ChefHat, Phone, ArrowDown, Sparkles, Clock } from 'lucide-react';
import { HERO_IMAGE } from '../data';
import { BrandInfo } from '../types';

interface HeroProps {
  brandInfo: BrandInfo;
  onScrollToMenu: () => void;
}

export const Hero: React.FC<HeroProps> = ({ brandInfo, onScrollToMenu }) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Check if open (Lunes a Domingo: 5:00 PM - 10:00 PM)
    const checkOpenStatus = () => {
      const now = new Date();
      const hours = now.getHours();
      const minutes = now.getMinutes();
      const totalMinutes = hours * 60 + minutes;

      const openingMinutes = 17 * 60; // 5:00 PM
      const closingMinutes = 22 * 60; // 10:00 PM

      const isOpenDay = true; // Open everyday
      const isOpenHour = totalMinutes >= openingMinutes && totalMinutes <= closingMinutes;

      setIsOpen(isOpenDay && isOpenHour);
    };

    checkOpenStatus();
    const interval = setInterval(checkOpenStatus, 60000);
    return () => clearInterval(interval);
  }, []);

  const bannerImg = brandInfo.heroImageUrl || HERO_IMAGE;
  const bannerTitle = brandInfo.heroTitle || 'Las Arepas Rellenas';
  const bannerSubtitle = brandInfo.heroSubtitle || 'que Conquistan el Sabor';

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-brand-brown-dark to-neutral-950 text-white py-12 md:py-20 lg:py-24">
      {/* Grill texture and light background effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-amber-950/40 via-neutral-950/90 to-neutral-950 opacity-75 z-0" />
      <div className="absolute inset-0 bg-cover bg-center mix-blend-overlay opacity-15" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=1200')` }} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Text content side */}
          <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left space-y-6">
            
            {/* Live status badge */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center space-x-2.5 px-4 py-1.5 rounded-full bg-neutral-900/80 border border-amber-500/30 text-xs font-semibold tracking-wide"
            >
              <span className={`h-2 w-2 rounded-full ${isOpen ? 'bg-green-500 animate-ping' : 'bg-red-500'} inline-block`} />
              <span className={isOpen ? 'text-green-400' : 'text-amber-400'}>
                {isOpen ? '¡Abiertos ahora! Pide caliente' : `Abierto: ${brandInfo.schedule}`}
              </span>
            </motion.div>

            {/* Main title */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <h1 className="font-display font-extrabold text-4xl sm:text-5xl md:text-6xl tracking-tight leading-none text-white">
                {bannerTitle} <span className="text-brand-yellow font-black block sm:inline">{bannerSubtitle}</span>
              </h1>
            </motion.div>

            {/* Slogan and Description */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-base sm:text-lg text-amber-100/80 max-w-xl font-sans"
            >
              Prepárate para una experiencia gastronómica premium. Nuestras arepas de puro maíz rellenas con ingredientes gourmet y asadas al carbón te harán delirar en cada bocado.
            </motion.p>

            {/* Key benefits quick view */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="grid grid-cols-2 gap-4 w-full max-w-md pt-2"
            >
              <div className="flex items-center space-x-2 bg-white/5 border border-white/10 px-3 py-2 rounded-lg">
                <ChefHat className="w-5 h-5 text-brand-yellow shrink-0" />
                <span className="text-xs font-medium text-amber-50">100% Artesanal</span>
              </div>
              <div className="flex items-center space-x-2 bg-white/5 border border-white/10 px-3 py-2 rounded-lg">
                <Clock className="w-5 h-5 text-brand-yellow shrink-0" />
                <span className="text-xs font-medium text-amber-50">Lunes a Domingo</span>
              </div>
            </motion.div>

            {/* CTA buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto pt-4"
            >
              <button
                onClick={onScrollToMenu}
                className="w-full sm:w-auto px-8 py-4 rounded-full bg-brand-yellow hover:bg-amber-500 text-brand-brown font-display font-bold text-base shadow-lg shadow-brand-yellow/20 hover:shadow-brand-yellow/40 transition-all duration-300 hover:-translate-y-0.5 flex items-center justify-center space-x-2 group cursor-pointer"
                id="hero-order-now-btn"
              >
                <span>Explorar Menú</span>
                <ArrowDown className="w-5 h-5 group-hover:translate-y-1 transition-transform duration-200" />
              </button>

              <a
                href={`tel:${brandInfo.phone}`}
                className="w-full sm:w-auto px-8 py-4 rounded-full bg-neutral-900 border border-amber-500/30 hover:border-brand-yellow text-white font-display font-bold text-base transition-all duration-300 hover:-translate-y-0.5 flex items-center justify-center space-x-2"
                id="hero-call-now-btn"
              >
                <Phone className="w-5 h-5 text-brand-yellow" />
                <span>Llamar Directo</span>
              </a>
            </motion.div>

          </div>

          {/* Photo side with premium card wrapping */}
          <div className="lg:col-span-5 flex justify-center">
            <motion.div
              initial={{ opacity: 0, r: 15, scale: 0.95 }}
              animate={{ opacity: 1, r: 0, scale: 1 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="relative w-full max-w-sm sm:max-w-md aspect-[4/3] sm:aspect-square md:aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border-4 border-amber-500/20 group hover:border-brand-yellow/30 transition-all duration-500"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 to-transparent z-10" />
              <img
                src={bannerImg}
                alt="Arepa Gourmet la Casa del Sabor"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
              />
              
              {/* Floating decorative absolute element */}
              <div className="absolute bottom-4 left-4 right-4 z-20 bg-neutral-950/80 backdrop-blur-md border border-white/10 px-4 py-3 rounded-2xl flex items-center justify-between">
                <div>
                  <h4 className="font-display font-bold text-sm text-brand-yellow">La Arepa Legendaria</h4>
                  <p className="text-[11px] text-amber-100/70">Masa de maíz asada al carbón, rebosante de sabor artesanal.</p>
                </div>
                <div className="px-2.5 py-1 rounded bg-brand-yellow text-brand-brown font-display font-extrabold text-xs">
                  Premium
                </div>
              </div>

              {/* Sparkles effect */}
              <div className="absolute top-4 right-4 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-brand-brown-dark/80 backdrop-blur-md border border-amber-500/30 text-brand-yellow animate-pulse">
                <Sparkles className="w-4 h-4" />
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};
