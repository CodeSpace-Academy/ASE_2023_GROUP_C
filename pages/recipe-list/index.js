// pages/RecipeList.js

// import Image from "next/image";
import { connectToDb, getAllRecipes } from "../../utils/mongodb-utils";
import MainNavigation from "../../components/layout/main-navigation"; // Import your navigation component


export async function getStaticProps() {
  let client = await connectToDb();
  const recipeDocuments = await getAllRecipes(
    client,
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

export default function RecipeList(props) {
  const { recipes } = props;

  if (!recipes) return <p>Loading...</p>;

  return (
    <div>
      <MainNavigation /> {/* Include the navigation bar here */}
      <h1>Recipe List</h1>
      <ul className="flex grid center px-4 py-3">
        {recipes.map((recipe) => (
          <li key={recipe._id}>
            <h2>{recipe.title}</h2>
            <img
              className='w-40 h-40'
              src={recipe.images[0]}
              alt={recipe.title}
            />
            <p>{recipe.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
