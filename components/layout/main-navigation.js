import Link from "next/link";
import { useState } from "react";
import classes from "./main-navigation.module.css";

const MainNavigation = ({ recipes, setRecipes }) => {
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

  const sortRecipesByDate = (recipes) => {
    return [...recipes].sort((a, b) => a.date - b.date);
  };

  const sortRecipesByDifficulty = (recipes) => {
    return [...recipes].sort(
      (a, b) => a.instructions.length - b.instructions.length
    );
  };

  return (
    <nav className={classes["main-nav"]}>
      <div className={classes["home-button"]}>
        <Link href="/">
          <h1>Recipe App</h1>
        </Link>
      </div>
      <form className={classes["search-form"]}>
        <input
          type="text"
          placeholder="Search for recipes"
          className={classes["search-input"]}
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
          <option value="newest">Newest</option>
          <option value="oldest">Oldest</option>
          <option value="difficulty">Difficulty</option>
        </select>
      </div>
      <ul className={classes["nav-links"]}>
        <li>
          <Link href="/recipe-list">Recipe List</Link>
        </li>
        <li>
          <Link href="/about">About</Link>
        </li>
        <li>
          <Link href="/contact">Contact</Link>
        </li>
      </ul>
    </nav>
  );
};

export default MainNavigation;
