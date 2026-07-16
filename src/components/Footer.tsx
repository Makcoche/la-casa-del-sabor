import React from 'react';
import { Facebook, Instagram, Music, MapPin, Clock, ArrowUp, ExternalLink } from 'lucide-react';
import { BrandInfo } from '../types';

interface FooterProps {
  brandInfo: BrandInfo;
  onScrollToTop: () => void;
}

export const Footer: React.FC<FooterProps> = ({ brandInfo, onScrollToTop }) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-neutral-950 text-white border-t border-white/5 py-12 md:py-16 relative z-10 transition-colors duration-300">
      
      {/* Scroll to top floating style wrapper inside footer footer-bottom */}
      <div className="absolute -top-6 left-1/2 -translate-x-1/2">
        <button
          onClick={onScrollToTop}
          className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-yellow hover:bg-amber-500 text-brand-brown shadow-lg shadow-brand-yellow/15 hover:shadow-brand-yellow/30 hover:-translate-y-1 transition-all duration-300 cursor-pointer"
          title="Volver Arriba"
          id="scroll-to-top-footer-btn"
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
          
          {/* Logo & Description */}
          <div className="md:col-span-4 space-y-4">
            <div className="flex items-center space-x-3">
              {brandInfo.logoUrl ? (
                <div className="w-10 h-10 rounded-full overflow-hidden bg-white shrink-0 border border-brand-yellow">
                  <img src={brandInfo.logoUrl} alt="Logo" className="w-full h-full object-cover" />
                </div>
              ) : (
                <div className="w-10 h-10 rounded-full bg-brand-yellow flex items-center justify-center text-xl shrink-0">
                  🔥
                </div>
              )}
              <h2 className="font-display font-extrabold text-xl tracking-tight leading-none">
                {brandInfo.name}
              </h2>
            </div>
            <p className="font-sans text-xs sm:text-sm text-neutral-400 leading-relaxed">
              {brandInfo.slogan} <br />
              Llevando felicidad en forma de arepas rellenas artesanales asadas a la brasa con el auténtico sabor tradicional colombiano.
            </p>
            
            {/* Social media links */}
            <div className="flex items-center space-x-3.5 pt-2">
              <a
                href={brandInfo.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-full bg-neutral-900 border border-white/10 text-neutral-400 hover:text-brand-yellow hover:border-brand-yellow/50 transition-all duration-200"
                title="Siguenos en Facebook"
                id="footer-facebook-link"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href={brandInfo.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-full bg-neutral-900 border border-white/10 text-neutral-400 hover:text-brand-yellow hover:border-brand-yellow/50 transition-all duration-200"
                title="Siguenos en Instagram"
                id="footer-instagram-link"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={brandInfo.social.tiktok}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-full bg-neutral-900 border border-white/10 text-neutral-400 hover:text-brand-yellow hover:border-brand-yellow/50 transition-all duration-200"
                title="Siguenos en TikTok"
                id="footer-tiktok-link"
              >
                <Music className="w-4 h-4" /> {/* Standard Music icon is great for TikTok styling */}
              </a>
            </div>
          </div>

          {/* Opening hours & contact */}
          <div className="md:col-span-4 space-y-4">
            <h3 className="font-display font-extrabold text-sm tracking-widest text-brand-yellow uppercase">
              Horario de Atención
            </h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-2.5">
                <Clock className="w-4.5 h-4.5 text-neutral-400 shrink-0 mt-0.5" />
                <div className="text-xs sm:text-sm text-neutral-300">
                  <p className="font-bold">Horarios</p>
                  <p className="text-neutral-400 mt-0.5">{brandInfo.schedule}</p>
                </div>
              </div>
              <div className="flex items-start space-x-2.5 pt-1">
                <MapPin className="w-4.5 h-4.5 text-neutral-400 shrink-0 mt-0.5" />
                <div className="text-xs sm:text-sm text-neutral-300">
                  <p className="font-bold">Ubicación</p>
                  <p className="text-neutral-400 mt-0.5">{brandInfo.address}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Map redirection & call-to-action */}
          <div className="md:col-span-4 space-y-4">
            <h3 className="font-display font-extrabold text-sm tracking-widest text-brand-yellow uppercase">
              ¿Cómo Llegar?
            </h3>
            <div className="rounded-2xl overflow-hidden border border-white/10 bg-neutral-900 p-4 space-y-3.5">
              
              {/* Mini vector style visual of a map */}
              <div className="h-20 bg-neutral-850 rounded-xl relative overflow-hidden flex items-center justify-center border border-white/5">
                <div className="absolute inset-0 opacity-15 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-amber-500 via-neutral-950 to-neutral-950" />
                
                {/* Visual streets representation */}
                <div className="absolute top-1/2 left-0 right-0 h-2.5 bg-neutral-700/60 rotate-12" />
                <div className="absolute left-1/3 top-0 bottom-0 w-2.5 bg-neutral-700/60 -rotate-12" />
                <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 animate-bounce">
                  <span className="text-2xl">📍</span>
                </div>
                <span className="text-[10px] text-neutral-400 font-mono z-10 font-bold tracking-wide uppercase px-2 py-0.5 rounded bg-neutral-900/90 border border-white/10">
                  {brandInfo.address.split(',')[0]}
                </span>
              </div>

              {/* Action trigger button */}
              <a
                href={`https://maps.google.com/?q=${encodeURIComponent(brandInfo.address)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 rounded-xl bg-neutral-800 hover:bg-neutral-750 text-white font-display font-bold text-xs sm:text-sm flex items-center justify-center space-x-2 border border-white/5 transition-all duration-200"
                id="footer-how-to-arrive-btn"
              >
                <ExternalLink className="w-4 h-4 text-brand-yellow" />
                <span>Cómo Llegar en Google Maps</span>
              </a>

            </div>
          </div>

        </div>

        {/* Divider and copy rights */}
        <div className="border-t border-white/5 mt-12 pt-8 flex flex-col sm:flex-row justify-between items-center text-xs text-neutral-500 dark:text-neutral-600 gap-4">
          <p>© {currentYear} {brandInfo.name}. Todos los derechos reservados.</p>
          <p className="font-display font-semibold text-neutral-400 dark:text-neutral-500 flex items-center gap-1">
            <span>Hecho con</span>
            <span className="text-red-500 animate-pulse">❤️</span>
            <span>para amantes del sabor premium</span>
          </p>
        </div>

      </div>
    </footer>
  );
};
