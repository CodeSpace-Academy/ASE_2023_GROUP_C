import React, { useState } from "react";
import Link from "next/link";
import {
  faHome,
  faFilter,
  faBook,
  faHeart,
  faListCheck,
  faShoePrints,
  faTags,
 
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// NavBar component represents a vertical navigation bar on the left side of the screen.
// It provides links to different sections of the application.

const NavBar = () => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

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
      {/* A  button for a filtering*/}
      <div className="relative">
        <button
          onClick={toggleDropdown}
          className="text-white p-2 my-2 flex items-center"
        >
          <FontAwesomeIcon icon={faFilter} />
     
        </button>

        {isDropdownOpen && (
          <div
            className="absolute left-0 bg-gray-800 p-2 rounded-lg"
            style={{
              top: "100%", 
            }}
          >
            <p
              onClick={() => {

                toggleDropdown();
              }}
              className="text-white cursor-pointer hover:text-gray-300"
            >
          {/* A button for a filtering by tags*/}
           <FontAwesomeIcon icon={ faTags} />
            </p>
            <p
              onClick={() => {

                toggleDropdown();
              }}
              className="text-white cursor-pointer hover:text-gray-300"
            >
            {/* A button for a filtering by number of steps*/}
            <FontAwesomeIcon icon={ faShoePrints} />
            </p>
            <p
              onClick={() => {

                toggleDropdown();
              }}
              className="text-white cursor-pointer hover:text-gray-300"
            >
           {/* A button for a filtering by ingredients*/}
            <FontAwesomeIcon icon={ faListCheck} />
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default NavBar;
