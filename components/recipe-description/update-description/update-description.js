import React, { useState } from "react";
// import styles from "./recipe-description.module.css";
// import EditableDescription from "./EditableDescription";

function RecipeDescription(props) {
  const { recipe } = props;
  const [isEditing, setIsEditing] = useState(false);
  const [editedDescription, setEditedDescription] = useState(recipe.description);

  const handleEditDescription = (newDescription) => {

    setEditedDescription(newDescription); 
    setIsEditing(false);
  };

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
          <button onClick={() => handleEditDescription(editedDescription)}>Save</button>
          <button onClick={() => setIsEditing(false)}>Cancel</button>
        </div>
      ) : (
        <div>
          <p className={styles.description}>{editedDescription}</p>
          <button onClick={() => setIsEditing(true)}>Edit</button>
        </div>
      )}
    </div>
  );
}

export default RecipeDescription;

