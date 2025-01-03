export interface FoodMacros {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

export interface FoodEntry {
  id: string;
  imageUrl: string;
  description: string;
  macros: FoodMacros;
  timestamp: string;
}