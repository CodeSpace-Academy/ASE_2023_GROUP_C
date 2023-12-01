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
import { pipelineForTags, sortingByFunction } from '../../utils/filteringUtils';
import FilteringModal from '../../components/ui-utils/overlay/filteringModal';

export async function getServerSideProps(context) {
  const page = parseInt(context.query.page, 10) || 1;
  const filter = context.query.filter ? JSON.parse(context.query.filter) : {};
  const sortBy = context.query.sortBy || 'default';
  const { search } = context.query;

  const mongoFilterObject = {};

  if (search) {
    mongoFilterObject.title = { $regex: JSON.parse(search), $options: 'i' };
  } else {
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

      const ingredient = filter.filterByIngredients;
      const key = `ingredients.${ingredient}`;

      mongoFilterObject.$and = [{ [key]: { $exists: true } }];
    }
  }

  // Both all recipes and favourite recipe must be fetched to compare them and
  // decide which one to be returned.

  const recipeDocuments = await fetchRecipes(
    'recipes',
    sortingByFunction(sortBy),
    page,
    mongoFilterObject,
  );
  const currentDocumentSize = await getDocumentSize(
    'recipes',
    mongoFilterObject,
  );
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

  const handleOpenFilterModal = () => {
    setFilterOverlay(true);
  };

  // Create a set of favorite recipe IDs

  const favouriteRecipeIds = new Set(
    favouriteRecipes.map((recipe) => { return recipe._id; }),
  );

  // Create a new array with favorite recipes replaced
  const updatedRecipes = recipes.map((recipe) => {
    if (favouriteRecipeIds.has(recipe._id)) {
      const favoriteRecipe = favouriteRecipes.find(
        (favRecipe) => { return favRecipe._id === recipe._id; },
      );
      return favoriteRecipe; // Replace with favorite recipe
    }
    return recipe; // Keep the original recipe
  });

  return (
    <div className="p-12">
      {/* Add margin-top to create spacing */}
      <div className="mt-12">
        <button
          type="button"
          onClick={handleOpenFilterModal}
          className="bg-blue-500 text-white py-2 px-4 rounded"
        >
          <FontAwesomeIcon icon={faFilter} size="lg - 5" className="pr-2" />
          Filters
        </button>
      </div>
      {filterOverlay && (
        <FilteringModal
          categoriesArr={categoriesArr}
          arrayOfUnigueTags={arrayOfUnigueTags}
          handleCancelFiltering={() => { return setFilterOverlay(false); }}
          isOpen={filterOverlay}
        />
      )}
      {updatedRecipes ? (
        <RecipeList
          recipes={updatedRecipes}
          totalRecipeInDb={totalRecipeInDb}
          pageNumber={page}
          currentDocumentSize={currentDocumentSize}
        />
      ) : <p>No Recipes Found that match the query!!</p>}
    </div>
  );
}
