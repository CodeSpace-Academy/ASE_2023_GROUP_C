import { useState } from "react";
import FilterByCategory from "./filterByCategory";
import FilterBySteps from "./filterBySteps";
import FilterByIngredients from "./filterByIngredients";

/**
 * Filtering component for filtering by category, steps, and ingredients.
 * @param {object} props - Component props.
 * @param {array} props.categoriesArr - Array of categories for filtering.
 * @param {object} props.data - Object containing data for filtering.
 * @param {function} props.onChange - Function to handle changes in the filtering.
 * @param {React.RefObject} props.ingredientsInputRef - Ref for the ingredients input element.
 * @param {function} props.handleIngredientsChange - Function to handle changes in the ingredients.
 * @returns {JSX.Element} - Filtering component.
 */

export default function Filtering({
  categoriesArr,
  data,
  onChange,
  handleIngredientsChange,
}) {
  return (
    <div className="text-white">
      <FilterByCategory
        categoriesArr={categoriesArr}
        value={data.categories}
        onChange={onChange}
      />
      <FilterBySteps value={data.numberOfSteps} onChange={onChange} />
      <FilterByIngredients
        onChange={onChange}
        value={data.filterByIngredients}
        handleIngredientsChange={handleIngredientsChange}
      />
    </div>
  );
}
