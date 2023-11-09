import RecipeList from "../../components/recipeList/recipeList";
import { getAllRecipes, getDocumentSize, getFavouriteRecipes } from "../../utils/mongodb-utils";

import { useState } from "react";
import SearchSort from "../../components/ui-utils/searchSort";


export async function getServerSideProps(context) {
  const pageNumber = context.query.recipeList;

  // Both all recipes and favourite recipe must be fetched to compare them and
  // decide which one to be returned.
  
  const recipeDocuments = await getAllRecipes(
    "recipes",
    { _id: -1 },
    pageNumber
  );
  const favouriteRecipes = await getFavouriteRecipes(
    'users-list',
    {'userName': 'The User 1'},
  )

  const totalRecipeInDb = await getDocumentSize("recipes");

  return {
    props: {
      recipes: recipeDocuments,
      totalRecipeInDb: totalRecipeInDb,
      favouriteRecipes: favouriteRecipes.userList
    },
  };
}

export default function RecipeCards(props) {

  const { recipes, totalRecipeInDb, favouriteRecipes } = props;
  const [recipesData, setRecipesData] = useState(recipes)
  const [query, setQuery] = useState('');

  // Create a set of favorite recipe IDs
  const favouriteRecipeIds = new Set(favouriteRecipes.map(recipe => recipe._id));

  // Create a new array with favorite recipes replaced
  const updatedRecipes = recipes.map(recipe => {
    if (favouriteRecipeIds.has(recipe._id)) {
      const favoriteRecipe = favouriteRecipes.find(favRecipe => favRecipe._id === recipe._id);
      return favoriteRecipe; // Replace with favorite recipe
    }
    return recipe; // Keep the original recipe
  });


  return (
    <div>

      <RecipeList recipes={updatedRecipes} totalRecipeInDb={totalRecipeInDb} />
    </div>
  );
}