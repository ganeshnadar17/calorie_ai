import React, { useState } from 'react';
import { ImageUpload } from './ImageUpload';
import { Star, Camera, Utensils, Brain } from 'lucide-react';
import { useFoodStore } from '../store/foodStore';
import { LoadingMessage } from './LoadingMessage';
import { ErrorMessage } from './ErrorMessage';
import { FoodEntry } from '../types/food';

export function HomePage() {
  const { addEntry } = useFoodStore();
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState<string | null>(null);

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
      setIsAnalyzing(false);
    } catch (error: any) {
      setError(error.message || 'Error analyzing image');
      setIsAnalyzing(false);
    }
  };

  return (
    <div>
      {/* Hero Banner */}
      <div className="hero-banner text-center text-white py-5">
        <div className="container py-5">
          <h1 className="display-4 fw-bold mb-4">Track Your Calories with AI</h1>
          <p className="lead mb-4">
            Simply upload a photo of your food and get instant nutritional information
          </p>
          <div className="row justify-content-center">
            <div className="col-md-8 col-lg-6">
              <ImageUpload onImageSelect={handleImageSelect} />
              {isAnalyzing && <LoadingMessage />}
              {error && <ErrorMessage message={error} />}
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <section className="py-5 bg-light">
        <div className="container">
          <h2 className="section-title text-center mb-5">How It Works</h2>
          <div className="row g-4">
            <div className="col-md-4">
              <div className="card h-100 border-0 text-center p-4">
                <Camera size={48} className="text-primary mx-auto mb-3" />
                <h3 className="h5 mb-3">Take a Photo</h3>
                <p className="text-muted">
                  Snap a picture of your meal using your phone or upload an existing photo
                </p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card h-100 border-0 text-center p-4">
                <Brain size={48} className="text-primary mx-auto mb-3" />
                <h3 className="h5 mb-3">AI Analysis</h3>
                <p className="text-muted">
                  Our AI instantly analyzes your food and identifies nutritional content
                </p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card h-100 border-0 text-center p-4">
                <Utensils size={48} className="text-primary mx-auto mb-3" />
                <h3 className="h5 mb-3">Get Results</h3>
                <p className="text-muted">
                  Receive detailed nutritional information including calories and macros
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Product Section */}
      <section className="py-5">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <h2 className="section-title mb-4">About Calorie AI</h2>
              <p className="lead mb-4">
                Transform the way you track your nutrition with our cutting-edge AI technology
              </p>
              <ul className="list-unstyled">
                <li className="mb-3 d-flex align-items-center">
                  <span className="badge bg-primary rounded-circle p-2 me-3">✓</span>
                  Instant nutritional analysis
                </li>
                <li className="mb-3 d-flex align-items-center">
                  <span className="badge bg-primary rounded-circle p-2 me-3">✓</span>
                  Accurate calorie counting
                </li>
                <li className="mb-3 d-flex align-items-center">
                  <span className="badge bg-primary rounded-circle p-2 me-3">✓</span>
                  Detailed macro breakdown
                </li>
                <li className="mb-3 d-flex align-items-center">
                  <span className="badge bg-primary rounded-circle p-2 me-3">✓</span>
                  Easy to use interface
                </li>
              </ul>
            </div>
            <div className="col-lg-6">
              <img 
                src="/app-preview.jpg" 
                alt="App Preview" 
                className="img-fluid rounded-3 shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="py-5 bg-light">
        <div className="container">
          <h2 className="section-title text-center mb-5">What Our Users Say</h2>
          <div className="row g-4">
            {reviews.map((review, index) => (
              <div key={index} className="col-md-4">
                <div className="card h-100 border-0 p-4">
                  <div className="d-flex mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={20}
                        className={i < review.rating ? 'text-warning' : 'text-muted'}
                        fill={i < review.rating ? 'currentColor' : 'none'}
                      />
                    ))}
                  </div>
                  <p className="card-text mb-4">{review.text}</p>
                  <div className="mt-auto">
                    <h5 className="mb-1">{review.name}</h5>
                    <p className="text-muted small mb-0">{review.title}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

const reviews = [
  {
    name: "Sarah Johnson",
    title: "Fitness Enthusiast",
    rating: 5,
    text: "This app has revolutionized how I track my meals. The AI accuracy is impressive!"
  },
  {
    name: "Mike Chen",
    title: "Professional Chef",
    rating: 4,
    text: "Great tool for quick nutritional analysis. Helps me plan better meals for my clients."
  },
  {
    name: "Emily Davis",
    title: "Nutrition Coach",
    rating: 5,
    text: "Finally, a simple solution for my clients to track their nutrition accurately."
  }
]; 