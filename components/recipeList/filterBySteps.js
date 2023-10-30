import React, { useState } from 'react';

function FilterBySteps({ onFilter }) {
  const [showInput, setShowInput] = useState(false);
  const [filterValue, setFilterValue] = useState('');

  const handleInputChange = (e) => {
    setFilterValue(e.target.value);
    const numSteps = parseInt(e.target.value, 10);
    
    if (!isNaN(numSteps) && numSteps > 0) {
      // Determine the sorting criteria based on user input
      const sortingCriteria = e.target.value.trim() === 'asc' ? 'ascending' : 'descending';
      onFilter(numSteps, sortingCriteria);
    } else {
      setShowInput(false);
      onFilter(null, null);
    }
  };

  return (
    <div className="button-container">
      {!showInput && <button onClick={() => setShowInput(true)}>Filter by Steps</button>}
      {showInput && (
        <div className="input-container">
          <input
            type="text"
            value={filterValue}
            onChange={handleInputChange}
            placeholder="Filter by Steps (asc/desc)"
          />
        </div>
      )}
    </div>
  );
}

export default FilterBySteps;
