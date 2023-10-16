import React from 'react'
import styles from './recipecart.module.css'
import RecipeDescription from '../recipe-description/recipe-description'


export default function RecipeCard(prop) {
    const { recipe } = prop
  return (
    <div>
      <img
        src={recipe.images[0]}
        alt={recipe.title}
        className={styles.recipeImage}
      />
      <h2 className={styles.recipeTitle}>{recipe.title}</h2>
      <RecipeDescription recipe={recipe} />
      <p>Prep Time: {recipe.prep} </p>
      <p>Cook Time: {recipe.cook} </p>
    {recipe.instructions && recipe.instructions.length > 0 && (
      <div className={styles.instructionsContainer}>
        <h3>Instructions</h3>
        <ol>
          {recipe.instructions.map((instruction, index) => (
            <li key={index}>{instruction}</li>
          ))}
        </ol>
      </div>
    )}</div>
  )
}
