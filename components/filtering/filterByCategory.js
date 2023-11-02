import React from 'react';

export default function FilterByCategory({ categoriesArr }) {
  // Check if categoriesArr is defined and an array before mapping
  if (!categoriesArr || !Array.isArray(categoriesArr)) {
    // Return some fallback UI or a message indicating that categoriesArr is empty
    return (
      <div>
        <p>No categories available.</p>
      </div>
    );
  }

  return (
    <div>
      <label>Filter by Category:</label>
      <select>
        {categoriesArr.map((category, index) => (
          <option key={index} value={category}>
            {category}
          </option>
        ))}
      </select>
    </div>
  );
}
