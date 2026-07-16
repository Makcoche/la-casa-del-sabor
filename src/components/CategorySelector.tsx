import React from 'react';
import { CookingPot, UtensilsCrossed, ChefHat, CupSoda, Heart, Flame } from 'lucide-react';
import { CATEGORIES } from '../data';
import { CategoryId } from '../types';

interface CategorySelectorProps {
  selectedCategory: CategoryId | 'all';
  onSelectCategory: (id: CategoryId | 'all') => void;
}

const IconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  CookingPot: CookingPot,
  UtensilsCrossed: UtensilsCrossed,
  ChefHat: ChefHat,
  CupSoda: CupSoda,
  Heart: Heart,
  Flame: Flame,
};

export const CategorySelector: React.FC<CategorySelectorProps> = ({
  selectedCategory,
  onSelectCategory,
}) => {
  return (
    <div className="w-full py-6 select-none bg-white/45 dark:bg-[#1E1E1E]/40 sticky top-[80px] z-30 backdrop-blur-md border-b border-amber-950/10 dark:border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="font-display font-extrabold text-lg text-brand-brown dark:text-brand-yellow">
              Categorías de Sabor
            </h2>
            <span className="text-xs text-neutral-500 font-sans font-semibold">
              Desliza para explorar →
            </span>
          </div>

          {/* Horizontal scrollable category ribbon */}
          <div className="flex items-center space-x-3 overflow-x-auto pb-2 -mx-4 px-4 scrollbar-none scroll-smooth">
            
            {/* "Ver Todo" Option */}
            <button
              onClick={() => onSelectCategory('all')}
              className={`flex items-center space-x-2 shrink-0 px-5 py-3 rounded-2xl font-display font-bold text-sm transition-all duration-300 border cursor-pointer ${
                selectedCategory === 'all'
                  ? 'bg-brand-brown dark:bg-brand-yellow text-white dark:text-brand-brown border-transparent shadow-md shadow-brand-brown/10 dark:shadow-brand-yellow/10 scale-105'
                  : 'bg-white/80 dark:bg-white/5 text-neutral-700 dark:text-neutral-300 border-amber-950/10 dark:border-white/10 hover:bg-amber-50 dark:hover:bg-white/10'
              }`}
              id="category-all-btn"
            >
              <span>✨</span>
              <span>Todos los Platos</span>
            </button>

            {/* Dynamic categories from data */}
            {CATEGORIES.map((category) => {
              const IconComp = IconMap[category.icon] || CookingPot;
              const isSelected = selectedCategory === category.id;

              return (
                <button
                  key={category.id}
                  onClick={() => onSelectCategory(category.id)}
                  className={`flex items-center space-x-2 shrink-0 px-5 py-3 rounded-2xl font-display font-bold text-sm transition-all duration-300 border cursor-pointer ${
                    isSelected
                      ? 'bg-brand-brown dark:bg-brand-yellow text-white dark:text-brand-brown border-transparent shadow-md shadow-brand-brown/10 dark:shadow-brand-yellow/10 scale-105'
                      : 'bg-white/80 dark:bg-white/5 text-neutral-700 dark:text-neutral-300 border-amber-950/10 dark:border-white/10 hover:bg-amber-50 dark:hover:bg-white/10'
                  }`}
                  id={`category-${category.id}-btn`}
                >
                  <IconComp className={`w-4 h-4 ${isSelected ? 'animate-pulse' : 'text-brand-yellow dark:text-brand-yellow/80'}`} />
                  <span>{category.name}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
