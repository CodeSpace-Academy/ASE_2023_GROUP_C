/* eslint-disable max-len */
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Filtering from '../../filtering/allFilter';
import Modal from '../Modal';

/**
 * Overlay component for filtering recipes.
 * @param {Object} props - The component's props.
 * @param [Array] props.categoriesArr - An array of available categories for filtering.
 * @returns {JSX.Element} React component.
 */

export default function FilteringModal(props) {
  const {
    categoriesArr, arrayOfUnigueTags, handleCancelFiltering, isOpen,
  } = props;

  const [filter, setFilter] = useState({});

  const [selectedTagsAndCategories, setSelectedTagsAndCategories] = useState({
    categories: [],
    tags: [],
  });
  const [selectedStepsAndIngredients, setSelectedStepsAndIngredients] = useState({
    numberOfSteps: '',
    filterByIngredients: '',
  });

  // Use the useRouter hook to access params and query
  const router = useRouter();

  // Access the filter and sorting query parameters
  const { filter: filterObject } = router.query;

  // Update the filter state when filterObject changes
  useEffect(() => {
    if (filterObject) {
      const parsedFilter = JSON.parse(filterObject);

      // Merge the existing state with the parsed filter object
      setSelectedTagsAndCategories({
        categories: parsedFilter.categories || [],
        tags: parsedFilter.tags || [],
      });
      setSelectedStepsAndIngredients({
        numberOfSteps: parsedFilter.numberOfSteps || '',
        filterByIngredients: parsedFilter.filterByIngredients || '',
      });
    }
  }, [filterObject]);

  let arrayOfIngrerdients;
  function handleIngredientsChange() {
    const ingredientsValue = filter.filterByIngredients;

    arrayOfIngrerdients = ingredientsValue.split(' ');
    // eslint-disable-next-line no-console
    console.log(arrayOfIngrerdients);
  }

  /**
   * Handle input change for filtering options.
   * @param {Event} e - The input change event.
   */

  const handleInputChange = (e) => {
    setSelectedStepsAndIngredients({
      ...selectedStepsAndIngredients,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    setFilter({
      ...selectedTagsAndCategories,
      ...selectedStepsAndIngredients,
    });
  }, [selectedTagsAndCategories, selectedStepsAndIngredients]);

  /**
   * Handle the click event when the "Filter" button is clicked.
   */
  const handleOkButtonClick = () => {
    // Filter out empty values (both empty strings and empty arrays)
    const filteredFilter = Object.fromEntries(
      Object.entries(filter).filter(
        ([, value]) => {
          if (Array.isArray(value)) {
            return value.length > 0; // Filter out empty arrays
          }
          return value !== '' && value !== null && value !== undefined; // Filter out empty strings
        },
      ),
    );
    const url = `/recipes?page=1&filter=${JSON.stringify(filteredFilter)}`;
    router.push(url);
    handleCancelFiltering();
  };

  const selectedValuesCategories = selectedTagsAndCategories.categories.map((category) => { return { label: category, value: category }; });
  const selectedValuesTags = selectedTagsAndCategories.tags.map((category) => { return { label: category, value: category }; });

  return (
    <Modal
      title="Filter"
      onSubmit={handleOkButtonClick}
      onClose={handleCancelFiltering}
      isOpen={isOpen}
      footer="Filter"
      buttonColor="#3490dc"
    >
      <Filtering
        categoriesArr={categoriesArr}
        arrayOfUnigueTags={arrayOfUnigueTags}
        selectedValuesTags={selectedValuesTags}
        selectedValuesCategories={selectedValuesCategories}
        setSelectedTagsAndCategories={setSelectedTagsAndCategories}
        selectedStepsAndIngredients={selectedStepsAndIngredients}
        onChange={handleInputChange}
          // eslint-disable-next-line react/jsx-no-bind
        handleIngredientsChange={handleIngredientsChange}
      />
    </Modal>
  );
}
