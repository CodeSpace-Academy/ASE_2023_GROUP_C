import { useContext } from 'react';
import { useRouter } from 'next/router';
import Filtering from '../../filtering/allFilter';
import styles from './overlay.module.css';
import { FilterContext } from '../../context/recipeContext';

/**
 * Overlay component for filtering recipes.
 * @param {Object} props - The component's props.
 * @param [Array] props.categoriesArr - An array of available categories for filtering.
 * @returns {JSX.Element} React component.
 */

export default function Overlay({ categoriesArr, arrayOfUnigueTags }) {
  const { filter, setFilter } = useContext(FilterContext);

  const router = useRouter();

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
    let url; // Set url of the filtered options

    if (filter.numberOfSteps === '') {
      url = `/recipeList/filters/${filter.categories}`;
    } else if (filter.categories === '') {
      url = `/recipeList/filters/steps/${filter.numberOfSteps}`;
    } else {
      url = `/recipeList/filters/steps/${filter.numberOfSteps}/${filter.categories}`;
    }

    if (arrayOfIngrerdients && arrayOfIngrerdients.length !== 0) {
      url = `/recipeList/filters/ingredients/${arrayOfIngrerdients.join('/')}`;
    }

    // Use router.push to navigate to the dynamic URL
    router.push(url);
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
          <button type="button" className={`${styles.button} ${styles.cancelButton}`}>
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
