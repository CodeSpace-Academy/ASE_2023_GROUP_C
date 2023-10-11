import Link from "next/link";
import classes from "./main-navigation.module.css";

const MainNavigation = () => {
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
        <select id="sorting" className={classes["sorting-select"]}>
          <option value="newest">Newest</option>
          <option value="oldest">Oldest</option>
          <option value="popular">Popular</option>
          <option value="rating">Rating</option>
          
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
