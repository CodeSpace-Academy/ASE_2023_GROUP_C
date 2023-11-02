import { Fragment } from "react";
import NoFavouritesYet from "../../components/favourite/noFavourites";
import RecipeList from "../../components/recipeList/recipeList";
import { getFavouriteRecipes } from "../../utils/mongodb-utils";

export async function getServerSideProps() {
  let favouriteRecipe;

  try {
    favouriteRecipe = await getFavouriteRecipes(
      'users-list',
      {'userName': 'The User 1'},
    )
    
    const userList = favouriteRecipe.userList

    return { props: { favouriteRecipes: userList} }

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
        {
          favouriteRecipes && favouriteRecipes.length === 0 &&
          <NoFavouritesYet />
        }
        {
          favouriteRecipes && favouriteRecipes.length > 0 &&
          <RecipeList recipes={favouriteRecipes} totalRecipeInDb={totalRecipeInDb} />  
        }
        
    </Fragment>  
    
  )
}