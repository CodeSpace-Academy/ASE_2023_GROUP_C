import React, { useState } from 'react'
import styles from './recipecart.module.css'
import RecipeDescription from './update-recipe/descption';
import RecipeInstruction from './update-recipe/instructions';


export default function RecipeCard(prop) {
    const { recipe } = prop

    const [isEdited, setIsEdited] = useState(false);

    const handleDescriptionEdit = () => {
      setIsEdited(true);
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
    <div>
      {isEdited && <p>Recipe was edited</p>}
      <img
        src={recipe.images[0]}
        alt={recipe.title}
        className={styles.recipeImage}
      />
      <h2 className={styles.recipeTitle}>{recipe.title}</h2>
      <RecipeDescription recipe={recipe} onEdit={handleDescriptionEdit}/>
      <p>Prep Time: {convertToHours(recipe.prep)} </p>
      <p>Cook Time: {convertToHours(recipe.cook)} </p>
    {recipe.instructions && recipe.instructions.length > 0 && (
      <div className={styles.instructionsContainer}>
        <RecipeInstruction recipe={recipe} onEdit={handleDescriptionEdit}/>
      </div>
    )}</div>
  )
}
