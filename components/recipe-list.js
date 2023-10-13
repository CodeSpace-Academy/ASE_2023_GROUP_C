// import styles from './recipe-list.module.css'

// export default function RecipeList(props) {
    
//     const { recipes } = props;
  
//     return (
//       <div className={styles.recipeListContainer}>
        
//         <h1 className={styles.recipeListTitle}>Recipe List</h1>
//         <ul className={styles.recipeGrid}>
//           {recipes.slice(0, visibleRecipes).map((recipe) => (
//             <li key={recipe._id} className={styles.recipeItem}>
//               <img
//                 src={recipe.images[0]}
//                 alt={recipe.title}
//                 className={styles.recipeImage}
//               />
  
//               <h2 className={styles.recipeTitle}>{recipe.title}</h2>
//               <p className={styles.recipeDescription}>{recipe.description}</p>
//             </li>
//           ))}
//         </ul>
//         {remainingRecipes > 0 && (
//           <div className={styles.loadMoreButton}>
//             <button onClick={loadMore} className={styles.button}>
//               Load More Recipes ({remainingRecipes} left)
//             </button>
//           </div>
//         )}
//       </div>
//     );
//   }
  
import { useState, useEffect } from "react";
// import MainNavigation from "../../components/layout/main-navigation";
import styles from "./recipe-list.module.css";


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
      {/* <MainNavigation recipes={recipes} setRecipes={setRecipes} /> */}
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
  