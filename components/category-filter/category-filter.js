import React, { useEffect, useState } from "react";

export default function CategoryFilter({ selectedCategory, onCategoryChange }) {
  const [categories, setCategories] = useState([]);
  const [searchInput, setSearchInput] = useState(""); // Initialize search input state
  const [filteredCategories, setFilteredCategories] = useState([]); // State for filtered categories

  // Fetch categories from MongoDB
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("/api/categories"); // Replace with your API route to fetch categories
        const data = await response.json();
        setCategories(data.message);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const handleSearch = () => {
    // Filter categories based on the search input
    const filtered = categories.filter((category) =>
      category.toLowerCase().includes(searchInput.toLowerCase())
    );

    setFilteredCategories(filtered);
  };

  useEffect(() => {
    if (searchInput.trim() === "") {
      // If the search input is empty, show all categories
      setFilteredCategories(categories);
    }
  }, [searchInput, categories]);

  if (!categories) {
    return <div>No categories available.</div>;
  }

  return (
    <div>
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
          className="bg-blue-700 text-white p-2 rounded-r hover-bg-blue-800"
        >
          Search
        </button>
      </div>
      <label>Filter by Category:</label>
      {categories.map((category, index) => (
        <button key={index} value={category} className=" p-2 m-2">
          {category}
        </button>
      ))}
    </div>
  );
}
