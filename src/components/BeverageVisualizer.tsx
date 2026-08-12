import React from 'react';
import { motion } from 'motion/react';
import { CustomDrinkConfig } from '../types';

interface BeverageVisualizerProps {
  config: CustomDrinkConfig;
  sizeMultiplier?: number;
}

export const BeverageVisualizer: React.FC<BeverageVisualizerProps> = ({
  config,
  sizeMultiplier = 1.0,
}) => {
  // Color mappings
  const getSyrupColor = () => {
    switch (config.syrup) {
      case 'strawberry':
        return '#E11D48'; // Bright Rose Red
      case 'brown_sugar':
      case 'kuromitsu':
        return '#451A03'; // Deep Molasses Brown
      case 'caramel':
        return '#D97706'; // Amber Caramel
      case 'lavender':
        return '#8B5CF6'; // Vibrant Purple
      case 'vanilla':
        return '#FDE68A'; // Warm Golden Cream
      case 'hazelnut':
        return '#92400E'; // Roasted Brown
      default:
        return 'transparent';
    }
  };

  const getMilkColor = () => {
    switch (config.milk) {
      case 'oat':
        return '#FDF6E2'; // Warm Oat Cream
      case 'almond':
        return '#FAF5EC'; // Off-white
      case 'coconut':
        return '#FFFFFF'; // Pure White
      case 'macadamia':
        return '#FFFDF5'; // Rich Ivory
      case 'half_and_half':
        return '#FEF08A'; // Rich Custard
      default:
        return '#FFFBEB'; // Organic Whole Milk
    }
  };

  const getMatchaColor = () => {
    switch (config.matchaGrade) {
      case 'ceremonial':
        return '#15803D'; // Vibrant Uji Jade Green
      case 'culinary':
        return '#047857'; // Deep Forest Green
      case 'hojicha':
        return '#78350F'; // Roasted Chestnut Brown
      default:
        return '#16A34A';
    }
  };

  const getEspressoColor = () => {
    switch (config.espressoRoast) {
      case 'blonde':
        return '#78350F'; // Lighter Amber Coffee
      case 'nitro_cold_brew':
      case 'cold_brew':
        return '#1C1917'; // Dark Onyx Cold Brew
      case 'decaf':
        return '#44403C'; // Slate Brown
      default:
        return '#291810'; // House Roasted Espresso
    }
  };

  const getFoamColor = () => {
    switch (config.foam) {
      case 'matcha_cream':
        return '#86EFAC'; // Minty Cream Green
      case 'vanilla_cream':
        return '#FEF9C3'; // Pale Vanilla Foam
      case 'salted_cheese':
        return '#FFFBEB'; // Creamy White
      case 'espresso_cloud':
        return '#D97706'; // Caramel Gold Foam
      default:
        return 'transparent';
    }
  };

  const syrupColor = getSyrupColor();
  const milkColor = getMilkColor();
  const matchaColor = getMatchaColor();
  const espressoColor = getEspressoColor();
  const foamColor = getFoamColor();

  const isIced = config.temp === 'iced';
  const isHot = config.temp === 'hot';
  const isBlended = config.temp === 'blended';

  const hasSyrup = config.syrup !== 'none';
  const hasFoam = config.foam !== 'none';
  const hasBoba = config.toppings.includes('boba');
  const hasJelly = config.toppings.includes('espresso_jelly');
  const hasDust =
    config.toppings.includes('matcha_dust') || config.toppings.includes('cocoa_dust');

  return (
    <div className="relative flex flex-col items-center justify-center p-6 bg-gradient-to-b from-stone-900/50 to-stone-950/80 rounded-3xl border border-stone-800/80 shadow-2xl overflow-hidden backdrop-blur-md">
      {/* Background ambient glow */}
      <div
        className="absolute w-48 h-48 rounded-full blur-3xl opacity-20 pointer-events-none transition-colors duration-700"
        style={{
          background: `radial-gradient(circle, ${matchaColor} 0%, ${espressoColor} 100%)`,
        }}
      />

      {/* Temperature status badges */}
      <div className="absolute top-4 left-4 flex items-center gap-2">
        <span
          className={`text-[10px] uppercase font-bold tracking-widest px-2.5 py-1 rounded-full border ${
            isIced
              ? 'bg-sky-950/60 text-sky-300 border-sky-800/50'
              : isHot
              ? 'bg-amber-950/60 text-amber-300 border-amber-800/50'
              : 'bg-emerald-950/60 text-emerald-300 border-emerald-800/50'
          }`}
        >
          {config.temp} • {config.size} ({config.size === 'small' ? '12oz' : config.size === 'medium' ? '16oz' : '20oz'})
        </span>
      </div>

      <div className="absolute top-4 right-4 flex items-center gap-1.5 text-stone-400 text-xs font-medium">
        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
        <span>Live Layer Visualizer</span>
      </div>

      {/* Rising steam lines for HOT drinks */}
      {isHot && (
        <div className="flex gap-3 mb-1 mt-6 h-8">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={`steam-${i}`}
              animate={{
                y: [-2, -18, -28],
                opacity: [0, 0.6, 0],
                scaleX: [1, 1.4, 2],
              }}
              transition={{
                duration: 2.2,
                repeat: Infinity,
                delay: i * 0.5,
                ease: 'easeOut',
              }}
              className="w-1.5 bg-gradient-to-t from-stone-200/40 to-transparent rounded-full blur-[1px]"
            />
          ))}
        </div>
      )}

      {/* Main Glass Vessel */}
      <div
        className="relative my-4 transition-all duration-300 flex items-end justify-center"
        style={{
          width: `${140 * sizeMultiplier}px`,
          height: `${230 * sizeMultiplier}px`,
        }}
      >
        {/* Glass Cup Outline Container */}
        <div className="relative w-full h-full rounded-b-[40px] rounded-t-[12px] border-2 border-white/20 bg-gradient-to-r from-white/10 via-transparent to-white/15 backdrop-blur-[2px] shadow-2xl overflow-hidden flex flex-col justify-end p-1">
          {/* Top Glass Rim Light Reflection */}
          <div className="absolute top-0 inset-x-0 h-2 bg-gradient-to-b from-white/40 to-transparent z-30" />

          {/* Ice Condensation Effect for ICED */}
          {isIced && (
            <div className="absolute inset-0 bg-white/[0.03] pointer-events-none z-20">
              {/* Droplets */}
              <div className="absolute top-12 left-3 w-1.5 h-1.5 rounded-full bg-white/40 shadow-sm" />
              <div className="absolute top-20 right-4 w-2 h-2 rounded-full bg-white/30" />
              <div className="absolute top-36 left-5 w-1 h-2 rounded-full bg-white/40" />
            </div>
          )}

          {/* Blended Frosted Overlay */}
          {isBlended && (
            <div className="absolute inset-0 bg-white/10 backdrop-blur-[1px] pointer-events-none z-20" />
          )}

          {/* --- DRINK LAYERS (Bottom to Top) --- */}

          {/* 1. SYRUP / PUREE BOTTOM LAYER */}
          {hasSyrup && (
            <motion.div
              initial={{ height: '0%' }}
              animate={{ height: '14%' }}
              transition={{ duration: 0.5 }}
              className="w-full relative z-10 rounded-b-[34px]"
              style={{
                backgroundColor: syrupColor,
                boxShadow: `0 -4px 12px ${syrupColor}80`,
              }}
            >
              {/* Wavy syrup surface line */}
              <div className="absolute -top-1.5 inset-x-0 h-3 bg-white/10 rounded-full blur-[1px]" />
            </motion.div>
          )}

          {/* 2. MAIN BEVERAGE LAYER CONTAINER (Milk, Espresso, Matcha, according to layerStyle) */}
          <div className="w-full flex-1 flex flex-col justify-end relative z-10 overflow-hidden">
            {/* BOBA PEARLS / JELLY AT BOTTOM */}
            {(hasBoba || hasJelly) && (
              <div className="absolute bottom-1 inset-x-2 flex flex-wrap justify-center gap-1 z-20 pointer-events-none">
                {hasBoba &&
                  [...Array(10)].map((_, idx) => (
                    <motion.div
                      key={`boba-${idx}`}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: idx * 0.03 }}
                      className="w-3.5 h-3.5 rounded-full bg-gradient-to-br from-stone-900 to-amber-950 border border-amber-900/50 shadow-md"
                    />
                  ))}
                {hasJelly &&
                  [...Array(6)].map((_, idx) => (
                    <motion.div
                      key={`jelly-${idx}`}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: idx * 0.04 }}
                      className="w-4 h-3.5 rounded-sm bg-gradient-to-br from-stone-800 to-amber-950/90 border border-amber-900/60 shadow-sm opacity-90"
                    />
                  ))}
              </div>
            )}

            {/* ICE CUBES floating inside glass */}
            {isIced && (
              <div className="absolute inset-0 z-20 pointer-events-none flex flex-col justify-around px-3 py-6">
                <motion.div
                  animate={{ y: [0, -3, 0], rotate: [0, 4, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                  className="w-8 h-8 rounded-lg border border-white/40 bg-white/20 backdrop-blur-sm self-start shadow-inner"
                />
                <motion.div
                  animate={{ y: [0, 3, 0], rotate: [0, -6, 0] }}
                  transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
                  className="w-9 h-9 rounded-lg border border-white/40 bg-white/25 backdrop-blur-sm self-end shadow-inner"
                />
                <motion.div
                  animate={{ y: [0, -4, 0], rotate: [0, 3, 0] }}
                  transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
                  className="w-7 h-7 rounded-lg border border-white/40 bg-white/20 backdrop-blur-sm self-center shadow-inner"
                />
              </div>
            )}

            {/* DYNAMIC LAYER RENDERER ACCORDING TO LAYER STYLE */}
            {config.layerStyle === 'dirty_matcha' && (
              <>
                {/* Top: Ceremonial Matcha Float */}
                <motion.div
                  initial={{ height: '0%' }}
                  animate={{ height: '32%' }}
                  transition={{ duration: 0.6 }}
                  className="w-full relative shadow-lg"
                  style={{ backgroundColor: matchaColor }}
                >
                  <div className="absolute inset-x-0 top-0 h-2 bg-emerald-400/20 blur-[1px]" />
                </motion.div>

                {/* Middle: Espresso Float / Swirl */}
                <motion.div
                  initial={{ height: '0%' }}
                  animate={{ height: `${18 + config.espressoShots * 8}%` }}
                  transition={{ duration: 0.5 }}
                  className="w-full relative"
                  style={{
                    background: `linear-gradient(to bottom, ${espressoColor}, ${espressoColor}DD, ${milkColor}99)`,
                  }}
                >
                  <div className="absolute inset-x-0 bottom-0 h-4 bg-gradient-to-t from-stone-900/20 to-transparent" />
                </motion.div>

                {/* Bottom Base: Milk Layer */}
                <motion.div
                  initial={{ height: '0%' }}
                  animate={{ height: '40%' }}
                  transition={{ duration: 0.4 }}
                  className="w-full relative"
                  style={{ backgroundColor: milkColor }}
                />
              </>
            )}

            {config.layerStyle === 'espresso_float' && (
              <>
                {/* Top: Dark Espresso Float */}
                <motion.div
                  initial={{ height: '0%' }}
                  animate={{ height: `${20 + config.espressoShots * 10}%` }}
                  transition={{ duration: 0.6 }}
                  className="w-full relative shadow-md"
                  style={{ backgroundColor: espressoColor }}
                />

                {/* Middle: Creamy Milk Layer */}
                <motion.div
                  initial={{ height: '0%' }}
                  animate={{ height: '35%' }}
                  transition={{ duration: 0.5 }}
                  className="w-full relative"
                  style={{ backgroundColor: milkColor }}
                />

                {/* Bottom: Whisked Matcha Layer */}
                <motion.div
                  initial={{ height: '0%' }}
                  animate={{ height: '35%' }}
                  transition={{ duration: 0.4 }}
                  className="w-full relative"
                  style={{ backgroundColor: matchaColor }}
                />
              </>
            )}

            {config.layerStyle === 'swirled' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
                className="w-full h-full relative"
                style={{
                  background: `radial-gradient(circle at 50% 30%, ${matchaColor}EE 0%, ${espressoColor}DD 40%, ${milkColor} 90%)`,
                }}
              >
                {/* Swirl marbled accent */}
                <div
                  className="absolute inset-0 opacity-40 mix-blend-overlay"
                  style={{
                    backgroundImage: `radial-gradient(${matchaColor} 2px, transparent 2px), radial-gradient(${espressoColor} 2px, transparent 2px)`,
                    backgroundSize: '16px 16px',
                    backgroundPosition: '0 0, 8px 8px',
                  }}
                />
              </motion.div>
            )}

            {config.layerStyle === 'layered_foam' && (
              <>
                {/* Middle: Espresso & Milk Duo */}
                <motion.div
                  initial={{ height: '0%' }}
                  animate={{ height: '45%' }}
                  transition={{ duration: 0.5 }}
                  className="w-full relative"
                  style={{
                    background: `linear-gradient(to bottom, ${espressoColor}, ${milkColor})`,
                  }}
                />

                {/* Bottom: Whisked Matcha */}
                <motion.div
                  initial={{ height: '0%' }}
                  animate={{ height: '45%' }}
                  transition={{ duration: 0.4 }}
                  className="w-full relative"
                  style={{ backgroundColor: matchaColor }}
                />
              </>
            )}
          </div>

          {/* 3. FOAM CROWN AT VERY TOP */}
          {hasFoam && (
            <motion.div
              initial={{ height: '0%', opacity: 0 }}
              animate={{ height: '22px', opacity: 1 }}
              transition={{ duration: 0.4 }}
              className="absolute top-2 inset-x-1 z-20 rounded-t-[10px] border-b border-white/20 shadow-md flex items-center justify-center overflow-hidden"
              style={{ backgroundColor: foamColor }}
            >
              {/* Foam micro bubbles */}
              <div className="w-full h-full bg-white/20 backdrop-blur-[1px] flex justify-around items-center px-2">
                <span className="w-1.5 h-1.5 rounded-full bg-white/40" />
                <span className="w-2 h-2 rounded-full bg-white/30" />
                <span className="w-1.5 h-1.5 rounded-full bg-white/50" />
                <span className="w-2.5 h-2 rounded-full bg-white/40" />
              </div>
            </motion.div>
          )}

          {/* TOPPINGS & DUSTING ON FOAM */}
          {hasDust && (
            <div className="absolute top-2.5 inset-x-3 z-30 flex justify-center gap-1 pointer-events-none">
              <div
                className="w-full h-2 rounded-full opacity-80 blur-[0.5px]"
                style={{
                  backgroundColor: config.toppings.includes('matcha_dust')
                    ? '#16A34A'
                    : '#451A03',
                }}
              />
            </div>
          )}

          {/* Caramel / Chocolate Drizzle */}
          {config.toppings.includes('caramel_drizzle') && (
            <div className="absolute top-2.5 inset-x-2 z-30 h-4 flex justify-around pointer-events-none">
              <span className="w-1 h-3 rounded-full bg-amber-600 rotate-12" />
              <span className="w-1 h-4 rounded-full bg-amber-600 -rotate-12" />
              <span className="w-1 h-3 rounded-full bg-amber-600 rotate-45" />
            </div>
          )}

          {/* Edible Gold Flakes */}
          {config.toppings.includes('gold_flakes') && (
            <div className="absolute top-3 inset-x-4 z-30 flex justify-between pointer-events-none">
              <span className="w-2 h-2 rotate-45 bg-amber-300 shadow-sm animate-pulse" />
              <span className="w-1.5 h-1.5 rotate-12 bg-yellow-200 shadow-sm" />
            </div>
          )}
        </div>

        {/* Straw for Iced Drinks */}
        {isIced && (
          <div className="absolute -top-10 right-8 w-2.5 h-44 bg-gradient-to-r from-emerald-500/80 via-emerald-400/90 to-emerald-600/80 rounded-full border border-white/20 shadow-md rotate-12 z-0 pointer-events-none" />
        )}
      </div>

      {/* Ratios & Highlights summary under cup */}
      <div className="w-full mt-2 grid grid-cols-2 gap-2 text-center text-xs">
        <div className="p-2 rounded-xl bg-stone-900/80 border border-stone-800">
          <p className="text-stone-400 text-[10px] uppercase font-semibold">Matcha Ratio</p>
          <p className="text-emerald-400 font-bold">
            {config.matchaShots} Shot ({config.matchaGrade})
          </p>
        </div>
        <div className="p-2 rounded-xl bg-stone-900/80 border border-stone-800">
          <p className="text-stone-400 text-[10px] uppercase font-semibold">Coffee Ratio</p>
          <p className="text-amber-400 font-bold">
            {config.espressoShots} Shot ({config.espressoRoast})
          </p>
        </div>
      </div>
    </div>
  );
};
