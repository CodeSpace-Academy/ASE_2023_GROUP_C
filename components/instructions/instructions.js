import React from 'react'
import styles from './instructions.module.css'

export default function Instructions(prop) {
    const { recipe } = prop
  return (
    <div>
    {recipe.instructions && recipe.instructions.length > 0 && (
      <div className={styles.instructionsContainer}>
        <h3>Instructions</h3>
        <ol>
          {recipe.instructions.map((instruction, index) => (
            <li key={index}>{instruction}</li>
          ))}
        </ol>
      </div>
    )}</div>
  )
}
