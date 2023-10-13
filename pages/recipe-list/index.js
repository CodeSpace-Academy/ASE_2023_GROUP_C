
import { connectToDb, getAllRecipes } from "../../utils/mongodb-utils";



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
    const additionalRecipes = 4;
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
        {recipes.slice(0, visibleRecipes).map((recipe) => (
          <li key={recipe._id} className={styles.recipeItem}>
            <img
              src={recipe.images[0]}
              alt={recipe.title}
              className={styles.recipeImage}
            />

            <h2 className={styles.recipeTitle}>{recipe.title}</h2>
            <p className={styles.recipeDescription}>{recipe.description}</p>
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

function RecipeItem({ recipe, saveDescription }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedDescription, setEditedDescription] = useState(recipe.description);
  

  const handleSave = () => {
    // Call the saveDescription function to update the description
    saveDescription(recipe._id, editedDescription);
    
    // Exit edit mode
    setIsEditing(false);
  }

  return (
    <li className={styles.recipeItem}>
      <h2 className={styles.recipeTitle}>{recipe.title}</h2>
      {isEditing ? (
        <div>
          <input
            type="text"
            value={editedDescription}
            onChange={(e) => setEditedDescription(e.target.value)}
          />
          <button onClick={handleSave}>Save</button>
        </div>
      ) : (
        <>
          <p className={styles.recipeDescription}>{recipe.description}</p>
          <button onClick={() => setIsEditing(true)}>Edit</button>
        </>
      )}
    </li>
  );
}
