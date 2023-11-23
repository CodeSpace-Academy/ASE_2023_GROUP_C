import React, { useState } from 'react';
import Link from 'next/link';
import {
  faUser,
  faHeart,
  faBook,
  faBars,
  faX,
  faSearch,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import NavLink from '../ui-utils/navLink';
import SearchBar from '../layout/searchBar';

function DropdownButton() {
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  // Toggling the dropdown visibility
  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  // Rendering the dropdown button and options
  return (
    <div className="relative inline-block">
      <div
        aria-label="User Menu"
        role="button"
        tabIndex={0}
        className="p-2 flex flex-wrap justify-center border-slate-400 border rounded-lg items-center md:justify-between cursor-pointer"
        onClick={toggleDropdown}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            toggleDropdown();
          }
        }}
      >
        <FontAwesomeIcon icon={faUser} size="lg" className="pr-2" />
        <FontAwesomeIcon icon={faBars} size="lg" className="pr-2" />
      </div>
      <div
        className={`absolute ${
          isDropdownOpen ? 'block' : 'hidden'
        } mt-2 bg-white border rounded-lg shadow-md`}
      >
        {/* Login option */}
        <Link href="/api/auth/login">
          <div className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-700">
            {' '}
            Login
          </div>
        </Link>
        {/* Sign Up option */}
        <Link href="https://recipe-users-accounts.us.auth0.com/u/signup?state=hKFo2SBhOXFRZ1BYWjZCLXhOQnhYcFJWS3k5NnNkanFVYUJXUqFur3VuaXZlcnNhbC1sb2dpbqN0aWTZIGhMLXNuVkx4TEFuUDBZbVZGcnpBNERpcFlhSE0waUY3o2NpZNkgRElIekRMZk9XUXdkcVFyakZFajRrOWJIVmlCb0RXeG4">
          <div className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-700">
            {' '}
            Sign Up
          </div>
        </Link>
      </div>
    </div>
  );
}

// Took a `query` prop thats is used in the href attribute of the first NavLink
function NavLinks() {
  return (
    <>
      {/* NavLink for navigating to the recipe list page with a specified query */}
      <NavLink href="/recipes">
        <FontAwesomeIcon icon={faBook} size="lg" className="pr-2" />
        Recipe
      </NavLink>

      {/* NavLink for navigating to the favorite recipes page */}
      <NavLink href="/favouriteRecipes">
        <FontAwesomeIcon icon={faHeart} size="lg" className="pr-2" />
        Favorites
      </NavLink>

      {/* DropdownButton for Login and Sign Up options */}
      <DropdownButton />
    </>
  );
}

// declared NavBar separately
export default function NavBar() {
  // State to manage search query, mobile menu visibility, and search bar visibility
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [isSearchBarVisible, setIsSearchBarVisible] = useState(false);

  // Toggling the mobile menu visibility
  const toggleNav = () => {
    setIsOpen(!isOpen);
  };

  // Toggling the search bar visibility
  const toggleSearchBar = () => {
    setIsSearchBarVisible(!isSearchBarVisible);
  };

  // Rendering the main navigation bar
  return (
    <>
      <header className="bg-gray-900 m-0 text-white flex items-center top-0 z-[20] sticky justify-between pr-4 pl-4 pb-6 pt-6 gap-3 drop-shadow-lg">
        <Link href="/" className="text-2xl font-extrabold">
          Recipe app🍜
        </Link>
        <div className="p-2 flex flex-wrap justify-center gap-1 border-slate-500 border rounded-lg items-center md:justify-between ">
          {/* Search icon with onClick to toggle search visibility */}
          <FontAwesomeIcon
            icon={faSearch}
            size="lg"
            className="pr-2 cursor-pointer"
            onClick={toggleSearchBar}
          />
          {/* Conditional rendering of the search bar based on isSearchBarVisible */}
          {isSearchBarVisible && <SearchBar setQuery={setQuery} />}
        </div>
        <nav>
          <div className="hidden md:flex items-center w-full gap-6">
            <NavLinks />
          </div>
          <div>
            <button type="button" className="md:hidden" onClick={toggleNav}>
              {isOpen ? (
                <FontAwesomeIcon icon={faX} />
              ) : (
                <FontAwesomeIcon icon={faBars} />
              )}
            </button>
          </div>
        </nav>
      </header>
      {/* Rendering mobile menu if isOpen is true */}
      {isOpen && (
        <div className="bg-gray-900 text-white flex basis-full flex-col pl-4">
          <NavLinks query={query} />
        </div>
      )}
    </>
  );
}
