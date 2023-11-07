import RecipeList from "../../components/recipeList/recipeList";
import { getAllRecipes, getDocumentSize } from "../../utils/mongodb-utils";
import NavBar from "../../components/navigation/navbar";
import { useState } from "react";
import SearchSort from "../../components/ui-utils/searchSort";

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
  const [recipesData, setRecipesData] = useState(recipes)
  const [query, setQuery] = useState('');

  return (
    <div>
      <NavBar />
      <SearchSort 
        setQuery= {setQuery}
      />
      <RecipeList recipes={recipesData} totalRecipeInDb={totalRecipeInDb} />
    </div>
  );
}
