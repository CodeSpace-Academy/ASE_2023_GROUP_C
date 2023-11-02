import FilterByIngredients from "../filtering/filterByIngredients";

export default function SortingOption({ handleSort }) {
  return (
    <div className=" flex m-3 gap-2 ">
      <button onClick={() => handleSort("default")}>
        {/* Default Sort */}
        Default
      </button>

      <button onClick={() => handleSort("ascending")}>
        {/* Sort by Prep Time (Ascending) */}
        Prep Time (Ascending)
      </button>

      {/* sort by number of steps (ascending) */}
      <button onClick={() => handleSort("ascending")}>
        Number of Steps (Ascending)
      </button>

      {/* sort by number of steps (descending) */}
      <button onClick={() => handleSort("descending")}>
        Number of Steps (Descending)
      </button>

      <button onClick={() => handleSort("descending")}>
        {/* Sort by Prep Time (Descending) */}
        Prep Time (Descending)
      </button>

      <button onClick={() => handleSort("ascending")}>
        {/* Sort by Cook Time (Ascending) */}
        Cook Time (Ascending)
      </button>

      <button onClick={() => handleSort("descending")}>
        {/* Sort by Cook Time (Descending) */}
        Cook Time (Descending)
      </button>

      <button onClick={() => handleSort("byDateNewest")}>Newest</button>

      <button onClick={() => handleSort("byDateOldest")}>Oldest</button>
      {/* called the filtered ingredients */}
      <FilterByIngredients />
    </div>
  );
}
