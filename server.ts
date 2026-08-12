import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import {
  SIGNATURE_DRINKS,
  INITIAL_STOCK,
  calculateDrinkPrice,
  calculateNutrition,
  DEFAULT_CUSTOM_DRINK,
} from './src/data/menuData.js';
import { CustomDrinkConfig, Order, AiRecommendationRequest } from './src/types.js';

const app = express();
const PORT = 3000;

app.use(express.json());

// In-memory data stores for session demo
let mockOrders: Order[] = [
  {
    id: 'MCL-1001',
    customerName: 'Ramjeet Choudhary',
    customerEmail: 'ramjeet9604@flash.co',
    customerPhone: '9982998664',
    items: [
      {
        cartId: 'item-1',
        drinkConfig: {
          ...DEFAULT_CUSTOM_DRINK,
          name: 'The Kyoto Dirty Matcha',
          matchaShots: 1,
          espressoShots: 2,
        },
        unitPrice: 340,
        quantity: 1,
        calculatedNutrition: { calories: 190, caffeine: 185, sugar: 12, protein: 4 },
      },
    ],
    subtotal: 340,
    tax: 17,
    tip: 40,
    total: 397,
    pickupTime: '15 mins',
    pickupType: 'express_counter',
    status: 'preparing',
    createdAt: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
    estimatedMinutes: 8,
  },
];

let customSavedRecipes: { id: string; name: string; config: CustomDrinkConfig; createdAt: string }[] = [];
let ingredientStockList = [...INITIAL_STOCK];

// --- API ROUTES ---

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', appName: 'Matcha Coffee Lab' });
});

// Signature Drinks List
app.get('/api/drinks', (req, res) => {
  res.json(SIGNATURE_DRINKS);
});

// Ingredient Stock Status
app.get('/api/stock', (req, res) => {
  res.json(ingredientStockList);
});

app.patch('/api/stock/:id', (req, res) => {
  const { id } = req.params;
  const { inStock } = req.body;
  const item = ingredientStockList.find((s) => s.id === id);
  if (item) {
    item.inStock = inStock;
    return res.json({ success: true, item });
  }
  res.status(404).json({ error: 'Item not found' });
});

// Custom Saved Recipes
app.get('/api/custom-recipes', (req, res) => {
  res.json(customSavedRecipes);
});

app.post('/api/custom-recipes', (req, res) => {
  const { name, config } = req.body;
  if (!config) {
    return res.status(400).json({ error: 'Missing drink configuration' });
  }
  const newRecipe = {
    id: `recipe-${Date.now()}`,
    name: name || config.name || 'Custom Matcha Coffee Fusion',
    config: { ...config, name: name || config.name },
    createdAt: new Date().toISOString(),
  };
  customSavedRecipes.unshift(newRecipe);
  res.status(201).json(newRecipe);
});

// Orders Endpoint
app.get('/api/orders', (req, res) => {
  res.json(mockOrders);
});

app.post('/api/orders', (req, res) => {
  const { customerName, customerEmail, customerPhone, items, pickupTime, pickupType, tip } = req.body;

  if (!items || !Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ error: 'Cart items required' });
  }

  const subtotal = items.reduce((acc, item) => acc + item.unitPrice * item.quantity, 0);
  const tax = Math.round(subtotal * 0.08 * 100) / 100;
  const tipAmount = Number(tip) || 0;
  const total = Math.round((subtotal + tax + tipAmount) * 100) / 100;

  const newOrder: Order = {
    id: `MCL-${Math.floor(1000 + Math.random() * 9000)}`,
    customerName: customerName || 'Valued Guest',
    customerEmail: customerEmail || 'guest@matchacoffeelab.com',
    customerPhone: customerPhone || '',
    items,
    subtotal: Math.round(subtotal * 100) / 100,
    tax,
    tip: tipAmount,
    total,
    pickupTime: pickupTime || 'ASAP (10-15 min)',
    pickupType: pickupType || 'express_counter',
    status: 'preparing',
    createdAt: new Date().toISOString(),
    estimatedMinutes: 12,
  };

  mockOrders.unshift(newOrder);
  res.status(201).json(newOrder);
});

app.patch('/api/orders/:id/status', (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const order = mockOrders.find((o) => o.id === id);
  if (order) {
    order.status = status;
    return res.json({ success: true, order });
  }
  res.status(404).json({ error: 'Order not found' });
});

// AI Barista Recommendation Endpoint
app.post('/api/ai-recommendation', async (req, res) => {
  const { flavorPreference, moodOrEnergy, dietaryRestrictions, temperaturePreference } =
    req.body as AiRecommendationRequest;

  const apiKey = process.env.GEMINI_API_KEY;

  if (apiKey) {
    try {
      const ai = new GoogleGenAI({ apiKey });
      const prompt = `You are an expert master barista at "Matcha Coffee Lab", a specialty cafe that ONLY serves fusion combinations of Matcha and Coffee.
Customer Request:
- Flavor preference: ${flavorPreference || 'Balanced & creamy'}
- Mood/Energy desire: ${moodOrEnergy || 'Productive afternoon pick-me-up'}
- Dietary restriction: ${dietaryRestrictions || 'None'}
- Preferred temp: ${temperaturePreference || 'Iced'}

Design a unique, delicious Matcha-Coffee fusion drink configuration strictly adhering to these parameters:
- temp: 'iced' | 'hot' | 'blended'
- size: 'small' | 'medium' | 'large'
- matchaGrade: 'ceremonial' | 'culinary' | 'hojicha'
- matchaShots: number (1 to 3)
- espressoRoast: 'house' | 'blonde' | 'decaf' | 'nitro_cold_brew' | 'cold_brew'
- espressoShots: number (1 to 3)
- milk: 'whole' | 'oat' | 'almond' | 'coconut' | 'macadamia' | 'soy' | 'half_and_half'
- sweetness: 0 | 25 | 50 | 75 | 100
- syrup: 'none' | 'vanilla' | 'brown_sugar' | 'kuromitsu' | 'strawberry' | 'lavender' | 'hazelnut' | 'caramel'
- foam: 'none' | 'vanilla_cream' | 'matcha_cream' | 'salted_cheese' | 'espresso_cloud'
- toppings: array of ('boba' | 'espresso_jelly' | 'cocoa_dust' | 'matcha_dust' | 'caramel_drizzle' | 'gold_flakes')
- iceLevel: 'none' | 'light' | 'regular' | 'extra'
- layerStyle: 'dirty_matcha' | 'espresso_float' | 'swirled' | 'layered_foam'

Respond ONLY with valid JSON matching this exact structure:
{
  "drinkName": "Poetic Fusion Drink Title",
  "tagline": "A catchy one-sentence description",
  "explanation": "Why this specific matcha and coffee pairing fits their mood and preference",
  "flavorProfile": ["Note 1", "Note 2", "Note 3"],
  "config": {
    "name": "Poetic Fusion Drink Title",
    "temp": "iced",
    "size": "medium",
    "matchaGrade": "ceremonial",
    "matchaShots": 2,
    "espressoRoast": "blonde",
    "espressoShots": 1,
    "milk": "oat",
    "sweetness": 50,
    "syrup": "vanilla",
    "foam": "matcha_cream",
    "toppings": ["matcha_dust"],
    "iceLevel": "regular",
    "layerStyle": "dirty_matcha",
    "specialInstructions": "Extra whisked with love"
  }
}`;

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: {
          responseMimeType: 'application/json',
        },
      });

      const responseText = response.text;
      if (responseText) {
        const parsed = JSON.parse(responseText);
        return res.json(parsed);
      }
    } catch (err) {
      console.error('Gemini API recommendation error, falling back to heuristic engine:', err);
    }
  }

  // Smart Heuristic Fallback
  const isSweet = (flavorPreference + moodOrEnergy).toLowerCase().includes('sweet') ||
    (flavorPreference + moodOrEnergy).toLowerCase().includes('berry');
  const isHighCaffeine = (flavorPreference + moodOrEnergy).toLowerCase().includes('energy') ||
    (flavorPreference + moodOrEnergy).toLowerCase().includes('strong');
  const isNonDairy = (dietaryRestrictions || '').toLowerCase().includes('vegan') ||
    (dietaryRestrictions || '').toLowerCase().includes('oat') ||
    (dietaryRestrictions || '').toLowerCase().includes('dairy');

  const fallbackConfig: CustomDrinkConfig = {
    name: isSweet ? 'Velvet Strawberry Dirty Matcha' : 'Zenith Double-Shot Dirty Uji',
    temp: (temperaturePreference as any) || 'iced',
    size: 'medium',
    matchaGrade: 'ceremonial',
    matchaShots: isHighCaffeine ? 2 : 1,
    espressoRoast: isHighCaffeine ? 'blonde' : 'house',
    espressoShots: isHighCaffeine ? 2 : 1,
    milk: isNonDairy ? 'oat' : 'macadamia',
    sweetness: isSweet ? 75 : 50,
    syrup: isSweet ? 'strawberry' : 'vanilla',
    foam: 'matcha_cream',
    toppings: ['matcha_dust'],
    iceLevel: 'regular',
    layerStyle: 'dirty_matcha',
    specialInstructions: 'Barista Recommendation',
  };

  res.json({
    drinkName: fallbackConfig.name,
    tagline: 'Handcrafted custom fusion crafted specially for your palate.',
    explanation:
      'We paired vibrant Uji ceremonial green tea with rich espresso shots and velvety microfoam to create an invigorating, perfectly balanced energizer.',
    flavorProfile: isSweet ? ['Ripe Berries', 'Creamy Milk', 'Bold Espresso'] : ['Rich Umami', 'Dark Cacao', 'Smooth Oat'],
    config: fallbackConfig,
  });
});

// --- VITE & STATIC SERVING ---
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Matcha Coffee Lab server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
