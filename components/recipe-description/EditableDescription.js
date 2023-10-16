import React, { useState, useEffect } from "react";
import styles from "./recipe-description.module.css";
import EditableDescription from "./EditableDescription";

function RecipeDescription(props) {
  const { recipe } = props;
  const [isEditing, setIsEditing] = useState(false);
  const [editedDescription, setEditedDescription] = useState(recipe.description);

  const handleEditDescription = (newDescription) => {

    localStorage.setItem(`editedDescription-${recipe._id}`, newDescription);

    setEditedDescription(newDescription); 
    setIsEditing(false);
  };

  useEffect(() => {

    const storedDescription = localStorage.getItem(`editedDescription-${recipe._id}`);
    if (storedDescription) {
      setEditedDescription(storedDescription);
    }
  }, [recipe._id]);

  return (
    <div>
      <h3>Description</h3>
      {isEditing ? (
        <div>
          <textarea
            value={editedDescription}
            onChange={(e) => setEditedDescription(e.target.value)}
            className={styles.description}
          />
          <button className={styles.saveButton} onClick={() => handleEditDescription(editedDescription)}>Save</button>
          <button className={styles.cancelButton} onClick={() => setIsEditing(false)}>Cancel</button>
        </div>
      ) : (
        <div>
          <p className={styles.description}>{editedDescription}</p>
          <button className={styles.editButton} onClick={() => setIsEditing(true)}>Edit</button>
        </div>
      )}
    </div>
  );
}

export default RecipeDescription;
