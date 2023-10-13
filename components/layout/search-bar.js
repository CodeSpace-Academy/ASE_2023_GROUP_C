import React, { useState } from "react";

export default function SearchBar({ onSearch }) {
  const [searchInput, setSearchInput] = useState("");
  
  const handleSearch = () => {
    onSearch(searchInput);
  };

  return (
    <div className="search-container">
      <input
        type="text"
        placeholder="Search for recipes by title"
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
}
