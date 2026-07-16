import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Plus, Edit2, Trash2, Save, X, Lock, Unlock, 
  ArrowLeft, RefreshCw, Sparkles, Flame, Coins, Eye, Check, AlertCircle,
  Upload, Layout, Image as ImageIcon, Smartphone, Clock, MapPin, Phone, MessageCircle,
  Instagram, Facebook
} from 'lucide-react';
import { Product, CategoryId, BrandInfo } from '../types';
import { CATEGORIES } from '../data';
import { formatPrice } from './ProductCard';

interface AdminDashboardProps {
  products: Product[];
  onAddProduct: (product: Product) => void;
  onUpdateProduct: (product: Product) => void;
  onDeleteProduct: (productId: string) => void;
  onRestoreDefaults: () => void;
  brandInfo: BrandInfo;
  onUpdateBrand: (brand: BrandInfo) => void;
  onRestoreBrand: () => void;
  onClose: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  products,
  onAddProduct,
  onUpdateProduct,
  onDeleteProduct,
  onRestoreDefaults,
  brandInfo,
  onUpdateBrand,
  onRestoreBrand,
  onClose,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [passcode, setPasscode] = useState<string>('');
  const [passcodeError, setPasscodeError] = useState<string | null>(null);

  // Active Tab state
  const [activeTab, setActiveTab] = useState<'products' | 'brand'>('products');

  // Brand fields state
  const [brandName, setBrandName] = useState(brandInfo.name);
  const [brandSlogan, setBrandSlogan] = useState(brandInfo.slogan);
  const [brandPhone, setBrandPhone] = useState(brandInfo.phone);
  const [brandAddress, setBrandAddress] = useState(brandInfo.address);
  const [brandHours, setBrandHours] = useState(brandInfo.hours);
  const [brandInstagram, setBrandInstagram] = useState(brandInfo.instagram || '');
  const [brandFacebook, setBrandFacebook] = useState(brandInfo.facebook || '');
  const [brandLogo, setBrandLogo] = useState(brandInfo.logoUrl || '');
  const [brandBanner, setBrandBanner] = useState(brandInfo.bannerUrl || '');
  const [brandQR, setBrandQR] = useState(brandInfo.qrUrl || '');

  const [brandSavedMessage, setBrandSavedMessage] = useState<string | null>(null);

  // Sync brand fields state whenever brandInfo prop changes
  React.useEffect(() => {
    setBrandName(brandInfo.name);
    setBrandSlogan(brandInfo.slogan);
    setBrandPhone(brandInfo.phone);
    setBrandAddress(brandInfo.address);
    setBrandHours(brandInfo.hours);
    setBrandInstagram(brandInfo.instagram || '');
    setBrandFacebook(brandInfo.facebook || '');
    setBrandLogo(brandInfo.logoUrl || '');
    setBrandBanner(brandInfo.bannerUrl || '');
    setBrandQR(brandInfo.qrUrl || '');
  }, [brandInfo]);

  // Form states
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isAddingNew, setIsAddingNew] = useState<boolean>(false);

  // Form input fields
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState<number>(15000);
  const [category, setCategory] = useState<CategoryId>('clasicas');
  const [image, setImage] = useState('');
  const [isPopular, setIsPopular] = useState(false);
  const [isNew, setIsNew] = useState(false);
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [newIngredient, setNewIngredient] = useState('');

  // Local image upload state
  const [isDragging, setIsDragging] = useState(false);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcode === 'admin123' || passcode === 'admin') {
      setIsAuthenticated(true);
      setPasscodeError(null);
    } else {
      setPasscodeError('Contraseña incorrecta. Pista: admin123');
    }
  };

  const startEdit = (prod: Product) => {
    setEditingProduct(prod);
    setIsAddingNew(false);
    setName(prod.name);
    setDescription(prod.description);
    setPrice(prod.price);
    setCategory(prod.category);
    setImage(prod.image);
    setIsPopular(!!prod.isPopular);
    setIsNew(!!prod.isNew);
    setIngredients(prod.ingredients || []);
    setNewIngredient('');
  };

  const startAddNew = () => {
    setIsAddingNew(true);
    setEditingProduct(null);
    setName('');
    setDescription('');
    setPrice(18000);
    setCategory('clasicas');
    setImage('/src/assets/images/arepa_explosiva_1784216468842.jpg'); // placeholder
    setIsPopular(false);
    setIsNew(true);
    setIngredients([]);
    setNewIngredient('');
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !description.trim() || price < 0) return;

    const targetImage = image.trim() || 'https://images.unsplash.com/photo-1541518763669-27fef04b14ea?auto=format&fit=crop&q=80&w=600';

    if (editingProduct) {
      onUpdateProduct({
        ...editingProduct,
        name: name.trim(),
        description: description.trim(),
        price,
        category,
        image: targetImage,
        isPopular,
        isNew,
        ingredients: ingredients.filter(i => i.trim() !== '')
      });
      setEditingProduct(null);
    } else if (isAddingNew) {
      onAddProduct({
        id: `arepa_custom_${Date.now()}`,
        name: name.trim(),
        description: description.trim(),
        price,
        category,
        image: targetImage,
        isPopular,
        isNew,
        ingredients: ingredients.filter(i => i.trim() !== '')
      });
      setIsAddingNew(false);
    }
  };

  const handleAddIngredient = () => {
    if (newIngredient.trim()) {
      setIngredients([...ingredients, newIngredient.trim()]);
      setNewIngredient('');
    }
  };

  const handleRemoveIngredient = (index: number) => {
    setIngredients(ingredients.filter((_, idx) => idx !== index));
  };

  return (
    <div className="fixed inset-0 z-50 bg-neutral-950/90 backdrop-blur-md overflow-y-auto min-h-screen py-10 px-4 sm:px-6 flex items-center justify-center">
      
      {/* 1. PASSCODE SCREEN */}
      {!isAuthenticated ? (
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-md p-8 rounded-3xl glass border border-white/10 text-white text-center space-y-6"
        >
          <div className="mx-auto w-16 h-16 rounded-full bg-brand-yellow/10 flex items-center justify-center text-brand-yellow">
            <Lock className="w-8 h-8" />
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-display font-extrabold tracking-tight">Panel de Administrador</h2>
            <p className="text-xs text-neutral-400">Ingresa la contraseña para configurar el menú digital</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <input
                type="password"
                placeholder="Ingresa contraseña (pista: admin123)"
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm outline-none text-center focus:border-brand-yellow tracking-widest"
                autoFocus
              />
              {passcodeError && (
                <p className="text-[11px] text-red-400 font-medium flex items-center justify-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  {passcodeError}
                </p>
              )}
            </div>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 bg-white/5 hover:bg-white/10 text-white py-3 rounded-xl text-xs font-bold transition"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="flex-1 bg-brand-yellow hover:bg-amber-500 text-brand-brown py-3 rounded-xl text-xs font-extrabold transition shadow-lg shadow-brand-yellow/20"
              >
                Desbloquear
              </button>
            </div>
          </form>
        </motion.div>
      ) : (

        /* 2. MAIN BENTO ADMIN PANEL */
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-6xl flex flex-col space-y-6 text-white my-auto"
        >
          {/* Header */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-6 rounded-3xl glass border border-white/10">
            <div className="flex items-center gap-4">
              <button 
                onClick={onClose}
                className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-white transition-all cursor-pointer"
                title="Volver"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  <h1 className="text-xl font-display font-extrabold uppercase tracking-tight">Administrador de Sabor</h1>
                </div>
                <p className="text-xs text-neutral-400">Control de Arepas, Precios, Categorías y Rellenos</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {activeTab === 'products' ? (
                <>
                  <button
                    onClick={onRestoreDefaults}
                    className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-bold flex items-center gap-1.5 transition cursor-pointer border border-white/5"
                    title="Restablecer arepas por defecto"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>Restablecer Menú</span>
                  </button>

                  <button
                    onClick={startAddNew}
                    className="px-4 py-2.5 rounded-xl bg-brand-yellow hover:bg-amber-500 text-brand-brown text-xs font-extrabold flex items-center gap-1.5 transition cursor-pointer shadow-lg shadow-brand-yellow/10"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Nueva Arepa</span>
                  </button>
                </>
              ) : (
                <button
                  onClick={() => {
                    if (window.confirm('¿Estás seguro de restablecer la identidad de marca por defecto?')) {
                      onRestoreBrand();
                    }
                  }}
                  className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-red-500/25 text-red-300 hover:text-white text-xs font-bold flex items-center gap-1.5 transition cursor-pointer border border-white/5"
                  title="Restablecer marca por defecto"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Restablecer Identidad</span>
                </button>
              )}
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex bg-white/5 p-1 rounded-2xl border border-white/5 self-start">
            <button
              onClick={() => setActiveTab('products')}
              className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                activeTab === 'products'
                  ? 'bg-brand-yellow text-brand-brown shadow-lg font-extrabold'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              <Flame className="w-4 h-4" />
              <span>Menú de Arepas</span>
            </button>
            <button
              onClick={() => setActiveTab('brand')}
              className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                activeTab === 'brand'
                  ? 'bg-brand-yellow text-brand-brown shadow-lg font-extrabold'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              <Layout className="w-4 h-4" />
              <span>Personalizar Marca</span>
            </button>
          </div>

          {activeTab === 'products' ? (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              
              {/* Bento Grid Panel 1: Product List (Left/Col 7) */}
              <div className="lg:col-span-7 rounded-3xl glass border border-white/10 p-6 space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-white/5">
                  <h2 className="text-base font-display font-extrabold text-brand-yellow uppercase tracking-wider">
                    Arepas Registradas ({products.length})
                  </h2>
                  <span className="text-[10px] bg-white/10 px-2 py-0.5 rounded font-mono">Solo Arepas</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-[550px] overflow-y-auto pr-1 scroll-hide">
                  {products.map((prod) => (
                    <div 
                      key={prod.id}
                      className={`p-4 rounded-2xl border transition-all duration-300 flex flex-col justify-between space-y-4 ${
                        editingProduct?.id === prod.id 
                          ? 'bg-brand-yellow/10 border-brand-yellow/40 shadow-lg shadow-brand-yellow/5' 
                          : 'bg-white/5 border-white/5 hover:border-white/15'
                      }`}
                    >
                      <div className="flex gap-3">
                        <div className="w-12 h-12 rounded-xl overflow-hidden bg-neutral-900 shrink-0">
                          <img 
                            src={prod.image} 
                            alt={prod.name} 
                            className="w-full h-full object-cover" 
                            referrerPolicy="no-referrer"
                          />
                        </div>
                        <div className="space-y-1 min-w-0">
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <h3 className="text-sm font-bold truncate text-white">{prod.name}</h3>
                            {prod.isPopular && <Flame className="w-3.5 h-3.5 text-brand-yellow shrink-0 fill-current" />}
                            {prod.isNew && <span className="bg-red-500 text-white text-[8px] px-1.5 rounded font-extrabold uppercase shrink-0">New</span>}
                          </div>
                          <p className="text-[11px] text-neutral-400 line-clamp-2">{prod.description}</p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-2 border-t border-white/5">
                        <span className="font-mono text-xs font-bold text-brand-yellow">
                          {formatPrice(prod.price)}
                        </span>
                        <span className="text-[9px] uppercase tracking-wider text-neutral-400 bg-white/5 px-2 py-0.5 rounded">
                          {CATEGORIES.find(c => c.id === prod.category)?.name || prod.category}
                        </span>
                      </div>

                      {/* Actions */}
                      <div className="flex gap-2 pt-1">
                        <button
                          onClick={() => startEdit(prod)}
                          className="flex-1 py-1.5 rounded-lg bg-white/5 hover:bg-brand-yellow/15 hover:text-brand-yellow border border-white/5 text-[11px] font-bold flex items-center justify-center gap-1 transition cursor-pointer"
                        >
                          <Edit2 className="w-3 h-3" />
                          <span>Editar</span>
                        </button>
                        <button
                          onClick={() => onDeleteProduct(prod.id)}
                          className="p-1.5 rounded-lg bg-red-500/10 hover:bg-red-500 text-red-400 hover:text-white border border-red-500/20 text-[11px] font-bold flex items-center justify-center transition cursor-pointer"
                          title="Eliminar Arepa"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bento Grid Panel 2: Form (Right/Col 5) */}
              <div className="lg:col-span-5 rounded-3xl glass border border-white/10 p-6 space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-white/5">
                  <h2 className="text-base font-display font-extrabold text-brand-yellow uppercase tracking-wider">
                    {editingProduct ? 'Editar Arepa' : isAddingNew ? 'Añadir Nueva Arepa' : 'Detalle / Editor'}
                  </h2>
                  {editingProduct && (
                    <button 
                      onClick={() => setEditingProduct(null)}
                      className="p-1 rounded-full bg-white/10 hover:bg-white/20 text-neutral-300 transition"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                {!editingProduct && !isAddingNew ? (
                  <div className="text-center py-16 space-y-4 text-neutral-400">
                    <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mx-auto text-neutral-500">
                      <Sparkles className="w-6 h-6 animate-pulse" />
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs">Ninguna arepa seleccionada</p>
                      <p className="text-[10px] text-neutral-500">Haz clic en "Editar" en cualquier arepa o en "Nueva Arepa" arriba para empezar.</p>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSave} className="space-y-4">
                    {/* Arepa Name */}
                    <div className="space-y-1">
                      <label className="text-[10px] uppercase font-bold tracking-wider text-neutral-400">Nombre de la Arepa</label>
                      <input
                        type="text"
                        required
                        placeholder="Ej. La Llanera"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-xs outline-none focus:border-brand-yellow"
                      />
                    </div>

                    {/* Price and Category */}
                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <label className="text-[10px] uppercase font-bold tracking-wider text-neutral-400">Precio (COP)</label>
                        <input
                          type="number"
                          required
                          min="0"
                          step="any"
                          value={price}
                          onChange={(e) => setPrice(Number(e.target.value))}
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-xs outline-none focus:border-brand-yellow font-mono font-bold"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] uppercase font-bold tracking-wider text-neutral-400">Categoría</label>
                        <select
                          value={category}
                          onChange={(e) => setCategory(e.target.value as CategoryId)}
                          className="w-full bg-[#1E1E1E] border border-white/10 rounded-xl px-3 py-2.5 text-xs outline-none focus:border-brand-yellow cursor-pointer text-white"
                        >
                          {CATEGORIES.map(c => (
                            <option key={c.id} value={c.id}>{c.name}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Description */}
                    <div className="space-y-1">
                      <label className="text-[10px] uppercase font-bold tracking-wider text-neutral-400">Descripción / Sabores</label>
                      <textarea
                        required
                        rows={3}
                        placeholder="Describe la combinación de sabores y rellenos..."
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-xs outline-none focus:border-brand-yellow resize-none"
                      />
                    </div>

                    {/* Image Source & Upload */}
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase font-bold tracking-wider text-neutral-400">Imagen de la Arepa</label>
                      
                      {/* Drag and Drop Zone */}
                      <div
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}
                        className={`relative flex flex-col items-center justify-center border-2 border-dashed rounded-2xl p-4 transition-all duration-200 text-center ${
                          isDragging 
                            ? 'border-brand-yellow bg-brand-yellow/10' 
                            : 'border-white/10 bg-white/5 hover:border-white/20'
                        }`}
                      >
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageUpload}
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                          id="image-file-input"
                        />
                        
                        {image ? (
                          <div className="space-y-2">
                            <div className="w-16 h-16 rounded-xl overflow-hidden mx-auto bg-neutral-900 border border-white/10">
                              <img src={image} alt="Vista previa" className="w-full h-full object-cover" />
                            </div>
                            <p className="text-[10px] text-green-400 font-semibold">¡Imagen cargada correctamente!</p>
                            <p className="text-[9px] text-neutral-400">Arrastra o haz clic para cambiar</p>
                          </div>
                        ) : (
                          <div className="space-y-2">
                            <Upload className="w-6 h-6 text-neutral-400 mx-auto" />
                            <div>
                              <p className="text-[11px] font-bold text-neutral-200">Sube una imagen desde tu PC</p>
                              <p className="text-[9px] text-neutral-500">Arrastra y suelta tu archivo o haz clic aquí</p>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* URL Option input */}
                      <div className="space-y-1">
                        <span className="text-[9px] text-neutral-500 uppercase tracking-widest block text-center">O ingresa un enlace web</span>
                        <input
                          type="text"
                          placeholder={image.startsWith('data:') ? 'Imagen cargada desde el PC' : 'Introduce enlace de imagen o deja en blanco'}
                          value={image.startsWith('data:') ? '' : image}
                          onChange={(e) => setImage(e.target.value)}
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-xs outline-none focus:border-brand-yellow"
                        />
                      </div>
                    </div>

                    {/* Switches for badges */}
                    <div className="grid grid-cols-2 gap-3 bg-white/5 p-3 rounded-2xl border border-white/5">
                      <label className="flex items-center gap-2 cursor-pointer select-none">
                        <input
                          type="checkbox"
                          checked={isPopular}
                          onChange={(e) => setIsPopular(e.target.checked)}
                          className="rounded bg-white/10 border-white/10 text-brand-yellow focus:ring-0 w-4 h-4 cursor-pointer accent-brand-yellow"
                        />
                        <span className="text-xs font-bold text-neutral-300 flex items-center gap-1">
                          <Flame className="w-3.5 h-3.5 text-brand-yellow" />
                          Popular
                        </span>
                      </label>

                      <label className="flex items-center gap-2 cursor-pointer select-none">
                        <input
                          type="checkbox"
                          checked={isNew}
                          onChange={(e) => setIsNew(e.target.checked)}
                          className="rounded bg-white/10 border-white/10 text-brand-yellow focus:ring-0 w-4 h-4 cursor-pointer accent-brand-yellow"
                        />
                        <span className="text-xs font-bold text-neutral-300 flex items-center gap-1">
                          <Sparkles className="w-3.5 h-3.5 text-blue-400" />
                          Novedad
                        </span>
                      </label>
                    </div>

                    {/* Dynamic Ingredients Manager */}
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase font-bold tracking-wider text-neutral-400">Ingredientes / Rellenos</label>
                      
                      <div className="flex gap-2">
                        <input
                          type="text"
                          placeholder="Ej. Carne desmechada, Aguacate"
                          value={newIngredient}
                          onChange={(e) => setNewIngredient(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              e.preventDefault();
                              handleAddIngredient();
                            }
                          }}
                          className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-xs outline-none focus:border-brand-yellow"
                        />
                        <button
                          type="button"
                          onClick={handleAddIngredient}
                          className="px-3 rounded-xl bg-brand-yellow hover:bg-amber-500 text-brand-brown text-xs font-bold transition flex items-center justify-center cursor-pointer"
                        >
                          Añadir
                        </button>
                      </div>

                      <div className="flex flex-wrap gap-1.5 max-h-[100px] overflow-y-auto pt-1">
                        {ingredients.map((ing, idx) => (
                          <span 
                            key={idx}
                            className="inline-flex items-center gap-1 pl-2.5 pr-1.5 py-1 rounded-full bg-white/10 text-[10px] font-bold text-neutral-200 border border-white/5"
                          >
                            <span>{ing}</span>
                            <button
                              type="button"
                              onClick={() => handleRemoveIngredient(idx)}
                              className="p-0.5 rounded-full hover:bg-red-500 hover:text-white transition"
                            >
                              <X className="w-2.5 h-2.5" />
                            </button>
                          </span>
                        ))}
                        {ingredients.length === 0 && (
                          <p className="text-[10px] text-neutral-500 italic">No se han listado ingredientes específicos.</p>
                        )}
                      </div>
                    </div>

                    {/* Submit / Save actions */}
                    <div className="flex gap-2 pt-2 border-t border-white/5">
                      <button
                        type="button"
                        onClick={() => {
                          setEditingProduct(null);
                          setIsAddingNew(false);
                        }}
                        className="flex-1 bg-white/5 hover:bg-white/10 text-white py-2.5 rounded-xl text-xs font-bold transition cursor-pointer"
                      >
                        Cancelar
                      </button>
                      <button
                        type="submit"
                        className="flex-1 bg-brand-yellow hover:bg-amber-500 text-brand-brown py-2.5 rounded-xl text-xs font-extrabold transition flex items-center justify-center gap-1 cursor-pointer shadow-lg shadow-brand-yellow/10"
                      >
                        <Save className="w-3.5 h-3.5" />
                        <span>{editingProduct ? 'Guardar Cambios' : 'Añadir Arepa'}</span>
                      </button>
                    </div>
                  </form>
                )}
              </div>

            </div>
          ) : (
            /* BRAND IDENTITY CUSTOMIZER Tab Panel */
            <motion.form 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              onSubmit={(e) => {
                e.preventDefault();
                onUpdateBrand({
                  name: brandName,
                  slogan: brandSlogan,
                  phone: brandPhone,
                  address: brandAddress,
                  hours: brandHours,
                  instagram: brandInstagram,
                  facebook: brandFacebook,
                  logoUrl: brandLogo,
                  bannerUrl: brandBanner,
                  qrUrl: brandQR
                });
                setBrandSavedMessage('¡Identidad de marca guardada con éxito en tiempo real!');
                setTimeout(() => setBrandSavedMessage(null), 4000);
              }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start"
            >
              {/* Left Column: Information inputs */}
              <div className="lg:col-span-6 rounded-3xl glass border border-white/10 p-6 space-y-4">
                <div className="flex items-center gap-2 pb-3 border-b border-white/5">
                  <Layout className="w-5 h-5 text-brand-yellow" />
                  <h2 className="text-base font-display font-extrabold text-brand-yellow uppercase tracking-wider">
                    Información de la Marca y Footer
                  </h2>
                </div>

                {brandSavedMessage && (
                  <motion.div 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-3.5 rounded-xl bg-green-500/10 border border-green-500/20 text-green-300 text-xs font-bold flex items-center gap-2"
                  >
                    <Check className="w-4 h-4 text-green-400 shrink-0" />
                    <span>{brandSavedMessage}</span>
                  </motion.div>
                )}

                {/* Business Name */}
                <div className="space-y-1">
                  <label className="text-[10px] uppercase font-bold tracking-wider text-neutral-400 flex items-center gap-1">
                    <span>Nombre comercial del Restaurante</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={brandName}
                    onChange={(e) => setBrandName(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-xs outline-none focus:border-brand-yellow font-bold text-white"
                  />
                </div>

                {/* Slogan */}
                <div className="space-y-1">
                  <label className="text-[10px] uppercase font-bold tracking-wider text-neutral-400">Eslogan / Frase de Impacto</label>
                  <input
                    type="text"
                    required
                    value={brandSlogan}
                    onChange={(e) => setBrandSlogan(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-xs outline-none focus:border-brand-yellow text-neutral-200"
                  />
                </div>

                {/* Grid for hours & phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Hours */}
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase font-bold tracking-wider text-neutral-400 flex items-center gap-1">
                      <Clock className="w-3 h-3 text-brand-yellow" />
                      <span>Horario de Atención</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={brandHours}
                      onChange={(e) => setBrandHours(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-xs outline-none focus:border-brand-yellow text-white"
                      placeholder="Ej. Todos los días: 5:00 PM - 10:00 PM"
                    />
                  </div>

                  {/* Phone */}
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase font-bold tracking-wider text-neutral-400 flex items-center gap-1">
                      <Phone className="w-3 h-3 text-brand-yellow" />
                      <span>Teléfono / WhatsApp</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={brandPhone}
                      onChange={(e) => setBrandPhone(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-xs outline-none focus:border-brand-yellow text-white"
                      placeholder="Ej. +57 300 123 4567"
                    />
                  </div>
                </div>

                {/* Address */}
                <div className="space-y-1">
                  <label className="text-[10px] uppercase font-bold tracking-wider text-neutral-400 flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-brand-yellow" />
                    <span>Dirección Comercial (Sección Footer)</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={brandAddress}
                    onChange={(e) => setBrandAddress(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-xs outline-none focus:border-brand-yellow text-white"
                    placeholder="Ej. Apartadó, Antioquia"
                  />
                </div>

                {/* Social networks */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase font-bold tracking-wider text-neutral-400 flex items-center gap-1">
                      <Instagram className="w-3 h-3 text-pink-400" />
                      <span>Enlace Instagram</span>
                    </label>
                    <input
                      type="text"
                      value={brandInstagram}
                      onChange={(e) => setBrandInstagram(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-xs outline-none focus:border-brand-yellow text-neutral-300"
                      placeholder="https://instagram.com/tu_usuario"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] uppercase font-bold tracking-wider text-neutral-400 flex items-center gap-1">
                      <Facebook className="w-3 h-3 text-blue-400" />
                      <span>Enlace Facebook</span>
                    </label>
                    <input
                      type="text"
                      value={brandFacebook}
                      onChange={(e) => setBrandFacebook(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-xs outline-none focus:border-brand-yellow text-neutral-300"
                      placeholder="https://facebook.com/tu_pagina"
                    />
                  </div>
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  className="w-full py-3 mt-4 rounded-xl bg-brand-yellow hover:bg-amber-500 text-brand-brown font-display font-extrabold text-xs transition duration-200 shadow-lg shadow-brand-yellow/15 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Save className="w-4 h-4" />
                  <span>Guardar Identidad de Marca</span>
                </button>
              </div>

              {/* Right Column: Media uploads (Logo, Banner, QR) */}
              <div className="lg:col-span-6 rounded-3xl glass border border-white/10 p-6 space-y-6">
                <div className="flex items-center gap-2 pb-3 border-b border-white/5">
                  <ImageIcon className="w-5 h-5 text-brand-yellow" />
                  <h2 className="text-base font-display font-extrabold text-brand-yellow uppercase tracking-wider">
                    Multimedia de Marca (Arrastra tus archivos)
                  </h2>
                </div>

                {/* 1. Logo Custom Uploader */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <label className="text-[10px] uppercase font-bold tracking-wider text-neutral-300">Logotipo del Restaurante</label>
                    {brandLogo && (
                      <button
                        type="button"
                        onClick={() => setBrandLogo('')}
                        className="text-[9px] text-red-400 hover:underline cursor-pointer"
                      >
                        Quitar logotipo
                      </button>
                    )}
                  </div>

                  <div
                    onDragOver={(e) => { e.preventDefault(); }}
                    onDrop={(e) => {
                      e.preventDefault();
                      const file = e.dataTransfer.files?.[0];
                      if (file) {
                        const reader = new FileReader();
                        reader.onloadend = () => setBrandLogo(reader.result as string);
                        reader.readAsDataURL(file);
                      }
                    }}
                    className="relative flex flex-col items-center justify-center border border-dashed border-white/10 rounded-2xl p-4 bg-white/5 hover:border-white/20 transition-all text-center"
                  >
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          const reader = new FileReader();
                          reader.onloadend = () => setBrandLogo(reader.result as string);
                          reader.readAsDataURL(file);
                        }
                      }}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                    />

                    {brandLogo ? (
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl bg-white p-1 overflow-hidden shrink-0 shadow-md">
                          <img src={brandLogo} alt="Logo" className="w-full h-full object-contain" />
                        </div>
                        <div className="text-left">
                          <p className="text-[11px] font-bold text-green-400">¡Logo cargado correctamente!</p>
                          <p className="text-[9px] text-neutral-400">Arrastra otro archivo para cambiarlo</p>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-center gap-3">
                        <Upload className="w-5 h-5 text-neutral-400" />
                        <div className="text-left">
                          <p className="text-[11px] font-bold text-neutral-200">Arrastra tu logo aquí o haz clic</p>
                          <p className="text-[9px] text-neutral-500">Formato cuadrado recomendado</p>
                        </div>
                      </div>
                    )}
                  </div>

                  <input
                    type="text"
                    placeholder="O introduce la URL del Logo"
                    value={brandLogo.startsWith('data:') ? '' : brandLogo}
                    onChange={(e) => setBrandLogo(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-[11px] outline-none focus:border-brand-yellow text-neutral-300"
                  />
                </div>

                {/* 2. Banner Custom Uploader */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <label className="text-[10px] uppercase font-bold tracking-wider text-neutral-300">Banner / Portada Principal</label>
                    {brandBanner && (
                      <button
                        type="button"
                        onClick={() => setBrandBanner('')}
                        className="text-[9px] text-red-400 hover:underline cursor-pointer"
                      >
                        Quitar banner
                      </button>
                    )}
                  </div>

                  <div
                    onDragOver={(e) => { e.preventDefault(); }}
                    onDrop={(e) => {
                      e.preventDefault();
                      const file = e.dataTransfer.files?.[0];
                      if (file) {
                        const reader = new FileReader();
                        reader.onloadend = () => setBrandBanner(reader.result as string);
                        reader.readAsDataURL(file);
                      }
                    }}
                    className="relative flex flex-col items-center justify-center border border-dashed border-white/10 rounded-2xl p-4 bg-white/5 hover:border-white/20 transition-all text-center"
                  >
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          const reader = new FileReader();
                          reader.onloadend = () => setBrandBanner(reader.result as string);
                          reader.readAsDataURL(file);
                        }
                      }}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                    />

                    {brandBanner ? (
                      <div className="space-y-2 w-full">
                        <div className="h-16 w-full rounded-xl overflow-hidden bg-neutral-900 border border-white/10 shadow-md">
                          <img src={brandBanner} alt="Banner" className="w-full h-full object-cover" />
                        </div>
                        <p className="text-[10px] text-green-400 font-semibold text-center">¡Banner principal cargado!</p>
                      </div>
                    ) : (
                      <div className="flex items-center gap-3">
                        <Upload className="w-5 h-5 text-neutral-400" />
                        <div className="text-left">
                          <p className="text-[11px] font-bold text-neutral-200">Arrastra tu banner aquí o haz clic</p>
                          <p className="text-[9px] text-neutral-500">Resolución recomendada: 1200x400 px</p>
                        </div>
                      </div>
                    )}
                  </div>

                  <input
                    type="text"
                    placeholder="O introduce la URL del Banner"
                    value={brandBanner.startsWith('data:') ? '' : brandBanner}
                    onChange={(e) => setBrandBanner(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-[11px] outline-none focus:border-brand-yellow text-neutral-300"
                  />
                </div>

                {/* 3. QR Custom Uploader */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <label className="text-[10px] uppercase font-bold tracking-wider text-neutral-300">Código QR del Menú</label>
                    {brandQR && (
                      <button
                        type="button"
                        onClick={() => setBrandQR('')}
                        className="text-[9px] text-red-400 hover:underline cursor-pointer"
                      >
                        Quitar QR
                      </button>
                    )}
                  </div>

                  <div
                    onDragOver={(e) => { e.preventDefault(); }}
                    onDrop={(e) => {
                      e.preventDefault();
                      const file = e.dataTransfer.files?.[0];
                      if (file) {
                        const reader = new FileReader();
                        reader.onloadend = () => setBrandQR(reader.result as string);
                        reader.readAsDataURL(file);
                      }
                    }}
                    className="relative flex flex-col items-center justify-center border border-dashed border-white/10 rounded-2xl p-4 bg-white/5 hover:border-white/20 transition-all text-center"
                  >
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          const reader = new FileReader();
                          reader.onloadend = () => setBrandQR(reader.result as string);
                          reader.readAsDataURL(file);
                        }
                      }}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                    />

                    {brandQR ? (
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl bg-white p-1 overflow-hidden shrink-0 shadow-md">
                          <img src={brandQR} alt="QR Code" className="w-full h-full object-contain" />
                        </div>
                        <div className="text-left">
                          <p className="text-[11px] font-bold text-green-400">¡Código QR cargado con éxito!</p>
                          <p className="text-[9px] text-neutral-400">Se mostrará en la ventana flotante del QR</p>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-center gap-3">
                        <Upload className="w-5 h-5 text-neutral-400" />
                        <div className="text-left">
                          <p className="text-[11px] font-bold text-neutral-200">Sube tu propio código QR aquí</p>
                          <p className="text-[9px] text-neutral-500">Sustituirá al QR dinámico por defecto</p>
                        </div>
                      </div>
                    )}
                  </div>

                  <input
                    type="text"
                    placeholder="O introduce la URL del QR"
                    value={brandQR.startsWith('data:') ? '' : brandQR}
                    onChange={(e) => setBrandQR(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-[11px] outline-none focus:border-brand-yellow text-neutral-300"
                  />
                </div>

              </div>
            </motion.form>
          )}
        </motion.div>
      )}

    </div>
  );
};
