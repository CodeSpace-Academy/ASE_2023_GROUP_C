import FilterByCategory from './filterByCategory';
import FilterBySteps from './filterBySteps';
import FilterByIngredients from './filterByIngredients';
import FilterByTags from './filterByTags';

/**
 * Filtering component for filtering by category, steps, and ingredients.
 * @param {object} props - Component props.
 * @param {array} props.categoriesArr - Array of categories for filtering.
 * @param {object} props.data - Object containing data for filtering.
 * @param {function} props.onChange - Function to handle changes in the filtering.
 * @param {function} props.handleIngredientsChange - Function to handle changes in the ingredients.
 * @returns {JSX.Element} - Filtering component.
 */

import ClearFilters from './clearFilters';

export default function Filtering({
  categoriesArr,
  arrayOfUnigueTags,
  selectedStepsAndIngredients,
  setSelectedTagsAndCategories,
  selectedValuesCategories,
  selectedValuesTags,
  onChange,
  handleIngredientsChange,
  handleClearFilters,
}) {
  // Handler function to update the selected values for all filters
  const handleFilterChange = (key, selectedValues) => {
    const labels = selectedValues.map((item) => item.label);
    setSelectedTagsAndCategories((prevSelectedValues) => ({
      ...prevSelectedValues,
      [key]: labels,
    }));
  };

  return (
    <div className="text-white">
      <FilterByCategory
        categoriesArr={categoriesArr}
        selectedValues={selectedValuesCategories}
        onChange={(selectedValues) => handleFilterChange('categories', selectedValues)}
      />
      <FilterByTags
        arrayOfUnigueTags={arrayOfUnigueTags}
        selectedValues={selectedValuesTags}
        onChange={(selectedValues) => handleFilterChange('tags', selectedValues)}
      />
      <FilterBySteps value={selectedStepsAndIngredients.numberOfSteps} onChange={onChange} />
      <FilterByIngredients
        onChange={onChange}
        value={selectedStepsAndIngredients.filterByIngredients}
        handleIngredientsChange={handleIngredientsChange}
      />
      <ClearFilters onClearFilters={handleClearFilters} />
    </div>
  );
}
