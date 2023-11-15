import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSort } from '@fortawesome/free-solid-svg-icons';
import { PropTypes } from 'prop-types';
import SortingOption from './filteringForm';

export default function SearchSort(props) {
  // Local state
  const [setCurrentSort] = useState('default');

  // prop drilling
  const { setRecipes, recipes, initialRecipes } = props;

  // sort func
  const handleSort = (option) => {
    // Update the current sorting option
    setCurrentSort(option);
    let sortedRecipes = [...recipes]; // Use the current state of recipes for sorting

    switch (option) {
      case 'ascending':
        sortedRecipes.sort((a, b) => a.prep - b.prep);
        break;
      case 'descending':
        sortedRecipes.sort((a, b) => b.prep - a.prep);
        break;
      case 'ascendingCook':
        sortedRecipes.sort((a, b) => a.cook - b.cook);
        break;
      case 'descendingCook':
        sortedRecipes.sort((a, b) => b.cook - a.cook);
        break;
      case 'byDateOldest':
        sortedRecipes.sort(
          (a, b) => new Date(a.published) - new Date(b.published),
        );
        break;
      case 'byDateNewest':
        sortedRecipes.sort(
          (a, b) => new Date(b.published) - new Date(a.published),
        );
        break;
      case 'default':
        sortedRecipes = initialRecipes.slice(0); // Reset to the initial order
        break;
      default:
        break;
    }

    // Update the state with the sorted recipes
    setRecipes(sortedRecipes);
  };

  return (
    <div className=" p-2 flex flex-wrap justify-center gap-2 ml-4 border-slate-500 items-center md:justify-between ">
      {/* sort */}
      <div className=" p-2 flex items-center rounded-lg text-slate-400">
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
