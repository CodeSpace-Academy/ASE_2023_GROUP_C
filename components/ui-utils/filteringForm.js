import React from "react";

/**
 * Component for rendering sorting options for recipes.
 *
 * @param {Function} handleSort - A function to handle sorting based on user's selection.
 */
export default function SortingOption({ handleSort }) {
  // Function to handle the default sorting option
  const handleDefaultSort = () => {
    // Call the handleSort function with "default" to apply default sorting criteria
    handleSort("default");
  };

  return (
    <div className="flex m-3 gap-2 overflow-x-auto">
      {/* Button for default sorting */}
      <button onClick={handleDefaultSort}>Default</button>

      {/* Button for sorting by No. of instructions (Ascending) */}
      <button onClick={() => handleSort("ascendingSteps")}>
        Number of Steps (Ascending)
      </button>

      {/* Button for sorting by No. of instructions (Descending) */}
      <button onClick={() => handleSort("descendingSteps")}>
        Number of Steps (Descending)
      </button>

      {/* Button for sorting by prep duration (Ascending) */}
      <button onClick={() => handleSort("ascending")}>
        Prep Time (Ascending)
      </button>

      {/* Button for sorting by prep duration (Descending)*/}
      <button onClick={() => handleSort("descending")}>
        Prep Time (Descending)
      </button>

      {/* Button for sorting by cooking duration (Ascending) */}
      <button onClick={() => handleSort("ascendingCookTime")}>
        Cook Time (Ascending)
      </button>

      {/* Button for sorting by cooking duration (Descending) */}
      <button onClick={() => handleSort("descendingCookTime")}>
        Cook Time (Descending)
      </button>

      {/* Button for sorting by date created (Recent First)  */}
      <button onClick={() => handleSort("byDateNewest")}>
        Recent
        </button>

      {/* Button for sorting by date created (Oldest First) */}
      <button onClick={() => handleSort("byDateOldest")}>
        Oldest
        </button>
    </div>
  );
}
