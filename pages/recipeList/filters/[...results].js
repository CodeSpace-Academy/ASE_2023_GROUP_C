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

  if (results.length > 2 && numOfInstruction !== '') {
    // If numOfInstruction is provided, use the third parameter as category
    category = results[2];
  } 
  if (results[0] !== 'steps' && results[0] !== 'ingredients') {
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

  // Searching with ingredients the result mustbe ['ingredients', 'something', 'something']
  if (results[0] === 'ingredients') {
    const filterArray = results.slice(1).map((ingredient) => {
      const key = `ingredients.${ingredient}`;
      return { [key]: { $exists: true } };
    });

    if (filterArray.length > 0) {
      filterObject.$and = filterArray;
    }
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