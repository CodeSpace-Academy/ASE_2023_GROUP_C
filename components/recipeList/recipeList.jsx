import React, { useState } from 'react';
import { useRouter } from 'next/router';
import RecipePreviewCard from '../ui-utils/RecipePreviewCard';
import PaginationControls from '../ui-utils/PaginationControls';
import NoResultsMessage from '../layout/noResultsMessage';

/**
 * RecipeList component for displaying and filtering recipes.
 * @param {Object} props - Component properties.
 * @param {Array} props.recipes - List of recipes to display.
 * @param {number} props.pageNumber
 * @param {number} props.currentDocumentSize
 */

export default function RecipeList(props) {
  // Destructure props
  const { recipes, pageNumber, currentDocumentSize } = props;
  const { query } = useRouter();
  const { page } = query;
  const searchQuery = query.search ? JSON.parse(query.search) : '';
  const parsedValue = parseInt(page, 10);

  // stateVariables
  const [recipeCount, setRecipeCount] = useState(currentDocumentSize - (parsedValue || 1 * 100));

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
      <PaginationControls
        pageNumber={pageNumber}
        currentDocumentSize={currentDocumentSize}
        recipeCount={recipeCount}
        setRecipeCount={setRecipeCount}
      />
      <div className="bg-gray-900 text-white h-screen flex">
        <div className="flex-1 p-4">
          {/* This here is basically the list */}
          <ul className="grid pb-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {!recipes.length < 1 ?(recipes.map((recipe) => (
              <RecipePreviewCard
                key={recipe._id}
                recipe={recipe}
                convertToHours={convertToHours}
                searchQuery={searchQuery}
              />
            ))): <NoResultsMessage />}
          </ul>
          <PaginationControls
            pageNumber={pageNumber}
            currentDocumentSize={currentDocumentSize}
            recipeCount={recipeCount}
            setRecipeCount={setRecipeCount}
          />
        </div>
      </div>
    </div>
  );
}
