import React from 'react'
import styles from './recipecart.module.css'
import RecipeDescription from '../recipe-description/recipe-description'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHourglass, faMitten, faStopwatch, faUtensils } from '@fortawesome/free-solid-svg-icons';
import TagsDisplay from '../tags/tags-display';


export default function RecipeCard(prop) {
    const { recipe } = prop

    const convertToHours = (minutes) => {
      if (minutes >= 60) {
        const hours = Math.floor(minutes / 60);
        const remainingMinutes = minutes % 60;
        return `${hours} hours ${remainingMinutes} minutes`;
      }
      return `${minutes} minutes`;
    };

  return (
    <div className='p-4 flex flex-col bg-slate-900 text-red-100 '>
      <img
        src={recipe.images[0]}
        alt={recipe.title}
        className=" w-60 place-self-center rounded-lg"
      />
      <h2 
        className= 'text-3xl font-bold text-center p-5'
      >
        {recipe.title}
        </h2>

      <RecipeDescription recipe={recipe} />
      <div className='flex space-x-4'>
       <p><FontAwesomeIcon icon={faUtensils} size='xl'/> : {convertToHours(recipe.prep)} </p>
       <p><FontAwesomeIcon icon={faMitten} size='xl'/> : {convertToHours(recipe.cook)} </p>
      </div>
    {recipe.instructions && recipe.instructions.length > 0 && (
      <div className={styles.instructionsContainer}>
        <h3
        className="text-2xl font-semibold pb-2 pt-2 "
        >Instructions</h3>
        <ol >
          {recipe.instructions.map((instruction, index) => (
            <li key={index} className='pb-2'>{index + 1}. {instruction}</li>
          ))}
        </ol>
      </div>
    )}
    <TagsDisplay recipe={recipe} />
        </div>
  )
}
