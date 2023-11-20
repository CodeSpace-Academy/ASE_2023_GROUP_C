import React, { useState } from 'react';
import SearchIcon from './searchButton';
import SearchBar from '../layout/searchBar';
import NavLinks from './navlinks';
import MobileMenuButton from './mobileMenuButton';
import HomeButton from './homeButton';

function NavBar() {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [isSearchBarVisible, setIsSearchBarVisible] = useState(false);

  const toggleNav = () => {
    setIsOpen(!isOpen);
  };

  const toggleSearchBar = () => {
    setIsSearchBarVisible(!isSearchBarVisible);
  };

  return (
    <div className="bg-gray-800 p-6 fixed w-full top-0 z-50">
      <div className="flex items-center justify-between">
        <HomeButton />
        {/* Set text color to white */}
        <div className="flex items-center space-x-4 text-white p-2 flex flex-wrap justify-center gap-1 border-slate-500 border rounded-lg items-center md:justify-between">
          <SearchIcon onClick={toggleSearchBar} />
          {isSearchBarVisible && <SearchBar setQuery={setQuery} />}
        </div>
        {/* Set text color to white */}
        <div className="hidden md:flex items-center space-x-4 text-white">
          <NavLinks />
        </div>

        <MobileMenuButton isOpen={isOpen} onClick={toggleNav} />
      </div>

      {isOpen && (
        <div className="bg-gray-900 text-white p-4 mt-4 md:hidden">
          <NavLinks query={query} />
        </div>
      )}
    </div>
  );
}

export default NavBar;
