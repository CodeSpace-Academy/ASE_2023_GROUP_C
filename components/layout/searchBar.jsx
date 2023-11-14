import React, { useState, useEffect } from 'react';
import { useDebounce } from 'use-debounce';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
/**
 *SearchBar component for searching recipes by title.
 */
export default function SearchBar(props) {
  const [searchValue, setSearchValue] = useState('');
  const [debouncedSearchValue] = useDebounce(searchValue, 1000);
  const { setQuery } = props;
  // Use useEffect to trigger the search when debouncedSearchValue changes.
  useEffect(() => {
    setQuery(debouncedSearchValue);
  }, [debouncedSearchValue, setQuery]);

  /**
   * Handles the input change when the user types a search query.
   * @param {Event} event - The input change event.
   */
  const handleInputChange = (event) => {
    setSearchValue(event.target.value);
  };

  return (
    <form className="search-container text-center">
      {/* Input field where users can type their search query. */}
      <FontAwesomeIcon icon={faSearch} size="lg" className="text-slate-400" />
      <input
        type="text"
        placeholder="Search for recipes by title"
        id="titleSearch"
        value={searchValue}
        onChange={handleInputChange}
        className="appearance-none focus:outline-none bg-transparent autofill:bg-transparent p-2 rounded-lg text-slate-400"
      />
    </form>
  );
}
