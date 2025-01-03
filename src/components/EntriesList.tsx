import React from 'react';
import { History } from 'lucide-react';
import { FoodCard } from './FoodCard';
import { FoodEntry } from '../types/food';

interface EntriesListProps {
  entries: FoodEntry[];
}

export function EntriesList({ entries }: EntriesListProps) {
  return (
    <div className="container py-5">
      <h2 className="section-title d-flex align-items-center gap-3 mb-4">
        <History size={32} className="text-primary" />
        Recent Entries
      </h2>

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