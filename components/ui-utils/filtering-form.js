export default function SortingOption({ handleSort }) {
    return (
      <div>
        <button onClick={() => handleSort("ascending")}>Ascending</button>
        <button onClick={() => handleSort("descending")}>Descending</button>
        <button onClick={() => handleSort("byDate")}>By Date</button>
        <button onClick={() => handleSort("default")}>Default</button>
      </div>
    );
  }