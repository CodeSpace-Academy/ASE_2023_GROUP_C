// pages/RecipeList.js

import { connectToDb, getAllRecipes } from "../../utils/mongodb-utils";

export async function getStaticProps () {
  let client = await connectToDb()

          const recipeDocuments = await getAllRecipes(
              client,
              'recipes',
              {_id: -1},
              1,
          )

  return {
    props: {
      recipes: recipeDocuments
    }
  }

}


export default function RecipeList(props) {
  const { recipes } = props;

  return (
    <div>
      <h1>Recipe List</h1>
      <ul>
        {recipes.map((recipe) => (
          
          <li key={recipe._id}>
            {recipe.images.map((imageUrl, index) => (
            <img key={index} src={imageUrl} alt={recipe.title} />
          ))}
            <h2>{recipe.title}</h2>
            <p>{recipe.description}</p>
            
           
          </li>
        ))}
      </ul>
    </div>
  );
}

