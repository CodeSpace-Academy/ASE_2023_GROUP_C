import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter } from '@fortawesome/free-solid-svg-icons';
import RecipeList from '../../components/recipeList/recipeList';
import {
  fetchRecipes,
  getByAggregation,
  getCategories,
  getDocumentSize,
  getFavouriteRecipes,
} from '../../utils/mongodb-utils';
import user from '../../utils/dummyUser';
import pipelineForTags from '../../utils/filteringUtils';
import SortingForm from '../../components/ui-utils/sortingForm';
import FilteringModal from '../../components/ui-utils/overlay/filteringModal';

export async function getServerSideProps(context) {
  const page = parseInt(context.query.page, 10) || 1;
  const filter = context.query.filter ? JSON.parse(context.query.filter) : {};
  const sortBy = context.query.sortBy || 'default';

  const mongoFilterObject = {};

  if (filter.categories) {
    mongoFilterObject.category = { $in: [...filter.categories] };
  }
  if (filter.tags) {
    mongoFilterObject.tags = { $in: [...filter.tags] };
  }
  if (filter.numberOfSteps) {
    mongoFilterObject.instructions = {
      $size: parseInt(filter.numberOfSteps, 10),
    };
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

  function sortingByFunction(sortingBy) {
    const sortingOptions = {
      default: { _id: -1 },
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

  const recipeDocuments = await fetchRecipes(
    'recipes',
    sortingByFunction(sortBy),
    page,
    mongoFilterObject
  );
  const currentDocumentSize = await getDocumentSize('recipes', mongoFilterObject)
  const favouriteRecipes = await getFavouriteRecipes('users-list', {
    userName: user,
  });

  const recipeCategories = await getCategories('categories');
  const uniqueTags = await getByAggregation('recipes', pipelineForTags);
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
      page,
      currentDocumentSize,
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
    page,
    currentDocumentSize,
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
  const favouriteRecipeIds = new Set(
    favouriteRecipes.map((recipe) => recipe._id)
  );

  // Create a new array with favorite recipes replaced
  const updatedRecipes = recipes.map((recipe) => {
    // eslint-disable-next-line no-underscore-dangle
    if (favouriteRecipeIds.has(recipe._id)) {
      // eslint-disable-next-line no-underscore-dangle
      const favoriteRecipe = favouriteRecipes.find(
        (favRecipe) => favRecipe._id === recipe._id,
      );
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
      <RecipeList
        recipes={updatedRecipes}
        totalRecipeInDb={totalRecipeInDb}
        pageNumber={page}
        query={query}
        currentDocumentSize={currentDocumentSize}

      />
    </div>
  );
}
