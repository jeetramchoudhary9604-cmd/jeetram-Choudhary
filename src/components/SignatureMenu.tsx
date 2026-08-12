import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  Coffee,
  Sparkles,
  Flame,
  Plus,
  SlidersHorizontal,
  Search,
  Check,
  ChevronRight,
  Info,
} from 'lucide-react';
import { SignatureDrink, CustomDrinkConfig } from '../types';
import { SIGNATURE_DRINKS } from '../data/menuData';

interface SignatureMenuProps {
  onSelectCustomize: (config: CustomDrinkConfig) => void;
  onQuickOrder: (drink: SignatureDrink) => void;
}

export const SignatureMenu: React.FC<SignatureMenuProps> = ({
  onSelectCustomize,
  onQuickOrder,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeDrinkModal, setActiveDrinkModal] = useState<SignatureDrink | null>(null);

  const categories = [
    { id: 'all', label: 'All Fusions' },
    { id: 'dirty', label: 'Dirty Matchas' },
    { id: 'cold_foam', label: 'Cold Foam Clouds' },
    { id: 'tonic', label: 'Sparkling Tonics' },
    { id: 'specialty', label: 'Hojicha & Tea Lattes' },
    { id: 'dessert', label: 'Affogatos & Desserts' },
  ];

  const filteredDrinks = SIGNATURE_DRINKS.filter((drink) => {
    const matchesCategory =
      selectedCategory === 'all' || drink.category === selectedCategory;
    const matchesSearch =
      drink.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      drink.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      drink.flavorNotes.some((note) =>
        note.toLowerCase().includes(searchQuery.toLowerCase())
      );
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      {/* Header Banner */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-emerald-950 via-stone-900 to-amber-950 border border-stone-800 p-8 sm:p-12 shadow-2xl">
        <div className="absolute -right-12 -bottom-12 w-80 h-80 rounded-full bg-emerald-600/10 blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-2xl">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-900/60 border border-emerald-700/60 text-emerald-300 text-xs font-bold uppercase tracking-wider mb-3">
            <Coffee className="w-3.5 h-3.5" /> House Fusion Creations
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-stone-100 font-serif tracking-tight">
            Curated Matcha <span className="text-amber-500 font-sans">&</span> Coffee Menu
          </h2>
          <p className="text-stone-300 text-sm sm:text-base mt-2 leading-relaxed">
            Every signature item is exclusively crafted by merging premium Uji ceremonial green tea with single-origin coffee roasts.
          </p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap border ${
                selectedCategory === cat.id
                  ? 'bg-emerald-600 text-white border-emerald-500 shadow-md shadow-emerald-950/40'
                  : 'bg-stone-900/80 text-stone-400 border-stone-800 hover:border-stone-700 hover:text-stone-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Search input */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search matcha or coffee notes..."
            className="w-full bg-stone-900/90 border border-stone-800 rounded-xl pl-10 pr-4 py-2 text-xs text-stone-100 placeholder-stone-500 focus:outline-none focus:border-emerald-500"
          />
        </div>
      </div>

      {/* Drink Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDrinks.map((drink) => (
          <motion.div
            key={drink.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="group rounded-2xl bg-stone-900/90 border border-stone-800/90 hover:border-emerald-500/50 shadow-xl overflow-hidden flex flex-col justify-between transition-all duration-300"
          >
            {/* Card Media Header */}
            <div>
              <div className="relative h-48 overflow-hidden bg-stone-950">
                <img
                  src={drink.image}
                  alt={drink.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-900 via-stone-900/40 to-transparent" />

                {/* Badges */}
                <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                  {drink.isPopular && (
                    <span className="px-2.5 py-0.5 rounded-full bg-amber-500 text-stone-950 text-[10px] font-black uppercase tracking-wider shadow-md">
                      ★ Popular
                    </span>
                  )}
                  {drink.isNew && (
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-500 text-stone-950 text-[10px] font-black uppercase tracking-wider shadow-md">
                      New Fusion
                    </span>
                  )}
                </div>

                {/* Japanese Name */}
                {drink.japaneseName && (
                  <div className="absolute top-3 right-3 px-2.5 py-1 rounded-xl bg-stone-950/80 backdrop-blur-md border border-white/10 text-[11px] font-bold text-stone-300">
                    {drink.japaneseName}
                  </div>
                )}
              </div>

              {/* Card Body */}
              <div className="p-5 space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="text-lg font-bold text-stone-100 font-serif leading-snug">
                    {drink.name}
                  </h3>
                  <span className="text-lg font-black text-emerald-400 shrink-0">
                    ₹{drink.price.toFixed(0)}
                  </span>
                </div>

                <p className="text-xs text-stone-300 leading-relaxed line-clamp-2">
                  {drink.tagline}
                </p>

                {/* Flavor Profile Tags */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {drink.flavorNotes.map((note, i) => (
                    <span
                      key={i}
                      className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-stone-950 text-stone-400 border border-stone-800"
                    >
                      {note}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Card Footer Actions */}
            <div className="p-5 pt-0 grid grid-cols-2 gap-2">
              <button
                onClick={() => onSelectCustomize(drink.defaultConfig)}
                className="py-2.5 px-3 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-bold border border-stone-700 flex items-center justify-center gap-1 transition-all"
              >
                <SlidersHorizontal className="w-3.5 h-3.5 text-amber-400" />
                <span>Customize</span>
              </button>

              <button
                onClick={() => onQuickOrder(drink)}
                className="py-2.5 px-3 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-500 hover:brightness-110 text-white text-xs font-black shadow-md flex items-center justify-center gap-1 transition-all"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Quick Add</span>
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {filteredDrinks.length === 0 && (
        <div className="text-center py-12 bg-stone-900/50 rounded-2xl border border-stone-800">
          <p className="text-stone-400 text-sm">No matcha & coffee combinations match your search.</p>
        </div>
      )}
    </div>
  );
};
