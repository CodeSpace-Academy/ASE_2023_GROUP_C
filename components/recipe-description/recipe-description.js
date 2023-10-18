import React, { useState } from "react";
import styles from "./recipe-description.module.css";
import EditableDescription from "./update-description/update-description";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";

function RecipeDescription(props) {
  const { recipe } = props;
  const [isEditing, setIsEditing] = useState(false);
  const [editedDescription, setEditedDescription] = useState(recipe.description);

  const handleEditDescription = (newDescription) => {
    console.log("New Description:", newDescription);
    
    setEditedDescription(newDescription);
    setIsEditing(false);
  };

  return (
    <div className=' text-center '>
      <h3 
        className='font-bold text-2xl p-2'
      >Description
      </h3>
      {isEditing ? (
        <EditableDescription
          initialDescription={editedDescription}
          onSave={handleEditDescription}
          onCancel={() => setIsEditing(false)}
        />
      ) : (
        <div>
          <p className={styles.description}>{editedDescription}</p>
          <button 
          onClick={() => setIsEditing(true)}
          className='p-4 bg-blue-700 py-1 rounded hover:bg-blue-800 mt-2'
          >
            <FontAwesomeIcon icon={faPenToSquare}/>
            Edit
            </button>
        </div>
      )}
    </div>
  );
}

export default RecipeDescription;
