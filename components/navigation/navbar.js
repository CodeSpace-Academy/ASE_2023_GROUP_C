import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  faHome,
  faFilter,
  faBook,
  faHeart,
  faBars,
  faSearch,
  faX,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SearchBar from "../layout/searchBar";
import NavLink from "../ui-utils/navLink";

const NavLinks = () => {

  return(
    <>
    <NavLink href={'/'}><FontAwesomeIcon icon={faHome} size="lg" className=" pr-2"/> Home</NavLink  >
        <NavLink href={'/search/all'}>
        <FontAwesomeIcon icon={faSearch} size="lg" className=" pr-2" /> Search
        </NavLink>
        <NavLink href={'/favouriteRecipes'}><FontAwesomeIcon icon={faHeart} size="lg" className=" pr-2"/>Favorites</NavLink >
        <NavLink href={'/recipeList/filters'}><FontAwesomeIcon icon={faFilter} size="lg" className=" pr-2"/>Filters</NavLink  >
        </>
  )
}

const NavBar = () => {

  const [isOpen, setIsOpen] = useState(false)
  const [isFilterOpen, setFilterOpen] = useState(false);
  const [filtersApplied, setFiltersApplied] = useState(false);
  const [showFilterMessage, setShowFilterMessage] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
    setSearchOpen(false); // Close the search when opening sidebar
  };

  const toggleSearch = () => {
    setSearchOpen(!isSearchOpen);
  };
  const toggleNav = () => {
    setIsOpen(!isOpen);
  };

  const toggleFilter = () => {
    setFilterOpen(!isFilterOpen);
    setSearchOpen(false); // Close the search when opening filter
    setFiltersApplied(!isFilterOpen); // Update the filtersApplied state

    // Show the message when filters are applied and hide it after 3 seconds
    setShowFilterMessage(true);
    setTimeout(() => {
      setShowFilterMessage(false);                         
    }, 3000);
  };

  useEffect(() => {
    if (filtersApplied) {
      // After 3 seconds, hide the filter message
      const timeout = setTimeout(() => {
        setShowFilterMessage(false);
      }, 3000);
      return () => clearTimeout(timeout);
    }
  }, [filtersApplied]);

  return (
    <>
    <header className=" bg-gray-900 m-0 text-white flex items-center top-0 z-[20] sticky justify-between pr-4 pl-4 pb-6 pt-6 gap-3 drop-shadow-lg ">
       <Link href={'/'}  className=" text-2xl font-extrabold">
        Recipe app🍜
       </Link >

       <nav> 
        <div className="hidden md:flex items-center w-full gap-6">
          <NavLinks />
        </div>
        <div>
        <button className=" md:hidden " onClick={toggleNav}>
            { isOpen? <FontAwesomeIcon icon={faX}/> : <FontAwesomeIcon icon={faBars}/> }
          </button>
        </div>
       </nav>
    </header>
    { isOpen && (
       <div className=" bg-gray-900  text-white flex basis-full flex-col pl-4">
              <NavLinks />
        </div>)}
    </>
  );
};

export default NavBar;               
