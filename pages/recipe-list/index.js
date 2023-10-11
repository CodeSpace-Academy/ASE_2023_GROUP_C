// pages/RecipeList.js

import { connectToDb, getAllRecipes } from "../../utils/mongodb-utils";

export async function getStaticProps() {
  let client = await connectToDb();

  const recipeDocuments = await getAllRecipes(
    client,
    'recipes',
    { _id: -1 },
    1
  );

  return {
    props: {
      recipes: recipeDocuments,
    },
  };
}

export default function RecipeList(props) {
  const { recipes } = props;
  if (!recipes) return <p>Loading...</p>;
  return (
    <div>
      <h1>Recipe List</h1>
      <ul>
        {recipes.map((recipe) => (
          <li key={recipe._id}>
            {recipe.images.length > 0 && (
              <img src={recipe.images[0]} alt={recipe.title} /> // Display the first image
            )}
            <h2>{recipe.title}</h2>
            <p>{recipe.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
