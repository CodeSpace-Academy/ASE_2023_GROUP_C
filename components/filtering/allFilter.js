import { useState } from 'react';
import FilterByCategory from './filterByCategory';
import FilterBySteps from './filterBySteps';
import FilterByIngredients from './filterByIngredients';

export default function Filtering({ categoriesArr, data, onChange, ingredientsInputRef,handleIngredientsChange}) {

  return (
    <div className='text-white'>
      <FilterByCategory
        categoriesArr={categoriesArr}
        value={data.categories}
        onChange={onChange}
      />
      <FilterBySteps
        value={data.numberOfSteps}
        onChange={onChange}
      />
      <FilterByIngredients 
        ingredientsInputRef={ingredientsInputRef}
        handleIngredientsChange={handleIngredientsChange}
      />
  
    </div>
  );
}