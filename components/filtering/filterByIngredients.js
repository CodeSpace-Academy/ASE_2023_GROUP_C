import React, { useRef } from 'react';

/**
 * FilterByIngredients component for searching by ingredients.
 * @param {object} props - Component props.
 * @param {React.RefObject} props.ingredientsInputRef - Ref for the input element.
 * @param {function} props.handleIngredientsChange - Function to handle ingredient changes.
 * @returns {JSX.Element} - FilterByIngredients component.
 */

const FilterByIngredients = ({value, onChange, handleIngredientsChange}) => {

  return (
    <div>
      <h3>Search by Ingredients</h3>
      <input
        type="text"
        className='text-black'
        value={value}
        name='filterByIngredients'
        onChange={onChange}
      ></input>
      <button onClick={handleIngredientsChange}>Set</button>
    </div>
  );
};

export default FilterByIngredients;
























