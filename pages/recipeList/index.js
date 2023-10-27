import {getAllRecipes } from "../../utils/mongodb-utils";

export async function getStaticProps() {
  const recipeDocuments = await getAllRecipes(
    "recipes",
    { _id: -1 },
    1
  );

  return {
    props: {
      recipes: recipeDocuments,
    },
  };
}

import RecipeList from "../../components/recipeList/recipeList";

export default function RecipeCards(props) {
  const { recipes } = props;

  return (
    <div>
      <RecipeList recipes={recipes} />
    </div>
  );
}
