import React, { useState } from 'react';
import Link from 'next/link';
import {
  faHome,
  faFilter,
  faHeart,
  faBars,
  faX,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import NavLink from '../ui-utils/navLink';

function NavLinks() {
  return (
    <>
      <NavLink href="/">
        <FontAwesomeIcon icon={faHome} size="lg" className=" pr-2" />
        Home
      </NavLink>
      <NavLink href="/favouriteRecipes">
        <FontAwesomeIcon icon={faHeart} size="lg" className=" pr-2" />
        Favorites
      </NavLink>
      <NavLink href="/recipeList/filters">
        <FontAwesomeIcon icon={faFilter} size="lg" className=" pr-2" />
        Filters
      </NavLink>
    </>
  );
}

export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleNav = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <header className=" bg-gray-900 m-0 text-white flex items-center top-0 z-[20] sticky justify-between pr-4 pl-4 pb-6 pt-6 gap-3 drop-shadow-lg ">
        <Link href="/" className=" text-2xl font-extrabold">
          Recipe app🍜
        </Link>

        <nav>
          <div className="hidden md:flex items-center w-full gap-6">
            <NavLinks />
          </div>
          <div>
            <button type="button" className=" md:hidden " onClick={toggleNav}>
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
        <div className=" bg-gray-900  text-white flex basis-full flex-col pl-4">
          <NavLinks />
        </div>
      )}
    </>
  );
}
