import { useEffect, useState } from 'react';
import Filtering from '../../filtering/allFilter';
import styles from './overlay.module.css'
import { useRouter } from 'next/router';

export default function Overlay({categoriesArr}) {
  const [data, setData] = useState({
    categories: '', 
    numberOfSteps: '', 
  });
  const router = useRouter()

  const handleInputChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleOkButtonClick = () => {
    let url; // Set url of the filtered options
    if (data.categories === ''){
      `/recipeList/filters/${data.categories}`
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
