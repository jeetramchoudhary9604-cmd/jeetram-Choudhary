import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  Clock,
  Store,
  CreditCard,
  CheckCircle2,
  CupSoda,
} from 'lucide-react';
import { CartItem, Order } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQuantity: (cartId: string, delta: number) => void;
  onRemoveItem: (cartId: string) => void;
  onClearCart: () => void;
  onOrderPlaced: (order: Order) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cart,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onOrderPlaced,
}) => {
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [pickupTime, setPickupTime] = useState('ASAP (10-15m)');
  const [pickupType, setPickupType] = useState<'in_store' | 'curbside' | 'express_counter'>('express_counter');
  const [tipPercent, setTipPercent] = useState<number>(18);
  const [submitting, setSubmitting] = useState(false);

  const subtotal = cart.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);
  const tax = Math.round(subtotal * 0.05);
  const tipAmount = Math.round((subtotal * (tipPercent / 100)) * 100) / 100;
  const grandTotal = Math.round((subtotal + tax + tipAmount) * 100) / 100;

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) return;

    setSubmitting(true);

    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customerName: customerName || 'Valued Matcha Guest',
          customerPhone: customerPhone || '',
          items: cart,
          pickupTime,
          pickupType,
          tip: tipAmount,
        }),
      });

      if (res.ok) {
        const newOrder: Order = await res.json();
        onClearCart();
        onOrderPlaced(newOrder);
        onClose();
      }
    } catch (err) {
      console.error('Checkout failed:', err);
    } finally {
      setSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-stone-950/80 backdrop-blur-sm"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="w-screen max-w-md bg-stone-900 border-l border-stone-800 text-stone-100 shadow-2xl flex flex-col justify-between"
        >
          {/* Header */}
          <div className="p-5 border-b border-stone-800 flex items-center justify-between bg-stone-950">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-emerald-400" />
              <h3 className="text-lg font-extrabold font-serif">Your Order Cart</h3>
              <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-800">
                {cart.reduce((acc, i) => acc + i.quantity, 0)} Items
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-stone-400 hover:text-stone-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Item List & Form */}
          <div className="flex-1 overflow-y-auto p-5 space-y-6">
            {cart.length > 0 ? (
              <>
                {/* Items */}
                <div className="space-y-3">
                  <p className="text-xs font-bold text-stone-400 uppercase tracking-wider">
                    Custom Fusion Beverage Items
                  </p>
                  {cart.map((item) => (
                    <div
                      key={item.cartId}
                      className="p-3.5 rounded-2xl bg-stone-950 border border-stone-800/80 flex items-center justify-between gap-3"
                    >
                      <div className="space-y-1">
                        <p className="text-xs font-bold text-stone-100 font-serif">
                          {item.drinkConfig.name}
                        </p>
                        <p className="text-[10px] text-stone-400">
                          {item.drinkConfig.temp} • {item.drinkConfig.size} • {item.drinkConfig.matchaShots}x Matcha / {item.drinkConfig.espressoShots}x Espresso
                        </p>
                        <p className="text-[10px] text-emerald-400 font-semibold">
                          ₹{item.unitPrice.toFixed(0)} each
                        </p>
                      </div>

                      {/* Quantity Toggles */}
                      <div className="flex items-center gap-2 shrink-0">
                        <div className="flex items-center gap-1 bg-stone-900 p-1 rounded-xl border border-stone-800">
                          <button
                            onClick={() => onUpdateQuantity(item.cartId, -1)}
                            className="p-1 rounded-lg hover:bg-stone-800 text-stone-300"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-xs font-bold px-1.5">{item.quantity}</span>
                          <button
                            onClick={() => onUpdateQuantity(item.cartId, 1)}
                            className="p-1 rounded-lg hover:bg-stone-800 text-stone-300"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        <button
                          onClick={() => onRemoveItem(item.cartId)}
                          className="p-1.5 text-stone-500 hover:text-red-400 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <hr className="border-stone-800" />

                {/* Pickup Options */}
                <div className="space-y-3">
                  <p className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                    Pickup Details
                  </p>

                  <div>
                    <label className="block text-[11px] text-stone-400 mb-1">Guest Name:</label>
                    <input
                      type="text"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      placeholder="Enter your name for the cup..."
                      className="w-full bg-stone-950 border border-stone-800 rounded-xl p-2.5 text-xs text-stone-100 focus:outline-none focus:border-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] text-stone-400 mb-1">Phone (Contact for order updates):</label>
                    <input
                      type="text"
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      placeholder="9982998664"
                      className="w-full bg-stone-950 border border-stone-800 rounded-xl p-2.5 text-xs text-stone-100 focus:outline-none focus:border-emerald-500"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2 pt-1">
                    <div>
                      <label className="block text-[10px] text-stone-400 mb-1">Estimated Pickup:</label>
                      <select
                        value={pickupTime}
                        onChange={(e) => setPickupTime(e.target.value)}
                        className="w-full bg-stone-950 border border-stone-800 rounded-xl p-2 text-xs text-stone-100 focus:outline-none"
                      >
                        <option value="ASAP (10-15m)">ASAP (10-15 mins)</option>
                        <option value="20 mins">In 20 mins</option>
                        <option value="30 mins">In 30 mins</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[10px] text-stone-400 mb-1">Station Counter:</label>
                      <select
                        value={pickupType}
                        onChange={(e) => setPickupType(e.target.value as any)}
                        className="w-full bg-stone-950 border border-stone-800 rounded-xl p-2 text-xs text-stone-100 focus:outline-none"
                      >
                        <option value="express_counter">Express Counter Bar</option>
                        <option value="in_store">In-Store Cafe Seating</option>
                        <option value="curbside">Curbside Pickup</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Tip Selector */}
                <div className="space-y-2">
                  <p className="text-xs font-bold text-stone-300">Support Your Baristas Tip:</p>
                  <div className="grid grid-cols-4 gap-2">
                    {[10, 15, 18, 20].map((pct) => (
                      <button
                        key={pct}
                        type="button"
                        onClick={() => setTipPercent(pct)}
                        className={`py-1.5 rounded-xl text-xs font-bold border transition-all ${
                          tipPercent === pct
                            ? 'bg-emerald-950 border-emerald-500 text-emerald-300'
                            : 'bg-stone-950 border-stone-800 text-stone-400'
                        }`}
                      >
                        {pct}%
                      </button>
                    ))}
                  </div>
                </div>
              </>
            ) : (
              <div className="text-center py-20 space-y-4 text-stone-500">
                <CupSoda className="w-12 h-12 mx-auto text-stone-700" />
                <p className="text-sm font-semibold text-stone-300">Your cart is empty</p>
                <p className="text-xs">
                  Customize your dirty matcha or choose from our signature menu to place an order.
                </p>
              </div>
            )}
          </div>

          {/* Footer Checkout Summary */}
          {cart.length > 0 && (
            <div className="p-5 border-t border-stone-800 bg-stone-950 space-y-3">
              <div className="space-y-1.5 text-xs text-stone-300">
                <div className="flex justify-between">
                  <span className="text-stone-400">Subtotal</span>
                  <span>₹{subtotal.toFixed(0)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-400">GST / Taxes (5%)</span>
                  <span>₹{tax.toFixed(0)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-400">Barista Tip ({tipPercent}%)</span>
                  <span>₹{tipAmount.toFixed(0)}</span>
                </div>
                <div className="flex justify-between font-black text-sm text-stone-100 pt-2 border-t border-stone-800">
                  <span>Grand Total</span>
                  <span className="text-emerald-400">₹{grandTotal.toFixed(0)}</span>
                </div>
              </div>

              <button
                onClick={handleCheckout}
                disabled={submitting}
                className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-emerald-600 via-emerald-500 to-amber-600 hover:brightness-110 active:scale-[0.98] text-white font-black text-sm shadow-xl shadow-emerald-950/50 flex items-center justify-center gap-2 transition-all disabled:opacity-50"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>
                  {submitting ? 'Transmitting Order...' : `Place Order • ₹${grandTotal.toFixed(0)}`}
                </span>
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};
