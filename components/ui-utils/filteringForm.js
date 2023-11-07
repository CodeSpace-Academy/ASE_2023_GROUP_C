import React from "react";

/**
 * Component for rendering sorting options for recipes.
 *
 * @param {Function} handleSort - A function to handle sorting based on user's selection.
 */
export default function SortingOption({ handleSort }) {

  const sortingOptions = [
    { value: "default", label: "Default" },
    { value: "ascending", label: "Prep Time (Ascending)" },
    { value: "descending", label: "Prep Time (Descending)" },
    { value: "ascendingCook", label: "Cook Time (Ascending)" },
    { value: "descendingCook", label: "Cook Time (Descending)" },
    { value: "byDateNewest", label: "Newest" },
    { value: "byDateOldest", label: "Oldest" },
  ];


  // Function to handle the default sorting option
  const handleDefaultSort = () => {
    // Call the handleSort function with "default" to apply default sorting criteria
    handleSort("default");
  };

  return (
    
      <select 
      placeholder="Sort"
      className=" bg-transparent focus:outline-none "
      onChange={(e) => handleSort(e.target.value)}>
        {sortingOptions.map((option) => (
          <option key={option.value} className="bg-gray-900" value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    
  );
}
