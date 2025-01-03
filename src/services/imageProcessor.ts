import { analyzeFoodImage } from './imageAnalysis';
import { readFileAsBase64 } from '../utils/imageUtils';
import { validateImage } from '../utils/validation';
import { FoodEntry } from '../types/food';

export async function processImage(file: File): Promise<FoodEntry> {
  validateImage(file);
  const base64Image = await readFileAsBase64(file);
  const analysis = await analyzeFoodImage(base64Image);
  
  return {
    id: Date.now().toString(),
    imageUrl: URL.createObjectURL(file),
    description: analysis.description,
    macros: analysis.macros,
    timestamp: new Date()
  };
}