import { useState } from "react";

export default function SearchInput(props) {
  
    const [searchInput, setSearchInput] = useState("");

    const { handleSearch } = props
    return (

    <div className="search-bar-container flex items-center mb-4">
    <input
      type="text"
      value={searchInput}
      onChange={(e) => setSearchInput(e.target.value)}
      placeholder="Search..."
      className="w-3/4 p-2 border rounded-l text-black"
    />
    <button
      onClick={handleSearch}
      className="bg-blue-700 text-white p-2 rounded-r hover:bg-blue-800"
    >
      Search
    </button>
  </div>
  )
}
