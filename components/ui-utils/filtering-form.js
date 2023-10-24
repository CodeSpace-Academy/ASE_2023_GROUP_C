export default function SortingOption({ handleSort }) {

 

  return (
    <div>

      <button onClick={() => handleSort("default")}>
        {/* Default Sort */}
        Default
      </button>

      <button onClick={() => handleSort("ascending")}>
        {/* Sort by Prep Time (Ascending) */}
        Prep Time (Ascending)
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

      <button onClick={() => handleSort("byDateNewest")}>
        Newest
      </button>

      <button onClick={() => handleSort("byDateOldest")}>
        Oldest
      </button>

      <button onClick={() => handleSort("clearFilters")}>
       Clear Filters
      </button>

    </div>
  );
}
