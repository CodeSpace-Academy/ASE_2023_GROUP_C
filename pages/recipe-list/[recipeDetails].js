import React from 'react'
import { connectToDb, getRecipeDetails } from '../../utils/mongodb-utils';
import TagsDisplay from '../../components/tags/tags-display';
import RecipeCard from '../../components/recipe-cart/recipecard';

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
  let recipeDocuments

  try {
      recipeDocuments = await getRecipeDetails(
          client,
          'recipes',
          {_id: recipeId},
      )
      return { props: { recipeDocuments } }
  } catch (error) {
      console.error('Getting recipes failed')
      return {
        notFound: true, 
      }
  }
}

export default function RecipeDetails({recipeDocuments}) {

  return (
    <div>
      <h1 className=' text-center font-bold p-5 text-5xl bg-slate-900 '>RecipeDetails</h1>
      <RecipeCard recipe={recipeDocuments} />
    </div>
  )
}
