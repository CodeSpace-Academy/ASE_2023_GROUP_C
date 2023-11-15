import { useContext } from 'react';
// import { useRouter } from 'next/router';
import Filtering from '../../filtering/allFilter';
import styles from './overlay.module.css';
import { FilterContext } from '../../context/recipeContext';

/**
 * Overlay component for filtering recipes.
 * @param {Object} props - The component's props.
 * @param [Array] props.categoriesArr - An array of available categories for filtering.
 * @returns {JSX.Element} React component.
 */

export default function Overlay({ categoriesArr, arrayOfUnigueTags, handleCancelFiltering }) {
  const { filter, setFilter } = useContext(FilterContext);

  // const router = useRouter();

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
    setFilter({
      ...filter,
      [e.target.name]: e.target.value,
    });
  };

  /**
   * Handle the click event when the "Filter" button is clicked.
   */

  const handleOkButtonClick = () => {
    // Filter out empty values
    const filteredFilter = Object.fromEntries(
      Object.entries(filter).filter(([key, value]) => value !== '' && value !== null && value !== undefined),
    );

    const titleFilter = 'Chocolate';

    const queryString2 = `filter=${JSON.stringify(filteredFilter)}&sort=${JSON.stringify(sortingObject)}&search=${JSON.stringify(titleFilter)}`;

    fetch(`/api/filter/${queryString2}`)
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.error(error));
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.dialogBox}>
        <Filtering
          categoriesArr={categoriesArr}
          arrayOfUnigueTags={arrayOfUnigueTags}
          data={filter}
          onChange={handleInputChange}
          // eslint-disable-next-line react/jsx-no-bind
          handleIngredientsChange={handleIngredientsChange}
        />
        <div className={styles.buttonContainer}>
          <button
            type="button"
            className={`${styles.button} ${styles.cancelButton}`}
            onClick={handleCancelFiltering}
          >
            Cancel
          </button>
          <button
            type="button"
            className={`${styles.button} ${styles.okButton}`}
            onClick={handleOkButtonClick}
          >
            FIlter
          </button>
        </div>
      </div>
    </div>
  );
}

// const handleOkButtonClick = () => {
//   // let url; // Set url of the filtered options

//   // if (filter.numberOfSteps === '') {
//   //   url = `/recipeList/filters/${filter.categories}`;
//   // } else if (filter.categories === '') {
//   //   url = `/recipeList/filters/steps/${filter.numberOfSteps}`;
//   // } else {
//   //   url = `/recipeList/filters/steps/${filter.numberOfSteps}/${filter.categories}`;
//   // }

//   // if (arrayOfIngrerdients && arrayOfIngrerdients.length !== 0) {
//   //   url = `/recipeList/filters/ingredients/${arrayOfIngrerdients.join('/')}`;
//   // }

//   // const url = `/recipeList/filters/${JSON.stringify(filter)}`;

//   // const params = new URLSearchParams();

//   // // Filter out empty values
//   // const filteredFilter = Object.fromEntries(
//   //   Object.entries(filter).filter(([key, value]) => value !== '' && value !== null && value !== undefined),
//   // );
//   // console.log(filteredFilter)

//   // if (Object.keys(filteredFilter).length > 0) {
//   //   params.set('filter', JSON.stringify(filteredFilter));
//   // }

//   // // params.set('sorting', JSON.stringify(sorting));

//   // const queryString = params.toString();

//   // console.log(queryString)

//   // const url = `/recipeList/filters/${queryString}`;

//   // // Use router.push to navigate to the dynamic URL
//   // router.push(url);

//   // Filter out empty values
//   const filteredFilter = Object.fromEntries(
//     Object.entries(filter).filter(
//  ([key, value]) => value !== '' && value !== null && value !== undefined),
//   );

//const queryString2=`filter=${JSON.stringify(filteredFilter)}&sort=${JSON.stringify(sortingObject)}`

//   fetch(`/api/filter/${queryString2}`)
//     .then((response) => response.json())
//     .then((data) => console.log(data))
//     .catch((error) => console.error(error));
// };