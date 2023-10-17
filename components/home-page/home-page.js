import Link from 'next/link';
import styles from './home-page.module.css'; // Import CSS module
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoffee, faPizzaSlice } from '@fortawesome/free-solid-svg-icons';

function RecipeHomePage() {
  const element = <FontAwesomeIcon icon={faCoffee} />
  return (
    <div className={styles['home-container']}> {/* Apply 'home-container' style */}
      <h1 className={styles.title}>Welcome to The Recipe App{element}</h1> {/* Apply 'title' style */}
      <Link href="/recipe-list/">
        <button className={styles.btn}>
          View Recipes List
          {<FontAwesomeIcon icon={faPizzaSlice} beatFade/>}
          </button> {/* Apply 'btn' style */}
      </Link>
    </div>
  );
};

export default RecipeHomePage;
