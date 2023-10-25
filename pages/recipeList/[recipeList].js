import RecipeList from "../../components/recipeList/recipeList";
import {
  connectToDb,
  getAllRecipes,
  getDocumentSize,
} from "../../utils/mongodb-utils";

export async function getServerSideProps(context) {
  const pageNumber = context.query.recipeList;

  let client = await connectToDb();
  const recipeDocuments = await getAllRecipes(
    client,
    "recipes",
    { _id: -1 },
    pageNumber
  );
  const totalRecipeInDb = await getDocumentSize(client, "recipes");

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
      <RecipeList recipes={recipes} totalRecipeInDb={totalRecipeInDb} />
    </div>
  );
}
