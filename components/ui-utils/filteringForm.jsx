//filteringForm.js

import React, { useState, useEffect } from 'react';

export default function SortingOption({ handleSort, currentSort }) {
  // Initialize the sorting option state with a default value
  const [selectedSortOption, setSelectedSortOption] = useState('default');

  // Define an array of sorting options
  const sortingOptions = [
    { value: 'default', label: 'Default' },
    { value: 'ascending', label: 'Prep Time (Ascending)' },
    { value: 'descending', label: 'Prep Time (Descending)' },
    { value: 'ascendingCook', label: 'Cook Time (Ascending)' },
    { value: 'descendingCook', label: 'Cook Time (Descending)' },
    { value: 'ascendingSteps', label: 'Steps (Ascending)' },
    { value: 'descendingSteps', label: 'Steps (Descending)' },
    { value: 'byDateNewest', label: 'Newest' },
    { value: 'byDateOldest', label: 'Oldest' },
  ];

  // Handle the click event for sorting options
  const handleSortingOptionClick = (value) => {
    setSelectedSortOption(value);
    handleSort(value);
  };

  useEffect(() => {
    // Apply the currentSort to the selectedSortOption when it changes
    setSelectedSortOption(currentSort);
  }, [currentSort]);

  return (
    <select
      placeholder="Sort"
      className="bg-transparent focus:outline-none"
      onChange={(e) => handleSort(e.target.value)}
    >
      {sortingOptions.map((option) => (
        <option key={option.value} className="bg-gray-900" value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}
