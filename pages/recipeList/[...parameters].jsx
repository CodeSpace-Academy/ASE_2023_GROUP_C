import { useRouter } from 'next/router';
import Link from 'next/link';
import { fetchRecipes } from '../../utils/mongodb-utils';
import RecipeList from '../../components/recipeList/recipeList';
import { useEffect } from 'react';

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
  
  console.log(recipes.map((recipe) => recipe.title));
  return (
    <>
      <Link
        href={`/recipeList/page=${pageNumber + 1}`}
        className=" bg-cyan-400 m-5"
        as={`/recipeList/page=${pageNumber + 1}`}
        aria-label="pagination"
      >
        Next page
      </Link>
      <Link
        href={`/recipeList/page=${pageNumber - 1}`}
        className=" bg-cyan-400 m-5"
        as={`/recipeList/page=${pageNumber - 1}`}
        aria-label="pagination"
      >
        Previous page
      </Link>

      <RecipeList recipes={recipes} />
    </>
  );
}
