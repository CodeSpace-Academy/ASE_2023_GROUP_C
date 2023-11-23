import React, { useContext, useState } from 'react';
import { faFilter } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import LoadMoreButton from '../ui-utils/loadMoreButton';
import Pagination from '../pagination';
import RecipePreviewCard from '../ui-utils/RecipePreviewCard';
import SortingForm from '../ui-utils/sortingForm';
import { FilterContext } from '../context/recipeContext';

export default function RecipeList(props) {
  const { recipes: initialRecipes, totalRecipeInDb, searchQuery } = props;
  const [recipes] = useState(initialRecipes);
  const [data] = useState(recipes);
  const [visibleRecipes, setVisibleRecipes] = useState(100);
  const [remainingRecipes, setRemainingRecipes] = useState(
    initialRecipes ? Math.max(initialRecipes.length - visibleRecipes, 0) : 0,
  );
  const { filterOverlay, setFilterOverlay } = useContext(FilterContext);

  const loadMore = () => {
    const additionalRecipes = 100;
    const newVisibleRecipes = visibleRecipes + additionalRecipes;
    setVisibleRecipes(newVisibleRecipes);
    setRemainingRecipes(Math.max(recipes.length - newVisibleRecipes, 0));
  };

  const convertToHours = (minutes) => {
    if (minutes >= 60) {
      const hours = Math.floor(minutes / 60);
      const remainingMinutes = minutes % 60;
      return `${hours} hours ${remainingMinutes} mins`;
    }
    return `${minutes} mins`;
  };

  const filterButton = () => {
    setFilterOverlay(!filterOverlay);
  };

  return (
    <div className="p-12">
      {/* Add margin-bottom for spacing */}
      <div className="mb-13">
        <div className="flex items-center mb-13">
          {/* Add margin-right for spacing */}
          <button type="button" onClick={filterButton} className="mr-11">
            <FontAwesomeIcon icon={faFilter} size="lg" className="pr-2" />
            Filters
          </button>
          <SortingForm />
        </div>
      </div>

      <div className="bg-gray-900 text-white h-screen flex">
        <div className="flex-1 p-4">
          {/* This here is basically the list */}
          <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {data.slice(0, visibleRecipes).map((recipe) => (
              <RecipePreviewCard
                recipe={recipe}
                key={recipe.id}
                convertToHours={convertToHours}
                searchQuery={searchQuery}
              />
            ))}
          </ul>

          {/* Load More  */}
          <div className="bg-gray-900 p-4 flex justify-center items-center">
            {remainingRecipes > 0 && (
              <LoadMoreButton
                onClick={loadMore}
                remainingRecipes={remainingRecipes}
                className="bg-blue-700 text-white px-2 py-1 rounded-full hover-bg-blue-800"
              />
            )}
          </div>

          {/* pagination */}
          <Pagination totalRecipeInDb={totalRecipeInDb} />
        </div>
      </div>
    </div>
  );
}
