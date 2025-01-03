import React, { useState } from 'react';
import { Header } from './Header';
import { ImageUpload } from './ImageUpload';
import { ErrorMessage } from './ErrorMessage';
import { LoadingMessage } from './LoadingMessage';
import { EntriesList } from './EntriesList';
import { useFoodStore } from '../store/foodStore';
import { processImage } from '../services/imageProcessor';

export function AppContent() {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { entries, addEntry } = useFoodStore();

  const handleImageSelect = async (file: File) => {
    setIsAnalyzing(true);
    setError(null);
    
    try {
      const entry = await processImage(file);
      addEntry(entry);
    } catch (error: any) {
      setError(error.message || 'Error analyzing image');
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="min-vh-100 bg-light">
      <Header />
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
    </div>
  );
}