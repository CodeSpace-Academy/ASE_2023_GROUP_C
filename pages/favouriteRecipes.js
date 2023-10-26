import { Fragment } from 'react'
import FavouriteRecipes from '../components/favourite/favouriteRecipes'
import { connectToDb, getFavouriteRecipes } from '../utils/mongodb-utils';
import RecipeList from '../components/recipeList/recipeList';

export async function getServerSideProps(context) {

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
      {'userName': 'The User 1'},
    )
    
    const userList = favouriteRecipe.userList

    return { props: { favouriteRecipes: [userList]} }

  } catch (error) {
    console.error("Getting recipes failed");
    return {
      notFound: true,
    };
  }
}

export default function Favorites({favouriteRecipes}) {
  console.log(favouriteRecipes)
  const totalRecipeInDb = 0
  return (
    <Fragment>
      {/* <FavouriteRecipes /> */}
      <RecipeList recipes={favouriteRecipes} totalRecipeInDb={totalRecipeInDb} />
    </Fragment>  
  )
}