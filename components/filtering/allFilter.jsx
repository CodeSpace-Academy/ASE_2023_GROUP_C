import React, { useState, useEffect } from 'react';
import FilterByCategory from './filterByCategory';
import FilterBySteps from './filterBySteps';
import FilterByIngredients from './filterByIngredients';
import ClearFilters from './clearFilters';

export default function Filtering({
  categoriesArr,
  handleIngredientsChange,
  recipes,
  onCategoryChange,
}) {
  const [data, setData] = useState({
    categories: '', // Initially unselected category
    numberOfSteps: 1,
    filterByIngredients: '',
  });

  const [, setFilteredRecipes] = useState(recipes);

  const handleDataChange = (name, value) => {
    setData({ ...data, [name]: value });
  };

  const handleClearFilters = () => {
    setData({
      categories: '',
      numberOfSteps: 1,
      filterByIngredients: '',
    });
    setFilteredRecipes(recipes);
  };

  useEffect(() => {
    // Filter recipes by the selected category
    if (data.categories) {
      const newFilteredRecipes = recipes.filter(
        (recipe) => recipe.category === data.categories,
      );
      setFilteredRecipes(newFilteredRecipes);
    } else {
      setFilteredRecipes(recipes);
    }
  }, [data.categories, recipes]);

  return (
    <div className="text-white">
      <FilterByCategory
        categoriesArr={categoriesArr}
        value={data.categories}
        onChange={(e) => {
          handleDataChange('categories', e.target.value);
          onCategoryChange(e.target.value);
        }}
      />
      <FilterBySteps
        value={data.numberOfSteps}
        onChange={(e) => handleDataChange('numberOfSteps', e.target.value)}
      />
      <FilterByIngredients
        value={data.filterByIngredients}
        onChange={(e) => handleDataChange('filterByIngredients', e.target.value)}
        handleIngredientsChange={handleIngredientsChange}
      />
      <ClearFilters onClearFilters={handleClearFilters} />
    </div>
  );
}
