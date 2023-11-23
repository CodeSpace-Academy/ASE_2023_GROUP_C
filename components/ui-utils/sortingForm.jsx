import { faSort } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRouter } from 'next/router';

export default function SortingForm() {
  const router = useRouter();

  const handleOptionChange = (event) => {
    const selectedValue = event.target.value;
    const currentPageNumber = router.query.pageNumber || '1';
    // Update the URL with the selected sorting option
    router.push(`/recipeList/${currentPageNumber}?${selectedValue}`);
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
            <option className="bg-gray-900" value="sortBy=default order=1">Default </option>
            <option className="bg-gray-900" value="sortBy=prepTimeAsc order=1">Prep Time (Ascending) </option>
            <option className="bg-gray-900" value="sortBy=prepTimeDesc order=-1">Prep Time (Descending)</option>
            <option className="bg-gray-900" value="sortBy=cookTimeAsc order=1">Cook Time (Ascending) </option>
            <option className="bg-gray-900" value="sortBy=cookTimeDesc order=-1">Cook Time (Descending) </option>
            <option className="bg-gray-900" value="sortBy=numberOfStepsAsc order=1">Number of Steps (Ascending) </option>
            <option className="bg-gray-900" value="sortBy=numberOfStepsDesc order=-1">Number of Steps (Descending) </option>
            <option className="bg-gray-900" value="sortBy=publishedLatest order=1">Newest </option>
            <option className="bg-gray-900" value="sortBy=publishedOldest order=-1">Oldest </option>
          </select>
        </form>
      </div>
    </div>
  );
}
