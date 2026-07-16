import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Plus, Flame, Sparkles, CheckCircle } from 'lucide-react';
import { Product } from '../types';
import { formatPrice } from './ProductCard';

interface ProductDetailsModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product) => void;
}

export const ProductDetailsModal: React.FC<ProductDetailsModalProps> = ({
  product,
  onClose,
  onAddToCart,
}) => {
  if (!product) return null;

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
          className="relative w-full max-w-lg overflow-hidden rounded-3xl bg-white dark:bg-neutral-800 shadow-2xl border border-neutral-200/10 z-10 max-h-[90vh] flex flex-col"
          id={`product-details-modal-${product.id}`}
        >
          {/* Header with image */}
          <div className="relative aspect-[16:10] bg-neutral-100 dark:bg-neutral-900 overflow-hidden shrink-0">
            <img
              src={product.image}
              alt={product.name}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center"
            />
            
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-full bg-neutral-950/60 hover:bg-neutral-950/80 text-white backdrop-blur-sm transition-all duration-200 cursor-pointer"
              title="Cerrar"
              id="close-details-modal-btn"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Badges */}
            <div className="absolute bottom-4 left-4 flex gap-2">
              {product.isNew && (
                <span className="inline-flex items-center space-x-1 px-3 py-1 rounded-full bg-brand-yellow text-brand-brown font-display font-extrabold text-[10px] uppercase tracking-wider shadow">
                  <Sparkles className="w-3 h-3" />
                  <span>Nuevo</span>
                </span>
              )}
              {product.isPopular && (
                <span className="inline-flex items-center space-x-1 px-3 py-1 rounded-full bg-brand-brown text-white font-display font-extrabold text-[10px] uppercase tracking-wider shadow">
                  <Flame className="w-3 h-3 text-brand-yellow" />
                  <span>Popular</span>
                </span>
              )}
            </div>
          </div>

          {/* Body contents (scrollable if needed) */}
          <div className="p-6 overflow-y-auto space-y-6 flex-1">
            <div className="space-y-2">
              <div className="flex items-start justify-between gap-4">
                <h2 className="font-display font-extrabold text-2xl text-neutral-900 dark:text-neutral-50 leading-tight">
                  {product.name}
                </h2>
                <span className="font-mono font-black text-xl text-brand-brown dark:text-brand-yellow shrink-0">
                  {formatPrice(product.price)}
                </span>
              </div>
              <p className="font-sans text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Ingredients Section (Optional) */}
            {product.ingredients && product.ingredients.length > 0 && (
              <div className="space-y-3">
                <h3 className="font-display font-bold text-sm text-neutral-800 dark:text-amber-200 uppercase tracking-wider">
                  Ingredientes Incluidos:
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {product.ingredients.map((ingredient, idx) => (
                    <div
                      key={idx}
                      className="flex items-center space-x-2 text-sm text-neutral-700 dark:text-neutral-300"
                    >
                      <CheckCircle className="w-4 h-4 text-brand-yellow shrink-0" />
                      <span className="font-sans font-medium">{ingredient}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Branding details */}
            <div className="p-4 rounded-2xl bg-amber-500/5 border border-amber-500/10 text-xs text-neutral-500 dark:text-amber-200/60 leading-relaxed">
              * Preparado de forma artesanal al momento del pedido. Puede solicitar retirar algún ingrediente especificándolo al momento de enviar su pedido por WhatsApp.
            </div>
          </div>

          {/* Footer with checkout action */}
          <div className="p-6 border-t border-neutral-100 dark:border-neutral-700/50 bg-neutral-50 dark:bg-neutral-850 shrink-0 flex items-center justify-between gap-4">
            <button
              onClick={onClose}
              className="px-5 py-3 rounded-2xl font-display font-bold text-sm text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-750 transition-colors duration-200 cursor-pointer"
              id="details-cancel-btn"
            >
              Cerrar
            </button>
            <button
              onClick={() => {
                onAddToCart(product);
                onClose();
              }}
              className="flex-1 px-6 py-3 rounded-2xl bg-brand-yellow hover:bg-amber-500 text-brand-brown font-display font-extrabold text-sm sm:text-base shadow-lg shadow-brand-yellow/10 hover:shadow-brand-yellow/30 transition-all duration-200 flex items-center justify-center space-x-2 cursor-pointer"
              id="details-add-to-order-btn"
            >
              <Plus className="w-5 h-5" />
              <span>Agregar al Pedido</span>
            </button>
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
};
