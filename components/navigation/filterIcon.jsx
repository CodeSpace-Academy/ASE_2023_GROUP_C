// FilterIcon.jsx
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter } from "@fortawesome/free-solid-svg-icons";

function FilterIcon({ onClick }) {
  return (
    <button type='button' onClick={onClick}>
      <FontAwesomeIcon icon={faFilter} size='lg' className='pr-2' />
      Filters
    </button>
  );
}

export default FilterIcon;
