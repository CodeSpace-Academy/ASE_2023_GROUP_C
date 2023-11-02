import { useEffect, useState } from 'react';
import Filtering from '../../filtering/allFilter';
import styles from './overlay.module.css'
import { useRouter } from 'next/router';


/**
 * Overlay component for filtering recipes.
 * @param {Object} props - The component's props.
 * @param [Array] props.categoriesArr - An array of available categories for filtering.
 * @returns {JSX.Element} React component.
 */

export default function Overlay({categoriesArr}) {
  const [data, setData] = useState({
    categories: '', 
    numberOfSteps: '', 
  });
  const router = useRouter()

  /**
   * Handle input change for filtering options.
   * @param {Event} e - The input change event.
   */

  const handleInputChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  /**
   * Handle the click event when the "Filter" button is clicked.
   */

  const handleOkButtonClick = () => {
    let url; // Set url of the filtered options
    
    if (data.numberOfSteps === ''){
      url = `/recipeList/filters/${data.categories}`
    } else if (data.categories === ''){
      url = `/recipeList/filters/steps/${data.numberOfSteps}`
    } else {
    url = `/recipeList/filters/steps/${data.numberOfSteps}/${data.categories}`;
    }
    
    // Use router.push to navigate to the dynamic URL
    router.push(url);
    console.log(data);
  };





  return(
    <div className={styles.overlay}>
      <div className={styles.dialogBox}>
        <Filtering
          categoriesArr={categoriesArr}
          data={data}
          onChange={handleInputChange}
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
