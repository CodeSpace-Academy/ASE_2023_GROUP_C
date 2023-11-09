export default function SortingOption({ handleSort }) {
  const sortingOptions = [
    { value: 'default', label: 'Default' },
    { value: 'ascending', label: 'Prep Time (Ascending)' },
    { value: 'descending', label: 'Prep Time (Descending)' },
    { value: 'ascendingCook', label: 'Cook Time (Ascending)' },
    { value: 'descendingCook', label: 'Cook Time (Descending)' },
    { value: 'byDateNewest', label: 'Newest' },
    { value: 'byDateOldest', label: 'Oldest' },
  ];

  return (
    <select
      placeholder="Sort"
      className="bg-transparent focus:outline-none"
      onChange={(e) => handleSort(e.target.value)}
    >
      {sortingOptions.map((option) => (
        <option key={option.value} className="bg-gray-900" value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}
