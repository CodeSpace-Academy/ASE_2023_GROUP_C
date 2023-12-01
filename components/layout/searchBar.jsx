import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import { useDebounce } from 'use-debounce';

/**
 *SearchBar component for searching recipes by title.
 */
export default function SearchBar(props) {
  const router = useRouter();
  const [searchValue, setSearchValue] = useState('');
  const [debouncedSearchValue] = useDebounce(searchValue, 1000);
  const { setQuery } = props;
  // Use useEffect to trigger the search when debouncedSearchValue changes.
  useEffect(() => {
    // Check if debouncedSearchValue is not empty before
    // updating the query and triggering the search
    if (debouncedSearchValue !== '') {
      setQuery(debouncedSearchValue);
      const queryString = `page=1&search=${JSON.stringify(debouncedSearchValue)}&sortBy=Default`;
      const url = `recipes?${queryString}`;
      // Use router.replace instead of router.push to prevent
      // adding unnecessary entries to the browser's history
      router.replace(url);
    }
    if (debouncedSearchValue === '') {
      router.push('/recipes');
    }
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
