import React from 'react';

export default function ClearFilters({ onClearFilters }) {
  return (
    <div>
      <button type="button" onClick={onClearFilters}>
        Clear Filters
      </button>
    </div>
  );
}
