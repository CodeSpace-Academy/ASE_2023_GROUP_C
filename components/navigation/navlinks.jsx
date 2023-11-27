import React from 'react';
import { faBook, faHeart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import NavLink from '../ui-utils/navLink';
import DropdownButton from './dropdownButton';

function NavLinks() {
  return (
    <>
      <NavLink href="/recipes">
        <FontAwesomeIcon icon={faBook} size="lg" className="pr-2" />
        Recipes
      </NavLink>

      <NavLink href="/favouriteRecipes">
        <FontAwesomeIcon icon={faHeart} size="lg" className="pr-2" />
        Favorites
      </NavLink>

      <DropdownButton />
    </>
  );
}

export default NavLinks;
