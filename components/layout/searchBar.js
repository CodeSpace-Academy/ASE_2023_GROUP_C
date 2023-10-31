
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import { useDebounce } from "../hooks/hooks";

/**
 * SearchBar component for searching recipes by title.
 */
export default function SearchBar() {

  const router = useRouter();
  const [searchValue, setSearchValue ] = useState("")
  const debouncedSearchValue = useDebounce(searchValue, 1000)
  
  // Use useEffect to trigger the search when debouncedSearchValue changes.
  useEffect(() => {
    if (debouncedSearchValue.trim() === "") {
      router.push("/recipeList");
    } else {
      router.push(`search/${debouncedSearchValue}`);
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
      <div className="search-bar-container flex justify-center items-center">
        {/* Input field where users can type their search query. */}
        <input
          type="text"
          placeholder="Search for recipes by title"
          id="titleSearch"
          className="p-2 border rounded-l text-black w-80" // Adjusted the width (w-80).
          value={searchValue}
          onChange={handleInputChange}
        />
      </div>
    </form>
  );
}
