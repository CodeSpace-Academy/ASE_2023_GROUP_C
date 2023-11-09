import React, { useState, useEffect } from 'react';

export default function SortingOption({ handleSort, currentSort, setCurrentSort }) {
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

  const handleSelectChange = (e) => {
    const selectedValue = e.target.value;
    setCurrentSort(selectedValue);
    handleSort(selectedValue);
  };

  useEffect(() => {
    setCurrentSort(currentSort);
  }, [currentSort]);

  return (
    <select
      placeholder="Sort"
      className="bg-transparent focus:outline-none text-grey p-1 "
      onChange={handleSelectChange}
    >
      {sortingOptions.map((option) => (
        <option key={option.value} className="bg-gray-900" value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}
