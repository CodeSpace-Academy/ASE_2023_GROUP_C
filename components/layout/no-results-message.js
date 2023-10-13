import React from "react";
import styles from "../recipe-list.module.css";

export default function NoResultsMessage() {
  return (
    <p className={styles.noResultsMessage}>
      No results found. Please try a different recipe.
    </p>
  );
}
