import React, { useState } from 'react';

function FilterBySteps({ onFilter }) {
  const [showInput, setShowInput] = useState(false);
  const [filterValue, setFilterValue] = useState('');

  const handleInputChange = (e) => {
    setFilterValue(e.target.value);
    const numSteps = parseInt(e.target.value, 10);
    if (!isNaN(numSteps) && numSteps > 0) {
      onFilter(numSteps);
    }
    if (e.target.value.trim() === '') {
      setShowInput(false);
      onFilter(null);
    }
  };

  return (
    <div className="button-container">
      {!showInput && <button onClick={() => setShowInput(true)}>Filter by Steps</button>}
      {showInput && (
        <div className="input-container">
          <input
            type="number"
            value={filterValue}
            onChange={handleInputChange}
            placeholder="Filter by Number of Steps"
          />
        </div>
      )}
    </div>
  );
}

export default FilterBySteps;
