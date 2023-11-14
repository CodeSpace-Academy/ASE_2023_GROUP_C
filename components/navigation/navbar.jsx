import React, { useState } from 'react';
import Link from 'next/link';
import {
  faUser,
  faHeart,
  faBook,
  faBars,
  faX,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import NavLink from '../ui-utils/navLink';
import SearchBar from '../layout/searchBar';

function DropdownButton() {
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="relative inline-block">
      <div
        className="p-2 flex flex-wrap justify-center gap-2 mb-3 ml-4 mr-4 border-slate-500 border rounded-lg items-center md:justify-between cursor-pointer"
        onClick={toggleDropdown}>
        <FontAwesomeIcon icon={faUser} size="lg" className="pr-2" />
        <FontAwesomeIcon icon={faBars} size="lg" className="pr-2" />
      </div>
      <div className={`absolute ${isDropdownOpen ? 'block' : 'hidden'} mt-2 bg-white border rounded-lg shadow-md`}>
        {/* Login options go here */}
        {/* Add more options as needed */}

      </div>
    </div>
  );
}

function NavLinks({ query }) {
  return (
    <>
      <NavLink href="/recipeList/1">
        <FontAwesomeIcon icon={faBook} size="lg" className="pr-2" />
        Recipe
      </NavLink>
      <NavLink href="/favouriteRecipes">
        <FontAwesomeIcon icon={faHeart} size="lg" className="pr-2" />
        Favorites
      </NavLink>
      <DropdownButton />
    </>
  );
}

export default function NavBar() {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const toggleNav = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <header className="bg-gray-900 m-0 text-white flex items-center top-0 z-[20] sticky justify-between pr-4 pl-4 pb-6 pt-6 gap-3 drop-shadow-lg">
        <Link href="/" className="text-2xl font-extrabold">
          Recipe app🍜
        </Link>
        <div className="p-2 flex flex-wrap justify-center gap-2 mb-3 ml-4 mr-4 border-slate-500 border rounded-lg items-center md:justify-between">
          {/* SearchBar */}
          <SearchBar setQuery={setQuery} />
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
      {isOpen && (
        <div className="bg-gray-900 text-white flex basis-full flex-col pl-4">
          <NavLinks query={query} />
        </div>
      )}
    </>
  );
}
