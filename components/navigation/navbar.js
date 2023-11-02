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
import Overlay from "../ui-utils/overlay/overlay";

const NavBar = ({ categoriesArr }) => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isSearchOpen, setSearchOpen] = useState(false);
  const [showFilterOverlay, setShowFilterOverlay] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
    setSearchOpen(false);
  };

  const toggleSearch = () => {
    setSearchOpen(!isSearchOpen);
  };

  const toggleFilter = () => {
    setSidebarOpen(false);
    setSearchOpen(false);
    setShowFilterOverlay(!showFilterOverlay);
  };

  const closeFilterOverlay = () => {
    setShowFilterOverlay(false);
  };

  return (
    <div className="w-full bg-gray-900 m-0 text-white">
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
          </div>
        )}
      </div>

      {showFilterOverlay && (
        <Overlay
          categoriesArr={categoriesArr}
          onClose={closeFilterOverlay}
        />
      )}
    </div>
  );
};

export default NavBar;
