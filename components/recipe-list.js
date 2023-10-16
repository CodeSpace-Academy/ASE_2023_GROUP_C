import React, { useState, useEffect } from "react";
import styles from "./recipe-list.module.css";
import SearchBar from "./layout/search-bar";
import NoResultsMessage from "./layout/no-results-message";
import LoadMoreButton from "./ui-utils/load-more-button";
import TagsDisplay from "./tags/tags-display";
import Link from 'next/link'; 

export default function RecipeList(props) {
  const { recipes: initialRecipes } = props;
  
  const [recipes, setRecipes] = useState(initialRecipes); // State for storing the recipes

  const [visibleRecipes, setVisibleRecipes] = useState(4); // State for controlling the number of visible recipes

  // State for tracking the number of remaining recipes
  const [remainingRecipes, setRemainingRecipes] = useState(
    initialRecipes ? initialRecipes.length - visibleRecipes : 0
  );

  const [searchInput, setSearchInput] = useState(""); // State for the search input

  const [noResults, setNoResults] = useState(false); // State to track whether no results were found

  useEffect(() => {
    // Initialize the recipes when initialRecipes change
    setRecipes(initialRecipes);
    updateNoResults(initialRecipes, searchInput);
  }, [initialRecipes]);

  useEffect(() => {
    // Filter recipes based on the user's input in the title
    const filteredRecipes = initialRecipes.filter((recipe) =>
      recipe.title.toLowerCase().includes(searchInput.toLowerCase())
    );

    // Update the displayed recipes and remaining recipes count
    setRecipes(filteredRecipes);
    setRemainingRecipes(filteredRecipes.length - visibleRecipes);
    updateNoResults(filteredRecipes, searchInput);
  }, [searchInput]);

  const updateNoResults = (filteredRecipes, input) => {
    setNoResults(filteredRecipes.length === 0 && input.trim() !== "");
  };

  // Function to load more recipes
  const loadMore = () => {
    const additionalRecipes = 4;
    const newVisibleRecipes = visibleRecipes + additionalRecipes;
    // Update the number of visible recipes and remaining recipes count
    setVisibleRecipes(newVisibleRecipes);
    setRemainingRecipes(recipes.length - newVisibleRecipes);
  };

  return (
    <div className={styles.recipeListContainer}>
      <SearchBar onSearch={setSearchInput} />
      {noResults && <NoResultsMessage />}
      <h1 className={styles.recipeListTitle}>Recipe List</h1>
      <ul className={styles.recipeGrid}>
        {recipes.slice(0, visibleRecipes).map((recipe) => (
          <li key={recipe._id} className={styles.recipeItem}>
            <Link href={`/recipe-list/${recipe._id}`}> 
              <div>
                <img
                  src={recipe.images[0]}
                  alt={recipe.title}
                  className={styles.recipeImage}
                />
                <h2 className={styles.recipeTitle}>{recipe.title}</h2>
                <p>Prep Time: {recipe.prep} </p>
                <p>Cook Time: {recipe.cook} </p>
                <TagsDisplay recipe={recipe} />
              </div>
            </Link>
          </li>
        ))}
      </ul>
      {remainingRecipes > 0 && (
        <LoadMoreButton
          onClick={loadMore}
          remainingRecipes={remainingRecipes}
        />
      )}
    </div>
  );
}
