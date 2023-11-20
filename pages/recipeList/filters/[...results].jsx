/* eslint-disable no-console */
/* eslint-disable prefer-destructuring */
import RecipeList from '../../../components/recipeList/recipeList';
import { getRecipes } from '../../../utils/mongodb-utils';

export async function getServerSideProps({ query }) {
  const { results = [] } = query;

  console.log('result: ', results);

  let numOfInstruction = '';
  let category = '';

  if (results.length > 1 && !Number.isNaN(parseInt(results[1], 10))) {
    // Parse the number of instructions from the query parameter
    numOfInstruction = parseInt(results[1], 10);
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

  // Searching with ingredients.
  if (results[0] === 'ingredients') {
    // The filterArray generate a list of object that searches in mongodb.
    const filterArray = results.slice(1).map((ingredient) => {
      const key = `ingredients.${ingredient}`;
      return { [key]: { $exists: true } };
    });

    if (filterArray.length > 0) {
      filterObject.$and = filterArray;
    }
  }

  console.log('filterObject: ', filterObject);

  try {
    const recipeDocuments = await getRecipes(
      'recipes',
      { _id: -1 },
      1,
      filterObject,
    );
    if (recipeDocuments.length === 0) {
      return {
        props: {
          recipeDocuments,
          filterObject,
        },
      };
    }

    return { props: { recipeDocuments } };
  } catch (error) {
    console.error('Getting recipes failed');
    return {
      notFound: true,
    };
  }
}

export default function RecipeCards(props) {
  const { recipeDocuments, filterObject = {} } = props;
  if (Object.keys(filterObject).length !== 0) {
    return (
      <div className="text-white">
        <h1>The recipe with the specified filters is not found</h1>
      </div>
    );
  }

  return (
    <div>
      <RecipeList recipes={recipeDocuments} totalRecipeInDb={0} />
    </div>
  );
}
