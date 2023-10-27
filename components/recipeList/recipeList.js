import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import NoResultsMessage from "../layout/noResultsMessage";
import LoadMoreButton from "../ui-utils/loadMoreButton";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Pagination from "../pagination";
import SortingOption from "../ui-utils/filteringForm";
import FavoriteButton from "../ui-utils/FavoriteButton";
import NavBar from "../navigation/navbar";
import {
  faUtensils,
  faKitchenSet,
  faSpoon,
  faSort,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";

/**
 * RecipeList component for displaying and filtering recipes.
 * @param {Object} props - Component properties.
 * @param {Array} props.recipes - List of recipes to display.
 * @param {number} props.totalRecipeInDb - Total number of recipes in the database.
 */
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
  const [matchingRecipeCount, setMatchingRecipeCount] = useState(0);

  // State for sorting and dropdown visibility
  const [currentSort, setCurrentSort] = useState("default");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  /**
   * Updates 'noResults' state based on the filtered recipes and search input.
   * @param {Array} filteredRecipes - List of filtered recipes.
   * @param {string} input - Search input.
   */
  const updateNoResults = (filteredRecipes, input) => {
    setNoResults(filteredRecipes.length === 0 && input.trim() !== "");
  };

  /**
   * Handles sorting of recipes based on the selected option.
   * @param {string} option - The selected sorting option.
   */
  const handleSort = (option) => {
    setCurrentSort(option);
    let sortedRecipes = [...recipes]; // Use the current state of recipes for sorting

    switch (option) {
      case "ascending":
        sortedRecipes.sort((a, b) => a.prep - b.prep);
        break;
      case "descending":
        sortedRecipes.sort((a, b) => b.prep - a.prep);
        break;
      case "ascendingCook":
        sortedRecipes.sort((a, b) => a.cook - b.cook);
        break;
      case "descendingCook":
        sortedRecipes.sort((a, b) => b.cook - a.cook);
        break;
      case "byDateOldest":
        sortedRecipes.sort(
          (a, b) => new Date(a.published) - new Date(b.published)
        );
        break;
      case "byDateNewest":
        sortedRecipes.sort(
          (a, b) => new Date(b.published) - new Date(a.published)
        );
        break;
      case "default":
        sortedRecipes = initialRecipes.slice(0); // Reset to the initial order
        break;
      default:
        break;
    }

    setRecipes(sortedRecipes);
    setIsDropdownOpen(false);
  };

  /**
   * Toggles the sorting options dropdown.
   */
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  /**
   * Loads more recipes when the "Load More" button is clicked.
   */
  const loadMore = () => {
    const additionalRecipes = 20;
    const newVisibleRecipes = visibleRecipes + additionalRecipes;
    setVisibleRecipes(newVisibleRecipes);
    setRemainingRecipes(Math.max(recipes.length - newVisibleRecipes, 0));
  };

  /**
   * Converts minutes to hours and minutes format.
   * @param {number} minutes - Duration in minutes.
   * @returns {string} - Formatted duration string.
   */
  const convertToHours = (minutes) => {
    if (minutes >= 60) {
      const hours = Math.floor(minutes / 60);
      const remainingMinutes = minutes % 60;
      return `${hours} hours ${remainingMinutes} minutes`;
    }
    return `${minutes} minutes`;
  };

  /**
   * Handles search when the user clicks the "Search" button.
   */
 const router = useRouter(); // Add this line to get the router instance

const handleSearch = () => {
  const filteredRecipes = initialRecipes.filter((recipe) =>
    recipe.title.toLowerCase().includes(searchInput.toLowerCase())
  );

  setRecipes(filteredRecipes);
  const newVisibleRecipes = Math.min(visibleRecipes, filteredRecipes.length);
  setRemainingRecipes(
    Math.max(filteredRecipes.length - newVisibleRecipes, 0)
  );

  setMatchingRecipeCount(filteredRecipes.length);

  updateNoResults(filteredRecipes, searchInput);

  // Check if there are no matching recipes and the search input is not empty
  if (filteredRecipes.length === 0 && searchInput.trim() !== "") {
    router.push("/noresultsmessage"); // Redirect to the NoResultsMessage page
  }
};


  return (
    <div className="bg-gray-900 text-white h-screen flex">
      <div className="w-16 p-4">
        <NavBar />
      </div>
      <div className="flex-1 p-4">
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
            <FontAwesomeIcon icon={faSearch} size="lg" />
          </button>
        </div>
        <div className="relative inline-block text-white">
          <div className="sorting-container relative">
            <FontAwesomeIcon icon={faSort} size="lg" onClick={toggleDropdown} />
            {isDropdownOpen && (
              <div className="z-10">
                <SortingOption handleSort={handleSort} />
              </div>
            )}
          </div>
        </div>
        <div className="matching-recipe-count">
          {matchingRecipeCount > 0 && (
            <p>{matchingRecipeCount} matching recipes found</p>
          )}
        </div>
        <div
          className="recipe-list-container overflow-y-auto flex-grow"
          style={{ backgroundColor: "rgb(16, 23, 42)" }}
        >
          <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {recipes.slice(0, visibleRecipes).map((recipe) => (
              <li key={recipe._id}>
                <div className="relative bg-gray-800 p-4 rounded-lg transition hover:shadow-lg flex flex-col flex-wrap w-200">
                  <img
                    src={recipe.images[0]}
                    alt={recipe.title}
                    className="w-full h-48 object-cover rounded-md"
                  />
                  <FavoriteButton recipe={recipe} />
                  <div className="flex justify-between">
                    <h2 className="text-xl font-semibold mt-2">
                      {recipe.title}
                    </h2>
                  </div>
                  <p className="mt-2">
                    <FontAwesomeIcon icon={faUtensils} /> Prep:{" "}
                    {convertToHours(recipe.prep)}{" "}
                  </p>
                  <p>
                    <FontAwesomeIcon icon={faKitchenSet} /> Cook:{" "}
                    {convertToHours(recipe.cook)}
                  </p>

                  <p>
                    <FontAwesomeIcon icon={faSpoon} /> Total:{" "}
                    {convertToHours(recipe.prep + recipe.cook)}
                  </p>

                  <Link href={`/recipeDetails/${recipe._id}`} className="mt-4">
                    <button>View Recipe</button>
                  </Link>
                </div>
              </li>
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
    </div>
  );
}
