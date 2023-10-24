import React, { useState, useEffect } from "react";
import NoResultsMessage from "./layout/no-results-message";
import LoadMoreButton from "./ui-utils/load-more-button";
import {
  faHome,
  faSort,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Pagination from "./pagination";
import SortingOption from "./ui-utils/filtering-form";
import PreviewCard from "./ui-utils/previewCard";
import Link from "next/link";
import SearchInput from "./ui-utils/searchInput";

export default function RecipeList(props) {
  // Destructure props
  const { recipes: initialRecipes, totalRecipeInDb } = props;
  
  // State variables
  const [recipes, setRecipes] = useState(initialRecipes);
  const [visibleRecipes, setVisibleRecipes] = useState(20);
  const [remainingRecipes, setRemainingRecipes] = useState(
    initialRecipes ? Math.max(initialRecipes.length - visibleRecipes, 0) : 0
  );
  const [searchInput, setSearchInput] = useState("");
  const [noResults, setNoResults] = useState(false);
  const [matchingRecipeCount, setMatchingRecipeCount] = useState(0); // Added state for matching recipe count

  // State for sorting and dropdown visibility
  const [currentSort, setCurrentSort] = useState("default");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Handle initial recipes and no results
  useEffect(() => {
    setRecipes(initialRecipes);
    updateNoResults(initialRecipes, searchInput);
  }, [initialRecipes]);

  // Handle search and filtering recipes
  useEffect(() => {
    const filteredRecipes = initialRecipes.filter((recipe) =>
      recipe.title.toLowerCase().includes(searchInput.toLowerCase())
    );

    setRecipes(filteredRecipes);
    const newVisibleRecipes = Math.min(visibleRecipes, filteredRecipes.length);
    setRemainingRecipes(
      Math.max(filteredRecipes.length - newVisibleRecipes, 0)
    );

    // Update the count of matching recipes
    setMatchingRecipeCount(filteredRecipes.length);

    updateNoResults(filteredRecipes, searchInput);
  }, [searchInput, visibleRecipes, initialRecipes]);

  // Function to update 'noResults' state
  const updateNoResults = (filteredRecipes, input) => {
    setNoResults(filteredRecipes.length === 0 && input.trim() !== "");
  };

  // Function to handle sorting
  const handleSort = (option) => {
    setCurrentSort(option);
    let sortedRecipes = [...initialRecipes]; // Use the initial recipes for sorting

    setRecipes(sortedRecipes);
    setIsDropdownOpen(false); // Close the dropdown after selecting an option
  };

  // Function to toggle the sorting options dropdown
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  // Function to load more recipes
  const loadMore = () => {
    const additionalRecipes = 20;
    const newVisibleRecipes = visibleRecipes + additionalRecipes;
    setVisibleRecipes(newVisibleRecipes);
    setRemainingRecipes(Math.max(recipes.length - newVisibleRecipes, 0));
  };

  // Handle search when the user clicks the "Search" button
  const handleSearch = () => {
    const filteredRecipes = initialRecipes.filter((recipe) =>
      recipe.title.toLowerCase().includes(searchInput.toLowerCase())
    );

    setRecipes(filteredRecipes);
    const newVisibleRecipes = Math.min(visibleRecipes, filteredRecipes.length);
    setRemainingRecipes(Math.max(filteredRecipes.length - newVisibleRecipes, 0));

    // Update the count of matching recipes
    setMatchingRecipeCount(filteredRecipes.length);

    updateNoResults(filteredRecipes, searchInput);
  };

  return (
    <div className="bg-gray-900 text-white h-screen p-4 flex flex-col">
     <div className="flex items-center">
      <Link href="/" className=" rounded-lg border border-gray-800 mb-3">
        <FontAwesomeIcon icon={faHome} size="lg" className="p-2" />
      </Link>
      
        <div className="relative inline-block text-white">
          <div className="sorting-container relative">
            <div className="rounded-lg border border-gray-800 mb-3 p-2 ml-2">
            <FontAwesomeIcon icon={faSort} size="lg" onClick={toggleDropdown} />
            </div>
            {isDropdownOpen && (
              <div className="z-10">
                <SortingOption handleSort={handleSort} />
              </div>
            )}
          </div>
        </div>
      </div>

      <SearchInput handleSearch={handleSearch}/>
      {noResults && <NoResultsMessage />}

      {/* recipe list container */}
      <div className="recipe-list-container overflow-y-auto flex-grow">
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {recipes.slice(0, visibleRecipes).map((recipe) => (
            <PreviewCard recipe={recipe} />
          ))}
        </ul>
      </div>

      <div className="bg-gray-900 p-4 flex justify-center items-center">
        {remainingRecipes > 0 && (
          <LoadMoreButton
            onClick={loadMore}
            remainingRecipes={remainingRecipes}
            className="bg-blue-700 text-white px-2 py-1 rounded-full hover-bg-blue-800"
          />
        )}
      </div>
      <Pagination totalRecipeInDb={totalRecipeInDb} />
    </div>
  );
}



