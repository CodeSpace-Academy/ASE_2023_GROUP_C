import React, { useState } from "react";
import EditableDescription from "./update-description/update-description";




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
    <div >
      <h3>Description</h3>
      {isEditing ? (
        <EditableDescription
          initialDescription={editedDescription}
          onSave={handleEditDescription}
          onCancel={() => setIsEditing(false)}
        />
      ) : (
        <div>
          <p>{editedDescription}</p>
          
          <button onClick={() => setIsEditing(true)}>Edit</button>
        </div>
      )}
    </div>
  );
}


export default RecipeDescription;
