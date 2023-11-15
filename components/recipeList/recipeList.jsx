import React, { useState } from 'react';
import { faFilter } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import LoadMoreButton from '../ui-utils/loadMoreButton';
import Pagination from '../pagination';
import RecipePreviewCard from '../ui-utils/RecipePreviewCard';
// import SearchSort from '../ui-utils/searchSort';
import NavLink from '../ui-utils/navLink';
import SortingForm from '../ui-utils/sortingForm';

/**
 * RecipeList component for displaying and filtering recipes.
 * @param {Object} props - Component properties.
 * @param {Array} props.recipes - List of recipes to display.
 * @param {number} props.totalRecipeInDb - Total number of recipes in the database.
 */

function NavLinks() {
  return (
    <div className="flex items-center">
      <NavLink href="/recipeList/filters">
        <FontAwesomeIcon icon={faFilter} size="lg" className="pr-2" />
        Filters
      </NavLink>
      <SortingForm />
    </div>
  );
}

export default function RecipeList(props) {
  // Destructure props
  const { recipes: initialRecipes, totalRecipeInDb, searchQuery } = props;

  // State variables
  const [recipes] = useState(initialRecipes);
  const [data] = useState(recipes);
  const [visibleRecipes, setVisibleRecipes] = useState(20);
  const [remainingRecipes, setRemainingRecipes] = useState(
    initialRecipes ? Math.max(initialRecipes.length - visibleRecipes, 0) : 0,
  );

  /**
   * Loads more recipes when the "Load More" button is clicked.
   */
  const loadMore = () => {
    const additionalRecipes = 20;
    const newVisibleRecipes = visibleRecipes + additionalRecipes;
    // Update the state with the new visible and remaining recipes
    setVisibleRecipes(newVisibleRecipes);
    setRemainingRecipes(Math.max(recipes.length - newVisibleRecipes, 0));
  };

  /**
   * Converts minutes to hours and minutes format.
   * @param {number} minutes - Duration in minutes.
   * @returns {string} - Formatted duration string.
   */
  const convertToHours = (minutes) => {
    if (minutes >= 60) {
      const hours = Math.floor(minutes / 60);
      const remainingMinutes = minutes % 60;
      return `${hours} hours ${remainingMinutes} mins`;
    }
    return `${minutes} mins`;
  };

  return (
    <div>
      <NavLinks />
      <div className="bg-gray-900 text-white h-screen flex">
        <div className="flex-1 p-4">
          {/* This here is basically the list */}
          <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {data.slice(0, visibleRecipes).map((recipe) => (
              <RecipePreviewCard
                recipe={recipe}
                // eslint-disable-next-line no-underscore-dangle
                key={recipe._id}
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
