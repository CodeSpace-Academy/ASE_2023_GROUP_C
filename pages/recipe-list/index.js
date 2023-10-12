
import { useState } from 'react';
import { connectToDb, getAllRecipes } from '../../utils/mongodb-utils';
import MainNavigation from '../../components/layout/main-navigation';
import styles from './recipe-list.module.css';
import TagsDisplay from '../../components/tags/tags-display';
import Instructions from '../../components/instructions/instructions';


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
  const { recipes: initialRecipes } = props; // Rename the prop to avoid conflicts
  const [recipes, setRecipes] = useState(initialRecipes);
  const [visibleRecipes, setVisibleRecipes] = useState(4);
  const [remainingRecipes, setRemainingRecipes] = useState(
    initialRecipes ? initialRecipes.length - visibleRecipes : 0
  );

  useEffect(() => {
    setRecipes(initialRecipes); // Initialize recipes with the prop data
  }, [initialRecipes]);

  if (!recipes) return <p>Loading...</p>;

  const loadMore = () => {
    const additionalRecipes = 4;https://github.com/CodeSpace-Academy/ASE_2023_GROUP_C/pull/73/conflict?name=pages%252Frecipe-list%252Findex.js&ancestor_oid=29fa2ca5d83cc183506328075874f663cc9a1faa&base_oid=c5d3ae38c1345b53b9b47e4204961d3ae764d8f8&head_oid=e3c47b6ad6e479e81f6417bacf6e069e44f54b3c
    const newVisibleRecipes = visibleRecipes + additionalRecipes;
    const newRemainingRecipes = recipes.length - newVisibleRecipes;

    setVisibleRecipes(newVisibleRecipes);
    setRemainingRecipes(newRemainingRecipes);
  };

  return (
    <div className={styles.recipeListContainer}>
      <MainNavigation recipes={recipes} setRecipes={setRecipes} />
      <h1 className={styles.recipeListTitle}>Recipe List</h1>
      <ul className={styles.recipeGrid}>
        {recipes
          .slice(0, visibleRecipes)
          .map((recipe) => (
            <li key={recipe._id} className={styles.recipeItem}>
              <img
                src={recipe.images[0]}
                alt={recipe.title}
                className={styles.recipeImage}
              />
              <h2 className={styles.recipeTitle}>{recipe.title}</h2>
              <p className={styles.recipeDescription}>{recipe.description}</p>
              <TagsDisplay recipe = {recipe}/>
              <Instructions recipe = {recipe} />
            </li>
          ))}
      </ul>
      {remainingRecipes > 0 && (
        <div className={styles.loadMoreButton}>
          <button onClick={loadMore} className={styles.button}>
            Load More Recipes ({remainingRecipes} left)
          </button>
        </div>
      )}
    </div>
  );
}
