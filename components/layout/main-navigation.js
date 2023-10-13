import Link from "next/link";
import classes from "./main-navigation.module.css";

const MainNavigation = ({ onSearch }) => {
  return (
    <nav className={classes["main-nav"]}>
      <div className={classes["home-button"]}>
        {/* Navigate to the home page */}
        <Link href="/">
          <h1>Recipe App</h1>
        </Link>
      </div>
      <form className={classes["search-form"]}>
        {/*Please make Use the SearchBar component here */}
      </form>

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
