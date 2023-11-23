/* eslint-disable max-len */
import { useRouter } from 'next/router';
import Filtering from '../../filtering/allFilter';
import styles from './overlay.module.css';

/**
 * Overlay component for filtering recipes.
 * @param {Object} props - The component's props.
 * @param [Array] props.categoriesArr - An array of available categories for filtering.
 * @returns {JSX.Element} React component.
 */

export default function Overlay(props) {
  const {
    categoriesArr, arrayOfUnigueTags, filter, setFilter, handleCancelFiltering,
  } = props;

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
    // Filter out empty values
    const filteredFilter = Object.fromEntries(
      Object.entries(filter).filter(([, value]) => value !== '' && value !== null && value !== undefined),
    );
    const url = `/recipes?page=1&filter=${JSON.stringify(filteredFilter)}`;
    router.replace(url);
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
