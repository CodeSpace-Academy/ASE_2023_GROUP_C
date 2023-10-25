import { Fragment } from 'react'
import FavouriteRecipes from '../components/favourite/favourite-recipes'
import { connectToDb, getFavouriteRecipes } from '../utils/mongodb-utils';

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
  let favouriteRecipe;

  try {
    favouriteRecipe = await getFavouriteRecipes(
      client,
      'users-list',
      {_id: -1},
  )

    return { props: { favouriteRecipe: favouriteRecipe} }

  } catch (error) {
    console.error("Getting recipes failed");
    return {
      notFound: true,
    };
  }
}



export default function Favorites() {
  return (
    <Fragment>
      <FavouriteRecipes />
    </Fragment>  
  )
}