import React, { useState, useEffect } from "react";
import NoResultsMessage from "../layout/noResultsMessage";
import LoadMoreButton from "../ui-utils/loadMoreButton";
import Link from "next/link";
import {
  faUtensils,
  faKitchenSet,
  faHome,
  faSpoon,
  faHeart,
  faSort,
  faFilter,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Pagination from "../pagination";
import SortingOption from "../ui-utils/filteringForm";

export default function RecipeList(props) {
  // Destructure props
  const { recipes: initialRecipes, totalRecipeInDb } = props;
  const [isFavourate, setIsFavourate] = useState(false);

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
          (a, b) => new Date(b.published) - new Date(a.published)
        );
        break;
      case "default":
        sortedRecipes = initialRecipes;
        break;
      default:
        break;
    }

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
    setRemainingRecipes(Math.max(recipes.length - newVisibleRecipes, 0)); // Add a closing parenthesis here
  };

  // Function to convert minutes to hours and minutes
  const convertToHours = (minutes) => {
    if (minutes >= 60) {
      const hours = Math.floor(minutes / 60);
      const remainingMinutes = minutes % 60;
      return `${hours} hours ${remainingMinutes} minutes`;
    }
    return `${minutes} minutes`;
  };

  // Handle search when the user clicks the "Search" button
  const handleSearch = () => {
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
  };

  return (
    <div className="bg-gray-900 text-white h-screen p-4 flex flex-col">
      <div className="flex items-center">
        <Link href="/">
          <FontAwesomeIcon icon={faHome} size="lg" className="p-2" />
        </Link>
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
      </div>

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
        <button className="bg-red-700 text-white p-2 rounded-r hover:bg-blue-800">
          <FontAwesomeIcon icon={faFilter} />
        </button>

        <Link href="/favouriteRecipes">
          <button className="text-white p-2">Favorite Recipes</button>
        </Link>
      </div>
      {noResults && <NoResultsMessage />}

      <div className="matching-recipe-count">
        {matchingRecipeCount > 0 && (
          <p>{matchingRecipeCount} matching recipes found</p>
        )}
      </div>

      <div className="recipe-list-container overflow-y-auto flex-grow">
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {recipes.slice(0, visibleRecipes).map((recipe) => (
            <li key={recipe._id}>
              <div className="relative bg-gray-800 p-4 rounded-lg transition hover:shadow-lg flex flex-col flex-wrap w-200">
                <img
                  src={recipe.images[0]}
                  alt={recipe.title}
                  className="w-full h-48 object-cover rounded-md"
                />
                <button className="absolute right-4 m-3 rounded-full w-14 text-center">
                  {isFavourate ? (
                    <FontAwesomeIcon icon={faHeart} />
                  ) : (
                    <FontAwesomeIcon icon={faHeart} />
                  )}
                </button>

                <div className="flex justify-between">
                  <h2 className="text-xl font-semibold mt-2">{recipe.title}</h2>
                </div>
                <p className="mt-2">
                  <FontAwesomeIcon icon={faUtensils} /> Prep:{" "}
                  {convertToHours(recipe.prep)}{" "}
                </p>
                <p>
                  <FontAwesomeIcon icon={faKitchenSet} /> Cook:{" "}
                  {convertToHours(recipe.cook)}{" "}
                </p>
                <p>
                  <FontAwesomeIcon icon={faSpoon} /> Total:{" "}
                  {convertToHours(recipe.prep + recipe.cook)}{" "}
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
  );
}



