import React, { useState, useEffect } from "react";
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
    <div className=" bg-gray-900 m-0 text-white flex items-center justify-between pr-4 pl-4 pb-6 pt-6 gap-3 drop-shadow-lg ">
       <h1 className=" text-2xl font-extrabold">
        Recipe app🍜
       </h1>
       <div className=" flex items-center gap-4"> 
       <Link href={'/'}><FontAwesomeIcon icon={faHome}/></Link  >
        <Link href={'/'}><FontAwesomeIcon icon={faHeart}/></Link >
        <Link href={'/'}><FontAwesomeIcon icon={faFilter}/></Link  >
       <SearchBar />
       </div>
       
    </div>
  );
};

export default NavBar;               
