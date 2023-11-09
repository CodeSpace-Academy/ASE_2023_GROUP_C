import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  faHeart,
  faBars,
  faX,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SearchBar from "../layout/searchBar";
import NavLink from "../ui-utils/navLink";

const NavLinks = (props) => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  return (
    <>
      <NavLink href={"/favouriteRecipes"}>
        <FontAwesomeIcon icon={faHeart} size="lg" className="pr-2" />
        Favorites
      </NavLink>
      <div className="relative p-2 flex flex-wrap justify-center gap-2  mb-3 ml-4 mr-4 border-slate-500 border rounded-lg items-center md:justify-between">
        <div
          onClick={toggleDropdown}
          className="cursor-pointer flex items-center"
        >
          <FontAwesomeIcon icon={faBars} size="lg" className="pr-2" />
          <FontAwesomeIcon icon={faUser} size="lg" className="pr-2" />
        </div>

        {isDropdownOpen && (
          <div className="absolute right-0 mt-2 bg-white text-gray-800 rounded-md shadow-lg">
            <NavLink href={"/login"} className="block px-4 py-2">
              Login
            </NavLink>
            <NavLink href={"/signup"} className="block px-4 py-2">
              Sign-Up
            </NavLink>
          </div>
        )}
      </div>
    </>
  );
};

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleNav = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <header className="bg-gray-900 m-0 text-white flex items-center top-0 z-[20] sticky justify-between pr-4 pl-4 pb-6 pt-6 gap-3 drop-shadow-lg">
        <Link href={"/"} className="text-2xl font-extrabold">
          Recipe app🍜
        </Link>

        <SearchBar setQuery={(query) => console.log(query)} />

        <nav>
          <div className="hidden md:flex items-center w-full gap-6">
            <NavLinks />
          </div>
          <div>
            <button className="md:hidden" onClick={toggleNav}>
              {isOpen ? (
                <FontAwesomeIcon icon={faX} />
              ) : (
                <FontAwesomeIcon icon={faBars} />
              )}
            </button>
          </div>
        </nav>
      </header>

      {isOpen && (
        <div className="bg-gray-900 text-white flex basis-full flex-col pl-4">
          <NavLinks />
        </div>
      )}
    </>
  );
};

export default NavBar;