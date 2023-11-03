import React, { useState } from 'react';
import Filtering from '../../filtering/allFilter';
import styles from './overlay.module.css';
import { useRouter } from 'next/router';

export default function Overlay({ categoriesArr, closeFilterOverlay }) {
  const [data, setData] = useState({
    categories: '', 
    numberOfSteps: '', 
  });
  const router = useRouter();

  const handleInputChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleOkButtonClick = () => {
    let url;

    if (data.numberOfSteps === ''){
      url = `/recipeList/filters/${data.categories}`;
    } else if (data.categories === ''){
      url = `/recipeList/filters/steps/${data.numberOfSteps}`;
    } else {
      url = `/recipeList/filters/steps/${data.numberOfSteps}/${data.categories}`;
    }

    router.push(url);
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.dialogBox}>
        <Filtering
          categoriesArr={categoriesArr}
          data={data}
          onChange={handleInputChange}
        />
        <div className={styles.buttonContainer}>
          <button className={`${styles.button} ${styles.cancelButton}`} onClick={closeFilterOverlay}>Cancel</button>
          <button className={`${styles.button} ${styles.okButton}`} onClick={handleOkButtonClick}>Filter</button>
        </div>
      </div>
    </div>
  );
}