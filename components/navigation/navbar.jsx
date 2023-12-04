import React, { useState } from 'react';
import SearchIcon from './searchButton';
import SearchBar from '../layout/searchBar';
import NavLinks from './navlinks';
import MobileMenuButton from './mobileMenuButton';
import HomeButton from './homeButton';

/**
 * Responsive navigation bar component.
 * The NavBar component includes a home button, search functionality with a search bar,
 * navigation links, and a mobile menu for smaller screens.
 *
 */

function NavBar() {
  // State hooks for managing component state
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [isSearchBarVisible, setIsSearchBarVisible] = useState(false);

  /**
   * Toggles the mobile navigation menu.
   * @function
   */
  const toggleNav = () => {
    setIsOpen(!isOpen);
  };

  /**
   * Toggles the visibility of the search bar.
   * @function
   */
  const toggleSearchBar = () => {
    setIsSearchBarVisible(!isSearchBarVisible);
  };

  return (
    <div className="relative z-50">
      <div className="bg-gray-800 p-4 fixed w-full top-0">
        <div className="flex items-center justify-between">
          {/* Home button */}
          <HomeButton />
          {/* Search icon and search bar */}
          <div className="items-center space-x-2 text-white p-2 flex flex-wrap justify-center gap-1 border-slate-500 border rounded-lg md:justify-between">
            {
              isSearchBarVisible
              && <SearchBar setQuery={setQuery} />
            }
            <SearchIcon onClick={toggleSearchBar} />
          </div>
          {/* Navigation links for larger screens */}
          <div className="hidden md:flex items-center space-x-2 text-white">
            <NavLinks />
          </div>
          {/* Mobile menu button */}
          <MobileMenuButton isOpen={isOpen} onClick={toggleNav} />
        </div>
        {/* Mobile menu */}
        {isOpen && (
          <div className="bg-gray-900 text-white p-2 mt-2 md:hidden">
            <NavLinks query={query} />
          </div>
        )}
      </div>
    </div>
  );
}

export default NavBar;
