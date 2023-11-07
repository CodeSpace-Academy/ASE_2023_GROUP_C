import { useContext, useEffect, useRef, useState } from 'react';
import Filtering from '../../filtering/allFilter';
import styles from './overlay.module.css'
import { useRouter } from 'next/router';
import { FilterContext } from '../../context/recipeContext';


/**
 * Overlay component for filtering recipes.
 * @param {Object} props - The component's props.
 * @param [Array] props.categoriesArr - An array of available categories for filtering.
 * @returns {JSX.Element} React component.
 */

export default function Overlay({categoriesArr}) {
  const { filter, setFilter, ingredientsInputRef } = useContext(FilterContext)

  const router = useRouter()

  let arrayOfIngrerdients
  function handleIngredientsChange(){
    const ingredientsValue = ingredientsInputRef.current.value;
    console.log(ingredientsValue);

    arrayOfIngrerdients = ingredientsValue.split(' ');
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
    
    if (filter.numberOfSteps === ''){
      url = `/recipeList/filters/${filter.categories}`
    } else if (filter.categories === ''){
      url = `/recipeList/filters/steps/${filter.numberOfSteps}`
    } else {
    url = `/recipeList/filters/steps/${filter.numberOfSteps}/${filter.categories}`;
    }

    if (arrayOfIngrerdients && arrayOfIngrerdients.length !== 0) {
      url = `/recipeList/filters/ingredients/${arrayOfIngrerdients.join('/')}`;
    }

    // Use router.push to navigate to the dynamic URL
    router.push(url);

  };

  return(
    <div className={styles.overlay}>
      <div className={styles.dialogBox}>
        <Filtering
          categoriesArr={categoriesArr}
          data={filter}
          onChange={handleInputChange}
          ingredientsInputRef={ingredientsInputRef}
          handleIngredientsChange={handleIngredientsChange}
        />
        <div className={styles.buttonContainer}>
          <button className={`${styles.button} ${styles.cancelButton}`} >Cancel</button>
          <button 
            className={`${styles.button} ${styles.okButton}`}
            onClick={handleOkButtonClick}
          >FIlter</button>
        </div>
      </div>
    </div>
  );
}
