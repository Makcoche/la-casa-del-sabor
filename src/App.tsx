import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Filter, MessageCircle, Phone, ArrowUp, SlidersHorizontal, Sparkles, Flame, Coins, RotateCcw } from 'lucide-react';

import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { CategorySelector } from './components/CategorySelector';
import { ProductCard, formatPrice } from './components/ProductCard';
import { ProductDetailsModal } from './components/ProductDetailsModal';
import { CartDrawer } from './components/CartDrawer';
import { WhyChooseUs } from './components/WhyChooseUs';
import { TestimonialsCarousel } from './components/TestimonialsCarousel';
import { PromoSection } from './components/PromoSection';
import { QRCodeModal } from './components/QRCodeModal';
import { Footer } from './components/Footer';

import { PRODUCTS, BRAND_INFO, CATEGORIES } from './data';
import { Product, CartItem, CategoryId, BrandInfo } from './types';
import { AdminDashboard } from './components/AdminDashboard';

export default function App() {
  // Theme state
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    const saved = localStorage.getItem('darkMode');
    if (saved !== null) {
      return saved === 'true';
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  // Dynamic brand state with LocalStorage persistence
  const [brandInfo, setBrandInfo] = useState<BrandInfo>(() => {
    const saved = localStorage.getItem('brandInfo');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Error reading brandInfo from localStorage:', e);
      }
    }
    return BRAND_INFO;
  });

  // Sync brandInfo to localStorage
  useEffect(() => {
    localStorage.setItem('brandInfo', JSON.stringify(brandInfo));
  }, [brandInfo]);

  // Cart state
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('cart');
    return saved ? JSON.parse(saved) : [];
  });

  // Dynamic products state with LocalStorage persistence
  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('products');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Error reading products from localStorage:', e);
      }
    }
    return PRODUCTS;
  });

  const [isAdminOpen, setIsAdminOpen] = useState<boolean>(false);

  // Sync products state to localStorage
  useEffect(() => {
    localStorage.setItem('products', JSON.stringify(products));
  }, [products]);

  // Category and navigation states
  const [selectedCategory, setSelectedCategory] = useState<CategoryId | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  
  // Sort and filter states
  const [sortBy, setSortBy] = useState<string>('default'); // 'default', 'price-asc', 'price-desc', 'popular', 'new'
  const [maxPrice, setMaxPrice] = useState<number>(30000); // Max possible is 30k COP

  // Dialog / Panel visibility states
  const [activeDetailsProduct, setActiveDetailsProduct] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isQROpen, setIsQROpen] = useState<boolean>(false);
  const [showScrollTop, setShowScrollTop] = useState<boolean>(false);

  const menuSectionRef = useRef<HTMLDivElement>(null);

  // Sync dark mode class on HTML document
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('darkMode', String(isDarkMode));
  }, [isDarkMode]);

  // Sync cart to localStorage
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  // Handle scroll position for back to top visibility
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);

  // Scroll smoothly to menu category section
  const handleScrollToMenu = () => {
    if (menuSectionRef.current) {
      const offset = 100; // Account for sticky header
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = menuSectionRef.current.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  // Cart operations
  const handleAddToCart = (product: Product) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
    
    // Provide nice feedback by pulsing or opening cart
    // We open cart on desktop, but on mobile we just let the badge bounce
    if (window.innerWidth >= 1024) {
      setIsCartOpen(true);
    }
  };

  const handleUpdateQuantity = (productId: string, delta: number) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.product.id === productId);
      if (!existing) return prev;
      
      const nextQty = existing.quantity + delta;
      if (nextQty <= 0) {
        return prev.filter((item) => item.product.id !== productId);
      }
      
      return prev.map((item) =>
        item.product.id === productId
          ? { ...item, quantity: nextQty }
          : item
      );
    });
  };

  const handleRemoveItem = (productId: string) => {
    setCartItems((prev) => prev.filter((item) => item.product.id !== productId));
  };

  // Filter and Sort core logic
  const filteredProducts = products.filter((product) => {
    // 1. Category filter
    if (selectedCategory !== 'all' && product.category !== selectedCategory) {
      return false;
    }

    // 2. Search filter (matches name, description, ingredients)
    if (searchQuery.trim() !== '') {
      const query = searchQuery.toLowerCase();
      const matchesName = product.name.toLowerCase().includes(query);
      const matchesDesc = product.description.toLowerCase().includes(query);
      const matchesIngredients = product.ingredients?.some(ing => ing.toLowerCase().includes(query)) || false;
      const matchesCategory = product.category.toLowerCase().includes(query);

      if (!matchesName && !matchesDesc && !matchesIngredients && !matchesCategory) {
        return false;
      }
    }

    // 3. Price filter
    if (product.price > maxPrice) {
      return false;
    }

    return true;
  }).sort((a, b) => {
    if (sortBy === 'price-asc') {
      return a.price - b.price;
    }
    if (sortBy === 'price-desc') {
      return b.price - a.price;
    }
    if (sortBy === 'new') {
      return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
    }
    if (sortBy === 'popular') {
      return (b.isPopular ? 1 : 0) - (a.isPopular ? 1 : 0);
    }
    return 0; // default order
  });

  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="min-h-screen font-sans bg-amber-50/20 dark:bg-gradient-warm transition-colors duration-300 flex flex-col text-neutral-800 dark:text-neutral-100">
      
      {/* Dynamic Header Component */}
      <Header
        brandInfo={brandInfo}
        isDarkMode={isDarkMode}
        toggleDarkMode={toggleDarkMode}
        cartCount={cartCount}
        openCart={() => setIsCartOpen(true)}
        openQR={() => setIsQROpen(true)}
        openAdmin={() => setIsAdminOpen(true)}
      />

      {/* Spectacular Hero Section */}
      <Hero brandInfo={brandInfo} onScrollToMenu={handleScrollToMenu} />

      {/* Weekly promotions highlighted inside custom responsive container */}
      <PromoSection
        onAddToCart={handleAddToCart}
        onViewProductDetails={(product) => setActiveDetailsProduct(product)}
      />

      {/* Main menu navigation section */}
      <div ref={menuSectionRef} className="scroll-mt-20">
        
        {/* Horizontal Category Select Ribbon */}
        <CategorySelector
          selectedCategory={selectedCategory}
          onSelectCategory={(cat) => {
            setSelectedCategory(cat);
            // Reset searches or handle transition smoothly
          }}
        />

        {/* Search, Filter Controls & Products display wrapper */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Sidebar with Search and Filters on Desktop (Top area on Mobile) */}
            <div className="lg:col-span-3 space-y-6 bg-white/80 dark:bg-white/5 dark:backdrop-blur-md p-6 rounded-3xl border border-amber-950/10 dark:border-white/10 shadow-lg dark:shadow-[0_8px_32px_rgba(0,0,0,0.3)] sticky top-[180px] z-20">
              
              <div className="flex items-center space-x-2 pb-2 border-b border-neutral-100 dark:border-white/10">
                <SlidersHorizontal className="w-5 h-5 text-brand-yellow" />
                <h3 className="font-display font-bold text-base text-neutral-900 dark:text-neutral-50">
                  Filtros de Búsqueda
                </h3>
              </div>

              {/* Real-time search bar */}
              <div className="space-y-2">
                <label className="text-xs font-display font-extrabold tracking-wider text-neutral-400 dark:text-neutral-500 uppercase">
                  Buscador en tiempo real
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="¿Qué te provoca hoy?..."
                    className="w-full pl-10 pr-4 py-3 rounded-2xl bg-amber-50/50 dark:bg-white/5 text-sm border border-neutral-200 dark:border-white/10 text-neutral-800 dark:text-neutral-100 focus:outline-none focus:border-brand-yellow focus:ring-2 focus:ring-brand-yellow/10 transition-all duration-200"
                    id="search-input-box"
                  />
                  <Search className="absolute left-3.5 top-3.5 w-4.5 h-4.5 text-neutral-400 dark:text-neutral-500" />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="absolute right-3 top-3 px-1 py-0.5 rounded bg-neutral-200 dark:bg-neutral-750 text-[10px] text-neutral-600 dark:text-neutral-300 font-bold"
                      title="Limpiar"
                    >
                      X
                    </button>
                  )}
                </div>
              </div>

              {/* Sorting filters */}
              <div className="space-y-2">
                <label className="text-xs font-display font-extrabold tracking-wider text-neutral-400 dark:text-neutral-500 uppercase">
                  Ordenar por
                </label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full p-3 rounded-2xl bg-amber-50/50 dark:bg-[#2A2A2A] text-sm border border-neutral-200 dark:border-white/10 text-neutral-800 dark:text-neutral-100 focus:outline-none focus:border-brand-yellow transition-all duration-200 cursor-pointer"
                  id="sort-select-box"
                >
                  <option value="default">Recomendado</option>
                  <option value="price-asc">Precio: de Menor a Mayor</option>
                  <option value="price-desc">Precio: de Mayor a Menor</option>
                  <option value="popular">Más vendidos / Popularidad</option>
                  <option value="new">Novedades Primero</option>
                </select>
              </div>

              {/* Price Range Filter */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-display font-extrabold tracking-wider text-neutral-400 dark:text-neutral-500 uppercase">
                    Precio Máximo
                  </label>
                  <span className="font-mono text-xs font-bold text-brand-brown dark:text-brand-yellow">
                    {formatPrice(maxPrice)}
                  </span>
                </div>
                <input
                  type="range"
                  min="5000"
                  max="30000"
                  step="1000"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-full h-1.5 bg-neutral-200 dark:bg-neutral-700 rounded-lg appearance-none cursor-pointer accent-brand-yellow"
                  id="price-range-slider"
                />
                <div className="flex justify-between text-[10px] text-neutral-400 dark:text-neutral-500 font-mono">
                  <span>{formatPrice(5000)}</span>
                  <span>{formatPrice(30000)}</span>
                </div>
              </div>

              {/* Clear filters trigger */}
              {(selectedCategory !== 'all' || searchQuery !== '' || sortBy !== 'default' || maxPrice !== 30000) && (
                <button
                  onClick={() => {
                    setSelectedCategory('all');
                    setSearchQuery('');
                    setSortBy('default');
                    setMaxPrice(30000);
                  }}
                  className="w-full py-2.5 rounded-xl border border-dashed border-neutral-200 dark:border-white/10 hover:border-brand-yellow text-xs font-display font-bold text-neutral-500 hover:text-brand-yellow transition-all duration-200 flex items-center justify-center space-x-1.5 cursor-pointer"
                  id="reset-filters-btn"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Restablecer Filtros</span>
                </button>
              )}

            </div>

            {/* Products Listing Grid (Mobile adaptive layout) */}
            <div className="lg:col-span-9 space-y-6">
              
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <h3 className="font-display font-extrabold text-xl sm:text-2xl text-neutral-900 dark:text-neutral-50 leading-none">
                    {selectedCategory === 'all'
                      ? 'Nuestra Carta Completa'
                      : CATEGORIES.find((c) => c.id === selectedCategory)?.name || 'Platos'}
                  </h3>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400 font-sans">
                    Mostrando {filteredProducts.length} deliciosas opciones
                  </p>
                </div>
              </div>

              {/* No items fallback */}
              {filteredProducts.length === 0 ? (
                <div className="text-center py-16 bg-white dark:bg-neutral-800 rounded-3xl border border-dashed border-neutral-200 dark:border-neutral-700/50 p-8 space-y-4">
                  <div className="text-4xl">😔</div>
                  <div className="space-y-1">
                    <h4 className="font-display font-bold text-base text-neutral-800 dark:text-neutral-200">
                      No encontramos resultados
                    </h4>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400 max-w-sm mx-auto font-sans">
                      Intenta buscar con otros términos, ajustar el rango de precios o cambiar la categoría seleccionada.
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setMaxPrice(30000);
                      setSelectedCategory('all');
                    }}
                    className="px-5 py-2 rounded-full bg-amber-100 hover:bg-brand-yellow hover:text-brand-brown text-brand-brown font-display font-bold text-xs transition-colors duration-200 cursor-pointer"
                    id="no-results-reset-btn"
                  >
                    Ver Todo el Menú
                  </button>
                </div>
              ) : (
                <motion.div
                  layout
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                  id="products-grid-container"
                >
                  <AnimatePresence mode="popLayout">
                    {filteredProducts.map((product) => (
                      <ProductCard
                        key={product.id}
                        product={product}
                        onAddToCart={handleAddToCart}
                        onViewDetails={(prod) => setActiveDetailsProduct(prod)}
                      />
                    ))}
                  </AnimatePresence>
                </motion.div>
              )}

            </div>

          </div>
        </main>
      </div>

      {/* Decorative Brand Strength details */}
      <WhyChooseUs />

      {/* Testimonials and reviews carousel */}
      <TestimonialsCarousel />

      {/* Footer detailing maps directions and operations */}
      <Footer brandInfo={brandInfo} onScrollToTop={handleScrollToTop} />

      {/* Product Details Dialog Popup */}
      <ProductDetailsModal
        product={activeDetailsProduct}
        onClose={() => setActiveDetailsProduct(null)}
        onAddToCart={handleAddToCart}
      />

      {/* Shopping Cart Slider Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
      />

      {/* QR Code Sharing Dialog */}
      <QRCodeModal
        brandInfo={brandInfo}
        isOpen={isQROpen}
        onClose={() => setIsQROpen(false)}
      />

      {/* Admin Panel Overlay */}
      <AnimatePresence>
        {isAdminOpen && (
          <AdminDashboard
            products={products}
            onAddProduct={(newProd) => setProducts([...products, newProd])}
            onUpdateProduct={(updatedProd) => setProducts(products.map(p => p.id === updatedProd.id ? updatedProd : p))}
            onDeleteProduct={(id) => setProducts(products.filter(p => p.id !== id))}
            onRestoreDefaults={() => setProducts(PRODUCTS)}
            brandInfo={brandInfo}
            onUpdateBrand={setBrandInfo}
            onRestoreBrand={() => setBrandInfo(BRAND_INFO)}
            onClose={() => setIsAdminOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Floating Action Buttons Panel (Bottom Corner) */}
      <div className="fixed bottom-6 left-6 z-45 flex flex-col gap-3">
        {/* Call float button */}
        <motion.a
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          href={`tel:${brandInfo.phone}`}
          className="flex h-12 w-12 items-center justify-center rounded-full bg-amber-500 hover:bg-amber-600 text-white shadow-lg shadow-amber-500/20 hover:shadow-amber-500/40 hover:-translate-y-1 transition-all duration-300 cursor-pointer"
          title="Llamar para información"
          id="floating-call-btn"
        >
          <Phone className="w-5 h-5" />
        </motion.a>
      </div>

      <div className="fixed bottom-6 right-6 z-45 flex flex-col gap-3">
        {/* Scroll back up button */}
        <AnimatePresence>
          {showScrollTop && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 10 }}
              onClick={handleScrollToTop}
              className="flex h-12 w-12 items-center justify-center rounded-full bg-neutral-900 dark:bg-neutral-800 text-brand-yellow hover:bg-brand-brown hover:text-white border border-amber-500/20 shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer"
              title="Volver Arriba"
              id="floating-scrolltop-btn"
            >
              <ArrowUp className="w-5 h-5" />
            </motion.button>
          )}
        </AnimatePresence>

        {/* WhatsApp Float button */}
        <motion.a
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          href={`https://wa.me/${brandInfo.phone.replace('+', '').replace(/\s+/g, '')}?text=${encodeURIComponent(`Hola 👋, me comunico desde el menú digital de ${brandInfo.name} para realizar una consulta.`)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex h-14 w-14 items-center justify-center rounded-full bg-green-500 hover:bg-green-600 text-white shadow-xl shadow-green-500/20 hover:shadow-green-500/40 hover:-translate-y-1 transition-all duration-300 relative cursor-pointer"
          title="Enviar WhatsApp directo"
          id="floating-whatsapp-btn"
        >
          <MessageCircle className="w-7 h-7 fill-current" />
          <span className="absolute -top-1 -left-1 flex h-3.5 w-3.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-green-400"></span>
          </span>
        </motion.a>
      </div>

    </div>
  );
}
