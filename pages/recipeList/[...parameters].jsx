import { useRouter } from 'next/router';
import { fetchRecipes } from '../../utils/mongodb-utils';
import RecipeList from '../../components/recipeList/recipeList';

export async function getServerSideProps(context) {
  const {
    params: { parameters },
  } = context;
  const page = parameters[0].replace('page=', '');
  const recipes = await fetchRecipes('recipes', { _id: -1 }, page);

  return {
    props: { recipes },
  };
}

export default function RecipeListPage(props) {
  const { recipes } = props;
  const router = useRouter();
  const pageNumber = router.query.parameters[0].replace('page=', '') * 1;

  return (
    <RecipeList recipes={recipes} pageNumber={pageNumber} />
  );
}
