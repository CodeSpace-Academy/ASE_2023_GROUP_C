import React from 'react'
import { getRecipeDetails,getAllergens } from '../../utils/mongodb-utils';
import RecipeCard from '../../components/recipeCard/recipeCard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';

export async function getServerSideProps(context) {
  const recipeId = context.query.recipeDetails;

  let recipeDocuments;
  let allergens;

  try {
    recipeDocuments = await getRecipeDetails("recipes", {
      _id: recipeId,
    });
    allergens = await getAllergens("allergens");

    const allergensList = allergens[0].allergens

    return { props: { recipeDocuments, allergensList } };
  } catch (error) {
    console.error("Getting recipes failed");
    return {
      notFound: true,
    };
  }
}

export default function RecipeDetails({ recipeDocuments, allergensList}) {

  return (
    <div>
      <div className='flex font-bold p-5  bg-slate-900 text-white items-center'>
        <Link href='/recipeList/recipeList'>
         <FontAwesomeIcon icon={faChevronLeft} size='xl' />
        </Link>
        
        <h1 className=' text-center font-bold p-5 text-xl bg-slate-900 text-white'>RecipeDetails</h1>
        </div>
      
      <RecipeCard recipe={recipeDocuments} allergensList = {allergensList} />
    </div>
  );
}
