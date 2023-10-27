import Link from "next/link";
import { useRouter } from "next/router";
import React, { useRef, useState } from "react";

export default function SearchBar() {
  const searchRef = useRef();
  const router = useRouter();

  const handleSubmit = (event) => {
    event.preventDefault();
    const searchValue = searchRef.current.value;
    router.push(`search/${searchValue}`);
  };

  // The following component defines a search bar in a Next.js application.

  return (
    <form className="search-container" onSubmit={handleSubmit}>
      <div className="search-bar-container flex items-center mb-4">
        {/* Input field where users can type their search query */}
        <input
          type="text"
          placeholder="Search for recipes by title"
          ref={searchRef}
          id="titleSearch"
          className="w-3/4 p-2 border rounded-l text-black"
        />

        {/* Submit button for triggering the search */}
        <button
          type="submit"
          className="bg-green-500 text-white p-2 rounded-r hover:bg-green-700 mr-5"
        >
          Search
        </button>
      </div>
    </form>
  );
}
