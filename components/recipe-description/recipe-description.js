import React from "react";
import styles from "./recipe-description.module.css";

function RecipeDescription(prop) {
  const { recipe } = prop;
  return (
    <div>
      <h3>Description</h3>
      <p className={styles.description}>{recipe.description}</p>
    </div>
  );
}

export default RecipeDescription;
