'client side';

import React from 'react';
import {
  faBook,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import NavLink from '../ui-utils/navLink';
import DropdownButton from './dropdownButton';
import SortingForm from '../ui-utils/sortingForm';

function NavLinks() {
  return (
    <>
      <NavLink href="/recipes">
        <FontAwesomeIcon icon={faBook} size="lg" className="pr-2" />
        Recipes
      </NavLink>
      <SortingForm />
      <DropdownButton />
    </>
  );
}

export default NavLinks;
