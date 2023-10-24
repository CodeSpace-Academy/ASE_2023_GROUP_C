export default function SortingOption ({ handleSort })  {
  return (
    <div >
      <button  onClick={() => handleSort("default")}>
        {/* Default Sort */}
        Default
      </button>
      <button  onClick={() => handleSort("ascending")}>
        {/* Sort by Prep Time (Ascending) */}
        Ascending
      </button>
      <button  onClick={() => handleSort("descending")}>
        {/* Sort by Prep Time (Descending) */}
        Descending
      </button>
      <button  onClick={() => handleSort("byDate")}>
        {/* sort by newest */}
        Newest
      </button>
    </div>
  );
};


