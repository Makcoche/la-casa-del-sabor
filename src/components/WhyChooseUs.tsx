import React from 'react';
import { Sparkles, Flame, HeartHandshake, Bike } from 'lucide-react';
import { BRAND_INFO } from '../data';

const IconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Sparkles: Sparkles,
  Flame: Flame,
  HeartHandshake: HeartHandshake,
  Bike: Bike,
};

export const WhyChooseUs: React.FC = () => {
  return (
    <section className="py-16 bg-amber-50/10 dark:bg-transparent transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-brand-brown dark:text-brand-yellow font-display font-extrabold text-xs tracking-wider uppercase bg-brand-yellow/10 border border-brand-yellow/20 px-4 py-1.5 rounded-full">
            Nuestros Secretos
          </span>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-neutral-900 dark:text-neutral-50 mt-3 leading-tight">
            ¿Por qué elegir La Casa del Sabor?
          </h2>
          <p className="text-neutral-600 dark:text-neutral-300 text-sm sm:text-base mt-2 font-sans">
            Nos apasiona entregar la máxima calidad y sabor tradicional en cada preparación.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {BRAND_INFO.whyChooseUs.map((feature, idx) => {
            const IconComp = IconMap[feature.icon] || Sparkles;

            return (
              <div
                key={idx}
                className="group p-6 rounded-3xl bg-white dark:bg-white/5 dark:backdrop-blur-md border border-amber-950/10 dark:border-white/10 hover:border-brand-yellow/40 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col items-center text-center space-y-4"
                id={`feature-card-${idx}`}
              >
                {/* Icon bubble */}
                <div className="w-14 h-14 rounded-2xl bg-amber-100 dark:bg-white/10 text-brand-brown dark:text-brand-yellow flex items-center justify-center shadow-inner group-hover:scale-110 group-hover:bg-brand-yellow group-hover:text-brand-brown transition-all duration-300">
                  <IconComp className="w-6 h-6 shrink-0" />
                </div>

                {/* Text */}
                <div className="space-y-1.5">
                  <h3 className="font-display font-bold text-lg text-neutral-900 dark:text-neutral-50">
                    {feature.title}
                  </h3>
                  <p className="font-sans text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
