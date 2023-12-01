'client side';

import React from 'react';
import {
  faBook,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import NavLink from '../ui-utils/navLink';
import DropdownButton from './dropdownButton';
import SortingForm from '../ui-utils/sortingForm';
import ThemeChange from './themeChange';

function NavLinks() {
  return (
    <div className="flex items-center">
      <NavLink href="/recipes" className="mr-4">
        <FontAwesomeIcon icon={faBook} size="lg" className="pr-2" />
        Recipes
      </NavLink>

      <ThemeChange />

      <NavLink href="/recipes/favourites">
        <FontAwesomeIcon icon={faHeart} size="lg" className="pr-2" />
        Favorites
      </NavLink>

      <DropdownButton />
    </div>
  );
}

export default NavLinks;
