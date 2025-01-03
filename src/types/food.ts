export interface MacroNutrients {
  calories: number;
  protein: number;
  fat: number;
  carbs: number;
}

export interface FoodEntry {
  id: string;
  imageUrl: string;
  description: string;
  macros: MacroNutrients;
  timestamp: Date;
}