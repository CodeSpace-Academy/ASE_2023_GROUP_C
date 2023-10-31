import RecipeList from "../../components/recipeList/recipeList";
import { getAllRecipes, getDocumentSize } from "../../utils/mongodb-utils";
import NavBar from "../../components/navigation/navbar";

export async function getServerSideProps(context) {
  const pageNumber = context.query.recipeList;

  const recipeDocuments = await getAllRecipes(
    "recipes",
    { _id: -1 },
    pageNumber
  );
  const totalRecipeInDb = await getDocumentSize("recipes");

  return {
    props: {
      recipes: recipeDocuments,
      totalRecipeInDb: totalRecipeInDb,
    },
  };
}

export default function RecipeCards(props) {
  const { recipes, totalRecipeInDb } = props;

  return (
    <div>
      <NavBar />
      <RecipeList recipes={recipes} totalRecipeInDb={totalRecipeInDb} />
    </div>
  );
}
