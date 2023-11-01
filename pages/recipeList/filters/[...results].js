import RecipeList from "../../../components/recipeList/recipeList";
import { getRecipes } from "../../../utils/mongodb-utils";

export async function getServerSideProps({ query }) {
  const { results = [] } = query;

  console.log('result: ',results)

  let numOfInstruction = '';
  let category = '';

  if (results.length > 1 && !isNaN(parseInt(results[1]))) {
    // Parse the number of instructions from the query parameter
    numOfInstruction = parseInt(results[1]);
  }

  if (numOfInstruction !== '') {
    // If numOfInstruction is provided, use the third parameter as category
    category = results[2];
  } else {
    // Otherwise, use the first parameter as category
    category = results[0];
  }

  const filterObject = {};

  if (numOfInstruction !== '') {
    // Apply a filter for recipes with a specific number of instructions
    filterObject.instructions = { $size: numOfInstruction };
  }
  if (category !== '') {
    // Apply a filter for recipes in a specific category
    filterObject.category = category;
  }
  console.log('filterObject: ',filterObject)

  try {
    const recipeDocuments = await getRecipes('recipes', { _id: -1 }, 1, filterObject);
    return { props: { recipeDocuments } };
  } catch (error) {
    console.error("Getting recipes failed");
    return {
      notFound: true,
    };
  }
}

export default function RecipeCards(props) {
  const { recipeDocuments } = props;

  return (
    <div>
      <RecipeList recipes={recipeDocuments} totalRecipeInDb={0} />
    </div>
  );
}