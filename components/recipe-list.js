// RecipeList.js
import React, { useState, useEffect } from "react";
import styles from "./recipe-list.module.css";
import SearchBar from "./layout/search-bar";
import NoResultsMessage from "./layout/no-results-message";
import LoadMoreButton from "./ui-utils/load-more-button";
import TagsDisplay from "./tags/tags-display";
import Instructions from "./instructions/instructions";
import EditableDescription from "./editableDescription";

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

  const handleEditDescription = (recipeId, editedDescription) => {
    const updatedRecipes = [...recipes];
    const index = updatedRecipes.findIndex((recipe) => recipe._id === recipeId);

    if (index !== -1) {
      updatedRecipes[index].editedDescription = editedDescription;
      setRecipes(updatedRecipes);
    }
  };

  const handleSaveDescription = () => {
    const recipesWithSavedDescriptions = recipes.map((recipe) => ({
      ...recipe,
      description: recipe.editedDescription,
    }));

    setRecipes(recipesWithSavedDescriptions);
    // You can also save the recipes to your database here
  };

  const handleCancelEdit = (recipeId) => {
    const updatedRecipes = [...recipes];
    const index = updatedRecipes.findIndex((recipe) => recipe._id === recipeId);

    if (index !== -1) {
      updatedRecipes[index].editedDescription = updatedRecipes[index].description;
      setRecipes(updatedRecipes);
    }
  };

  return (
    <div className={styles.recipeListContainer}>
      <SearchBar onSearch={setSearchInput} />
      {noResults && <NoResultsMessage />}
      <h1 className={styles.recipeListTitle}>Recipe List</h1>
      <ul className={styles.recipeGrid}>
        {recipes.slice(0, visibleRecipes).map((recipe) => (
          <li key={recipe._id} className={styles.recipeItem}>
            <img
              src={recipe.images[0]}
              alt={recipe.title}
              className={styles.recipeImage}
            />
            <h2 className={styles.recipeTitle}>{recipe.title}</h2>
            <EditableDescription
              recipe={recipe}
              onEditDescription={handleEditDescription}
              onCancelEdit={handleCancelEdit}
            />
            <TagsDisplay recipe={recipe} />
            <Instructions recipe={recipe} />
          </li>
        ))}
      </ul>
      {remainingRecipes > 0 && (
        <LoadMoreButton onClick={() => setVisibleRecipes(visibleRecipes + 4)} />
      )}
      <button onClick={handleSaveDescription}>Save Descriptions</button>
    </div>
  );
}
