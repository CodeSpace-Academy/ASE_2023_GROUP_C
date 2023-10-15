import Link from 'next/link';
import styles from './home-page.module.css'; // Import CSS module

function RecipeHomePage() {
  return (
    <div className={styles['home-container']}> {/* Apply 'home-container' style */}
      <h1 className={styles.title}>Welcome to My Recipe App</h1> {/* Apply 'title' style */}
      <Link href="/recipe-list/">
        <button className={styles.btn}>View Recipes List</button> {/* Apply 'btn' style */}
      </Link>
    </div>
  );
};

export default RecipeHomePage;
