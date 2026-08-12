import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { CustomBuilder } from './components/CustomBuilder';
import { SignatureMenu } from './components/SignatureMenu';
import { AiBaristaModal } from './components/AiBaristaModal';
import { SavedRecipes } from './components/SavedRecipes';
import { AdminPanel } from './components/AdminPanel';
import { CartDrawer } from './components/CartDrawer';
import { OrderConfirmationModal } from './components/OrderConfirmationModal';
import {
  CustomDrinkConfig,
  CartItem,
  SignatureDrink,
  Order,
  OrderStatus,
} from './types';
import { calculateDrinkPrice, calculateNutrition, DEFAULT_CUSTOM_DRINK } from './data/menuData';

export default function App() {
  const [activeTab, setActiveTab] = useState<'builder' | 'menu' | 'ai' | 'saved' | 'admin'>('builder');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [savedRecipes, setSavedRecipes] = useState<
    { id: string; name: string; config: CustomDrinkConfig; createdAt: string }[]
  >([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [latestPlacedOrder, setLatestPlacedOrder] = useState<Order | null>(null);
  const [builderConfig, setBuilderConfig] = useState<CustomDrinkConfig>(DEFAULT_CUSTOM_DRINK);

  useEffect(() => {
    fetchSavedRecipes();
    fetchOrders();
  }, []);

  const fetchSavedRecipes = async () => {
    try {
      const res = await fetch('/api/custom-recipes');
      if (res.ok) {
        const data = await res.json();
        setSavedRecipes(data);
      }
    } catch (err) {
      console.error('Failed to fetch saved recipes:', err);
    }
  };

  const fetchOrders = async () => {
    try {
      const res = await fetch('/api/orders');
      if (res.ok) {
        const data = await res.json();
        setOrders(data);
      }
    } catch (err) {
      console.error('Failed to fetch orders:', err);
    }
  };

  const handleAddToCart = (config: CustomDrinkConfig) => {
    const price = calculateDrinkPrice(config);
    const nutrition = calculateNutrition(config);

    const newItem: CartItem = {
      cartId: `cart-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      drinkConfig: config,
      unitPrice: price,
      quantity: 1,
      calculatedNutrition: nutrition,
    };

    setCart((prev) => [...prev, newItem]);
    setIsCartOpen(true);
  };

  const handleSaveRecipe = async (config: CustomDrinkConfig) => {
    try {
      const res = await fetch('/api/custom-recipes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: config.name || 'Custom Dirty Matcha Blend',
          config,
        }),
      });
      if (res.ok) {
        const savedItem = await res.json();
        setSavedRecipes((prev) => [savedItem, ...prev]);
      }
    } catch (err) {
      console.error('Failed to save recipe:', err);
    }
  };

  const handleDeleteRecipe = (id: string) => {
    setSavedRecipes((prev) => prev.filter((r) => r.id !== id));
  };

  const handleUpdateCartQuantity = (cartId: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.cartId === cartId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleRemoveCartItem = (cartId: string) => {
    setCart((prev) => prev.filter((i) => i.cartId !== cartId));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  const handleOrderPlaced = (newOrder: Order) => {
    setOrders((prev) => [newOrder, ...prev]);
    setLatestPlacedOrder(newOrder);
  };

  const handleUpdateOrderStatus = async (id: string, status: OrderStatus) => {
    try {
      const res = await fetch(`/api/orders/${id}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });
      if (res.ok) {
        setOrders((prev) =>
          prev.map((o) => (o.id === id ? { ...o, status } : o))
        );
      }
    } catch (err) {
      console.error('Failed to update status:', err);
    }
  };

  const handleLoadConfigToBuilder = (config: CustomDrinkConfig) => {
    setBuilderConfig(config);
    setActiveTab('builder');
  };

  const handleQuickOrderSignature = (drink: SignatureDrink) => {
    handleAddToCart(drink.defaultConfig);
  };

  const activeOrdersCount = orders.filter(
    (o) => o.status === 'preparing' || o.status === 'pending'
  ).length;

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 font-sans selection:bg-emerald-500 selection:text-stone-950 flex flex-col justify-between">
      <div>
        {/* Navigation Bar */}
        <Navbar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          cartCount={cart.reduce((acc, i) => acc + i.quantity, 0)}
          openCart={() => setIsCartOpen(true)}
          activeOrderCount={activeOrdersCount}
        />

        {/* Main Content views */}
        <main>
          {activeTab === 'builder' && (
            <CustomBuilder
              key={JSON.stringify(builderConfig)}
              initialConfig={builderConfig}
              onAddToCart={handleAddToCart}
              onSaveRecipe={handleSaveRecipe}
            />
          )}

          {activeTab === 'menu' && (
            <SignatureMenu
              onSelectCustomize={handleLoadConfigToBuilder}
              onQuickOrder={handleQuickOrderSignature}
            />
          )}

          {activeTab === 'ai' && (
            <AiBaristaModal
              onLoadConfigToBuilder={handleLoadConfigToBuilder}
              onAddToCart={handleAddToCart}
            />
          )}

          {activeTab === 'saved' && (
            <SavedRecipes
              savedRecipes={savedRecipes}
              onLoadConfigToBuilder={handleLoadConfigToBuilder}
              onAddToCart={handleAddToCart}
              onDeleteRecipe={handleDeleteRecipe}
            />
          )}

          {activeTab === 'admin' && (
            <AdminPanel
              orders={orders}
              onUpdateOrderStatus={handleUpdateOrderStatus}
            />
          )}
        </main>
      </div>

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveCartItem}
        onClearCart={handleClearCart}
        onOrderPlaced={handleOrderPlaced}
      />

      {/* Order Confirmation Modal */}
      <OrderConfirmationModal
        order={latestPlacedOrder}
        onClose={() => setLatestPlacedOrder(null)}
      />

      {/* Footer */}
      <footer className="mt-16 border-t border-stone-800/80 bg-stone-950/90 py-8 px-4 text-xs text-stone-300">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="font-extrabold font-serif text-stone-100 text-sm">MATCHA & COFFEE LAB</span>
            </div>
            <span className="text-stone-400 hidden sm:inline">•</span>
            <p className="text-stone-400 text-center sm:text-left">
              Crafted with First-Harvest Uji Ceremonial Matcha & Single-Origin Espresso Roasts.
            </p>
          </div>

          {/* Direct Business Contact Info */}
          <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-semibold bg-stone-900 px-4 py-2.5 rounded-2xl border border-stone-800 text-stone-200">
            <div className="flex items-center gap-1.5 text-amber-400">
              <span>📞 Phone:</span>
              <a href="tel:9982998664" className="hover:underline text-stone-100 font-bold">
                9982998664
              </a>
            </div>
            <span className="text-stone-700">|</span>
            <div className="flex items-center gap-1.5 text-emerald-400">
              <span>✉️ Business Email:</span>
              <a href="mailto:ramjeet9604@flash.co" className="hover:underline text-stone-100 font-bold">
                ramjeet9604@flash.co
              </a>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-4 pt-4 border-t border-stone-900 flex justify-between items-center text-[11px] text-stone-400">
          <span>© 2026 Matcha & Coffee Lab • Prices in Indian Rupees (₹)</span>
          <span>Owner: Ramjeet Choudhary</span>
        </div>
      </footer>
    </div>
  );
}
