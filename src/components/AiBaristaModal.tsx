import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Sparkles, Bot, CupSoda, ArrowRight, Check, RefreshCw } from 'lucide-react';
import { CustomDrinkConfig, AiRecommendationResponse } from '../types';
import { BeverageVisualizer } from './BeverageVisualizer';

interface AiBaristaModalProps {
  onLoadConfigToBuilder: (config: CustomDrinkConfig) => void;
  onAddToCart: (config: CustomDrinkConfig) => void;
}

export const AiBaristaModal: React.FC<AiBaristaModalProps> = ({
  onLoadConfigToBuilder,
  onAddToCart,
}) => {
  const [flavorPreference, setFlavorPreference] = useState('');
  const [moodOrEnergy, setMoodOrEnergy] = useState('');
  const [dietary, setDietary] = useState('');
  const [tempPref, setTempPref] = useState('iced');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AiRecommendationResponse | null>(null);

  const samplePrompts = [
    {
      title: 'Study Focus & Berry Sweet',
      flavor: 'Sweet strawberry and creamy oat milk with a crisp espresso punch',
      mood: 'Deep study focus for 3 hours',
      dietary: 'Oat milk',
    },
    {
      title: 'Zen Morning Ritual',
      flavor: 'Rich ceremonial umami with smooth dark caramel notes',
      mood: 'Calm morning mindfulness energy',
      dietary: 'Macadamia milk',
    },
    {
      title: 'Sparkling Afternoon Refresh',
      flavor: 'Bouncy, citrusy, sparkling and low sugar',
      mood: 'Post-workout refreshing pick-me-up',
      dietary: 'Unsweetened',
    },
  ];

  const handleGenerate = async (
    overrideFlavor?: string,
    overrideMood?: string,
    overrideDietary?: string
  ) => {
    setLoading(true);
    setResult(null);

    const f = overrideFlavor !== undefined ? overrideFlavor : flavorPreference;
    const m = overrideMood !== undefined ? overrideMood : moodOrEnergy;
    const d = overrideDietary !== undefined ? overrideDietary : dietary;

    try {
      const res = await fetch('/api/ai-recommendation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          flavorPreference: f || 'Balanced, creamy and energizing',
          moodOrEnergy: m || 'Afternoon pick-me-up',
          dietaryRestrictions: d,
          temperaturePreference: tempPref,
        }),
      });

      const data = await res.json();
      setResult(data);
    } catch (err) {
      console.error('Failed to fetch AI recommendation:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
      {/* Header Banner */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-950/80 border border-amber-800/80 text-amber-300 text-xs font-bold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5 animate-pulse" />
          <span>AI Fusion Pairing Assistant</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-100 font-serif">
          Consult Our AI Sommelier Barista
        </h2>
        <p className="text-stone-400 text-sm">
          Tell us your taste preferences, current mood, or caffeine targets. Our AI will formulate the perfect ratio of ceremonial matcha and specialty coffee.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        {/* Left Form (6 cols) */}
        <div className="md:col-span-6 space-y-5 bg-stone-900/90 border border-stone-800 p-6 rounded-3xl shadow-xl">
          {/* Quick Preset Buttons */}
          <div>
            <p className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-2">
              Quick Inspiration Prompts:
            </p>
            <div className="space-y-2">
              {samplePrompts.map((p, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setFlavorPreference(p.flavor);
                    setMoodOrEnergy(p.mood);
                    setDietary(p.dietary);
                    handleGenerate(p.flavor, p.mood, p.dietary);
                  }}
                  className="w-full text-left p-2.5 rounded-xl bg-stone-950 hover:bg-stone-800 border border-stone-800 text-xs text-stone-300 transition-all flex items-center justify-between group"
                >
                  <span className="font-semibold text-stone-200 group-hover:text-amber-300">
                    {p.title}
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 text-stone-500 group-hover:text-amber-400 group-hover:translate-x-1 transition-transform" />
                </button>
              ))}
            </div>
          </div>

          <hr className="border-stone-800" />

          {/* Flavor Notes Input */}
          <div>
            <label className="block text-xs font-bold text-stone-300 mb-1">
              Flavor Preferences (e.g., Sweet, floral, dark cacao, vanilla):
            </label>
            <input
              type="text"
              value={flavorPreference}
              onChange={(e) => setFlavorPreference(e.target.value)}
              placeholder="e.g., Creamy, sweet strawberry with rich espresso finish"
              className="w-full bg-stone-950 border border-stone-800 rounded-xl p-3 text-xs text-stone-100 placeholder-stone-500 focus:outline-none focus:border-amber-500"
            />
          </div>

          {/* Mood / Energy Input */}
          <div>
            <label className="block text-xs font-bold text-stone-300 mb-1">
              Mood / Energy Goal (e.g., Calm focus, high caffeine boost, evening low caffeine):
            </label>
            <input
              type="text"
              value={moodOrEnergy}
              onChange={(e) => setMoodOrEnergy(e.target.value)}
              placeholder="e.g., Need high caffeine focus for afternoon work"
              className="w-full bg-stone-950 border border-stone-800 rounded-xl p-3 text-xs text-stone-100 placeholder-stone-500 focus:outline-none focus:border-amber-500"
            />
          </div>

          {/* Dietary Restrictions */}
          <div>
            <label className="block text-xs font-bold text-stone-300 mb-1">
              Milk & Dietary Restrictions (e.g., Oat milk, vegan, unsweetened):
            </label>
            <input
              type="text"
              value={dietary}
              onChange={(e) => setDietary(e.target.value)}
              placeholder="e.g., Oat milk, low sugar"
              className="w-full bg-stone-950 border border-stone-800 rounded-xl p-3 text-xs text-stone-100 placeholder-stone-500 focus:outline-none focus:border-amber-500"
            />
          </div>

          {/* Temperature Choice */}
          <div>
            <label className="block text-xs font-bold text-stone-300 mb-1.5">
              Preferred Temperature:
            </label>
            <div className="grid grid-cols-3 gap-2">
              {['iced', 'hot', 'blended'].map((t) => (
                <button
                  key={t}
                  onClick={() => setTempPref(t)}
                  className={`py-2 text-xs font-bold rounded-xl capitalize border transition-all ${
                    tempPref === t
                      ? 'bg-amber-950 text-amber-300 border-amber-600'
                      : 'bg-stone-950 text-stone-400 border-stone-800'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* Generate Button */}
          <button
            onClick={() => handleGenerate()}
            disabled={loading}
            className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-amber-600 via-amber-500 to-emerald-600 hover:brightness-110 active:scale-[0.98] text-white font-black text-sm shadow-xl shadow-amber-950/40 flex items-center justify-center gap-2 transition-all disabled:opacity-50"
          >
            {loading ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin text-amber-200" />
                <span>Formulating Custom Fusion Recipe...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 text-amber-200" />
                <span>Generate AI Fusion Recipe</span>
              </>
            )}
          </button>
        </div>

        {/* Right Output Card (6 cols) */}
        <div className="md:col-span-6 flex flex-col justify-between bg-stone-900/90 border border-stone-800 p-6 rounded-3xl shadow-xl">
          {result ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="space-y-5"
            >
              <div className="border-b border-stone-800 pb-4">
                <span className="px-2.5 py-1 rounded-full bg-emerald-950 text-emerald-300 text-[10px] font-bold uppercase tracking-wider border border-emerald-800">
                  AI Formulated Fusion
                </span>
                <h3 className="text-2xl font-black text-stone-100 font-serif mt-2">
                  {result.drinkName}
                </h3>
                <p className="text-xs text-amber-400 font-medium italic mt-0.5">
                  "{result.tagline}"
                </p>
              </div>

              {/* Barista Explanation */}
              <div className="p-3.5 rounded-2xl bg-stone-950 border border-stone-800 text-xs text-stone-300 leading-relaxed">
                <p className="font-bold text-stone-200 mb-1 flex items-center gap-1.5">
                  <Bot className="w-4 h-4 text-amber-400" /> Barista Sommelier Note:
                </p>
                <p>{result.explanation}</p>
              </div>

              {/* Live Visualizer preview for result */}
              <div className="max-w-xs mx-auto">
                <BeverageVisualizer config={result.config} sizeMultiplier={0.85} />
              </div>

              {/* Action Buttons */}
              <div className="pt-2 grid grid-cols-2 gap-2">
                <button
                  onClick={() => onLoadConfigToBuilder(result.config)}
                  className="py-3 px-3 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-bold border border-stone-700 flex items-center justify-center gap-1.5 transition-all"
                >
                  <CupSoda className="w-4 h-4 text-emerald-400" />
                  <span>Open in Builder</span>
                </button>

                <button
                  onClick={() => onAddToCart(result.config)}
                  className="py-3 px-3 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-500 hover:brightness-110 text-white text-xs font-black flex items-center justify-center gap-1.5 transition-all"
                >
                  <Check className="w-4 h-4" />
                  <span>Add to Order</span>
                </button>
              </div>
            </motion.div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-center p-8 space-y-4 text-stone-500">
              <div className="w-16 h-16 rounded-3xl bg-stone-950 border border-stone-800 flex items-center justify-center text-amber-500/60">
                <Sparkles className="w-8 h-8" />
              </div>
              <div>
                <p className="text-stone-300 font-bold text-sm">No Fusion Formulated Yet</p>
                <p className="text-stone-500 text-xs mt-1">
                  Fill in your flavor preferences or click a quick prompt to generate a custom matcha & coffee pairing.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
