import { useState, useEffect } from "react";
import { connectToDb, getAllRecipes } from "../../utils/mongodb-utils";
import MainNavigation from "../../components/layout/main-navigation";
import styles from "./recipe-list.module.css";

export async function getStaticProps() {
  let client = await connectToDb();
  const recipeDocuments = await getAllRecipes(
    client,
    "recipes",
    { _id: -1 },
    1
  );

  return {
    props: {
      recipes: recipeDocuments,
    },
  };
}


import RecipeList from "../../components/recipe-list";

export default function RecipeCards(props) {
  const { recipes } = props;

  return (
    <div className={styles.recipeListContainer}>
      <MainNavigation recipes={recipes} setRecipes={setRecipes} />
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
            <p className={styles.recipeDescription}>{recipe.description}</p>
          </li>
        ))}
      </ul>
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
