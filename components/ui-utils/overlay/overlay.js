import Filtering from '../../filtering/allFilter';
import styles from './overlay.module.css'

export default function Overlay({categoriesArr}) {

    return(
        <div className={styles.overlay}>
          <div className={styles.dialogBox}>
            <Filtering
                categoriesArr={categoriesArr}
            />
            <div className={styles.buttonContainer}>
              <button className={`${styles.button} ${styles.cancelButton}`} >Cancel</button>
              <button className={`${styles.button} ${styles.okButton}`}>FIlter</button>
            </div>
          </div>
        </div>
      );
}
