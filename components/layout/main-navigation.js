import Link from "next/link";
import { useState } from "react";
import classes from "./main-navigation.module.css";

const MainNavigation = ({ recipes, setRecipes }) => {
  // State for the search input
  const [searchInput, setSearchInput] = useState("");

  // Function to handle sorting change based on user selection
  const handleSortingChange = (e) => {
    const selectedOption = e.target.value;
    let sortedRecipes = [...recipes];

    switch (selectedOption) {
      case "newest":
        sortedRecipes = sortRecipesByDate(recipes);
        break;
      case "oldest":
        sortedRecipes = sortRecipesByDate(recipes).reverse();
        break;
      case "difficulty":
        sortedRecipes = sortRecipesByDifficulty(recipes);
        break;
      default:
        // Default to the original recipe order
        break;
    }

    setRecipes(sortedRecipes);
  };

  // Function to handle search input change
  const handleSearchChange = (e) => {
    const userInput = e.target.value;
    setSearchInput(userInput);

    // Filter recipes based on the user's input
    const filteredRecipes = recipes.filter((recipe) =>
      recipe.title.toLowerCase().includes(userInput.toLowerCase())
    );

    setRecipes(filteredRecipes);
  };

  // Function to sort recipes by date
  const sortRecipesByDate = (recipes) => {
    return [...recipes].sort((a, b) => a.date - b.date);
  };

  // Function to sort recipes by difficulty
  const sortRecipesByDifficulty = (recipes) => {
    return [...recipes].sort(
      (a, b) => a.instructions.length - b.instructions.length
    );
  };

  return (
    <nav className={classes["main-nav"]}>
      <div className={classes["home-button"]}>
        {/* Navigate to the home page */}
        <Link href="/">
          <h1>Recipe App</h1>
        </Link>
      </div>
      <form className={classes["search-form"]}>
        <input
          type="text"
          placeholder="Search for recipes"
          className={classes["search-input"]}
          value={searchInput}
          onChange={handleSearchChange} 
        />
        <button type="submit" className={classes["search-button"]}>
          Search
        </button>
      </form>
      <div className={classes["sorting-options"]}>
        <label htmlFor="sorting">Sort By:</label>
        <select
          id="sorting"
          className={classes["sorting-select"]}
          onChange={handleSortingChange}
        >
          <option value="resent">Recent</option>
          <option value="old">Old</option>
          <option value="easy">Easy</option>
          <option value="hard">Hard</option>
        </select>
      </div>
      <ul className={classes["nav-links"]}>
        <li>
          {/* Navigate to the recipe list page */}
          <Link href="/recipe-list">Recipe List</Link>
        </li>
      </ul>
    </nav>
  );
};

export default MainNavigation;
