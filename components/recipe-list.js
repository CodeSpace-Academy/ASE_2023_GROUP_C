import { useState, useEffect } from "react";
import styles from "./recipe-list.module.css";
import TagsDisplay from "./tags/tags-display";
import Instructions from "./instructions/instructions";

export default function RecipeList(props) {
  // Destructure the 'initialRecipes' prop from the 'props' object
  const { recipes: initialRecipes } = props;

  // Initialize the 'recipes' state using 'initialRecipes' from the prop
  const [recipes, setRecipes] = useState(initialRecipes);

  // Initialize 'visibleRecipes' state to limit the number of visible recipes
  const [visibleRecipes, setVisibleRecipes] = useState(4);

  // Calculate the number of remaining recipes to load
  const [remainingRecipes, setRemainingRecipes] = useState(
    initialRecipes ? initialRecipes.length - visibleRecipes : 0
  );

  // useEffect to update 'recipes' when 'initialRecipes' prop changes
  useEffect(() => {
    setRecipes(initialRecipes);
  }, [initialRecipes]);

  // If 'recipes' is not available, display a loading message
  if (!recipes) return <p>Loading...</p>;

  // Function to load more recipes when the "Load More" button is clicked
  const loadMore = () => {
    const additionalRecipes = 4;
    const newVisibleRecipes = visibleRecipes + additionalRecipes;
    const newRemainingRecipes = recipes.length - newVisibleRecipes;

    // Update the 'visibleRecipes' and 'remainingRecipes' states
    setVisibleRecipes(newVisibleRecipes);
    setRemainingRecipes(newRemainingRecipes);
  };

  return (
    <div className={styles.recipeListContainer}>
      <h1 className={styles.recipeListTitle}>Recipe List</h1>

      {/* Render a list of recipes with limited visibility */}
      <ul className={styles.recipeGrid}>
        {recipes.slice(0, visibleRecipes).map((recipe) => (
          <li key={recipe._id} className={styles.recipeItem}>
            <img
              src={recipe.images[0]}
              alt={recipe.title}
              className={styles.recipeImage}
            />
            <h2 className={styles.recipeTitle}>{recipe.title}</h2>
            <p className={styles.recipeDescription}>{recipe.description}</p>

            {/* Render tags for the recipe using 'TagsDisplay' component */}
            <TagsDisplay recipe={recipe} />

            {/* Render recipe instructions using 'Instructions' component */}
            <Instructions recipe={recipe} />
          </li>
        ))}
      </ul>

      {/* Display the "Load More" button if there are remaining recipes */}
      {remainingRecipes > 0 && (
        <div className={styles.loadMoreButton}>
          <button onClick={loadMore} className={styles.button}>
            Load More Recipes ({remainingRecipes} left)
          </button>
        </div>
      )}
    </div>
  );
}
