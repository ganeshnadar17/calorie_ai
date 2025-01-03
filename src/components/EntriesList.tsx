import React from 'react';
import { History } from 'lucide-react';
import { FoodCard } from './FoodCard';
import { FoodEntry } from '../types/food';

interface EntriesListProps {
  entries: FoodEntry[];
}

export function EntriesList({ entries }: EntriesListProps) {
  return (
    <div className="container">
      <div className="d-flex align-items-center mb-4">
        <History className="me-2" size={24} />
        <h2 className="h4 mb-0">Recent Entries</h2>
      </div>

      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
        {entries.map((entry) => (
          <div className="col" key={entry.id}>
            <FoodCard entry={entry} />
          </div>
        ))}
      </div>
    </div>
  );
}