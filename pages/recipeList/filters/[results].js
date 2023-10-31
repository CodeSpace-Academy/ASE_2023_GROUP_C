import { getRecipes } from "../../../utils/mongodb-utils";
import RecipeList from "../../components/recipeList/recipeList";
import { getAllRecipes, getCategories, getDocumentSize } from "../../utils/mongodb-utils";

export async function getServerSideProps(context) {
  const pageNumber = context.query.results;

  const recipeDocuments = await getRecipes(
    "recipes",
    { _id: -1 },
    pageNumber
  );
  const totalRecipeInDb = await getDocumentSize("recipes");
  const recipeCategories = await getCategories(
    'categories',
  )
  const categoriesArr = recipeCategories[0].categories

  return {
    props: {
      recipes: recipeDocuments,
      totalRecipeInDb: totalRecipeInDb,
      categoriesArr: categoriesArr,
    },
  };
}

export default function RecipeCards(props) {
  const { recipes, totalRecipeInDb, categoriesArr } = props;

  return (
    <div>
      <RecipeList recipes={recipes} totalRecipeInDb={totalRecipeInDb} />
    </div>
  );
}