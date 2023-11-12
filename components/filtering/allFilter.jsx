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

export default function Filtering({
  categoriesArr,
  arrayOfUnigueTags,
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
      <FilterByTags
        arrayOfUnigueTags={arrayOfUnigueTags}
        value={data.tags}
        onChange={onChange}
      />
    </div>
  );
}
