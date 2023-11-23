import { useRouter } from 'next/router';
import { fetchRecipes } from '../../utils/mongodb-utils';
import RecipeList from '../../components/recipeList/recipeList';
import PaginationControls from '../../components/ui-utils/PaginationControls';

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
  const convertToHours = (minutes) => {
    if (minutes >= 60) {
      const hours = Math.floor(minutes / 60);
      const remainingMinutes = minutes % 60;
      return `${hours} hours ${remainingMinutes} mins`;
    }
    return `${minutes} mins`;
  };

  return (
    <>
      <PaginationControls pageNumber={pageNumber} />
      <RecipeList recipes={recipes} convertToHours={convertToHours} />
    </>
  );
}
