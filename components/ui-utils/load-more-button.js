import React from "react";
import styles from "../recipe-list.module.css";

export default function LoadMoreButton({ onClick, remainingRecipes }) {
  return (
    <div className={styles.loadMoreButton}>
      <button onClick={onClick} className={styles.button}>
        Load More Recipes ({remainingRecipes} left)
      </button>
    </div>
  );
}
