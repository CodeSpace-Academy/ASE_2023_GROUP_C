/* eslint-disable no-console */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/jsx-one-expression-per-line */
import { useRouter } from 'next/router';
import RecipeList from '../../components/recipeList/recipeList';
import { getAllRecipes } from '../../utils/mongodb-utils';
import NoRecipeMessage from '../noRecipeMessage';

export default function SearchResultPage(props) {
  const router = useRouter();
  // Store the search result recipes received as a prop
  const { searchResult } = props;
  // Extract the search query from the router's query parameters
  const query = router.query.searchQuery;
  const count = searchResult.length; // Calculate the number of matching recipes

  // If there are no matching recipes, display a message
  if (count === 0) {
    return <NoRecipeMessage />;
  }

  // If there are matching recipes, display them along with the search query and count
  return (
    <div>
      <h1 className="text-center text-5xl font-bold text-white">
        SHOWING RESULTS FOR "{query}" ({count} recipes found)
      </h1>
      <RecipeList
        recipes={searchResult}
        totalRecipeInDb={0}
        searchQuery={query}
      />
    </div>
  );
}

// This function runs on the server side and fetches matching recipes from a MongoDB database.
export async function getServerSideProps(context) {
  // Extract the search query from the URL parameters
  const searchQuery = context.params?.searchQuery;

  // Create a regular expression pattern for searching MongoDB, case-insensitive
  const regexPattern = new RegExp(`.*${searchQuery}.*`, 'i');

  let recipes;

  try {
    // Call a function to get matching recipes from the MongoDB database
    recipes = await getAllRecipes(
      'recipes', // Collection name
      { _id: -1 }, // Sort by _id in descending order
      2, // Limit the number of results to 2
      {
        title: { $regex: regexPattern }, // Match recipes with titles that contain the search query
      },
    );

    // If no recipes are found, throw an error
    if (!recipes) throw new Error('No recipe found!');
  } catch (error) {
    console.log('Error getting all recipes');
  }

  // Return the matching recipes as props to the SearchResultPage component
  return {
    props: {
      recipes: [...recipes],
    },
  };
}
