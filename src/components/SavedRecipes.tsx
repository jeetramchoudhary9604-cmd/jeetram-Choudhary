import React from 'react';
import { motion } from 'motion/react';
import { Bookmark, CupSoda, Plus, Trash2, ArrowRight } from 'lucide-react';
import { CustomDrinkConfig } from '../types';
import { calculateDrinkPrice, calculateNutrition } from '../data/menuData';

interface SavedRecipesProps {
  savedRecipes: { id: string; name: string; config: CustomDrinkConfig; createdAt: string }[];
  onLoadConfigToBuilder: (config: CustomDrinkConfig) => void;
  onAddToCart: (config: CustomDrinkConfig) => void;
  onDeleteRecipe: (id: string) => void;
}

export const SavedRecipes: React.FC<SavedRecipesProps> = ({
  savedRecipes,
  onLoadConfigToBuilder,
  onAddToCart,
  onDeleteRecipe,
}) => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-800/80 text-emerald-300 text-xs font-bold uppercase tracking-wider">
          <Bookmark className="w-3.5 h-3.5" />
          <span>Personal Drink Vault</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-100 font-serif">
          Your Saved Custom Creations
        </h2>
        <p className="text-stone-400 text-sm">
          Reorder your favorite custom matcha & coffee ratios or refine them anytime.
        </p>
      </div>

      {savedRecipes.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {savedRecipes.map((item) => {
            const price = calculateDrinkPrice(item.config);
            const nutrition = calculateNutrition(item.config);

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-stone-900/90 border border-stone-800 rounded-3xl p-6 shadow-xl space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-2 border-b border-stone-800 pb-3">
                    <div>
                      <h3 className="text-lg font-bold text-stone-100 font-serif">
                        {item.name}
                      </h3>
                      <p className="text-[10px] text-stone-400 capitalize">
                        {item.config.temp} • {item.config.size} • {item.config.layerStyle.replace('_', ' ')}
                      </p>
                    </div>
                    <span className="text-lg font-black text-emerald-400 shrink-0">
                      ₹{price.toFixed(0)}
                    </span>
                  </div>

                  {/* Summary Recipe Highlights */}
                  <div className="space-y-2 text-xs">
                    <div className="flex items-center justify-between text-stone-300">
                      <span className="text-stone-400">Matcha:</span>
                      <span className="font-semibold text-emerald-400">
                        {item.config.matchaShots} Shot ({item.config.matchaGrade})
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-stone-300">
                      <span className="text-stone-400">Coffee:</span>
                      <span className="font-semibold text-amber-400">
                        {item.config.espressoShots} Shot ({item.config.espressoRoast})
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-stone-300">
                      <span className="text-stone-400">Milk & Syrup:</span>
                      <span className="font-semibold text-stone-200">
                        {item.config.milk} / {item.config.syrup} ({item.config.sweetness}%)
                      </span>
                    </div>

                    {item.config.foam !== 'none' && (
                      <div className="flex items-center justify-between text-stone-300">
                        <span className="text-stone-400">Foam Crown:</span>
                        <span className="font-semibold text-amber-300 capitalize">
                          {item.config.foam.replace('_', ' ')}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Quick Nutrition Pill */}
                  <div className="flex items-center justify-around bg-stone-950 p-2 rounded-xl text-[10px] text-stone-400 font-medium">
                    <span>🔥 {nutrition.calories} Cal</span>
                    <span>⚡ {nutrition.caffeine}mg Caffeinated</span>
                    <span>🍯 {nutrition.sugar}g Sugar</span>
                  </div>
                </div>

                {/* Card Actions */}
                <div className="pt-2 grid grid-cols-2 gap-2">
                  <button
                    onClick={() => onLoadConfigToBuilder(item.config)}
                    className="py-2.5 px-3 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-bold border border-stone-700 flex items-center justify-center gap-1 transition-all"
                  >
                    <CupSoda className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Open in Lab</span>
                  </button>

                  <button
                    onClick={() => onAddToCart(item.config)}
                    className="py-2.5 px-3 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-500 hover:brightness-110 text-white text-xs font-black shadow-md flex items-center justify-center gap-1 transition-all"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Quick Add</span>
                  </button>
                </div>

                <button
                  onClick={() => onDeleteRecipe(item.id)}
                  className="w-full py-1 text-[11px] text-stone-500 hover:text-red-400 flex items-center justify-center gap-1 transition-colors"
                >
                  <Trash2 className="w-3 h-3" />
                  <span>Remove from Saved</span>
                </button>
              </motion.div>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-16 bg-stone-900/50 rounded-3xl border border-stone-800 space-y-4 max-w-lg mx-auto">
          <Bookmark className="w-12 h-12 text-stone-600 mx-auto" />
          <div>
            <h3 className="text-lg font-bold text-stone-200">No Saved Recipes Yet</h3>
            <p className="text-stone-400 text-xs mt-1">
              Create your custom matcha & coffee blend in the Custom Builder and click "Save Recipe" to store it here.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
