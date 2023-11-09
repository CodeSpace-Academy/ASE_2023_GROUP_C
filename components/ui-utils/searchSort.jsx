<<<<<<< HEAD:components/ui-utils/searchSort.js
// SearchSort.js
import React, { useState } from 'react';
import SearchBar from '../layout/searchBar';
import SortingOption from './filteringForm';
import PropTypes from 'prop-types';

export default function SearchSort(props) {
  const [currentSort, setCurrentSort] = useState('default');

  const { setRecipes, recipes, initialRecipes, setQuery } = props;
=======
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSort } from '@fortawesome/free-solid-svg-icons';
import { PropTypes } from 'prop-types';
import SortingOption from './filteringForm';
import SearchBar from '../layout/searchBar';

// Define an interface for the props

export default function SearchSort(props) {
  // Local state
  const [setCurrentSort] = useState('default');

  // prop drilling
  const {
    setRecipes, recipes, initialRecipes, setQuery,
  } = props;
>>>>>>> bd7df3d7dec03e2853cb51a549e0ffc67c648021:components/ui-utils/searchSort.jsx

  const handleSort = (option) => {
    setCurrentSort(option);
    let sortedRecipes = [...recipes];
  
    switch (option) {
      case "ascending":
        // Sort by prep time in ascending order
        sortedRecipes.sort((a, b) => a.prep - b.prep);
        break;
      case "descending":
        // Sort by prep time in descending order
        sortedRecipes.sort((a, b) => b.prep - a.prep);
        break;
      case "ascendingCook":
        // Sort by cook time in ascending order
        sortedRecipes.sort((a, b) => a.cook - b.cook);
        break;
      case "descendingCook":
        // Sort by cook time in descending order
        sortedRecipes.sort((a, b) => b.cook - a.cook);
        break;
      case "ascendingSteps":
        // Sort by the number of steps in ascending order
        sortedRecipes.sort((a, b) => a.instructions.length - b.instructions.length);
        break;
      case "descendingSteps":
        // Sort by the number of steps in descending order
        sortedRecipes.sort((a, b) => b.instructions.length - a.instructions.length);
        break;
      case "byDateOldest":
        // Sort by date (as before)
        sortedRecipes.sort(
          (a, b) => new Date(a.published) - new Date(b.published),
        );
        break;
      case "byDateNewest":
        // Sort by date (as before)
        sortedRecipes.sort(
          (a, b) => new Date(b.published) - new Date(a.published),
        );
        break;
      case "default":
        sortedRecipes = initialRecipes.slice(0);
        break;
      default:
        break;
    }
  
    setRecipes(sortedRecipes);
  };
  

  return (
    <div className="p-2 flex flex-wrap justify-center gap-2 mb-3 ml-4 mr-4 border-slate-500 border rounded-lg items-center md:justify-between">
      {/* searchbar */}
      <SearchBar setQuery={setQuery} />
      {/* sort */}
      <div className="p-2 flex items-center rounded-lg text-slate-400">
        <SortingOption
          handleSort={handleSort}
          currentSort={currentSort}
          setCurrentSort={setCurrentSort}
        />
      </div>
    </div>
  );
}

SearchSort.propTypes = {
  setRecipes: PropTypes.func.isRequired,
<<<<<<< HEAD:components/ui-utils/searchSort.js
  recipes: PropTypes.array.isRequired,
=======
  // eslint-disable-next-line react/forbid-prop-types
  recipes: PropTypes.array.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
>>>>>>> bd7df3d7dec03e2853cb51a549e0ffc67c648021:components/ui-utils/searchSort.jsx
  initialRecipes: PropTypes.array.isRequired,
  setQuery: PropTypes.func.isRequired,
};
