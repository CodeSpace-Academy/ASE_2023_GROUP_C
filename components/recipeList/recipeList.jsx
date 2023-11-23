import React, { useState } from 'react';
import { faFilter } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import RecipePreviewCard from '../ui-utils/RecipePreviewCard';
import SortingForm from '../ui-utils/sortingForm';

/**
 * RecipeList component for displaying and filtering recipes.
 * @param {Object} props - Component properties.
 * @param {Array} props.recipes - List of recipes to display.
 */

export default function RecipeList(props) {
  // Destructure props
  const { recipes, searchQuery } = props;

  // stateVariables
  const [filterOverlay, setFilterOverlay] = useState(false);

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
  // filter button
  const filterButton = () => {
    setFilterOverlay(!filterOverlay);
  };

  return (
    <div>

      <div className="flex">
        <button type="button" onClick={filterButton}>
          <FontAwesomeIcon icon={faFilter} size="lg" />
          Filters
        </button>
        <SortingForm />
      </div>
      <div className="bg-gray-900 text-white h-screen flex">
        <div className="flex-1 p-4">
          {/* This here is basically the list */}
          <ul className="grid pb-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {recipes.map((recipe) => (
              <RecipePreviewCard
                recipe={recipe}
                // eslint-disable-next-line no-underscore-dangle
                key={recipe._id}
                convertToHours={convertToHours}
                searchQuery={searchQuery}
              />
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
