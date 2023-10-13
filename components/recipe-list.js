import { useState, useEffect } from "react";
import styles from "./recipe-list.module.css";
import TagsDisplay from "./tags/tags-display";
import Instructions from "./instructions/instructions";

export default function RecipeList(props) {
  // Destructure the 'initialRecipes' prop from 'props'
  const { recipes: initialRecipes } = props;

  // Define state variables using the 'useState' hook
  const [recipes, setRecipes] = useState(initialRecipes); // Store the recipes
  const [visibleRecipes, setVisibleRecipes] = useState(4); // Number of recipes initially visible
  const [remainingRecipes, setRemainingRecipes] = useState(
    initialRecipes ? initialRecipes.length - visibleRecipes : 0
  ); // Calculate remaining recipes not shown

  // Use the 'useEffect' hook to update 'recipes' when 'initialRecipes' changes
  useEffect(() => {
    setRecipes(initialRecipes);
  }, [initialRecipes]);

  // If 'recipes' is still loading, display a loading message
  if (!recipes) return <p>Loading...</p>;

  // Function to slice the description of a recipe if it's too long
  const sliceDescription = (recipe) => {
    const words = recipe.description.split(' ');

    if (words.length <= 30) {
      return recipe.description;
    } else {
      const slicedDescription = words.slice(0, 30).join(' ');
      return `${slicedDescription}...`;
    }
  };

  // Function to load more recipes when the button is clicked
  const loadMore = () => {
    const additionalRecipes = 4;
    const newVisibleRecipes = visibleRecipes + additionalRecipes;
    const newRemainingRecipes = recipes.length - newVisibleRecipes;

    // Update the state variables
    setVisibleRecipes(newVisibleRecipes);
    setRemainingRecipes(newRemainingRecipes);
  };

  return (
    <div className={styles.recipeListContainer}>
      <h1 className={styles.recipeListTitle}>Recipe List</h1>
      <ul className={styles.recipeGrid}>
        {recipes.slice(0, visibleRecipes).map((recipe) => (
          <li key={recipe._id} className={styles.recipeItem}>
            {/* Display recipe image */}
            <img
              src={recipe.images[0]}
              alt={recipe.title}
              className={styles.recipeImage}
            />
            {/* Display recipe title */}
            <h2 className={styles.recipeTitle}>{recipe.title}</h2>
            {/* Display a sliced description of the recipe */}
            <p className={styles.recipeDescription}>
              {sliceDescription(recipe)}
            </p>
            {/* Display tags for the recipe */}
            <TagsDisplay recipe={recipe} />
          </li>
        ))}
      </ul>
      {/* Display a "Load More" button if there are remaining recipes */
      remainingRecipes > 0 && (
        <div className={styles.loadMoreButton}>
          {/* Button to load more recipes when clicked */}
          <button onClick={loadMore} className={styles.button}>
            Load More Recipes ({remainingRecipes} left)
          </button>
        </div>
      )}
    </div>
  );
}
