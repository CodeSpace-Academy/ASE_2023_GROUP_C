/* eslint-disable react/jsx-no-bind */
import { useContext, useState } from 'react';
import RecipeList from '../../components/recipeList/recipeList';
import {
  getAllRecipesByFind, getByAggregation, getCategories, getDocumentSize, getFavouriteRecipes,
} from '../../utils/mongodb-utils';
import Overlay from '../../components/ui-utils/overlay/overlay';
import user from '../../utils/dummyUser';
import { FilterContext } from '../../components/context/recipeContext';

export async function getServerSideProps(context) {
  const pageNumber = context.query.recipeList;
  const sorting = context.query.sort || '';

  // Both all recipes and favourite recipe must be fetched to compare them and
  // decide which one to be returned.

  function sortingByFunction(sortingBy) {
    const sortingOptions = {
      default: { _id: 1 },
      'published(latest)': { published: 1 },
      'published(oldest)': { published: -1 },
      'prepTime(Ascending)': { prep: 1 },
      'prepTime(Descending)': { prep: -1 },
      'cookTime(Ascending)': { cook: 1 },
      'cookTime(Descending)': { cook: -1 },
      'numberOfSteps(Ascending)': { instructions: 1 },
      'numberOfSteps(Descending)': { instructions: -1 },
    };

    // Use the sortingBy value to get the corresponding sorting object
    return sortingOptions[sortingBy] || sortingOptions.default;
  }

  const recipeDocuments = await getAllRecipesByFind(
    'recipes',
    sortingByFunction(sorting),
    pageNumber,
  );
  const favouriteRecipes = await getFavouriteRecipes(
    'users-list',
    { userName: user },
  );

  const patternForTags = [
    {
      $project: {
        tags: true,
      },
    }, {
      $unwind: {
        path: '$tags',
        preserveNullAndEmptyArrays: false,
      },
    }, {
      $group: {
        _id: null,
        uniqueTags: {
          $addToSet: '$tags',
        },
      },
    },
  ];

  const recipeCategories = await getCategories(
    'categories',
  );
  const uniqueTags = await getByAggregation(
    'recipes',
    patternForTags,
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

  // eslint-disable-next-line no-unused-vars
  const [query, setQuery] = useState('');
  const { filterOverlay, setFilterOverlay } = useContext(FilterContext);

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
