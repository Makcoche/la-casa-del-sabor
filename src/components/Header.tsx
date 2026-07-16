import React from 'react';
import { Sun, Moon, Phone, MessageCircle, ShoppingBag, QrCode, Settings } from 'lucide-react';
import { BrandInfo } from '../types';

interface HeaderProps {
  brandInfo: BrandInfo;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  cartCount: number;
  openCart: () => void;
  openQR: () => void;
  openAdmin: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  brandInfo,
  isDarkMode,
  toggleDarkMode,
  cartCount,
  openCart,
  openQR,
  openAdmin
}) => {
  return (
    <header className="sticky top-0 z-40 w-full transition-all duration-300 border-b glass-panel border-amber-950/10 dark:border-amber-50/10 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo & Slogan */}
          <div className="flex items-center space-x-3">
            {brandInfo.logoUrl ? (
              <div className="relative w-12 h-12 rounded-full overflow-hidden bg-white shadow-md border-2 border-brand-yellow shrink-0">
                <img src={brandInfo.logoUrl} alt="Logo" className="w-full h-full object-cover" />
              </div>
            ) : (
              <div className="relative flex items-center justify-center w-12 h-12 rounded-full bg-brand-yellow font-display font-extrabold text-brand-brown text-2xl shadow-md border-2 border-white dark:border-neutral-800 animate-bounce-slow shrink-0">
                🔥
              </div>
            )}
            <div>
              <h1 className="font-display font-extrabold text-xl sm:text-2xl tracking-tight text-brand-brown dark:text-brand-yellow leading-tight">
                {brandInfo.name}
              </h1>
              <p className="hidden md:block text-xs font-sans font-medium text-amber-800 dark:text-amber-300">
                {brandInfo.slogan}
              </p>
            </div>
          </div>

          {/* Slogan on mobile (centered below name or in banner) */}

          {/* Quick Actions */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            
            {/* Call button */}
            <a
              href={`tel:${brandInfo.phone}`}
              className="p-2 rounded-full bg-amber-100 hover:bg-amber-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 text-brand-brown dark:text-brand-yellow transition-all duration-200"
              title="Llamar para información"
              id="header-call-btn"
            >
              <Phone className="w-5 h-5" />
            </a>

            {/* QR Code button */}
            <button
              onClick={openQR}
              className="p-2 rounded-full bg-amber-100 hover:bg-amber-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 text-brand-brown dark:text-brand-yellow transition-all duration-200"
              title="Ver Código QR"
              id="header-qr-btn"
            >
              <QrCode className="w-5 h-5" />
            </button>

            {/* Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-full bg-amber-100 hover:bg-amber-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 text-brand-brown dark:text-brand-yellow transition-all duration-200"
              title={isDarkMode ? 'Modo Claro' : 'Modo Oscuro'}
              id="header-darkmode-btn"
            >
              {isDarkMode ? <Sun className="w-5 h-5 text-yellow-500" /> : <Moon className="w-5 h-5" />}
            </button>

            {/* WhatsApp Contact */}
            <a
              href={`https://wa.me/${brandInfo.phone.replace('+', '').replace(/\s+/g, '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden lg:flex items-center space-x-2 bg-green-600 hover:bg-green-700 text-white font-sans font-semibold text-sm px-4 py-2.5 rounded-full shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200"
              id="header-whatsapp-link"
            >
              <MessageCircle className="w-4 h-4 fill-current" />
              <span>Preguntar</span>
            </a>

            {/* Admin Dashboard */}
            <button
              onClick={openAdmin}
              className="p-2 rounded-full bg-amber-100 hover:bg-amber-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 text-brand-brown dark:text-brand-yellow transition-all duration-200"
              title="Panel Administrador"
              id="header-admin-btn"
            >
              <Settings className="w-5 h-5" />
            </button>

            {/* Floating Cart Trigger */}
            <button
              onClick={openCart}
              className="relative flex items-center space-x-2 bg-brand-brown hover:bg-brand-brown-light dark:bg-brand-yellow dark:hover:bg-amber-500 text-white dark:text-brand-brown font-sans font-bold text-sm px-4 py-2.5 rounded-full shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 border border-amber-950/20"
              id="header-cart-btn"
            >
              <ShoppingBag className="w-4 h-4" />
              <span className="hidden sm:inline">Mi Pedido</span>
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-red-600 text-[11px] font-extrabold text-white ring-2 ring-white dark:ring-neutral-900 animate-pulse">
                  {cartCount}
                </span>
              )}
            </button>

          </div>
        </div>
      </div>
    </header>
  );
};
