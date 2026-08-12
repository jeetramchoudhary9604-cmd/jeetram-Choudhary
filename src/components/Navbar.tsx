import React from 'react';
import {
  Sparkles,
  CupSoda,
  Coffee,
  Bookmark,
  ShoppingBag,
  ClipboardList,
  Store,
} from 'lucide-react';

interface NavbarProps {
  activeTab: 'builder' | 'menu' | 'ai' | 'saved' | 'admin';
  setActiveTab: (tab: 'builder' | 'menu' | 'ai' | 'saved' | 'admin') => void;
  cartCount: number;
  openCart: () => void;
  activeOrderCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  cartCount,
  openCart,
  activeOrderCount,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-stone-950/90 backdrop-blur-md border-b border-stone-800/80">
      {/* Top Business Contact Utility Ribbon */}
      <div className="bg-stone-900 border-b border-stone-800/80 px-4 py-1 text-[11px] text-stone-300">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <span className="text-emerald-400 font-bold hidden sm:inline">
            🍵 Custom Matcha & Coffee Beverage Station
          </span>
          <div className="flex items-center gap-3 text-stone-300 ml-auto sm:ml-0">
            <span className="flex items-center gap-1 font-semibold">
              <span className="text-amber-400">📞</span> 9982998664
            </span>
            <span className="text-stone-700">•</span>
            <span className="flex items-center gap-1 font-semibold">
              <span className="text-emerald-400">✉️</span> ramjeet9604@flash.co
            </span>
          </div>
        </div>
      </div>

      <div className="px-4 lg:px-8 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <button
          onClick={() => setActiveTab('builder')}
          className="flex items-center gap-3 group text-left focus:outline-none"
        >
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-emerald-600 via-emerald-500 to-amber-600 p-0.5 shadow-lg shadow-emerald-950/50 group-hover:scale-105 transition-transform">
            <div className="w-full h-full bg-stone-950 rounded-[14px] flex items-center justify-center">
              <span className="text-lg font-black bg-gradient-to-r from-emerald-400 via-amber-300 to-emerald-200 bg-clip-text text-transparent">
                M/C
              </span>
            </div>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h1 className="text-lg font-extrabold tracking-tight text-stone-100 font-serif">
                MATCHA <span className="text-amber-500 font-sans">&</span> COFFEE
              </h1>
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-800/60">
                LAB
              </span>
            </div>
            <p className="text-[11px] text-stone-400 hidden sm:block">
              Matcha & Coffee Fusion Specialists
            </p>
          </div>
        </button>

        {/* Navigation Tabs */}
        <nav className="hidden md:flex items-center gap-1 bg-stone-900/80 p-1.5 rounded-2xl border border-stone-800">
          <button
            onClick={() => setActiveTab('builder')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all ${
              activeTab === 'builder'
                ? 'bg-gradient-to-r from-emerald-600 to-emerald-700 text-white shadow-md'
                : 'text-stone-300 hover:text-white hover:bg-stone-800/60'
            }`}
          >
            <CupSoda className="w-4 h-4" />
            <span>Make Yourself</span>
          </button>

          <button
            onClick={() => setActiveTab('menu')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all ${
              activeTab === 'menu'
                ? 'bg-gradient-to-r from-emerald-600 to-emerald-700 text-white shadow-md'
                : 'text-stone-300 hover:text-white hover:bg-stone-800/60'
            }`}
          >
            <Coffee className="w-4 h-4" />
            <span>Signature Menu</span>
          </button>

          <button
            onClick={() => setActiveTab('ai')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all ${
              activeTab === 'ai'
                ? 'bg-gradient-to-r from-amber-600 to-amber-700 text-white shadow-md'
                : 'text-amber-300 hover:text-amber-200 hover:bg-amber-950/40'
            }`}
          >
            <Sparkles className="w-4 h-4 text-amber-300 animate-pulse" />
            <span>AI Barista</span>
          </button>

          <button
            onClick={() => setActiveTab('saved')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all ${
              activeTab === 'saved'
                ? 'bg-gradient-to-r from-emerald-600 to-emerald-700 text-white shadow-md'
                : 'text-stone-300 hover:text-white hover:bg-stone-800/60'
            }`}
          >
            <Bookmark className="w-4 h-4" />
            <span>Saved Recipes</span>
          </button>

          <button
            onClick={() => setActiveTab('admin')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all ${
              activeTab === 'admin'
                ? 'bg-gradient-to-r from-stone-800 to-stone-700 text-white shadow-md'
                : 'text-stone-400 hover:text-stone-200 hover:bg-stone-800/60'
            }`}
          >
            <Store className="w-4 h-4" />
            <span>Barista Desk</span>
            {activeOrderCount > 0 && (
              <span className="w-4 h-4 rounded-full bg-amber-500 text-stone-950 text-[10px] font-bold flex items-center justify-center">
                {activeOrderCount}
              </span>
            )}
          </button>
        </nav>

        {/* Cart & Quick Actions */}
        <div className="flex items-center gap-2">
          <button
            onClick={openCart}
            className="relative flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-gradient-to-r from-emerald-600 via-emerald-500 to-amber-600 text-white text-xs font-bold shadow-lg shadow-emerald-950/40 hover:brightness-110 active:scale-95 transition-all"
          >
            <ShoppingBag className="w-4 h-4" />
            <span className="hidden sm:inline">Order Cart</span>
            {cartCount > 0 && (
              <span className="ml-1 w-5 h-5 rounded-full bg-stone-950 text-emerald-400 text-xs font-black flex items-center justify-center border border-emerald-500/50">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </div>

      {/* Mobile Tab bar bottom */}
      <div className="flex md:hidden items-center justify-around mt-3 pt-2 border-t border-stone-800/60 text-xs">
        <button
          onClick={() => setActiveTab('builder')}
          className={`flex flex-col items-center gap-1 py-1 ${
            activeTab === 'builder' ? 'text-emerald-400 font-bold' : 'text-stone-400'
          }`}
        >
          <CupSoda className="w-4 h-4" />
          <span className="text-[10px]">Builder</span>
        </button>

        <button
          onClick={() => setActiveTab('menu')}
          className={`flex flex-col items-center gap-1 py-1 ${
            activeTab === 'menu' ? 'text-emerald-400 font-bold' : 'text-stone-400'
          }`}
        >
          <Coffee className="w-4 h-4" />
          <span className="text-[10px]">Menu</span>
        </button>

        <button
          onClick={() => setActiveTab('ai')}
          className={`flex flex-col items-center gap-1 py-1 ${
            activeTab === 'ai' ? 'text-amber-400 font-bold' : 'text-stone-400'
          }`}
        >
          <Sparkles className="w-4 h-4" />
          <span className="text-[10px]">AI Barista</span>
        </button>

        <button
          onClick={() => setActiveTab('saved')}
          className={`flex flex-col items-center gap-1 py-1 ${
            activeTab === 'saved' ? 'text-emerald-400 font-bold' : 'text-stone-400'
          }`}
        >
          <Bookmark className="w-4 h-4" />
          <span className="text-[10px]">Saved</span>
        </button>

        <button
          onClick={() => setActiveTab('admin')}
          className={`flex flex-col items-center gap-1 py-1 ${
            activeTab === 'admin' ? 'text-stone-200 font-bold' : 'text-stone-400'
          }`}
        >
          <Store className="w-4 h-4" />
          <span className="text-[10px]">Orders</span>
        </button>
      </div>
    </header>
  );
};
