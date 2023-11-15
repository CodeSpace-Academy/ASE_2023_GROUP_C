import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSort } from '@fortawesome/free-solid-svg-icons';
import { PropTypes } from 'prop-types';
import SortingOption from './filteringForm';

export default function SearchSort(props) {
  // Local state
  const [setCurrentSort] = useState('default');

  // Destructuring props
  const { setRecipes, recipes, initialRecipes } = props;

  /**
   * Handles sorting of recipes based on the selected option.
   * @param {string} option - The selected sorting option.
   */
  const handleSort = (option) => {
    setCurrentSort(option);
    let sortedRecipes = [...recipes];

    switch (option) {
      case 'ascending':
      case 'descending':
        // Sort by prep time
        sortedRecipes.sort((a, b) => a.prep - b.prep);
        if (option === 'descending') {
          sortedRecipes.reverse();
        }
        break;
      case 'ascendingCook':
      case 'descendingCook':
        // Sort by cook time
        sortedRecipes.sort((a, b) => a.cook - b.cook);
        if (option === 'descendingCook') {
          sortedRecipes.reverse();
        }
        break;
      case 'ascendingSteps':
      case 'descendingSteps':
        // Sort by the number of steps
        sortedRecipes.sort((a, b) => a.instructions.length - b.instructions.length);
        if (option === 'descendingSteps') {
          sortedRecipes.reverse();
        }
        break;
      case 'byDateOldest':
      case 'byDateNewest':
        // Sort by date
        sortedRecipes.sort(
          (a, b) => new Date(a.published) - new Date(b.published)
        );
        if (option === 'byDateNewest') {
          sortedRecipes.reverse();
        }
        break;
      case 'default':
        sortedRecipes = initialRecipes.slice(0);
        break;
      default:
        break;
    }

    setRecipes(sortedRecipes);
  };

  return (
    <div className="p-2 flex flex-wrap justify-center gap-2 mb-3 ml-4 mr-4 border-slate-500 items-center md:justify-between">
      {/* Sorting */}
      <div className="p-2 flex items-center rounded-lg text-slate-400">
        <FontAwesomeIcon icon={faSort} size="lg" />
        <SortingOption handleSort={handleSort} />
      </div>
    </div>
  );
}

// Define PropTypes for the expected props
SearchSort.propTypes = {
  setRecipes: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  recipes: PropTypes.array.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  initialRecipes: PropTypes.array.isRequired,
  // setQuery: PropTypes.func.isRequired,
};
