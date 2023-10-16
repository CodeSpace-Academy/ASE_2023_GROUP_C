import React, { useState } from "react";

export default function SearchBar({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = () => {
    onSearch(searchTerm);
  };

  return (
    <div className="relative">
      <input
        type="text"
        className="w-full bg-gray-800 text-black border-2 border-blue-700 rounded-l p-2 focus:outline-none focus:ring focus:border-blue-600"
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button
        className="absolute top-0 right-0 mt-1 mr-2 px-4 py-1 bg-blue-700 text-white rounded-r cursor-pointer hover:bg-blue-800"
        onClick={handleSearch}
      >
        Search
      </button>
    </div>
  );
}
