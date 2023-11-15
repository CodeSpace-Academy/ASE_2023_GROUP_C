import { faSort } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useContext } from 'react';
import { FilterContext } from '../context/recipeContext';

export default function SortingForm() {
  const { selectedOption, setSelectedOption } = useContext(FilterContext);

  const handleOptionChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedOption(selectedValue);

    const queryString2 = `sort=${selectedOption}`;

    fetch(`/api/filter/${queryString2}`)
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.error(error));
  };

  return (
    <div className=" p-2 flex flex-wrap justify-center gap-2  mb-3 ml-4 mr-4 border-slate-500 items-center md:justify-between ">
      <div className=" p-2 flex items-center rounded-lg text-slate-400">
        <form>
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
            <option className="bg-gray-900" value="published(latest)">Newest </option>
            <option className="bg-gray-900" value="published(oldest)">Oldest </option>
          </select>
        </form>
      </div>
    </div>
  );
}
