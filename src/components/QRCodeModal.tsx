import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, QrCode, Smartphone, Copy, Check } from 'lucide-react';
import { BrandInfo } from '../types';

interface QRCodeModalProps {
  brandInfo: BrandInfo;
  isOpen: boolean;
  onClose: () => void;
}

export const QRCodeModal: React.FC<QRCodeModalProps> = ({ brandInfo, isOpen, onClose }) => {
  const [copied, setCopied] = React.useState(false);
  if (!isOpen) return null;

  const currentUrl = window.location.href;

  const handleCopy = () => {
    navigator.clipboard.writeText(currentUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        
        {/* Backdrop overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-neutral-950/70 backdrop-blur-sm"
        />

        {/* Modal box */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: 'spring', duration: 0.5 }}
          className="relative w-full max-w-sm overflow-hidden rounded-3xl bg-white dark:bg-neutral-850 shadow-2xl border border-amber-900/10 z-10 p-6 text-center space-y-6"
          id="qr-code-modal"
        >
          {/* Header */}
          <div className="flex justify-between items-center pb-2">
            <h3 className="font-display font-extrabold text-lg text-neutral-900 dark:text-neutral-50 flex items-center space-x-2">
              <QrCode className="w-5 h-5 text-brand-yellow" />
              <span>Código QR del Menú</span>
            </h3>
            <button
              onClick={onClose}
              className="p-1.5 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-750 text-neutral-500 dark:text-neutral-400 cursor-pointer"
              id="close-qr-modal-btn"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* QR Code Graphic Frame */}
          <div className="relative p-6 bg-amber-50/50 dark:bg-neutral-800 rounded-2xl border-2 border-dashed border-amber-500/20 flex flex-col items-center justify-center">
            
            {brandInfo.qrUrl ? (
              <div className="w-48 h-48 sm:w-56 sm:h-56 bg-white p-3 rounded-xl shadow-md overflow-hidden flex items-center justify-center">
                <img src={brandInfo.qrUrl} alt="QR Code" className="w-full h-full object-contain" />
              </div>
            ) : (
              /* Realistically styled SVG QR Code with corporate colors and centered brand element */
              <svg
                className="w-48 h-48 sm:w-56 sm:h-56 bg-white p-3 rounded-xl shadow-md"
                viewBox="0 0 100 100"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* QR Finder patterns - Top Left */}
                <rect x="5" y="5" width="20" height="20" fill="#4B2E20" rx="3" />
                <rect x="9" y="9" width="12" height="12" fill="#FFFFFF" rx="1" />
                <rect x="11" y="11" width="8" height="8" fill="#F7A600" rx="1" />

                {/* QR Finder patterns - Top Right */}
                <rect x="75" y="5" width="20" height="20" fill="#4B2E20" rx="3" />
                <rect x="79" y="9" width="12" height="12" fill="#FFFFFF" rx="1" />
                <rect x="81" y="11" width="8" height="8" fill="#F7A600" rx="1" />

                {/* QR Finder patterns - Bottom Left */}
                <rect x="5" y="75" width="20" height="20" fill="#4B2E20" rx="3" />
                <rect x="9" y="79" width="12" height="12" fill="#FFFFFF" rx="1" />
                <rect x="11" y="81" width="8" height="8" fill="#F7A600" rx="1" />

                {/* Grid of stylized culinary-themed bits */}
                <g fill="#1E1E1E" opacity="0.85">
                  <rect x="30" y="5" width="4" height="4" rx="1" />
                  <rect x="38" y="5" width="8" height="4" rx="1" />
                  <rect x="50" y="5" width="4" height="4" rx="1" />
                  <rect x="60" y="5" width="8" height="4" rx="1" />
                  <rect x="70" y="5" width="4" height="4" rx="1" />

                  <rect x="30" y="12" width="12" height="4" rx="1" fill="#F7A600" />
                  <rect x="46" y="12" width="4" height="4" rx="1" />
                  <rect x="55" y="12" width="8" height="4" rx="1" />
                  <rect x="68" y="12" width="4" height="4" rx="1" />

                  <rect x="30" y="20" width="4" height="8" rx="1" />
                  <rect x="38" y="20" width="8" height="4" rx="1" />
                  <rect x="50" y="20" width="12" height="4" rx="1" />
                  <rect x="65" y="20" width="4" height="4" rx="1" />

                  <rect x="5" y="30" width="4" height="4" rx="1" />
                  <rect x="15" y="30" width="8" height="4" rx="1" />
                  <rect x="28" y="30" width="4" height="4" rx="1" />
                  <rect x="36" y="30" width="12" height="4" rx="1" />
                  <rect x="52" y="30" width="8" height="8" rx="1" fill="#4B2E20" />
                  <rect x="64" y="30" width="4" height="4" rx="1" />
                  <rect x="72" y="30" width="8" height="4" rx="1" />
                  <rect x="85" y="30" width="4" height="12" rx="1" />

                  <rect x="5" y="38" width="8" height="4" rx="1" />
                  <rect x="18" y="38" width="4" height="4" rx="1" />
                  <rect x="25" y="38" width="12" height="4" rx="1" fill="#F7A600" />
                  <rect x="42" y="38" width="4" height="4" rx="1" />
                  <rect x="64" y="38" width="16" height="4" rx="1" />

                  <rect x="5" y="46" width="4" height="8" rx="1" />
                  <rect x="14" y="46" width="12" height="4" rx="1" />
                  <rect x="30" y="46" width="4" height="4" rx="1" />
                  <rect x="64" y="46" width="4" height="8" rx="1" />
                  <rect x="72" y="46" width="12" height="4" rx="1" />
                  <rect x="88" y="46" width="4" height="4" rx="1" />

                  <rect x="30" y="54" width="8" height="4" rx="1" />
                  <rect x="42" y="54" width="4" height="12" rx="1" fill="#F7A600" />
                  <rect x="50" y="54" width="12" height="4" rx="1" />
                  <rect x="68" y="54" width="16" height="4" rx="1" />
                  <rect x="88" y="54" width="4" height="12" rx="1" />

                  <rect x="30" y="62" width="4" height="4" rx="1" />
                  <rect x="50" y="62" width="16" height="4" rx="1" />
                  <rect x="72" y="62" width="8" height="4" rx="1" />

                  <rect x="30" y="70" width="12" height="4" rx="1" />
                  <rect x="46" y="70" width="4" height="4" rx="1" />
                  <rect x="55" y="70" width="8" height="4" rx="1" fill="#4B2E20" />
                  <rect x="68" y="70" width="4" height="12" rx="1" />
                  <rect x="76" y="70" width="12" height="4" rx="1" />

                  <rect x="30" y="78" width="4" height="16" rx="1" />
                  <rect x="38" y="78" width="12" height="4" rx="1" />
                  <rect x="54" y="78" width="4" height="4" rx="1" />
                  <rect x="80" y="78" width="4" height="16" rx="1" />
                  <rect x="88" y="78" width="8" height="4" rx="1" />

                  <rect x="38" y="86" width="4" height="4" rx="1" fill="#F7A600" />
                  <rect x="46" y="86" width="16" height="4" rx="1" />
                  <rect x="66" y="86" width="8" height="4" rx="1" />
                  <rect x="88" y="86" width="8" height="4" rx="1" />

                  <rect x="42" y="92" width="8" height="4" rx="1" />
                  <rect x="55" y="92" width="12" height="4" rx="1" />
                  <rect x="72" y="92" width="4" height="4" rx="1" fill="#F7A600" />
                </g>

                {/* Centered fire logo emblem matching brand style */}
                <rect x="40" y="40" width="20" height="20" rx="5" fill="#FFFFFF" stroke="#4B2E20" strokeWidth="1" />
                <text x="50" y="54" fontFamily="system-ui" fontSize="11" textAnchor="middle" fontWeight="900" fill="#F7A600">🔥</text>
              </svg>
            )}

            <span className="text-[10px] text-neutral-400 dark:text-neutral-500 mt-2">
              Auténtico y Exclusivo de {brandInfo.name}
            </span>
          </div>

          {/* Description / Instruction */}
          <div className="space-y-3">
            <div className="flex items-center justify-center space-x-2 text-brand-brown dark:text-amber-200">
              <Smartphone className="w-5 h-5 animate-pulse" />
              <span className="font-display font-bold text-sm">Escanea para pedir desde tu mesa</span>
            </div>
            <p className="font-sans text-xs text-neutral-500 dark:text-neutral-300 leading-relaxed px-2">
              Comparte este código con tus amigos o familiares en la mesa para que todos puedan abrir el menú digital premium al instante.
            </p>
          </div>

          {/* Share / Copy URL section */}
          <div className="flex items-center space-x-2 bg-neutral-100 dark:bg-neutral-800 p-2 rounded-2xl">
            <input
              type="text"
              readOnly
              value={currentUrl}
              className="flex-1 bg-transparent border-none text-xs font-mono text-neutral-600 dark:text-neutral-300 focus:ring-0 outline-none select-all truncate pl-2"
            />
            <button
              onClick={handleCopy}
              className="p-2.5 rounded-xl bg-white dark:bg-neutral-700 hover:bg-amber-100 dark:hover:bg-neutral-600 text-brand-brown dark:text-brand-yellow transition-all duration-200 shrink-0 flex items-center justify-center cursor-pointer"
              title="Copiar Enlace"
              id="qr-copy-link-btn"
            >
              {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>

          {/* Close action */}
          <button
            onClick={onClose}
            className="w-full py-3 rounded-2xl bg-brand-brown hover:bg-brand-brown-light text-white font-display font-bold text-sm transition-all duration-200 cursor-pointer"
            id="qr-modal-close-btn"
          >
            Listo, volver al Menú
          </button>

        </motion.div>
      </div>
    </AnimatePresence>
  );
};
