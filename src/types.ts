export type TempOption = 'iced' | 'hot' | 'blended';
export type SizeOption = 'small' | 'medium' | 'large';

export type MatchaGrade = 'ceremonial' | 'culinary' | 'hojicha';
export type EspressoRoast = 'house' | 'blonde' | 'decaf' | 'nitro_cold_brew' | 'cold_brew';

export type MilkOption =
  | 'whole'
  | 'oat'
  | 'almond'
  | 'coconut'
  | 'macadamia'
  | 'soy'
  | 'half_and_half';

export type SyrupOption =
  | 'none'
  | 'vanilla'
  | 'brown_sugar'
  | 'kuromitsu'
  | 'strawberry'
  | 'lavender'
  | 'hazelnut'
  | 'caramel';

export type FoamOption =
  | 'none'
  | 'vanilla_cream'
  | 'matcha_cream'
  | 'salted_cheese'
  | 'espresso_cloud';

export type ToppingOption =
  | 'none'
  | 'boba'
  | 'espresso_jelly'
  | 'cocoa_dust'
  | 'matcha_dust'
  | 'caramel_drizzle'
  | 'gold_flakes';

export type LayerStyle = 'dirty_matcha' | 'espresso_float' | 'swirled' | 'layered_foam';

export interface CustomDrinkConfig {
  id?: string;
  name: string;
  temp: TempOption;
  size: SizeOption;
  matchaGrade: MatchaGrade;
  matchaShots: number; // 1-3
  espressoRoast: EspressoRoast;
  espressoShots: number; // 0-3
  milk: MilkOption;
  sweetness: number; // 0, 25, 50, 75, 100
  syrup: SyrupOption;
  foam: FoamOption;
  toppings: ToppingOption[];
  iceLevel: 'none' | 'light' | 'regular' | 'extra';
  layerStyle: LayerStyle;
  specialInstructions?: string;
}

export interface NutritionInfo {
  calories: number;
  caffeine: number; // mg
  sugar: number; // g
  protein: number; // g
}

export interface SignatureDrink {
  id: string;
  name: string;
  japaneseName?: string;
  tagline: string;
  description: string;
  price: number;
  image: string;
  category: 'dirty' | 'tonic' | 'cold_foam' | 'dessert' | 'specialty';
  defaultConfig: CustomDrinkConfig;
  nutrition: NutritionInfo;
  isPopular?: boolean;
  isNew?: boolean;
  flavorNotes: string[];
}

export interface CartItem {
  cartId: string;
  drinkConfig: CustomDrinkConfig;
  unitPrice: number;
  quantity: number;
  calculatedNutrition: NutritionInfo;
}

export type OrderStatus = 'pending' | 'preparing' | 'ready' | 'completed' | 'cancelled';

export interface Order {
  id: string;
  customerName: string;
  customerEmail: string;
  customerPhone?: string;
  items: CartItem[];
  subtotal: number;
  tax: number;
  tip: number;
  total: number;
  pickupTime: string;
  pickupType: 'in_store' | 'curbside' | 'express_counter';
  status: OrderStatus;
  createdAt: string;
  estimatedMinutes: number;
}

export interface IngredientStock {
  id: string;
  name: string;
  category: 'matcha' | 'coffee' | 'milk' | 'syrup' | 'foam' | 'topping';
  inStock: boolean;
}

export interface AiRecommendationRequest {
  flavorPreference: string;
  moodOrEnergy: string;
  dietaryRestrictions?: string;
  temperaturePreference?: string;
}

export interface AiRecommendationResponse {
  drinkName: string;
  tagline: string;
  explanation: string;
  flavorProfile: string[];
  config: CustomDrinkConfig;
}
