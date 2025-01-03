import React from 'react';
import { FoodEntry } from '../types/food';

interface FoodCardProps {
  entry: FoodEntry;
}

export const FoodCard: React.FC<FoodCardProps> = ({ entry }) => {
  return (
    <div className="card h-100 shadow-sm">
      <img 
        src={entry.imageUrl} 
        alt={entry.description} 
        className="card-img-top"
        style={{ height: '200px', objectFit: 'cover' }}
      />
      <div className="card-body">
        <h5 className="card-title">Food Entry</h5>
        <p className="card-text text-muted mb-3">{entry.description}</p>
        <div className="d-flex justify-content-between border-top pt-3">
          <div className="text-primary">
            <strong>{entry.macros.calories}</strong> calories
          </div>
          <div className="text-success">
            <strong>{entry.macros.protein}g</strong> protein
          </div>
        </div>
      </div>
    </div>
  );
};