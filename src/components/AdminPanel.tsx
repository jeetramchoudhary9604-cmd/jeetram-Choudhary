import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import {
  Store,
  Clock,
  CheckCircle2,
  AlertCircle,
  TrendingUp,
  CupSoda,
  DollarSign,
  Package,
  Layers,
  RefreshCw,
} from 'lucide-react';
import { Order, OrderStatus, IngredientStock } from '../types';

interface AdminPanelProps {
  orders: Order[];
  onUpdateOrderStatus: (id: string, status: OrderStatus) => void;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({
  orders,
  onUpdateOrderStatus,
}) => {
  const [stockList, setStockList] = useState<IngredientStock[]>([]);
  const [loadingStock, setLoadingStock] = useState(false);

  useEffect(() => {
    fetchStock();
  }, []);

  const fetchStock = async () => {
    setLoadingStock(true);
    try {
      const res = await fetch('/api/stock');
      if (res.ok) {
        const data = await res.json();
        setStockList(data);
      }
    } catch (err) {
      console.error('Failed to fetch stock:', err);
    } finally {
      setLoadingStock(false);
    }
  };

  const handleStockToggle = async (id: string, currentVal: boolean) => {
    try {
      const res = await fetch(`/api/stock/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ inStock: !currentVal }),
      });
      if (res.ok) {
        setStockList((prev) =>
          prev.map((item) => (item.id === id ? { ...item, inStock: !currentVal } : item))
        );
      }
    } catch (err) {
      console.error('Stock update failed:', err);
    }
  };

  const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0);
  const activeOrdersCount = orders.filter((o) => o.status === 'preparing' || o.status === 'pending').length;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-stone-800 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-stone-800 text-stone-300 text-xs font-bold uppercase tracking-wider mb-2">
            <Store className="w-3.5 h-3.5 text-amber-400" />
            <span>Barista Command & Business Operations</span>
          </div>
          <h2 className="text-3xl font-black font-serif text-stone-100">
            Store Owner & Barista Operations Desk
          </h2>
          <p className="text-stone-400 text-sm">
            Manage live incoming matcha-coffee fusion orders, toggle ingredient stock levels, and review cafe analytics.
          </p>
        </div>

        <button
          onClick={fetchStock}
          className="py-2.5 px-4 rounded-xl bg-stone-900 border border-stone-800 text-stone-300 text-xs font-bold flex items-center gap-2 hover:bg-stone-800 transition-colors"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loadingStock ? 'animate-spin' : ''}`} />
          <span>Refresh Desk</span>
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-stone-900/90 border border-stone-800 shadow-xl space-y-1">
          <p className="text-xs font-bold text-stone-400 uppercase">Active Barista Queue</p>
          <p className="text-3xl font-black text-amber-400">{activeOrdersCount} Orders</p>
          <p className="text-[11px] text-stone-500">Awaiting preparation</p>
        </div>

        <div className="p-5 rounded-2xl bg-stone-900/90 border border-stone-800 shadow-xl space-y-1">
          <p className="text-xs font-bold text-stone-400 uppercase">Gross Sales Today</p>
          <p className="text-3xl font-black text-emerald-400">₹{totalRevenue.toFixed(0)}</p>
          <p className="text-[11px] text-stone-500">{orders.length} total orders placed</p>
        </div>

        <div className="p-5 rounded-2xl bg-stone-900/90 border border-stone-800 shadow-xl space-y-1">
          <p className="text-xs font-bold text-stone-400 uppercase">Top Ratio Blend</p>
          <p className="text-2xl font-black text-stone-100">1 Matcha : 2 Espresso</p>
          <p className="text-[11px] text-stone-500">"The Dirty Matcha" ratio</p>
        </div>

        <div className="p-5 rounded-2xl bg-stone-900/90 border border-stone-800 shadow-xl space-y-1">
          <p className="text-xs font-bold text-stone-400 uppercase">Top Milk Choice</p>
          <p className="text-2xl font-black text-sky-400">Oat Milk (74%)</p>
          <p className="text-[11px] text-stone-500">Oatly Barista Edition</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Live Order Queue (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <h3 className="text-lg font-bold text-stone-200 font-serif flex items-center gap-2">
            <Clock className="w-5 h-5 text-amber-400" />
            Live Customer Barista Queue ({orders.length})
          </h3>

          <div className="space-y-4">
            {orders.map((order) => (
              <div
                key={order.id}
                className={`p-5 rounded-2xl border transition-all ${
                  order.status === 'preparing'
                    ? 'bg-amber-950/30 border-amber-500/50'
                    : order.status === 'ready'
                    ? 'bg-emerald-950/30 border-emerald-500/50'
                    : 'bg-stone-900/80 border-stone-800'
                }`}
              >
                <div className="flex items-start justify-between gap-2 border-b border-stone-800/80 pb-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-black text-stone-100 text-base">#{order.id}</span>
                      <span
                        className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${
                          order.status === 'preparing'
                            ? 'bg-amber-950 text-amber-300 border-amber-800'
                            : order.status === 'ready'
                            ? 'bg-emerald-950 text-emerald-300 border-emerald-800'
                            : 'bg-stone-950 text-stone-400 border-stone-800'
                        }`}
                      >
                        {order.status}
                      </span>
                    </div>
                    <p className="text-xs text-stone-300 mt-1">
                      Guest: <span className="font-bold">{order.customerName}</span> • Pickup Station: <span className="text-amber-400 font-bold">{order.pickupType.replace('_', ' ')}</span> ({order.pickupTime})
                    </p>
                  </div>
                  <span className="text-lg font-black text-emerald-400">₹{order.total.toFixed(0)}</span>
                </div>

                {/* Drink Items */}
                <div className="py-3 space-y-2 text-xs">
                  {order.items.map((item, idx) => (
                    <div key={idx} className="p-2.5 rounded-xl bg-stone-950/80 border border-stone-800">
                      <p className="font-bold text-stone-200">
                        {item.quantity}x {item.drinkConfig.name} (₹{item.unitPrice.toFixed(0)})
                      </p>
                      <p className="text-[10px] text-stone-400 mt-0.5">
                        {item.drinkConfig.temp} • {item.drinkConfig.size} • {item.drinkConfig.matchaShots} Matcha ({item.drinkConfig.matchaGrade}) + {item.drinkConfig.espressoShots} Espresso ({item.drinkConfig.espressoRoast})
                      </p>
                      <p className="text-[10px] text-amber-300 font-semibold mt-0.5">
                        Milk: {item.drinkConfig.milk} | Syrup: {item.drinkConfig.syrup} ({item.drinkConfig.sweetness}%) | Foam: {item.drinkConfig.foam}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Status Advancement Controls */}
                <div className="flex items-center justify-end gap-2 pt-2 border-t border-stone-800/80">
                  <span className="text-xs text-stone-400 font-medium">Update Barista Status:</span>
                  <button
                    onClick={() => onUpdateOrderStatus(order.id, 'preparing')}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all ${
                      order.status === 'preparing'
                        ? 'bg-amber-500 text-stone-950 border-amber-400'
                        : 'bg-stone-950 text-stone-400 border-stone-800'
                    }`}
                  >
                    Whisking
                  </button>

                  <button
                    onClick={() => onUpdateOrderStatus(order.id, 'ready')}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all ${
                      order.status === 'ready'
                        ? 'bg-emerald-500 text-stone-950 border-emerald-400'
                        : 'bg-stone-950 text-stone-400 border-stone-800'
                    }`}
                  >
                    Ready at Bar
                  </button>

                  <button
                    onClick={() => onUpdateOrderStatus(order.id, 'completed')}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all ${
                      order.status === 'completed'
                        ? 'bg-sky-500 text-stone-950 border-sky-400'
                        : 'bg-stone-950 text-stone-400 border-stone-800'
                    }`}
                  >
                    Picked Up
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Ingredient Stock Manager (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <h3 className="text-lg font-bold text-stone-200 font-serif flex items-center gap-2">
            <Package className="w-5 h-5 text-emerald-400" />
            Ingredient Inventory & Stock Toggles
          </h3>

          <div className="p-5 rounded-2xl bg-stone-900/90 border border-stone-800 space-y-3">
            <p className="text-xs text-stone-400">
              Toggle items in real-time. Out of stock ingredients will automatically disable corresponding customizer options.
            </p>

            <div className="space-y-2">
              {stockList.map((item) => (
                <div
                  key={item.id}
                  className="p-3 rounded-xl bg-stone-950 border border-stone-800 flex items-center justify-between gap-3 text-xs"
                >
                  <div>
                    <p className="font-bold text-stone-200">{item.name}</p>
                    <p className="text-[10px] text-stone-500 uppercase">{item.category}</p>
                  </div>

                  <button
                    onClick={() => handleStockToggle(item.id, item.inStock)}
                    className={`px-3 py-1 rounded-full font-extrabold text-[10px] uppercase tracking-wider transition-all border ${
                      item.inStock
                        ? 'bg-emerald-950 text-emerald-400 border-emerald-800'
                        : 'bg-red-950 text-red-400 border-red-800'
                    }`}
                  >
                    {item.inStock ? 'In Stock' : 'Sold Out'}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
