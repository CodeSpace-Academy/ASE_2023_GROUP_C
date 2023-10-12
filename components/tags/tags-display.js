import React from "react";
import styles from './tags-list.module.css';

export default function TagsDisplay(prop) {
  const { recipe } = prop
  return (
    <div>
      <div className={styles.tagsContainer}>
        {recipe.tags.map((tag) => (
          <span key={tag} className={styles.tag}>
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}
