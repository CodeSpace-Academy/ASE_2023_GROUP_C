import { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import RecipeList from '../../components/recipeList/recipeList';
import {
  getAllRecipes, getByAggregation, getCategories, getDocumentSize, getFavouriteRecipes,
} from '../../utils/mongodb-utils';
import Overlay from '../../components/ui-utils/overlay/overlay';
import user from '../../utils/dummyUser';
import { FilterContext } from '../../components/context/recipeContext';
import pipelineForTags from '../../utils/filteringUtils';

export async function getServerSideProps(context) {
  const page = context.query.page || 1;
  const filter = context.query.filter ? JSON.parse(context.query.filter) : {};
  // const sorting = context.query.sorting || 'default';

  const mongoFilterObject = {};

  if (filter.categories) {
    mongoFilterObject.category = { $in: [filter.categories] };
  }
  if (filter.tags) {
    mongoFilterObject.tags = { $in: [filter.tags] };
  }
  if (filter.numberOfSteps) {
    mongoFilterObject.instructions = { $size: parseInt(filter.numberOfSteps, 10) };
  }
  if (filter.filterByIngredients) {
    // The filterArray generate a list of object that searches in mongodb.
    const filterArray = filter.filterByIngredients.slice(1).map((ingredient) => {
      const key = `ingredients.${ingredient}`;
      return { [key]: { $exists: true } };
    });

    if (filterArray.length > 0) {
      mongoFilterObject.$and = filterArray;
    }
  }

  // Both all recipes and favourite recipe must be fetched to compare them and
  // decide which one to be returned.

  const recipeDocuments = await getAllRecipes(
    'recipes',
    { _id: -1 },
    page,
    mongoFilterObject,
  );
  const favouriteRecipes = await getFavouriteRecipes(
    'users-list',
    { userName: user },
  );

  const recipeCategories = await getCategories(
    'categories',
  );
  const uniqueTags = await getByAggregation(
    'recipes',
    pipelineForTags,
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

  // Define initial state for the filter object using useState.
  const [filter, setFilter] = useState({
    categories: '',
    tags: '',
    numberOfSteps: '',
    filterByIngredients: '',
  });
  const { filterOverlay, setFilterOverlay } = useContext(FilterContext);

  // Use the useRouter hook to access params and query
  const router = useRouter();

  // Access the filter and sorting query parameters
  const { filter: filterObject } = router.query;

  // Update the filter state when filterObject changes
  useEffect(() => {
    if (filterObject) {
      const parsedFilter = JSON.parse(filterObject);

      // Merge the existing state with the parsed filter object
      setFilter((prevFilter) => ({
        ...prevFilter,
        ...parsedFilter,
      }));
    }
  }, [filterObject]);

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
        filter={filter}
        setFilter={setFilter}
        categoriesArr={categoriesArr}
        arrayOfUnigueTags={arrayOfUnigueTags}
        // eslint-disable-next-line react/jsx-no-bind
        handleCancelFiltering={handleCancelFiltering}
      />
      )}
      <RecipeList recipes={updatedRecipes} totalRecipeInDb={totalRecipeInDb} />
    </div>
  );
}
