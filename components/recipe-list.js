import React, { useState, useEffect } from "react";
import SearchBar from "./layout/search-bar";
import NoResultsMessage from "./layout/no-results-message";
import LoadMoreButton from "./ui-utils/load-more-button";
import TagsDisplay from "./tags/tags-display";
import Link from "next/link";

export default function RecipeList(props) {
  const { recipes: initialRecipes } = props;

  const [recipes, setRecipes] = useState(initialRecipes);
  const [visibleRecipes, setVisibleRecipes] = useState(4);
  const [remainingRecipes, setRemainingRecipes] = useState(
    initialRecipes ? initialRecipes.length - visibleRecipes : 0
  );
  const [searchInput, setSearchInput] = useState("");
  const [noResults, setNoResults] = useState(false);

  useEffect(() => {
    setRecipes(initialRecipes);
    updateNoResults(initialRecipes, searchInput);
  }, [initialRecipes]);

  useEffect(() => {
    const filteredRecipes = initialRecipes.filter((recipe) =>
      recipe.title.toLowerCase().includes(searchInput.toLowerCase())
    );

    setRecipes(filteredRecipes);
    setRemainingRecipes(filteredRecipes.length - visibleRecipes);
    updateNoResults(filteredRecipes, searchInput);
  }, [searchInput]);

  const updateNoResults = (filteredRecipes, input) => {
    setNoResults(filteredRecipes.length === 0 && input.trim() !== "");
  };

  const loadMore = () => {
    const additionalRecipes = 4;
    const newVisibleRecipes = visibleRecipes + additionalRecipes;
    setVisibleRecipes(newVisibleRecipes);
    setRemainingRecipes(recipes.length - newVisibleRecipes);
  };

  const convertToHours = (minutes) => {
    if (minutes >= 60) {
      const hours = Math.floor(minutes / 60);
      const remainingMinutes = minutes % 60;
      return `${hours} hours ${remainingMinutes} minutes`;
    }
    return `${minutes} minutes`;
  };

  return (
    <div className="bg-gray-900 text-white h-screen p-4 flex flex-col justify-center items-center">
      <h1 className="text-3xl font-bold text-white mb-4">Recipe List</h1>
      <SearchBar onSearch={setSearchInput} />
      {noResults && <NoResultsMessage />}
      <div className="recipe-list-container overflow-y-auto">
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {recipes.slice(0, visibleRecipes).map((recipe) => (
            <li key={recipe._id}>
              <Link href={`/recipe-list/${recipe._id}`}>
                <div className="bg-gray-800 p-4 rounded-lg transition hover:shadow-lg">
                  <img
                    src={recipe.images[0]}
                    alt={recipe.title}
                    className="w-full h-48 object-cover"
                  />
                  <h2 className="text-xl font-semibold mt-2">{recipe.title}</h2>
                  <p>Prep Time: {convertToHours(recipe.prep)} </p>
                  <p>Cook Time: {convertToHours(recipe.cook)} </p>
                  <p>Total Time: {convertToHours(recipe.prep + recipe.cook)} </p>
                  <TagsDisplay recipe={recipe} />
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
        {remainingRecipes > 0 && (
          <LoadMoreButton
            onClick={loadMore}
            remainingRecipes={remainingRecipes}
            className="bg-blue-700 text-white px-2 py-1 rounded-full hover:bg-white-800"
          />
        )}
      </div>
    </div>
  );
}
