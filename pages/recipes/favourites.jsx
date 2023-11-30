import RecipeList from '../../components/recipeList/recipeList';
import SortingForm from '../../components/ui-utils/sortingForm';
import user from '../../utils/dummyUser';
import { sortingByFunction } from '../../utils/filteringUtils';
import { fetchRecipes, getDocumentSize } from '../../utils/mongodb-utils';

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

  return (
    <div className="p-12">
      <SortingForm />
      <RecipeList
        recipes={favouriteRecipes}
        pageNumber={page}
        currentDocumentSize={currentDocumentSize}
      />
    </div>
  );
}
