
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import { useDebounce } from "use-debounce";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

export default function SearchBar(props) {
  const router = useRouter();
  const [searchValue, setSearchValue] = useState("");
  const [debouncedSearchValue] = useDebounce(searchValue, 1000);

  // Use useEffect to trigger the search when debouncedSearchValue changes.
  useEffect(() => {
    props.setQuery(debouncedSearchValue);
  }, [debouncedSearchValue]);

  /**
   * Handles the input change when the user types a search query.
   * @param {Event} event - The input change event.
   */
  const handleInputChange = (event) => {
    setSearchValue(event.target.value);
  };

  return (
    <form className="p-2 flex flex-wrap justify-center gap-2  mb-3 ml-4 mr-4 border-slate-500 border rounded-lg items-center md:justify-between ">
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
