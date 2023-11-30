import React from 'react';

export default function ClearFilters({ onClearFilters }) {
  return (
    <div>
      <button type="button" onClick={onClearFilters} className="bg-blue-500">
        Clear Filters
      </button>
    </div>
  );
}
