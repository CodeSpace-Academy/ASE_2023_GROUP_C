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

  // Use local storage to persist the selected sorting option
  useEffect(() => {
    localStorage.setItem('selectedSortOption', selectedSortOption);
  }, [selectedSortOption]);

  useEffect(() => {
    // Retrieve the stored sorting option from local storage
    const storedSortOption = localStorage.getItem('selectedSortOption');

    // Check if the stored sorting option is valid
    if (storedSortOption && sortingOptions.some(option => option.value === storedSortOption)) {
      setSelectedSortOption(storedSortOption);
      handleSort(storedSortOption); // Apply the stored sorting option
    } else {
      // If the stored sorting option is not valid, set it to the default value
      localStorage.setItem('selectedSortOption', 'default');
    }
  }, [sortingOptions, handleSort]);

  return (
    <div>
      {sortingOptions.map((option) => (
        <button
          key={option.value}
          onClick={() => handleSortingOptionClick(option.value)}
          className={selectedSortOption === option.value ? 'active' : ''}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
