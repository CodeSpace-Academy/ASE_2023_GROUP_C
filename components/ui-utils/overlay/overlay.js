import React, { useState } from 'react';
import Filtering from '../../filtering/allFilter'; // Import your filtering component
import styles from './overlay.module.css'; // Import the CSS styles for this component
import { useRouter } from 'next/router'; // Import Next.js router for navigation

export default function Overlay({ categoriesArr, closeFilterOverlay }) {
  // State to manage form input data
  const [data, setData] = useState({
    categories: '', // Initialize with empty categories value
    numberOfSteps: '', // Initialize with empty number of steps value
  });
  const router = useRouter(); // Access the Next.js router for navigation

  // Handle input changes in the form
  const handleInputChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  // Handle the "Filter" button click
  const handleOkButtonClick = () => {
    let url;

    // Build the URL based on the selected filtering options
    if (data.numberOfSteps === '') {
      url = `/recipeList/filters/${data.categories}`;
    } else if (data.categories === '') {
      url = `/recipeList/filters/steps/${data.numberOfSteps}`;
    } else {
      url = `/recipeList/filters/steps/${data.numberOfSteps}/${data.categories}`;
    }

    // Use the router to navigate to the dynamically constructed URL
    router.push(url);
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.dialogBox}>
        <Filtering
          categoriesArr={categoriesArr} // Pass the list of available categories to the Filtering component
          data={data} // Pass the form data to the Filtering component
          onChange={handleInputChange} // Pass the input change handler to the Filtering component
        />
        <div className={styles.buttonContainer}>
          {/* "Cancel" button to close the overlay */}
          <button className={`${styles.button} ${styles.cancelButton}`} onClick={closeFilterOverlay}>
            Cancel
          </button>
          {/* "Filter" button to apply the selected filters */}
          <button className={`${styles.button} ${styles.okButton}`} onClick={handleOkButtonClick}>
            Filter
          </button>
        </div>
      </div>
    </div>
  );
}
  