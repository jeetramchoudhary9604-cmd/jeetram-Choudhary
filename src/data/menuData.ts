import {
  SignatureDrink,
  CustomDrinkConfig,
  NutritionInfo,
  IngredientStock,
  SizeOption,
  MatchaGrade,
  EspressoRoast,
  MilkOption,
  SyrupOption,
  FoamOption,
  ToppingOption,
} from '../types';

export const SIZE_PRICES: Record<SizeOption, number> = {
  small: 220,
  medium: 280,
  large: 340,
};

export const MATCHA_PRICES: Record<MatchaGrade, number> = {
  ceremonial: 60,
  culinary: 30,
  hojicha: 40,
};

export const ESPRESSO_PRICES: Record<EspressoRoast, number> = {
  house: 40,
  blonde: 50,
  decaf: 40,
  nitro_cold_brew: 70,
  cold_brew: 60,
};

export const MILK_PRICES: Record<MilkOption, number> = {
  whole: 0,
  oat: 40,
  almond: 35,
  coconut: 35,
  macadamia: 50,
  soy: 25,
  half_and_half: 30,
};

export const SYRUP_PRICES: Record<SyrupOption, number> = {
  none: 0,
  vanilla: 30,
  brown_sugar: 35,
  kuromitsu: 45,
  strawberry: 45,
  lavender: 40,
  hazelnut: 30,
  caramel: 30,
};

export const FOAM_PRICES: Record<FoamOption, number> = {
  none: 0,
  vanilla_cream: 40,
  matcha_cream: 50,
  salted_cheese: 50,
  espresso_cloud: 50,
};

export const TOPPING_PRICES: Record<ToppingOption, number> = {
  none: 0,
  boba: 40,
  espresso_jelly: 45,
  cocoa_dust: 15,
  matcha_dust: 20,
  caramel_drizzle: 25,
  gold_flakes: 75,
};

export const MATCHA_LABELS: Record<MatchaGrade, { name: string; desc: string; color: string }> = {
  ceremonial: {
    name: 'First-Harvest Uji Ceremonial',
    desc: 'Vibrant jade green from Kyoto with smooth umami and zero bitterness.',
    color: '#34D399',
  },
  culinary: {
    name: 'Organic Culinary Grade',
    desc: 'Robust green tea flavor with bolder notes, ideal for rich syrups.',
    color: '#059669',
  },
  hojicha: {
    name: 'Roasted Hojicha Tea',
    desc: 'Slow-roasted green tea with toasty, nutty cacao notes & lower caffeine.',
    color: '#78350F',
  },
};

export const ESPRESSO_LABELS: Record<EspressoRoast, { name: string; desc: string; color: string }> = {
  house: {
    name: 'House Dark Espresso',
    desc: 'Rich, chocolatey espresso roasted specifically to balance matcha sweetness.',
    color: '#451A03',
  },
  blonde: {
    name: 'Citrus Blonde Roast',
    desc: 'Lightly roasted with bright floral notes and higher caffeine pop.',
    color: '#9A3412',
  },
  decaf: {
    name: 'Swiss Water Decaf',
    desc: '100% chemical-free decaf espresso with deep caramel finish.',
    color: '#525252',
  },
  nitro_cold_brew: {
    name: 'Nitro Cold Brew Float',
    desc: 'Creamy, velvety nitrogen-infused cold brew coffee float.',
    color: '#1C1917',
  },
  cold_brew: {
    name: '24-Hour Steep Cold Brew',
    desc: 'Smooth, low-acidity micro-batch cold brew coffee.',
    color: '#292524',
  },
};

export const MILK_LABELS: Record<MilkOption, string> = {
  whole: 'Whole Organic Milk',
  oat: 'Barista Edition Oat Milk (Oatly)',
  almond: 'Unsweetened Almond Milk',
  coconut: 'Creamy Coconut Milk',
  macadamia: 'Artisan Macadamia Milk',
  soy: 'Organic Soy Milk',
  half_and_half: 'Breve Half & Half',
};

export const SYRUP_LABELS: Record<SyrupOption, string> = {
  none: 'No Syrup',
  vanilla: 'Madagascar Vanilla Bean',
  brown_sugar: 'Okinawan Brown Sugar',
  kuromitsu: 'Japanese Kuromitsu Black Sugar',
  strawberry: 'Fresh Farm Strawberry Puree',
  lavender: 'Organic Culinary Lavender',
  hazelnut: 'Toasted Hazelnut',
  caramel: 'Salted Butter Caramel',
};

export const FOAM_LABELS: Record<FoamOption, string> = {
  none: 'No Foam Crown',
  vanilla_cream: 'Vanilla Sweet Cream Cold Foam',
  matcha_cream: 'Double-Whisked Matcha Cloud Foam',
  salted_cheese: 'Japanese Sea Salt Cream Cheese Foam',
  espresso_cloud: 'Espresso Velvet Foam',
};

export const TOPPING_LABELS: Record<ToppingOption, string> = {
  none: 'None',
  boba: 'Brown Sugar Tapioca Pearls',
  espresso_jelly: 'Handcrafted Espresso Jelly Cubes',
  cocoa_dust: 'Dark Cocoa Dusting',
  matcha_dust: 'Ceremonial Matcha Dusting',
  caramel_drizzle: 'Warm Salted Caramel Drizzle',
  gold_flakes: '24k Edible Gold Leaf Flakes',
};

export const DEFAULT_CUSTOM_DRINK: CustomDrinkConfig = {
  name: 'Custom Dirty Matcha',
  temp: 'iced',
  size: 'medium',
  matchaGrade: 'ceremonial',
  matchaShots: 1,
  espressoRoast: 'house',
  espressoShots: 1,
  milk: 'oat',
  sweetness: 50,
  syrup: 'none',
  foam: 'none',
  toppings: [],
  iceLevel: 'regular',
  layerStyle: 'dirty_matcha',
  specialInstructions: '',
};

export const SIGNATURE_DRINKS: SignatureDrink[] = [
  {
    id: 'sig-dirty-uji',
    name: 'The Kyoto Dirty Matcha',
    japaneseName: '京都ダーティー抹茶',
    tagline: 'Our flagship signature! Ceremonial Uji matcha over Oat milk with a floating double espresso shot.',
    description:
      'The classic dirty matcha perfected. First-harvest Uji ceremonial matcha whisked fresh, poured over cold Oatly barista milk, topped with a cascading float of house roasted espresso.',
    price: 340,
    image: 'https://images.unsplash.com/photo-1536256263959-770b48d82b0A?auto=format&fit=crop&w=800&q=80',
    category: 'dirty',
    isPopular: true,
    flavorNotes: ['Earthy Umami', 'Dark Chocolate Espresso', 'Creamy Oat'],
    defaultConfig: {
      name: 'The Kyoto Dirty Matcha',
      temp: 'iced',
      size: 'medium',
      matchaGrade: 'ceremonial',
      matchaShots: 1,
      espressoRoast: 'house',
      espressoShots: 2,
      milk: 'oat',
      sweetness: 50,
      syrup: 'vanilla',
      foam: 'none',
      toppings: ['matcha_dust'],
      iceLevel: 'regular',
      layerStyle: 'dirty_matcha',
    },
    nutrition: { calories: 190, caffeine: 185, sugar: 12, protein: 4 },
  },
  {
    id: 'sig-strawberry-espresso-matcha',
    name: 'Strawberry Cloud Dirty Matcha',
    japaneseName: '苺クラウド抹茶エスプレッソ',
    tagline: 'Fresh strawberry puree base, oat milk, double blonde espresso, crowned with ceremonial matcha foam.',
    description:
      'A tri-layer masterpiece: homemade strawberry reduction at the bottom, creamy oat milk with blonde espresso, topped with a lush, velvety matcha cold foam crown.',
    price: 380,
    image: 'https://images.unsplash.com/photo-1541167760496-1628856ab772?auto=format&fit=crop&w=800&q=80',
    category: 'cold_foam',
    isPopular: true,
    isNew: true,
    flavorNotes: ['Ripe Strawberry', 'Floral Espresso', 'Velvety Matcha Foam'],
    defaultConfig: {
      name: 'Strawberry Cloud Dirty Matcha',
      temp: 'iced',
      size: 'medium',
      matchaGrade: 'ceremonial',
      matchaShots: 1,
      espressoRoast: 'blonde',
      espressoShots: 2,
      milk: 'oat',
      sweetness: 75,
      syrup: 'strawberry',
      foam: 'matcha_cream',
      toppings: [],
      iceLevel: 'regular',
      layerStyle: 'layered_foam',
    },
    nutrition: { calories: 240, caffeine: 180, sugar: 22, protein: 5 },
  },
  {
    id: 'sig-kuromitsu-brown-sugar',
    name: 'Okinawan Black Sugar Dirty Matcha',
    japaneseName: '黒糖ダーティー抹茶',
    tagline: 'Smoky Japanese Kuromitsu sugar syrup, macadamia milk, espresso, whisked Uji matcha & boba pearls.',
    description:
      'Deep, caramelized richness inspired by Okinawan black sugar. Paired with artisan macadamia milk, double espresso, ceremonial matcha, and warm boba pearls.',
    price: 390,
    image: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?auto=format&fit=crop&w=800&q=80',
    category: 'dirty',
    isPopular: true,
    flavorNotes: ['Smoky Molasses', 'Toasted Macadamia', 'Matcha Umami'],
    defaultConfig: {
      name: 'Okinawan Black Sugar Dirty Matcha',
      temp: 'iced',
      size: 'large',
      matchaGrade: 'ceremonial',
      matchaShots: 2,
      espressoRoast: 'house',
      espressoShots: 2,
      milk: 'macadamia',
      sweetness: 75,
      syrup: 'kuromitsu',
      foam: 'salted_cheese',
      toppings: ['boba'],
      iceLevel: 'regular',
      layerStyle: 'dirty_matcha',
    },
    nutrition: { calories: 310, caffeine: 210, sugar: 28, protein: 6 },
  },
  {
    id: 'sig-nitro-tonic-matcha',
    name: 'Nitro Coffee Matcha Tonic',
    japaneseName: 'ニトロ抹茶トニック',
    tagline: 'Sparkling artisanal tonic water infused with nitro cold brew and floating ceremonial matcha shot.',
    description:
      'Ultra-refreshing citrus sparkling tonic infused with velvety nitro cold brew, topped with brilliant green ceremonial matcha float and a yuzu lemon twist.',
    price: 320,
    image: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=800&q=80',
    category: 'tonic',
    isNew: true,
    flavorNotes: ['Effervescent Citrus', 'Crisp Cold Brew', 'Grassy Matcha Finish'],
    defaultConfig: {
      name: 'Nitro Coffee Matcha Tonic',
      temp: 'iced',
      size: 'medium',
      matchaGrade: 'ceremonial',
      matchaShots: 1,
      espressoRoast: 'nitro_cold_brew',
      espressoShots: 1,
      milk: 'whole',
      sweetness: 25,
      syrup: 'none',
      foam: 'none',
      toppings: [],
      iceLevel: 'regular',
      layerStyle: 'espresso_float',
    },
    nutrition: { calories: 80, caffeine: 160, sugar: 14, protein: 1 },
  },
  {
    id: 'sig-hojicha-espresso-swirl',
    name: 'Toasted Hojicha Espresso Latte',
    japaneseName: '焙じ茶エスプレッソラテ',
    tagline: 'Roasted green tea with warm caramel notes, whole milk, and single origin decaf espresso.',
    description:
      'Nutty and comforting slow-roasted hojicha tea combined with rich espresso and steamed or chilled milk. Naturally lower caffeine with deep cacao and roasted chestnut aroma.',
    price: 290,
    image: 'https://images.unsplash.com/photo-1579888926999-291730013392?auto=format&fit=crop&w=800&q=80',
    category: 'specialty',
    flavorNotes: ['Toasted Chestnut', 'Milk Chocolate', 'Low Acidity'],
    defaultConfig: {
      name: 'Toasted Hojicha Espresso Latte',
      temp: 'hot',
      size: 'medium',
      matchaGrade: 'hojicha',
      matchaShots: 2,
      espressoRoast: 'house',
      espressoShots: 1,
      milk: 'whole',
      sweetness: 50,
      syrup: 'caramel',
      foam: 'none',
      toppings: ['cocoa_dust'],
      iceLevel: 'none',
      layerStyle: 'swirled',
    },
    nutrition: { calories: 210, caffeine: 95, sugar: 16, protein: 7 },
  },
  {
    id: 'sig-matcha-affogato',
    name: 'Matcha Espresso Gelato Affogato',
    japaneseName: '抹茶エスプレッソアフォガート',
    tagline: 'Artisanal Madagascar vanilla bean gelato drowned in hot ceremonial matcha & double espresso shot.',
    description:
      'The ultimate coffee & matcha dessert mashup. Two scoops of dense vanilla bean gelato poured over with steaming fresh Uji ceremonial matcha and a dark espresso double shot.',
    price: 390,
    image: 'https://images.unsplash.com/photo-1589396575653-c09c794ff6a6?auto=format&fit=crop&w=800&q=80',
    category: 'dessert',
    isPopular: true,
    flavorNotes: ['Creamy Vanilla Gelato', 'Hot Matcha Pours', 'Intense Espresso'],
    defaultConfig: {
      name: 'Matcha Espresso Gelato Affogato',
      temp: 'blended',
      size: 'small',
      matchaGrade: 'ceremonial',
      matchaShots: 1,
      espressoRoast: 'house',
      espressoShots: 2,
      milk: 'half_and_half',
      sweetness: 75,
      syrup: 'vanilla',
      foam: 'espresso_cloud',
      toppings: ['espresso_jelly', 'gold_flakes'],
      iceLevel: 'none',
      layerStyle: 'layered_foam',
    },
    nutrition: { calories: 340, caffeine: 195, sugar: 30, protein: 6 },
  },
  {
    id: 'sig-lavender-dirty-matcha',
    name: 'Wild Lavender Blonde Dirty Matcha',
    japaneseName: 'ラベンダーブロンド抹茶',
    tagline: 'Organic French lavender syrup, coconut milk, blonde roast espresso float, and double ceremonial matcha.',
    description:
      'A soothing floral fusion. Subtle lavender sweetness harmonizes with tropical coconut milk, bright citrus blonde espresso, and grounding Uji green tea.',
    price: 360,
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80',
    category: 'dirty',
    flavorNotes: ['Floral Lavender', 'Sweet Coconut', 'Citrus Espresso'],
    defaultConfig: {
      name: 'Wild Lavender Blonde Dirty Matcha',
      temp: 'iced',
      size: 'medium',
      matchaGrade: 'ceremonial',
      matchaShots: 2,
      espressoRoast: 'blonde',
      espressoShots: 1,
      milk: 'coconut',
      sweetness: 50,
      syrup: 'lavender',
      foam: 'vanilla_cream',
      toppings: ['matcha_dust'],
      iceLevel: 'regular',
      layerStyle: 'dirty_matcha',
    },
    nutrition: { calories: 200, caffeine: 180, sugar: 18, protein: 3 },
  },
];

export function calculateDrinkPrice(config: CustomDrinkConfig): number {
  let basePrice = SIZE_PRICES[config.size] || 280;

  // Matcha extra shots
  const matchaExtra = Math.max(0, config.matchaShots - 1) * 50;
  const matchaTypeCost = MATCHA_PRICES[config.matchaGrade] || 60;

  // Espresso
  const espressoCost = (ESPRESSO_PRICES[config.espressoRoast] || 40) * config.espressoShots;

  // Milk
  const milkCost = MILK_PRICES[config.milk] || 0;

  // Syrup
  const syrupCost = SYRUP_PRICES[config.syrup] || 0;

  // Foam
  const foamCost = FOAM_PRICES[config.foam] || 0;

  // Toppings
  const toppingsCost = config.toppings.reduce(
    (acc, topping) => acc + (TOPPING_PRICES[topping] || 0),
    0
  );

  const total =
    basePrice +
    matchaTypeCost +
    matchaExtra +
    espressoCost +
    milkCost +
    syrupCost +
    foamCost +
    toppingsCost;

  return Math.round(total);
}

export function calculateNutrition(config: CustomDrinkConfig): NutritionInfo {
  let calories = 0;
  let caffeine = 0;
  let sugar = 0;
  let protein = 0;

  // Base size factor
  const sizeMult = config.size === 'small' ? 0.8 : config.size === 'large' ? 1.3 : 1.0;

  // Matcha caffeine & nutrients
  const matchaCaffeinePerShot = config.matchaGrade === 'hojicha' ? 25 : 70;
  caffeine += config.matchaShots * matchaCaffeinePerShot;
  calories += config.matchaShots * 10;
  protein += config.matchaShots * 1;

  // Espresso caffeine & nutrients
  const espressoCaffeinePerShot = config.espressoRoast === 'decaf' ? 5 : 65;
  caffeine += config.espressoShots * espressoCaffeinePerShot;
  calories += config.espressoShots * 5;

  // Milk nutrients (assumed ~8oz for medium)
  const milkNutrients: Record<MilkOption, { cal: number; sug: number; prot: number }> = {
    whole: { cal: 150, sug: 12, prot: 8 },
    oat: { cal: 130, sug: 7, prot: 3 },
    almond: { cal: 60, sug: 1, prot: 2 },
    coconut: { cal: 90, sug: 6, prot: 1 },
    macadamia: { cal: 110, sug: 2, prot: 2 },
    soy: { cal: 110, sug: 6, prot: 7 },
    half_and_half: { cal: 220, sug: 8, prot: 5 },
  };

  const milkData = milkNutrients[config.milk] || milkNutrients.oat;
  calories += milkData.cal * sizeMult;
  sugar += milkData.sug * sizeMult;
  protein += milkData.prot * sizeMult;

  // Sweetness & Syrup
  if (config.syrup !== 'none') {
    const syrupSugar = (config.sweetness / 100) * 20;
    sugar += syrupSugar;
    calories += syrupSugar * 4;
  } else if (config.sweetness > 0) {
    const rawSugar = (config.sweetness / 100) * 12;
    sugar += rawSugar;
    calories += rawSugar * 4;
  }

  // Foam
  if (config.foam !== 'none') {
    calories += 60;
    sugar += 5;
  }

  // Toppings
  if (config.toppings.includes('boba')) {
    calories += 120;
    sugar += 18;
  }
  if (config.toppings.includes('espresso_jelly')) {
    calories += 40;
    sugar += 8;
  }

  return {
    calories: Math.round(calories),
    caffeine: Math.round(caffeine),
    sugar: Math.round(sugar),
    protein: Math.round(protein * 10) / 10,
  };
}

export const INITIAL_STOCK: IngredientStock[] = [
  { id: 'mat-ceremonial', name: 'First-Harvest Uji Ceremonial Matcha', category: 'matcha', inStock: true },
  { id: 'mat-culinary', name: 'Organic Culinary Grade Matcha', category: 'matcha', inStock: true },
  { id: 'mat-hojicha', name: 'Roasted Hojicha Tea Powder', category: 'matcha', inStock: true },
  { id: 'esp-house', name: 'House Espresso Beans', category: 'coffee', inStock: true },
  { id: 'esp-blonde', name: 'Blonde Citrus Roast Beans', category: 'coffee', inStock: true },
  { id: 'esp-nitro', name: 'Nitro Cold Brew Keg', category: 'coffee', inStock: true },
  { id: 'milk-oat', name: 'Oatly Barista Oat Milk', category: 'milk', inStock: true },
  { id: 'milk-macadamia', name: 'Macadamia Artisan Milk', category: 'milk', inStock: true },
  { id: 'syr-kuromitsu', name: 'Japanese Kuromitsu Syrup', category: 'syrup', inStock: true },
  { id: 'syr-strawberry', name: 'Fresh Strawberry Reduction', category: 'syrup', inStock: true },
  { id: 'top-boba', name: 'Warm Brown Sugar Boba', category: 'topping', inStock: true },
  { id: 'top-jelly', name: 'Handcrafted Espresso Jelly', category: 'topping', inStock: true },
];
