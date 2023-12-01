// This component represents the navigation links displayed in the header of the application.

// Import necessary libraries and components from third-party packages.
import React from 'react';
import { faBook } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// Import custom components and utilities from the project.
import NavLink from '../ui-utils/navLink';
import DropdownButton from './dropdownButton';
import SortingForm from '../ui-utils/sortingForm';
import ThemeChange from './themeChange';

// Define the functional component responsible for rendering the navigation links.
function NavLinks() {
  // Render a set of navigation links including an icon and a text label for each.
  return (
    <div className="flex items-center">
      {/* Link to the "Recipes" page with a book icon */}
      <NavLink href="/recipes" className="mr-5">
        <FontAwesomeIcon icon={faBook} size="lg" className="pr-2" />
        Recipes
      </NavLink>

      {/* Component for changing the theme of the application */}
      <ThemeChange />

      {/* Component for sorting and filtering the displayed content */}
      <SortingForm />

      {/* Component representing a dropdown button */}
      <DropdownButton />
    </div>
  );
}

// Export the NavLinks component as the default export for use in other parts of the application.
export default NavLinks;
