import React from "react";
import Link from "next/link";
import {
  faHome,
  faFilter,
  faBook,
  faHeart,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// NavBar component represents a vertical navigation bar on the left side of the screen.
// It provides links to different sections of the application.

const NavBar = () => {
  return (
    // The root container of the NavBar. Fixed position on the left side of the screen.
    <div className="fixed left-0 top-0 h-screen bg-gray-900 text-white p-4 flex flex-col items-center">
      {/* Link to the Home page */}
      <Link href="/">
        <button className="text-white p-2 my-2">
          <FontAwesomeIcon icon={faHome} />
        </button>
      </Link>

      {/* Link to the Recipe List page */}
      <Link href="/recipeList">
        <button className="text-white p-2 my-2">
          <FontAwesomeIcon icon={faBook} />
        </button>
      </Link>

      {/* Link to the Favorite Recipes page */}
      <Link href="/favouriteRecipes">
        <button className="text-white p-2 my-2">
          <FontAwesomeIcon icon={faHeart} />
        </button>
      </Link>

      {/* A button for a filter or any other action */}
      <button className="text-white p-2 my-2">
        <FontAwesomeIcon icon={faFilter} />
      </button>
    </div>
  );
};

export default NavBar;
