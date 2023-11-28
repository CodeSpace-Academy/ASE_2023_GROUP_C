import { faSort } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRouter } from 'next/router';

export default function SortingForm() {
  const router = useRouter();

  const handleOptionChange = (event) => {
    const selectedValue = event.target.value;
    // Update the URL with the selected sorting option
    router.push(`/recipes?page=1&sortBy=${selectedValue}`);
  };

  return (
    <div className="p-2 flex flex-wrap justify-center gap-2 mb-3 ml-4 mr-4 border-slate-500 items-center md:justify-between">
      <div className="p-2 flex items-center rounded-lg text-slate-400">
        <form className="text-white">
          <FontAwesomeIcon icon={faSort} size="lg" />
          Sort By:
          <select
            placeholder="Sort"
            className="bg-transparent focus:outline-none"
            onChange={handleOptionChange}
          >
            <option className="bg-gray-900" value="default">Default </option>
            <option className="bg-gray-900" value="prepTime(Ascending)">Prep Time (Ascending) </option>
            <option className="bg-gray-900" value="prepTime(Descending)">Prep Time (Descending)</option>
            <option className="bg-gray-900" value="cookTime(Ascending)">Cook Time (Ascending) </option>
            <option className="bg-gray-900" value="cookTime(Descending)">Cook Time (Descending) </option>
            <option className="bg-gray-900" value="numberOfSteps(Ascending)">Number of Steps (Ascending) </option>
            <option className="bg-gray-900" value="numberOfSteps(Descending)">Number of Steps (Descending) </option>
            <option className="bg-gray-900" value="published(latest)">Newest </option>
            <option className="bg-gray-900" value="published(oldest)">Oldest </option>
          </select>
        </form>
      </div>
    </div>
  );
}
