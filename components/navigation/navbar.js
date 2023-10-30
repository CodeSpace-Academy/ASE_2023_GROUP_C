import React, { useState } from "react";
import Link from "next/link";
import {
  faHome,
  faFilter,
  faBook,
  faHeart,
  faArrowUp19,
  faArrowDown91,
  faList,
  faListCheck,
  faShoePrints,
  faTags,
 
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const NavBar = () => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="fixed left-0 top-0 h-screen bg-gray-900 text-white p-4 flex flex-col items-center">
      <Link href="/">
        <button className="text-white p-2 my-2">
          <FontAwesomeIcon icon={faHome} />
          {/* <span className="ml-2">Home</span> */}
        </button>
       
      </Link>

      <Link href="/recipeList">
        <button className="text-white p-2 my-2">
          <FontAwesomeIcon icon={faBook} />
          {/* <span className="ml-2">Recipes</span> */}
        </button>
      </Link>

      <Link href="/favouriteRecipes">
        <button className="text-white p-2 my-2">
          <FontAwesomeIcon icon={faHeart} />
          {/* <span className="ml-2">Favourites</span> */}
        </button>
      </Link>

      <div className="relative">
        <button
          onClick={toggleDropdown}
          className="text-white p-2 my-2 flex items-center"
        >
          <FontAwesomeIcon icon={faFilter} />
           {/* <span className="ml-2">Filter</span> */}
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
           <FontAwesomeIcon icon={ faTags} />
            </p>
            <p
              onClick={() => {

                toggleDropdown();
              }}
              className="text-white cursor-pointer hover:text-gray-300"
            >
            <FontAwesomeIcon icon={ faShoePrints} />
            </p>
            <p
              onClick={() => {

                toggleDropdown();
              }}
              className="text-white cursor-pointer hover:text-gray-300"
            >
            <FontAwesomeIcon icon={ faListCheck} />
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default NavBar;
