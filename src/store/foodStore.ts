import { create } from 'zustand';
import { FoodEntry } from '../types/food';

interface FoodStore {
  entries: FoodEntry[];
  addEntry: (entry: FoodEntry) => void;
}

export const useFoodStore = create<FoodStore>((set) => ({
  entries: [],
  addEntry: (entry) => set((state) => ({ 
    entries: [entry, ...state.entries] 
  })),
}));