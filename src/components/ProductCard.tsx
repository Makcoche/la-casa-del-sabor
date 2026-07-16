import React from 'react';
import { motion } from 'motion/react';
import { Plus, Eye, Flame, Sparkles } from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  onViewDetails: (product: Product) => void;
}

export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(price);
};

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onAddToCart,
  onViewDetails
}) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 15 }}
      transition={{ duration: 0.3 }}
      className="group relative flex flex-col justify-between overflow-hidden rounded-3xl premium-card bg-white dark:bg-white/5 dark:backdrop-blur-md border border-amber-950/10 dark:border-white/10 shadow-md dark:shadow-[0_8px_32px_rgba(0,0,0,0.35)] hover:border-brand-yellow/50 transition-all duration-300"
      id={`product-card-${product.id}`}
    >
      {/* Product Image Section */}
      <div className="relative overflow-hidden aspect-[4/3] bg-neutral-100 dark:bg-neutral-900/60">
        <img
          src={product.image}
          alt={product.name}
          referrerPolicy="no-referrer"
          loading="lazy"
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
        />

        {/* Gradient Overlay for card image */}
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/45 to-transparent pointer-events-none" />

        {/* Badges container */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          {product.isNew && (
            <span className="inline-flex items-center space-x-1 px-3 py-1 rounded-full bg-brand-yellow text-brand-brown font-display font-extrabold text-[11px] uppercase tracking-wider shadow-sm border border-white/20 animate-pulse">
              <Sparkles className="w-3 h-3" />
              <span>Nuevo</span>
            </span>
          )}
          {product.isPopular && (
            <span className="inline-flex items-center space-x-1 px-3 py-1 rounded-full bg-brand-brown dark:bg-amber-950/80 text-white font-display font-extrabold text-[11px] uppercase tracking-wider shadow-sm border border-amber-700/30">
              <Flame className="w-3 h-3 text-brand-yellow" />
              <span>Popular</span>
            </span>
          )}
        </div>

        {/* Quick view floating action */}
        <button
          onClick={() => onViewDetails(product)}
          className="absolute right-3 bottom-3 p-2.5 rounded-full bg-white/95 dark:bg-neutral-800/95 text-brand-brown dark:text-brand-yellow opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-md hover:scale-110 cursor-pointer hover:bg-white dark:hover:bg-neutral-700"
          title="Ver detalles del producto"
          id={`view-details-floating-${product.id}`}
        >
          <Eye className="w-4 h-4" />
        </button>
      </div>

      {/* Product Information Section */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-1.5">
          <div className="flex items-start justify-between">
            <h3 className="font-display font-bold text-base sm:text-lg text-neutral-900 dark:text-neutral-50 group-hover:text-brand-yellow transition-colors duration-200">
              {product.name}
            </h3>
            <span className="font-mono font-bold text-sm sm:text-base text-brand-brown dark:text-brand-yellow shrink-0 pl-2">
              {formatPrice(product.price)}
            </span>
          </div>
          <p className="font-sans text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 line-clamp-2">
            {product.description}
          </p>
        </div>

        {/* Actions panel */}
        <div className="flex items-center gap-2 pt-2">
          
          {/* Details button */}
          <button
            onClick={() => onViewDetails(product)}
            className="flex-1 px-3 py-2.5 rounded-xl text-xs font-display font-bold text-neutral-600 dark:text-neutral-300 hover:text-brand-brown dark:hover:text-brand-yellow bg-neutral-100 hover:bg-amber-100/60 dark:bg-white/10 dark:hover:bg-white/20 transition-all duration-200 flex items-center justify-center space-x-1 border border-neutral-200/10 cursor-pointer"
            id={`details-btn-${product.id}`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Detalles</span>
          </button>

          {/* Add to order button */}
          <button
            onClick={() => onAddToCart(product)}
            className="px-4 py-2.5 rounded-xl bg-brand-yellow hover:bg-amber-500 dark:bg-brand-yellow dark:hover:bg-amber-500 text-brand-brown font-display font-extrabold text-xs sm:text-sm shadow-md hover:shadow-lg hover:scale-[1.04] transition-all duration-200 flex items-center justify-center space-x-1.5 cursor-pointer"
            id={`add-to-cart-btn-${product.id}`}
          >
            <Plus className="w-4 h-4" />
            <span>Pedir</span>
          </button>

        </div>
      </div>
    </motion.div>
  );
};
