import React, { useEffect, useState } from "react";

export default function CategoryFilter({ selectedCategory, onCategoryChange }) {
  const [categories, setCategories] = useState([]);
  const [searchInput, setSearchInput] = useState(""); // Initialize search input state
  const [filteredCategories, setFilteredCategories] = useState([]); // State for filtered categories
  const [showMore, setShowMore] = useState(50); // Number of buttons to show

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

  const handleCategoryClick = (category) => {
    // Append the clicked category to the search input
    setSearchInput(searchInput + " " + category);
    handleSearch(); // Perform a search immediately when a category is clicked
  };

  const handleShowMore = () => {
    setShowMore(showMore + 50); // Increase the number of buttons to show
  };

  useEffect(() => {
    if (searchInput.trim() === "") {
      // If the search input is empty, show only the limited number of categories
      setFilteredCategories(categories.slice(0, showMore));
    }
  }, [searchInput, categories, showMore]);

  if (!categories) {
    return <div>No Categories available.</div>;
  }

  return (
    <div>
      {/* Search bar */}
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
      {/* Category buttons */}
      {filteredCategories.map((category, index) => (
        <button
          key={index}
          value={category}
          className="p-2 m-2"
          onClick={() => handleCategoryClick(category)}
        >
          {category}
        </button>
      ))}
      ;{/* Load More button (if applicable) */}
      {categories.length > showMore && (
        <button onClick={handleShowMore} className="p-2 m-2">
          Load More
        </button>
      )}
    </div>
  );
}
