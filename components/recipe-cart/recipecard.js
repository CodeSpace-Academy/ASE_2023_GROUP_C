import React, { useState } from 'react'
import styles from './recipecart.module.css'
import RecipeInstruction from './update-recipe/instructions';
import RecipeDescription from './update-recipe/description';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHourglass, faMitten, faStopwatch, faUtensils } from '@fortawesome/free-solid-svg-icons';
import TagsDisplay from '../tags/tags-display';


export default function RecipeCard(prop) {
    const { recipe, allergensList } = prop

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
    <div className='p-4 flex flex-col bg-slate-900 text-red-100 justify-center'>
    <div className='p-4 flex flex-col bg-slate-900 text-red-100 '>
      <img
        src={recipe.images[0]}
        alt={recipe.title}
        className=" place-self-center rounded-lg"
      />
      
      <h2 className={styles.recipeTitle}>{recipe.title}</h2>
      <RecipeDescription 
        recipe={recipe} 
        onEdit={handleDescriptionEdit}
        allergensList={allergensList}
      />
      <p>Prep Time: {convertToHours(recipe.prep)} </p>
      <p>Cook Time: {convertToHours(recipe.cook)} </p>

      {recipe.ingredients && Object.keys(recipe.ingredients).length > 0 && (
        <div className={styles.ingredientsContainer}>
          <h3>Ingredients:</h3>
          <ul>
            {Object.keys(recipe.ingredients).map((ingredientKey, index) => (
              <li key={index}>{ingredientKey} : { 
             recipe.ingredients[ingredientKey]}</li>)
            )}
          </ul>
        </div>
      )}

      {recipe.instructions && recipe.instructions.length > 0 && (
        <div>
          <RecipeInstruction recipe={recipe} onEdit={handleDescriptionEdit}/>
        </div>
      )}
    </div>
      <h2 
        className= 'text-3xl font-bold text-center p-5'
      >
        {recipe.title}
        </h2>

      <RecipeDescription recipe={recipe} />
      <TagsDisplay recipe={recipe} />

      <div className='flex space-x-4 justify-center gap-8'>
       <p><FontAwesomeIcon icon={faUtensils} size='xl'/> Prep: {convertToHours(recipe.prep)} </p>
       <p><FontAwesomeIcon icon={faMitten} size='xl'/> Cook: {convertToHours(recipe.cook)} </p>
      </div>
      
    {recipe.instructions && recipe.instructions.length > 0 && (
      <div className=''>
  
        <h3
        className="text-2xl font-semibold pb-2 pt-2 "
        >
          Instructions
          </h3>
        <ol >
          {recipe.instructions.map((instruction, index) => (
            <li key={index} className='pb-2'>{index + 1}. {instruction}</li>
          ))}
        </ol>
      </div>
    )}
        </div>
        </div>
  )
}
