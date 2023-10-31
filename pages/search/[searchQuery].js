import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import RecipeList from "../../components/recipeList/recipeList";
import { getAllRecipes } from "../../utils/mongodb-utils";
import NoRecipeMessage from "../noRecipeMessage";


export default function SearchResultPage(props) {
  const router = useRouter()
  const searchResult = props.recipes
  const query = router.query.searchQuery

  if (searchResult.length === 0){
    return <NoRecipeMessage />
  }

  return (
    <div>
      <h1 className="text-center text-5xl font-bold text-white">SHOWING RESULTS FOR "{query}"</h1>
      <RecipeList recipes={searchResult} totalRecipeInDb={0} />
    </div>
  );
}

export async function getServerSideProps(context) {
  const searchQuery = context.params?.searchQuery
  //regular expression for search mongoDB 
  const regexPattern = new RegExp(`.*${searchQuery}.*`,"i")

  let recipes

  try {
     recipes = await getAllRecipes(
      'recipes',  // Collection name
      { _id: -1 }, // Sort by _id in descending order
      2, // Limit the number of results to 2
      {
          title: { $regex: regexPattern }, // Match recipes with titles that contain the search query
          
      }
  );
  if (!recipes) throw new Error('No recipe found!');
  } catch(error){
    console.log('Error getting all recipes')
  }

  return{
    props:{
      recipes:[
        ...recipes
    ]
  }
}
}


