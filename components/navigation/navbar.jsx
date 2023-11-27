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
    <div className="relative z-50">
      <div className="bg-gray-800 p-4 fixed w-full top-0">
        <div className="flex items-center justify-between">
          <HomeButton />
          <div className="flex items-center space-x-2 text-white p-2 flex flex-wrap justify-center gap-1 border-slate-500 border rounded-lg items-center md:justify-between">
            <SearchIcon onClick={toggleSearchBar} />
            {isSearchBarVisible && <SearchBar setQuery={setQuery} />}
          </div>
          <div className="hidden md:flex items-center space-x-2 text-white">
            <NavLinks />
          </div>
          <MobileMenuButton isOpen={isOpen} onClick={toggleNav} />
        </div>
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
