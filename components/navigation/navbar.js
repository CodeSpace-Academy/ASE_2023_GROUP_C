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
  faBars,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SearchBar from "../layout/searchBar";

const NavBar = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isSearchOpen, setSearchOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
    setSearchOpen(false); // Close the search when opening sidebar
  };

  const toggleSearch = () => {
    setSearchOpen(!isSearchOpen);
  };

  const toggleFilter = () => {
    setFilterOpen(!isFilterOpen);
    setSearchOpen(false); // Close the search when opening filter
  };

  return (
    <div className=" w-full bg-gray-900 m-0 text-white ">
      
      <div className="flex justify-between items-center p-4">
        <button className="text-white p-2" onClick={toggleSidebar}>
          <FontAwesomeIcon icon={faBars} size="lg" />
          
        </button>

        {/* Navigation links in the navbar */}
        <div
          className={`flex space-x-4 ${
            isSidebarOpen ? "opacity-100" : "opacity-0"
          } transform ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          } transition-transform duration-300 ease-in-out`}
        >
          <Link href="/">
            <button>
              <FontAwesomeIcon icon={faHome} size="lg" /> Home
            </button>
          </Link>
          <Link href="/recipeList">
            <button>
              <FontAwesomeIcon icon={faBook} size="lg" /> Recipe List
            </button>
          </Link>
          <Link href="/favouriteRecipes">
            <button>
              <FontAwesomeIcon icon={faHeart} size="lg" /> Favorite Recipes
            </button>
          </Link>
          {/* Filter button */}
          <button className="text-white p-2" onClick={toggleFilter}>
            <FontAwesomeIcon icon={faFilter} size="lg" /> Filter
          </button>
          {/* Add more navigation links as needed */}
        </div>

        {/* Search button (visible when sidebar is open) */}
        {isSidebarOpen && (
          <div className="relative">
            <button className="text-white p-2" onClick={toggleSearch}>
              <FontAwesomeIcon icon={faSearch} size="lg" /> Search
            </button>
            
            {isSearchOpen && (
              <div className="absolute top-0 right-0 mt-10 mr-4">
                <SearchBar  className="bg-gray-800 text-white p-2 rounded"/>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Sidebar (hidden by default, displayed when the button is clicked) */}
      <div
        className={`w-64 h-full bg-gray-900 text-white p-4 transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out`}
      ></div>
    </div>
  );
};

export default NavBar;
