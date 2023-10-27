import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import RecipeList from "../../components/recipeList/recipeList";

export default function SearchResultPage(props) {
  // Get the router instance from Next.js
  const router = useRouter();

  // Extract the searchQuery from the router's query parameters
  const searchQuery = router.query.searchQuery;

  // Initialize the searchResult state with an empty string
  const [searchResult, setSearchResult] = useState("");

  // Use the useEffect hook to fetch search results when the searchQuery changes
  useEffect(() => {
    // Fetch search results from the server's API
    fetch(`/api/search/${searchQuery}`)
      .then((res) => res.json())
      .then((data) => setSearchResult(data.message));
  }, [searchQuery]);

  // If searchResult is not available yet, display a loading message
  if (!searchResult) return <h1>Loading...</h1>;

  // Render the RecipeList component with the search results
  return (
    <div>
      <RecipeList recipes={searchResult} totalRecipeInDb={0} />
    </div>
  );
}
