import React from 'react'
import { connectToDb, getRecipeDetails,getAllergens } from '../../utils/mongodb-utils';
import TagsDisplay from '../../components/tags/tags-display';
import RecipeCard from '../../components/recipe-cart/recipecard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';

export async function getServerSideProps(context) {
  const recipeId = context.query.recipeDetails;

  let client;

  try {
    client = await connectToDb();
  } catch (error) {
    console.error("Database connection failed");
    return {
      notFound: true,
    };
  }
  let recipeDocuments;
  let allergens;

  try {
    recipeDocuments = await getRecipeDetails(client, "recipes", {
      _id: recipeId,
    });
    allergens = await getAllergens(client, "allergens");

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
      <div className='flex font-bold p-5 text-5xl bg-slate-900 text-white items-center'>
        <Link href='/recipe-list'>
         <FontAwesomeIcon icon={faChevronLeft} size='xl'/>
        </Link>
        
        <h1 className=' text-center font-bold p-5 text-5xl bg-slate-900 text-white'>RecipeDetails</h1>
        </div>
      
      <RecipeCard recipe={recipeDocuments} allergensList = {allergensList} />
    </div>
  );
}
