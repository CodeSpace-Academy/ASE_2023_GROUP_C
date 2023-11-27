import React from 'react';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function SearchIcon({ onClick }) {
  return (
    <FontAwesomeIcon
      icon={faSearch}
      size="lg"
      className="pr-2 cursor-pointer"
      onClick={onClick}
    />
  );
}

export default SearchIcon;
