import React from "react";

/**
 * Component for resetting the filtering to the default state.
 *
 * @param {Function} onReset - A function to reset the filtering to the default state.
 */
const FilterReset = ({ onReset }) => {
  return <button onClick={onReset}>Reset Filters</button>;
};

export default FilterReset;
