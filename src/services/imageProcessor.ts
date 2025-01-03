import { FoodEntry } from '../types/food';

export async function processImage(file: File): Promise<FoodEntry> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1500));

  // Return mock data
  return {
    id: Date.now().toString(),
    imageUrl: URL.createObjectURL(file),
    description: 'Sample food item',
    macros: {
      calories: 350,
      protein: 20,
      carbs: 40,
      fat: 15,
    },
    timestamp: new Date().toISOString(),
  };
}