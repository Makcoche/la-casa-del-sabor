import React from 'react';
import { motion } from 'motion/react';
import { Flame, Percent, Sparkles, Plus } from 'lucide-react';
import { PROMOTIONS } from '../data';
import { Product } from '../types';
import { formatPrice } from './ProductCard';

interface PromoSectionProps {
  onAddToCart: (product: Product) => void;
  onViewProductDetails: (product: Product) => void;
}

export const PromoSection: React.FC<PromoSectionProps> = ({
  onAddToCart,
  onViewProductDetails
}) => {
  return (
    <section className="py-16 bg-linear-to-br from-[#2D1A12] to-[#121212] dark:from-brand-brown-dark dark:to-brand-black text-white relative overflow-hidden border-y border-white/5">
      
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-brand-yellow/10 via-neutral-900/10 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Title */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center space-x-1.5 px-3.5 py-1.5 rounded-full bg-brand-yellow/10 border border-brand-yellow/30 text-brand-yellow font-display font-extrabold text-xs tracking-wider uppercase mb-3">
            <Flame className="w-3.5 h-3.5 animate-pulse" />
            <span>Súper Ofertas</span>
          </div>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl leading-tight">
            Promociones de la Semana
          </h2>
          <p className="text-amber-100/60 text-sm sm:text-base mt-2 font-sans">
            Aprovecha nuestros combos y descuentos exclusivos por tiempo limitado. ¡No dejes que se enfríen!
          </p>
        </div>

        {/* Promo Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {PROMOTIONS.map((promo) => {
            
            // Map promotion to a temporary product object for details view/adding
            const promoAsProduct: Product = {
              id: promo.id,
              name: promo.title,
              description: promo.description,
              price: promo.price,
              category: promo.category,
              image: promo.image,
              isNew: false,
              isPopular: true
            };

            return (
              <motion.div
                key={promo.id}
                initial={{ opacity: 0, scale: 0.98 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
                className="group relative flex flex-col sm:flex-row overflow-hidden rounded-3xl premium-card bg-white/5 backdrop-blur-md border border-white/10 shadow-xl shadow-neutral-950/20 hover:border-brand-yellow/40 transition-all duration-300"
                id={`promo-card-${promo.id}`}
              >
                {/* Badge overlay */}
                <div className="absolute top-4 left-4 z-10">
                  <span className="inline-flex items-center space-x-1.5 px-3.5 py-1.5 rounded-2xl bg-brand-yellow text-brand-brown font-display font-black text-[11px] tracking-wide uppercase shadow-lg">
                    <Percent className="w-3.5 h-3.5" />
                    <span>{promo.badge}</span>
                  </span>
                </div>

                {/* Left Side: Product Image */}
                <div className="w-full sm:w-2/5 aspect-[16/10] sm:aspect-auto sm:min-h-[200px] overflow-hidden relative shrink-0">
                  <img
                    src={promo.image}
                    alt={promo.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent to-neutral-950/20" />
                </div>

                {/* Right Side: Product Details */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-1.5">
                    <h3 className="font-display font-bold text-lg text-white group-hover:text-brand-yellow transition-colors duration-200 leading-snug">
                      {promo.title}
                    </h3>
                    <p className="font-sans text-xs sm:text-sm text-neutral-400 line-clamp-3 leading-relaxed">
                      {promo.description}
                    </p>
                  </div>

                  <div className="flex items-end justify-between pt-2">
                    
                    {/* Prices */}
                    <div className="flex flex-col">
                      <span className="font-mono text-xs text-neutral-500 line-through">
                        Antes {formatPrice(promo.originalPrice)}
                      </span>
                      <span className="font-mono font-black text-lg sm:text-xl text-brand-yellow">
                        {formatPrice(promo.price)}
                      </span>
                    </div>

                    {/* Button */}
                    <div className="flex space-x-2">
                      <button
                        onClick={() => onViewProductDetails(promoAsProduct)}
                        className="px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-neutral-200 text-xs font-display font-bold transition-all duration-200 cursor-pointer"
                        id={`promo-details-btn-${promo.id}`}
                      >
                        Ver más
                      </button>
                      <button
                        onClick={() => onAddToCart(promoAsProduct)}
                        className="px-4 py-2 rounded-xl bg-brand-yellow hover:bg-amber-500 text-brand-brown font-display font-extrabold text-xs sm:text-sm transition-all duration-200 flex items-center space-x-1 hover:scale-105 cursor-pointer"
                        id={`promo-add-btn-${promo.id}`}
                      >
                        <Plus className="w-4 h-4 shrink-0" />
                        <span>Pedir</span>
                      </button>
                    </div>

                  </div>
                </div>

              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
