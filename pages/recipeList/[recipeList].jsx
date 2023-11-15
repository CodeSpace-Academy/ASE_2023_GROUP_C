/* eslint-disable no-unused-vars */
import { useState } from 'react';
import RecipeList from '../../components/recipeList/recipeList';
import { getAllRecipes, getDocumentSize, getFavouriteRecipes } from '../../utils/mongodb-utils';

export async function getServerSideProps(context) {
  const pageNumber = context.query.recipeList;

  // Both all recipes and favourite recipe must be fetched to compare them and
  // decide which one to be returned.

  const recipeDocuments = await getAllRecipes(
    'recipes',
    { _id: -1 },
    pageNumber,
  );
  const favouriteRecipes = await getFavouriteRecipes(
    'users-list',
    { userName: user },
  );

  const totalRecipeInDb = await getDocumentSize('recipes');

  return {
    props: {
      recipes: recipeDocuments,
      totalRecipeInDb,
      favouriteRecipes: favouriteRecipes.userList,
    },
  };
}

export default function RecipeCards(props) {
  const { recipes, totalRecipeInDb, favouriteRecipes } = props;

  const [query, setQuery] = useState('');

  // Create a set of favorite recipe IDs
  // eslint-disable-next-line no-underscore-dangle
  const favouriteRecipeIds = new Set(favouriteRecipes.map((recipe) => recipe._id));

  // Create a new array with favorite recipes replaced
  const updatedRecipes = recipes.map((recipe) => {
    // eslint-disable-next-line no-underscore-dangle
    if (favouriteRecipeIds.has(recipe._id)) {
      // eslint-disable-next-line no-underscore-dangle
      const favoriteRecipe = favouriteRecipes.find((favRecipe) => favRecipe._id === recipe._id);
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
