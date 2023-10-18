import React, { useState, useEffect } from "react";
import NoResultsMessage from "./layout/no-results-message";
import LoadMoreButton from "./ui-utils/load-more-button";
import TagsDisplay from "./tags/tags-display";
import Link from "next/link";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faStopwatch, faKitchenSet, faTags, faHourglass } from '@fortawesome/free-solid-svg-icons';


export default function RecipeList(props) {
  const { recipes: initialRecipes } = props;

  const [recipes, setRecipes] = useState(initialRecipes);
  const [visibleRecipes, setVisibleRecipes] = useState(4);
  const [remainingRecipes, setRemainingRecipes] = useState(
    initialRecipes ? Math.max(initialRecipes.length - visibleRecipes, 0) : 0
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
    const newVisibleRecipes = Math.min(visibleRecipes, filteredRecipes.length);
    setRemainingRecipes(Math.max(filteredRecipes.length - newVisibleRecipes, 0));
    updateNoResults(filteredRecipes, searchInput);
  }, [searchInput, visibleRecipes]);

  const updateNoResults = (filteredRecipes, input) => {
    setNoResults(filteredRecipes.length === 0 && input.trim() !== "");
  };

  const loadMore = () => {
    const additionalRecipes = 4;
    const newVisibleRecipes = visibleRecipes + additionalRecipes;
    setVisibleRecipes(newVisibleRecipes);
    setRemainingRecipes(
      Math.max(recipes.length - newVisibleRecipes, 0)
    );
  };

  const convertToHours = (minutes) => {
    if (minutes >= 60) {
      const hours = Math.floor(minutes / 60);
      const remainingMinutes = minutes % 60;
      return `${hours} hours ${remainingMinutes} minutes`;
    }
    return `${minutes} minutes`;
  };

  const handleSearch = () => {
    // Handle the search when the user clicks the "Search" button.
    // You can add your search logic here.
    const filteredRecipes = initialRecipes.filter((recipe) =>
      recipe.title.toLowerCase().includes(searchInput.toLowerCase())
    );

    setRecipes(filteredRecipes);
    const newVisibleRecipes = Math.min(visibleRecipes, filteredRecipes.length);
    setRemainingRecipes(Math.max(filteredRecipes.length - newVisibleRecipes, 0));
    updateNoResults(filteredRecipes, searchInput);
  };

  return (
    <div className="bg-gray-900 text-white h-screen p-4 flex flex-col">
<Link href="/">
  <FontAwesomeIcon icon={faHome} size="lg" className="p-2" />
</Link>


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
      {noResults && <NoResultsMessage />}
      <div className="recipe-list-container overflow-y-auto flex-grow">
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
                  <p><FontAwesomeIcon icon={faStopwatch}/>: {convertToHours(recipe.prep)} </p>
                  <p><FontAwesomeIcon icon={faKitchenSet} />: {convertToHours(recipe.cook)} </p>
                  <p><FontAwesomeIcon icon={faHourglass} />: {convertToHours(recipe.prep + recipe.cook)} </p>
                  <span><FontAwesomeIcon icon={faTags} /><TagsDisplay recipe={recipe} /></span> 
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="bg-gray-900 p-4 flex justify-center items-center">
        {remainingRecipes > 0 && (
          <LoadMoreButton
            onClick={loadMore}
            remainingRecipes={remainingRecipes}
            className="bg-blue-700 text-white px-2 py-1 rounded-full hover:bg-blue-800"
          />
        )}
      </div>
    </div>
  );
}
