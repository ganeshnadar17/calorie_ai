import { MacroNutrients } from '../types/food';

export function estimateMacros(description: string): MacroNutrients {
  // This is a simplified estimation for testing purposes
  // In a production environment, you'd want to use a more sophisticated approach
  return {
    calories: Math.floor(Math.random() * 500) + 100,
    protein: Math.floor(Math.random() * 30) + 5,
    fat: Math.floor(Math.random() * 20) + 2,
    carbs: Math.floor(Math.random() * 50) + 10
  };
}