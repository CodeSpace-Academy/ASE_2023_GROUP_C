import React from 'react';

export default function ClearFilters({ onClearFilters }) {
  return (
    <button className="text-black bg-red-500" type="button" onClick={onClearFilters}>
      Clear Filters
    </button>
  );
}
