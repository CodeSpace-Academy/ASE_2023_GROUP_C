/*eslint-disable*/

import { useState } from 'react';
import RecipeList from '../../components/recipeList/recipeList';
import {
  getAllRecipes, getByAggregation, getCategories, getDocumentSize, getFavouriteRecipes,
} from '../../utils/mongodb-utils';
import Overlay from '../../components/ui-utils/overlay/overlay';
import user from '../../utils/dummyUser';
import { aggregationPipelineForaTags } from '../../utils/dataFiltering';

export async function getServerSideProps(context) {
  const pageNumber = context.query.recipeList;

  // Both all recipes and favourite recipe must be fetched to compare them and
  // decide which one to be returned.

  const recipeDocuments = await getAllRecipes(
    'recipes',
    { _id: -1 },
    pageNumber,
  )
  const favouriteRecipes = await getFavouriteRecipes(
    'users-list',
    { userName: user },
  );

  const recipeCategories = await getCategories(
    'categories',
  );
  const uniqueTags = await getByAggregation(
    'recipes',
    aggregationPipelineForaTags,
  );
  const arrayOfUnigueTags = uniqueTags[0].uniqueTags;

  const categoriesArr = recipeCategories[0].categories;

  const totalRecipeInDb = await getDocumentSize('recipes');

  return {
    props: {
      recipes: recipeDocuments,
      totalRecipeInDb,
      favouriteRecipes: favouriteRecipes.userList,
      arrayOfUnigueTags,
      categoriesArr,

    },
  };
}

export default function RecipeListPage(props) {
  const {
    recipes,
    totalRecipeInDb,
    favouriteRecipes,
    arrayOfUnigueTags,
    categoriesArr,
  } = props;

  const [filterOverlay, setFilterOverlay] = useState(true);

  function handleCancelFiltering() {
    setFilterOverlay(false);
  }

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
      { filterOverlay
      && (
      <Overlay
        categoriesArr={categoriesArr}
        arrayOfUnigueTags={arrayOfUnigueTags}
        handleCancelFiltering={handleCancelFiltering}
      />
      )}
      <RecipeList recipes={updatedRecipes} totalRecipeInDb={totalRecipeInDb} />
    </div>
  );
}


// const { viewRecipes, setViewRecipes } = useContext(FilterContext);

// function handleCancelFiltering() {
//   setFilterOverlay(false);
// }

// // Create a set of favorite recipe IDs
// // eslint-disable-next-line no-underscore-dangle
// const favouriteRecipeIds = new Set(favouriteRecipes.map((recipe) => recipe._id));

// // Create a new array with favorite recipes replaced
// const updatedRecipes = recipes.map((recipe) => {
//   // eslint-disable-next-line no-underscore-dangle
//   if (favouriteRecipeIds.has(recipe._id)) {
//     // eslint-disable-next-line no-underscore-dangle
//     const favoriteRecipe = favouriteRecipes.find((favRecipe) => favRecipe._id === recipe._id);
//     setViewRecipes(favoriteRecipe); // Replace with favorite recipe
//   } else {
//     // Keep the original recipe
//     setViewRecipes(recipe);
//   }
//   return viewRecipes;
// });