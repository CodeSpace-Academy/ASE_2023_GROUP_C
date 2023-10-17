import React from 'react'
import { connectToDb, getRecipeDetails, getAllergens  } from '../../utils/mongodb-utils';
import TagsDisplay from '../../components/tags/tags-display';
import RecipeCard from '../../components/recipe-cart/recipecard';
import RecipeDescription from '../../components/recipe-description/recipe-description';

export async function getServerSideProps(context) {
  const recipeId = context.query.recipeDetails;

  let client;

  try {
      client = await connectToDb()
  } catch(error) {
      console.error('Database connection failed')
      return {
        notFound: true, 
    }
  }
  let recipeDocuments;
  let allergens;

  try {
      recipeDocuments = await getRecipeDetails(
          client,
          'recipes',
          {_id: recipeId},
      );
      allergens = await getAllergens(
        client, 
        'allergens',
         { recipeId },
         );

      return { props: { recipeDocuments, allergens } }
  } catch (error) {
      console.error('Getting recipes failed')
      return {
        notFound: true, 
      }
  }
}

export default function RecipeDetails({recipeDocuments, allergens}) {

  return (
    <div><h1>RecipeDetails</h1>
      <RecipeCard recipe={recipeDocuments} />
      <TagsDisplay recipe={recipeDocuments} />
      <RecipeDescription allergens={allergens} />
    </div>
  )
}
