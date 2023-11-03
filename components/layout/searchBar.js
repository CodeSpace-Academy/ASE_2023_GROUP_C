
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import { useDebounce } from "use-debounce";

/**
 * SearchBar component for searching recipes by title.
 */
export default function       SearchBar() {

  const router = useRouter();
  const [searchValue, setSearchValue ] = useState("")
  const [ debouncedSearchValue ] = useDebounce(searchValue, 1000)
  
  // Use useEffect to trigger the search when debouncedSearchValue changes.
  useEffect(() => {
    if (!debouncedSearchValue) {
      router.push(`/recipeList/1`)
    }
      else{
        router.push(`/search/${debouncedSearchValue}`);
      }
  }, [debouncedSearchValue]);

  /**
   * Handles the input change when the user types a search query.
   * @param {Event} event - The input change event.
   */
  const handleInputChange = (event) => {
   setSearchValue(event.target.value)
  };

  return (
    <form className="search-container">
        {/* Input field where users can type their search query. */}
        <input
          type="text"
          placeholder="Search for recipes by title"
          id="titleSearch"
          value={searchValue}
          onChange={handleInputChange}
          className=" p-2 rounded-full text-black"
        />
    </form>
  );
}
