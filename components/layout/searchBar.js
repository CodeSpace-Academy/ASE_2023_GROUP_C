import Link from "next/link";
import { useRouter } from "next/router";
import React, { useRef } from "react";

/**
 * SearchBar component for searching recipes by title.
 */
export default function SearchBar() {
  const searchRef = useRef();
  const router = useRouter();

  /**
   * Handles the form submission when the user submits a search query.
   * @param {Event} event - The form submission event.
   */
  const handleSubmit = (event) => {
    event.preventDefault();
    // Get the search value from the input field.
    const searchValue = searchRef.current.value;

    // Check if the search query is empty or contains only spaces.
    if (searchValue.trim() === "") {
      // Redirect to the NoResultsMessage page when the search query is invalid.
      router.push("/NoResultsMessage");
    } else {
      // Use the router to navigate to the search results page with the search query as a parameter.
      router.push(`search/${searchValue}`);
    }
  };

  return (
    <form className="search-container" onSubmit={handleSubmit}>
      <div className="search-bar-container flex justify-center items-center">
        {/* Input field where users can type their search query. */}
        <input
          type="text"
          placeholder="Search for recipes by title"
          ref={searchRef}
          id="titleSearch"
          className="p-2 border rounded-l text-black w-80" // Adjusted the width (w-80).
        />
        {/* Submit button for triggering the search. */}
        <button
          type="submit"
          className="bg-green-500 text-white p-2 rounded-r hover-bg-green-700"
        >
          Search
        </button>
      </div>
    </form>
  );
}
