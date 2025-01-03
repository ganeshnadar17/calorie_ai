import React from 'react';
import { FoodEntry } from '../types/food';

interface FoodCardProps {
  entry: FoodEntry;
}

export const FoodCard: React.FC<FoodCardProps> = ({ entry }) => {
  return (
    <div className="card h-100">
      <img 
        src={entry.imageUrl} 
        alt={entry.description} 
        className="card-img-top"
        style={{ height: '240px', objectFit: 'cover' }}
      />
      <div className="card-body p-4">
        <h5 className="card-title mb-3">Food Analysis</h5>
        <p className="card-text mb-4">{entry.description}</p>
        <div className="row g-3">
          <div className="col-6">
            <div className="p-3 bg-light rounded-3">
              <div className="text-muted small mb-1">Calories</div>
              <div className="fw-bold text-primary">{entry.macros.calories}</div>
            </div>
          </div>
          <div className="col-6">
            <div className="p-3 bg-light rounded-3">
              <div className="text-muted small mb-1">Protein</div>
              <div className="fw-bold text-primary">{entry.macros.protein}g</div>
            </div>
          </div>
          <div className="col-6">
            <div className="p-3 bg-light rounded-3">
              <div className="text-muted small mb-1">Carbs</div>
              <div className="fw-bold text-primary">{entry.macros.carbs}g</div>
            </div>
          </div>
          <div className="col-6">
            <div className="p-3 bg-light rounded-3">
              <div className="text-muted small mb-1">Fat</div>
              <div className="fw-bold text-primary">{entry.macros.fat}g</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};