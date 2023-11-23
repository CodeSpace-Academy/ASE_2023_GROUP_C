import { getAllRecipesByFind } from '../../utils/mongodb-utils';
import RecipeList from '../recipeList/recipeList';

export default function SortingPage({ recipes, pageNumber }) {
  return (
    <div>
      <RecipeList recipes={recipes} pageNumber={pageNumber} />
    </div>
  );
}
function sortingByFunction(sortingBy) {
  const sortingOptions = {
    default: { _id: 1 },
    'published(latest)': { published: 1 },
    'published(oldest)': { published: -1 },
    'prepTime(Ascending)': { prep: 1 },
    'prepTime(Descending)': { prep: -1 },
    'cookTime(Ascending)': { cook: 1 },
    'cookTime(Descending)': { cook: -1 },
    'numberOfSteps(Ascending)': { instructions: 1 },
    'numberOfSteps(Descending)': { instructions: -1 },
  };

  // Use the sortingBy value to get the corresponding sorting object
  return sortingOptions[sortingBy]; // Default to {_id: 1} if sortingBy is not matched
}

export async function getServerSideProps({ params, query }) {
  const pageNumber = params.pageNumber || 1;
  const sortingBy = query.sort || 'default'; // Default sorting option

  const sort = sortingByFunction(sortingBy);

  // Fetch recipes based on sorting option and page number
  const recipes = await getAllRecipesByFind('recipes', sort, pageNumber);

  return {
    props: {
      recipes,
      pageNumber: parseInt(pageNumber, 10),
    },
  };
}
