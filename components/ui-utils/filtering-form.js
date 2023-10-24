export default function SortingOption ({ handleSort })  {
  return (
    <div >
      <button  onClick={() => handleSort("default")}>
        {/* Default Sort */}
        Default
      </button>
      <button  onClick={() => handleSort("ascending")}>
        {/* Sort by Prep Time (Ascending) */}
        Cook Time
      </button>
      <button  onClick={() => handleSort("descending")}>
        {/* Sort by Prep Time (Descending) */}
        Prep Time
      </button>
      <button  onClick={() => handleSort("byDate")}>
        {/* sort by newest */}
        Newest
      </button>
    </div>
  );
};


