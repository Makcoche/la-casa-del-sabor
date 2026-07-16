import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Plus, Minus, Trash2, ShoppingBag, MessageCircle } from 'lucide-react';
import { CartItem } from '../types';
import { formatPrice } from './ProductCard';
import { BRAND_INFO } from '../data';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (productId: string, delta: number) => void;
  onRemoveItem: (productId: string) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
}) => {
  if (!isOpen) return null;

  // Calculate Subtotal & Total
  const total = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

  // Generate WhatsApp text message in requested format
  const handleWhatsAppCheckout = () => {
    if (cartItems.length === 0) return;

    let itemsText = '';
    cartItems.forEach((item) => {
      itemsText += `• ${item.product.name} x${item.quantity}\n`;
    });

    const message = `Hola 👋\n\nQuiero realizar el siguiente pedido:\n\n${itemsText}\nTotal: ${formatPrice(total)}`;
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${BRAND_INFO.phone.replace('+', '')}?text=${encodedMessage}`;

    window.open(whatsappUrl, '_blank');
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-hidden">
        
        {/* Backdrop glass cover */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-neutral-950/60 backdrop-blur-xs transition-opacity"
        />

        {/* Drawer container */}
        <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.35, ease: 'easeOut' }}
            className="w-screen max-w-md bg-white dark:bg-neutral-800 shadow-2xl border-l border-neutral-200/10 flex flex-col h-full"
            id="shopping-cart-drawer"
          >
            {/* Header */}
            <div className="p-6 border-b border-neutral-100 dark:border-neutral-700/50 flex items-center justify-between bg-neutral-50 dark:bg-neutral-850 shrink-0">
              <div className="flex items-center space-x-2.5">
                <ShoppingBag className="w-5 h-5 text-brand-yellow" />
                <h2 className="font-display font-extrabold text-lg text-neutral-900 dark:text-neutral-50">
                  Mi Pedido
                </h2>
                {cartItems.length > 0 && (
                  <span className="bg-brand-yellow/20 text-amber-800 dark:text-brand-yellow text-xs font-bold px-2 py-0.5 rounded-full">
                    {cartItems.reduce((acc, item) => acc + item.quantity, 0)}
                  </span>
                )}
              </div>
              <button
                onClick={onClose}
                className="p-1.5 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-750 text-neutral-500 dark:text-neutral-400 cursor-pointer"
                id="close-cart-drawer-btn"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable List */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {cartItems.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center space-y-4 py-12">
                  <div className="w-16 h-16 rounded-full bg-amber-500/10 flex items-center justify-center text-brand-yellow">
                    <ShoppingBag className="w-8 h-8" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-display font-bold text-base text-neutral-800 dark:text-neutral-200">
                      Tu pedido está vacío
                    </h3>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400 max-w-xs font-sans">
                      Explora el menú y agrega deliciosas arepas u otros platos para iniciar tu compra.
                    </p>
                  </div>
                  <button
                    onClick={onClose}
                    className="px-5 py-2 rounded-full bg-amber-100 dark:bg-neutral-700 hover:bg-brand-yellow hover:text-brand-brown text-brand-brown dark:text-brand-yellow font-display font-bold text-xs transition-colors duration-200 cursor-pointer"
                    id="empty-cart-explore-btn"
                  >
                    Volver a Explorar
                  </button>
                </div>
              ) : (
                <div className="divide-y divide-neutral-100 dark:divide-neutral-700/50">
                  {cartItems.map((item) => (
                    <div
                      key={item.product.id}
                      className="py-4 first:pt-0 last:pb-0 flex items-center justify-between gap-4"
                      id={`cart-item-${item.product.id}`}
                    >
                      {/* Product thumbnail */}
                      <div className="w-16 h-16 rounded-xl overflow-hidden bg-neutral-100 dark:bg-neutral-900 shrink-0 border border-neutral-200/20">
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover object-center"
                        />
                      </div>

                      {/* Product details */}
                      <div className="flex-1 min-w-0">
                        <h4 className="font-display font-bold text-sm text-neutral-900 dark:text-neutral-50 truncate">
                          {item.product.name}
                        </h4>
                        <p className="font-mono text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
                          {formatPrice(item.product.price)}
                        </p>
                      </div>

                      {/* Quantity editors */}
                      <div className="flex items-center space-x-2.5 shrink-0">
                        <div className="flex items-center bg-neutral-100 dark:bg-neutral-750 rounded-xl px-1.5 py-1 border border-neutral-200/5">
                          <button
                            onClick={() => onUpdateQuantity(item.product.id, -1)}
                            className="p-1 rounded-lg hover:bg-white dark:hover:bg-neutral-600 text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 cursor-pointer"
                            id={`cart-decrement-${item.product.id}`}
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="font-mono font-bold text-xs px-2.5 text-neutral-800 dark:text-neutral-200">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => onUpdateQuantity(item.product.id, 1)}
                            className="p-1 rounded-lg hover:bg-white dark:hover:bg-neutral-600 text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 cursor-pointer"
                            id={`cart-increment-${item.product.id}`}
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        {/* Remove item button */}
                        <button
                          onClick={() => onRemoveItem(item.product.id)}
                          className="p-2 rounded-xl text-neutral-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors duration-200 cursor-pointer"
                          title="Eliminar producto"
                          id={`cart-remove-${item.product.id}`}
                        >
                          <Trash2 className="w-4.5 h-4.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer Summary & Checkout */}
            {cartItems.length > 0 && (
              <div className="p-6 border-t border-neutral-100 dark:border-neutral-700/50 bg-neutral-50 dark:bg-neutral-850 shrink-0 space-y-4">
                <div className="space-y-1.5">
                  <div className="flex justify-between items-center text-sm text-neutral-500 dark:text-neutral-400">
                    <span>Subtotal</span>
                    <span className="font-mono">{formatPrice(total)}</span>
                  </div>
                  <div className="flex justify-between items-center text-base font-display font-extrabold text-neutral-900 dark:text-neutral-50">
                    <span>Total del Pedido</span>
                    <span className="font-mono text-brand-brown dark:text-brand-yellow text-lg">
                      {formatPrice(total)}
                    </span>
                  </div>
                </div>

                <button
                  onClick={handleWhatsAppCheckout}
                  className="w-full py-4 rounded-2xl bg-green-600 hover:bg-green-700 active:bg-green-800 text-white font-display font-extrabold text-base shadow-lg shadow-green-600/10 hover:shadow-green-600/30 transition-all duration-200 flex items-center justify-center space-x-2.5 cursor-pointer"
                  id="whatsapp-checkout-btn"
                >
                  <MessageCircle className="w-5 h-5 fill-current" />
                  <span>Realizar Pedido por WhatsApp</span>
                </button>

                <p className="text-[11px] text-center text-neutral-500 dark:text-neutral-400">
                  Se generará una plantilla de mensaje automática para enviar al WhatsApp: <br className="hidden sm:block" />
                  <span className="font-semibold text-neutral-700 dark:text-neutral-300">{BRAND_INFO.whatsapp}</span>
                </p>
              </div>
            )}

          </motion.div>
        </div>

      </div>
    </AnimatePresence>
  );
};
