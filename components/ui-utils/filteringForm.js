import FilterByIngredients from "../filtering/filterByIngredients";

/**
 * SortingOption component for selecting sorting options.
 *
 * @param {Function} handleSort - A function to handle the sorting option change.
 *
 * @returns {JSX.Element} SortingOption component with a select dropdown.
 */
export default function SortingOption({ handleSort }) {

  const sortingOptions = [
    { value: "default", label: "Default" }, // Default sorting option
    { value: "ascending", label: "Prep Time (Ascending)" }, // Sort by Prep Time in ascending order
    { value: "descending", label: "Prep Time (Descending)" }, // Sort by Prep Time in descending order
    { value: "ascendingCook", label: "Cook Time (Ascending)" }, // Sort by Cook Time in ascending order
    { value: "descendingCook", label: "Cook Time (Descending)" }, // Sort by Cook Time in descending order
    { value: "byDateNewest", label: "Newest" }, // Sort by date, newest first
    { value: "byDateOldest", label: "Oldest" }, // Sort by date, oldest first
  ];

  return (
    <select 
      placeholder="Sort"
      className="bg-transparent focus:outline-none"
      onChange={(e) => handleSort(e.target.value)}>
        {sortingOptions.map((option) => (
          <option key={option.value} className="bg-gray-900" value={option.value}>
            {option.label}
          </option>
        ))}
    </select>
  );
}
