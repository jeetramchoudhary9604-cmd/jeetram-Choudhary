import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  Sparkles,
  CupSoda,
  Flame,
  Plus,
  Bookmark,
  Check,
  RotateCcw,
  Info,
  DollarSign,
  Heart,
  Share2,
} from 'lucide-react';
import {
  CustomDrinkConfig,
  TempOption,
  SizeOption,
  MatchaGrade,
  EspressoRoast,
  MilkOption,
  SyrupOption,
  FoamOption,
  ToppingOption,
  LayerStyle,
} from '../types';
import {
  DEFAULT_CUSTOM_DRINK,
  calculateDrinkPrice,
  calculateNutrition,
  MATCHA_LABELS,
  ESPRESSO_LABELS,
  MILK_LABELS,
  SYRUP_LABELS,
  FOAM_LABELS,
  TOPPING_LABELS,
  MATCHA_PRICES,
  ESPRESSO_PRICES,
  MILK_PRICES,
  SYRUP_PRICES,
  FOAM_PRICES,
  TOPPING_PRICES,
} from '../data/menuData';
import { BeverageVisualizer } from './BeverageVisualizer';
import confetti from 'canvas-confetti';

interface CustomBuilderProps {
  onAddToCart: (config: CustomDrinkConfig) => void;
  onSaveRecipe: (config: CustomDrinkConfig) => void;
  initialConfig?: CustomDrinkConfig;
}

export const CustomBuilder: React.FC<CustomBuilderProps> = ({
  onAddToCart,
  onSaveRecipe,
  initialConfig,
}) => {
  const [config, setConfig] = useState<CustomDrinkConfig>(
    initialConfig || DEFAULT_CUSTOM_DRINK
  );
  const [copied, setCopied] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const price = calculateDrinkPrice(config);
  const nutrition = calculateNutrition(config);

  const handleToppingToggle = (topping: ToppingOption) => {
    if (topping === 'none') {
      setConfig((prev) => ({ ...prev, toppings: [] }));
      return;
    }
    setConfig((prev) => {
      const exists = prev.toppings.includes(topping);
      const updated = exists
        ? prev.toppings.filter((t) => t !== topping)
        : [...prev.toppings, topping];
      return { ...prev, toppings: updated };
    });
  };

  const handleReset = () => {
    setConfig(DEFAULT_CUSTOM_DRINK);
  };

  const triggerConfetti = () => {
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.8 },
      colors: ['#34D399', '#F59E0B', '#10B981', '#78350F'],
    });
  };

  const handleAddToCartClick = () => {
    triggerConfetti();
    onAddToCart(config);
  };

  const handleSaveClick = () => {
    onSaveRecipe(config);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  const handleShare = () => {
    const text = `Check out my custom ${config.name} recipe on Matcha Coffee Lab! ${config.matchaShots} shot ${config.matchaGrade} matcha & ${config.espressoShots} shot ${config.espressoRoast} espresso over ${config.milk} milk.`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      {/* Page Header */}
      <div className="mb-6 text-center max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-800/80 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-2">
          <CupSoda className="w-3.5 h-3.5" />
          <span>Customer Fusion Lab</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-100 font-serif tracking-tight">
          Craft Your Signature Matcha <span className="text-amber-500 font-sans">&</span> Coffee
        </h2>
        <p className="text-stone-400 text-sm mt-1">
          Mix & match Uji ceremonial matcha grades, artisan espresso roasts, milk, gourmet syrups, and cold foam crowns.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* LEFT COLUMN: Sticky Beverage Visualizer & Price Summary (5 cols) */}
        <div className="lg:col-span-5 lg:sticky lg:top-24 space-y-4">
          {/* Live Beverage Cup Visualizer */}
          <BeverageVisualizer config={config} />

          {/* Pricing & Nutrition Summary Card */}
          <div className="p-5 rounded-2xl bg-stone-900/90 border border-stone-800 shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b border-stone-800 pb-3">
              <div>
                <input
                  type="text"
                  value={config.name}
                  onChange={(e) => setConfig({ ...config, name: e.target.value })}
                  placeholder="Name your recipe..."
                  className="bg-stone-950/80 border border-stone-700/80 rounded-xl px-3 py-1.5 text-stone-100 font-bold text-sm w-full focus:outline-none focus:border-emerald-500"
                />
                <p className="text-[11px] text-stone-400 mt-1">Click to rename your creation</p>
              </div>
              <div className="text-right pl-3">
                <p className="text-2xl font-black text-emerald-400">₹{price.toFixed(0)}</p>
                <p className="text-[10px] text-stone-400 uppercase tracking-widest font-bold">Total Price</p>
              </div>
            </div>

            {/* Dynamic Nutrition Bar */}
            <div>
              <div className="flex items-center justify-between text-xs font-semibold text-stone-300 mb-2">
                <span className="flex items-center gap-1.5 text-amber-400">
                  <Flame className="w-3.5 h-3.5" /> Nutrition Estimates
                </span>
                <span className="text-[11px] text-stone-400">Calculated per blend</span>
              </div>
              <div className="grid grid-cols-4 gap-2 text-center">
                <div className="p-2 rounded-xl bg-stone-950 border border-stone-800">
                  <p className="text-xs font-black text-stone-100">{nutrition.calories}</p>
                  <p className="text-[10px] text-stone-400 uppercase">Calories</p>
                </div>
                <div className="p-2 rounded-xl bg-stone-950 border border-stone-800">
                  <p className="text-xs font-black text-emerald-400">{nutrition.caffeine}mg</p>
                  <p className="text-[10px] text-stone-400 uppercase">Caffeine</p>
                </div>
                <div className="p-2 rounded-xl bg-stone-950 border border-stone-800">
                  <p className="text-xs font-black text-amber-400">{nutrition.sugar}g</p>
                  <p className="text-[10px] text-stone-400 uppercase">Sugar</p>
                </div>
                <div className="p-2 rounded-xl bg-stone-950 border border-stone-800">
                  <p className="text-xs font-black text-sky-400">{nutrition.protein}g</p>
                  <p className="text-[10px] text-stone-400 uppercase">Protein</p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-col gap-2">
              <button
                onClick={handleAddToCartClick}
                className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-emerald-600 via-emerald-500 to-amber-600 hover:brightness-110 active:scale-[0.98] text-white font-black text-sm shadow-xl shadow-emerald-950/50 flex items-center justify-center gap-2 transition-all"
              >
                <Plus className="w-4 h-4" />
                <span>Add Custom Fusion to Order • ₹{price.toFixed(0)}</span>
              </button>

              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={handleSaveClick}
                  className={`py-2.5 px-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
                    savedSuccess
                      ? 'bg-emerald-950 text-emerald-300 border-emerald-600'
                      : 'bg-stone-800/80 hover:bg-stone-700/80 text-stone-200 border-stone-700'
                  }`}
                >
                  {savedSuccess ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Saved!</span>
                    </>
                  ) : (
                    <>
                      <Bookmark className="w-3.5 h-3.5" />
                      <span>Save Recipe</span>
                    </>
                  )}
                </button>

                <button
                  onClick={handleShare}
                  className="py-2.5 px-3 rounded-xl bg-stone-800/80 hover:bg-stone-700/80 text-stone-200 border border-stone-700 text-xs font-bold flex items-center justify-center gap-1.5 transition-all"
                >
                  <Share2 className="w-3.5 h-3.5 text-amber-400" />
                  <span>{copied ? 'Copied Link!' : 'Share Recipe'}</span>
                </button>
              </div>

              <button
                onClick={handleReset}
                className="w-full py-2 text-[11px] text-stone-400 hover:text-stone-200 flex items-center justify-center gap-1"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset Customizer Defaults</span>
              </button>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Customization Options Form (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* SECTION 1: Temperature & Size */}
          <div className="p-5 rounded-2xl bg-stone-900/80 border border-stone-800 space-y-4">
            <h3 className="text-sm font-bold text-stone-200 uppercase tracking-wider flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              1. Base Temperature & Cup Size
            </h3>

            {/* Temperature Toggles */}
            <div className="grid grid-cols-3 gap-2">
              {(['iced', 'hot', 'blended'] as TempOption[]).map((t) => (
                <button
                  key={t}
                  onClick={() => setConfig({ ...config, temp: t })}
                  className={`py-3 px-3 rounded-xl font-bold text-xs capitalize flex flex-col items-center gap-1 border transition-all ${
                    config.temp === t
                      ? 'bg-emerald-950/80 border-emerald-500 text-emerald-300 shadow-md'
                      : 'bg-stone-950/60 border-stone-800 text-stone-400 hover:border-stone-700 hover:text-stone-200'
                  }`}
                >
                  <span>
                    {t === 'iced' ? '🧊 Iced' : t === 'hot' ? '☕ Hot Steamed' : '🍧 Blended Slush'}
                  </span>
                </button>
              ))}
            </div>

            {/* Size Options */}
            <div className="grid grid-cols-3 gap-2">
              {(['small', 'medium', 'large'] as SizeOption[]).map((s) => (
                <button
                  key={s}
                  onClick={() => setConfig({ ...config, size: s })}
                  className={`py-2.5 px-3 rounded-xl font-bold text-xs flex flex-col items-center border transition-all ${
                    config.size === s
                      ? 'bg-emerald-950/80 border-emerald-500 text-emerald-300'
                      : 'bg-stone-950/60 border-stone-800 text-stone-400 hover:border-stone-700'
                  }`}
                >
                  <span className="capitalize">{s}</span>
                  <span className="text-[10px] font-normal text-stone-400">
                    {s === 'small' ? '12 oz' : s === 'medium' ? '16 oz' : '20 oz'}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* SECTION 2: MATCHA SELECTION & SHOTS */}
          <div className="p-5 rounded-2xl bg-stone-900/80 border border-stone-800 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-stone-200 uppercase tracking-wider flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                2. Matcha Tea Variety & Shot Count
              </h3>
              <div className="flex items-center gap-1 bg-stone-950 px-2 py-1 rounded-lg border border-stone-800">
                <span className="text-xs text-stone-400">Matcha Shots:</span>
                {[1, 2, 3].map((num) => (
                  <button
                    key={`matcha-num-${num}`}
                    onClick={() => setConfig({ ...config, matchaShots: num })}
                    className={`w-6 h-6 rounded-md text-xs font-bold transition-all ${
                      config.matchaShots === num
                        ? 'bg-emerald-600 text-white'
                        : 'text-stone-400 hover:bg-stone-800'
                    }`}
                  >
                    {num}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              {(['ceremonial', 'culinary', 'hojicha'] as MatchaGrade[]).map((g) => {
                const info = MATCHA_LABELS[g];
                const priceAdd = MATCHA_PRICES[g];
                return (
                  <button
                    key={g}
                    onClick={() => setConfig({ ...config, matchaGrade: g })}
                    className={`w-full text-left p-3 rounded-xl border transition-all flex items-start justify-between gap-3 ${
                      config.matchaGrade === g
                        ? 'bg-emerald-950/60 border-emerald-500/80 text-stone-100 shadow-md'
                        : 'bg-stone-950/50 border-stone-800/80 text-stone-400 hover:border-stone-700'
                    }`}
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span
                          className="w-2.5 h-2.5 rounded-full"
                          style={{ backgroundColor: info.color }}
                        />
                        <span className="font-bold text-xs text-stone-200">{info.name}</span>
                      </div>
                      <p className="text-[11px] text-stone-400 mt-0.5">{info.desc}</p>
                    </div>
                    <span className="text-xs font-semibold text-emerald-400">
                      +₹{priceAdd}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* SECTION 3: COFFEE / ESPRESSO SELECTION & SHOTS */}
          <div className="p-5 rounded-2xl bg-stone-900/80 border border-stone-800 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-stone-200 uppercase tracking-wider flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-amber-500" />
                3. Espresso Roast & Shot Count
              </h3>
              <div className="flex items-center gap-1 bg-stone-950 px-2 py-1 rounded-lg border border-stone-800">
                <span className="text-xs text-stone-400">Coffee Shots:</span>
                {[0, 1, 2, 3].map((num) => (
                  <button
                    key={`espresso-num-${num}`}
                    onClick={() => setConfig({ ...config, espressoShots: num })}
                    className={`w-6 h-6 rounded-md text-xs font-bold transition-all ${
                      config.espressoShots === num
                        ? 'bg-amber-600 text-white'
                        : 'text-stone-400 hover:bg-stone-800'
                    }`}
                  >
                    {num}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {(
                [
                  'house',
                  'blonde',
                  'decaf',
                  'nitro_cold_brew',
                  'cold_brew',
                ] as EspressoRoast[]
              ).map((r) => {
                const info = ESPRESSO_LABELS[r];
                const priceAdd = ESPRESSO_PRICES[r];
                return (
                  <button
                    key={r}
                    onClick={() => setConfig({ ...config, espressoRoast: r })}
                    className={`text-left p-3 rounded-xl border transition-all flex items-start justify-between gap-2 ${
                      config.espressoRoast === r
                        ? 'bg-amber-950/60 border-amber-500/80 text-stone-100 shadow-md'
                        : 'bg-stone-950/50 border-stone-800/80 text-stone-400 hover:border-stone-700'
                    }`}
                  >
                    <div>
                      <span className="font-bold text-xs text-stone-200 block">{info.name}</span>
                      <p className="text-[10px] text-stone-400 mt-0.5 line-clamp-2">{info.desc}</p>
                    </div>
                    <span className="text-xs font-semibold text-amber-400 shrink-0">
                      +₹{priceAdd}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* SECTION 4: MILK & DAIRY BASE */}
          <div className="p-5 rounded-2xl bg-stone-900/80 border border-stone-800 space-y-4">
            <h3 className="text-sm font-bold text-stone-200 uppercase tracking-wider flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              4. Milk & Dairy Base
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {(
                [
                  'oat',
                  'whole',
                  'almond',
                  'coconut',
                  'macadamia',
                  'soy',
                  'half_and_half',
                ] as MilkOption[]
              ).map((m) => {
                const label = MILK_LABELS[m];
                const priceAdd = MILK_PRICES[m];
                return (
                  <button
                    key={m}
                    onClick={() => setConfig({ ...config, milk: m })}
                    className={`p-2.5 rounded-xl border text-left transition-all ${
                      config.milk === m
                        ? 'bg-emerald-950/60 border-emerald-500 text-stone-100'
                        : 'bg-stone-950/50 border-stone-800 text-stone-400 hover:border-stone-700'
                    }`}
                  >
                    <p className="font-bold text-xs text-stone-200">{label}</p>
                    <p className="text-[10px] text-emerald-400 font-semibold mt-0.5">
                      {priceAdd > 0 ? `+₹${priceAdd}` : 'Included'}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* SECTION 5: LAYERING & FLOAT STYLE */}
          <div className="p-5 rounded-2xl bg-stone-900/80 border border-stone-800 space-y-4">
            <h3 className="text-sm font-bold text-stone-200 uppercase tracking-wider flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-500" />
              5. Layering & Pour Technique
            </h3>

            <div className="grid grid-cols-2 gap-2">
              {[
                {
                  id: 'dirty_matcha',
                  title: 'Dirty Matcha (Classic)',
                  desc: 'Milk bottom, Espresso middle, Matcha green float on top.',
                },
                {
                  id: 'espresso_float',
                  title: 'Espresso Float',
                  desc: 'Matcha green bottom, Milk middle, Dark Espresso float.',
                },
                {
                  id: 'swirled',
                  title: 'Marbled Swirl',
                  desc: 'Hand-stirred gradient blend of espresso & Uji green tea.',
                },
                {
                  id: 'layered_foam',
                  title: 'Tri-Tone Cloud Foam',
                  desc: 'Matcha & Espresso base capped with lush velvety foam.',
                },
              ].map((style) => (
                <button
                  key={style.id}
                  onClick={() => setConfig({ ...config, layerStyle: style.id as LayerStyle })}
                  className={`p-3 rounded-xl border text-left transition-all ${
                    config.layerStyle === style.id
                      ? 'bg-amber-950/60 border-amber-500 text-stone-100 shadow-md'
                      : 'bg-stone-950/50 border-stone-800 text-stone-400 hover:border-stone-700'
                  }`}
                >
                  <p className="font-bold text-xs text-stone-200">{style.title}</p>
                  <p className="text-[10px] text-stone-400 mt-0.5">{style.desc}</p>
                </button>
              ))}
            </div>
          </div>

          {/* SECTION 6: SWEETNESS & SYRUP DROPS */}
          <div className="p-5 rounded-2xl bg-stone-900/80 border border-stone-800 space-y-4">
            <h3 className="text-sm font-bold text-stone-200 uppercase tracking-wider flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              6. Sweetness Level & Flavor Syrups
            </h3>

            {/* Sweetness Slider */}
            <div>
              <div className="flex justify-between items-center text-xs font-bold text-stone-300 mb-2">
                <span>Sweetness Adjustment</span>
                <span className="text-amber-400">{config.sweetness}%</span>
              </div>
              <div className="grid grid-cols-5 gap-1">
                {[0, 25, 50, 75, 100].map((val) => (
                  <button
                    key={`sweet-${val}`}
                    onClick={() => setConfig({ ...config, sweetness: val })}
                    className={`py-1.5 rounded-lg text-xs font-bold border transition-all ${
                      config.sweetness === val
                        ? 'bg-amber-500 text-stone-950 border-amber-400'
                        : 'bg-stone-950 border-stone-800 text-stone-400 hover:text-stone-200'
                    }`}
                  >
                    {val}%
                  </button>
                ))}
              </div>
            </div>

            {/* Syrups */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {(
                [
                  'none',
                  'vanilla',
                  'brown_sugar',
                  'kuromitsu',
                  'strawberry',
                  'lavender',
                  'hazelnut',
                  'caramel',
                ] as SyrupOption[]
              ).map((s) => {
                const label = SYRUP_LABELS[s];
                const priceAdd = SYRUP_PRICES[s];
                return (
                  <button
                    key={s}
                    onClick={() => setConfig({ ...config, syrup: s })}
                    className={`p-2 rounded-xl border text-left text-xs transition-all ${
                      config.syrup === s
                        ? 'bg-emerald-950/60 border-emerald-500 text-stone-100 font-bold'
                        : 'bg-stone-950/50 border-stone-800 text-stone-400 hover:border-stone-700'
                    }`}
                  >
                    <p className="truncate">{label}</p>
                    <p className="text-[10px] text-emerald-400 font-semibold">
                      {priceAdd > 0 ? `+₹${priceAdd}` : 'None'}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* SECTION 7: COLD FOAM & TOPPINGS */}
          <div className="p-5 rounded-2xl bg-stone-900/80 border border-stone-800 space-y-4">
            <h3 className="text-sm font-bold text-stone-200 uppercase tracking-wider flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-500" />
              7. Foam Crown & Artisan Toppings
            </h3>

            {/* Foam Crown */}
            <div className="space-y-1.5">
              <p className="text-xs font-semibold text-stone-400">Cold Foam Crown:</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {(
                  [
                    'none',
                    'vanilla_cream',
                    'matcha_cream',
                    'salted_cheese',
                    'espresso_cloud',
                  ] as FoamOption[]
                ).map((f) => {
                  const label = FOAM_LABELS[f];
                  const priceAdd = FOAM_PRICES[f];
                  return (
                    <button
                      key={f}
                      onClick={() => setConfig({ ...config, foam: f })}
                      className={`p-2.5 rounded-xl border text-left text-xs transition-all ${
                        config.foam === f
                          ? 'bg-amber-950/60 border-amber-500 text-stone-100 font-bold'
                          : 'bg-stone-950/50 border-stone-800 text-stone-400 hover:border-stone-700'
                      }`}
                    >
                      <p>{label}</p>
                      <p className="text-[10px] text-amber-400 font-semibold">
                        {priceAdd > 0 ? `+₹${priceAdd}` : 'No Foam'}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Toppings Multi-select */}
            <div className="space-y-1.5 pt-2">
              <p className="text-xs font-semibold text-stone-400">Add-in Toppings & Dustings:</p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {(
                  [
                    'boba',
                    'espresso_jelly',
                    'cocoa_dust',
                    'matcha_dust',
                    'caramel_drizzle',
                    'gold_flakes',
                  ] as ToppingOption[]
                ).map((t) => {
                  const label = TOPPING_LABELS[t];
                  const priceAdd = TOPPING_PRICES[t];
                  const isSelected = config.toppings.includes(t);
                  return (
                    <button
                      key={t}
                      onClick={() => handleToppingToggle(t)}
                      className={`p-2 rounded-xl border text-left text-xs transition-all flex flex-col justify-between ${
                        isSelected
                          ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200 font-bold'
                          : 'bg-stone-950/50 border-stone-800 text-stone-400 hover:border-stone-700'
                      }`}
                    >
                      <span>{label}</span>
                      <span className="text-[10px] text-emerald-400 font-semibold mt-1">
                        +₹{priceAdd}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* SECTION 8: SPECIAL BARISTA INSTRUCTIONS */}
          <div className="p-5 rounded-2xl bg-stone-900/80 border border-stone-800 space-y-3">
            <h3 className="text-sm font-bold text-stone-200 uppercase tracking-wider">
              8. Special Barista Notes
            </h3>
            <textarea
              value={config.specialInstructions || ''}
              onChange={(e) =>
                setConfig({ ...config, specialInstructions: e.target.value })
              }
              placeholder="e.g. Extra whisked, separate layers for photos, light ice..."
              rows={2}
              className="w-full bg-stone-950/80 border border-stone-800 rounded-xl p-3 text-xs text-stone-100 placeholder-stone-500 focus:outline-none focus:border-emerald-500"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
