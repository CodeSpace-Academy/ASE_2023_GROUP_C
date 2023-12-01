import React from "react";
import {
  faBook,
  faSun,
  faMoon,
  faFilter,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import NavLink from "../ui-utils/navLink";
import DropdownButton from "./dropdownButton";
import SortingForm from "../../components/ui-utils/sortingForm";

function NavLinks() {
  return (
    <div className='flex items-center'>
      <NavLink href='/recipes' className='mr-4'>
        <FontAwesomeIcon icon={faBook} size='lg' className='pr-2' />
        Recipes
      </NavLink>

      <NavLink href='/' className='mr-4'>
        <FontAwesomeIcon icon={faFilter} size='lg' className='pr-2' />
        Filter
      </NavLink>
      <SortingForm className='mr-5' />
      <DropdownButton />
    </div>
  );
}

export default NavLinks;
