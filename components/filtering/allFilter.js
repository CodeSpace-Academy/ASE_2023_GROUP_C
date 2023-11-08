import React, { useState } from "react";
import FilterByCategory from "./filterByCategory";
import FilterBySteps from "./filterBySteps";
import FilterByIngredients from "./filterByIngredients";
import FilterReset from "./clearFilters";

export default function Filtering({
  categoriesArr,
  data,
  onChange,
  ingredientsInputRef,
  handleIngredientsChange,
}) {
  const handleResetFilters = () => {

    onChange({ categories: [], numberOfSteps: 0 });

    window.location.reload();
  };

  return (
    <div className="text-white">
      <FilterByCategory
        categoriesArr={categoriesArr}
        value={data.categories}
        onChange={onChange}
      />
      <FilterBySteps value={data.numberOfSteps} onChange={onChange} />
      <FilterByIngredients
        ingredientsInputRef={ingredientsInputRef}
        handleIngredientsChange={handleIngredientsChange}
      />
      <FilterReset onReset={handleResetFilters} />
    </div>
  );
}
