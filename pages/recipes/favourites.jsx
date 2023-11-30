import { useContext, useEffect, useState } from 'react';
import RecipeList from '../../components/recipeList/recipeList';
import SortingForm from '../../components/ui-utils/sortingForm';
import user from '../../utils/dummyUser';
import { sortingByFunction } from '../../utils/filteringUtils';
import { fetchRecipes, getDocumentSize } from '../../utils/mongodb-utils';
import { AppContext } from '../../components/context/recipeContext';

export async function getServerSideProps(context) {
  const page = parseInt(context.query.page, 10) || 1;
  const sortBy = context.query.sortBy || 'default';

  const recipeDocuments = await fetchRecipes(
    'users-list',
    sortingByFunction(sortBy),
    page,
    { userName: user },
  );
  const currentDocumentSize = await getDocumentSize('users-list', { userName: user });

  return {
    props: {
      favouriteRecipes: recipeDocuments[0].userList,
      page,
      currentDocumentSize,
    },
  };
}

export default function Favourite(props) {
  const {
    favouriteRecipes,
    page,
    currentDocumentSize,
  } = props;
  // State to hold the updated recipes
  const [updatedRecipes, setUpdatedRecipes] = useState(favouriteRecipes);

  const { removedFromFavourites } = useContext(AppContext);

  useEffect(() => {
    // Filter out the recipe with the specified _id
    const filteredRecipes = updatedRecipes.filter(
      (recipe) => { return recipe._id !== removedFromFavourites; },
    );

    // Set the updated recipes
    setUpdatedRecipes(filteredRecipes);
  }, [removedFromFavourites, updatedRecipes]);

  return (
    <div className="p-12">
      <SortingForm />
      <RecipeList
        recipes={updatedRecipes}
        pageNumber={page}
        currentDocumentSize={currentDocumentSize}
      />
    </div>
  );
}
