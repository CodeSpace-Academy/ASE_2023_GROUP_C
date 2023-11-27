import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter } from '@fortawesome/free-solid-svg-icons';
import RecipeList from '../../components/recipeList/recipeList';
import {
  getAllRecipes, getByAggregation, getCategories, getDocumentSize, getFavouriteRecipes,
} from '../../utils/mongodb-utils';
import user from '../../utils/dummyUser';
import pipelineForTags from '../../utils/filteringUtils';
import SortingForm from '../../components/ui-utils/sortingForm';
import FilteringModal from '../../components/ui-utils/overlay/filteringModal';

export async function getServerSideProps(context) {
  const page = context.query.page || 1;
  const filter = context.query.filter ? JSON.parse(context.query.filter) : {};
  // const sorting = context.query.sorting || 'default';

  const mongoFilterObject = {};

  if (filter.categories) {
    mongoFilterObject.category = { $in: [...filter.categories] };
  }
  if (filter.tags) {
    mongoFilterObject.tags = { $in: [...filter.tags] };
  }
  if (filter.numberOfSteps) {
    mongoFilterObject.instructions = { $size: parseInt(filter.numberOfSteps, 10) };
  }
  if (filter.filterByIngredients) {
    // The filterArray generate a list of object that searches in mongodb.
    const filterArray = [filter.filterByIngredients].slice(1).map((ingredient) => {
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

  const [filterOverlay, setFilterOverlay] = useState(false);

  function handleCloseFiltering() {
    setFilterOverlay(false);
  }

  const handleOpenFilterModal = () => {
    setFilterOverlay(true);
  };

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

  console.log(updatedRecipes);

  return (
    <div>
      <div>
        <button type="button" onClick={handleOpenFilterModal}>
          <FontAwesomeIcon icon={faFilter} size="lg" className="pr-2" />
          Filters
        </button>
        <SortingForm />
      </div>
      { filterOverlay
      && (
      <FilteringModal
        categoriesArr={categoriesArr}
        arrayOfUnigueTags={arrayOfUnigueTags}
        // eslint-disable-next-line react/jsx-no-bind
        handleCancelFiltering={handleCloseFiltering}
        isOpen={filterOverlay}
      />
      )}
      <RecipeList recipes={updatedRecipes} totalRecipeInDb={totalRecipeInDb} />
    </div>
  );
}
