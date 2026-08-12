import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { CheckCircle2, Clock, Store, QrCode, CupSoda, X } from 'lucide-react';
import { Order, OrderStatus } from '../types';

interface OrderConfirmationModalProps {
  order: Order | null;
  onClose: () => void;
}

export const OrderConfirmationModal: React.FC<OrderConfirmationModalProps> = ({
  order,
  onClose,
}) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(1);

  const steps = [
    { title: 'Received', desc: 'Order transmitted to barista queue' },
    { title: 'Whisking Matcha', desc: 'Sifting & whisking ceremonial Uji tea' },
    { title: 'Pulling Espresso', desc: 'Grinding house coffee & pulling shots' },
    { title: 'Layering Beverage', desc: 'Assembling custom layers & foam crown' },
    { title: 'Ready at Bar', desc: 'Your drink is ready at the express counter!' },
  ];

  // Auto-advance simulated order progress every 4 seconds for delight!
  useEffect(() => {
    if (!order) return;
    const interval = setInterval(() => {
      setCurrentStepIndex((prev) => (prev < steps.length - 1 ? prev + 1 : prev));
    }, 4000);
    return () => clearInterval(interval);
  }, [order]);

  if (!order) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/80 backdrop-blur-md flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="w-full max-w-xl bg-stone-900 border border-stone-800 rounded-3xl p-6 sm:p-8 text-stone-100 shadow-2xl relative space-y-6"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-xl bg-stone-800 text-stone-400 hover:text-stone-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Celebratory Header */}
        <div className="text-center space-y-2">
          <div className="w-16 h-16 rounded-full bg-emerald-950 border-2 border-emerald-500 text-emerald-400 flex items-center justify-center mx-auto shadow-lg shadow-emerald-950/50 animate-bounce">
            <CheckCircle2 className="w-9 h-9" />
          </div>
          <p className="text-xs font-bold text-emerald-400 uppercase tracking-widest">
            Order Confirmed & Sent To Barista!
          </p>
          <h2 className="text-3xl font-black font-serif text-stone-100">
            Order #{order.id}
          </h2>
          <p className="text-xs text-stone-400">
            Guest: <span className="font-bold text-stone-200">{order.customerName}</span> • Estimated Pickup: <span className="font-bold text-amber-400">{order.pickupTime}</span>
          </p>
        </div>

        {/* Live Barista Assembly Progress Timeline */}
        <div className="bg-stone-950 p-4 rounded-2xl border border-stone-800 space-y-3">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-stone-300 flex items-center gap-1.5">
              <CupSoda className="w-4 h-4 text-emerald-400 animate-pulse" /> Live Barista Tracker
            </span>
            <span className="text-[10px] text-amber-400 font-bold uppercase">
              {steps[currentStepIndex].title}
            </span>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-stone-900 h-2 rounded-full overflow-hidden">
            <motion.div
              animate={{ width: `${((currentStepIndex + 1) / steps.length) * 100}%` }}
              transition={{ duration: 0.5 }}
              className="h-full bg-gradient-to-r from-emerald-500 to-amber-500"
            />
          </div>

          <p className="text-center text-[11px] text-stone-400 italic">
            "{steps[currentStepIndex].desc}"
          </p>
        </div>

        {/* QR Code pickup badge */}
        <div className="flex items-center justify-center gap-4 bg-stone-950/80 p-4 rounded-2xl border border-stone-800">
          <div className="p-2 bg-white rounded-xl shadow-md shrink-0">
            <QrCode className="w-16 h-16 text-stone-950" />
          </div>
          <div className="text-left space-y-1 text-xs">
            <p className="font-bold text-stone-200">Pickup Pass QR Code</p>
            <p className="text-[11px] text-stone-400">
              Scan at the <span className="text-emerald-400 font-bold">Express Counter Bar</span> or show your name.
            </p>
            <p className="text-[10px] text-stone-500">
              Business Contact: +91 9982998664 • Email: ramjeet9604@flash.co
            </p>
          </div>
        </div>

        {/* Item Summary */}
        <div className="space-y-2 border-t border-stone-800 pt-4 text-xs">
          <p className="font-bold text-stone-400 uppercase tracking-wider">
            Ordered Fusion Beverages:
          </p>
          {order.items.map((item, i) => (
            <div key={i} className="flex justify-between items-center py-1.5 border-b border-stone-800/60">
              <div>
                <p className="font-bold text-stone-200">{item.drinkConfig.name}</p>
                <p className="text-[10px] text-stone-400">
                  {item.quantity}x • {item.drinkConfig.temp} {item.drinkConfig.size} ({item.drinkConfig.matchaShots} Matcha / {item.drinkConfig.espressoShots} Coffee)
                </p>
              </div>
              <span className="font-bold text-emerald-400">
                ₹{(item.unitPrice * item.quantity).toFixed(0)}
              </span>
            </div>
          ))}

          <div className="pt-2 flex justify-between font-black text-sm text-stone-100">
            <span>Total Paid</span>
            <span className="text-emerald-400">₹{order.total.toFixed(0)}</span>
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-full py-3 rounded-2xl bg-stone-800 hover:bg-stone-700 text-stone-200 font-bold text-xs transition-colors"
        >
          Close & Track Order
        </button>
      </motion.div>
    </div>
  );
};
