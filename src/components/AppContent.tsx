import React, { useState } from 'react';
import { ImageUpload } from './ImageUpload';
import { ErrorMessage } from './ErrorMessage';
import { LoadingMessage } from './LoadingMessage';
import { EntriesList } from './EntriesList';
import { useFoodStore } from '../store/foodStore';
import { FoodEntry } from '../types/food';

export function AppContent() {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { entries, addEntry } = useFoodStore();

  const handleImageSelect = async (file: File) => {
    setIsAnalyzing(true);
    setError(null);
    
    try {
      // Mock image processing
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const entry: FoodEntry = {
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

      addEntry(entry);
    } catch (error: any) {
      setError(error.message || 'Error analyzing image');
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center mb-5">
        <div className="col-md-8">
          <ImageUpload onImageSelect={handleImageSelect} />
          {isAnalyzing && <LoadingMessage />}
          {error && <ErrorMessage message={error} />}
        </div>
      </div>
      <EntriesList entries={entries} />
    </div>
  );
}