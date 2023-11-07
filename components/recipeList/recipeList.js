import React, { useState, useEffect } from 'react';
import LoadMoreButton from '../ui-utils/loadMoreButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Pagination from '../pagination';
import SortingOption from '../ui-utils/filteringForm';
import FavoriteButton from '../ui-utils/FavoriteButton';
import {
  faUtensils,
  faKitchenSet,
  faSpoon,
  faSort,
} from '@fortawesome/free-solid-svg-icons';
import { RecipePreviewCard } from '../ui-utils/RecipePreviewCard';

/**
 * RecipeList component for displaying and filtering recipes.
 * @param {Object} props - Component properties.
 * @param {Array} props.recipes - List of recipes to display.
 * @param {number} props.totalRecipeInDb - Total number of recipes in the database.
 */
export default function RecipeList(props) {
  // Destructure props
  const { recipes: initialRecipes, totalRecipeInDb, searchQuery } = props;

  // State variables
  const [recipes, setRecipes] = useState(initialRecipes);
  const [data, setData] = useState(recipes);
  const [visibleRecipes, setVisibleRecipes] = useState(20);
  const [remainingRecipes, setRemainingRecipes] = useState(
    initialRecipes ? Math.max(initialRecipes.length - visibleRecipes, 0) : 0
  );

  // State for sorting and dropdown visibility

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  /**
   * Handles sorting of recipes based on the selected option.
   * @param {string} option - The selected sorting option.
   */

  /**
   * Toggles the sorting options dropdown.
   */
  const toggleDropdown = () => {
    // Toggle the visibility of the sorting dropdown
    setIsDropdownOpen(!isDropdownOpen);
  };

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
    <>
      <div className="bg-gray-900 text-white h-screen flex">
        <div className="flex-1 p-4">
          {/* This here is basically the list */}
          <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {data.slice(0, visibleRecipes).map((recipe) => (
              <RecipePreviewCard
                recipe={recipe}
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
    </>
  );
}